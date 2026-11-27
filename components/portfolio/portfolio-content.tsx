import type { CSSProperties } from "react";
import Image from "next/image";
import CertificateViewer from "@/components/certificates/certificate-viewer";
import { milestones, navigation, packages, profile, projects, processSteps, serviceDetails, skills } from "@/lib/portfolio-data";
import DownloadCvButton from "./download-cv-button";
import PortfolioInteractions from "./portfolio-interactions";
import PortfolioWork from "@/components/projects/portfolio-work";
import ProjectBriefForm from "@/components/contact/project-brief-form";
import FloatingContact from "@/components/contact/floating-contact";
import ThemeToggle from "@/components/layout/theme-toggle";
import ProjectOffer from "@/components/services/project-offer";
import ServiceExplorer from "@/components/services/service-explorer";

const heroPortraitSizes = "(max-width: 999px) min(calc(100vw - 40px), 520px), min(64vh, 40vw)";

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
  const [firstName, ...lastName] = profile.name.split(" ");
  const servicesWithExamples = serviceDetails.map((service) => ({
    ...service,
    example: projects.find((project) => project.title === service.exampleTitle),
  }));
  const offers = packages.map((item) => {
    const example = projects.find((project) => project.title === item.exampleTitle);
    if (!example) throw new Error(`Unknown example project for package ${item.name}: ${item.exampleTitle}`);
    return { ...item, example };
  });
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

  return (
    <>
      <div className="cursor" aria-hidden="true">
        <span className="cursor-dot" />
        <span className="cursor-ring" />
      </div>

      <header className="nav">
        <a href="#home" className="logo" aria-label={`YA. - ${profile.name} home`}>
          YA<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <span className="nav-pill" aria-hidden="true" />
          <span className="nav-hover-pill" aria-hidden="true" />
          {navigation.map((item) => <a href={item.href} data-nav={item.href.slice(1)} key={item.href}><span className="nav-link-text"><span className="nav-link-label">{item.label}</span><span className="nav-link-echo" aria-hidden="true">{item.label}</span></span></a>)}
        </nav>
        <div className="nav-tools"><DownloadCvButton className="nav-cv" /><ThemeToggle /></div>
        <button className="menu-btn" aria-label="Open menu" aria-expanded="false">
          <span />
          <span />
        </button>
      </header>

      <div className="mobile-menu" aria-hidden="true" inert>
        {navigation.map((item) => <a href={item.href} key={item.href}>{item.mobileLabel ?? item.label}</a>)}
      </div>

      <div className="stage" aria-hidden="true">
        <Image
          className="stage-img"
          src="/images/profile/youssef-portrait.webp"
          alt=""
          width={1122}
          height={1402}
          sizes={heroPortraitSizes}
          priority
          fetchPriority="high"
        />
      </div>

      <main id="main-content" tabIndex={-1}>
        <section id="home" className="scene hero" data-scene="home">
          <div className="hero-bigname deco" aria-hidden="true"><span>YOUSSEF</span></div>

          <div className="fg hero-copy">
            <h1 className="hero-heading">
              <span className="label rv hero-name"><b aria-hidden="true">(00)</b> — {profile.name}</span>{" "}
              <span className="display hero-title">
                <span className="line"><span className="rv-up">FRONTEND</span></span>{" "}
                <span className="line red"><span className="rv-up" style={{ "--d": ".12s" } as CSSProperties}>DEVELOPER</span></span>
              </span>
            </h1>
            <p className="lede rv" style={{ "--d": ".25s" } as CSSProperties}>
              {profile.hero.summary}
            </p>
            <div className="cta rv" style={{ "--d": ".35s" } as CSSProperties}>
              <a href="#work" className="btn btn-red">Explore Projects <i>↗</i></a>
              <a href="#contact-project-form" className="btn btn-ghost">Discuss a project</a>
              <DownloadCvButton className="hero-cv" />
            </div>
          </div>

          <Image
            className="m-photo hero-mphoto"
            src="/images/profile/youssef-portrait.webp"
            alt={`Portrait of ${profile.name}`}
            width={1122}
            height={1402}
            sizes={heroPortraitSizes}
            priority
            fetchPriority="high"
          />

          <div className="fg hero-meta rv" style={{ "--d": ".5s" } as CSSProperties}>
            <div><span className="mono-k">Open to</span><span>Frontend roles &amp; freelance projects</span></div>
            <div className="hero-strengths"><span className="mono-k">Core strengths</span><span className="hero-strengths-list">JavaScript · React · Next.js · TypeScript</span></div>
          </div>
          <a href="#about" className="fg scroll-cue" aria-label="Scroll to About"><span />Scroll</a>
        </section>

        <section id="about" className="scene about" data-scene="about">
          <div className="about-glow deco" aria-hidden="true" />

          <div className="fg split-right">
            <p className="label rv"><b>(01)</b> — About me</p>
            <h2 className="display h2 rv">Clarity in<br /><span className="red">every interaction.</span></h2>
            <div className="about-text">
              <p className="rv">I&apos;m {profile.name}, a frontend developer based in {profile.location}. I build responsive websites and React interfaces with JavaScript and TypeScript, with a focus on clear navigation, accessible interactions, and maintainable code.</p>
              <p className="rv">Across my projects, I keep components organized and UI states deliberate so the code remains maintainable as the product grows. I value the balance of visual quality, usability, and reliable behavior because each interface should serve both its users and its product team.</p>
            </div>

            <dl className="facts rv">
              <div className="fact"><dt>Role</dt><dd>Frontend<small>Developer</small></dd></div>
              <div className="fact"><dt>Core stack</dt><dd>React + TS<small>JavaScript (ES6+)</small></dd></div>
              <div className="fact"><dt>Strength</dt><dd>Responsive<small>Clear, interactive UI</small></dd></div>
              <div className="fact red-fact"><dt>Available for</dt><dd>Roles &amp; freelance<small>Focused projects</small></dd></div>
            </dl>
          </div>
        </section>

        <PortfolioWork initialProjects={projects} />

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

          <Image className="m-photo orbit-mphoto" src="/images/profile/youssef-portrait.webp" alt="" width={1122} height={1402} sizes="(max-width: 999px) 92vw, 48vw" />

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

        <section id="services" aria-labelledby="services-title" className="scene stack service-stack" data-scene="layers">
          <div className="fg stack-inner">
            <div className="stack-head">
              <p className="label rv"><b>(05)</b> — Services</p>
              <h2 className="display h2 rv" id="services-title">Digital work.<br /><span className="red">Built around you.</span></h2>
              <p className="stack-sub rv">Choose a service or keep scrolling to explore what it includes.</p>
            </div>
            <ServiceExplorer services={servicesWithExamples} />
          </div>
        </section>

        <section id="process" className="scene process" data-scene="process">
          <div className="fg process-inner">
            <p className="label rv"><b>(06)</b> — From idea to launch</p>
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

        <section id="pricing" className="scene awards" data-scene="awards" aria-labelledby="offer-title">
          <div className="fg awards-inner">
            <ProjectOffer offers={offers} whatsappUrl={profile.socialLinks.whatsapp} />

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
                        <h3>{card.title}</h3>
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
          <div className="fg contact-top">
            <p className="label"><b>(08)</b> — Contact</p>
            <h2 className="display contact-head">Make your next idea<br /><span>feel at home online.</span></h2>
            <p className="contact-lede">Tell me what you are working toward. We can shape the right frontend experience, agree on a clear scope, and take it one step at a time.</p>
            <a className="btn btn-dark" href="#contact-project-form">Discuss your project <i aria-hidden="true">↗</i></a>
          </div>

          <div className="fg contact-bottom">
            <div className="contact-id">
              <p className="display contact-name">{firstName}<br />{lastName.join(" ")}</p>
              <p className="contact-name-ar" lang="ar"><bdi>{profile.nameArabic}</bdi></p>
              <p className="contact-open">Open to focused projects and frontend roles</p>
              <a href={`mailto:${profile.email}`} className="contact-mail">{profile.email}</a>
            </div>
            <div className="contact-portrait" aria-hidden="true">
              <Image className="contact-portrait-mobile" src="/images/profile/youssef-portrait.webp" alt="" width={1122} height={1402} sizes="(max-width: 999px) 75vw, 1px" />
            </div>
            <ul className="contact-links">
              <li><a href={`mailto:${profile.email}`}><span>Email me</span><i>↗</i></a></li>
              <li><a href={`tel:${profile.phone}`}><span>Call · {profile.phoneDisplay}</span><i>↗</i></a></li>
              <li><a href={profile.socialLinks.whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><i>↗</i></a></li>
              <li><a href={profile.socialLinks.github} target="_blank" rel="noreferrer"><span>GitHub</span><i>↗</i></a></li>
              <li><a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><i>↗</i></a></li>
              <li><a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer"><span>Instagram</span><i>↗</i></a></li>
              <li><a href={profile.socialLinks.facebook} target="_blank" rel="noreferrer"><span>Facebook</span><i>↗</i></a></li>
            </ul>
          </div>

          <div className="fg brief-wrap">
            <ProjectBriefForm whatsappUrl={profile.socialLinks.whatsapp} packageChoices={packages.map(({ id, name, projectType, budget }) => ({ id, name, projectType, budget }))} />
          </div>

          <footer className="fg footer">
            <span>© <span className="yr">2026</span> {profile.name}. All rights reserved.</span>
            <a href="#home">Back to top ↑</a>
          </footer>
        </section>
      </main>
      <FloatingContact whatsappUrl={profile.socialLinks.whatsapp} />
      <PortfolioInteractions />
    </>
  );
}
