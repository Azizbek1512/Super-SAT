/* Super SAT — app shell: navigation, language, theme, keyboard shortcuts, back-to-top. */
(function(){
"use strict";
const root=document.documentElement,body=document.body,app=document.getElementById("app");
const I18N=window.SSI18N;

/* ---------- theme ---------- */
const themeBtn=document.getElementById("themeBtn");
function paintTheme(){
  const dark=root.classList.contains("dark"),label=dark?"Yorug' rejim":"Qorong'i rejim";
  themeBtn.querySelector(".i-moon").toggleAttribute("hidden",dark);themeBtn.querySelector(".i-sun").toggleAttribute("hidden",!dark);
  themeBtn.setAttribute("aria-label",label);themeBtn.title=label;
  const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=dark?"#0a0a0a":"#fafafa";
}
themeBtn.addEventListener("click",()=>{
  const t=root.classList.contains("dark")?"light":"dark";
  root.classList.toggle("dark",t==="dark");root.dataset.theme=t;
  try{localStorage.setItem("ss-theme",t)}catch(e){}
  paintTheme();
});
paintTheme();

/* ---------- language ---------- */
document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>I18N.setLang(b.dataset.lang)));

/* ---------- navigation ---------- */
const SECTIONS={home:"home",lugat:"lugat",writing:"writing",reading:"reading",themes:"themes",mockHome:"mockHome",gmenu:"gmenu"};
function markActive(name){document.querySelectorAll(".nav [data-go],.drawer [data-go]").forEach(a=>a.classList.toggle("on",a.dataset.go===name))}
// remember which section the student is in, whichever way they got there
Object.keys(SECTIONS).forEach(k=>{const f=window[k];if(typeof f!=="function")return;window[k]=function(){markActive(k);return f.apply(this,arguments)}});

function stopAll(){
  try{clearInterval(tick);clearTimeout(ADV);clearInterval(GT)}catch(e){}
  try{if(MS){clearInterval(MS.tk);MS=null}}catch(e){}
  document.querySelectorAll('body>div[style*="position:fixed"],#nvm').forEach(o=>o.remove());
}
function go(name){
  const fn=window[name];if(typeof fn!=="function")return;
  const run=()=>{stopAll();fn();closeDrawer();window.scrollTo({top:0,behavior:"instant"})};
  let inExam=false;try{inExam=!!(MS&&MS.cur&&MS.si<MS.st.length)}catch(e){}
  if(inExam&&typeof mDlg==="function"){closeDrawer();mDlg("Imtihonni tark etasizmi? Natijalar saqlanmaydi.",[["Davom etish",()=>{}],["Chiqish",run,1]]);return}
  run();
}
document.addEventListener("click",e=>{
  const a=e.target.closest("[data-go]");if(!a)return;
  e.preventDefault();go(a.dataset.go);
});

/* mobile drawer */
const drawer=document.getElementById("drawer"),menuBtn=document.getElementById("menuBtn");
function closeDrawer(){drawer.hidden=true;menuBtn.setAttribute("aria-expanded","false")}
menuBtn.addEventListener("click",()=>{const open=drawer.hidden;drawer.hidden=!open;menuBtn.setAttribute("aria-expanded",String(open))});
window.addEventListener("resize",()=>{if(window.innerWidth>=1024)closeDrawer()});

/* page-level state after every screen change */
new MutationObserver(()=>{
  body.classList.toggle("in-mock",!!app.querySelector(".mwrap"));
}).observe(app,{childList:true});

/* ---------- back to top ---------- */
const toTop=document.getElementById("toTop");
const onScroll=()=>{toTop.hidden=window.scrollY<600};
window.addEventListener("scroll",onScroll,{passive:true});onScroll();
toTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

/* ---------- keyboard shortcuts ---------- */
const visible=el=>el&&!el.hidden&&el.offsetParent!==null;
document.addEventListener("keydown",e=>{
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  const t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;
  const overlay=document.querySelector('body>div[style*="position:fixed"],#nvm');
  if(e.key==="Escape"){
    if(!drawer.hidden){closeDrawer();return}
    if(overlay){const c=overlay.querySelector("#nvx,#nx_,#rx,#cx");if(c)c.click()}
    return;
  }
  if(overlay)return;
  const k=e.key.toLowerCase(),idx="abcd".indexOf(k)>=0?"abcd".indexOf(k):"1234".indexOf(k);
  if(idx>=0){
    const opts=[...app.querySelectorAll("[data-k]")].filter(visible);
    const list=opts.length?opts:[...app.querySelectorAll(".btn.go")].filter(visible);
    if(list[idx]){e.preventDefault();list[idx].click()}
    return;
  }
  if(e.key==="Enter"){
    // a focused control (other than an answer option) keeps its own Enter behaviour
    if(t&&t.tagName==="BUTTON"&&!t.matches("[data-k],.btn.go"))return;
    const ok=app.querySelector("#ok"),nx=app.querySelector("#nx");
    if(visible(ok)){e.preventDefault();ok.click()}else if(visible(nx)){e.preventDefault();nx.click()}
    return;
  }
  if(app.querySelector(".mwrap")){
    if(e.key==="ArrowRight"){const b=app.querySelector("#mnx");if(b){e.preventDefault();b.click()}}
    if(e.key==="ArrowLeft"){const b=app.querySelector("#mbk");if(b&&!b.disabled){e.preventDefault();b.click()}}
  }
});

/* ---------- start ---------- */
I18N.start();
document.addEventListener("ss:lang",paintTheme);
})();
