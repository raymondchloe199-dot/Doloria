(() => {
 const root=document.documentElement;
 // Informational pages share the same saved setting as the homepage.
 const button=document.getElementById('reading-motion');
 if(button){
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let saved=false;try{saved=localStorage.getItem('doloria-reduced-motion')==='true';}catch(_){}
  function apply(){const reduced=saved||media.matches;root.classList.toggle('no-motion',reduced);button.setAttribute('aria-pressed',String(reduced));button.disabled=media.matches;button.textContent=media.matches?'Animations réduites par votre appareil':reduced?'Animations réduites':'Réduire les animations';}
  button.parentElement.hidden=false;
  button.addEventListener('click',()=>{saved=!saved;try{localStorage.setItem('doloria-reduced-motion',String(saved));}catch(_){}apply();});
  media.addEventListener('change',apply);apply();
 }
 // Give in-page navigation a real keyboard destination, including the skip link.
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  if(!link||event.defaultPrevented||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  let target;try{target=document.getElementById(decodeURIComponent(link.hash.slice(1)));}catch(_){return;}
  if(!target)return;
  if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');
  requestAnimationFrame(()=>target.focus({preventScroll:true}));
 });
 // Expanded header height can change with zoom, wrapping and larger text.
 const header=document.querySelector('header');
 if(document.getElementById('motion')&&header&&typeof ResizeObserver!=='undefined'){
  // Keep the navigation minimum independent of the measured header height.
  const nav=header.querySelector('nav');
  function measure(){nav.style.minHeight=innerWidth<=760?'78px':innerWidth<=1000?'88px':'100px';const height=header.getBoundingClientRect().height;root.style.setProperty('--header',height+'px');}
  new ResizeObserver(measure).observe(header);addEventListener('resize',measure,{passive:true});measure();
 }
})();
