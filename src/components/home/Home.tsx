import { useEffect, useState } from 'react'
import AnimatedLetters from '../animatedLetters/AnimatedLetters'
import Section from '../section/Section'
import styles from './home.module.css'
import animeteStyles from '../animatedLetters/animatedLetters.module.css'

interface HomeProps {
  moveToSection: (section: string) => void
}

const Home = ({ moveToSection }: HomeProps) => {

const [letterClass, setLetterClass] = useState(animeteStyles.textAnimate)


  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass(animeteStyles.textAnimateHover)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

    const hi = ["H", "i", ","];
    const nameArray = ["I", "'", "m", " ", "<", "N", "i", "k", "i", "t", "a", ">"];
    const frontend = ["F", "r", "o", "n", "t", "e", "n", "d", " ", "D", "e", "v", "e", "l", "o", "p", "e", "r"];
    const fullText = [
        'R', 'e', 'a', 'c', 't', ' ',
        '|', ' ',
        'W', 'e', 'b', ' ',
        '|', ' ',
        'A', 'I', ' ', 'e', 'x', 'p', 'e', 'r', 't'
      ];

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
        </div>
        <button onClick={() => moveToSection('contact')}>CONTACT ME</button>
    </div>

    </Section>
  )
}

export default Home