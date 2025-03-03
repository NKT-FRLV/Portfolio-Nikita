import { forwardRef } from 'react';
import { a, SpringValue } from '@react-spring/three';
import { Mesh } from 'three';

interface SphereProps {
  position: SpringValue<[number, number, number]>;
  emissiveColor: string;
}

// Используем React.forwardRef для передачи рефа
const Sphere = forwardRef<Mesh, SphereProps>(({ position, emissiveColor }, ref) => {
  return (
    <a.mesh ref={ref} position={position} >
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        emissive={emissiveColor}
        emissiveIntensity={5}
        
      />
    </a.mesh>
  );
});

export default Sphere;