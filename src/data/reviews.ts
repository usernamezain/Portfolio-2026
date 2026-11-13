export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarImage: string;
  avatarFallback: string;
  rating: number;
  highlight: string;
  content: string;
  project: string;
  projectUrl?: string;
}

export const reviewsData: Review[] = [
  {
    id: 'ayesha-noor',
    name: 'Ayesha Noor',
    role: 'WordPress Specialist & Frontend Dev',
    company: 'Freelance Studio',
    avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    avatarFallback: 'AN',
    rating: 5,
    highlight: 'Clients literally message me saying they hired me because my personal portfolio stood out immediately.',
    content: 'Zain engineered my personal portfolio with such incredible attention to bold typography, kinetic GSAP scroll motion, and responsiveness. Working with him was effortless — he understood the exact creative direction on day one and delivered clean, production-ready code that loads instantly.',
    project: 'Ayesha WordPress Portfolio',
    projectUrl: 'https://ayeshoo-chuzi.vercel.app/'
  },
  {
    id: 'david-krause',
    name: 'David Krause',
    role: 'Product Engineer',
    company: 'Indie Builder',
    avatarImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    avatarFallback: 'DK',
    rating: 5,
    highlight: 'Zest replaced 3 different shortcut utilities on my setup. Zero latency and flawless local privacy.',
    content: 'Zest turns any 2-key combo into immediate workflow commands. The speed, local privacy, and low-latency execution show that Zain deeply understands developer ergonomics and performance-first desktop software engineering.',
    project: 'Zest Keyboard App',
    projectUrl: 'https://zest-soon.vercel.app/'
  },
  {
    id: 'sadia-aqeel',
    name: 'Sadia Aqeel',
    role: 'Visual Brand Identity Designer',
    company: 'Sadia Studio',
    avatarImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    avatarFallback: 'SA',
    rating: 5,
    highlight: 'Translated my Figma designs, Lenis smooth scrolling, and kinetic SVG animations with zero friction.',
    content: 'As a designer, I am extremely particular about typography rhythm, easing curves, and micro-interactions. Zain translated my complex Figma designs, Lenis smooth scrolling, and kinetic SVG animations with zero friction. The portfolio feels like a luxury editorial brand publication.',
    project: 'Sadia Aqeel Brand Studio',
    projectUrl: 'https://github.com/usernamezain/Sadia-Aqeel-Portfolio'
  },
  {
    id: 'marco-aversano',
    name: 'Marco Aversano',
    role: 'Owner & General Manager',
    company: "Aversano's Restaurant",
    avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    avatarFallback: 'MA',
    rating: 4,
    highlight: 'Our customer table reservations and mobile orders jumped within the very first week.',
    content: 'Our old website was sluggish and hard to navigate on phones. Zain completely rebuilt the digital storefront with a lightning-fast responsive menu, smooth visuals, and 100/100 performance scores. Highly recommended for commercial client builds.',
    project: "Aversano's Web Platform",
    projectUrl: 'https://aversanosrestaurant.vercel.app/'
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Senior Frontend Engineer',
    company: 'Open-Source Contributor',
    avatarImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    avatarFallback: 'ER',
    rating: 5,
    highlight: 'The cleanest open-source architecture for Manifest V3 Chrome Extensions and Gemini Nano.',
    content: 'Tested Zain’s StackRay Chrome Extension while experimenting with local on-device AI. His code is modular, strictly typed with TypeScript 5.7, and the repository architecture is so clean it serves as a masterclass for Manifest V3 extensions.',
    project: 'StackRay Chrome Extension',
    projectUrl: 'https://github.com/usernamezain/Stack-Ray'
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Head of Digital Production',
    company: 'NRN Media',
    avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    avatarFallback: 'MV',
    rating: 5,
    highlight: 'Delivered an ultra-fast, responsive web platform under an aggressive production deadline.',
    content: 'Zain delivered an ultra-fast, responsive web platform under an aggressive production deadline. His mastery of modern web architecture, clean code splitting, and zero layout shift on mobile proved his senior-level frontend engineering pedigree.',
    project: 'NRN Media Platform',
    projectUrl: 'https://nrnmedia.com'
  },
  {
    id: 'tariq-mehmood',
    name: 'Tariq Mehmood',
    role: 'Creative Director',
    company: 'Alan Home & Living',
    avatarImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    avatarFallback: 'TM',
    rating: 4,
    highlight: 'Smooth, lightweight eCommerce experience that customers love navigating on mobile.',
    content: 'Zain built our online catalog and accessories showroom with buttery-smooth interactions and quick-view modals. Customers frequently compliment the sleek interface, and our average session duration doubled.',
    project: 'Alan Kitchen Accessories',
    projectUrl: 'https://usernamezain.github.io/Ecomerece-Kitchen-Assesories-Ui-Ux/'
  },
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    role: 'Security Analyst',
    company: 'AppSec Lab',
    avatarImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    avatarFallback: 'AR',
    rating: 5,
    highlight: 'Made auditing public repositories for exposed tokens and keys 10x faster before indexing.',
    content: 'Quirk GitHub is an exceptionally handy tool for proactive code defense. Building regex queries and targeted repo searches with its clean UI saved our security team countless hours. Built right with privacy in mind.',
    project: 'Quirk GitHub Security Tool',
    projectUrl: 'https://quirk-github.vercel.app/'
  },
  {
    id: 'samuel-thorne',
    name: 'Samuel Thorne',
    role: 'DevOps Lead',
    company: 'CloudStack Collective',
    avatarImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    avatarFallback: 'ST',
    rating: 5,
    highlight: 'The pre-commit secret detection in e-git saved our engineering team from leaks twice.',
    content: 'We adopted e-git-zain as a standard CLI enhancement across our engineering team. The automated branch hygiene, instant status reports, and secret scanners make it an indispensable utility.',
    project: 'e-git-zain CLI Suite',
    projectUrl: 'https://github.com/usernamezain/e-git-zain'
  }
];
