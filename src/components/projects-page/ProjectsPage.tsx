import { useState } from 'react'
import { useAnimatedLetters } from '../animatedLetters/hook'
import { IoChevronForward , IoChevronBack } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from "popmotion";
import AnimatedLetters from '../animatedLetters/AnimatedLetters'
import Section from '../section/Section'
import styles from './projects.module.css'
import { projects } from '../../data'
import { useWindowSize } from '../../hooks';
import clsx from 'clsx';

const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400, // Смещение для захода карточки
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0, // Центрирование карточки
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400, // Смещение для выхода карточки
      opacity: 0,
    }),
  };


const ProjectsPage = () => {

    const { letterClass, animationContainerRef } = useAnimatedLetters({
        threshold: 0.6,
        animationDuration: 1700,
      });

    // Определяем размер иконок в зависимости от ширины экрана.
    const { width } = useWindowSize();
    const arrowWidth = width > 768 ? 60 : 35;
    const arrowHeight = width > 768 ? 100 : 55;

    // Управление пагинацией карточек.
    const [[page, direction], setPage] = useState([0, 0]);
    const projectIndex = wrap(0, projects.length, page);
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };


    const titleLetters = '<My Projects />'.split('');

    return (
        <Section style={{justifyContent: 'start', alignItems: 'start'}}>
            <div className={styles.container} ref={animationContainerRef}>
                <h2 className={styles.heading}>
                    <AnimatedLetters letterClass={letterClass} strArray={titleLetters} idx={1} />
                </h2>
                <div className={clsx(styles.arrow, styles.arrowStart)}>
                    <IoChevronBack style={{ width: arrowWidth, height: arrowHeight }} onClick={() => paginate(-1)} />
                </div>
                <div className={clsx(styles.arrow, styles.arrowEnd)}>
                    <IoChevronForward style={{ width: arrowWidth, height: arrowHeight }} onClick={() => paginate(1)} />
                </div>
                <motion.div className={styles.list}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            className={styles.project}
                            key={projectIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: 'spring', stiffness: 200, damping: 20 },
                                opacity: { duration: 0.2 },
                            }}
                        >
                            <div className={styles.projectImageContainer}>
                                <img
                                src={projects[projectIndex].image}
                                alt={projects[projectIndex].title}
                                className={styles.projectImage}
                                />
                            </div>
                            <div className={styles.projectInfo}>
                                <h3 className={styles.projectTitle}>{projects[projectIndex].title}</h3>
                                <p className={styles.projectDescription}>{projects[projectIndex].description}</p>
                                <ul className={styles.tecnologies}>
                                {projects[projectIndex].tecnologies.map((tag, idx) => (
                                    <li key={idx} className={styles.projectTag}>
                                    {tag}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div className={styles.projectLinks}>
                                <a target="_blank" href={projects[projectIndex].urlGitHub}>
                                GitHub
                                </a>
                                <a target="_blank" href={projects[projectIndex].urlDemo}>
                                Demo
                                </a>
                            </div>
                    </motion.div>
                </AnimatePresence>
                </motion.div>
                
                
            </div>
        </Section>
    )
}

export default ProjectsPage