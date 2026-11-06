(() => {
'use strict';
 const preview=new URLSearchParams(location.search).get('apercu')==='1';
 function el(tag,text){const node=document.createElement(tag);if(text)node.textContent=text;return node;}
 function url(value){if(typeof value!=='string'||!value.trim())return null;try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}

 const dialog=document.getElementById('book-dialog'),detail=document.getElementById('book-detail');let bookOpener=null;
 function closeBook(){dialog.close();detail.replaceChildren();bookOpener?.focus();}
 document.getElementById('book-close').addEventListener('click',closeBook);dialog.addEventListener('cancel',e=>{e.preventDefault();closeBook();});
 function openBook(item,button){bookOpener=button;detail.replaceChildren();const title=el('h2',item.titre||'Ouvrage');title.id='book-dialog-title';detail.append(title);if(item.auteur)detail.append(el('p',item.auteur));const image=url(item.image);if(image){const img=el('img');img.src=image;img.alt=item.descriptionImage||'';detail.append(img);}for(const k of ['description','public','transcription','sources'])if(item[k])detail.append(el('p',item[k]));const href=url(item.lien);if(href){const a=el('a','Découvrir auprès de l’éditeur');a.href=href;detail.append(a);}const file=url(item.fichier);if(file){const a=el('a','Consulter le document');a.href=file;detail.append(a);}dialog.showModal();document.getElementById('book-close').focus();}

 // Existing infographic data and accessible text continue to come from cms-public.js.
 const gallery=document.getElementById('cms-resources');
 let featured=false;
 function arrange(){for(const card of gallery.children){if(card.dataset.arranged)return;card.dataset.arranged='true';const preview=card.querySelector('.infographic-preview');if(preview)card.prepend(preview);}
 if(!featured&&gallery.firstElementChild){featured=true;const spot=el('div');spot.className='featured-resource';spot.append(gallery.firstElementChild);document.querySelector('.resource-opening').append(spot);}}
 new MutationObserver(arrange).observe(gallery,{childList:true});arrange();
 function fan(list){
  list.classList.add('cover-fan');list.tabIndex=0;list.setAttribute('role','region');list.setAttribute('aria-roledescription','carrousel');list.setAttribute('aria-label',list.id==='lectures-list'?'Livres et magazines':'Livrets de Doloria');
  const nav=el('div');nav.className='fan-controls';const previous=el('button','Précédent'),count=el('span'),next=el('button','Suivant');previous.type=next.type='button';count.setAttribute('role','status');count.setAttribute('aria-live','polite');nav.append(previous,count,next);list.after(nav);let current=0;
  function cards(){return [...list.children].filter(x=>!x.hidden);}
  function update(){const all=cards();current=Math.min(current,Math.max(0,all.length-1));list.classList.toggle('fan-single',all.length===1);list.classList.toggle('fan-empty',!all.length);nav.hidden=all.length<2;count.textContent=all.length?`${current+1} / ${all.length}`:'';previous.disabled=current===0;next.disabled=current===all.length-1;
   all.forEach((card,i)=>{const distance=i-current;card.style.setProperty('--offset',distance);card.style.setProperty('--distance',Math.abs(distance));card.style.zIndex=String(10-Math.abs(distance));card.classList.toggle('is-selected',!distance);card.setAttribute('aria-label',`${i+1} sur ${all.length}`);const button=card.querySelector('button');button.tabIndex=distance===0?0:-1;card.inert=Math.abs(distance)>2;});
  }
  function move(step){current=Math.max(0,Math.min(cards().length-1,current+step));update();}
  previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  list.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();if(e.key==='Home')current=0;else if(e.key==='End')current=cards().length-1;else current+=e.key==='ArrowRight'?1:-1;current=Math.max(0,Math.min(cards().length-1,current));update();cards()[current]?.querySelector('button').focus({preventScroll:true});}});
  list.addEventListener('click',e=>{const card=e.target.closest('.publication');if(!card)return;const i=cards().indexOf(card);if(i!==current){e.preventDefault();e.stopImmediatePropagation();current=i;update();}},true);
  let touchX=null;list.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;},{passive:true});list.addEventListener('touchend',e=>{if(touchX!==null){const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>55)move(dx<0?1:-1);touchX=null;}},{passive:true});
  update();return ()=>{current=0;update();};
 }
 async function load(name){
  const status=document.getElementById(`${name}-status`),list=document.getElementById(`${name}-list`);
  try{const response=await fetch(`cms-${name}.json`,{cache:'no-cache',credentials:'omit'});if(!response.ok)throw Error();const raw=await response.text(),data=raw.trim()?JSON.parse(raw):{};const items=(Array.isArray(data.elements)?data.elements:[]).filter(x=>x&&typeof x==='object'&&(preview||x.publie===true));
   status.textContent=items.length?'':name==='lectures'?'Les livres et magazines seront ajoutés ici prochainement.':'Les premiers livrets seront disponibles ici prochainement.';
   for(const item of items){const article=el('article');article.className='publication';article.dataset.category=item.categorie||'';const button=el('button');button.type='button';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-label',`Découvrir : ${item.titre||'Document'}`);const image=url(item.image);if(image){const img=el('img');img.src=image;img.alt=item.descriptionImage||'';img.loading='lazy';button.append(img);}button.append(el('h3',item.titre||'Document'));if(item.auteur)button.append(el('span',item.auteur));button.append(el('span','Découvrir'));button.addEventListener('click',()=>openBook(item,button));article.append(button);list.append(article);}
   const reset=fan(list);
   if(name==='lectures'){const categories=[...new Set(items.map(x=>x.categorie).filter(Boolean))];if(items.length>=8&&categories.length>=2){const filters=document.getElementById('book-filters'),select=document.getElementById('book-category');filters.hidden=false;for(const c of categories){const o=el('option',c);o.value=c;select.append(o);}select.addEventListener('change',()=>{for(const card of list.children)card.hidden=!!select.value&&card.dataset.category!==select.value;reset();});}}
  }catch{status.textContent='Le chargement est momentanément indisponible. Réessayez ou contactez Doloria.';}
 }
 load('lectures');load('livrets');
})();
