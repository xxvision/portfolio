/* const cursorInner = document.querySelector(".cursor-inner");
const cursorOuter = document.querySelector(".cursor-outer");

let mouseX = 0, mouseY = 0;
let outerX = 0, outerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateOuterCursor() {
  outerX += (mouseX - outerX) * 0.1;
  outerY += (mouseY - outerY) * 0.1;

  cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;
  requestAnimationFrame(animateOuterCursor);
}

animateOuterCursor(); */