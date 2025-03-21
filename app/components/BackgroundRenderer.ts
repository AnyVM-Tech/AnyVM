import * as THREE from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let animationId: number;

function createParticles() {
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 5000;
  
  const posArray = new Float32Array(particlesCount * 3);
  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 30;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.025,
    color: 0x3B82F6, // Blue
    transparent: true,
    opacity: 0.7,
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  return particlesMesh;
}

function setupMouseInteraction(particles: THREE.Points) {
  let mouseX = 0;
  let mouseY = 0;
  
  function onDocumentMouseMove(event: MouseEvent) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
  }
  
  document.addEventListener('mousemove', onDocumentMouseMove);
  
  function animate() {
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    
    particles.rotation.x += (mouseY * 0.0005 - particles.rotation.x) * 0.05;
    particles.rotation.y += (mouseX * 0.0005 - particles.rotation.y) * 0.05;
    
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }
  
  animate();
  
  return () => {
    document.removeEventListener('mousemove', onDocumentMouseMove);
    cancelAnimationFrame(animationId);
  };
}

export function initBackground() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  if (document.getElementById('background-canvas')) {
    return;
  }
  
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.z = 15;

  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x050A20, 1); // Dark blue 

  const canvas = renderer.domElement;
  canvas.id = 'background-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1'; // visibility
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);

  const particles = createParticles();

  const ambientLight = new THREE.AmbientLight(0x333366, 1);
  scene.add(ambientLight);
  
  const cleanup = setupMouseInteraction(particles);
  
  // handle window resize
  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  window.addEventListener('resize', handleResize);
  
  // cleanup function
  return () => {
    cleanup();
    window.removeEventListener('resize', handleResize);
    if (renderer) {
      renderer.dispose();
    }
  };
}