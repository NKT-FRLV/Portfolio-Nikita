import { useState, useCallback } from 'react';
import { SectionContext } from './SectionContext';
import ReactFullpage, { fullpageApi, Item } from '@fullpage/react-fullpage';
import { motion } from 'framer-motion';
import CanvasScene from './threeJS/canvas/CanvasScene'
import Nav from './components/navBar/Nav';
import Home from './components/home/Home';
import About from './components/about/About';
import ContactSection from './components/contactSection/ContactSection';
import ProjectsPage from './components/projects-page/ProjectsPage';
import './App.css'

type FuncSectionChenger = ( _: Item, destination: Item ) => void
type SectionIndex = 0 | 1 | 2 | 3


function App() {
  const [hendleFullpage, setHendleFullpage] = useState<fullpageApi | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<SectionIndex>(0); // Индекс текущей секции
  const anchors = ['home', 'about', 'projects', 'contact']; // Якоря секций

  // Рассчитываем прогресс как процент
  const progress = currentSectionIndex / (anchors.length - 1);

  const handleSectionChange: FuncSectionChenger = useCallback(( _, destination ) => {
    setCurrentSectionIndex(destination.index as SectionIndex);
  }, []);
  
  const hendleMoveToSection = useCallback((section: string) => hendleFullpage?.moveTo(section), [hendleFullpage]);

  return (
    <>
      {/* через портал рендерится в threeJS div */}
      
      <div id="threejs">
        <SectionContext.Provider value={currentSectionIndex}>
          <CanvasScene />
        </SectionContext.Provider>
      </div>

      <Nav activeSection={currentSectionIndex} moveToSection={hendleMoveToSection} />

      <div className="portfolio">
        <ReactFullpage
          licenseKey={'YOUR_LICENSE_KEY'} 
          scrollingSpeed={1200}
          credits={{ enabled: false }}
          anchors={anchors}
          navigation={false}
          easing="easeInOutCubic"
          // Обновляем индекс текущей секции
          onLeave={handleSectionChange}
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
          animate={{ scaleX: progress }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </div>
    </>
  );
}

export default App;