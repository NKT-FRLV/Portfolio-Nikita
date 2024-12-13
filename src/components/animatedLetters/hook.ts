import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import animateStyles from '../animatedLetters/animatedLetters.module.css'

interface UseAnimatedLettersProps {
    threshold?: number; // Порог видимости элемента
    animationDuration?: number; // Длительность анимации
    initialClass?: string; // Начальный класс для анимации
    triggerOnLoad?: boolean; // Флаг, указывающий, должна ли анимация запускаться при загрузке
  }
  
  export const useAnimatedLetters = ({
    threshold = 0.6,
    animationDuration = 1700,
    triggerOnLoad = false,
  }: UseAnimatedLettersProps) => {
    const [letterClass, setLetterClass] = useState(triggerOnLoad ? animateStyles.textAnimate : '');
  
    const { ref, inView } = useInView({
      threshold,
    });
  
    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
  
      // Если анимация должна начаться при загрузке или при попадании в область видимости
      if (triggerOnLoad || inView) {
        if (!triggerOnLoad) setLetterClass(animateStyles.textAnimate);
  
        timer = setTimeout(() => {
          setLetterClass(animateStyles.textAnimateHover);
        }, animationDuration);
      }
  
      return () => clearTimeout(timer);
    }, [ inView, triggerOnLoad, animationDuration ]);
  
    return { animationContainerRef: triggerOnLoad ? null : ref, letterClass, isInView: triggerOnLoad ? null : inView };
  };