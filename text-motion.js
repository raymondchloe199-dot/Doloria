/* Progressive typography: semantic text stays in the document; no scroll trapping. */
(()=>{
 'use strict';
 const root=document.documentElement,mq=matchMedia('(prefers-reduced-motion: reduce)');
 const active=new Map(),prepared=new WeakSet();let observer;
 const excluded='header,footer,nav,dialog,button,a,summary,[role="status"],[aria-live],svg,.intro-scroll,.pause-section,.forest-scene,.welcome-stage,.welcome-story,.invisible-story,.story,.neuro-step,.actions-track,.values-track,.cover-fan,.resource-carousel,.featured-resource';
 const professional=/professionnels(?:-animation|-institutions)?\.html$/.test(location.pathname);
 function reduced(){let saved=false;try{saved=localStorage.getItem('doloria-reduced-motion')==='true';}catch{}return mq.matches||saved||root.classList.contains('no-motion')||root.classList.contains('still');}
 function finishAll(){if(!reduced())return;for(const [el,animations] of active){animations.forEach(a=>a.finish());active.delete(el);}}
 function eligible(el){return !el.closest(excluded)&&!(professional&&el.closest('.chapter'))&&!el.closest('[hidden]')&&el.textContent.trim().length>2;}
 function reveal(el){
  if(prepared.has(el)||!eligible(el))return;
  prepared.add(el);observer?.unobserve(el);
  if(reduced()||!el.animate)return;
  const animations=[];
  if(/^H[12]$/.test(el.tagName)&&el.textContent.length<350){
   const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
   const words=[];
   for(const node of nodes){if(node.parentElement.closest('script,style,[aria-hidden="true"]'))continue;const fragment=document.createDocumentFragment();for(const piece of node.textContent.split(/([ \t\r\n]+)/)){if(!piece)continue;if(/^[ \t\r\n]+$/.test(piece)){fragment.append(document.createTextNode(piece));continue;}const word=document.createElement('span');word.className='doloria-motion-word';word.textContent=piece;if(/[\u00a0\u202f]/.test(piece))word.style.whiteSpace='nowrap';fragment.append(word);words.push(word);}node.replaceWith(fragment);}
   // Group by rendered baseline so wrapped titles retain a line-by-line rhythm.
   let line=-1,lastTop=-999,within=0;const timing=words.map(word=>{const top=word.getBoundingClientRect().top;if(Math.abs(top-lastTop)>8){line++;within=0;lastTop=top;}return {word,delay:Math.min(650,line*140+within++*24)};});
   timing.forEach(({word,delay})=>animations.push(word.animate([{opacity:.12,transform:'translateY(.45em)'},{opacity:1,transform:'translateY(0)'}],{duration:700,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'})));
  }else{
   animations.push(el.animate([{opacity:.2,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,easing:'cubic-bezier(.22,1,.36,1)'}));
  }
  active.set(el,animations);Promise.all(animations.map(a=>a.finished.catch(()=>{}))).then(()=>active.delete(el));
 }
 function scan(scope){const candidates=scope.querySelectorAll('main h1,main h2,main p,main blockquote');for(const el of candidates){if(!prepared.has(el)&&eligible(el)){observer.observe(el);}}}
 async function start(){
  if(!('IntersectionObserver'in window))return;
  await Promise.allSettled([document.fonts?.ready,window.doloriaDataReady]);
  observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)reveal(entry.target);},{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  scan(document);
  // CMS updates and newly opened sections stay eligible; our own word spans are ignored.
  let queued=false;new MutationObserver(records=>{if(!records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&!n.classList?.contains('doloria-motion-word'))||r.type==='attributes'))return;if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;scan(document);});}}).observe(document.querySelector('main')||document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','open']});
  new MutationObserver(finishAll).observe(root,{attributes:true,attributeFilter:['class']});mq.addEventListener('change',finishAll);window.addEventListener('storage',finishAll);
  document.addEventListener('click',e=>{if(e.target.closest('#motion,#reading-motion'))requestAnimationFrame(finishAll);});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
