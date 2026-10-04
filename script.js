const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function go(p){
  if(!$('#'+p))p='home';
  $$('.page').forEach(x=>x.classList.toggle('on',x.id===p));
  $$('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.p===p));
  try{history.replaceState(null,'','#'+p)}catch(e){}
  window.scrollTo({top:0,behavior:'smooth'});
  if(p==='home')count();
}
$$('.tabs button').forEach(b=>b.onclick=()=>go(b.dataset.p));
$$('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
// typing
const roles=['Network Engineer','Network Tester','Problem Solver'];let ri=0,ci=0,del=false;
function type(){
  const w=roles[ri],el=$('#role');
  el.textContent=w.slice(0,ci);
  if(!del&&ci===w.length){del=true;return setTimeout(type,1400)}
  if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
  ci+=del?-1:1;setTimeout(type,del?40:90);
}
type();
// counters
function count(){
  $$('[data-n]').forEach(e=>{
    const t=+e.dataset.n;let c=0;
    const i=setInterval(()=>{e.textContent=(++c)+(t>3&&0?'':'')+(e.dataset.n==='3'&&e.nextElementSibling&&e.nextElementSibling.textContent.startsWith('Tahun')?'+':'');if(c>=t)clearInterval(i)},300);
  });
}
count();
// hobby click counters
$$('.score').forEach(b=>{let n=0;b.onclick=()=>{b.textContent=b.dataset.s+': '+(++n)}});
$$('.ball').forEach(b=>b.onclick=()=>{const c=b.parentElement.nextElementSibling.querySelector('.score');c.click()});
// form
$('#form').onsubmit=e=>{
  e.preventDefault();
  const f=e.target,ok=$('#ok');
  if(!f.checkValidity()){ok.className='ok show';ok.style.cssText='border-color:var(--co);color:var(--co)';ok.textContent='Lengkapi nama, email yang valid, dan pesan terlebih dahulu.';return}
  ok.style.cssText='';ok.className='ok';void ok.offsetWidth;ok.className='ok show';
  ok.textContent='Terima kasih, '+$('#n').value+'! Pesan Anda sudah dicatat. (Demo: belum terkirim ke server.)';
  f.reset();
};
go(location.hash.slice(1)||'home');