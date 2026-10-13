(() => {
 document.querySelectorAll('.kids-carousel').forEach(carousel => {
  const track=carousel.querySelector('.kids-track'), cards=[...track.children], controls=carousel.querySelector('.kids-controls'), buttons=controls.querySelectorAll('button'), status=controls.querySelector('span');
  let current=0,frame;
  const update=()=>{const left=track.getBoundingClientRect().left;current=cards.reduce((best,card,i)=>Math.abs(card.getBoundingClientRect().left-left)<Math.abs(cards[best].getBoundingClientRect().left-left)?i:best,0);buttons[0].disabled=current===0;buttons[1].disabled=current===cards.length-1;status.textContent=`${current+1} / ${cards.length}`;};
  const go=delta=>{const next=Math.max(0,Math.min(cards.length-1,current+delta));track.scrollTo({left:track.scrollLeft+cards[next].getBoundingClientRect().left-track.getBoundingClientRect().left-4,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('no-motion')?'instant':'smooth'});};
  buttons.forEach(button=>button.addEventListener('click',()=>go(Number(button.dataset.step))));
  track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();go(event.key==='ArrowRight'?1:-1);}});
  track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);},{passive:true});window.addEventListener('resize',update);controls.hidden=false;update();
 });
})();
