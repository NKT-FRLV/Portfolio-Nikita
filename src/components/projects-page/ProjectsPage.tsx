import { useState } from 'react'
import { IoChevronForward , IoChevronBack } from 'react-icons/io5';
import { FaGithub } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from "popmotion";
import Section from '../section/Section'
import styles from './projects.module.css'
import { projects } from '../../data'
import { useWindowSize } from '../../hooks';
import clsx from 'clsx';
import { Tooltip, Zoom } from '@mui/material';

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

    // Определяем размер иконок в зависимости от ширины экрана.
    const { width } = useWindowSize();
    const arrowWidth = width > 768 ? 60 : width > 635 ? 45 : width > 550 ? 35 : 25;
    const arrowHeight = width > 768 ? 100 : width > 635 ? 75 : width > 550 ? 55 : 40;
    const iconSize = width > 768 ? 18 : width > 550 ? 17 : 16;

    // Управление пагинацией карточек.
    const [[page, direction], setPage] = useState([0, 0]);
    const projectIndex = wrap(0, projects.length, page);
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };



    return (
        <Section style={{ width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <div className={styles.container}>
                <h2 className={styles.heading}>
                    {"<My Projects />"}
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
                                <Tooltip
                                    title={projects[projectIndex].description}
                                    arrow
                                    placement="right"
                                    slots={{
                                        transition: Zoom,
                                      }}
                                >
                                    <p className={styles.projectDescription}>{projects[projectIndex].description}</p>
                                </Tooltip>
                                <ul className={styles.tecnologies}>
                                {projects[projectIndex].tecnologies.map((tag, idx) => (
                                    <li key={idx} className={styles.projectTag}>
                                    {tag}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div className={styles.projectFooter}>
                                <div className={styles.projectCounter}>
                                    {projectIndex + 1} / {projects.length}
                                </div>
                                <div className={styles.projectLinks}>
                                    <a target="_blank" href={projects[projectIndex].urlGitHub} className={styles.projectLink}>
                                        <FaGithub size={iconSize} />
                                        <span>GitHub</span>
                                    </a>
                                    <a target="_blank" href={projects[projectIndex].urlDemo} className={styles.projectLink}>
                                        <BiLinkExternal size={iconSize} />
                                        <span>Demo</span>
                                    </a>
                                </div>
                            </div>
                    </motion.div>
                </AnimatePresence>
                </motion.div>
                
                <div className={styles.pagination}>
                    {projects.map((_, i) => (
                        <div 
                            key={i} 
                            className={clsx(styles.paginationDot, { [styles.active]: i === projectIndex })}
                            onClick={() => setPage([i, i > projectIndex ? 1 : -1])}
                        />
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default ProjectsPage