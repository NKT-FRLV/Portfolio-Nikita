import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { skills, languages } from '../../data';
import { useWindowSize } from '../../hooks';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';
import styles from './skills.module.css';

interface SkillsProps {
  isInView: boolean;
}

const Skills = ({ isInView }: SkillsProps) => {
  const { width } = useWindowSize();
  const iconSizeSkills = width > 768 ? 45 : width > 470 ? 30 : 20;

  return (
    <div className={styles.tabContent}>
      <IconContext.Provider value={{ color: 'var(--color-button-text)' }}>
        <motion.h2 
          className={styles.textTitle}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.6 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Skills & Tools
        </motion.h2>
        <ul className={styles.skillsContainer}>
          {skills.map((skill) => (
            <Tooltip 
              key={skill.name} 
              title={skill.name} 
              arrow
              slots={{ transition: Zoom }}
              placement="top"
            >
              <motion.li 
                className={styles.skillCard} 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 20px rgba(0, 255, 127, 0.2)'
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 15 
                }}
              >
                <motion.div className={styles.iconContainer}>
                  <skill.icon size={iconSizeSkills} />
                </motion.div>
              </motion.li>
            </Tooltip>
          ))}
        </ul>
      </IconContext.Provider>
      
      <motion.h2
        className={styles.textTitle}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.6 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Languages
      </motion.h2>
      <ul className={styles.languagesContainer}>
        {languages.map((language) => (
          <Tooltip 
            title={language.name} 
            key={language.name} 
            arrow
            slots={{ transition: Zoom }}
            placement="top"
          >
            <motion.li
              className={`${styles.skillCard} ${styles.flag}`}
              whileHover={{ 
                scale: 1.05, 
                opacity: 1,
                boxShadow: '0 8px 20px rgba(0, 255, 127, 0.2)' 
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 15 
              }}
            >
              <motion.div className={styles.iconContainer}>
                {language.icon}
              </motion.div>
            </motion.li>
          </Tooltip>
        ))}
      </ul>
    </div>
  );
};

export default Skills; 