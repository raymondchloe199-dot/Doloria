(()=>{
const header=document.getElementById('site-header'),menu=document.getElementById('site-menu'),button=document.getElementById('site-menu-toggle');
if(!header||!menu||!button)return;
const dialog=document.createElement('dialog');dialog.id='doloria-navigation';dialog.setAttribute('aria-labelledby','doloria-navigation-title');
const top=document.createElement('div');top.className='natural-menu-top';const title=document.createElement('p');title.id='doloria-navigation-title';title.textContent='Explorer Doloria';const close=document.createElement('button');close.type='button';close.textContent='Fermer ×';close.setAttribute('aria-label','Fermer le menu');top.append(title,close);dialog.append(top);
const nav=document.createElement('nav');nav.setAttribute('aria-label','Navigation principale');nav.append(menu);dialog.append(nav);document.body.append(dialog);
button.hidden=false;button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls',dialog.id);header.classList.add('natural-ready');
button.addEventListener('click',()=>{dialog.showModal();button.setAttribute('aria-expanded','true');document.documentElement.classList.add('natural-menu-open');close.focus()});close.addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{button.setAttribute('aria-expanded','false');document.documentElement.classList.remove('natural-menu-open');button.focus()});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right)dialog.close()}const a=e.target.closest('a');if(a&&a.hash&&a.pathname===location.pathname)requestAnimationFrame(()=>dialog.close());});
})();

// Keep each carousel's existing controls and handlers; arrange them around its track.
(()=>{
const setup=()=>{for(const [trackSelector,controlsSelector] of [['.actions-track','.actions-controls'],['.values-track','.values-controls'],['#cms-resources','#carousel-controls'],['#livrets-list','#booklet-controls']]){
const track=document.querySelector(trackSelector),controls=document.querySelector(controlsSelector);if(!track||!controls||track.closest('.side-carousel'))continue;
const shell=document.createElement('div');shell.className='side-carousel';track.before(shell);shell.append(track,controls);track.classList.add('side-carousel-track');controls.classList.add('side-carousel-controls');
const buttons=controls.querySelectorAll('button');buttons.forEach((button,i)=>{if(!button.getAttribute('aria-label'))button.setAttribute('aria-label',i?'Suivant':'Précédent');button.textContent=i?'→':'←';});
}};setup();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);
})();
