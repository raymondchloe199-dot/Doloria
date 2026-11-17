
(() => {
document.querySelectorAll('#cms-resources,#cms-dicoloria').forEach(list=>{
const label=list.id==='cms-dicoloria'?'Dicoloria':'Infographies';
const shell=document.createElement('div');shell.className='infographic-slider';list.before(shell);shell.append(list);
list.tabIndex=0;list.setAttribute('role','region');list.setAttribute('aria-label',label+' — utilisez les flèches gauche et droite pour parcourir la collection');
function button(label,side,text){const b=document.createElement('button');b.type='button';b.className='infographic-arrow '+side;b.textContent=text;b.setAttribute('aria-label',label);b.setAttribute('aria-controls',list.id);shell.append(b);return b}
const prev=button(label+' : précédentes','prev','←'),next=button(label+' : suivantes','next','→');
const count=document.createElement('p');count.className='infographic-count';count.setAttribute('role','status');shell.append(count);
const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches||document.documentElement.classList.contains('no-motion');
function cards(){return [...list.children]}
function step(){const c=cards();return c.length>1?c[1].offsetLeft-c[0].offsetLeft:list.clientWidth}
function update(){const c=cards(),max=list.scrollWidth-list.clientWidth;prev.disabled=list.scrollLeft<2;next.disabled=list.scrollLeft>=max-2;prev.hidden=next.hidden=max<2;count.hidden=c.length===0;const visible=c.map((el,i)=>({i,r:el.getBoundingClientRect()})).filter(x=>x.r.left<list.getBoundingClientRect().right-5&&x.r.right>list.getBoundingClientRect().left+5);const first=visible[0]?.i+1||1,last=visible.at(-1)?.i+1||first;count.textContent=(first===last?first:first+'–'+last)+' / '+c.length}
function move(n){list.scrollBy({left:n*step(),behavior:reduced()?'instant':'smooth'})}
prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
list.addEventListener('keydown',e=>{if(e.target!==list)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
let drag=null,suppress=false;
list.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('summary,button,input,textarea,select'))return;drag={x:e.clientX,left:list.scrollLeft,id:e.pointerId};suppress=false});
list.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>6&&!list.classList.contains('is-dragging')){list.classList.add('is-dragging');list.setPointerCapture(e.pointerId);suppress=true}if(suppress){e.preventDefault();list.scrollLeft=drag.left-dx}});
function end(){drag=null;list.classList.remove('is-dragging')}
list.addEventListener('pointerup',end);list.addEventListener('pointercancel',end);list.addEventListener('lostpointercapture',end);
list.addEventListener('click',e=>{if(suppress){e.preventDefault();e.stopImmediatePropagation();suppress=false}},true);
list.addEventListener('dragstart',e=>e.preventDefault());
list.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(list);new MutationObserver(update).observe(list,{childList:true});update();
});
})();