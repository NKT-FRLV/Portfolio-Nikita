import React from "react";
import * as THREE from "three";

const RandomStars = () => {
  const starsRef = React.useRef<{ position: THREE.Vector3 }[]>([]);

  // Создаём массив звёзд при монтировании компонента
  React.useEffect(() => {
    starsRef.current = Array.from({ length: 200 }, () => ({
      position: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(40),
        THREE.MathUtils.randFloatSpread(40),
        THREE.MathUtils.randFloatSpread(40)
      ),
    }));
  }, []);

  return (
    <>
      {starsRef.current.map((star, index) => (
        <mesh key={index} position={star.position}>
          <sphereGeometry args={[0.03, 24, 24]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}
    </>
  );
};

export default RandomStars;