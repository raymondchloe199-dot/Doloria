(()=>{
const chapters=[...document.querySelectorAll('.chapter')],photo=document.querySelector('.photo'),thoughts=[...document.querySelectorAll('.thoughts span')],button=document.querySelector('#motion'),mq=matchMedia('(prefers-reduced-motion:reduce)');
let still=mq.matches;try{still ||= localStorage.getItem('doloria-reduced-motion')==='true'}catch{}
let target=0,current=0,last=performance.now(),visible=true;const clamp=x=>Math.max(0,Math.min(1,x));
function measure(){document.body.classList.toggle('in-professional',document.querySelector('#professionnels').getBoundingClientRect().top<100);target=Math.max(0,Math.min(5,-chapters[0].getBoundingClientRect().top/chapters[0].offsetHeight));document.querySelector('#step').textContent=`0${Math.min(6,Math.floor(target)+1)} / 06`;document.querySelector('.progress i').style.width=target/5*100+'%';if(still)draw(target)}
function mode(v){still=v;document.documentElement.classList.toggle('still',v);button.textContent=v?'Activer les mouvements':'Réduire les mouvements';draw(target)}
function draw(p){photo.style.transform=still?'none':`scale(${1.02+Math.sin(p/5*Math.PI)*.055})`;const pressure=clamp(1-Math.abs(p-2)/2.4);document.body.style.setProperty('--pressure',pressure);document.body.style.setProperty('--signal',.4+pressure*.45);thoughts.forEach((el,i)=>{const center=[1.2,3,3.8][i];el.style.opacity=clamp((.85-Math.abs(p-center))/.4)});}
button.addEventListener('click',()=>mode(!still));mq.addEventListener('change',()=>mode(mq.matches));addEventListener('scroll',measure,{passive:true});addEventListener('resize',measure);document.addEventListener('visibilitychange',()=>{visible=!document.hidden;last=performance.now()});
function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;if(!visible||still)return;current+=(target-current)*(1-Math.exp(-dt*3.5));draw(current)}mode(still);measure();requestAnimationFrame(frame);
})();
