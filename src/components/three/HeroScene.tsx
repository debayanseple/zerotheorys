import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, RoundedBox, Text } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Group, Mesh } from "three";

// A floating glass "code window" representing software development
function CodePanel() {
  const ref = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = -0.25 + pointer.x * 0.15 + Math.sin(clock.getElapsedTime() * 0.4) * 0.05;
    ref.current.rotation.x = 0.05 + pointer.y * 0.1;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={ref} position={[1.6, 0.1, 0]}>
        {/* panel */}
        <RoundedBox args={[2.4, 1.55, 0.06]} radius={0.08} smoothness={6}>
          <meshPhysicalMaterial
            color="#0b1020"
            metalness={0.2}
            roughness={0.15}
            transmission={0.6}
            thickness={0.4}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#1e293b"
            emissiveIntensity={0.25}
          />
        </RoundedBox>
        {/* traffic lights */}
        <mesh position={[-1.05, 0.6, 0.04]}><circleGeometry args={[0.05, 24]} /><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} /></mesh>
        <mesh position={[-0.9, 0.6, 0.04]}><circleGeometry args={[0.05, 24]} /><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} /></mesh>
        <mesh position={[-0.75, 0.6, 0.04]}><circleGeometry args={[0.05, 24]} /><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} /></mesh>
        {/* code lines */}
        {[
          { y: 0.32, w: 1.6, c: "#22d3ee" },
          { y: 0.12, w: 1.2, c: "#a855f7" },
          { y: -0.08, w: 1.8, c: "#22d3ee" },
          { y: -0.28, w: 0.9, c: "#ec4899" },
          { y: -0.48, w: 1.4, c: "#a855f7" },
        ].map((l, i) => (
          <mesh key={i} position={[-1.05 + l.w / 2, l.y, 0.04]}>
            <planeGeometry args={[l.w, 0.06]} />
            <meshStandardMaterial color={l.c} emissive={l.c} emissiveIntensity={0.8} transparent opacity={0.85} />
          </mesh>
        ))}
        <Text position={[0, -0.86, 0.04]} fontSize={0.085} color="#94a3b8" anchorX="center">
          {"<build /> ship · scale · grow"}
        </Text>
      </group>
    </Float>
  );
}

// Orbiting growth chart bar — marketing
function GrowthChart() {
  const ref = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = 0.35 + pointer.x * -0.2 + Math.sin(clock.getElapsedTime() * 0.5) * 0.08;
    ref.current.rotation.x = -0.1 + pointer.y * -0.08;
  });
  const bars = [0.4, 0.7, 0.55, 0.95, 1.25];
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={[-1.9, -0.1, -0.4]}>
        {bars.map((h, i) => (
          <mesh key={i} position={[i * 0.32 - 0.64, h / 2 - 0.6, 0]}>
            <boxGeometry args={[0.22, h, 0.22]} />
            <meshStandardMaterial
              color={i === bars.length - 1 ? "#a855f7" : "#22d3ee"}
              emissive={i === bars.length - 1 ? "#a855f7" : "#0ea5e9"}
              emissiveIntensity={0.5}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        ))}
        {/* arrow */}
        <mesh position={[0.95, 0.85, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <coneGeometry args={[0.14, 0.32, 16]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  );
}

// Subtle orbiting ring tying it together
function Ring() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, 0, -1.5]} rotation={[Math.PI / 2.4, 0, 0]}>
      <torusGeometry args={[3.2, 0.01, 16, 200]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#a855f7" />
        <pointLight position={[-5, -3, 2]} intensity={1.5} color="#22d3ee" />
        <CodePanel />
        <GrowthChart />
        <Ring />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
