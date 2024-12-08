import React, { useState, useEffect } from 'react'
import { IoChevronForward , IoChevronBack , IoButt } from 'react-icons/io5';
import { motion, AnimatePresence} from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import AnimatedLetters from '../animatedLetters/AnimatedLetters'
import animateStyles from '../animatedLetters/animatedLetters.module.css'
import Section from '../section/Section'
import styles from './projects.module.css'
import { projects } from '../../data'


const ProjectsPage = () => {

    const [letterClass, setLetterClass] = useState('');
    const [activeProject, setActiveProject] = useState(0);
    const { ref: sectionRef, inView: isInView } = useInView({
        // triggerOnce: true,
        threshold: 0.6, // 100% элемента должны быть видимы
      });

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (isInView) {
            setLetterClass(animateStyles.textAnimate)
            timer = setTimeout(() => {
                setLetterClass(animateStyles.textAnimateHover)
            }, 1700)
        }

        return () => clearTimeout(timer)
    }, [isInView])

    const titleLetters = '<My Projects />'.split('');

    return (
        <Section style={{justifyContent: 'start', alignItems: 'start'}}>
            <div className={styles.container} ref={sectionRef}>
                <h2 className={styles.heading}>
                    <AnimatedLetters letterClass={letterClass} strArray={titleLetters} idx={1} />
                </h2>
                <div className={styles.list}>
                    <div className={styles.arrowButtonStart}>
                        <IoChevronBack style={{ width: '60px', height: '100px' }} onClick={() => setActiveProject(activeProject === 0 ? projects.length - 1 : activeProject - 1)} />
                    </div>
                    <div className={styles.arrowButtonEnd}>
                        <IoChevronForward style={{ width: '60px', height: '100px' }} onClick={() => setActiveProject(activeProject === projects.length - 1 ? 0 : activeProject + 1)} />
                    </div>
                    <AnimatePresence>
                        { projects.map((item, index) => 
                             activeProject === index ? (
                             <motion.div
                                className={styles.project}
                                key={item.title}
                                initial={{ opacity: 0, x: -200 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -200 }}
                            >
                                <div className={styles.projectImageContainer}>
                                    <img src={item.image} alt={item.title} className={styles.projectImage} />
                                </div>
                                <div className={styles.projectInfo}>
                                    <h3 className={styles.projectTitle}>{item.title}</h3>
                                    <p className={styles.projectDescription}>{item.description}</p>
                                    <ul className={styles.tecnologies}>
                                        {item.tecnologies.map((tag, index) => (
                                            <li key={index} className={styles.projectTag}>{tag}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.projectLinks}>
                                    <a target="_blank" href={item.urlGitHub}>GitHub</a>
                                    <a target="_blank" href={item.urlDemo}>Demo</a>
                                </div>
                            </motion.div> ) : null
                        )}
                    </AnimatePresence>
                </div>
                
                
            </div>
        </Section>
    )
}

export default ProjectsPage