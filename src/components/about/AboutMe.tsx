import { motion } from 'framer-motion';
import styles from './aboutMe.module.css';

interface AboutMeProps {
  isInView: boolean;
}

const AboutMe = ({ isInView }: AboutMeProps) => {
  return (
    <div className={styles.tabContent}>
      <motion.h2 
        className={styles.textTitle}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.6 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        About Me
      </motion.h2>
      <div className={styles.aboutTextWrapper}>
        <motion.p 
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <strong className={styles.accentText2}>I`m</strong> a passionate frontend developer from Russia with over a <strong className={styles.accentText}>year and a half of experience</strong> in web development. Prior to this, I was actively involved in snowboarding and trampoline acrobatics, which helped me develop persistence, focus, and a knack for learning new things.
        </motion.p>
        <motion.p 
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <strong className={styles.accentText}>My years of experience in the hospitality industry</strong> also shaped my skills in effective client interactions, teamwork, and problem-solving.
        </motion.p>
        <motion.p 
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <strong className={styles.accentText}>After relocating to Spain </strong>, I discovered a passion for learning the local language and culture, which eventually inspired me to dive deeper into web development.
        </motion.p>
        <motion.p 
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <strong className={styles.accentText}>Today</strong>, I specialize in frontend technologies, crafting functional, aesthetically pleasing interfaces and applications that deliver seamless user experiences.
        </motion.p>
        <motion.p 
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          If my skills and experience align with your company's goals, I would be delighted to discuss how I can contribute to your <strong className={styles.accentText2}>success</strong>.
        </motion.p>
      </div>
    </div>
  );
};

export default AboutMe; 