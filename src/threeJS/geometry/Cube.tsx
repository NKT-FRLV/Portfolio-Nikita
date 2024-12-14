import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { BoxGeometry, Mesh, LineSegments, Vector3 } from 'three';
import { useSprings, a, useSpring } from '@react-spring/three';
import {
  calculateRingPositions,
  generateRandomPositions,
} from './utils';
import Sphere from './Sphere';

const randomPositions: [number, number, number][] = generateRandomPositions(12, 2); // 12 точек, разброс до 2 единиц от центра

interface Props {
  progress: 0 | 1 | 2 | 3
}

const Cube = ({ progress }: Props) => {
  const edgesRef = useRef<LineSegments>(null);
  const cubeRef = useRef<Mesh>(null);
  const sphereRefs = useRef<Mesh[]>([]);
  const [targetPositions, setTargetPositions] = useState(randomPositions);

  // Спринг для вращения куба
  const { rotation } = useSpring({
    rotation: progress === 1 ? [Math.PI * 1.5, 0, 0] : [0, 0, 0], // Вращение на 360 градусов при progress === 2
    config: { tension: 80, friction: 16 },
  });

  // Спринг для сфер
  const [springs, api] = useSprings(targetPositions.length, (index) => ({
    position: targetPositions[index],
    config: { tension: 60, friction: 10 },
  }));

  useEffect(() => {
    api.start((index) => ({
      position: targetPositions[index],
    }));
  }, [targetPositions, api]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (progress === 0) {
      setTargetPositions(generateRandomPositions(12, 2.5));
      interval = setInterval(() => {
        setTargetPositions(generateRandomPositions(12, 2.5));
      }, 3000);
    } else if (progress === 1) {
      setTargetPositions(calculateRingPositions(1.2, randomPositions.length));
    } else if (progress === 2) {
      setTargetPositions(generateRandomPositions(12, 2.5));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [progress]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    sphereRefs.current.forEach((sphere, index) => {
      if (!sphere) return;

      let target: Vector3;
      if (progress === 3) {
        // Траектории React-style
        const numOrbits = 3; // Количество орбит
        const orbitIndex = index % numOrbits;
        const angle = (index / sphereRefs.current.length) * Math.PI * 2 + time * 0.5;

        const radius = 1.5;
        const tilt = (orbitIndex / numOrbits) * Math.PI * 2; // Разный наклон для каждой орбиты

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * Math.cos(tilt);
        const z = Math.sin(angle) * radius * Math.sin(tilt);

        target = new Vector3(x, y, z);
      } else {
        // Статические позиции
        target = new Vector3(
          targetPositions[index][0],
          targetPositions[index][1],
          targetPositions[index][2]
        );
      }

      // if (progress === 2 || progress === 1) {
      //         // Дыхание Шаров
      //   const distanceFactor = Math.sin(time * 2) * 0.2 + 1; // От 0.8 до 1.2
      //   target.multiplyScalar(distanceFactor); // Увеличиваем/уменьшаем расстояние от центра
      // }


      sphere.position.lerp(target, 0.05); // Плавное движение к цели
    });
  });

  return (
    <>
    <a.mesh ref={cubeRef} rotation={rotation}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="black" transparent opacity={0.9} />

      {/* Линии границ */}
      <lineSegments ref={edgesRef}>
        <edgesGeometry attach="geometry" args={[new BoxGeometry(0.8, 0.8, 0.8)]} />
        <lineBasicMaterial attach="material" color="white" transparent opacity={0.5} />
      </lineSegments>

      
    </a.mesh>
    
    {/* Анимированные сферы */}
    <mesh>
      {springs.map((spring, index) => (
        <Sphere
          key={index}
          position={spring.position}
          emissiveColor={progress === 3 ? '#00ff7f' : 'black'}
          ref={(ref) => {
            if (ref) sphereRefs.current[index] = ref;
          }}
        />
      ))}
    </mesh>
    </>
  );
};

export default Cube;