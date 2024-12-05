
interface AnimatedLettersProps {
    letterClass: string;
    strArray: string[];
    idx: number;
}

const AnimatedLetters = ({ letterClass, strArray, idx }: AnimatedLettersProps) => {
  const isHoverClass = letterClass.includes('Hover');
  return (
    <span>
      {strArray.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={letterClass}
          style={{
            animationDelay: isHoverClass ? '0s' : `${(i + idx) * 0.1}s`, // Убираем задержку для hover-класса
            color: char === 'N' ? '#00ff7f' : '',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedLetters;