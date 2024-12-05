import React from 'react'
import styles from './sidebar.module.css'

interface Props {
  moveToSection: (section: string) => void;
}

const Nav = ({moveToSection}: Props) => {

  // const { homeSectionRef, aboutSectionRef, projectsSectionRef, contactSectionRef } = sections

  return (
    
    <nav className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <a href="#" className={styles.logoLink}/>
      </div>
      <div className={styles.menu}>
        <a href="#" onClick={() => moveToSection('home')}>Home</a>
        <a href="#" onClick={() => moveToSection('about')}>About</a>
        <a href="#" onClick={() => moveToSection('projects')}>Projects</a>
        <a href="#" onClick={() => moveToSection('contact')}>Contact</a>
      </div>
      <div className={styles.links}>
        <a href="#">Resume</a>
      </div>
    </nav>

  )
}

export default Nav