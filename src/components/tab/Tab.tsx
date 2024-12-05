import { motion } from 'framer-motion'
import clsx from 'clsx'
import styles from './tab.module.css'

// import '../../App.css'
interface TabProps {
    title: string
    isActive: boolean
    borderRadius?: string
    handleTabClick: () => void
}

const Tab = ({title, isActive, borderRadius, handleTabClick}: TabProps) => {

  return (
    <>
    <motion.div 
        className={clsx(styles.tab, {[styles.tabActive]: isActive})}
        onClick={handleTabClick}
        style={{borderRadius: borderRadius}}
        >
        <motion.p>{title}</motion.p>
        {isActive ? (
            <motion.div className={styles.underline} layoutId="underline" />
            ) : null
        }
    </motion.div>

    </>
  )
}

export default Tab