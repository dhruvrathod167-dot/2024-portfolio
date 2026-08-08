import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, Suspense } from 'react';
import * as THREE from 'three';

function getAccentColor() {
  if (typeof window === 'undefined') return '#6366F1';
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
  return raw || '#6366F1';
}

function ParticleGrid() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const colorRef = useRef(getAccentColor());

  const materialRef = useRef<THREE.PointsMaterial>(null);

  useEffect(() => {
    const update = () => {
      colorRef.current = getAccentColor();
      if (materialRef.current) materialRef.current.color.set(colorRef.current);
    };
    window.addEventListener('themechange', update);
    return () => window.removeEventListener('themechange', update);
  }, []);

  const { positions, originalPositions } = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const radius = 2.4;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.85 + Math.random() * 0.15);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }
    return { positions, originalPositions };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;

    pointsRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.3;
    pointsRef.current.rotation.x = mouse.current.y * 0.2;

    const geom = pointsRef.current.geometry;
    const pos = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];
      const oz = originalPositions[i + 2];
      const wave = Math.sin(t * 0.6 + oy * 1.5) * 0.08;
      pos[i] = ox + wave;
      pos[i + 1] = oy + Math.cos(t * 0.5 + ox) * 0.06;
      pos[i + 2] = oz;
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.018}
        color={colorRef.current}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    const update = () => {
      if (materialRef.current) materialRef.current.color.set(getAccentColor());
    };
    window.addEventListener('themechange', update);
    return () => window.removeEventListener('themechange', update);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.05;
    meshRef.current.rotation.z = t * 0.03;
  });

  return (
    <mesh ref={meshRef} scale={2.35}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial ref={materialRef} color={getAccentColor()} wireframe transparent opacity={0.12} />
    </mesh>
  );
}

export function HeroScene() {
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        {!prefersReduced && <ParticleGrid />}
        {!prefersReduced && <WireframeSphere />}
      </Suspense>
    </Canvas>
  );
}
