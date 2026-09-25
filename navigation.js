(()=>{
const header=document.getElementById('site-header'),button=document.getElementById('site-menu-toggle'),menu=document.getElementById('site-menu');if(!header||!button||!menu)return;
header.classList.add('nav-ready');button.hidden=false;
const compact=matchMedia('(max-width:1400px)');
function close(restore=false){menu.classList.remove('open');button.setAttribute('aria-expanded','false');if(restore)button.focus();}
button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';menu.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));if(open)menu.querySelector('a').focus();});
menu.addEventListener('click',e=>{if(e.target.closest('a'))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))close(true);});
document.addEventListener('click',e=>{if(!header.contains(e.target))close();});
header.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!header.contains(document.activeElement))close();}));
compact.addEventListener('change',()=>close());
function measure(){const h=header.getBoundingClientRect().height;document.documentElement.style.setProperty('--site-header-height',h+'px');document.documentElement.style.setProperty('scroll-padding-top',(h+16)+'px');}
if(typeof ResizeObserver!=='undefined')new ResizeObserver(measure).observe(header);measure();
})();