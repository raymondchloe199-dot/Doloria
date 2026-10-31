/* Occipital nerve stimulation: a separate anatomical and educational journey. */
(()=>{
const scene=document.getElementById('ons-scene');if(!scene)return;
const byId=id=>document.getElementById(id),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const tabs=[...scene.querySelectorAll('[data-ons-step-button]')],contacts=[...scene.querySelectorAll('[data-ons-contact]')],topics=[...scene.querySelectorAll('[data-ons-topic]')],examples=[...scene.querySelectorAll('[data-ons-example]')],routes=[...scene.querySelectorAll('[data-ons-route]')];
const play=byId('ons-play'),power=byId('ons-power');let step=0,running=false,on=true,time=0,last=0,raf=0,example='neuralgie',route='both',contact=0;
const copy=[
 ['Le vécu','Des douleurs de la tête, des vécus différents.','Une douleur peut gêner les activités, les relations et le repos. Sa localisation seule ne dit pas quel mécanisme est en jeu. Avant le dispositif, prenons le temps de distinguer les situations.','Un mal de tête ne suffit pas à choisir ce traitement.','La névralgie occipitale et la migraine sont des diagnostics distincts. L’histoire des symptômes et l’examen clinique sont essentiels ; cette illustration ne permet pas de les identifier chez une personne. [O6]'],
 ['Les nerfs','De la région occipitale aux relais centraux.','Les nerfs occipitaux participent à la sensibilité de l’arrière du cuir chevelu. Le rose suit une entrée vers les relais cervicaux supérieurs, puis des voies gagnent les réseaux cérébraux. Ce sont des informations nerveuses qui circulent.','Les nerfs occipitaux sont périphériques. Les relais de traitement sont centraux.','Le grand nerf occipital est notamment issu de C2. Le schéma regroupe plusieurs branches et relais. Le trajet fonctionnel est simplifié et ne représente pas toute la neuroanatomie de la tête. [O4, O5]'],
 ['Les mécanismes','Une même région, des mécanismes différents.','Choisissez un exemple pour repérer ce qui change. La stimulation occipitale n’implique pas que le nerf occipital soit lésé dans toutes les situations où elle est étudiée ou proposée.','Migraine et névralgie occipitale ne sont pas interchangeables.','La névralgie occipitale peut se manifester par des douleurs brèves, lancinantes ou en décharges dans le territoire occipital. La migraine engage des mécanismes de céphalée plus larges ; elle n’est pas définie comme une lésion du nerf occipital. [O4, O6]'],
 ['Les influences','Le vécu dépend aussi du contexte.','Sommeil, attention et émotions peuvent influencer l’expérience douloureuse. Le soutien, les conditions de vie et l’environnement aussi. La lumière ou le bruit peuvent être pénibles dans certaines céphalées. Ces effets varient selon la personne.','Ces influences ne rendent la douleur ni imaginaire, ni volontaire.','Les dimensions biologiques, psychologiques et sociales interagissent. La voie descendante mauve illustre une influence centrale ; elle ne représente pas à elle seule toutes les influences de l’environnement. [O7]'],
 ['Les connexions','Des informations différentes, des relais en partie communs.','Dans le complexe trigémino-cervical, certaines informations occipitales et trigéminales convergent sur des neurones communs. Suivez chaque voie, puis les deux ensemble. Cela aide à comprendre le lien entre la tête et la nuque.','Les nerfs ne fusionnent pas : leurs informations convergent dans des circuits centraux.','Ce complexe associe des régions du tronc cérébral et de la moelle cervicale haute. Cette convergence contribue à expliquer certaines douleurs projetées et constitue une piste pour comprendre l’action de la stimulation occipitale. Ce n’est pas un portillon identique à celui du parcours médullaire. [O4, O5]'],
 ['Le dispositif','Stimuler près du nerf, sous la peau.','En crème, les impulsions vont du boîtier aux contacts sous-cutanés. Leur action peut influencer l’activité des nerfs occipitaux et, à travers leurs connexions, des circuits impliqués dans la douleur. Explorez les trois plots pour en savoir plus.','Les contacts ne sont ni dans le crâne, ni dans la moelle.','Des mécanismes périphériques et centraux sont étudiés ; leur contribution exacte reste incertaine. Le bénéfice varie et n’est pas garanti. Ce schéma ne montre pas une réparation du nerf ni une quantité de soulagement. [O4]']
];
const lessons=[
 ['Un contact, près du nerf.','La partie conductrice de la sonde délivre la stimulation dans les tissus voisins. Dans cet exemple, les contacts sont sous la peau de la région occipitale. Le dessin ne reproduit aucun modèle précis. [O1]','https://www.nice.org.uk/guidance/HTG310/chapter/2-the-procedure'],
 ['Pourquoi à l’arrière de la tête ?','L’équipe cherche à approcher les nerfs occipitaux. Anatomie, territoire à couvrir et technique guident le positionnement. Les tests et le retour du patient peuvent aider, selon la procédure. Cette localisation ne prouve pas que toute la douleur prend naissance dans ces nerfs. [O1, O5]','https://www.nice.org.uk/guidance/HTG310/chapter/2-the-procedure'],
 ['Quelles précautions ?','Suivez les consignes sur les mouvements du cou, les efforts, les soins de plaie et la reprise d’activité. Signalez un choc important, une modification inhabituelle de stimulation ou un problème de plaie à votre équipe. Avant une IRM ou un soin, faites vérifier la compatibilité du système exact. [O2]','https://www.leedsth.nhs.uk/services/pain-management/patient-information-videos/occipital-nerve-stimulator/']
];
const ns='http://www.w3.org/2000/svg',dots=[];
function add(id,host,color,count=1){const path=byId(id);for(let i=0;i<count;i++){const g=document.createElementNS(ns,'g');for(const[r,o]of[[10,.12],[4,1]]){const c=document.createElementNS(ns,'circle');c.setAttribute('r',r);c.setAttribute('fill',color);c.setAttribute('opacity',o);g.append(c)}byId(host).append(g);dots.push({id,path,g,i,count})}}
add('ons-afferent','ons-neural-dots','#f28cae');add('ons-ascending','ons-neural-dots','#f28cae');add('ons-descending','ons-neural-dots','#b8a8ef');add('ons-device-path','ons-device-dots','#fff0ca',2);add('ons-conv-occ','ons-conv-dots','#f28cae',2);add('ons-conv-tri','ons-conv-dots','#b8a8ef',2);add('ons-conv-up','ons-conv-dots','#efb7c6',2);
function draw(){dots.forEach(d=>{let progress=(time/4500+d.i/d.count)%1,visible=true;const phase=time%8000;
 if(d.id==='ons-afferent'){progress=Math.min(1,phase/4000);visible=step>0&&phase<4000}
 if(d.id==='ons-ascending'){progress=Math.max(0,(phase-4000)/4000);visible=step>0&&phase>=4000}
 if(d.id==='ons-descending')visible=step===3||step===5;
 if(d.id==='ons-conv-occ')visible=route!=='trigeminal';if(d.id==='ons-conv-tri')visible=route!=='occipital';
 const pt=d.path.getPointAtLength(progress*d.path.getTotalLength());d.g.setAttribute('transform',`translate(${pt.x} ${pt.y})`);d.g.style.opacity=visible?'1':'0';
})}
function frame(now){if(!running||reduced.matches||scene.closest('[hidden]')){last=0;return}if(last)time+=Math.min(60,now-last);last=now;draw();raf=requestAnimationFrame(frame)}
function selectContact(i){contact=i;contacts.forEach((c,k)=>c.setAttribute('aria-pressed',String(k===i)));topics.forEach((c,k)=>c.setAttribute('aria-pressed',String(k===i)));byId('ons-contact-title').textContent=lessons[i][0];byId('ons-contact-copy').textContent=lessons[i][1];byId('ons-contact-source').href=lessons[i][2]}
function render(){
 scene.dataset.onsStep=String(step);scene.dataset.onsExample=example;scene.dataset.onsRoute=route;
 scene.classList.toggle('is-running',running&&!reduced.matches);scene.classList.toggle('is-off',!on);scene.classList.toggle('is-on',on&&step===5);
 tabs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===step)));['ons-kicker','ons-step-title','ons-copy','ons-key','ons-detail'].forEach((id,i)=>byId(id).textContent=copy[step][i]);
 byId('ons-svg-title').textContent=copy[step][1];byId('ons-svg-desc').textContent=copy[step][2];
 byId('ons-view-label').textContent=['Le vécu, avant le dispositif','Repérer les nerfs et les relais','Deux exemples : nerf occipital / réseaux de céphalée','Des influences internes et extérieures','Zoom : la convergence trigémino-cervicale','Un exemple de système implanté sous la peau'][step];
 byId('ons-body').hidden=step===4;byId('ons-convergence').hidden=step!==4;byId('ons-influences').hidden=step!==3&&step!==4;byId('ons-diagnoses').hidden=step!==2;byId('ons-routes').hidden=step!==4;byId('ons-contact-learning').hidden=step!==5;power.hidden=step!==5;
 examples.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.onsExample===example)));routes.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.onsRoute===route)));
 byId('ons-emphasis').textContent=example==='neuralgie'?'Territoire occipital':'Réseaux de céphalée';byId('ons-emphasis-link').setAttribute('d',example==='neuralgie'?'M75 281H195L445 235':'M75 281H195L309 207');
 byId('ons-example-copy').textContent=example==='neuralgie'?'Névralgie occipitale : le territoire des nerfs est mis en évidence. Les sensations, l’examen et les autres critères permettent au clinicien d’évaluer ce diagnostic. [O6]':'Migraine : l’illustration souligne les réseaux centraux, sans prétendre représenter tous les mécanismes. Cela ne signifie pas que la douleur est imaginaire ou que le nerf occipital est lésé. [O4]';
 power.textContent='Stimulation illustrée : '+(on?'activée':'désactivée');power.setAttribute('aria-pressed',String(on));play.disabled=reduced.matches;play.textContent=reduced.matches?'Schéma statique · mouvements réduits':running?'Mettre en pause':'Animer cette étape';play.setAttribute('aria-pressed',String(running));
 byId('ons-prev').disabled=step===0;byId('ons-next').disabled=step===5;byId('ons-next').textContent=['Découvrir les nerfs →','Distinguer les mécanismes →','Explorer les influences →','Zoomer sur les connexions →','Ajouter le dispositif →','Parcours terminé'][step];byId('ons-count').textContent=(step+1)+' / 6';
 byId('ons-status').textContent=step===5?'Le bouton montre la présence de stimulation, pas son efficacité. Les impulsions du câble restent distinctes de l’activité nerveuse.':step===4?'Le choix d’une voie la met en évidence ; il ne supprime pas les autres voies dans le corps.':'';
 selectContact(contact);cancelAnimationFrame(raf);last=0;draw();if(running&&!reduced.matches)raf=requestAnimationFrame(frame);
}
function go(i){step=i;running=false;time=0;scene.querySelector('.story-more').open=false;render();scene.scrollIntoView({block:'start',behavior:reduced.matches?'auto':'smooth'})}
tabs.forEach((b,i)=>b.addEventListener('click',()=>go(i)));byId('ons-prev').addEventListener('click',()=>go(Math.max(0,step-1)));byId('ons-next').addEventListener('click',()=>go(Math.min(5,step+1)));play.addEventListener('click',()=>{running=!running;render()});power.addEventListener('click',()=>{on=!on;render()});
examples.forEach(b=>b.addEventListener('click',()=>{example=b.dataset.onsExample;render()}));routes.forEach(b=>b.addEventListener('click',()=>{route=b.dataset.onsRoute;render()}));contacts.forEach((c,i)=>{c.addEventListener('click',()=>selectContact(i));c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectContact(i)}})});topics.forEach((b,i)=>b.addEventListener('click',()=>selectContact(i)));
document.addEventListener('keydown',e=>{
 if(scene.closest('[hidden]')||!['ArrowLeft','ArrowRight'].includes(e.key)||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.repeat||e.defaultPrevented)return;
 if(document.querySelector('dialog[open]')||document.querySelector('#site-menu-toggle[aria-expanded="true"]'))return;
 if(e.target?.closest?.('input,textarea,select,[contenteditable="true"],[role="slider"],[role="textbox"]'))return;
 const focus=document.activeElement;if(focus&&!scene.contains(focus)&&!['BODY','HTML'].includes(focus.tagName)&&focus.getAttribute?.('href')!=='#occipital')return;
 const r=scene.getBoundingClientRect();if(r.top>innerHeight*.65||r.bottom<innerHeight*.35)return;
 e.preventDefault();const next=Math.max(0,Math.min(5,step+(e.key==='ArrowRight'?1:-1)));if(next!==step)go(next);tabs[next].focus({preventScroll:true});
});
function stop(){running=false;render()}
document.addEventListener('neuro:modechange',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});reduced.addEventListener('change',stop);new IntersectionObserver(e=>{if(!e[0].isIntersecting&&running)stop()}).observe(scene);render();
})();

/* Explicit choice; no cookies or persisted visitor profile. */
(()=>{
const buttons=[...document.querySelectorAll('[data-neuro-choice]')];if(!buttons.length)return;
const panels={scs:document.getElementById('scs-panel'),ons:document.getElementById('ons-panel')},common=document.getElementById('neuro-common'),reduced=matchMedia('(prefers-reduced-motion: reduce)');let current=null;
function select(mode,{navigate=false,focus=false,target=null}={}){
 current=mode;for(const[k,panel]of Object.entries(panels))panel.hidden=k!==mode;common.hidden=!mode;
 document.querySelectorAll('[data-neuro-only]').forEach(el=>el.hidden=el.dataset.neuroOnly!==mode);buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.neuroChoice===mode)));
 document.getElementById('neuro-choice-status').textContent=mode==='scs'?'Parcours médullaire sélectionné.':mode==='ons'?'Parcours occipital sélectionné.':'Choisissez le parcours que vous souhaitez explorer.';
 document.dispatchEvent(new CustomEvent('neuro:modechange',{detail:{mode}}));window.dispatchEvent(new Event('resize'));
 if(navigate){const hash=mode==='scs'?'#fonctionnement':mode==='ons'?'#occipital':'#choisir';history.replaceState(null,'',location.pathname+location.search+hash)}
 if(navigate||target){requestAnimationFrame(()=>{const dest=target||document.getElementById(mode==='scs'?'fonctionnement':mode==='ons'?'occipital':'choisir');dest?.scrollIntoView({block:'start',behavior:reduced.matches?'auto':'smooth'});if(focus){if(mode)document.getElementById(mode==='scs'?'sim-scene':'ons-scene').focus({preventScroll:true});else buttons[0].focus({preventScroll:true});}})}
}
buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(b.dataset.neuroChoice,{navigate:true,focus:true}));b.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();buttons[1-i].focus()}})});
function fromHash(){let hash;try{hash=decodeURIComponent(location.hash.slice(1))}catch{hash=''}const target=document.getElementById(hash);
 if(hash==='choisir'){select(null,{target,focus:false});return}
 if(target?.closest('#ons-panel')){select('ons',{target});return}
 if(target?.closest('#scs-panel')){select('scs',{target});return}
 if(target?.closest('#neuro-common')){select(current||'scs',{target});return}
 select(current);
}
window.addEventListener('hashchange',fromHash);window.addEventListener('popstate',fromHash);fromHash();
})();
