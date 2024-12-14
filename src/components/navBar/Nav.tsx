import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTelegram, FaInstagram, FaLink } from 'react-icons/fa';
import { IoHome, IoMail, IoPerson, IoBriefcase } from 'react-icons/io5';
import styles from './sidebar.module.css'
import { useWindowSize } from '../../hooks';

interface Props {
  activeSection: 0 | 1 | 2 | 3;
  moveToSection: (section: string) => void;
}

const Nav = ({activeSection, moveToSection}: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { width } = useWindowSize(); // Используем ширину экрана из хука

  useEffect(() => {
    setIsOpen(false);
  }, [width, activeSection]);

  // Определяем размер иконок в зависимости от ширины экрана
  const iconSize = width > 1050 ? 35 : width > 440 ? 30 : 25;
  const iconSotialSize = width > 1050 ? 25 : 20;
  const linksBlockWidth = width > 1050 ? 250 : width > 550 ? 220 : 180;

  return (
    
    <nav className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <a href="#" className={styles.logoLink}/>
      </div>
      <div className={styles.menu}>
        <a className={styles.link} href="#" onClick={() => moveToSection('home')}>
          <span className={styles.linkIcon}>
            <IoHome size={iconSize} color={activeSection === 0 ? '#00ff7f' : 'inherit'}/>
          </span>
          <span className={styles.linkText}>
            Home
          </span>
        </a>
        <a className={styles.link} href="#" onClick={() => moveToSection('about')}>
          <span className={styles.linkIcon}>
            <IoPerson size={iconSize} color={activeSection === 1 ? '#00ff7f' : 'inherit'} />
          </span>
          <span className={styles.linkText}>
            About
          </span>
        </a>
        <a className={styles.link} href="#" onClick={() => moveToSection('projects')}>
          <span className={styles.linkIcon}>
            <IoBriefcase size={iconSize} color={activeSection === 2 ? '#00ff7f' : 'inherit'}/>
          </span>
          <span className={styles.linkText}>
            Projects
          </span>
        </a>
        <a className={styles.link} href="#" onClick={() => moveToSection('contact')}>
          <span className={styles.linkIcon}>
            <IoMail size={iconSize} color={activeSection === 3 ? '#00ff7f' : 'inherit'}/>
          </span>
          <span className={styles.linkText}>
            Contact
          </span>
        </a>
      </div>
      <div className={styles.resume}>
        <a
          className={styles.resumeLink}
          href='documents/resume_Nikita_Frolov.pdf'
          download='Frolov Nikita Resume'
        >
          RESUME
        </a>
        <div className={styles.sotialsToolBar}>
          <div className={styles.sotialsBarToogler} onClick={() => setIsOpen(!isOpen)}>
            <FaLink size={iconSotialSize}/>
            Sotials
          </div>
          <motion.div
            className={styles.sotials}
            
            animate={{ opacity: isOpen ? 1 : 0.5, width: isOpen ? linksBlockWidth : 10, paddingLeft: isOpen ? 16 : 0, paddingRight: isOpen ? 16 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a href="https://web.telegram.org/k/#-955617383" target="_blank" style={{width: iconSize, height: iconSize}} animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3}}>
              <FaTelegram size={iconSize} />
            </motion.a>
            <motion.a href="https://www.instagram.com/nkt.frlv/" target="_blank" style={{width: iconSize, height: iconSize}} animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3}}>
              <FaInstagram size={iconSize} />
            </motion.a>
            <motion.a href="https://github.com/mi-viejo-amigo" target="_blank" style={{width: iconSize, height: iconSize}} animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3}}>
              <FaGithub size={iconSize} />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/nikita-frolov-22a008342/" target="_blank" style={{width: iconSize, height: iconSize}} animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }}>
              <FaLinkedin size={iconSize} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </nav>

  )
}

export default Nav