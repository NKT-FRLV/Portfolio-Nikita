import React, { useState, useEffect, useRef } from 'react'
import AnimatedLetters from '../animatedLetters/AnimatedLetters'
import animateStyles from '../animatedLetters/animatedLetters.module.css'
import { useInView } from 'react-intersection-observer';
import Section from '../section/Section'
import styles from './contactSection.module.css'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ClipLoader from 'react-spinners/ClipLoader';
import emailjs from '@emailjs/browser';
// import { motion } from 'framer-motion'

const ContactSection = () => {
    // ???
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    const [letterClass, setLetterClass] = useState('');
    const titleLetters = '<Contact Me />'.split('');
    const { ref: sectionRef, inView: isInView } = useInView({
        // triggerOnce: true,
        threshold: 1, // 100% элемента должны быть видимы
      });

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (isInView) {
            setLetterClass(animateStyles.textAnimate)
            timer = setTimeout(() => {
                setLetterClass(animateStyles.textAnimateHover)
            }, 2500)
        }

        return () => clearTimeout(timer)
    }, [isInView])

  const sendEmail = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true)

    if (!form.current) {
      console.log('Form element not found');
      setLoading(false)
      return;
    }

    try {
      const email = form.current.email.value;
      const res = await verifyEmail(email);
    
      if (!res) {
        setLoading(false)
        toast.error('Please enter a valid email address', {
          position: 'bottom-center',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return
      }
    
      await emailjs.sendForm('service_5hz413j', 'template_lvw7vlq', form.current, {
        publicKey: 'jn2OjAJVVCDp5m0XJ',
      });

      toast.success('Message successfully sent!', {
        position: 'bottom-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      form.current.reset()
    } catch (error) {

      console.error('Ошибка отправки:', error);
      toast.error('Failed to send email. Please try again.');

    } finally {
      setLoading(false);
    }
    
    
  };

  const verifyEmail = async (email: string) => {
    try {
      const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;

      if (!apiKey) {
        throw new Error('API Key is not defined. Please check your environment variables.');
      }
      console.log('sending email', email);
      const response = await fetch(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      return data.is_valid_format.value && data.deliverability === 'DELIVERABLE';
    } catch (error) {
      console.error('Ошибка верификации email:', error);
      return false;
    }
  };

  return (
    <Section>
        <div className={styles.container} ref={sectionRef}>
            <h1 className={styles.heading}>
                <AnimatedLetters
                letterClass={letterClass}
                strArray={titleLetters}
                idx={15}
                />
            </h1>
            <div className={styles.contentContainer}>
              <p className={styles.description}>
                  I’m open to new opportunities and collaborations! If you’re looking
                  for someone who can bring fresh ideas and deliver impactful results,
                  let’s get in touch!
              </p>
              <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
                <div className={styles.halfs}>
                  <input className={styles.customCaret} placeholder="Name" type="text" name="name" required />
                  <input className={styles.customCaret} placeholder="Email" type="email" name="email" required />
                </div>
                  <input
                    className={styles.customCaret}
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                  <textarea
                    className={styles.customCaret}
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    // className={styles.flatButton}
                    disabled={loading}
                  >
                    {loading ? <ClipLoader color="#fff" size={20} /> : 'SEND'}
                  </button>
                  <ToastContainer
                  />
              </form>
            </div>
          </div>
    </Section>
  )
}

export default ContactSection