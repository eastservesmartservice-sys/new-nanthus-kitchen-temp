import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const ParticleField = (props: any) => {
  const ref = useRef<any>(null);
  const count = 2000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 20; // Spread x
        const y = (Math.random() - 0.5) * 20; // Spread y
        const z = (Math.random() - 0.5) * 10; // Spread z
        positions[i * 3] = x;
        positions[i* 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.x = state.clock.elapsedTime * 0.05;
        ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
            transparent
            color="#FFCF40"
            size={0.03}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.6}
        />
    </Points>
  );
};

const ThreeBackground: React.FC = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <ParticleField />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
