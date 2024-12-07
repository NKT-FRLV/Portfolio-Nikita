import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Points, PointsMaterial } from 'three';


const FlickeringStars: React.FC = () => {
  const starsRef = useRef<Points>(null);

  // Мерцание звезд
  useFrame(({ clock }) => {
    if (starsRef.current) {
      const time = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 0.5; // Значение от 0 до 1
      (starsRef.current.material as PointsMaterial).opacity = time; // Изменение прозрачности

      // Добавляем вращение вокруг оси Y
      starsRef.current.rotation.y += 0.001; // Скорость вращения
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={50}
      depth={50}
      count={5000}
      factor={4}
      fade
      speed={1}
    />
  );
};

export default FlickeringStars;