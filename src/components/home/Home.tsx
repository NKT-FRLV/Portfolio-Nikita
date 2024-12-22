import { useState } from 'react'
import AnimatedLetters from '../animatedLetters/AnimatedLetters'
import Section from '../section/Section'
import styles from './home.module.css'
import Modal from '../modal/Modal';
import image from '../../assets/nikita_color.jpg';
import { useAnimatedLetters } from '../animatedLetters/hook'

interface HomeProps {
  moveToSection: (section: string) => void
}

const Home = ({ moveToSection }: HomeProps) => {

  const [open, setOpen] = useState<boolean>(false)
  // Custom hook
  const { letterClass } = useAnimatedLetters({
    triggerOnLoad: true,
    animationDuration: 2500,
  });

  const openModal = () => {
    setOpen(!open);
  };


  const hi = "Hi,".split('');
  const nameArray = "I'm <Nikita>".split('');
  const frontend = "Frontend Developer".split('');
  const fullText = "React | Web | UI Design".split('');

  return (
    <Section>
    <div className={styles.container}>
        <div className={styles.heading}>
            <h1>
                <AnimatedLetters letterClass={letterClass} strArray={hi} idx={1} />
                <br/>
                <span className={styles.heroName}>
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={1} />
                </span>
                <br/>
                <AnimatedLetters letterClass={letterClass} strArray={frontend} idx={1} />
                <br/>
                <AnimatedLetters letterClass={letterClass} strArray={fullText} idx={1} />
            </h1>
            <p>
                <strong className={styles.accent}>Turning</strong> ideas into reality with <strong className={styles.accent}>code</strong>.
                <br/>
                Exploring the frontiers of <strong className={styles.accent}>Web</strong> and <strong className={styles.accent}>AI</strong> to create a smarter, better web.
            </p>
            <div className={styles.hereIAm} onClick={openModal}>
              here I'am
            </div>
            <Modal isOpen={open} closeModal={openModal}> 
                <img src={image} alt="autor foto" className={styles.modalImage} />
            </Modal>
        </div>
        <button onClick={() => moveToSection('contact')}>CONTACT ME</button>
    </div>

    </Section>
  )
}

export default Home