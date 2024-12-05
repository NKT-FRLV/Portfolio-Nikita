import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointsMaterial } from 'three';

const FlickeringPoints: React.FC<{ points: number[][] }> = ({ points }) => {
  const pointsMaterialRef = useRef<PointsMaterial>(null);

  // Мерцание звезд
  useFrame(({ clock }) => {
    const time = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 0.5; // Генерация значения от 0 до 1
    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.opacity = time; // Изменение прозрачности
    }
  });

  return (
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
        ref={pointsMaterialRef} // Сохраняем ссылку на материал
        attach="material"
        size={0.1}
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={0.5} // Начальная прозрачность
      />
    </points>
  );
};
export default FlickeringPoints;