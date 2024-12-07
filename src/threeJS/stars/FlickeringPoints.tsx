import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointsMaterial } from 'three';

const FlickeringPoints: React.FC = () => {
  const pointsRef = useRef<Points>(null);
  const pointsMaterialRef = useRef<PointsMaterial>(null);

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

  // Мерцание звезд
  useFrame(({ clock }) => {
    const time = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 0.5; // Генерация значения от 0 до 1
    if (pointsMaterialRef.current && pointsRef.current) {
      pointsMaterialRef.current.opacity = time; // Изменение прозрачности
      pointsMaterialRef.current.color.setHSL(time * 0.1, 1, 0.8); // Меняем оттенок цвета
      // Вращение вокруг оси Y
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
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
        size={0.05}
        sizeAttenuation
        color="#ffd700" // Начальный золотистый цвет
        transparent
        opacity={0.5} // Начальная прозрачность
      />
    </points>
  );
};
export default FlickeringPoints;