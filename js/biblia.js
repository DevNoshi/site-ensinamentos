// Leitor da Bíblia: lê js/biblia/blivre.json (Bíblia Livre, CC BY 3.0 Brasil)
(function(){
"use strict";
const SRC="js/biblia/blivre.json";
const $=i=>document.getElementById(i);
const box=$("biblia-box");
let todos=[],mapa={},livros=[],pronto=false,cur={b:1,c:1},timer;
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const caps=b=>Object.keys(mapa[b].caps).map(Number).sort((x,y)=>x-y);

async function abrir(alvo){
 if(!pronto){
  box.innerHTML='<p class="sub">Carregando a Bíblia…</p>';
  try{
   const r=await fetch(SRC);if(!r.ok)throw new Error(r.status);
   const j=await r.json();
   j.verses.forEach(v=>{
    const x={b:v.book,n:v.book_name,c:v.chapter,v:v.verse,t:v.text.replace(/^¶\s*/,"").trim()};
    todos.push(x);
    const m=mapa[x.b]||(mapa[x.b]={n:x.n,caps:{}});
    (m.caps[x.c]||(m.caps[x.c]=[])).push(x);
   });
   livros=Object.keys(mapa).map(Number).sort((a,b)=>a-b);
   montar();pronto=true;
  }catch(e){
   box.innerHTML='<p class="sub">Não foi possível carregar a Bíblia. Se você abriu o arquivo direto do computador, use um servidor local (extensão Live Server do VS Code) ou publique o site.</p><button class="btn" id="biblia-abrir">Tentar de novo</button>';
   $("biblia-abrir").onclick=()=>abrir();return;
  }
 }
 const a=alvo||{b:livros[0],c:1,v:0};
 mostra(a.b,a.c,a.v);
}

function montar(){
 box.innerHTML=`<div class="bib-ctl"><select id="bl" aria-label="Livro"></select><select id="bc" aria-label="Capítulo"></select><button class="btn ghost" id="bp" aria-label="Capítulo anterior">‹</button><button class="btn ghost" id="bn" aria-label="Próximo capítulo">›</button></div>
 <input id="bq" type="search" placeholder="Buscar uma palavra ou expressão" aria-label="Buscar na Bíblia"><div id="br"></div><article id="bt"></article>`;
 $("bl").innerHTML=livros.map(b=>`<option value="${b}">${esc(mapa[b].n)}</option>`).join("");
 $("bl").onchange=()=>mostra(+$("bl").value,1,0,true);
 $("bc").onchange=()=>mostra(cur.b,+$("bc").value,0,true);
 $("bp").onclick=()=>vai(-1);$("bn").onclick=()=>vai(1);
 $("bt").addEventListener("click",ev=>{const s=ev.target.closest(".v");if(s)marca(s)});
 $("bt").addEventListener("keydown",ev=>{if(ev.key==="Enter"){const s=ev.target.closest(".v");if(s)marca(s)}});
 $("bq").addEventListener("input",()=>{clearTimeout(timer);timer=setTimeout(()=>busca($("bq").value),250)});
 $("br").addEventListener("click",ev=>{const r=ev.target.closest("[data-b]");if(!r)return;
  mostra(+r.dataset.b,+r.dataset.c,+r.dataset.v,true);$("bq").value="";$("br").innerHTML=""});
}

function mostra(b,c,vs,rolar){
 if(!mapa[b]||!mapa[b].caps[c]){b=livros[0];c=1;vs=0}
 cur={b,c};const m=mapa[b];
 $("bl").value=b;
 $("bc").innerHTML=caps(b).map(n=>`<option value="${n}">${n}</option>`).join("");$("bc").value=c;
 $("bt").innerHTML=`<h3>${esc(m.n)} ${c}</h3><p>`+m.caps[c].map(v=>`<span class="v${v.v===vs?" on":""}" role="button" tabindex="0" data-v="${v.v}"><sup>${v.v}</sup> ${esc(v.t)}</span> `).join("")+`</p><p class="dica">Toque em um versículo para compartilhar o link dele.</p>`;
 history.replaceState(null,"","#b-"+b+"-"+c+(vs?"-"+vs:""));
 const alvo=vs&&$("bt").querySelector(`[data-v="${vs}"]`);
 if(alvo)alvo.scrollIntoView({block:"center"});else if(rolar)box.scrollIntoView();
}

function vai(d){
 const cs=caps(cur.b),i=cs.indexOf(cur.c)+d;
 if(i>=0&&i<cs.length)return mostra(cur.b,cs[i],0,true);
 const k=livros.indexOf(cur.b)+d;if(k<0||k>=livros.length)return;
 const nb=livros[k];const nc=caps(nb);mostra(nb,d>0?nc[0]:nc[nc.length-1],0,true);
}

function marca(s){
 $("bt").querySelectorAll(".v.on").forEach(e=>e.classList.remove("on"));
 s.classList.add("on");
 const v=+s.dataset.v,n=mapa[cur.b].n;
 history.replaceState(null,"","#b-"+cur.b+"-"+cur.c+"-"+v);
 share(n+" "+cur.c+":"+v+" — Lâmpada",base()+"#b-"+cur.b+"-"+cur.c+"-"+v);
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
