import { useState, useEffect } from 'react';
import styles from './logo.module.css';
import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.3;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0.3 },
        opacity: { delay, duration: 0.8 },
      },
    };
  },
};

const shape: React.CSSProperties = {
  strokeWidth: 12,
  strokeLinecap: 'round',
  fill: 'transparent',
};

const LogoSVG = () => {
  const [gradientRotation, setGradientRotation] = useState(45);
  const [hovered, setHovered] = useState(false);
  
  // Фиксированные цвета для градиента (всегда белый)
  const primaryColor = '#ffffff';
  const secondaryColor = '#aaaaaa';
  
  useEffect(() => {
    let animationFrame: number;

    const animateGradient = () => {
      setGradientRotation((prev) => {
        // Более плавная анимация с меньшим шагом
        const target = hovered ? 135 : 45; // Увеличиваем диапазон вращения
        const step = hovered ? 1 : -1; // Меньший шаг для более плавной анимации
        
        if (Math.abs(prev - target) <= Math.abs(step)) return target;
        return prev + step;
      });
      animationFrame = requestAnimationFrame(animateGradient);
    };

    animateGradient();

    return () => cancelAnimationFrame(animationFrame);
  }, [hovered]);

  return (
    <div className={styles.container}>
      <motion.svg
        className={styles.logo}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 503 368"
        fill="none"
        initial="hidden"
        animate="visible"
        whileHover={{
          scale: 1.05,
          rotate: 2,
          filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))"
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.95, rotate: -2 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {/* Фоновый путь для эффекта свечения */}
        <motion.path
          variants={draw}
          custom={0.5}
          style={{
            ...shape,
            strokeWidth: 16,
            strokeOpacity: 0.2,
          }}
          stroke="url(#glowGradient)"
          d="m284 338 71-261.8642M222 272l62-242M49 332l64-239M9 332 91 30l112 308M131 30l113 308 83-309h167M355 76h128M326.982 188.5h126.036M340.991 155h112.018"
        />
        
        {/* Основной путь */}
        <motion.path
          variants={draw}
          custom={1}
          style={shape}
          stroke="url(#gradient)"
          d="m284 338 71-261.8642M222 272l62-242M49 332l64-239M9 332 91 30l112 308M131 30l113 308 83-309h167M355 76h128M326.982 188.5h126.036M340.991 155h112.018"
        />
        
        {/* Градиенты */}
        <defs>
          <linearGradient 
            id="gradient" 
            gradientTransform={`rotate(${gradientRotation})`}
            spreadMethod="reflect"
          >
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="50%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor={primaryColor} />
          </linearGradient>
          
          <linearGradient 
            id="glowGradient" 
            gradientTransform={`rotate(${gradientRotation + 90})`}
          >
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default LogoSVG;