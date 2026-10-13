(()=>{
const dialog=document.getElementById('menu-dialog'),opener=document.getElementById('immersive-menu'),closer=document.getElementById('close-menu');
opener.hidden=false;opener.addEventListener('click',()=>{dialog.showModal();document.documentElement.classList.add('menu-visible');closer.focus()});
closer.addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{document.documentElement.classList.remove('menu-visible');opener.focus()});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('waiting');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.kids-card').forEach(card=>{card.classList.add('waiting');observer.observe(card)});document.documentElement.classList.add('motion-ready')}
})();
