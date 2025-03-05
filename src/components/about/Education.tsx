import { motion } from 'framer-motion';
import { myEducation } from '../../data';
import { useWindowSize } from '../../hooks';
import { FaFileDownload } from 'react-icons/fa';
import styles from './education.module.css';

interface EducationProps {
  isInView: boolean;
}

const Education = ({ isInView }: EducationProps) => {
  const { width } = useWindowSize();
  const iconSizeEducation = width > 768 ? 25 : 15;
  const iconDownloadSize = width > 768 ? 25 : 15;

  return (
    <div className={styles.tabContent}>
      <motion.h2 
        className={styles.textTitle}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.6 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        My Education
      </motion.h2>
      <ul className={styles.educationList}>
        {myEducation.map((item) => (
            <motion.li 
            key={item.info} 
              className={styles.educationCard}
            >
              <div className={styles.educationHeading}>
                <div className={styles.educationTitleWrapper}>
                  {item.logo && (
                    <div className={styles.educationLogo}>
                      <item.logo size={iconSizeEducation} />
                    </div>
                  )}
                  <h3 className={styles.educationTitle}>
                    {item.title}
                  </h3>
                </div>
                <p className={styles.educationDate}>{item.date}</p>
              </div>
              <p className={styles.educationProfession}>{item.profesion}</p>
              <div className={styles.educationBottomContent}>
                <p className={styles.educationContent}>{item.content}</p>
                <motion.a
                  className={styles.educationDownload}
                  href={item.documentationPath}
                  download={item.documentName}
                  whileHover={{ 
                    scale: 1.1, 
                    color: 'var(--color-button-text)' 
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 15 
                  }}
                >
                  <FaFileDownload size={iconDownloadSize} />
                </motion.a>
              </div>
            </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Education; 