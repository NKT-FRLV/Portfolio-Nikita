import { motion } from 'framer-motion'
import styles from './tab.module.css'

import '../../App.css'
interface TabProps {
    title: string
    isActive: boolean
    handleTabClick: () => void
}

const Tab = ({title, isActive, handleTabClick}: TabProps) => {
  return (
    <motion.div 
      className={styles.tab}
      onClick={handleTabClick}
      animate={{
        color: isActive ? 'var(--color-button-text)' : '#aaa'
      }}
      whileHover={{
        color: 'var(--light-color-link-hover)',
        transition: {
          duration: 0.3,
          ease: 'easeInOut'
        }
      }}
    >
      <motion.p>
        {title}
      </motion.p>

      {isActive && (
        <motion.div 
          className={styles.underline} 
          layoutId="underline"
        />
      )}
    </motion.div>
  )
}

export default Tab