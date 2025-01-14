import { useState } from 'react';
interface AnimatedLettersProps {
    letterClass: string;
    strArray: string[];
    idx: number;
}

const AnimatedLetters = ({ letterClass, strArray, idx }: AnimatedLettersProps) => {
  const isHoverClass = letterClass.includes('Hover');
  const [hoveredIndices, setHoveredIndices] = useState<number[]>([]);

  // Функция добавления индекса при ховере или свайпе
  const handlePointerMove = (index: number) => {
    if (!hoveredIndices.includes(index)) {
      setHoveredIndices((prev) => [...prev, index]);
    }
  };
  return (
    <span>
      {strArray.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={`${letterClass} ${hoveredIndices.includes(i) ? 'textAnimateHover' : ''}`}
          style={{
            animationDelay: isHoverClass ? '0s' : `${(i + idx) * 0.1}s`, // Убираем задержку для hover-класса
            color: char === 'N' ? '#00ff7f' : '',
          }}
          onPointerMove={() => handlePointerMove(i)} // Срабатывает при проведении пальцем или мышью
          onMouseEnter={() => handlePointerMove(i)}  // Для обычного ховера мыши
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedLetters;