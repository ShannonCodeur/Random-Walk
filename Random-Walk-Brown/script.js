/*
  Johan Karlsson (DonKarlssonSan)
  I tried to find the copyright info for the image
  but failed, the image is all over internet.
*/
function Particle() {
    this.x = random(w);
    this.y = random(h);
    this.oldX = this.x;
    this.oldY = this.y;
  }
  
  Particle.prototype.move = function(stepSize) {
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += random(-stepSize, stepSize);
    this.y += random(-stepSize, stepSize);
    if(this.x < 0) this.x = 0;
    if(this.x > w) this.x = w;
    if(this.y < 0) this.y = 0;
    if(this.y > h) this.y = h;
  }
  
  Particle.prototype.draw = function() {
    line(this.oldX, this.oldY, this.x, this.y);
  }
  
  var particles;
  var iterations;
  var theImage;
  var px;
  var w;
  var h;
  
  function preload() {
    theImage = loadImage("https://s3-us-west-2.amazonaws.com/s.cdpn.io/254249/barack-obama-portrait.jpg"); 
  }
  
  function setup() {
    cursor(HAND);
    iterations = 50;
    w = theImage.width; 
    h = theImage.height;
    createCanvas(w, h);
    reset();
    stroke(0, 10);
  }
  
  function draw() {
    for(var i = 0; i < iterations; i++) {
      particles.forEach(p => {
        var x = floor(p.x);
        var y = floor(p.y);
        var off = (y * w + x) * 4; 
        var m = (px[off] + px[off+1] + px[off+2]) / 3;
        var stepSize = map(m, 0, 255, 3, 30);
        p.move(stepSize);
        p.draw();
      });
    }
  }
  
  function initParticles() {
    particles = [];
    for(var i = 0; i < 100; i++) {
      particles.push(new Particle());
    }
  }
  
  function initImage() {
    image(theImage, 0, 0);
    var img = get(0, 0, w, h);
    img.loadPixels();
    px = img.pixels;
    background(255);
  }
  
  function reset() {
    initParticles();
    clear();
    initImage();
  }
  
  function mouseClicked() {
    reset();
  }