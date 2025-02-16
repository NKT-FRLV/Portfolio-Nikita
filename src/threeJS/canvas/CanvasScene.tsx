import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import Cube from '../geometry/Cube';
import FlickeringStars from '../stars/FlickeringStars';
import FlickeringPointsWithTorus from '../stars/FlickeringPoints';

// Оборачиваем компоненты звезд в React.memo для предотвращения рендера
const MemoizedFlickeringStars = React.memo(FlickeringStars);
const MemoizedFlickeringPoints = React.memo(FlickeringPointsWithTorus);



const CanvasScene = React.memo(() => {
  
    // Создаем неизменяемую сцену звезд
    const starsScene = useMemo(() => (
      <>
        <MemoizedFlickeringStars />
        <MemoizedFlickeringPoints />
      </>
    ), []);

  return (
    <>
    <motion.div
      className='background'
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
          <Canvas
            shadows
            camera={{ position: [5, 5, 5], fov: 35 }}
          >
            <color attach="background" args={['#001020']} />
            
            {/* Глобальный свет для базовой подсветки сцены */}
            <ambientLight intensity={0.5} color="#fff" />

            {/* Основной свет */}
            <directionalLight
              position={[10, 10, 10]}
              intensity={1}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />

            {/* Дополнительный свет */}
            <pointLight position={[-5, 5, -5]} intensity={0.3} color="#ffccaa" />

            {/* Куб */}
            <Cube />

            {/* Мемоизарованная Сцена Звезд */}
            {starsScene}

            
            {/* Туман */}
            <fog attach="fog" args={['#00172b', 10, 60]} />

            {/* Управление камерой */}
            <OrbitControls
              enablePan={false}
              enableZoom={false}
            />

            {/* Postprocessing */}
            <EffectComposer>
              <Bloom intensity={0.2} luminanceThreshold={0.6} luminanceSmoothing={0.2} />
            </EffectComposer>
          </Canvas>
      </motion.div>
    </>
  )
});

export default CanvasScene;