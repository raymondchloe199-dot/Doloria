(() => {
 'use strict';
 const track=document.getElementById('cms-resources');
 const controls=document.getElementById('carousel-controls');
 const prev=document.getElementById('resource-prev'),next=document.getElementById('resource-next');
 const position=document.getElementById('carousel-position');
 let index=0;
 function update(){
  const cards=[...track.children];
  if(!cards.length)return;
  const left=track.getBoundingClientRect().left;
  index=cards.reduce((best,card,i)=>Math.abs(card.getBoundingClientRect().left-left)<Math.abs(cards[best].getBoundingClientRect().left-left)?i:best,0);
  controls.hidden=cards.length<2;
  prev.disabled=index===0;next.disabled=index===cards.length-1;
  position.textContent=`${index+1} / ${cards.length}`;
  cards.forEach((card,i)=>{card.setAttribute('role','group');card.setAttribute('aria-roledescription','diapositive');card.setAttribute('aria-label',`${i+1} sur ${cards.length}`);});
 }
 function move(step){
  const cards=[...track.children],target=cards[Math.max(0,Math.min(cards.length-1,index+step))];
  if(target)track.scrollBy({left:target.getBoundingClientRect().left-track.getBoundingClientRect().left-4,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 track.addEventListener('keydown',e=>{if(e.target===track&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}});
 track.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
 new MutationObserver(update).observe(track,{childList:true});update();
 const preview=new URLSearchParams(location.search).get('apercu')==='1';
 function el(tag,text){const node=document.createElement(tag);if(text)node.textContent=text;return node;}
 function url(value){if(typeof value!=='string'||!value.trim())return null;try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
 async function load(name){
  const status=document.getElementById(`${name}-status`),list=document.getElementById(`${name}-list`);
  try{
   const response=await fetch(`cms-${name}.json`,{cache:'no-cache',credentials:'omit'});if(!response.ok)throw Error();
   const raw=await response.text(),data=raw.trim()?JSON.parse(raw):{};
   const items=(Array.isArray(data.elements)?data.elements:[]).filter(x=>x&&typeof x==='object'&&(preview||x.publie===true));
   status.textContent=items.length?'':name==='lectures'?'Les livres et magazines seront ajoutés ici prochainement.':'Les premiers livrets seront disponibles ici prochainement.';
   for(const item of items){
    const article=el('article');article.className='publication';
    const image=url(item.image);if(image){const img=el('img');img.src=image;img.alt=item.descriptionImage||`Couverture : ${item.titre||'document'}`;img.loading='lazy';article.append(img);}
    const body=el('div');body.append(el('h3',item.titre||'Document'));if(item.description)body.append(el('p',item.description));
    const href=url(item.fichier)||url(item.lien);if(href){const a=el('a','Consulter le document →');a.href=href;body.append(a);}
    if(item.transcription){const details=el('details');details.append(el('summary','En savoir plus'),el('p',item.transcription));body.append(details);}
    if(item.sources)body.append(el('p',`Références : ${item.sources}`));article.append(body);list.append(article);
   }
  }catch{status.textContent='Le chargement est momentanément indisponible. Réessayez ou contactez Doloria.';}
 }
 load('lectures');load('livrets');
})();
