(async()=>{
await (window.doloriaDataReady||Promise.resolve());
const story=document.querySelector('.founder-story');if(!story)return;
const clip=document.createElement('div');clip.className='story-clip';clip.setAttribute('aria-hidden','true');
clip.innerHTML=`<svg viewBox="0 0 110 145" fill="none"><defs><linearGradient id="clip-metal"><stop stop-color="#6a6250"/><stop offset=".3" stop-color="#fff4ce"/><stop offset=".52" stop-color="#a49c7e"/><stop offset=".75" stop-color="#fffbe9"/><stop offset="1" stop-color="#665e49"/></linearGradient></defs><path d="M18 88Q18 80 25 80H85Q92 80 92 88L98 133H12Z" fill="#514d40" stroke="url(#clip-metal)" stroke-width="3"/><path d="M26 82V72Q26 65 34 65H76Q84 65 84 72V82" stroke="url(#clip-metal)" stroke-width="4"/><path d="M40 115L45 53Q23 39 33 20Q39 8 55 8Q71 8 77 20Q87 39 65 53L70 115" stroke="#454333" stroke-width="7"/><path d="M40 115L45 53Q23 39 33 20Q39 8 55 8Q71 8 77 20Q87 39 65 53L70 115" stroke="url(#clip-metal)" stroke-width="4"/><path d="M15 132H95M24 86H86" stroke="url(#clip-metal)" stroke-width="4"/></svg>`;
story.prepend(clip);
const phrases=['depuis l’enfance','notre vie tout entière','l’errance médicale','continuer à vivre avec la douleur','être entendu','être reconnu dans sa douleur','ce qui compte pour soi','sans que la personne s’efface derrière elle','les savoirs issus de l’expérience vécue','renoncer à tout ce qui nous fait vivre','continuer à écrire la leur'];
for(const p of story.querySelectorAll('.story-copy p')){
const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
for(const node of nodes){const text=node.nodeValue;const hits=phrases.flatMap(phrase=>{const at=text.indexOf(phrase);return at<0?[]:[{at,phrase}]}).sort((a,b)=>a.at-b.at);if(!hits.length)continue;const f=document.createDocumentFragment();let end=0;for(const h of hits){if(h.at<end)continue;f.append(document.createTextNode(text.slice(end,h.at)));const mark=document.createElement('mark');mark.textContent=h.phrase;f.append(mark);end=h.at+h.phrase.length}f.append(document.createTextNode(text.slice(end)));node.replaceWith(f)}
}
})();
