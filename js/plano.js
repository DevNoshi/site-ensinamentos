// Plano de leitura: 8 semanas, progresso salvo no navegador
(function(){
const box=document.getElementById("plano-box");if(!box)return;
const KEY="lampada-plano";
let feito;try{feito=JSON.parse(store.get(KEY)||"[]")}catch(e){feito=[]}
if(!Array.isArray(feito))feito=[];
const total=plano.reduce((n,s)=>n+s.d.length,0);
let i=0;
box.innerHTML=`<p class="sub" id="pl-t"></p><div class="bar"><i id="pl-b"></i></div>`+plano.map((s,w)=>
 `<details id="pw${w}"><summary>Semana ${w+1}: ${s.t}<span id="pc${w}"></span></summary><div class="body">`+
 s.d.map((d,k)=>{const idx=i++;return `<div class="dia"><label><input type="checkbox" data-i="${idx}"><span>Dia ${k+1}: ${d[0]} ${d[2]}</span></label><a class="btn ghost sm" href="#b-${d[1]}-${d[2]}">Ler</a></div>`}).join("")+
 `</div></details>`).join("")+`<div class="row"><button class="btn ghost sm" id="pl-r">Recomeçar plano</button></div>`;
function atualiza(){
 box.querySelectorAll("input[data-i]").forEach(c=>c.checked=feito.includes(+c.dataset.i));
 let ini=0;plano.forEach((s,w)=>{const n=s.d.filter((_,k)=>feito.includes(ini+k)).length;ini+=s.d.length;document.getElementById("pc"+w).textContent=n+" de "+s.d.length});
 document.getElementById("pl-t").textContent=feito.length+" de "+total+" leituras concluídas";
 document.getElementById("pl-b").style.width=(feito.length/total*100)+"%";
}
box.addEventListener("change",ev=>{const c=ev.target.closest("input[data-i]");if(!c)return;
 const n=+c.dataset.i;feito=feito.filter(x=>x!==n);if(c.checked)feito.push(n);
 store.set(KEY,JSON.stringify(feito));atualiza()});
document.getElementById("pl-r").onclick=()=>{if(confirm("Apagar o progresso do plano?")){feito=[];store.set(KEY,"[]");atualiza()}};
atualiza();
let ini=0;for(let w=0;w<plano.length;w++){const n=plano[w].d.filter((_,k)=>feito.includes(ini+k)).length;ini+=plano[w].d.length;if(n<plano[w].d.length){document.getElementById("pw"+w).open=true;break}}
})();
