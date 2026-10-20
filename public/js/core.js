/* Super SAT — shared state and helpers.
   Classes are served by the Node.js server (window.__CFG from /api/config.js) instead of being
   embedded in the page, and the teacher signs in with a server password instead of claude.ai. */
let CFG={classes:[]};try{if(window.__CFG&&Array.isArray(window.__CFG.classes))CFG=window.__CFG}catch(e){}
let JOINED="",IS_OWNER=false,DRAFT=[];
try{JOINED=localStorage.getItem("cls")||""}catch(e){}
const cls=()=>CFG.classes.find(c=>c.id===JOINED);
function gen(){const A="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s;do{s="";for(let i=0;i<6;i++)s+=A[Math.floor(Math.random()*A.length)]}while(DRAFT.some(c=>c.code===s));return s}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
const LINK=location.origin+"/";
let DIRTY=false;
async function copy(t,btn){let ok=false;
  try{await navigator.clipboard.writeText(t);ok=true}catch(e){
    try{const x=document.createElement("textarea");x.value=t;x.style.cssText="position:fixed;opacity:0";document.body.appendChild(x);x.select();ok=document.execCommand("copy");x.remove()}catch(y){}}
  btn.textContent=ok?"Nusxalandi!":"Nusxalab bo'lmadi, kodni qo'lda yozib bering"}
const inviteText=c=>`${c.name} uchun Super SAT.\nHavola: ${LINK}\nTaklif kodi: ${c.code}\nHavolani ochib, "Sinfga qo'shilish" joyiga shu kodni kiriting.`;
const TOKEN=()=>{try{return localStorage.getItem("tt")||""}catch(e){return""}};
const setToken=t=>{try{localStorage.setItem("tt",t)}catch(e){}};
const clearToken=()=>{try{localStorage.removeItem("tt")}catch(e){}IS_OWNER=false};
async function saveClasses(cl){
  const r=await fetch("/api/classes",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+TOKEN()},body:JSON.stringify({classes:cl})});
  if(!r.ok){const e=new Error("save");e.code=r.status;throw e}
  return r.json();
}
