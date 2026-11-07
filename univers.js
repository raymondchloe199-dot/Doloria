(()=>{'use strict';
const root=document.documentElement,after=document.querySelector('.after-care'),journey=document.querySelector('.journey');
if(!after||!journey)return;root.classList.add('univers-doloria');
const word=document.createElement('span');word.className='universe-word';word.setAttribute('aria-hidden','true');word.textContent='avec';after.append(word);
const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.classList.add('universe-bridge');svg.setAttribute('aria-hidden','true');
const ghost=document.createElementNS(ns,'path'),ink=document.createElementNS(ns,'path'),dot=document.createElementNS(ns,'circle');ghost.classList.add('bridge-ghost');ink.classList.add('bridge-ink');dot.setAttribute('r','6');svg.append(ghost,ink,dot);after.append(svg);
let queued=false;const mq=matchMedia('(prefers-reduced-motion:reduce)');
function render(){queued=false;if(!root.classList.contains('univers-doloria'))return;const still=mq.matches||root.classList.contains('no-motion')||root.classList.contains('still');
const a=after.getBoundingClientRect(),j=journey.getBoundingClientRect(),w=after.clientWidth,h=after.offsetHeight,vh=innerHeight;
const progress=Math.max(0,Math.min(1,(vh*.8-a.top)/(h+vh*.2)));
after.style.setProperty('--with-drift',still?'0px':`${(1-progress)*35}px`);
journey.style.setProperty('--land-rise',still?'0px':`${Math.max(0,Math.min(1,(j.top-vh*.2)/vh))*32}px`);
const edge=w*(w<760?.965:.965),endY=h+Math.min(280,w*.22),endX=w*(w<760?.045:.06);
svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
const d=`M ${edge} 0 C ${w*.90} ${h*.2},${w*.99} ${h*.35},${edge} ${h*.58} C ${w*.94} ${h*.9},${w*.55} ${h-30},${w*.36} ${h+55} S ${endX} ${endY-90},${endX} ${endY}`;
ghost.setAttribute('d',d);ink.setAttribute('d',d);const length=ink.getTotalLength();ink.style.strokeDasharray=String(length);ink.style.strokeDashoffset=String(length*(1-progress));const p=ink.getPointAtLength(length*progress);dot.setAttribute('cx',p.x);dot.setAttribute('cy',p.y);dot.style.opacity=still?'0':String(Math.min(1,progress*8));}
function schedule(){if(!queued){queued=true;requestAnimationFrame(render);}}
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);mq.addEventListener('change',schedule);new MutationObserver(schedule).observe(root,{attributes:true,attributeFilter:['class']});
Promise.allSettled([document.fonts?.ready,window.doloriaDataReady]).then(schedule);
})();

(()=>{
const source=document.querySelector('#actions');if(!source)return;
const section=document.createElement('section');section.className='movement-panorama';source.id='actions-source';section.id='actions';section.setAttribute('aria-label','Doloria vous met en mouvement');
section.innerHTML='<div class="movement-stage"><div class="movement-heading"><h2>Doloria vous met en mouvement</h2><span class="movement-progress" aria-hidden="true">01 — 04</span></div><div class="movement-window"><div class="movement-track"></div></div><div class="movement-footer"><span>Des rencontres, des repères, des possibilités.</span><span aria-hidden="true">Continuez à faire défiler ↓</span></div></div>';
const track=section.querySelector('.movement-track');
source.querySelectorAll('.action-row').forEach((card,i)=>{const scene=document.createElement('article');scene.className='movement-scene';scene.innerHTML='<span class="movement-number" aria-hidden="true">0'+(i+1)+'</span><div class="movement-copy">'+card.querySelector('h3').outerHTML+Array.from(card.querySelectorAll('p')).map(p=>p.outerHTML).join('')+'</div>';scene.querySelectorAll('[id],[data-cms-text]').forEach(e=>{e.removeAttribute('id');e.removeAttribute('data-cms-text')});track.append(scene)});
source.after(section);
let pending=false;const media=matchMedia('(min-width:901px) and (min-height:650px) and (prefers-reduced-motion:no-preference)');
function paint(){pending=false;section.scrollLeft=0;section.querySelector('.movement-stage').scrollLeft=0;section.querySelector('.movement-window').scrollLeft=0;const active=document.documentElement.classList.contains('univers-doloria');const pinned=active&&media.matches&&!document.documentElement.classList.contains('no-motion');section.classList.toggle('is-pinned',pinned);source.hidden=active;section.hidden=!active;if(!active)return;const rect=section.getBoundingClientRect(),distance=section.offsetHeight-innerHeight;const progress=pinned?Math.max(0,Math.min(1,-rect.top/Math.max(1,distance))):0;track.style.transform=pinned?'translate3d('+(-progress*(track.scrollWidth-section.querySelector('.movement-window').clientWidth))+'px,0,0)':'none';section.querySelector('.movement-progress').textContent='0'+Math.min(4,1+Math.round(progress*3))+' — 04';}
function schedule(){if(!pending){pending=true;requestAnimationFrame(paint)}}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);media.addEventListener('change',schedule);new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
// Keep keyboard focus visible without trapping the visitor in the horizontal scene.
section.addEventListener('focusin',e=>{if(!section.classList.contains('is-pinned'))return;const scene=e.target.closest('.movement-scene');if(!scene)return;const i=[...track.children].indexOf(scene);window.scrollTo({top:scrollY+section.getBoundingClientRect().top+i/3*(section.offsetHeight-innerHeight),behavior:'instant'});});
paint();
})();

(()=>{
const title=document.querySelector('#journey-title');if(!title)return;
const stories=[
{name:'Anna',image:'anna',theme:'Retrouver sa place',text:'Anna a perdu son emploi. Elle aimait créer, organiser et se sentir utile. La douleur a bousculé son quotidien, mais pas toutes ses envies.',wish:'Elle cherche comment retrouver une place qui lui ressemble.'},
{name:'Pierre',image:'pierre',theme:'Oser à nouveau',text:'Pierre n’ose plus reprendre le sport, par peur de réveiller ses douleurs. Ce qui lui manque, c’est aussi retrouver ses amis et les moments partagés après l’entraînement.',wish:'Il aimerait retrouver une manière de bouger qui lui convienne.'},
{name:'Sabrina',image:'sabrina',theme:'Faire partie de l’histoire',text:'Sabrina manque certains cours et certaines sorties à cause de ses douleurs. Elle aimerait retrouver ses copines et poursuivre ses projets, sans devoir toujours se justifier.',wish:'Elle souhaite pouvoir participer, avec des adaptations quand elle en a besoin.'}
];
const shelf=document.createElement('div');shelf.className='story-library';shelf.id='histoires';
shelf.innerHTML='<h3 class="story-invitation">Une expérience commune.<br>Des millions de chemins différents.</h3><div class="story-shelf">'+stories.map((s,i)=>`<details class="story-book"><summary aria-label="Découvrir l’histoire de ${s.name}"><span class="book-cover"><span class="book-name">${s.name}</span><img src="media/univers-${s.image}.webp" alt="" width="1080" height="1350" loading="lazy"><span class="book-theme">${s.theme}</span><span class="book-open">Ouvrir son histoire +</span></span><span class="book-under" aria-hidden="true">Il y a ce que la douleur change.<br>Et ce qui compte toujours.</span></summary><div class="book-story"><h3>${s.name}</h3><p>${s.text}</p><p class="story-wish">${s.wish}</p></div></details>`).join('')+'</div><div class="story-common"><p class="story-common-lead">Une expérience commune, des histoires uniques et personnelles : aucune ne ressemble à une autre.</p><p>Nos représentations, nos croyances, notre environnement et nos ressources personnelles façonnent la manière dont nous percevons la douleur et la place qu’elle occupe dans notre quotidien.</p><p>Elle n’est jamais figée : elle fluctue, évolue et change. Ses répercussions sur nos vies aussi.</p><p>Vos expériences se rejoignent, se croisent, s’éloignent… Chacune suit sa propre trajectoire.</p></div><p class="story-fiction">Personnages et histoires fictifs, proposés pour illustrer différentes expériences.</p>';
title.after(shelf);
shelf.querySelectorAll('details').forEach(book=>book.addEventListener('toggle',()=>{book.querySelector('.book-open').textContent=book.open?'Refermer l’histoire −':'Ouvrir son histoire +';}));
})();

(()=>{
const hero=document.querySelector('.hero > .wrap');if(!hero)return;
const life=document.createElement('div');life.className='life-collage';life.id='la-vie';life.setAttribute('role','group');life.setAttribute('aria-label','Ce qui fait aussi partie de votre vie');
const items=[['loisirs','Sport, activités & loisirs','Bouger, découvrir, se faire plaisir.'],['liens','Sorties & vie sociale','Partager une table, un moment, des liens.'],['travail','Vie professionnelle','Travailler, contribuer, construire des projets.'],['soins','Votre parcours de soins','Être écouté, accompagné et participer aux choix.']];
life.innerHTML='<div class="life-pictures">'+items.map((a,i)=>`<figure class="life-label" style="--tilt:${[-4,3,-2,4][i]}deg"><img src="media/univers-${a[0]}.webp" width="1080" height="1350" alt="" loading="lazy"><figcaption><h3>${a[1]}</h3><p>${a[2]}</p></figcaption></figure>`).join('')+'</div><p class="life-message">Ce qui compte pour vous<br><span>a sa place ici.</span></p>';
hero.append(life);
const cards=[...life.querySelectorAll('.life-label')],mq=matchMedia('(prefers-reduced-motion:reduce)');let queued=false;
function render(){queued=false;const still=mq.matches||document.documentElement.classList.contains('no-motion');const mobile=innerWidth<761;const top=life.getBoundingClientRect().top;cards.forEach((card,i)=>{const p=still?1:Math.max(0,Math.min(1,mobile?(innerHeight*.95-card.getBoundingClientRect().top)/(innerHeight*.23):(innerHeight*.97-top-i*innerHeight*.12)/(innerHeight*.22)));card.style.setProperty('--reveal',p);});}
function schedule(){if(!queued){queued=true;requestAnimationFrame(render)}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);mq.addEventListener('change',schedule);new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});render();
})();

(()=>{
const journey=document.querySelector('.journey');if(!journey)return;
document.querySelector('.universe-word')?.remove();
const reveal=document.createElement('div');reveal.className='chapter-reveal';reveal.setAttribute('aria-hidden','true');journey.prepend(reveal);
const mq=matchMedia('(prefers-reduced-motion:reduce)');let queued=false;
function render(){queued=false;const still=mq.matches||document.documentElement.classList.contains('no-motion');const top=journey.getBoundingClientRect().top;const p=still?1:Math.max(0,Math.min(1,(innerHeight*.95-top)/(innerHeight*.55)));reveal.style.setProperty('--chapter-open',p*p*(3-2*p));}
function schedule(){if(!queued){queued=true;requestAnimationFrame(render)}}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);mq.addEventListener('change',schedule);new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});render();
})();
