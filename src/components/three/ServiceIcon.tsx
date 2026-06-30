import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Group } from "three";

type Kind = "software" | "web" | "social" | "design";

function Shape({ kind, hovered }: { kind: Kind; hovered: boolean }) {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const target = hovered ? 1.15 : 1;
    ref.current.scale.lerp({ x: target, y: target, z: target } as never, 0.1);
    ref.current.rotation.y += dt * (hovered ? 1.4 : 0.4);
    ref.current.rotation.x += dt * 0.15;
  });

  const color = {
    software: "#22d3ee",
    web: "#a855f7",
    social: "#ec4899",
    design: "#f59e0b",
  }[kind];

  return (
    <group ref={ref}>
      {kind === "software" && (
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.3} wireframe />
        </mesh>
      )}
      {kind === "web" && (
        <mesh>
          <torusGeometry args={[0.9, 0.3, 32, 100]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.1} emissive={color} emissiveIntensity={0.4} />
        </mesh>
      )}
      {kind === "social" && (
        <group>
          <mesh><icosahedronGeometry args={[0.9, 0]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.15} emissive={color} emissiveIntensity={0.35} /></mesh>
          <mesh position={[1, 0.6, 0]}><sphereGeometry args={[0.18, 32, 32]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} /></mesh>
          <mesh position={[-0.9, -0.5, 0.3]}><sphereGeometry args={[0.14, 32, 32]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} /></mesh>
        </group>
      )}
      {kind === "design" && (
        <mesh>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} emissive={color} emissiveIntensity={0.4} />
        </mesh>
      )}
    </group>
  );
}

export default function ServiceIcon({ kind, hovered }: { kind: Kind; hovered: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#a855f7" />
        <pointLight position={[-3, -2, 2]} intensity={1.2} color="#22d3ee" />
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <Shape kind={kind} hovered={hovered} />
        </Float>
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
