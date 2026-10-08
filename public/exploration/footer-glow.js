const signature = document.querySelector('.footer-signature');
if (signature) {
  const hoverPointer = matchMedia('(hover: hover) and (pointer: fine)');
  let frame = 0;
  let pointer = { x: 0, y: 0 };
  const paint = () => {
    frame = 0;
    const bounds = signature.getBoundingClientRect();
    const reveal = signature.querySelector('.signature-reveal');
    const revealBounds = reveal.getBoundingClientRect();
    // Each mask uses coordinates in its own box, so the light stays under the cursor.
    signature.style.setProperty('--spot-x', `${pointer.x - bounds.left}px`);
    signature.style.setProperty('--spot-y', `${pointer.y - bounds.top}px`);
    reveal.style.setProperty('--spot-x', `${pointer.x - revealBounds.left}px`);
    reveal.style.setProperty('--spot-y', `${pointer.y - revealBounds.top}px`);
    signature.classList.add('is-lit');
  };
  const track = event => {
    if (!hoverPointer.matches || event.pointerType === 'touch') return;
    pointer = { x: event.clientX, y: event.clientY };
    if (!frame) frame = requestAnimationFrame(paint);
  };
  const clear = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    signature.classList.remove('is-lit');
  };
  signature.addEventListener('pointerenter', track);
  signature.addEventListener('pointermove', track, { passive: true });
  signature.addEventListener('pointerleave', clear);
  signature.addEventListener('pointercancel', clear);
  hoverPointer.addEventListener('change', clear);
  window.addEventListener('blur', clear);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clear(); });
}
