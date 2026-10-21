# Super SAT — Node.js + Tailwind CSS

Andijon Yuksalish maktabi o'quvchilari uchun SAT tayyorlov sayti (Teacher Azizbek). Bu loyiha `Super SAT.html` faylidan qayta qurilgan: barcha ma'lumotlar (lug'atlar, testlar, izohlar, mavzular, Full Mock, o'yinlar, rasmlar) o'zgarishsiz ko'chirilgan.

## Ishga tushirish

```bash
npm install
npm run build        # Tailwind CSS ni public/css/app.css ga yig'adi
TEACHER_PASSWORD=parolingiz npm start
```

Sayt: http://localhost:3000. Node.js 18 yoki undan yangi versiya kerak.
`public/css/app.css` tayyor holda qo'shilgan, shuning uchun serverda `npm install --omit=dev && npm start` ham yetarli.
Dizaynni o'zgartirganda: `npm run watch:css`.

## Vercel

Sayt Vercel'da ishlaydi: `public/` statik fayllar sifatida, `api/index.js` esa Express ilovasini (`server.js`) serverless funksiya sifatida beradi. Sozlamalar `vercel.json` da.

Muhit o'zgaruvchilari (Vercel → Project → Settings → Environment Variables):

- `TEACHER_PASSWORD` — "O'qituvchi sifatida kirish" paroli.
- `SESSION_SECRET` — o'qituvchi sessiyasini imzolash kaliti.
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob (`super-sat-classes`) ulanganda avtomatik qo'shiladi; sinflar shu yerda saqlanadi. Token bo'lmasa (lokal), sinflar `data/classes.json` faylida saqlanadi.

## Yangi imkoniyatlar

- **Responsive dizayn** (Tailwind CSS): telefon, planshet va kompyuter uchun. Kompyuterda Writing/Reading savollarida matn chapda, variantlar o'ngda (Bluebook kabi).
- **Sayt tili: UZ / RU / EN** — yuqoridagi tugmalar. Interfeys (tugmalar, sarlavhalar, xabarlar) tarjima qilinadi; o'quv materiallari (matnlar, savollar, lug'at tarjimalari, izohlar, darslar) asl holicha qoladi.
- **Dark / Light rejim** — tanlov eslab qolinadi, birinchi kirishda qurilma sozlamasiga moslashadi.
- **Qulaylik**: doimiy yuqori menyu (telefonda yon menyu), "Tepaga" tugmasi, klaviatura (A–D yoki 1–4 — variant, Enter — tasdiqlash/keyingi, Mock'da ← → — savollar orasida, Esc — oynani yopish), imtihon paytida menyudan chiqishda tasdiqlash so'raladi.
- **Tezlik**: 108 ta grafik va logotip alohida PNG fayllarga ajratildi, server gzip bilan siqib beradi.

## Claude.ai'ga bog'liq qismlar qanday almashtirildi

Asl fayl claude.ai ichida ishlagan: sinflar sahifaning o'ziga yozilgan va o'qituvchi claude.ai hisobi orqali aniqlangan. Endi:

- **O'qituvchi** bosh sahifada "O'qituvchi sifatida kirish" → `TEACHER_PASSWORD` paroli bilan kiradi.
- **Sinflar** (nom, taklif kodi, imtihon setlari) serverda `data/classes.json` faylida saqlanadi; "Saqlash va e'lon qilish" ularni darhol o'quvchilarga ko'rsatadi.
- **Taklif havolasi** — saytning o'z manzili.
- Saytga kirish paroli (gate) olib tashlandi — sayt hamma uchun ochiq.

## Tuzilma

```
server.js              Express server: statik fayllar, /api/config.js, /api/login, /api/classes
src/input.css          Tailwind manbasi (dizayn, ranglar, dark mode)
public/index.html      Sayt qobig'i: menyu, til, tema
public/js/core.js      Umumiy holat, sinflar API
public/js/data/*.js    Ma'lumotlar (asl fayldan aynan ko'chirilgan)
public/js/explain.js   Izohlar
public/js/app.js       Ilova mantig'i (asl fayldan)
public/js/i18n.js      UZ/RU/EN interfeys tarjimasi
public/js/ui.js        Menyu, tema, klaviatura, "Tepaga"
public/img/            Logotip va Reading grafiklari
```
