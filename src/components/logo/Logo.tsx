import { useState, useEffect } from 'react';
import styles from './logo.module.css';
import * as motion from 'motion/react-client';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.3;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 10, bounce: 0.3 },
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

  const [gradientRotation, setGradientRotation] = useState(45); // Начальный угол
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    let animationFrame: number;

    const animateGradient = () => {
      setGradientRotation((prev) => {
        const target = hovered ? 65 : 45; // Целевой угол
        const step = hovered ? 2 : -2; // Шаг для увеличения/уменьшения
        if (Math.abs(prev - target) <= Math.abs(step)) return target; // Завершение анимации
        return prev + step; // Обновление угла
      });
      animationFrame = requestAnimationFrame(animateGradient);
    };

    animateGradient();

    return () => cancelAnimationFrame(animationFrame); // Очистка
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
          rotate: 2}
        }
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.95, rotate: -2}}
        transition={{ duration: 0.2 }}
      >
        {/* Animated path */}
        <motion.path
          variants={draw}
          custom={1}
          style={shape}
          stroke="url(#gradient)"
          d="m284 338 71-261.8642M222 272l62-242M49 332l64-239M9 332 91 30l112 308M131 30l113 308 83-309h167M355 76h128M326.982 188.5h126.036M340.991 155h112.018"
        />
        {/* Gradient effect */}
        <defs>
        <linearGradient id="gradient" gradientTransform={`rotate(${gradientRotation})`}>
          <stop offset="0%" stopColor="#00ff7f" />
          <stop offset="50%" stopColor="#535bf2" />
          <stop offset="100%" stopColor="#00ff7f" />
        </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default LogoSVG;