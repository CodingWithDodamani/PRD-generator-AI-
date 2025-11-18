
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const LandingScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    // Dark fog to blend particles into the background depth
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(
      60, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      1, 
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // 2. Create Network Group
    const group = new THREE.Group();
    scene.add(group);

    // 3. Configuration
    const particleCount = 100;
    const r = 12; // Radius of the cloud distribution

    // 4. Data Structures
    const particlesData: { velocity: THREE.Vector3; numConnections: number }[] = [];
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 2 * r - r;
        const y = Math.random() * 2 * r - r;
        const z = Math.random() * 2 * r - r;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Color Palette: Mix of Indigo, Purple, and Blue
        const color = new THREE.Color();
        // Randomize slightly between indigo (0.66) and purple (0.75) hue
        color.setHSL(0.6 + Math.random() * 0.15, 0.9, 0.6);
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        // Random slow velocity
        particlesData.push({
            velocity: new THREE.Vector3(
                -1 + Math.random() * 2, 
                -1 + Math.random() * 2, 
                -1 + Math.random() * 2
            ).normalize().multiplyScalar(0.02), // Speed
            numConnections: 0
        });
    }

    // 5. Point Cloud (Nodes)
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setDrawRange(0, particleCount);
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.6,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    const pointCloud = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(pointCloud);

    // 6. Lines (Connections)
    const linesGeometry = new THREE.BufferGeometry();
    // Maximum possible segments is n*(n-1)/2, but we cap draw range
    const segments = particleCount * particleCount; 
    
    const linePositions = new Float32Array(segments * 3);
    const lineColors = new Float32Array(segments * 3);

    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const linesMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.15 // Subtle connections
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    group.add(linesMesh);

    // 7. Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    const handleScroll = () => {
        scrollY = window.scrollY;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);

    // 8. Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;

      // Reset connection counts
      for (let i = 0; i < particleCount; i++) particlesData[i].numConnections = 0;

      // Update Particles Position
      for (let i = 0; i < particleCount; i++) {
        const particleData = particlesData[i];

        positions[i * 3] += particleData.velocity.x;
        positions[i * 3 + 1] += particleData.velocity.y;
        positions[i * 3 + 2] += particleData.velocity.z;

        // Boundary bounce (Cube volume)
        if (positions[i * 3] < -r || positions[i * 3] > r) particleData.velocity.x *= -1;
        if (positions[i * 3 + 1] < -r || positions[i * 3 + 1] > r) particleData.velocity.y *= -1;
        if (positions[i * 3 + 2] < -r || positions[i * 3 + 2] > r) particleData.velocity.z *= -1;

        // Check connections with other particles
        // Optimization: Only check j > i to avoid duplicates
        for (let j = i + 1; j < particleCount; j++) {
          const particleDataB = particlesData[j];
          
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 5.5) { // Connection Threshold
            particleData.numConnections++;
            particleDataB.numConnections++;

            // Alpha fades out as distance increases
            const alpha = 1.0 - dist / 5.5;

            // Add Line Position
            linePositions[vertexpos++] = positions[i * 3];
            linePositions[vertexpos++] = positions[i * 3 + 1];
            linePositions[vertexpos++] = positions[i * 3 + 2];

            linePositions[vertexpos++] = positions[j * 3];
            linePositions[vertexpos++] = positions[j * 3 + 1];
            linePositions[vertexpos++] = positions[j * 3 + 2];

            // Add Line Color (Interpolate + Alpha)
            lineColors[colorpos++] = colors[i * 3] * alpha;
            lineColors[colorpos++] = colors[i * 3 + 1] * alpha;
            lineColors[colorpos++] = colors[i * 3 + 2] * alpha;

            lineColors[colorpos++] = colors[j * 3] * alpha;
            lineColors[colorpos++] = colors[j * 3 + 1] * alpha;
            lineColors[colorpos++] = colors[j * 3 + 2] * alpha;

            numConnected++;
          }
        }
      }

      // Update Geometry Attributes
      linesMesh.geometry.setDrawRange(0, numConnected * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.attributes.color.needsUpdate = true;
      pointCloud.geometry.attributes.position.needsUpdate = true;

      // Responsive Rotation
      // Ease the group rotation towards mouse position
      group.rotation.y += (mouseX * 0.0005 - group.rotation.y) * 0.05;
      group.rotation.x += (-mouseY * 0.0005 - group.rotation.x) * 0.05;
      
      // Constant subtle rotation + Scroll influence
      group.rotation.z = Date.now() * 0.0002 + scrollY * 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('scroll', handleScroll);
        
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
        }

        particlesGeometry.dispose();
        particlesMaterial.dispose();
        linesGeometry.dispose();
        linesMaterial.dispose();
        renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
};
