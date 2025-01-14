import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FlickeringPointsWithTorus: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const pointsMaterialRef = useRef<THREE.PointsMaterial>(null);

  // Генерация точек-звезд
  const points = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      positions.push([x, y, z]);
    }
    return positions;
  }, []);

  // Анимация вращения группы
  useFrame(({ clock }) => {
    const time = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 0.5; // Генерация значения от 0 до 1
    if (groupRef.current && pointsMaterialRef.current) {
      groupRef.current.rotation.y += 0.001; // Вращение всей группы
      pointsMaterialRef.current.opacity = time; // Изменение прозрачности точек
      pointsMaterialRef.current.color.setHSL(time * 0.1, 1, 0.8); // Меняем оттенок цвета
    }
    if (groupRef.current) {
      const toruses = groupRef.current.children.filter((child) => child.type === 'Mesh') as THREE.Mesh[];
      toruses.forEach((torus) => {
        torus.rotation.x += 0.003;
        torus.rotation.y += 0.006;
      });
    }
  });
  return (
    <group ref={groupRef}>
      {/* Точки-звезды */}
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(points.flat())}
            count={points.length}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={pointsMaterialRef}
          attach="material"
          size={0.05}
          sizeAttenuation
          color="#ffd700"
          transparent
          opacity={0.5}
        />
      </points>

      {/* Торус, вращающийся вместе с точками */}
      <mesh position={[-25, -10, -5]} rotation={[Math.PI / 4, 0, 2]} castShadow receiveShadow>
        {/* Геометрия тора (плавательный круг) */}
        <torusGeometry args={[1.5, 0.4, 16, 100]} />
        {/* Материал */}
        <meshStandardMaterial color="#ff6347" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-10, -5, -5]} rotation={[Math.PI / 4, 4, 0]} castShadow receiveShadow>
        {/* Геометрия тора (плавательный круг) */}
        <torusGeometry args={[1.5, 0.4, 16, 100]} />
        {/* Материал */}
        <meshStandardMaterial color="#ff6347" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[15, -5, -5]} rotation={[Math.PI / 4, 2, 0]} castShadow receiveShadow>
        {/* Геометрия тора (плавательный круг) */}
        <torusGeometry args={[1.5, 0.4, 16, 100]} />
        {/* Материал */}
        <meshStandardMaterial color="#ff6347" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
};

export default FlickeringPointsWithTorus;