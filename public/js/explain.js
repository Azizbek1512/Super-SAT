/* Super SAT — explanation renderers. Original content, extracted verbatim from Super SAT.html. */
function fillS(w){if(!w.p||!/_{3,}/.test(w.p)||w.k==='r')return"";const b=w.p.split(/(?<=[.!?”"])\s+(?=[A-Z“"‘'(])/),i=b.findIndex(x=>/_{3,}/.test(x));return i<0?"":b[i].replace(/_{3,}/,w.o[w.a]).replace(/\s+/g," ")}
function verHtml(w,K){const e=VER[(isRD(w)?"R":"W")+"|"+w.k+"|"+w.t];if(!e)return null;
 if(e.u)return `<div class="warn">Diqqat: bu savolning manbasida xato bor, shuning uchun aniq javobni isbotlab bo'lmaydi. Kitob kaliti: ${K}).</div><p class="pl"><b>Tekshiruv:</b>\n${esc(e.n)}</p>`;
 const ch=e.b!==e.a;
 return `<div class="vok">${e.m?e.m:`✅ Tekshirildi: to'g'ri javob <b>${K}</b>)${ch?` — kitobdagi javoblar kaliti ${String.fromCharCode(65+e.b)}) xato edi, tuzatildi.`:` — kitob kaliti bilan mos.`}`}${e.a2?` Shuningdek ${e.a2.map(j=>String.fromCharCode(65+j)+")").join(", ")} ham to'g'ri deb qabul qilinadi.`:""}</div><p class="pl"><b>Tahlil:</b>\n${esc(e.n)}</p>`}
function exHtmlR(w){
  const E=(RDEX[w.k]||{})[w.t],K=String.fromCharCode(65+w.a),L=K+") "+w.o[w.a];
  if(!E)return `<div class="xp"><b>Izoh</b><p>Bu savol uchun izoh hali qo'shilmagan.</p><p><b>To'g'ri javob:</b> ${esc(L)}</p></div>`;
  const V2=verHtml(w,K);
  if(V2)return `<div class="xp"><b>Izoh</b>${V2}${E.q?`<p class="pl"><b>Savol tarjimasi:</b> ${esc(E.q)}</p>`:""}<p class="pl"><b>Matn tarjimasi:</b>\n${esc(E.t)}</p><p><b>To'g'ri javob:</b> ${esc(L)}</p></div>`;
  return `<div class="xp"><b>Izoh</b>
  ${E.k?`<div class="warn">${E.k==="?"?`Diqqat: bu savolda variantlar matnga mos kelmaydi (kitobda xato bo'lishi mumkin). Javobni o'qituvchi bilan tekshiring.`:`Diqqat: izoh yozuvchisi bu savolda ${esc(E.k)}) variantni to'g'ri deb hisobladi, kitobdagi javoblar kaliti esa ${K}). Javobni o'qituvchi bilan tekshiring.`}</div>`:""}
  ${E.q?`<p class="pl"><b>Savol tarjimasi:</b> ${esc(E.q)}</p>`:""}
  <p class="pl"><b>Matn tarjimasi:</b>\n${esc(E.t)}</p>
  <p><b>To'g'ri javob:</b> ${esc(L)}</p>
  <p class="pl"><b>Tahlil:</b>\n${esc(E.z)}</p></div>`;
}
function exHtml(w){
  if(w.k==="ft"){const K=String.fromCharCode(65+w.a),L=K+") "+w.o[w.a],f=w.p.replace(/_{3,}/,"<b>"+esc(w.o[w.a])+"</b>");
    return `<div class="xp"><b>Izoh</b><p><b>Matn:</b> ${f.split("<b>").map((x,i)=>i?"<b>"+x.split("</b>").map((y,j)=>j?esc(y):y).join("</b>"):esc(x)).join("")}</p>${w.e?`<p>${esc(w.e)}</p>`:""}<p><b>To'g'ri javob:</b> ${esc(L)}</p></div>`}
  if(isRD(w))return exHtmlR(w);
  const E=EX[w.k][w.t],K=String.fromCharCode(65+w.a),L=K+") "+w.o[w.a],tr=w.k==="t"||w.k==="r";
  if(!E)return `<div class="xp"><b>Izoh</b><p>Bu test uchun izoh hali qo'shilmagan.</p><p><b>To'g'ri javob:</b> ${esc(L)}</p></div>`;
  const V2=verHtml(w,K);
  if(V2)return `<div class="xp"><b>Izoh</b>${V2.split('<p class="pl">')[0]}${fillS(w)?`<p><b>Matn:</b> ${esc(fillS(w))}</p>`:(E.e?`<p><b>Matn:</b> ${esc(E.e)}</p>`:"")}<p><b>${w.k==="r"?"Eslatmalar va vazifa (tarjima)":"Tarjima"}:</b> ${esc(E.t)}</p><p><b>To'g'ri javob:</b> ${esc(L)}</p>${'<p class="pl">'+V2.split('<p class="pl">')[1]}</div>`;
  return `<div class="xp"><b>Izoh</b>
  ${E.x?`<div class="warn">Diqqat: izoh yozilgan faylda bu testning javobi ${E.x}) deb ko'rsatilgan, kitobdagi javoblar kaliti esa ${K}). Javobni o'qituvchi bilan tekshiring.</div>`:""}
  ${E.e?`<p><b>Matn:</b> ${esc(E.e)}</p>`:""}
  <p><b>${w.k==="r"?"Eslatmalar va vazifa (tarjima)":"Tarjima"}:</b> ${esc(E.t)}</p>
  <p><b>To'g'ri javob:</b> ${esc(L)}${E.g?` (${esc(E.g)})`:""}</p>
  ${E.z?`<p class="pl"><b>${tr?"Tahlil":"Nima uchun"}:</b> ${w.k==="r"?"\n":""}${esc(E.z)}</p>`:""}</div>`;
}
function pp(s){return esc(s).replace(/_{4,}/g,'<span class="blank"></span>').replace(/⟦/g,'<u class="ul">').replace(/⟧/g,'</u>')}
