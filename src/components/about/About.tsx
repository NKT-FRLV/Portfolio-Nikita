import { useState } from 'react'
import { useAnimatedLetters } from '../animatedLetters/hook'
import Section from '../section/Section'
import Tab from '../tab/Tab'
import AnimatedLetters from '../animatedLetters/AnimatedLetters'
import { useWindowSize } from '../../hooks';
import styles from './about.module.css';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';
import clsx from 'clsx';

// Импортируем компоненты
import Skills from './Skills';
import Education from './Education';
import AboutMe from './AboutMe';

// Варианты анимации для контента табов
const tabContentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const About = () => {
  const { letterClass, animationContainerRef, isInView } = useAnimatedLetters({
    threshold: 0.6,
    animationDuration: 1700,
  });

  const tabs = ['Skills', 'Education', 'About'] as const;
  type TabType = typeof tabs[number];
  
  const [activeTab, setActiveTab] = useState<TabType>('Skills');
  const [direction, setDirection] = useState(0);
  
  // Получаем текущий индекс активного таба
  const currentTabIndex = tabs.indexOf(activeTab);

  const handleTabClick = (tab: TabType) => {
    const newIndex = tabs.indexOf(tab);
    const oldIndex = currentTabIndex;
    setDirection(newIndex > oldIndex ? 1 : -1);
    setActiveTab(tab);
  };

  // Функция для переключения на следующий/предыдущий таб
  const paginate = (newDirection: number) => {
    const newIndex = (currentTabIndex + newDirection + tabs.length) % tabs.length;
    setDirection(newDirection);
    setActiveTab(tabs[newIndex]);
  };

  const { width } = useWindowSize();
  const isArrowPresence = width > 768 ? true : false;
  const isTitlePresence = width > 550 ? false : true;

  const titleLetters = '<About Me />'.split('');

  return (
    <Section style={{justifyContent: 'start', alignItems: 'start', width: '100%'}}>
      <div className={styles.container} ref={animationContainerRef}>
        {isTitlePresence && (
          <h2 className={styles.heading}>
            <AnimatedLetters letterClass={letterClass} strArray={titleLetters} idx={1} />
          </h2>
        )}
        
        <div className={styles.tabsWrapper}>
          <LayoutGroup id="tabs">
            {tabs.map((tab) => (
              <Tab 
                key={tab}
                title={tab === 'About' ? 'About Me' : tab}
                isActive={activeTab === tab}
                handleTabClick={() => handleTabClick(tab)}
              />
            ))}
          </LayoutGroup>
        </div>
        
        {isArrowPresence && (
          <>
            <div className={clsx(styles.arrow, styles.arrowStart)}>
              <IoChevronBack 
                style={{ width: 40, height: 80 }} 
                onClick={() => paginate(-1)} 
              />
            </div>
            
            <div className={clsx(styles.arrow, styles.arrowEnd)}>
              <IoChevronForward 
                style={{ width: 40, height: 80 }} 
                onClick={() => paginate(1)} 
              />
            </div>
        </>
        )}
        
        <div className={styles.contentContainer}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {activeTab === 'Skills' && (
              <motion.div 
                key="Skills"
                custom={direction}
                variants={tabContentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.motionContent}
                // style={{ height: 'fit-content' }}
                transition={{
                  x: { type: 'spring', stiffness: 200, damping: 20 },
                  opacity: { duration: 0.2 },
                }}
              >
                <Skills isInView={isInView || false} />
              </motion.div>
            )}
            
            {activeTab === 'Education' && (
              <motion.div
                key="Education"
                custom={direction}
                variants={tabContentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.motionContent}
                transition={{
                  x: { type: 'spring', stiffness: 200, damping: 20 },
                  opacity: { duration: 0.2 },
                }}
              >
                <Education isInView={isInView || false} />
              </motion.div>
            )}
            
            {activeTab === 'About' && (
              <motion.div
                key="About"
                custom={direction}
                variants={tabContentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.motionContent}
                transition={{
                  x: { type: 'spring', stiffness: 200, damping: 20 },
                  opacity: { duration: 0.2 },
                }}
              >
                <AboutMe isInView={isInView || false} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className={styles.pagination}>
          {tabs.map((_, i) => (
            <motion.div 
              key={i} 
              className={clsx(styles.paginationDot, { [styles.active]: i === currentTabIndex })}
              onClick={() => {
                setDirection(i > currentTabIndex ? 1 : -1);
                setActiveTab(tabs[i]);
              }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

export default About