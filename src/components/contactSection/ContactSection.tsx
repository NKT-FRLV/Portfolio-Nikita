import React, { useState, useRef, useCallback, useMemo } from 'react'
import AnimatedLetters from '../animatedLetters/AnimatedLetters'
import { useAnimatedLetters } from '../animatedLetters/hook'
import Section from '../section/Section'
import styles from './contactSection.module.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ClipLoader from 'react-spinners/ClipLoader';
import emailjs from '@emailjs/browser';
// import { motion } from 'framer-motion'

const ContactSection = () => {
    
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    const { letterClass, animationContainerRef } = useAnimatedLetters({
      threshold: 0.6,
      animationDuration: 1700,
    });
    const titleLetters = useMemo(() => '<Contact Me />'.split(''), []);

    const verifyEmail = useCallback(async (email: string) => {
      try {
        const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;
        if (!apiKey) {
          throw new Error('API Key is not defined. Please check your environment variables.');
        }
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
    }, []);

    const sendEmail = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      if (!form.current) {
        console.log('Form element not found');
        setLoading(false);
        return;
      }

      try {
        const email = form.current.email.value;
        const res = await verifyEmail(email);

        if (!res) {
          setLoading(false);
          const { toast } = await import('react-toastify');
          toast.error('Please enter a valid email address', {
            position: 'bottom-center',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          return;
        }

        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          form.current,
          { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
        );

        const { toast } = await import('react-toastify');
        toast.success('Message successfully sent!', {
          position: 'bottom-center',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        form.current.reset();
      } catch (error) {
        console.error('Ошибка отправки:', error);
        const { toast } = await import('react-toastify');
        toast.error('Failed to send email. Please try again.');
      } finally {
        setLoading(false);
      }
    }, [verifyEmail]);

    return (
      <Section style={{width: '60vw', justifyContent: 'start', alignItems: 'start'}}>
          <div className={styles.container} ref={animationContainerRef}>
              <h1 className={styles.heading}>
                  <AnimatedLetters
                    letterClass={letterClass}
                    strArray={titleLetters}
                    idx={1}
                  />
              </h1>
              <div className={styles.contentContainer}>
                <p className={styles.description}>
                    I'm open to new opportunities and collaborations! If you're looking
                    for someone who can bring fresh ideas and deliver impactful results,
                    let's get in touch!
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
                      className={styles.button}
                      disabled={loading}
                    >
                      {loading ? <ClipLoader color="#fff" size={20} /> : 'SEND'}
                    </button>
                    <ToastContainer />
                </form>
              </div>
            </div>
      </Section>
    )
}

export default ContactSection