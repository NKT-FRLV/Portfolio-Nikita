import { useEffect, useState, useRef } from 'react'
import { useAnimatedLetters } from '../animatedLetters/hook'
import Section from '../section/Section'
import Tab from '../tab/Tab'
import AnimatedLetters from '../animatedLetters/AnimatedLetters'
import { skills, languages, myEducation } from '../../data';
import { IconContext } from 'react-icons';
import { useWindowSize } from '../../hooks';
import styles from './about.module.css';
import { motion, AnimatePresence} from 'framer-motion'
import { FaFileDownload } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip'; // Импорт тултипа
import clsx from 'clsx';



const About = () => {

    const { letterClass, animationContainerRef, isInView } = useAnimatedLetters({
      threshold: 0.6,
      animationDuration: 1700,
    });

    const [activeTab, setActiveTab] = useState<'About' | 'Skills' | 'Education'>('Skills');
    const [ userInteracted, setUserInteracted ] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ссылка на интервал

    useEffect(() => {
      if (!isInView || userInteracted || intervalRef.current) return;
  
      const tabs: Array<'About' | 'Skills' | 'Education'> = ['Skills', 'Education', 'About'];
      let currentTabIndex = tabs.indexOf(activeTab);
  
      intervalRef.current = setInterval(() => {
        currentTabIndex = (currentTabIndex + 1) % tabs.length;
        setActiveTab(tabs[currentTabIndex]);
      }, 2500);
  
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        } // Очистка интервала при размонтировании или изменении условий
      };
    }, [isInView, activeTab, userInteracted]);
  
    const handleTabClick = (tab: 'About' | 'Skills' | 'Education') => {
      setActiveTab(tab); // Меняем активный таб на выбранный
      if (intervalRef.current) {
        setUserInteracted(true);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const { width } = useWindowSize(); // Используем ширину экрана из хука

    // Определяем размер иконок в зависимости от ширины экрана
    const iconSizeSkills = width > 768 ? 45 : width > 470 ? 30 : 20;
    const iconSizeEducation = width > 768 ? 25 : width > 470 ? 15 : 10;
    const iconDownloadSize = width > 768 ? 25 : width > 470 ? 15 : 10;

    const titleLetters = '<About My Skills />'.split('');

  return (
    <Section style={{justifyContent: 'start', alignItems: 'start'}}>
        <div className={styles.container} ref={animationContainerRef}>
          <h2 className={styles.heading}>
              <AnimatedLetters letterClass={letterClass} strArray={titleLetters} idx={1} />
          </h2>
          <div className={styles.tabsWrapper}>
            <Tab title="Skills" isActive={activeTab === 'Skills'} handleTabClick={() => handleTabClick('Skills')} borderRadius="10px 0 0 10px" />
            <Tab title="Education" isActive={activeTab === 'Education'} handleTabClick={() => handleTabClick('Education')} borderRadius="0 0 0 0" />
            <Tab title="About Me" isActive={activeTab === 'About'} handleTabClick={() => handleTabClick('About')} borderRadius="0 10px 10px 0" />
          </div>
          
          <AnimatePresence mode="wait">
          {/* Блок информации о навыках */}
          { activeTab === 'Skills' && (
                    <motion.div 
                    key="Skills"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3}}
                    layout
                    >
                      <IconContext.Provider value={{ color: 'rgb(200, 137, 230)'}}>
                        <motion.h2 
                          className={styles.textTitle}
                          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.6 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          Skills & Tecnologies
                        </motion.h2>
                        <ul className={styles.skillsContainer}>
                            {skills.map((skill) => (
                                <Tooltip key={skill.name} title={skill.name} arrow>
                                <motion.li className={styles.scillCard} whileHover={{ scale: 1.1 }}>
                                  <skill.icon size={iconSizeSkills} />
                                </motion.li>
                              </Tooltip>
                            ))}
                        </ul>
                      </IconContext.Provider>
                        <motion.h2
                          className={styles.groupTitle}
                          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.6 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          Languages
                        </motion.h2>
                        <ul className={styles.languagesContainer}>
                            {languages.map((language) => (
                              <Tooltip title={language.name} key={language.name} arrow>
                                <motion.li
                                  className={clsx(styles.scillCard, styles.flag)}
                                  whileHover={{ scale: 1.1, opacity: 1 }}
                                >
                                  {language.icon}
                                </motion.li>
                              </Tooltip>
                            ))}
                        </ul>
                    </motion.div>
          )}
          {/* Блок информации о себе в тексте */}
          { activeTab === 'Education' && (
                  <motion.div
                    key="Education"
                    className={styles.textWrapper}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3}}
                    layout
                  >
                    <motion.h2 
                          className={styles.textTitle}
                          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.6 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          My Education
                    </motion.h2>
                      <ul className={styles.educetionList}>
                      { myEducation.map((item) => (
                        <Tooltip title={item.info} key={item.info} placement="right" arrow >
                          <li className={styles.educetionCard}>
                            <div className={styles.educetionHeading}>
                              <div className={styles.educetionTitleWrapper}>
                                { item.logo && <div className={styles.educationLogo}>
                                      <item.logo size={iconSizeEducation} />
                                </div>}
                                <h3 className={styles.educetionTitle}>
                                  {item.title}
                                </h3>
                              </div>
                              <p className={styles.educetionDate}>{item.date}</p>
                            </div>
                            <p className={styles.educetionProfesion}>{item.profesion}</p>
                            <div className={styles.educetionBottomContent}>
                              <p className={styles.educetionContent}>{item.content}</p>
                              <a
                                className={styles.educationDownload}
                                href={item.documentationPath}
                                download={item.documentName}
                              >
                                <FaFileDownload size={iconDownloadSize} />
                              </a>
                            </div>
                          </li>
                        </Tooltip>
                      ))}
                      </ul>
                    </motion.div>
          )}
                   {/* Блок информации о себе в тексте */}
                   { activeTab === 'About' && (
                  <motion.div
                    key="About"
                    className={styles.textWrapper}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3}}
                    layout
                  >
                    <motion.h2 
                          className={styles.textTitle}
                          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.6 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          About Me
                    </motion.h2>
                      <div className={styles.aboutTextWrapper}>
                      <p className={styles.text}>
                        <strong className={styles.accentText2}>I`m</strong> a passionate frontend developer from Russia with over a <strong className={styles.accentText}>year and a half of experience</strong> in web development. Prior to this, I was actively involved in snowboarding and trampoline acrobatics, which helped me develop persistence, focus, and a knack for learning new things.
                      </p>
                      <p className={styles.text}>
                        <strong className={styles.accentText}>My years of experience in the hospitality industry</strong> also shaped my skills in effective client interactions, teamwork, and problem-solving.
                      </p>
                      <p className={styles.text}>
                        <strong className={styles.accentText}>After relocating to Spain </strong>, I discovered a passion for learning the local language and culture, which eventually inspired me to dive deeper into web development.
                      </p>
                      <p className={styles.text}>
                        <strong className={styles.accentText}>Today</strong>, I specialize in frontend technologies, crafting functional, aesthetically pleasing interfaces and applications that deliver seamless user experiences.
                      </p>
                      <p className={styles.text}>
                      If my skills and experience align with your company's goals, I would be delighted to discuss how I can contribute to your <strong className={styles.accentText2} style={{fontSize: '1.2rem', fontWeight: 'bold'}}>success</strong>.
                      </p>
                      </div>
                    </motion.div>
          )}
          </AnimatePresence>
      </div>
    </Section>
  )
}

export default About