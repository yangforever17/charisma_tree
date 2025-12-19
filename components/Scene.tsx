import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import LuxuriousTree from './LuxuriousTree';
import GoldDust from './GoldDust';
import { COLORS } from '../constants';

const Scene: React.FC = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, toneMappingExposure: 1.5 }}
      shadows
    >
      <PerspectiveCamera makeDefault position={[0, 2, 9]} fov={45} />
      
      <color attach="background" args={[COLORS.BLACK_VOID]} />
      
      {/* Fog for depth */}
      <fog attach="fog" args={[COLORS.BLACK_VOID, 5, 20]} />

      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
            <LuxuriousTree />
            <GoldDust count={10000} />
            
            {/* Floor Reflection */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial 
                color={COLORS.EMERALD_DEEP}
                metalness={0.9}
                roughness={0.1}
                envMapIntensity={0.5}
              />
            </mesh>
             {/* Shadows */}
            <ContactShadows 
                opacity={0.7} 
                scale={15} 
                blur={2.5} 
                far={4} 
                resolution={256} 
                color="#000000" 
            />
        </group>

        {/* Lighting Setup */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color={COLORS.GOLD_PALE}
        />
        {/* Backlight for rim effect */}
        <spotLight
          position={[-10, 5, -10]}
          intensity={5}
          color={COLORS.EMERALD_LITE}
        />
        {/* Warm fill */}
        <pointLight position={[0, 0, 5]} intensity={0.5} color={COLORS.GOLD_ROSE} />

        {/* High quality environment map for reflections */}
        <Environment preset="city" background={false} />

        {/* Post Processing Effects for the Cinematic Look */}
        <EffectComposer disableNormalPass>
            {/* The Glow */}
            <Bloom 
                luminanceThreshold={1.1} 
                mipmapBlur 
                intensity={1.5} 
                radius={0.6}
            />
            {/* Cinematic border */}
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            {/* Film grain for texture */}
            <Noise opacity={0.02} />
        </EffectComposer>
        
        <OrbitControls 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.8}
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={15}
            autoRotate
            autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
