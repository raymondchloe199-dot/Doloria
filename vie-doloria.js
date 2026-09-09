(() => {
const data=window.DOLORIA_CONTENUS||{},events=Array.isArray(data.evenements)?data.evenements:[],news=Array.isArray(data.nouvelles)?data.nouvelles:[];
const $=id=>document.getElementById(id),today=new Date();let year=today.getFullYear(),month=today.getMonth(),selected=null;
const pad=n=>String(n).padStart(2,'0'),key=(y,m,d)=>`${y}-${pad(m+1)}-${pad(d)}`;
const todayKey=key(year,month,today.getDate());
function date(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return null;const [y,m,d]=value.split('-').map(Number),v=new Date(y,m-1,d);return key(v.getFullYear(),v.getMonth(),v.getDate())===value?v:null;}
const validEvents=events.filter(e=>e&&date(e.date)&&typeof e.titre==='string').sort((a,b)=>a.date.localeCompare(b.date)||String(a.heure||'').localeCompare(String(b.heure||'')));
function node(tag,text,cls){const el=document.createElement(tag);if(text!=null)el.textContent=text;if(cls)el.className=cls;return el;}
function safeURL(value){try{if(typeof value!=='string'||!value.trim())return null;const u=new URL(value,location.href);return ['https:','http:','mailto:'].includes(u.protocol)||(u.protocol==='file:'&&!/^[a-z]+:/i.test(value))?u.href:null;}catch(_){return null;}}
function label(value){return date(value).toLocaleDateString('fr-CH',{weekday:'long',day:'numeric',month:'long',year:'numeric'});}
function showEvents(){
 const items=validEvents.filter(e=>selected?e.date===selected:e.date>=todayKey);
 $('results-title').textContent=selected?label(selected):'Les prochains rendez-vous';$('event-status').textContent=items.length?`${items.length} rendez-vous`:(selected?'Aucun rendez-vous annoncé pour cette date.':'Les prochains rendez-vous seront annoncés ici. Revenez découvrir les ateliers et rencontres au fil du projet.');
 $('events').replaceChildren();
 for(const e of items){const article=node('article',null,'event'),time=node('time',label(e.date)+(e.heure?' · '+e.heure:''));time.dateTime=e.date;article.append(time,node('h4',e.titre));for(const field of ['lieu','description','public','accessibilite','tarif'])if(e[field])article.append(node('p',e[field]));const url=safeURL(e.lien);if(url){const a=node('a',e.lienTexte||'Informations et inscription');a.href=url;article.append(a);}$('events').append(article);}
}
function render(){
 $('month').textContent=new Date(year,month,1).toLocaleDateString('fr-CH',{month:'long',year:'numeric'});const body=$('days');body.replaceChildren();const offset=(new Date(year,month,1).getDay()+6)%7,count=new Date(year,month+1,0).getDate();let row;
 for(let i=0;i<Math.ceil((offset+count)/7)*7;i++){if(i%7===0){row=node('tr');body.append(row);}const cell=node('td');row.append(cell);const d=i-offset+1;if(d<1||d>count)continue;const day=key(year,month,d),matches=validEvents.filter(e=>e.date===day).length,b=node('button',d);b.type='button';b.setAttribute('aria-label',label(day)+(matches?`, ${matches} rendez-vous`:''));b.setAttribute('aria-pressed',String(day===selected));if(day===todayKey)b.setAttribute('aria-current','date');if(matches)b.classList.add('has-events');b.addEventListener('click',()=>{selected=day;body.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));showEvents();});cell.append(b);}
}
$('previous').addEventListener('click',()=>{const d=new Date(year,month-1,1);year=d.getFullYear();month=d.getMonth();render();});$('next').addEventListener('click',()=>{const d=new Date(year,month+1,1);year=d.getFullYear();month=d.getMonth();render();});$('all-events').addEventListener('click',()=>{selected=null;render();showEvents();});
$('agenda-interactive').hidden=false;render();showEvents();
const stories=$('stories');const validNews=news.filter(n=>n&&date(n.date)&&typeof n.titre==='string').sort((a,b)=>b.date.localeCompare(a.date));
if(!validNews.length)stories.append(node('p','Les premières nouvelles et photos de l’association seront partagées ici.', 'empty'));
for(const n of validNews){const article=node('article',null,'story'),url=safeURL(n.photo);if(url&&!url.startsWith('mailto:')){const img=node('img');img.src=url;img.alt=n.descriptionPhoto||'';img.loading='lazy';img.addEventListener('error',()=>{img.remove();});article.append(img);}const time=node('time',label(n.date));time.dateTime=n.date;article.append(time,node('h3',n.titre),node('p',n.texte||''));stories.append(article);}
})();
