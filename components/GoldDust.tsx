import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../constants';

const GoldDust: React.FC<{ count?: number }> = ({ count = 200 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lightMesh = useRef<THREE.InstancedMesh>(null);

  // Generate random positions
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      const speed = 0.005 + Math.random() * 0.01;
      const factor = 0.2 + Math.random() * 0.8;
      temp.push({ x, y, z, speed, factor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = new THREE.Object3D();

  useFrame((state) => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      // Gentle floating movement
      particle.y -= particle.speed;
      particle.x += Math.sin(state.clock.elapsedTime * particle.factor) * 0.002;
      
      // Reset if too low
      if (particle.y < -8) {
        particle.y = 8;
        particle.x = (Math.random() - 0.5) * 20;
      }

      dummy.position.set(particle.x, particle.y, particle.z);
      
      // Twinkle rotation
      dummy.rotation.x = state.clock.elapsedTime * particle.factor;
      dummy.rotation.z = state.clock.elapsedTime * particle.factor;
      
      const scale = 0.05 * particle.factor;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial
        color={COLORS.GOLD_METALLIC}
        emissive={COLORS.GOLD_METALLIC}
        emissiveIntensity={2} // High intensity for bloom
        roughness={0}
        metalness={1}
      />
    </instancedMesh>
  );
};

export default GoldDust;