import React from 'react'

import { IoHome, IoMail, IoPerson, IoGitBranch } from 'react-icons/io5';
import styles from './sidebar.module.css'
import { useWindowSize } from '../../hooks';

interface Props {
  activeSection: 0 | 1 | 2 | 3;
  moveToSection: (section: string) => void;
}

const Nav = ({activeSection, moveToSection}: Props) => {

  const { width } = useWindowSize(); // Используем ширину экрана из хука

  // Определяем размер иконок в зависимости от ширины экрана
  const iconSize = width > 1050 ? 35 : width > 440 ? 30 : 25;

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
            <IoGitBranch size={iconSize} color={activeSection === 2 ? '#00ff7f' : 'inherit'}/>
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
      <div className={styles.links}>
        <a href="#">Resume</a>
      </div>
    </nav>

  )
}

export default Nav