import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Float } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../constants';

const TreeLayer: React.FC<{
  position: [number, number, number];
  scale: number;
  height: number;
  segments: number;
}> = ({ position, scale, height, segments }) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Generate ornament positions for this layer
  const ornaments = useMemo(() => {
    const items = [];
    const radiusBase = 1.5 * scale;
    const count = 12 * scale; // More ornaments on larger layers

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      // Spiral distribution
      const y = (Math.random() - 0.5) * height * 0.8; 
      const radiusAtY = radiusBase * (1 - (y + height/2) / (height * 1.5)); // Approximate cone taper
      
      const x = Math.cos(angle) * (radiusAtY + 0.1);
      const z = Math.sin(angle) * (radiusAtY + 0.1);
      
      items.push({ pos: [x, y, z] as [number, number, number], scale: Math.random() * 0.15 + 0.05 });
    }
    return items;
  }, [scale, height]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05 + position[1] * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* The Greenery - Styled as stacked geometric cones for a modern luxury look */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.1 * scale, 1.8 * scale, height, segments]} />
        <meshStandardMaterial
          ref={materialRef}
          color={COLORS.EMERALD_RICH}
          roughness={0.15}
          metalness={0.6}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Ornaments */}
      {ornaments.map((ornament, i) => (
        <mesh key={i} position={ornament.pos} castShadow>
          <sphereGeometry args={[ornament.scale, 16, 16]} />
          <meshStandardMaterial
            color={COLORS.GOLD_METALLIC}
            metalness={1}
            roughness={0.1}
            emissive={COLORS.GOLD_ROSE}
            emissiveIntensity={0.2} // Subtle glow
            envMapIntensity={2}
          />
        </mesh>
      ))}
      
      {/* Light strings (represented as tiny emissive dots) */}
       {ornaments.map((ornament, i) => (
         (i % 3 === 0) && (
          <mesh key={`light-${i}`} position={[ornament.pos[0]*1.05, ornament.pos[1], ornament.pos[2]*1.05]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={COLORS.GOLD_PALE}
              emissiveIntensity={3} // Bloom source
              toneMapped={false}
            />
          </mesh>
         )
      ))}
    </group>
  );
};

const LuxuriousTree = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -2, 0]}>
      {/* Layers of the tree */}
      <TreeLayer position={[0, 0, 0]} scale={1.8} height={2.5} segments={7} />
      <TreeLayer position={[0, 1.8, 0]} scale={1.4} height={2.2} segments={7} />
      <TreeLayer position={[0, 3.4, 0]} scale={1.0} height={2.0} segments={7} />
      <TreeLayer position={[0, 4.8, 0]} scale={0.6} height={1.5} segments={7} />

      {/* The Star */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[0, 6, 0]}>
          <mesh>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color={COLORS.GOLD_METALLIC}
              emissive={COLORS.GOLD_METALLIC}
              emissiveIntensity={4} // Strong Bloom
              toneMapped={false}
            />
          </mesh>
          {/* Star Rays */}
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshBasicMaterial
              color={COLORS.GOLD_PALE}
              transparent
              opacity={0.2}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export default LuxuriousTree;