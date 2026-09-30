(()=>{
const header=document.getElementById('site-header'),button=document.getElementById('site-menu-toggle'),menu=document.getElementById('site-menu');if(!header||!button||!menu)return;
header.classList.add('nav-ready');button.hidden=false;
const compact=matchMedia('(max-width:1400px)'),hover=matchMedia('(hover:hover) and (pointer:fine)'),groups=[...menu.querySelectorAll('.site-pro-menu')];
const timers=new Map();
function cancel(group){clearTimeout(timers.get(group));timers.delete(group)}
function closeGroups(){groups.forEach(group=>{cancel(group);group.open=false})}
function close(restore=false){closeGroups();menu.classList.remove('open');button.setAttribute('aria-expanded','false');if(restore)button.focus()}
button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';if(!open){close();return}menu.classList.add('open');button.setAttribute('aria-expanded','true');menu.querySelector('a').focus()});
groups.forEach(group=>{
const summary=group.querySelector('summary');group.classList.toggle('has-current',!!group.querySelector('[aria-current="page"]'));
group.addEventListener('pointerenter',e=>{cancel(group);if(e.pointerType==='mouse'&&hover.matches)group.open=true});
group.addEventListener('pointerleave',()=>{cancel(group);timers.set(group,setTimeout(()=>{if(!group.contains(document.activeElement))group.open=false},220))});
summary.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();cancel(group);group.open=true;group.querySelector('a').focus()}});
});
// Preserve native link activation, including Safari's pointer/focus ordering.
menu.addEventListener('click',e=>{if(e.target.closest('a'))requestAnimationFrame(()=>close())});
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;const group=groups.find(g=>g.open);if(group){e.preventDefault();cancel(group);group.open=false;group.querySelector('summary').focus()}else if(menu.classList.contains('open')){e.preventDefault();close(true)}});
document.addEventListener('click',e=>{groups.forEach(g=>{if(!g.contains(e.target)){cancel(g);g.open=false}});if(!header.contains(e.target))close()});
document.addEventListener('keyup',e=>{if(e.key!=='Tab')return;groups.forEach(g=>{if(!g.contains(document.activeElement)){cancel(g);g.open=false}});if(!header.contains(document.activeElement))close()});
compact.addEventListener('change',()=>close());
function measure(){const h=header.getBoundingClientRect().height;document.documentElement.style.setProperty('--site-header-height',h+'px');document.documentElement.style.setProperty('scroll-padding-top',(h+16)+'px')}
if(typeof ResizeObserver!=='undefined')new ResizeObserver(measure).observe(header);measure();
})();
