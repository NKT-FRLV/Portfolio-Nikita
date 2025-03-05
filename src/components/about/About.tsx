import { useState } from "react";
import Section from "../section/Section";
import Tab from "../tab/Tab";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "../../hooks";
import styles from "./about.module.css";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import clsx from "clsx";

import Skills from "./Skills";
import Education from "./Education";
import AboutMe from "./AboutMe";

// Варианты анимации для контента табов
const tabContentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
};

const About = () => {
  
  const { ref, inView } = useInView({
    threshold: 0.6,
  });

  const tabs = ["Skills", "Education", "About"] as const;
  type TabType = typeof tabs[number];

  const [activeTab, setActiveTab] = useState<TabType>("Skills");
  const [direction, setDirection] = useState(0);

  const currentTabIndex = tabs.indexOf(activeTab);

  const handleTabClick = (tab: TabType) => {
    const newIndex = tabs.indexOf(tab);
    if (newIndex === currentTabIndex) return; // избегаем лишних ререндеров
    setDirection(newIndex > currentTabIndex ? 1 : -1);
    setActiveTab(tab);
  };

  const paginate = (newDirection: number) => {
    const newIndex = (currentTabIndex + newDirection + tabs.length) % tabs.length;
    setDirection(newDirection);
    setActiveTab(tabs[newIndex]);
  };

  const { width } = useWindowSize();
  const isArrowPresence = width > 768;
  const isTitlePresence = width <= 550;

  return (
    <Section style={{ justifyContent: "start", alignItems: "start", width: "100%" }}>
      <div className={styles.container}>
        {isTitlePresence && (
          <h2 className={styles.heading}>
            {"<About Me />"}
          </h2>
        )}

        <div className={styles.tabsWrapper}>
          <LayoutGroup id="tabs">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                title={tab === "About" ? "About Me" : tab}
                isActive={activeTab === tab}
                handleTabClick={() => handleTabClick(tab)}
              />
            ))}
          </LayoutGroup>
        </div>

        {isArrowPresence && (
          <>
            <div className={clsx(styles.arrow, styles.arrowStart)} onClick={() => paginate(-1)}>
              <IoChevronBack style={{ width: 40, height: 80 }} />
            </div>

            <div className={clsx(styles.arrow, styles.arrowEnd)} onClick={() => paginate(1)}>
              <IoChevronForward style={{ width: 40, height: 80 }} />
            </div>
          </>
        )}

        <div className={styles.contentContainer} ref={ref}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={tabContentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 250, damping: 25 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className={styles.motionContent}
            >
              {activeTab === "Skills" && <Skills isInView={inView || false} />}
              {activeTab === "Education" && <Education isInView={inView || false} />}
              {activeTab === "About" && <AboutMe isInView={inView || false} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.pagination}>
          {tabs.map((_, i) => (
            <motion.div
              key={i}
              className={clsx(styles.paginationDot, { [styles.active]: i === currentTabIndex })}
              onClick={() => handleTabClick(tabs[i])}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;
