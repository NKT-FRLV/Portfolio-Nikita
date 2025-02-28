import { FaUniversity, FaGraduationCap, FaSwimmer } from 'react-icons/fa';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGithub, FaGit, FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa';
import { SiTypescript, SiThreedotjs, SiRedux, SiOpenai, SiVite, SiWebpack, SiJest, SiCypress } from 'react-icons/si';
import { IoSparkles } from 'react-icons/io5';
import Flags from 'react-world-flags';
import mestoImage from './assets/mesto.png'
import stellarBurgersImage from './assets/stellar-burgers.png'
import closingTagImage from './assets/closing-tag-screen.png'
import blogCustomizerImage from './assets/blog-customizer.png'
import ticTacToeImage from './assets/gameAI.png'
import GHUserAnalyzerImage from './assets/GH-User-Analyzer.png'

const gitHubRepoUrl = 'https://github.com/NKT-FRLV';


export const skills: { name: string; percent: number; icon: React.ElementType }[] = [
  { name: 'HTML', percent: 95, icon: FaHtml5 },
  { name: 'CSS', percent: 90, icon: FaCss3Alt },
  { name: 'JavaScript', percent: 95, icon: FaJsSquare },
  { name: 'TypeScript', percent: 85, icon: SiTypescript },
  { name: 'Node.js', percent: 80, icon: FaNodeJs },
  { name: 'React', percent: 90, icon: FaReact },
  { name: 'Redux Toolkit', percent: 80, icon: SiRedux },
  { name: 'Git', percent: 90, icon: FaGit },
  { name: 'GitHub', percent: 90, icon: FaGithub },
  { name: 'Three.js', percent: 70, icon: SiThreedotjs },
  { name: 'AI Integration', percent: 75, icon: SiOpenai },
  { name: 'Webpack', percent: 80, icon: SiWebpack },
  { name: 'Vite', percent: 90, icon: SiVite },
  { name: 'Unit & integration testing framework', percent: 85, icon: SiJest },
  { name: 'E2E testing framework', percent: 90, icon: SiCypress },
  { name: 'Clean Code', percent: 90, icon: IoSparkles },
];

export const languages: { name: string; percent: number; icon: JSX.Element }[] = [
  { name: 'Russian', percent: 95, icon: <Flags code="RU" style={{ width: '100%'}}/> },
  { name: 'English', percent: 90, icon: <Flags code="GB" style={{ height: '100%'}} /> },
  { name: 'Spanish', percent: 70, icon: <Flags code="ES" style={{ width: '100%'}} /> }
];

export const myEducation: {
  title: string;
  profesion: string;
  date: string;
  content: string;
  info: string;
  logo: React.ElementType; // Указываем, что logo — React-компонент
  documentationPath: string;
  documentName: string
}[] = [
  { 
    title: 'Yandex.Praktikum', 
    profesion: 'Frontend-developer', 
    date: '1.10.2023 - 24.11.2024',
    content: 'A comprehensive professional retraining program focused on mastering modern front-end technologies, including React, JavaScript, and web development best practices.',
    info: 'Yandex.Praktikum is an educational platform created by Yandex, one of the leading tech companies in Europe and Russia. The platform offers deep, practical training programs in software development, data analysis, and design. The Frontend Developer program provides intensive hands-on experience in JavaScript, React, and web development, preparing students for real-world projects and careers in IT.',
    logo: FaUniversity,
    documentationPath: 'documents/Practikum-certificate.pdf',
    documentName: 'Nikita_Yandex-Praktikum_Education'
  },
  { 
    title: 'RSUTS-University', 
    profesion: 'Hospitality Management', 
    date: '2018 - 2022', 
    content: 'Studied hospitality management and specialized in the hotel industry.',
    info: 'The Russian State University of Tourism and Service (RSUTS) is a leading institution in Russia focused on training professionals in the tourism and hospitality industries. Founded in 1952, the university offers programs in hospitality management, service design, and business administration. RSUTS is renowned for its strong partnerships with global hotel chains and travel agencies, providing students with excellent opportunities for internships and career development.',
    logo: FaGraduationCap,
    documentationPath: 'documents/Education-University.pdf',
    documentName: 'Nikita_University_Education'
  },
  { 
    title: 'PADI Diving School', 
    profesion: 'Open Water Diver', 
    date: '2007', 
    content: 'Diving school in Sharm El-Sheikh. Earned the PADI Pro certification and gained the ability to dive up to 40 meters deep.',
    info: 'The PADI Diving School in Sharm El-Sheikh is a globally recognized training center',
    logo: FaSwimmer,
    documentationPath: 'documents/OPEN-WATER-DIVER.pdf',
    documentName: 'Nikita_Diving_Education'
  }
];

export const projects: {
  title: string;
  image: string; // Указываем, что image — React-компонент
  description: string;
  tecnologies: string[];
  urlGitHub: string;
  urlDemo: string;

}[] = [
  {
    title: 'AI User Analyzer',
    image: GHUserAnalyzerImage,
    description: 'Is a tool for exploring GitHub profiles and analyzing their tech stack. It integrates AI for in-depth repository evaluation, offering customizable file and project analysis. Users can preview analyzed files instantly and receive professional AI feedback in any language—even Elvish. Voice responses are also available with access from the creator, NKT.FRLV. 🚀',
    tecnologies: ['Next.js', 'TypeScript', 'OpenAI-API', 'AI-Integration', 'Github-API', 'MUI'],
    urlGitHub: `${gitHubRepoUrl}/GitHub-User-Analyzer`,
    urlDemo: 'https://git-hub-user-analyzer.vercel.app/',
  },
  {
    title: 'Mesto',
    image: mestoImage,
    description: 'Simple and pure JavaScript project, that allows you to save your favorite foto, using API to shere cards with your friends.',
    tecnologies: ['JavaScript', 'API', 'HTML', 'CSS'],
    urlGitHub: `${gitHubRepoUrl}/mesto.git`,
    urlDemo: 'https://NKT-FRLV.github.io/mesto/',
  },
  {
    title: '<Closing tag />',
    image: closingTagImage,
    description: 'Simple Educational project maden almost by CSS, using diferent types of fonts and animations.',
    tecnologies: ['HTML', 'CSS','JavaScript', 'Variable-Fonts', 'SVG-Animations'],
    urlGitHub: `${gitHubRepoUrl}/zakrivayuschiy-teg-f`,
    urlDemo: 'https://NKT-FRLV.github.io/zakrivayuschiy-teg-f/',
  },
  {
    title: 'Stellar Burgers',
    image: stellarBurgersImage,
    description: 'A web application that allows users to log in, build custom burgers, place orders, and track order history in real time. The app uses cookies to store user tokens for seamless authentication.',
    tecnologies: ['REACT', 'REDUX-TOOLKIT', 'REACT-ROUTER-DOM', 'TYPESCRIPT', 'COOKIE', 'API', 'SASS'],
    urlGitHub: `${gitHubRepoUrl}/stellar-burgers`,
    urlDemo: 'https://stellar-burgers-git-main-mi-viejo-amigos-projects.vercel.app/',
  },
  {
    title: 'blog-customizer',
    image: blogCustomizerImage,
    description: 'An interactive blog page with a unique customization feature. Users can adjust the pages appearance through a convenient sidebar, allowing them to change the font, text and background colors, and control the width of the content section.',
    tecnologies: ['REACT', 'TYPESCRIPT', 'WEBPACK'],
    urlGitHub: `${gitHubRepoUrl}/blog-customizer`,
    urlDemo: 'https://blog-customizer-puce.vercel.app/',
  },
  {
    title: 'Tic-tac-toe Game',
    image: ticTacToeImage,
    description: 'Game with 3 modes: "Standart" - represents normal tic-tac-toe game, "Half"- represents the same game but with my own rules. And last but not least "AI" - represents tic-tac-toe game with artificial intelligence.',
    tecnologies: ['React.js', 'TypeScript', 'Vite', 'OpenAI-API', 'AI-Integration'],
    urlGitHub: `${gitHubRepoUrl}/tic-tak-toe_client`,
    urlDemo: 'https://tic-tak-toe-client.vercel.app/',
  }
];

type iconSizeType = 35 | 30 | 25

export const socialsLinks = [
  { id: 'github', link: gitHubRepoUrl, iconFunc: (size: iconSizeType) => <FaGithub size={size} /> },
  { id: 'instagram', link: "https://www.instagram.com/nkt.frlv/", iconFunc: (size: iconSizeType) => <FaInstagram size={size} /> },
  { id: 'telegram', link: 'https://web.telegram.org/k/#-955617383', iconFunc: (size: iconSizeType) => <FaTelegram size={size} /> },
  { id: 'linkedin', link: 'https://www.linkedin.com/in/nikita-frolov-22a008342/', iconFunc: (size: iconSizeType) => <FaLinkedin size={size} /> },
]