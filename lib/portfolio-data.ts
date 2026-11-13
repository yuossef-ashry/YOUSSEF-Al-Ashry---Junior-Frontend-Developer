import type { Project } from "./portfolio-types";

export const projects: Project[] = [
  {
    kind: "app",
    category: "Social networking web app",
    title: "Social Media App",
    image: "/images/projects/media-app.jpg",
    description:
      "A social platform for creating an account, managing a profile, sharing posts, and joining conversations through comments.",
    tags: ["Profiles", "Posts", "Comments", "React 19", "TypeScript"],
    previewTitle: "Your social feed",
    previewRows: ["Profile updated", "New post shared", "Comments and replies", "Sign-in and account"],
    liveUrl: "https://media-app-red.vercel.app/",
    sourceUrl: "https://github.com/yuossef-ashry/Media_App",
  },
  {
    kind: "app",
    category: "Photography blog platform",
    title: "Adasa — عدسة",
    image: "/images/projects/adasa.jpg",
    description:
      "A photography blog for browsing, searching, and filtering articles, switching between grid and list views, and reading full post pages.",
    tags: ["Photography", "Search", "Categories", "Grid / list", "React 19"],
    previewTitle: "Explore articles",
    previewRows: ["Featured stories", "Search articles", "Browse by category", "Full article pages"],
    liveUrl: "https://scop-vert-vercel-gcee.vercel.app/",
    sourceUrl: "https://github.com/yuossef-ashry/scop-vert.vercel",
  },
  {
    kind: "website",
    category: "Responsive portfolio starter",
    title: "Modern Developer Portfolio",
    image: "/images/projects/modern-developer-portfolio.jpg",
    description:
      "A responsive personal portfolio starter with sections for an introduction, skills, selected work, experience, testimonials, and contact.",
    tags: ["Portfolio", "Arabic RTL", "Theme controls", "Tailwind CSS 4", "JavaScript"],
    previewTitle: "A clear portfolio",
    previewRows: ["About and skills", "Selected projects", "Experience", "Testimonials and contact"],
    liveUrl: "https://yuossef-ashry.github.io/Modern_Developer_Portfolio/",
    sourceUrl: "https://github.com/yuossef-ashry/Modern_Developer_Portfolio",
  },
  {
    kind: "app",
    category: "Task management board",
    title: "Kanban Task Manager",
    image: "/images/projects/kanban.jpg",
    description:
      "An interactive Kanban board for organizing tasks into To Do, In Progress, and Completed, with changes saved in the browser.",
    tags: ["Kanban board", "Task editing", "LocalStorage", "TypeScript", "Responsive UI"],
    previewTitle: "Task board",
    previewRows: ["To Do", "In Progress", "Completed", "Saved between visits"],
    liveUrl: "https://yuossef-ashry.github.io/Kanban/",
    sourceUrl: "https://github.com/yuossef-ashry/Kanban",
  },
  {
    kind: "app",
    category: "Live space data dashboard",
    title: "Cosmos Space Dashboard",
    image: "/images/projects/space-dashboard.jpg",
    description:
      "An interactive space dashboard that brings NASA's daily astronomy image, upcoming launches, and Solar System planet data together.",
    tags: ["NASA image", "Launches", "Planet data", "Dashboard", "Responsive UI"],
    previewTitle: "Explore the cosmos",
    previewRows: ["Astronomy picture of the day", "Upcoming launches", "Solar System", "Live space data"],
    liveUrl: "https://yuossef-ashry.github.io/Space-Dashboard/",
    sourceUrl: "https://github.com/yuossef-ashry/Space-Dashboard",
  },
  {
    kind: "website",
    category: "Flutter developer portfolio · client project",
    title: "Ali Emad Portfolio",
    image: "/images/projects/ali-emad-portfolio.jpg",
    description:
      "A commissioned portfolio website for Flutter developer Ali Emad, presenting his mobile apps, technical expertise, experience, services, and contact options.",
    tags: ["Client project", "Mobile apps", "Experience", "Services", "Portfolio"],
    previewTitle: "Ali Emad · Flutter developer",
    previewRows: ["Mobile applications", "Technical expertise", "Experience and services", "Contact options"],
    liveUrl: "https://ali-emad-flutter-mobile-developer.vercel.app/",
    sourceUrl: "https://github.com/yuossef-ashry/ALI-EMAD-Flutter-Mobile-Developer",
  },
  {
    kind: "app",
    category: "Contact management app",
    title: "Contact Hub",
    image: "/images/projects/contact-hub.jpg",
    description:
      "A modern contact manager that turns a traditional phone book into an interactive workspace for organizing, finding, and reaching people.",
    tags: ["Contact manager", "Organization", "Search", "Interactive UI"],
    previewTitle: "Contact Hub",
    previewRows: ["Find a contact", "Organize people", "Contact details", "Reach out quickly"],
    liveUrl: "https://yuossef-ashry.github.io/Contact_Hub/",
    sourceUrl: "https://github.com/yuossef-ashry/Contact_Hub",
  },
  {
    kind: "app",
    category: "Smart nutrition tracker",
    title: "NutriPlan",
    image: "/images/projects/personalized-nutrition.jpg",
    description:
      "A nutrition tracking web app for discovering meals, exploring food products, and monitoring daily calories and macronutrients in one place.",
    tags: ["Meal discovery", "Food products", "Calories", "Macronutrients"],
    previewTitle: "Nutrition at a glance",
    previewRows: ["Discover meals", "Explore food products", "Daily calories", "Track macronutrients"],
    liveUrl: "https://yuossef-ashry.github.io/Personalized-Nutrition-Meal-Planning-/",
    sourceUrl:
      "https://github.com/yuossef-ashry/Personalized-Nutrition-Meal-Planning-",
  },
  {
    kind: "app",
    category: "Random recipe discovery",
    title: "What's for Dinner?",
    image: "/images/projects/whats-for-dinner.jpg",
    description:
      "An interactive recipe discovery app that serves a fresh meal idea and gives you the details you need to decide what to cook.",
    tags: ["Recipe discovery", "Meal ideas", "Ingredients", "Interactive UI"],
    previewTitle: "Find your next meal",
    previewRows: ["Discover a recipe", "Review ingredients", "See meal details", "Choose what to cook"],
    liveUrl: "https://yuossef-ashry.github.io/Whats-For-Dinner/",
    sourceUrl: "https://github.com/yuossef-ashry/Whats-For-Dinner",
  },
  {
    kind: "website",
    category: "Real estate landing page",
    title: "Elite Homes",
    image: "/images/projects/elite-homes-preview.svg",
    description:
      "A responsive real estate landing page built with Bootstrap and custom styling, focused on polished layouts.",
    tags: ["Real estate", "Property listings", "Responsive design", "Bootstrap"],
    previewTitle: "Find your place",
    previewRows: ["Featured homes", "Explore listings", "Property details", "Contact the team"],
    sourceUrl: "https://github.com/yuossef-ashry/Clarity",
  },
];

export const skills = [
  { name: "HTML5", ring: 0, hot: false },
  { name: "CSS3", ring: 0, hot: true },
  { name: "JavaScript", ring: 0, hot: true },
  { name: "React", ring: 1, hot: true },
  { name: "Bootstrap", ring: 1, hot: false },
  { name: "Sass", ring: 1, hot: false },
  { name: "Git", ring: 2, hot: false },
  { name: "GitHub", ring: 2, hot: true },
];

export const services = [
  {
    number: "01",
    letter: "B",
    layer: "Web presence",
    title: "Business websites",
    description:
      "Modern, responsive pages that showcase your brand, explain your services, and help customers get in touch.",
    tone: "",
  },
  {
    number: "02",
    letter: "P",
    layer: "Digital identity",
    title: "Portfolios & interactive websites",
    description:
      "Personal websites that present your work, skills, achievements, and professional identity through thoughtful design.",
    tone: "",
  },
  {
    number: "03",
    letter: "R",
    layer: "Frontend products",
    title: "Web applications & platforms",
    description:
      "Interactive React experiences that simplify processes, improve user experience, and bring digital ideas to life.",
    tone: "layer-red",
  },
  {
    number: "04",
    letter: "E",
    layer: "Commerce",
    title: "E-commerce websites",
    description:
      "Online stores that present products clearly and make shopping easier for your customers.",
    tone: "layer-dark",
  },
  {
    number: "05",
    letter: "D",
    layer: "Business workflows",
    title: "Dashboards & custom solutions",
    description:
      "Organized dashboards and custom interfaces for information, teams, bookings, and day-to-day operations.",
    tone: "layer-dark",
  },
];

export const serviceDetails = [
  {
    title: "Business websites",
    description: "A professional website that reflects your brand and turns visitors into customers. Suitable for companies, offices, clinics, factories, service businesses, tourism, and real estate.",
    items: ["Service pages", "Project gallery and company information", "Contact and WhatsApp", "Layouts for all screen sizes", "Arabic and RTL support"],
  },
  {
    title: "Web applications and systems",
    description: "Turn day-to-day operations into a clearer, faster online workflow for booking, customer, property, staff, order, or data management.",
    items: ["A system shaped around your process", "Clear, role-aware screens", "Room to grow", "Backend collaboration when required"],
  },
  {
    title: "Online stores",
    description: "A professional store to present products, receive orders, and keep sales organized.",
    items: ["Products and categories", "Shopping cart and orders", "Customer views", "Promotions", "Store administration"],
  },
  {
    title: "Bookings and appointments",
    description: "A booking system for clinics, restaurants, venues, services, appointments, and consultations.",
    items: ["Online booking and availability", "Appointment management", "Clear customer flows", "Fewer scheduling conflicts"],
  },
  {
    title: "Admin dashboards",
    description: "Manage your project from one clear, organized workspace.",
    items: ["Content and users", "Products, orders, and bookings", "Records and analytics", "A single management view"],
  },
  {
    title: "Multi-user systems",
    description: "Give each person access to the information and actions they need.",
    items: ["Role-based access", "Administrator and staff views", "Customer and manager views", "Permissions tailored to the workflow"],
  },
  {
    title: "Custom solutions",
    description: "Have an idea that does not fit a ready-made package? We can shape it together from the ground up.",
    items: ["Clarify requirements", "Map the workflow", "Build a practical first version", "Leave room to grow"],
  },
];

export const processSteps = [
  { title: "Understand the goal", description: "We start from the idea: who it is for, what it should do, and which features matter most." },
  { title: "Agree on the scope", description: "We choose the pages and features, set priorities, and agree on a clear estimate before work begins." },
  { title: "Plan the experience", description: "I map the content and page structure, then shape a visual direction that fits the project." },
  { title: "Build the interface", description: "I turn the approved plan into a responsive, accessible website or React interface." },
  { title: "Review and refine", description: "We review the work together, check it across screen sizes, and polish the details before handover." },
  { title: "Launch and hand over", description: "I deliver the finished work and agreed files, with support for the next improvements when needed." },
];

export const milestones = [
  {
    year: "NOW",
    label: "TECHNICAL TRAINING · 2026–2027",
    title: "Frontend Development Trainee",
    where: "Route Academy",
    description:
      "Applying frontend concepts through structured assignments and hands-on project work, with a focus on JavaScript, React, and responsive interface development.",
    outcome: "Building practical frontend experience",
  },
  {
    year: "2026",
    label: "FREELANCE CAREER DEVELOPMENT · 2026",
    title: "Freelancing and Career Development Trainee",
    where: "ITIDA GIGs × EYouth",
    description:
      "Developed professional freelancing skills and a practical understanding of the freelance market.",
    outcome: "Secured my first freelance project",
    certificateImage: "/images/certificates/itida-gigs-eyouth-certificate.jpg",
  },
  {
    year: "2025",
    label: "CERTIFICATE · SEPTEMBER 26, 2025",
    title: "Introduction to Front-End Development",
    where: "Meta · via Coursera",
    description:
      "Completed Meta's online non-credit course on foundational frontend development concepts and technologies.",
    outcome: "Certificate verified",
    href: "https://coursera.org/verify/5VY7HBR8ZVYQCT",
    certificateImage: "/images/certificates/meta-coursera-certificate.jpg",
  },
  {
    year: "2025",
    label: "ENTREPRENEURSHIP ACHIEVEMENT",
    title: "Entrepreneurship Bootcamp Participant",
    where: "E-Club BATU × ASRT",
    description:
      "Worked with a team to develop EchoTech, a phone-recycling concept using design-thinking methods.",
    outcome: "Won 3rd place in the bootcamp",
    certificateImage: "/images/certificates/eclub-batu-asrt-certificate.jpg",
  },
  {
    year: "2024",
    label: "TRAINING CERTIFICATE · JULY–SEPTEMBER 2024",
    title: "Front-End Course Participant",
    where: "Borg Al Arab Technological University",
    description:
      "Completed a Front-End course and gained theoretical and practical knowledge in the field.",
    outcome: "Certificate of participation",
    certificateImage: "/images/certificates/batu-frontend-course-certificate.jpg",
  },
];

export const packages = [
  {
    name: "Starter",
    price: "From EGP 2,500",
    description: "A personal portfolio, landing page, or focused launch.",
    features: [
      "One polished, responsive page",
      "Clear sections for your story, work, and services",
      "Contact links with WhatsApp integration",
      "Basic on-page SEO and launch setup",
    ],
  },
  {
    name: "Professional",
    price: "From EGP 5,000",
    description: "A growing business that needs a stronger web presence.",
    features: [
      "Up to five responsive pages",
      "A custom visual direction for your business",
      "Services, projects, and contact sections",
      "Interactive forms and polished UI states",
      "Basic SEO and deployment support",
    ],
  },
  {
    name: "Custom web app",
    price: "From EGP 10,000+",
    description: "A dashboard or React interface shaped around your workflow.",
    features: [
      "Multi-screen React interface",
      "Reusable components and responsive states",
      "API integration where the project requires it",
      "Dashboards, forms, and data views",
      "A custom estimate after reviewing the brief",
    ],
  },
];

export const profile = {
  name: "Youssef Al-Ashry",
  role: "Junior Frontend Developer",
  location: "Egypt",
  email: "yaasef0100@gmail.com",
  phone: "+201214858840",
  phoneDisplay: "+20 121 485 8840",
  availability: "Open to junior frontend roles and focused freelance projects",
  hero: {
    headline: "Junior Frontend Developer",
    summary:
      "I build responsive, interactive interfaces with a strong JavaScript foundation and practical React and TypeScript skills, focused on clear, user-friendly experiences.",
  },
  socialLinks: {
    github: "https://github.com/yuossef-ashry",
    whatsapp: "https://wa.me/201214858840",
    linkedin: "https://www.linkedin.com/in/youssef-mohammed-al-ashry",
    instagram: "https://www.instagram.com/youssef_alashry_51/",
    facebook: "https://www.facebook.com/share/19tf9NdNb6/",
  },
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Services", href: "#services" },
  { label: "Details", mobileLabel: "Service details", href: "#service-details" },
  { label: "Process", href: "#process" },
  { label: "Packages", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const portfolioData = {
  profile,
  navigation,
  projects,
  skills,
  services,
  serviceDetails,
  processSteps,
  milestones,
  packages,
};

export type PortfolioData = typeof portfolioData;
export type PortfolioResource = keyof PortfolioData;
