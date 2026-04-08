import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const buildings: { x: number; z: number; w: number; d: number; h: number }[] = [];
for (let i = -6; i <= 6; i += 1.5) {
  for (let j = -6; j <= 6; j += 1.5) {
    if (Math.random() > 0.3) {
      buildings.push({
        x: i + (Math.random() - 0.5) * 0.4,
        z: j + (Math.random() - 0.5) * 0.4,
        w: 0.4 + Math.random() * 0.5,
        d: 0.4 + Math.random() * 0.5,
        h: 0.5 + Math.random() * 3.5,
      });
    }
  }
}

const trafficRoutes = [
  [[-7, 0.05, 0], [7, 0.05, 0]],
  [[-7, 0.05, 3], [7, 0.05, 3]],
  [[-7, 0.05, -3], [7, 0.05, -3]],
  [[0, 0.05, -7], [0, 0.05, 7]],
  [[3, 0.05, -7], [3, 0.05, 7]],
  [[-3, 0.05, -7], [-3, 0.05, 7]],
] as [number[], number[]][];

function TrafficParticle({ route, speed, offset }: { route: [number[], number[]]; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = ((clock.getElapsedTime() * speed + offset) % 1);
    ref.current.position.x = route[0][0] + (route[1][0] - route[0][0]) * t;
    ref.current.position.y = 0.1;
    ref.current.position.z = route[0][2] + (route[1][2] - route[0][2]) * t;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.9} />
    </mesh>
  );
}

function CityScene() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f1419" />
      </mesh>
      <gridHelper args={[20, 40, "#1a2332", "#111827"]} position={[0, 0.01, 0]} />
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial
            color={b.h > 2.5 ? "#2563eb" : b.h > 1.5 ? "#1e3a5f" : "#1a2332"}
            transparent
            opacity={0.85}
            emissive={b.h > 2.5 ? "#1d4ed8" : "#0c1929"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      {trafficRoutes.map((route, ri) =>
        Array.from({ length: 5 }).map((_, pi) => (
          <TrafficParticle key={`${ri}-${pi}`} route={route} speed={0.15 + Math.random() * 0.1} offset={pi * 0.2} />
        ))
      )}
    </group>
  );
}

const CityCanvas = () => (
  <Canvas camera={{ position: [8, 10, 8], fov: 45 }} dpr={[1, 1.5]}>
    <ambientLight intensity={0.3} />
    <directionalLight position={[10, 15, 5]} intensity={0.6} color="#4a90d9" />
    <pointLight position={[-5, 8, -5]} intensity={0.4} color="#38bdf8" />
    <fog attach="fog" args={["#0a0f1a", 8, 25]} />
    <Suspense fallback={null}>
      <CityScene />
    </Suspense>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} maxPolarAngle={Math.PI / 2.5} minPolarAngle={Math.PI / 4} />
  </Canvas>
);

export default CityCanvas;
