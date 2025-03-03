import { useState, useCallback, useRef, lazy, Suspense } from 'react';
import { SectionContext } from './SectionContext';
import ReactFullpage, { fullpageApi, Item } from '@fullpage/react-fullpage';
import { motion } from 'framer-motion';
import Nav from './components/navBar/Nav';
import Home from './components/home/Home';
import About from './components/about/About';
import ContactSection from './components/contactSection/ContactSection';
import ProjectsPage from './components/projects-page/ProjectsPage';
// import CanvasScene from './threeJS/canvas/CanvasScene';
import './App.css';


type FuncSectionChenger = ( _: Item, destination: Item ) => void
type SectionIndex = 0 | 1 | 2 | 3


function App() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState<SectionIndex>(0); // Индекс текущей секции
  const [showCanvas, setShowCanvas] = useState<boolean>(false);
  const [allowDisplay, setAllowDisplay] = useState<boolean>(false);
  const threeRef = useRef<HTMLDivElement>(null);
  // Состояние для отслеживания загрузки компонента
  // CanvasComponent изначально null, чтобы не загружать канвас при загрузке страницы
  const [CanvasComponent, setCanvasComponent] = useState<React.LazyExoticComponent<React.ComponentType<object>> | null>(null);

  const anchors = ['home', 'about', 'projects', 'contact']; // Якоря секций

  const fullpageApiRef = useRef<fullpageApi | null>(null);

  const setFullpageApi = (api: fullpageApi) => {
    if (!fullpageApiRef.current) {
      fullpageApiRef.current = api;
    }
  };

  const toggleTheme = useCallback(() => {
    if (!showCanvas) {
      setAllowDisplay(true); // Включаем `display: block` сразу при включении
      setShowCanvas(true);
      // Если компонент еще не загружен, загружаем его только при первом включении Switch
      if (!CanvasComponent) {
        const CanvasScene = lazy(() => import('./threeJS/canvas/CanvasScene'));
        setCanvasComponent(CanvasScene);
      }
    } else {
      setShowCanvas(false);
      setTimeout(() => setAllowDisplay(false), 600); // Убираем `display: none` после анимации
    }
  }, [showCanvas, CanvasComponent]);

  // Рассчитываем прогресс как процент
  const progress = currentSectionIndex / (anchors.length - 1);

  const handleSectionChange: FuncSectionChenger = useCallback(( _, destination ) => {
    setCurrentSectionIndex(destination.index as SectionIndex);
  }, []);
  
  const handleMoveToSection = useCallback((section: string) => fullpageApiRef.current?.moveTo(section), [fullpageApiRef]);
  
  return (
    <>
      {/* Градиентный фон */}
      <div className="gradient-background">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Canvas, который можно включить по желанию */}
      <motion.div
        id="threejs"
        ref={threeRef}
        initial={{ opacity: 0 }}
        animate={showCanvas ? { opacity: 1} : { opacity: 0}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          display: allowDisplay ? "block" : "none", // Не размонтируем, а скрываем
          pointerEvents: allowDisplay ? "auto" : "none",
        }}
      >
        <SectionContext.Provider value={currentSectionIndex}>
          {showCanvas && CanvasComponent && (
            <Suspense fallback={null}>
              <CanvasComponent />
            </Suspense>
          )}
        </SectionContext.Provider>
      </motion.div>

      <Nav
        activeSection={currentSectionIndex}
        moveToSection={handleMoveToSection}
        toggleTheme={toggleTheme}
        themeState={showCanvas}
      />

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
          render={({ fullpageApi: api }) => {
              setFullpageApi(api);
            return (
                <ReactFullpage.Wrapper>
                    <div className="section">
                      <Home moveToSection={handleMoveToSection} />
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
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </div>
    </>
  );
}

export default App;