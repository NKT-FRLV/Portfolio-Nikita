import React, { useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { motion } from 'framer-motion';
import CanvasScene from './threeJS/canvas/CanvasScene'
import Nav from './components/navBar/Nav';
import Home from './components/home/Home';
import About from './components/about/About';
import ContactSection from './components/contactSection/ContactSection';
import ProjectsPage from './components/projects-page/ProjectsPage';
// const CanvasScene = lazy(() => import('./threeJS/canvas/CanvasScene'))
import './App.css'


function App() {
  const [hendleFullpage, setHendleFullpage] = useState<any>(); // Сохраняем API fullpage
  const [currentSectionIndex, setCurrentSectionIndex] = useState<0 | 1 | 2 | 3>(0); // Индекс текущей секции
  const anchors = ['home', 'about', 'projects', 'contact']; // Якоря секций

  // Рассчитываем прогресс как процент
  const progress = (currentSectionIndex / (anchors.length - 1)) * 100;

  return (
    <>
      {/* через портал рендерится в threeJS div */}
      <CanvasScene 
        progress={currentSectionIndex}
      />

      <Nav activeSection={currentSectionIndex} moveToSection={(section) => hendleFullpage?.moveTo(section)} />

      <div className="portfolio">
        <ReactFullpage
          licenseKey={'YOUR_LICENSE_KEY'} 
          scrollingSpeed={1000}
          credits={{ enabled: false }}
          anchors={anchors}
          navigation={true}
          // Обновляем индекс текущей секции
          onLeave={(_, destination) => {
            setCurrentSectionIndex(destination.index as 0 | 1 | 2 | 3);
          }}
          render={({ fullpageApi }) => {
            if (!hendleFullpage) setHendleFullpage(fullpageApi);
            return (
              <ReactFullpage.Wrapper>
                <div className="section">
                  <Home moveToSection={(section) => hendleFullpage?.moveTo(section)} />
                </div>
                <div className="section">
                  <About />
                </div>
                <div className="section">
                  <ProjectsPage />
                </div>
                <div className="section">
                  <ContactSection />
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
        {/* Прогресс-бар */}
        <motion.div
          className="progress"
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </div>
    </>
  );
}

export default App;