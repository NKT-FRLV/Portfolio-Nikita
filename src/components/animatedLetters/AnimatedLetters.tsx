interface AnimatedLettersProps {
    letterClass: string;
    strArray: string[];
    idx: number;
    bracketClass?: string;  // Дополнительный класс для скобок
    nameClass?: string;     // Дополнительный класс для имени
    nameStart?: number;     // Индекс начала имени
    nameEnd?: number;       // Индекс конца имени
}

const AnimatedLetters = ({ 
  letterClass, 
  strArray, 
  idx, 
  bracketClass = '', 
  nameClass = '',
  nameStart,
  nameEnd
}: AnimatedLettersProps) => {
  const isHoverClass = letterClass.includes('Hover');
  
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      {strArray.map((char, i) => {
        // Определяем, является ли символ скобкой
        const isBracket = char === '<' || char === '>';
        
        // Определяем, является ли символ частью имени
        const isNamePart = nameStart !== undefined && 
                          nameEnd !== undefined && 
                          i >= nameStart && 
                          i <= nameEnd;
        
        // Формируем классы для символа
        let charClasses = letterClass;
        if (isBracket && bracketClass) charClasses += ` ${bracketClass}`;
        if (isNamePart && nameClass) charClasses += ` ${nameClass}`;
        
        return (
          <span
            key={`${char}-${i}`}
            className={charClasses}
            style={{
              animationDelay: isHoverClass ? '0s' : `${(i + idx) * 0.1}s`, // Убираем задержку для hover-класса
              // color: char === 'N' ? '#00ff7f' : '',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
};

export default AnimatedLetters;