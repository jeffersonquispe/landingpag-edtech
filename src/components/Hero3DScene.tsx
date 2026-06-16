'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// Custom Vertex Shader
const vertexShader = `
  uniform float uTime;
  uniform float uWave;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vHeight;

  void main() {
    vec3 pos = position;

    // Wave distortion based on time
    pos.x += sin(pos.y * 3.0 + uTime) * uWave;
    pos.y += cos(pos.z * 2.0 + uTime) * uWave;
    pos.z += sin(pos.x * 2.5 + uTime) * uWave;

    vNormal = normalize(normalMatrix * normal);
    vPosition = vec3(modelMatrix * vec4(pos, 1.0));
    vHeight = pos.y;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Custom Fragment Shader with Neon Effects
const fragmentShader = `
  uniform float uTime;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vHeight;

  void main() {
    // Fresnel effect for neon glow at edges
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDir, vNormal), 2.0);

    // Three neon colors
    vec3 cyan = vec3(0.0, 1.0, 1.0);
    vec3 magenta = vec3(1.0, 0.0, 0.5);
    vec3 green = vec3(0.22, 1.0, 0.08);

    // Animate color mixing based on position and time
    float mix1 = sin(vPosition.x * 2.0 + uTime) * 0.5 + 0.5;
    float mix2 = cos(vPosition.y * 1.5 + uTime) * 0.5 + 0.5;
    float mix3 = sin(vHeight * 2.5 + uTime * 0.5) * 0.5 + 0.5;

    vec3 baseColor = mix(
      mix(cyan, magenta, mix1),
      green,
      mix2
    );

    // Enhance with fresnel - creates glow effect
    vec3 finalColor = baseColor + fresnel * 0.8;

    // Add glow layer based on height
    finalColor += mix3 * 0.3;

    // Apply intensity
    gl_FragColor = vec4(finalColor * uIntensity, 0.95);
  }
`;

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer with transparency and enhanced tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create icosahedron geometry
    const geometry = new THREE.IcosahedronGeometry(1, 5);

    // Custom shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uWave: { value: 0.08 },
        uIntensity: { value: 1.8 },
      },
      transparent: true,
      fog: false,
    });

    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);
    meshRef.current = mesh;

    // Enhanced lighting for glow effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Key light - Cyan
    const pointLight1 = new THREE.PointLight(0x00ffff, 2);
    pointLight1.position.set(8, 8, 8);
    pointLight1.distance = 20;
    scene.add(pointLight1);

    // Fill light - Magenta
    const pointLight2 = new THREE.PointLight(0xff007f, 1.5);
    pointLight2.position.set(-8, -6, 8);
    pointLight2.distance = 18;
    scene.add(pointLight2);

    // Accent light - Green
    const pointLight3 = new THREE.PointLight(0x39ff14, 1);
    pointLight3.position.set(0, -8, -5);
    pointLight3.distance = 15;
    scene.add(pointLight3);

    // Add wireframe for glow edges
    const edges = new THREE.EdgesGeometry(geometry);
    const wireframe = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: 0x00ffff,
        linewidth: 1,
        transparent: true,
        opacity: 0.4,
      })
    );
    mesh.add(wireframe);

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let time = 0;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = mouseX * Math.PI * 0.5;
      targetRotationX = mouseY * Math.PI * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // GSAP animation for continuous rotation
    gsap.to(mesh.rotation, {
      z: Math.PI * 2,
      duration: 14,
      ease: 'none',
      repeat: -1,
    });

    // Pulse shader intensity
    gsap.to(shaderMaterial.uniforms.uIntensity, {
      value: 2.5,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Pulse wave amplitude
    gsap.to(shaderMaterial.uniforms.uWave, {
      value: 0.15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      if (mesh) {
        mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.05;
        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.05;

        const scale = 1 + Math.sin(time * 0.7) * 0.06;
        mesh.scale.set(scale, scale, scale);
      }

      // Update shader uniforms
      shaderMaterial.uniforms.uTime.value = time;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: 0.8,
      }}
    />
  );
}
