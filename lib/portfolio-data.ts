import type { Project, ServiceDetail, ServicePackage } from "./portfolio-types";

export const projects: Project[] = [
  {
    kind: "app",
    category: "E-commerce web app",
    title: "FreshCart",
    image: "/images/projects/freshcart.jpg",
    imageWidth: 1535,
    imageHeight: 862,
    description:
      "A grocery e-commerce app with account sign-up and sign-in, product browsing with search, category and brand filters, product details, and a shopping cart with live totals.",
    tags: ["E-commerce", "Accounts", "Search & filters", "Shopping cart", "React", "Next.js"],
    previewTitle: "Fresh groceries to your door",
    previewRows: ["Sign up and sign in", "Browse and search products", "Categories and brands", "Cart with live totals"],
    liveUrl: "https://freshcart-e-commerce-web-applicatio.vercel.app/",
    sourceUrl: "https://github.com/yuossef-ashry/-FreshCart-E-Commerce-Web-Application",
  },
  {
    kind: "app",
    category: "Social networking web app",
    title: "Social Media App",
    image: "/images/projects/media-app.jpg",
    imageWidth: 1515,
    imageHeight: 726,
    description:
      "A social platform for creating an account, managing a profile, sharing posts, and joining conversations through comments.",
    tags: ["Profiles", "Posts", "Comments", "React 19", "TypeScript"],
    previewTitle: "Your social feed",
    previewRows: ["Profile updated", "New post shared", "Comments and replies", "Sign-in and account"],
    liveUrl: "https://media-app-red.vercel.app/",
    sourceUrl: "https://github.com/yuossef-ashry/Media_App",
  },
  {
    kind: "website",
    category: "Flutter developer portfolio · client project",
    title: "Ali Emad Portfolio",
    image: "/images/projects/ali-emad-portfolio.jpg",
    imageWidth: 1535,
    imageHeight: 862,
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
    category: "Photography blog platform",
    title: "Adasa — عدسة",
    image: "/images/projects/adasa.jpg",
    imageWidth: 1517,
    imageHeight: 862,
    description:
      "A photography blog for browsing, searching, and filtering articles, switching between grid and list views, and reading full post pages.",
    tags: ["Photography", "Search", "Categories", "Grid / list", "React 19"],
    previewTitle: "Explore articles",
    previewRows: ["Featured stories", "Search articles", "Browse by category", "Full article pages"],
    liveUrl: "https://scop-vert-vercel-gcee.vercel.app/",
    sourceUrl: "https://github.com/yuossef-ashry/scop-vert.vercel",
  },
  {
    kind: "app",
    category: "Smart nutrition tracker",
    title: "NutriPlan",
    image: "/images/projects/personalized-nutrition.jpg",
    imageWidth: 1535,
    imageHeight: 862,
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
    category: "Live space data dashboard",
    title: "Cosmos Space Dashboard",
    image: "/images/projects/space-dashboard.jpg",
    imageWidth: 1535,
    imageHeight: 862,
    description:
      "An interactive space dashboard that brings NASA's daily astronomy image, upcoming launches, and Solar System planet data together.",
    tags: ["NASA image", "Launches", "Planet data", "Dashboard", "Responsive UI"],
    previewTitle: "Explore the cosmos",
    previewRows: ["Astronomy picture of the day", "Upcoming launches", "Solar System", "Live space data"],
    liveUrl: "https://yuossef-ashry.github.io/Space-Dashboard/",
    sourceUrl: "https://github.com/yuossef-ashry/Space-Dashboard",
  },
  {
    kind: "app",
    category: "Random recipe discovery",
    title: "What's for Dinner?",
    image: "/images/projects/whats-for-dinner.jpg",
    imageWidth: 1535,
    imageHeight: 862,
    description:
      "An interactive recipe discovery app that serves a fresh meal idea and gives you the details you need to decide what to cook.",
    tags: ["Recipe discovery", "Meal ideas", "Ingredients", "Interactive UI"],
    previewTitle: "Find your next meal",
    previewRows: ["Discover a recipe", "Review ingredients", "See meal details", "Choose what to cook"],
    liveUrl: "https://yuossef-ashry.github.io/Whats-For-Dinner/",
    sourceUrl: "https://github.com/yuossef-ashry/Whats-For-Dinner",
  },
];

export const skills = [
  { name: "HTML5", ring: 0, hot: false },
  { name: "CSS3", ring: 0, hot: true },
  { name: "JavaScript", ring: 0, hot: true },
  { name: "TypeScript", ring: 0, hot: false },
  { name: "React", ring: 1, hot: true },
  { name: "Bootstrap", ring: 1, hot: false },
  { name: "Sass", ring: 1, hot: false },
  { name: "Tailwind CSS", ring: 1, hot: false },
  { name: "Git", ring: 2, hot: false },
  { name: "GitHub", ring: 2, hot: true },
];

export const serviceDetails: ServiceDetail[] = [
  {
    id: "websites",
    number: "01",
    letter: "B",
    layer: "Business presence",
    title: "Business websites & portfolios",
    exampleTitle: "Ali Emad Portfolio",
    summary: "A clear online home for your brand, services, and work.",
    description: "A professional website that reflects your brand and helps visitors become customers. Suitable for companies, offices, clinics, factories, service businesses, tourism, and real estate; personal portfolios can present your work, skills, achievements, and professional identity. Available in Arabic, English, or both, with full right-to-left support.",
    items: [
      "Custom website design and development",
      "Company and service pages",
      "Project and portfolio galleries",
      "Contact and WhatsApp integration",
      "Arabic and RTL support",
      "Responsive layouts and SEO-friendly structure",
    ],
    tone: "",
  },
  {
    id: "web-apps",
    number: "02",
    letter: "R",
    layer: "Interactive systems",
    title: "Web applications",
    exampleTitle: "Cosmos Space Dashboard",
    summary: "Online systems that organize your day-to-day work.",
    description: "One clear system for day-to-day work: bookings, customers, staff, orders, and data, shaped around how your business runs.",
    items: [
      "Reusable React components",
      "Forms and data visualization",
      "API integration",
      "Responsive application layouts",
      "Connects with your existing backend or developer",
    ],
    details: [
      {
        title: "Business systems",
        description: "A system shaped around your process, with clear role-aware screens and room to grow.",
        items: ["Bookings", "Customers", "Properties", "Staff", "Orders", "Business data"],
      },
      {
        title: "Dashboards & access",
        description: "Manage content and daily operations from one organized workspace, with analytics in one view.",
        items: ["Content and users", "Products, orders, and bookings", "Records and analytics", "Administrator, staff, customer, and manager roles"],
      },
    ],
    tone: "",
  },
  {
    id: "commerce",
    number: "03",
    letter: "E",
    layer: "Practical workflows",
    title: "Commerce & custom systems",
    exampleTitle: "FreshCart",
    summary: "Storefronts, bookings, and connected workflows in one place.",
    description: "Build useful customer journeys and behind-the-scenes tools that help your business present products, accept requests, and stay organized.",
    items: [
      "Products, categories, and search",
      "Cart and checkout interfaces",
      "Orders and customer views",
      "Bookings and appointment management",
      "Custom workflows and integrations",
    ],
    details: [
      {
        title: "Online stores",
        description: "Present products, receive orders, and keep sales organized.",
        items: ["Promotions", "Store administration"],
      },
      {
        title: "Bookings & appointments",
        description: "For clinics, restaurants, venues, service businesses, and consultations. Keep availability organized and make booking clear for customers.",
        items: ["Availability management", "Fewer scheduling conflicts"],
      },
      {
        title: "Custom scope",
        description: "Combine a website, system, and dashboard around your workflow when no ready-made package fits.",
        items: ["Clarify requirements", "Map the workflow", "Build a practical first version", "Leave room to grow"],
      },
    ],
    tone: "layer-red",
  },
];

export const services = serviceDetails.map(({ number, letter, layer, title, description, tone }) => ({
  number,
  letter,
  layer,
  title,
  description,
  tone,
}));

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

const packageOptions: Omit<ServicePackage, "price">[] = [
  {
    id: "starter",
    name: "Starter",
    label: "Portfolio",
    startingPrice: 2500,
    openEnded: false,
    projectType: "Personal website or portfolio",
    budget: "EGP 2,500–5,000",
    exampleTitle: "Ali Emad Portfolio",
    description: "A personal portfolio, landing page, or focused launch.",
    features: [
      "One polished, responsive page",
      "Clear sections for your story, work, and services",
      "Contact links with WhatsApp integration",
      "Basic on-page SEO and launch setup",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    label: "Business",
    startingPrice: 5000,
    openEnded: false,
    projectType: "Business website",
    budget: "EGP 5,000–10,000",
    exampleTitle: "Adasa — عدسة",
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
    id: "custom-app",
    name: "Custom web app",
    label: "Business system",
    startingPrice: 10000,
    openEnded: true,
    projectType: "React application or dashboard",
    budget: "EGP 10,000+",
    exampleTitle: "Social Media App",
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

export const packages: ServicePackage[] = packageOptions.map((item) => ({
  ...item,
  price: `From EGP ${item.startingPrice.toLocaleString("en-US")}${item.openEnded ? "+" : ""}`,
}));

export const profile = {
  name: "Youssef El-Ashry",
  nameArabic: "يوسف العشري",
  alternateNames: ["Youssef El Ashry", "Youssef Al-Ashry", "Youssef Al Ashry"],
  role: "Frontend Developer",
  location: "Egypt",
  email: "yassef0100@gmail.com",
  phone: "+201214858840",
  phoneDisplay: "+20 121 485 8840",
  availability: "Open to frontend roles and focused freelance projects",
  hero: {
    headline: "Frontend Developer",
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

export const navigation: { label: string; href: string; mobileLabel?: string }[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Services", href: "#services" },
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
