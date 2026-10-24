const L=document.getElementById("lista"),T=document.getElementById("toast");
const store={get(k){try{return localStorage.getItem(k)||""}catch(e){return ""}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
function toast(m){T.textContent=m;T.classList.add("on");setTimeout(()=>T.classList.remove("on"),1800)}
const base=()=>location.href.split("#")[0];
async function share(title,url){
 try{if(navigator.share){await navigator.share({title,url});return}}catch(e){if(e&&e.name==="AbortError")return}
 try{await navigator.clipboard.writeText(url);toast("Link copiado")}catch(e){toast("Copie o link na barra de endereço")}
}
const quando=f=>window.Biblia?f():addEventListener("load",f);
function preencher(d,e){
 const q=d.querySelector("blockquote");
 Biblia.carregar().then(()=>{
  const vs=Biblia.versiculos(...e.p);
  if(!vs.length)throw new Error("vazio");
  q.innerHTML=vs.map(v=>`<sup>${v.v}</sup> ${Biblia.esc(v.t)}`).join(" ")+`<cite>${e.r}</cite>`;
  d.dataset.ok=1;
 }).catch(()=>{q.innerHTML=`Não foi possível carregar o texto. Veja ${e.r} no leitor da Bíblia.<cite>${e.r}</cite>`});
}
let grupo="";
estudos.forEach(e=>{
 if(e.g!==grupo){grupo=e.g;const h=document.createElement("h3");h.className="grp";h.textContent=grupo;L.appendChild(h)}
 const d=document.createElement("details");d.id=e.id;
 d.innerHTML=`<summary>${e.t}<span>${e.r}</span></summary><div class="body">
 <blockquote class="vs">Carregando o texto…<cite>${e.r}</cite></blockquote><p>${e.x}</p>
 <h4>Para refletir</h4><ul>${e.q.map(q=>`<li>${q}</li>`).join("")}</ul>
 <h4>Suas anotações</h4><textarea aria-label="Suas anotações sobre ${e.t}" placeholder="Escreva o que Deus falou com você."></textarea>
 <div class="row"><button class="btn ghost">Compartilhar este estudo</button></div></div>`;
 const ta=d.querySelector("textarea");ta.value=store.get("nota-"+e.id);
 ta.addEventListener("input",()=>store.set("nota-"+e.id,ta.value));
 d.querySelector(".row button").onclick=()=>share(e.t+" — Lâmpada",base()+"#"+e.id);
 d.addEventListener("toggle",()=>{if(d.open&&!d.dataset.ok)quando(()=>preencher(d,e))});
 L.appendChild(d);
});
document.getElementById("tl").innerHTML=linha.map(a=>`<li><b>${a[0]}</b><small>${a[1]}</small><br>${a[2]}</li>`).join("");
function abrir(){const h=location.hash.slice(1),el=h&&document.getElementById(h);if(el&&el.tagName==="DETAILS"){el.open=true;el.scrollIntoView()}}
addEventListener("hashchange",abrir);abrir();
document.getElementById("shareSite").onclick=()=>share("Lâmpada — estudo bíblico",base());
const hero=document.querySelector(".hero");
hero.addEventListener("pointermove",ev=>{const b=hero.getBoundingClientRect();hero.style.setProperty("--x",(ev.clientX-b.left)+"px");hero.style.setProperty("--y",(ev.clientY-b.top)+"px")});
