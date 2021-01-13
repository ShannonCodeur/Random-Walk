let x = random(0, 750);
let y = random(0, 500);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const nextX = random(-5, 5);
  const nextY = random(-5, 5);

  ctx.beginPath();
  ctx.moveTo(x, y);
  x += random(-5, 5);
  y += random(-5, 5);
  ctx.lineWidth = 5;
  ctx.lineTo(x, y);
  ctx.stroke();

  window.requestAnimationFrame(draw);
}

init();