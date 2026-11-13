import type { CSSProperties } from "react";
import Image from "next/image";
import CertificateViewer from "./certificate-viewer";
import { milestones, packages, projects, processSteps, serviceDetails, services, skills } from "./portfolio-data";
import PortfolioInteractions from "./portfolio-interactions";
import PortfolioWork from "./portfolio-work";
import ProjectBriefForm from "./project-brief-form";
import ThemeToggle from "./theme-toggle";

const milestonesForRing = [
  {
    label: "Achievement · 2025",
    title: "3rd place",
    detail: "Entrepreneurship Bootcamp",
    summary: "EchoTech phone-recycling concept",
    tone: "c-red",
  },
  {
    label: "Certificate · Meta",
    title: "Front-End Development",
    detail: "Verified via Coursera",
    summary: "Foundational frontend development",
    tone: "c-dark",
  },
];

export default function PortfolioContent() {
  const ringCards = [
    ...packages.map((item, index) => ({
      label: "Starting price",
      title: item.name,
      detail: item.price,
      summary: item.description,
      tone: index === 1 ? "c-red" : "",
    })),
    ...milestonesForRing,
  ];

  const serviceGroups = [
    {
      title: "Websites & portfolios",
      tag: "Business presence",
      items: [
        "Custom website design and development",
        "Company and service pages",
        "Project and portfolio galleries",
        "Contact and WhatsApp integration",
        "Arabic and RTL support",
        "Responsive layouts and SEO-friendly structure",
      ],
    },
    {
      title: "Web applications",
      tag: "React interfaces",
      items: [
        "Reusable React components",
        "Forms and data visualization",
        "API integration",
        "Responsive application layouts",
        "Backend collaboration when required",
      ],
    },
    {
      title: "Commerce & custom systems",
      tag: "Practical workflows",
      items: [
        "Products, categories, and search",
        "Cart and checkout interfaces",
        "Orders and customer views",
        "Bookings and appointment management",
        "Custom workflows and integrations",
      ],
    },
    {
      title: "How I work",
      tag: "From idea to launch",
      items: [
        "Understand the goal",
        "Agree on the scope",
        "Plan the experience",
        "Build the interface",
        "Review, refine, and hand over",
      ],
    },
  ];

  return (
    <>
      <div className="cursor" aria-hidden="true">
        <span className="cursor-dot" />
        <span className="cursor-ring" />
      </div>

      <header className="nav">
        <a href="#home" className="logo" aria-label="Youssef Al-Ashry — home">
          YA<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <span className="nav-pill" aria-hidden="true" />
          <a href="#about" data-nav="about">About</a>
          <a href="#work" data-nav="work">Work</a>
          <a href="#journey" data-nav="journey">Journey</a>
          <a href="#toolkit" data-nav="toolkit">Toolkit</a>
          <a href="#services" data-nav="services">Services</a>
          <a href="#service-details" data-nav="service-details">Details</a>
          <a href="#process" data-nav="process">Process</a>
          <a href="#pricing" data-nav="pricing">Packages</a>
          <a href="#contact" data-nav="contact">Contact</a>
        </nav>
        <div className="nav-tools"><ThemeToggle /></div>
        <button className="menu-btn" aria-label="Open menu" aria-expanded="false">
          <span />
          <span />
        </button>
      </header>

      <div className="mobile-menu" aria-hidden="true" inert>
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#journey">Journey</a>
        <a href="#toolkit">Toolkit</a>
        <a href="#services">Services</a>
        <a href="#service-details">Service details</a>
        <a href="#process">Process</a>
        <a href="#pricing">Packages</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="stage" aria-hidden="true">
        <Image
          className="stage-img"
          src="/images/profile/youssef-portrait.png"
          alt=""
          width={1122}
          height={1402}
          priority
        />
      </div>

      <main>
        <section id="home" className="scene hero" data-scene="home">
          <div className="hero-bigname deco" aria-hidden="true"><span>YOUSSEF</span></div>

          <div className="fg hero-copy">
            <p className="label rv"><b>(00)</b> — Junior Frontend Developer</p>
            <h1 className="display hero-title">
              <span className="line"><span className="rv-up">JUNIOR FRONTEND</span></span>
              <span className="line red"><span className="rv-up" style={{ "--d": ".12s" } as CSSProperties}>DEVELOPER</span></span>
            </h1>
            <p className="lede rv" style={{ "--d": ".25s" } as CSSProperties}>
              I build responsive, interactive interfaces with a strong JavaScript foundation and practical React and TypeScript skills, focused on clear, user-friendly experiences.
            </p>
            <div className="cta rv" style={{ "--d": ".35s" } as CSSProperties}>
              <a href="#work" className="btn btn-red">Explore Projects <i>↗</i></a>
              <a href="#contact" className="btn btn-ghost">Contact me</a>
            </div>
          </div>

          <Image
            className="m-photo hero-mphoto"
            src="/images/profile/youssef-portrait.png"
            alt="Portrait of Youssef Al-Ashry"
            width={1122}
            height={1402}
            priority
          />

          <div className="fg hero-meta rv" style={{ "--d": ".5s" } as CSSProperties}>
            <div><span className="mono-k">Open to</span><span>Junior roles &amp; freelance projects</span></div>
            <div><span className="mono-k">Core strengths</span><span>JavaScript · React · TypeScript</span></div>
          </div>
          <a href="#about" className="fg scroll-cue" aria-label="Scroll to About"><span />Scroll</a>
        </section>

        <section id="about" className="scene about" data-scene="about">
          <div className="about-glow deco" aria-hidden="true" />

          <div className="fg split-right">
            <p className="label rv"><b>(01)</b> — About me</p>
            <h2 className="display h2 rv">Clarity in<br /><span className="red">every interaction.</span></h2>
            <div className="about-text">
              <p className="rv">My frontend work starts with the purpose of a feature: what someone needs to understand or accomplish. I shape that into a clear hierarchy and predictable interactions, then refine the details so the experience works smoothly across screen sizes.</p>
              <p className="rv">Across my projects, I keep components organized and UI states deliberate so the code remains maintainable as the product grows. I value the balance of visual quality, usability, and reliable behavior because each interface should serve both its users and its product team.</p>
            </div>

            <dl className="facts rv">
              <div className="fact"><dt>Role</dt><dd>Frontend<small>Junior Developer</small></dd></div>
              <div className="fact"><dt>Core stack</dt><dd>React + TS<small>JavaScript (ES6+)</small></dd></div>
              <div className="fact"><dt>Strength</dt><dd>Responsive<small>Clear, interactive UI</small></dd></div>
              <div className="fact red-fact"><dt>Available for</dt><dd>Roles &amp; freelance<small>Focused projects</small></dd></div>
            </dl>
          </div>
        </section>

        <section id="work" className="scene work" data-scene="work" style={{ "--n": String(projects.length) } as CSSProperties}>
          <div className="work-sticky">
            <div className="work-head">
              <p className="label"><b>(02)</b> — Selected work</p>
              <div className="w-counter display" aria-hidden="true">
                <span className="w-cur"><span>01</span></span><span className="w-tot">/ {String(projects.length).padStart(2, "0")}</span>
              </div>
              <div className="w-bar"><i /></div>
            </div>

            <PortfolioWork />
          </div>
        </section>

        <section id="journey" className="scene journey" data-scene="journey">
          <div className="j-year-col deco" aria-hidden="true">
            <div className="j-year-sticky"><span className="j-year">2025</span></div>
          </div>

          <div className="fg j-content">
            <p className="label rv"><b>(03)</b> — The journey so far</p>
            <h2 className="display h2 rv">Experience<br /><span className="red">&amp; milestones.</span></h2>

            <ol className="j-steps">
              {milestones.map((milestone, index) => (
                <li className="j-step rv" data-year={milestone.year} key={`${milestone.title}-${index}`}>
                  <span className="j-when">{milestone.label}</span>
                  <h3>{milestone.title}</h3>
                  <p className="j-where">{milestone.where}</p>
                  <p>{milestone.description}</p>
                  <p className="j-score">{milestone.outcome}</p>
                  {milestone.certificateImage && <CertificateViewer image={milestone.certificateImage} title={milestone.title} />}
                  {milestone.href && <p className="j-where"><a href={milestone.href} target="_blank" rel="noreferrer">Verify certificate ↗</a></p>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="toolkit" className="scene orbit" data-scene="orbit">
          <div className="orbit-rings deco" aria-hidden="true"><i /><i /><i /></div>

          <div className="fg orbit-head">
            <p className="label rv"><b>(04)</b> — Toolkit</p>
            <h2 className="display h2 rv">Frontend<br /><span className="red">in orbit.</span></h2>
            <p className="orbit-sub rv">The tools I use to shape responsive interfaces and keep frontend work moving.</p>
          </div>

          <Image className="m-photo orbit-mphoto" src="/images/profile/youssef-portrait.png" alt="" width={1122} height={1402} />

          <div className="orbit-field" aria-label="Skills">
            {skills.map((skill) => (
              <span className={`pill${skill.hot ? " hot" : ""}`} data-ring={skill.ring} key={skill.name}>{skill.name}</span>
            ))}
          </div>

          <div className="marquee fg" aria-hidden="true">
            <div className="marquee-track">
              <span>JavaScript ✦ React ✦ TypeScript ✦ HTML5 ✦ CSS3 ✦ Tailwind CSS ✦ Bootstrap ✦ Sass ✦ Git ✦ GitHub ✦ Vite ✦ </span>
              <span>JavaScript ✦ React ✦ TypeScript ✦ HTML5 ✦ CSS3 ✦ Tailwind CSS ✦ Bootstrap ✦ Sass ✦ Git ✦ GitHub ✦ Vite ✦ </span>
            </div>
          </div>
        </section>

        <section id="services" className="scene stack" data-scene="layers">
          <div className="fg stack-inner">
            <div className="stack-head">
              <p className="label rv"><b>(05)</b> — Services</p>
              <h2 className="display h2 rv">Digital work.<br /><span className="red">Built around you.</span></h2>
              <p className="stack-sub rv">From business websites and portfolios to interactive web applications, I shape practical digital work around your goals, users, and workflow.</p>
            </div>

            <div className="layers">
              {services.map((service, index) => (
                <article className={`layer rv ${service.tone}`} style={{ "--d": `${index * 0.08}s` } as CSSProperties} key={service.title}>
                  <span className="layer-n">{service.number} · {service.layer}</span>
                  <span className="layer-l display">{service.letter}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>

            <div className="skill-groups">
              {serviceGroups.map((group, index) => (
                <div className="sg rv" style={{ "--d": `${index * 0.08}s` } as CSSProperties} key={group.title}>
                  <div className="sg-top"><h3>{group.title}</h3><span className={`sg-tag${index === 0 ? " hot" : ""}`}>{group.tag}</span></div>
                  <ul className="chips">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="service-details" className="scene service-details" data-scene="service-details">
          <div className="fg service-details-inner">
            <p className="label rv"><b>(06)</b> — Service details</p>
            <h2 className="display h2 rv">Digital solutions<br /><span className="red">built for your business.</span></h2>
            <p className="service-details-intro rv">I learn what your project needs, then shape the right solution around your workflow.</p>
            <div className="service-detail-grid">
              {serviceDetails.map((service, index) => (
                <article className="service-detail rv" key={service.title} style={{ "--d": `${index * 0.06}s` } as CSSProperties}>
                  <span className="service-detail-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  <a href="#contact-project-form">Discuss this service ↗</a>
                </article>
              ))}
            </div>
            <div className="service-combine rv">
              <div>
                <p className="label"><b>NEED A COMBINATION?</b> — Custom scope</p>
                <h3 className="display">Websites, systems, and dashboards that fit together.</h3>
                <p>We can bring your website, systems, and dashboards together into one solution that fits your workflow.</p>
              </div>
              <a className="btn btn-red" href="#contact-project-form">Discuss a custom solution ↗</a>
            </div>
          </div>
        </section>

        <section id="process" className="scene process" data-scene="process">
          <div className="fg process-inner">
            <p className="label rv"><b>(07)</b> — From idea to launch</p>
            <h2 className="display h2 rv">A clear path<br /><span className="red">from idea to launch.</span></h2>
            <p className="process-intro rv">A simple, transparent process — from the first message to a finished, working website.</p>
            <ol className="process-steps">
              {processSteps.map((step, index) => (
                <li className="process-step rv" key={step.title} style={{ "--d": `${index * 0.06}s` } as CSSProperties}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <a className="btn btn-red process-cta" href="#contact-project-form">Start a conversation ↗</a>
          </div>
        </section>

        <section id="pricing" className="scene awards" data-scene="awards">
          <div className="fg awards-inner">
            <p className="label rv"><b>(08)</b> — Pricing</p>
            <h2 className="display pricing-title rv">Choose your<br /><span className="red">starting point.</span></h2>
            <p className="pricing-intro rv">Prices are one-time starting estimates in EGP. We agree on the final scope and quote together before work begins.</p>

            <div className="stats">
              <div className="stat s-red rv" style={{ "--d": "0s" } as CSSProperties}><strong><span data-count="10" data-pad="2">00</span></strong><span>Frontend projects</span></div>
              <div className="stat s-dark rv" style={{ "--d": ".08s" } as CSSProperties}><strong><span data-count="3">0</span><em>rd</em></strong><span>Bootcamp placement</span></div>
              <div className="stat s-red rv" style={{ "--d": ".16s" } as CSSProperties}><strong><span data-count="1">0</span></strong><span>Client project</span></div>
              <div className="stat s-dark rv" style={{ "--d": ".24s" } as CSSProperties}><strong><span data-count="1">0</span></strong><span>Verified certificate</span></div>
            </div>

            <div className="ring-wrap rv">
              <p className="ring-title"><span className="dot" />Packages &amp; milestones</p>
              <div className="ring-stage">
                <div className="ring">
                  {ringCards.map((card, index) => (
                    <div className={`cert${card.tone ? ` ${card.tone}` : ""}`} style={{ "--i": String(index) } as CSSProperties} key={`${card.title}-${index}`}>
                      <div className="cf">
                        <span className="cert-ok">{card.label}</span>
                        <h4>{card.title}</h4>
                        <strong className="package-price">{card.detail}</strong>
                        <em>{card.summary}</em>
                      </div>
                      <div className="cb" aria-hidden="true"><span>YA</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <ul className="cert-list">
                {ringCards.map((card, index) => <li key={`${card.title}-accessible-${index}`}>{card.label}: {card.title} — {card.detail}. {card.summary}</li>)}
              </ul>
            </div>

            <div className="package-grid">
              {packages.map((item, index) => (
                <article className={`package-card${index === 1 ? " package-card-featured" : ""}`} key={item.name}>
                  {index === 1 && <span className="package-popular">Most popular</span>}
                  <h3>{item.name}</h3>
                  <strong>{item.price}</strong>
                  <p>{item.description}</p>
                  <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <a href="#contact-project-form">Discuss this package ↗</a>
                </article>
              ))}
            </div>
            <div className="package-custom rv">
              <div>
                <p className="label"><b>HAVE A DIFFERENT KIND OF PROJECT?</b></p>
                <h3 className="display">Let&apos;s shape the right scope together.</h3>
                <p>Not sure which package fits? Send a short brief and I&apos;ll help define the right scope.</p>
              </div>
              <a className="btn btn-dark" href="#contact-project-form">Talk through your idea ↗</a>
            </div>
          </div>
        </section>

        <section id="contact" className="scene contact" data-scene="contact">
          <div className="contact-big deco" aria-hidden="true"><span>LET&apos;S</span><span>BUILD.</span></div>

          <div className="fg contact-top">
            <p className="label"><b>(09)</b> — Contact</p>
            <h2 className="display contact-head">Make your next idea<br /><span>feel at home online.</span></h2>
            <p className="contact-lede">Tell me what you are working toward. We can shape the right frontend experience, agree on a clear scope, and take it one step at a time.</p>
          </div>

          <Image className="m-photo contact-mphoto" src="/images/profile/youssef-portrait.png" alt="" width={1122} height={1402} />

          <div className="fg contact-bottom">
            <div className="contact-id">
              <p className="display contact-name">Youssef<br />Al-Ashry</p>
              <p className="contact-open">Open to focused projects and junior frontend roles</p>
              <a href="mailto:yaasef0100@gmail.com" className="contact-mail">yaasef0100@gmail.com</a>
            </div>
            <ul className="contact-links">
              <li><a href="mailto:yaasef0100@gmail.com"><span>Email me</span><i>↗</i></a></li>
              <li><a href="tel:+201214858840"><span>Call · +20 121 485 8840</span><i>↗</i></a></li>
              <li><a href="https://wa.me/201214858840" target="_blank" rel="noreferrer"><span>WhatsApp</span><i>↗</i></a></li>
              <li><a href="https://github.com/yuossef-ashry" target="_blank" rel="noreferrer"><span>GitHub</span><i>↗</i></a></li>
              <li><a href="https://www.linkedin.com/in/youssef-mohammed-al-ashry" target="_blank" rel="noreferrer"><span>LinkedIn</span><i>↗</i></a></li>
              <li><a href="https://www.instagram.com/youssef_alashry_51/" target="_blank" rel="noreferrer"><span>Instagram</span><i>↗</i></a></li>
              <li><a href="https://www.facebook.com/share/19tf9NdNb6/" target="_blank" rel="noreferrer"><span>Facebook</span><i>↗</i></a></li>
            </ul>
          </div>

          <div className="fg brief-wrap">
            <ProjectBriefForm />
          </div>

          <footer className="fg footer">
            <span>© <span className="yr">2026</span> Youssef Al-Ashry. All rights reserved.</span>
            <a href="#home">Back to top ↑</a>
          </footer>
        </section>
      </main>
      <PortfolioInteractions />
    </>
  );
}
