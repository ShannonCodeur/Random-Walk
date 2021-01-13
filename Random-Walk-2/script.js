// my medium article about this: https://medium.com/@svmi3195/random-walk-and-colored-dots-92e0bbb3cf0e

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let speed = 40;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//set background if want it
//ctx.fillStyle = 'black';
//ctx.fillRect(0,0, canvas.width, canvas.height);

const Dot = function(color){
  this.r = 20;
  this.x = Math.floor(Math.random() * canvas.width / (this.r * 2)) * this.r * 2;
  this.y = Math.floor(Math.random() * canvas.height / (this.r * 2)) * this.r * 2;
  
  this.render = function(){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fill();
  };
  
  this.move = function(){
    const rand = Math.random();
    
    if(rand < 0.25 && this.x < canvas.width){
      this.x += speed;
    }else if(rand < 0.5 && this.x > 0){
      this.x -= speed;
    }else if(rand < 0.75 && this.y < canvas.height){
      this.y += speed;
    }else if (rand > 0.75 && this.y > 0){
      this.y -= speed;
    }
  }
}

//const colors = ['red', 'blue'];
//const colors = ['rgba(0, 0, 0, 0.1)'];
const colors = ['rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(0, 0, 255, 0.2)'];

//multiple rgb for simulation to run quicker
/*
let colors = [];
for(let i = 0; i < 3; i++){
  colors.push('rgba(255, 0, 0, 0.2)');
  colors.push('rgba(0, 255, 0, 0.2)');
  colors.push('rgba(0, 0, 255, 0.2)');
}
*/

//for randomly picked colors
/*
let colors = [];
const colorsNumber = Math.floor(Math.random() * (100 - 10)) + 10;
for(let i = 0; i < colorsNumber; i++){
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  colors.push('rgba(' + r + ', ' + g + ', ' + b + ', 0.5)');  
}
*/
const dots = colors.map(function(color){return new Dot(color)});

const loop = function(){
  //ctx.clearRect(0,0, canvas.width, canvas.height);
  dots.forEach(function(dot){dot.render(); dot.move();})
  //speed = Math.floor(Math.random() * (60 - 20)) + 20;
  requestAnimationFrame(loop);
}

loop();