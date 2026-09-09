(() => {
 const preview=new URLSearchParams(location.search).get('apercu')==='1';
 const base=new URL('.',document.currentScript.src);
 async function read(name){const res=await fetch(new URL(`cms-${name}.json`,base),{cache:'no-cache',credentials:'omit'});if(!res.ok)throw new Error('Content unavailable');return res.json();}
 const published=data=>(Array.isArray(data.elements)?data.elements:[]).filter(x=>x&&typeof x==='object'&&(preview||x.publie===true));
 function safe(value){try{if(typeof value!=='string'||!value.trim())return null;const url=new URL(value,base);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch(_){return null;}}
 function element(tag,text){const el=document.createElement(tag);if(text!=null)el.textContent=text;return el;}
 if(preview){const banner=element('p','APERÇU — Les contenus non publiés sont visibles ici. Cet aperçu et les fichiers du dépôt sont publics.');banner.style.cssText='margin:0;padding:18px;background:#f7ede2;color:#570204;border:3px solid #bf1246;';banner.setAttribute('role','status');document.body.prepend(banner);}
 const slug=document.body.dataset.cmsPage;
 const texts=read(slug).then(data=>{
  document.querySelectorAll('[data-cms-text]').forEach(el=>{const value=data[el.dataset.cmsText];if(typeof value==='string'&&el.firstChild?.nodeType===3)el.firstChild.nodeValue=value;});
  document.querySelectorAll('[data-cms-tail]').forEach(el=>{const value=data[el.dataset.cmsTail];if(typeof value==='string'&&el.nextSibling?.nodeType===3)el.nextSibling.nodeValue=value;});
  if(typeof data.titre_page==='string')document.title=data.titre_page;
  if(typeof data.description_page==='string')document.querySelector('meta[name="description"]')?.setAttribute('content',data.description_page);
  window.dispatchEvent(new Event('resize'));
 }).catch(()=>{ /* Existing HTML remains readable if the content request fails. */ });
 const dynamic=slug==='vie-doloria'?Promise.allSettled([read('evenements'),read('nouvelles')]).then(results=>{
  window.DOLORIA_CONTENUS={evenements:results[0].status==='fulfilled'?published(results[0].value):[],nouvelles:results[1].status==='fulfilled'?published(results[1].value):[],erreur:results.some(r=>r.status==='rejected')};
 }):Promise.resolve();
 if(slug==='ressources')read('infographies').then(data=>{
  const items=published(data),target=document.getElementById('cms-resources');document.getElementById('resources-status').textContent=items.length?`${items.length} ressource(s) disponible(s).`:'Les premières infographies seront publiées ici.';
  for(const item of items){const card=element('article');card.className='card';card.append(element('h3',item.titre||'Infographie'));if(item.description)card.append(element('p',item.description));const image=safe(item.image);if(image){const img=element('img');img.src=image;img.alt=item.descriptionImage||'';img.loading='lazy';img.style.cssText='display:block;max-width:100%;height:auto;margin-block:20px';card.append(img);}const file=safe(item.fichier);if(file){const a=element('a','Consulter le document');a.href=file;a.style.cssText='display:inline-flex;min-height:44px;align-items:center';card.append(a);}if(item.transcription){const details=element('details'),summary=element('summary','Lire la version texte');const text=element('p',item.transcription);text.style.whiteSpace='pre-line';details.append(summary,text);card.append(details);}if(item.sources)card.append(element('p','Sources : '+item.sources));target.append(card);}
 }).catch(()=>{document.getElementById('resources-status').textContent='Les ressources ne peuvent pas être chargées pour le moment. Réessayez ou contactez Doloria.';});
 window.doloriaDataReady=Promise.all([texts,dynamic]);
})();
