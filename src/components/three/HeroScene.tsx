import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, TorusKnot } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.2;
    ref.current.rotation.x = pointer.y * 0.3;
    ref.current.position.x = pointer.x * 0.3;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={[1.4, 0, 0]}>
        <sphereGeometry args={[1.3, 128, 128]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.45}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function Knot() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.3;
    ref.current.rotation.y = clock.getElapsedTime() * 0.2 + pointer.x * 0.4;
  });
  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={0.8}>
      <TorusKnot ref={ref} args={[0.55, 0.18, 200, 32]} position={[-1.8, 0.3, -1]}>
        <meshStandardMaterial color="#22d3ee" metalness={1} roughness={0.15} emissive="#0ea5e9" emissiveIntensity={0.4} />
      </TorusKnot>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#a855f7" />
        <pointLight position={[-5, -3, 2]} intensity={1.5} color="#22d3ee" />
        <Blob />
        <Knot />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
