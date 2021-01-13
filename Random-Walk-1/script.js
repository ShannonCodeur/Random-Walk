/*
 * A one dimensional random walk model.  
 */

var canvas, ctx;
var particles = [];
var numParticles = 75;;
var steps = 0;
var xStepUpperBound = 0;
var intervalId;
var simRunning = false;

/*************************************************************/

function init() {
	canvas = document.getElementById("rw-canvas");
	
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");	
		
		for (i=0; i < numParticles; i++)
			particles[i] = new Particle((canvas.width/2),(canvas.height/2),2);
	}
}


/*************************************************************/
function toggleAnim(){
	toggleBtn = document.getElementById("startStopBtn");
	if(simRunning){
		clearInterval(intervalId);
		simRunning = false;
		toggleBtn.value = "Start";
	}
	else{
		intervalId = setInterval(animate,50);
		simRunning = true;
		toggleBtn.value = "Stop";
	}
}

/*************************************************************/

function clearAnim(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	particles = [];
	steps = 0;
	
	(document.getElementById("x-mean")).value = 0;
	(document.getElementById("x-mean-square-distance")).value = 0;
	(document.getElementById("x-root-mean-square-distance")).value = 0;
	
	(document.getElementById("steps-stepSize")).value = 0;
	(document.getElementById("steps-disp")).value = 0;

	init();

	if(simRunning){		
		clearInterval(intervalId);
		simRunning = false;
		document.getElementById("startStopBtn").value = "Start";
	}	
}	

/*************************************************************/
function animate() {
	
	var sum_x_net = 0, sum_x_sq_dist = 0;
	var delX;
	
	draw();
	
	steps++;
	(document.getElementById("steps-disp")).value = steps;
	
	for (i = 0; i < numParticles; i++) {
		delX = Math.floor(1 + Math.random()*xStepUpperBound);
		
		if (Math.random() < 0.5)
			delX *= -1;

		particles[i].move(delX);

		sum_x_net += particles[i].x_net;	
		sum_x_sq_dist += particles[i].x_sq_dist;		
	}
	
	/* At the current step number, the walkers have reached a total distance of
	 * x_net (or y_net).  The mean x_net, over all the walkers, is r-mean.
	 */
	(document.getElementById("x-mean")).value = (sum_x_net/(numParticles)).toFixed(5);	

	/*
	 * Again at the current step, each walker has a square of the displacement,
	 * x_sq_dist (or y_sq_dist).  This is simply the square of the displacement
	 * x_net or y_net that each walker has arrived at.  The second moment, the
	 * mean-square-distance, is then the mean of these values, x_sq_dist (or y_sq_dist).
	 * Take the root for rmsd.
	 */
	(document.getElementById("x-mean-square-distance")).value = (sum_x_sq_dist/(numParticles)).toFixed(5);	
	(document.getElementById("x-root-mean-square-distance")).value = (Math.sqrt(sum_x_sq_dist/(numParticles))).toFixed(5);

	/*
	 * For walkers in 1D and with unit steps, it can be shown that the rmsd ~ root(# of steps).
	 */
	(document.getElementById("steps-stepSize")).value = Math.sqrt(steps).toFixed(5);

	
}

/*************************************************************/
function draw() {
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "Tomato";

	for (i = 0; i < numParticles; i++) {
		ctx.beginPath();
		ctx.arc(particles[i].x,particles[i].y,particles[i].radius,0,2*Math.PI);
		ctx.fill();
	}
	
}

/*************************************************************/
function Particle(x,y,radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	
	this.x_net = 0;
	this.x_sq_dist = 0;

	this.move = function(delX) {
		this.x += delX;
		
		if (this.x > canvas.width)
			this.x = 10;
		if (this.x < 0)
			this.x = canvas.width;
		
		//Accumulate the net displacement.
		this.x_net += delX;

		/*
		 * Set the square of the displacement along either direction
		 * but upto the current number of steps!! (Not cumulative).
		 */
		this.x_sq_dist = Math.pow(this.x_net,2);		
	}
}
