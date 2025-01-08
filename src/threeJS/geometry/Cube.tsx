import React, { useRef, useState, useEffect } from 'react';
import { SectionContext } from '../../SectionContext';
import { useFrame } from '@react-three/fiber';
import { BoxGeometry, Mesh, LineSegments, Vector3, Group } from 'three';
import { useSprings, a, useSpring } from '@react-spring/three';
import {
  calculateRingPositions,
  generateRandomPositions,
} from './utils';
import Sphere from './Sphere';

// const randomPositions: [number, number, number][] = generateRandomPositions(12, 2);

const randomSpherePositions: Record<number, [number, number, number][][]> = {
  0: Array.from({ length: 5 }, () => generateRandomPositions(12, 2.5)), // Генерируем 5 массивов случайных позиций
  1: [calculateRingPositions(1.2, 12)], // Один набор позиций для кольца
  2: [generateRandomPositions(12, 2.5)], // Один массив случайных позиций
  3: [generateRandomPositions(12, 2.5)], // Один массив случайных позиций (НЕ ИСПОЛЬЗУЕТСЯ)
};

const Cube = () => {
  const currentSectionIndex = React.useContext(SectionContext);
  const edgesRef = useRef<LineSegments>(null);
  const cubeRef = useRef<Mesh>(null);
  const sphereRefs = useRef<Mesh[]>([]);
  const parentRef = useRef<Group>(null); // Новый контейнер для вращения
  const [targetPositions, setTargetPositions] = useState(randomSpherePositions[0][0]);

  // Спринг для вращения куба
  const { rotation } = useSpring({
    rotation: currentSectionIndex === 1 ? [Math.PI * 1.5, 0, 0] : [0, 0, 0], // Вращение на 360 градусов при currentSectionIndex === 2
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

    if (currentSectionIndex === 0) {
      // Устанавливаем один из заранее подготовленных массивов
      setTargetPositions(randomSpherePositions[0][0]);
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * randomSpherePositions[0].length);
        setTargetPositions(randomSpherePositions[0][randomIndex]);
      }, 3000); // Меняем позиции каждые 3 секунды
    } else if (randomSpherePositions[currentSectionIndex] && currentSectionIndex !== 3) {
      // Устанавливаем подготовленный массив для других секций
      setTargetPositions(randomSpherePositions[currentSectionIndex][0]);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentSectionIndex]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    sphereRefs.current.forEach((sphere, index) => {
      if (!sphere) return;

      let target: Vector3;
      if (currentSectionIndex === 3) {
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

      sphere.position.lerp(target, 0.05); // Плавное движение к цели
    });
  });

    // Добавляем плавное вращение для родительского контейнера
    useFrame(() => {
      if (parentRef.current) {
        parentRef.current.rotation.y -= 0.002; // Плавное вращение вокруг оси Y
        parentRef.current.rotation.x -= 0.003;
      }
    });

  return (
    <>
    <group ref={parentRef}>
      <a.mesh ref={cubeRef} rotation={rotation}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="black" transparent opacity={0.95} metalness={0.6} roughness={0.6} />

        {/* Линии границ */}
        <lineSegments ref={edgesRef}>
          <edgesGeometry attach="geometry" args={[new BoxGeometry(0.8, 0.8, 0.8)]} />
          <lineBasicMaterial attach="material" color="white" transparent opacity={0.3} />
        </lineSegments>

        
      </a.mesh>
    </group>
    {/* Анимированные сферы */}
    <a.mesh>
      {springs.map((spring, index) => (
        <Sphere
          key={index}
          position={spring.position}
          emissiveColor={currentSectionIndex === 3 ? '#00ff7f' : 'black'}
          ref={(ref) => {
            if (ref) sphereRefs.current[index] = ref;
          }}
        />
      ))}
    </a.mesh>
    </>
  );
};

export default Cube;