
export const initialPositions: [number, number, number][] = [
  [0, 0, 0],
  [0.8, 0.3, -0.2],
  [-0.7, -0.9, 0.5],
  [0.4, -0.6, 0.9],
  [-0.8, 0.7, -0.6],
  [0.6, 0.9, 0.3],
  [-0.9, -0.2, 0.4],
  [0.7, -0.8, -0.9],
  [-0.4, 0.6, -0.8],
  [0.9, 0.1, -0.5],
  [-0.6, -0.5, 0.8],
  [0.2, -0.9, 0.7],
  [-0.8, 0.3, 0.1],
  [0.5, 0.7, -0.7],
  [-0.3, -0.2, -0.9],
];

// Функция для генерации случайных координат для расположения шаров
export const generateRandomPositions = (
    count: number,
    range: number
  ): [number, number, number][] => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * range; // Случайное значение от -range/2 до range/2
      const y = (Math.random() - 0.5) * range;
      const z = (Math.random() - 0.5) * range;
      positions.push([x, y, z]);
    }
    return positions;
  };




export const calculateRingPositions = (radius: number, count: number): [number, number, number][] => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        positions.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
    }
    return positions;
};
  
export const calculateHeartPositions = (scale: number, count: number): [number, number, number][] => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const x = scale * 16 * Math.pow(Math.sin(t), 3);
        const y =
        scale *
        (13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t));
        positions.push([x * 0.05, y * 0.05, 0]); // Уменьшаем масштаб
    }
    return positions;
};
  
  // Создаем эллиптические траектории
export const calculateReactSymbolPositions = (
    radius: number,
    count: number,
    tilt: number
    ): [number, number, number][] => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * Math.cos(tilt); // Уменьшаем высоту эллипса
        const z = Math.sin(angle) * radius * Math.sin(tilt); // Смещение по Z
        positions.push([x, y, z]);
    }
    return positions;
};
  
export const calculateGridPositions = (size: number, count: number): [number, number, number][] => {
    const positions: [number, number, number][] = [];
    const step = size / Math.cbrt(count); // Интервал между точками
    for (let x = -size / 2; x <= size / 2; x += step) {
        for (let y = -size / 2; y <= size / 2; y += step) {
        for (let z = -size / 2; z <= size / 2; z += step) {
            if (positions.length < count) positions.push([x, y, z]);
        }
        }
    }
    return positions;
};