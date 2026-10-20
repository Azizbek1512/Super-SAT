"use strict";
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const compression = require("compression");

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const CLASSES_FILE = path.join(DATA_DIR, "classes.json");
const SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 30;

let TEACHER_PASSWORD = process.env.TEACHER_PASSWORD;
if (!TEACHER_PASSWORD) {
  TEACHER_PASSWORD = crypto.randomBytes(6).toString("hex");
  console.warn(`[super-sat] TEACHER_PASSWORD o'rnatilmagan. Vaqtinchalik parol: ${TEACHER_PASSWORD}`);
}

/* ---------- classes storage ---------- */
// On Vercel the file system is read-only, so classes live in Vercel Blob when its token is set.
const BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;
const BLOB_PATH = "super-sat/classes.json";
let cache = null;
async function readClasses() {
  if (!BLOB) {
    try {
      const j = JSON.parse(fs.readFileSync(CLASSES_FILE, "utf8"));
      return Array.isArray(j.classes) ? j.classes : [];
    } catch (e) {
      return [];
    }
  }
  if (cache && Date.now() - cache.t < 5000) return cache.classes;
  try {
    const { head } = require("@vercel/blob");
    const meta = await head(BLOB_PATH);
    const r = await fetch(meta.url + "?t=" + Date.now(), { cache: "no-store" });
    const j = await r.json();
    const classes = Array.isArray(j.classes) ? j.classes : [];
    cache = { classes, t: Date.now() };
    return classes;
  } catch (e) {
    return cache ? cache.classes : [];
  }
}
async function writeClasses(classes) {
  if (!BLOB) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const tmp = CLASSES_FILE + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify({ classes }, null, 2));
    fs.renameSync(tmp, CLASSES_FILE);
    return;
  }
  const { put } = require("@vercel/blob");
  await put(BLOB_PATH, JSON.stringify({ classes }), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
  cache = { classes, t: Date.now() };
}
const SET_KEY = /^(?:[1-9]\d?|[iat][1-9]\d?)$/;
function cleanClasses(input) {
  if (!Array.isArray(input) || input.length > 200) return null;
  const out = [];
  for (const c of input) {
    if (!c || typeof c !== "object") return null;
    const id = String(c.id || "").slice(0, 40);
    const name = String(c.name || "").trim().slice(0, 30);
    const code = String(c.code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
    if (!id || !name || !code || !Array.isArray(c.sets)) return null;
    const sets = c.sets.filter((k) => SET_KEY.test(String(k))).map((k) => (typeof k === "number" ? k : /^\d+$/.test(k) ? Number(k) : k));
    out.push({ id, name, code, sets });
  }
  return out;
}

/* ---------- teacher session (stateless signed token) ---------- */
const sign = (v) => crypto.createHmac("sha256", SECRET).update(v).digest("base64url");
function makeToken() {
  const exp = String(Date.now() + TOKEN_TTL_MS);
  return exp + "." + sign("teacher:" + exp);
}
function validToken(t) {
  const [exp, sig] = String(t || "").split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const want = Buffer.from(sign("teacher:" + exp));
  const got = Buffer.from(sig);
  return want.length === got.length && crypto.timingSafeEqual(want, got);
}
function auth(req, res, next) {
  const h = req.get("authorization") || "";
  if (validToken(h.replace(/^Bearer\s+/i, ""))) return next();
  res.status(401).json({ error: "unauthorized" });
}
const tries = new Map();
function rateLimit(req, res, next) {
  const k = req.ip, now = Date.now();
  const r = tries.get(k) || { n: 0, t: now };
  if (now - r.t > 15 * 60 * 1000) { r.n = 0; r.t = now; }
  r.n++;
  tries.set(k, r);
  if (r.n > 20) return res.status(429).json({ error: "too_many_attempts" });
  next();
}
function samePassword(a) {
  const x = crypto.createHash("sha256").update(String(a)).digest();
  const y = crypto.createHash("sha256").update(TEACHER_PASSWORD).digest();
  return crypto.timingSafeEqual(x, y);
}

/* ---------- app ---------- */
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(compression());
app.use(express.json({ limit: "200kb" }));

app.get("/api/config.js", async (req, res) => {
  res.type("application/javascript").set("Cache-Control", "no-store");
  res.send("window.__CFG=" + JSON.stringify({ classes: await readClasses() }).replace(/</g, "\\u003c") + ";");
});
app.get("/api/classes", async (req, res) => res.json({ classes: await readClasses() }));
app.post("/api/login", rateLimit, (req, res) => {
  if (!samePassword((req.body || {}).password || "")) return res.status(401).json({ error: "wrong_password" });
  res.json({ token: makeToken() });
});
app.get("/api/me", auth, (req, res) => res.json({ teacher: true }));
app.put("/api/classes", auth, async (req, res) => {
  const classes = cleanClasses((req.body || {}).classes);
  if (!classes) return res.status(400).json({ error: "invalid_classes" });
  try {
    await writeClasses(classes);
  } catch (e) {
    console.error("[super-sat] classes save failed:", e && e.message);
    return res.status(500).json({ error: "save_failed" });
  }
  res.json({ classes });
});
app.get("/healthz", (req, res) => res.send("ok"));

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: process.env.NODE_ENV === "production" ? "7d" : 0,
    setHeaders(res, file) {
      if (file.endsWith(".html")) res.set("Cache-Control", "no-cache");
    },
  })
);
app.use((req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// Vercel runs the app through api/index.js; `node server.js` starts a normal server.
if (require.main === module) app.listen(PORT, () => console.log(`[super-sat] http://localhost:${PORT}`));
module.exports = app;
