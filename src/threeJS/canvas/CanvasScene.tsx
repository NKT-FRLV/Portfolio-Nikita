import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Cube from '../geometry/Cube';
import FlickeringStars from '../stars/FlickeringStars';
import FlickeringPoints from '../stars/FlickeringPoints';


interface Props {
  progress: 0 | 1 | 2 | 3
}

const CanvasScene = ({ progress }: Props) => {
  const threejsDiv = document.getElementById('threejs');

  return threejsDiv ? ReactDOM.createPortal((
    <>
    <div className='background'>
      <Suspense fallback={null}>
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
            <Cube progress={progress} />

            {/* Звёзды */}
            <FlickeringStars />
            <FlickeringPoints />
            {/* <RandomStars /> */}
            
            {/* Туман */}
            <fog attach="fog" args={['#00172b', 20, 50]} />

            {/* Управление камерой */}
            <OrbitControls
              // autoRotate
              // autoRotateSpeed={0.6}
              enablePan={false}
              enableZoom={false}
              // ref={orbitRef}
            />

            {/* Postprocessing */}
            <EffectComposer>
              <Bloom intensity={0.2} luminanceThreshold={0.6} luminanceSmoothing={0.2} />
            </EffectComposer>
          </Canvas>
        </Suspense>
      </div>
    </>
  ), threejsDiv) : null;
};

export default CanvasScene;