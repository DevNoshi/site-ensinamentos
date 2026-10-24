// Leitor da Bíblia: lê js/biblia/blivre.json (Bíblia Livre, CC BY 3.0 Brasil)
(function(){
"use strict";
const SRC="js/biblia/blivre.json";
const $=i=>document.getElementById(i);
const box=$("biblia-box");
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
let todos=[],mapa={},livros=[],carga=null,montado=false,cur={b:1,c:1},sel=null,timer;
const ler=k=>{try{return JSON.parse(store.get(k)||"{}")||{}}catch(e){return {}}};
let dest=ler("lampada-dest"),notas=ler("lampada-nota");
const chave=(b,c,v)=>b+"-"+c+"-"+v;
const caps=b=>Object.keys(mapa[b].caps).map(Number).sort((x,y)=>x-y);

function carregar(){
 if(carga)return carga;
 carga=fetch(SRC).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(j=>{
  j.verses.forEach(v=>{
   const x={b:v.book,n:v.book_name,c:v.chapter,v:v.verse,t:v.text.replace(/^¶\s*/,"").trim()};
   todos.push(x);
   const m=mapa[x.b]||(mapa[x.b]={n:x.n,caps:{}});
   (m.caps[x.c]||(m.caps[x.c]=[])).push(x);
  });
  livros=Object.keys(mapa).map(Number).sort((a,b)=>a-b);
 });
 carga.catch(()=>{carga=null});
 return carga;
}
const versiculos=(b,c,a,z)=>{const m=mapa[b];return m&&m.caps[c]?m.caps[c].filter(v=>v.v>=a&&v.v<=(z||a)):[]};
window.Biblia={carregar,versiculos,esc};

async function abrir(alvo){
 if(!montado){
  box.innerHTML='<p class="sub">Carregando a Bíblia…</p>';
  try{await carregar()}catch(e){
   box.innerHTML='<p class="sub">Não foi possível carregar a Bíblia. Se você abriu o arquivo direto do computador, use um servidor local (extensão Live Server do VS Code) ou publique o site.</p><button class="btn" id="biblia-abrir">Tentar de novo</button>';
   $("biblia-abrir").onclick=()=>abrir();return;
  }
  montar();montado=true;
 }
 const a=alvo||{b:livros[0],c:1,v:0};
 mostra(a.b,a.c,a.v);
}

function montar(){
 box.innerHTML=`<div class="bib-ctl"><select id="bl" aria-label="Livro"></select><select id="bc" aria-label="Capítulo"></select><button class="btn ghost" id="bp" aria-label="Capítulo anterior">‹</button><button class="btn ghost" id="bn" aria-label="Próximo capítulo">›</button></div>
 <input id="bq" type="search" placeholder="Buscar uma palavra ou expressão" aria-label="Buscar na Bíblia">
 <div class="row" style="margin:0 0 8px"><button class="btn ghost sm" id="bm">Minhas marcações</button></div>
 <div id="br"></div><article id="bt"></article>
 <div id="ba" hidden>
  <div class="ba-top"><b id="ba-t"></b><button class="x" id="ba-x" aria-label="Fechar">×</button></div>
  <div class="ba-cores"><button class="sw s1" data-h="1" aria-label="Destacar em âmbar"></button><button class="sw s2" data-h="2" aria-label="Destacar em verde"></button><button class="sw s3" data-h="3" aria-label="Destacar em azul"></button><button class="btn ghost sm" data-h="0">Remover destaque</button></div>
  <textarea id="ba-n" aria-label="Anotação do versículo" placeholder="Anotação sobre este versículo"></textarea>
  <div class="row"><button class="btn ghost sm" id="ba-c">Copiar texto</button><button class="btn ghost sm" id="ba-s">Compartilhar</button></div>
 </div>`;
 $("bl").innerHTML=livros.map(b=>`<option value="${b}">${esc(mapa[b].n)}</option>`).join("");
 $("bl").onchange=()=>mostra(+$("bl").value,1,0,true);
 $("bc").onchange=()=>mostra(cur.b,+$("bc").value,0,true);
 $("bp").onclick=()=>vai(-1);$("bn").onclick=()=>vai(1);
 $("bt").addEventListener("click",ev=>{const s=ev.target.closest(".v");if(s)selecionar(s)});
 $("bt").addEventListener("keydown",ev=>{if(ev.key==="Enter"||ev.key===" "){const s=ev.target.closest(".v");if(s){ev.preventDefault();selecionar(s)}}});
 $("bq").addEventListener("input",()=>{clearTimeout(timer);timer=setTimeout(()=>busca($("bq").value),250)});
 $("bm").onclick=marcas;
 $("br").addEventListener("click",ev=>{const r=ev.target.closest("[data-b]");if(!r)return;
  mostra(+r.dataset.b,+r.dataset.c,+r.dataset.v,true);
  const s=$("bt").querySelector(`[data-v="${r.dataset.v}"]`);if(s)selecionar(s);
  $("bq").value="";$("br").innerHTML=""});
 $("ba-x").onclick=()=>{$("ba").hidden=true;sel=null;$("bt").querySelectorAll(".v.on").forEach(e=>e.classList.remove("on"))};
 $("ba").querySelectorAll("[data-h]").forEach(b=>b.onclick=()=>cor(+b.dataset.h));
 $("ba-n").addEventListener("input",()=>{if(!sel)return;const k=chave(sel.b,sel.c,sel.v),t=$("ba-n").value.trim();
  if(t)notas[k]=t;else delete notas[k];store.set("lampada-nota",JSON.stringify(notas));aplica(k)});
 $("ba-c").onclick=async()=>{if(!sel)return;const x=versiculos(sel.b,sel.c,sel.v)[0];
  try{await navigator.clipboard.writeText("“"+x.t+"” — "+x.n+" "+sel.c+":"+sel.v);toast("Texto copiado")}catch(e){toast("Não foi possível copiar")}};
 $("ba-s").onclick=()=>{if(!sel)return;share($("ba-t").textContent+" — Lâmpada",base()+"#b-"+chave(sel.b,sel.c,sel.v))};
}

function mostra(b,c,vs,rolar){
 if(!mapa[b]||!mapa[b].caps[c]){b=livros[0];c=1;vs=0}
 cur={b,c};sel=null;const m=mapa[b];
 $("ba").hidden=true;$("bl").value=b;
 $("bc").innerHTML=caps(b).map(n=>`<option value="${n}">${n}</option>`).join("");$("bc").value=c;
 $("bt").innerHTML=`<h3>${esc(m.n)} ${c}</h3><p>`+m.caps[c].map(v=>{const k=chave(b,c,v.v);
  return `<span class="v${v.v===vs?" on":""}${dest[k]?" h"+dest[k]:""}${notas[k]?" n":""}" role="button" tabindex="0" data-v="${v.v}"><sup>${v.v}</sup> ${esc(v.t)}</span> `}).join("")+`</p><p class="dica">Toque em um versículo para destacar, anotar ou compartilhar.</p>`;
 history.replaceState(null,"","#b-"+b+"-"+c+(vs?"-"+vs:""));
 const alvo=vs&&$("bt").querySelector(`[data-v="${vs}"]`);
 if(alvo)alvo.scrollIntoView({block:"center"});else if(rolar)box.scrollIntoView();
}

function vai(d){
 const cs=caps(cur.b),i=cs.indexOf(cur.c)+d;
 if(i>=0&&i<cs.length)return mostra(cur.b,cs[i],0,true);
 const k=livros.indexOf(cur.b)+d;if(k<0||k>=livros.length)return;
 const nc=caps(livros[k]);mostra(livros[k],d>0?nc[0]:nc[nc.length-1],0,true);
}

function selecionar(s){
 $("bt").querySelectorAll(".v.on").forEach(e=>e.classList.remove("on"));
 s.classList.add("on");
 sel={b:cur.b,c:cur.c,v:+s.dataset.v};
 const k=chave(sel.b,sel.c,sel.v);
 $("ba-t").textContent=mapa[sel.b].n+" "+sel.c+":"+sel.v;
 $("ba-n").value=notas[k]||"";
 $("ba").hidden=false;
 history.replaceState(null,"","#b-"+k);
}
function aplica(k){
 if(!sel)return;
 const s=$("bt").querySelector(`[data-v="${sel.v}"]`);if(!s)return;
 s.classList.remove("h1","h2","h3");if(dest[k])s.classList.add("h"+dest[k]);
 s.classList.toggle("n",!!notas[k]);
}
function cor(n){
 if(!sel)return;const k=chave(sel.b,sel.c,sel.v);
 if(n)dest[k]=n;else delete dest[k];
 store.set("lampada-dest",JSON.stringify(dest));aplica(k);
}
function marcas(){
 const ks=[...new Set([...Object.keys(dest),...Object.keys(notas)])].sort((a,b)=>{const x=a.split("-").map(Number),y=b.split("-").map(Number);return x[0]-y[0]||x[1]-y[1]||x[2]-y[2]});
 $("bq").value="";
 $("br").innerHTML=ks.length?`<p class="dica">Minhas marcações (${ks.length})</p>`+ks.map(k=>{
  const [b,c,v]=k.split("-").map(Number),m=mapa[b],x=m&&(m.caps[c]||[]).find(y=>y.v===v);
  if(!x)return "";
  return `<button class="r" data-b="${b}" data-c="${c}" data-v="${v}">${dest[k]?`<i class="dot s${dest[k]}"></i>`:""}<b>${esc(x.n)} ${c}:${v}</b> ${esc(x.t)}${notas[k]?`<br><em>${esc(notas[k])}</em>`:""}</button>`}).join(""):'<p class="dica">Você ainda não destacou nem anotou nenhum versículo.</p>';
}
function busca(q){
 const n=norm(q.trim()),R=$("br");
 if(n.length<3){R.innerHTML="";return}
 const out=[];
 for(const v of todos){if(norm(v.t).includes(n)){out.push(v);if(out.length>=60)break}}
 R.innerHTML=out.length?out.map(v=>`<button class="r" data-b="${v.b}" data-c="${v.c}" data-v="${v.v}"><b>${esc(v.n)} ${v.c}:${v.v}</b> ${esc(v.t)}</button>`).join("")+(out.length>=60?'<p class="dica">Mostrando os 60 primeiros resultados. Use mais palavras para refinar.</p>':""):'<p class="dica">Nenhum resultado.</p>';
}

$("biblia-abrir").onclick=()=>abrir();
function porLink(){
 const m=/^#b-(\d+)-(\d+)(?:-(\d+))?$/.exec(location.hash);
 if(m)abrir({b:+m[1],c:+m[2],v:m[3]?+m[3]:0}).then(()=>{if(!m[3])box.scrollIntoView()});
}
addEventListener("hashchange",porLink);porLink();
})();
