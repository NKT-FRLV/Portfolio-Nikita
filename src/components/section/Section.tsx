import React from 'react'
import styles from './section.module.css'

interface SectionProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

const Section = ({children, style}: SectionProps) => {
  return (
    <section className={styles.section} style={{...style}}>
      {children}
    </section>
  )
}

export default Section