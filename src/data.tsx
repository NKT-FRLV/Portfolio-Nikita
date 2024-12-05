import { FaUniversity, FaGraduationCap, FaSwimmer } from 'react-icons/fa';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGithub, FaGit } from 'react-icons/fa';
import { SiTypescript, SiThreedotjs, SiRedux, SiSolid, SiOpenai, SiVite, SiWebpack, SiWebstorm } from 'react-icons/si';
import { IoSparkles } from 'react-icons/io5';
import Flags from 'react-world-flags';



export const skills: { name: string; percent: number; icon: JSX.Element }[] = [
  { name: 'HTML', percent: 95, icon: <FaHtml5 /> },
  { name: 'CSS', percent: 90, icon: <FaCss3Alt /> },
  { name: 'JavaScript', percent: 95, icon: <FaJsSquare /> },
  { name: 'TypeScript', percent: 85, icon: <SiTypescript /> },
  { name: 'Node.js', percent: 80, icon: <FaNodeJs /> },
  { name: 'React', percent: 90, icon: <FaReact /> },
  { name: 'Redux Toolkit', percent: 80, icon: <SiRedux /> },
  { name: 'Git', percent: 90, icon: <FaGit /> },
  { name: 'GitHub', percent: 90, icon: <FaGithub /> },
  { name: 'Three.js', percent: 70, icon: <SiThreedotjs /> },
  { name: 'AI Integration', percent: 75, icon: <SiOpenai /> },
  { name: 'Webpack', percent: 80, icon: <SiWebpack /> },
  { name: 'Vite', percent: 90, icon: <SiVite /> },
  { name: 'Webstorm Code redactor', percent: 90, icon: <SiWebstorm  /> },
  { name: 'SOLID Principles', percent: 85, icon: <SiSolid /> },
  { name: 'Clean Code', percent: 90, icon: <IoSparkles /> },
];

export const languages: { name: string; percent: number; icon: JSX.Element }[] = [
  { name: 'Russian', percent: 95, icon: <Flags code="RU" style={{ width: '100%'}}/> },
  { name: 'English', percent: 90, icon: <Flags code="GB" style={{ height: '100%'}} /> },
  { name: 'Spanish', percent: 70, icon: <Flags code="ES" style={{ width: '100%'}} /> }
];

export const myEducation = [
  { 
    title: 'Yandex.Praktikum', 
    profesion: 'Frontend-developer', 
    date: '1.10.2023 - 24.11.2024',
    content: 'A comprehensive professional retraining program focused on mastering modern front-end technologies, including React, JavaScript, and web development best practices.',
    info: 'Yandex.Praktikum is an educational platform created by Yandex, one of the leading tech companies in Europe and Russia. The platform offers deep, practical training programs in software development, data analysis, and design. The Frontend Developer program provides intensive hands-on experience in JavaScript, React, and web development, preparing students for real-world projects and careers in IT.',
    logo: <FaUniversity size={30} />
  },
  { 
    title: 'RSUTS-University', 
    profesion: 'Hospitality Management', 
    date: '2018 - 2022', 
    content: 'Studied hospitality management and specialized in the hotel industry.',
    info: 'The Russian State University of Tourism and Service (RSUTS) is a leading institution in Russia focused on training professionals in the tourism and hospitality industries. Founded in 1952, the university offers programs in hospitality management, service design, and business administration. RSUTS is renowned for its strong partnerships with global hotel chains and travel agencies, providing students with excellent opportunities for internships and career development.',
    logo: <FaGraduationCap size={30} />
  },
  { 
    title: 'PADI Diving School', 
    profesion: 'Open Water Diver', 
    date: '2007', 
    content: 'Diving school in Sharm El-Sheikh. Earned the PADI Pro certification and gained the ability to dive up to 40 meters deep.',
    info: 'The PADI Diving School in Sharm El-Sheikh is a globally recognized training center',
    logo: <FaSwimmer size={30} />
  }
];