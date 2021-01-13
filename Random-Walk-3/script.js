let scene;
let camera;
let renderer;
let line;
let tick = 0;
let index = 0;
const MAX_POINTS = 300 * 3;

function setup() {
  setupScene();
  setupCamera();
  setupRenderer();
  setupLine();
  setupLights();
  setupEventListeners();
}

function setupScene() {
  scene = new THREE.Scene();
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, res, 0.1, 1000);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupLine() {
  let material = new THREE.LineBasicMaterial({
    color: 0x0000ff 
  }); 

  let geometry = new THREE.BufferGeometry();
  let positions = new Float32Array(MAX_POINTS);
  geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));

  line = new THREE.Line(geometry, material); 
  scene.add(line);
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);
  
  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-30, 60, 60);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function draw() {
  requestAnimationFrame(draw);
  if(tick % 5 === 0) {
    if(index >= MAX_POINTS) {
      resetLine();
    }
    addRandomVertexToLine();
  }
  tick += 1;
  
  moveCamera();

	renderer.render(scene, camera);  
}

function resetLine() {
  let positions = new Float32Array(MAX_POINTS * 3); 
  line.geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
  index = 0;
}

function addRandomVertexToLine() {
  let positions = line.geometry.attributes.position.array;
  let x0 = positions[index-2];
  let y0 = positions[index-1];
  let z0 = positions[index];

  let max = 1;
  let x = x0 + rand(-max, max);
  let y = y0 + rand(-max, max);
  let z = z0 + rand(-max, max);

  positions[index++] = x;
  positions[index++] = y;
  positions[index++] = z;
  line.geometry.setDrawRange(0, Math.round(index/3));
  line.geometry.attributes.position.needsUpdate = true;
}

function moveCamera() {
  let angle = Date.now() * 0.0004;
  camera.position.x = Math.cos(angle) * 4;
  camera.position.z = Math.sin(angle) * 4;

  let center = new THREE.Vector3(0, 0, 0);
  camera.lookAt(center);
}

setup();
draw();


// Thanks Jack Rugile! =)
function rand(min, max) {
  if(max === undefined) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}