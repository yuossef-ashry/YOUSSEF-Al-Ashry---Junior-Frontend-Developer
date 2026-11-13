"use client";

import { useEffect } from "react";

type OrbitPill = HTMLElement & { phase: number };

export default function PortfolioInteractions() {
  useEffect(() => {
    const $ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
      root.querySelector<T>(selector);
    const $$ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
      Array.from(root.querySelectorAll<T>(selector));

    const body = document.body;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = () => window.innerWidth >= 1000;
    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));
    const observers: IntersectionObserver[] = [];
    const timers = new Set<number>();
    const frames = new Set<number>();
    const disposers: Array<() => void> = [];
    let disposed = false;

    const createObserver = (
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit,
    ) => {
      const observer = new IntersectionObserver(callback, options);
      observers.push(observer);
      return observer;
    };

    const later = (callback: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        callback();
      }, delay);
      timers.add(id);
      return id;
    };

    const cancelLater = (id: number | undefined) => {
      if (id === undefined) return;
      window.clearTimeout(id);
      timers.delete(id);
    };

    const frame = (callback: FrameRequestCallback) => {
      const id = window.requestAnimationFrame((time) => {
        frames.delete(id);
        callback(time);
      });
      frames.add(id);
      return id;
    };

    // Intro
    const markLoaded = () =>
      frame(() => {
        body.classList.add("loaded");
        $$(".hero .rv").forEach((element) => element.classList.add("in"));
      });
    if (document.readyState === "complete") markLoaded();
    else {
      window.addEventListener("load", markLoaded);
      disposers.push(() => window.removeEventListener("load", markLoaded));
    }
    later(markLoaded, 1800);
    $$(".yr").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });

    // Scene changes drive the traveling portrait and navigation pill.
    const navMap: Record<string, string | null> = {
      home: null,
      about: "about",
      work: "work",
      journey: "journey",
      orbit: "toolkit",
      layers: "services",
      "service-details": "service-details",
      process: "process",
      awards: "pricing",
      contact: "contact",
    };
    const navLinks = $$(".nav-links a") as HTMLAnchorElement[];
    const pill = $(".nav-pill") as HTMLElement | null;

    function movePill(link: HTMLAnchorElement | null) {
      if (!pill) return;
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.opacity = "1";
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.transform = `translateX(${link.offsetLeft}px)`;
    }

    function setScene(name: string) {
      if (body.dataset.scene === name) return;
      body.dataset.scene = name;
      const key = navMap[name];
      let active: HTMLAnchorElement | null = null;
      navLinks.forEach((link) => {
        const on = link.dataset.nav === key;
        link.classList.toggle("is-active", on);
        if (on) active = link;
      });
      movePill(active);
    }

    const sceneObserver = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const scene = (entry.target as HTMLElement).dataset.scene;
            if (scene) setScene(scene);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    $$<HTMLElement>("[data-scene]").forEach((section) => {
      if (section !== body) sceneObserver.observe(section);
    });

    const navResize = () => movePill($(".nav-links a.is-active") as HTMLAnchorElement | null);
    window.addEventListener("resize", navResize);
    disposers.push(() => window.removeEventListener("resize", navResize));

    // Reveal elements as they enter the viewport.
    const revealObserver = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    $$(".rv").forEach((element) => revealObserver.observe(element));

    const contact = $("#contact") as HTMLElement | null;
    if (contact) {
      createObserver(
        ([entry]) => {
          if (entry?.isIntersecting) contact.classList.add("in");
        },
        { threshold: 0.25 },
      ).observe(contact);
    }

    // Sticky project stepper.
    const work = $("#work") as HTMLElement | null;
    let projects = $$(".project") as HTMLElement[];
    const curWrap = $(".w-cur") as HTMLElement | null;
    const curNum = $(".w-cur span") as HTMLElement | null;
    const totalNum = $(".w-tot") as HTMLElement | null;
    const bar = $(".w-bar i") as HTMLElement | null;
    let currentProject = 0;

    function showProject(index: number) {
      if (index === currentProject || !curWrap || !curNum) return;
      projects.forEach((project, projectIndex) => {
        project.classList.toggle("is-leaving", projectIndex === currentProject);
        project.classList.toggle("is-active", projectIndex === index);
      });
      later(
        () =>
          projects.forEach((project, projectIndex) => {
            if (projectIndex !== index) project.classList.remove("is-leaving");
          }),
        700,
      );
      currentProject = index;
      curWrap.classList.add("flip");
      later(() => {
        curNum.textContent = String(index + 1).padStart(2, "0");
        curWrap.classList.remove("flip");
      }, 260);
    }

    function updateWork() {
      if (!isDesktop() || !work || !bar || projects.length === 0) return;
      const rect = work.getBoundingClientRect();
      const total = work.offsetHeight - window.innerHeight;
      const progress = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
      showProject(Math.min(projects.length - 1, Math.floor(progress * projects.length)));
    }

    const refreshProjects = () => {
      projects = $$(".project") as HTMLElement[];
      currentProject = 0;
      projects.forEach((project, index) => {
        project.classList.remove("is-leaving");
        project.classList.toggle("is-active", index === 0);
      });
      if (curNum) curNum.textContent = "01";
      if (curWrap) curWrap.classList.remove("flip");
      if (totalNum) totalNum.textContent = `/ ${String(projects.length).padStart(2, "0")}`;
      if (bar) bar.style.transform = "scaleX(0)";
      updateWork();
    };
    window.addEventListener("portfolio:filter-change", refreshProjects);
    disposers.push(() => window.removeEventListener("portfolio:filter-change", refreshProjects));

    // Journey timeline year.
    const yearElement = $(".j-year") as HTMLElement | null;
    const steps = $$(".j-step") as HTMLElement[];
    let shownYear = yearElement?.textContent ?? "";
    let pendingYear: string | null = null;

    function updateJourney() {
      if (!yearElement || steps.length === 0) return;
      const line = window.innerHeight * 0.55;
      let current = steps[0];
      steps.forEach((step) => {
        if (step.getBoundingClientRect().top < line) current = step;
      });
      steps.forEach((step) => step.classList.toggle("is-current", step === current));
      const year = current.dataset.year;
      if (!year || year === shownYear || year === pendingYear) return;
      pendingYear = year;
      yearElement.classList.add("swap");
      later(() => {
        yearElement.textContent = pendingYear;
        shownYear = pendingYear ?? "";
        pendingYear = null;
        yearElement.classList.remove("swap");
      }, 260);
    }

    // Toolkit orbit.
    const orbit = $("#toolkit") as HTMLElement | null;
    const field = $(".orbit-field") as HTMLElement | null;
    const pills = field ? ($$(".pill", field) as OrbitPill[]) : [];
    const ringElements = $$(".orbit-rings i") as HTMLElement[];
    const mobilePhoto = $(".orbit-mphoto") as HTMLImageElement | null;
    const rings = [
      { rx: 0.19, ry: 0.1, tilt: -9, speed: 0.00023 },
      { rx: 0.28, ry: 0.16, tilt: 6, speed: -0.00016 },
      { rx: 0.37, ry: 0.22, tilt: -4, speed: 0.00011 },
    ];
    const perRing = [0, 0, 0];
    pills.forEach((pillElement) => {
      const ring = Number(pillElement.dataset.ring);
      if (perRing[ring] !== undefined) perRing[ring] += 1;
    });
    const seen = [0, 0, 0];
    pills.forEach((pillElement) => {
      const ring = Number(pillElement.dataset.ring);
      pillElement.phase = (seen[ring]++ / perRing[ring]) * Math.PI * 2 + ring * 0.7;
    });

    let geometry: {
      cx: number;
      cy: number;
      sx: number;
      sy: number;
    } | null = null;

    function measureOrbit() {
      if (!orbit || !mobilePhoto) return;
      const width = orbit.clientWidth;
      const height = orbit.clientHeight;
      if (isDesktop()) {
        geometry = { cx: width * 0.5, cy: height * 0.6, sx: width, sy: height };
        ringElements.forEach((element, index) => {
          const ring = rings[index];
          if (!ring) return;
          element.style.width = `${ring.rx * 2 * width}px`;
          element.style.height = `${ring.ry * 2 * height}px`;
          element.style.setProperty("--t", `${ring.tilt}deg`);
        });
      } else {
        const photoRect = mobilePhoto.getBoundingClientRect();
        const orbitRect = orbit.getBoundingClientRect();
        geometry = {
          cx: photoRect.left - orbitRect.left + photoRect.width / 2,
          cy: photoRect.top - orbitRect.top + photoRect.height * 0.38,
          sx: Math.min(width, 620) * 1.02,
          sy: photoRect.height * 2.3,
        };
      }
      drawOrbit(reduceMotion ? 0 : performance.now());
    }

    let orbitVisible = false;
    if (orbit) {
      createObserver(
        ([entry]) => {
          orbitVisible = Boolean(entry?.isIntersecting);
        },
        { rootMargin: "100px" },
      ).observe(orbit);
    }

    function drawOrbit(time: number) {
      if (!geometry) return;
      pills.forEach((pillElement) => {
        const ring = rings[Number(pillElement.dataset.ring)];
        if (!ring) return;
        const angle = pillElement.phase + time * ring.speed;
        const ellipseX = Math.cos(angle) * ring.rx * geometry!.sx;
        const ellipseY = Math.sin(angle) * ring.ry * geometry!.sy;
        const tilt = (ring.tilt * Math.PI) / 180;
        const x = geometry!.cx + ellipseX * Math.cos(tilt) - ellipseY * Math.sin(tilt);
        const y = geometry!.cy + ellipseX * Math.sin(tilt) + ellipseY * Math.cos(tilt);
        const depth = Math.sin(angle);
        const scale = 0.8 + (0.2 * (depth + 1)) / 2;
        pillElement.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        pillElement.style.zIndex = depth < -0.05 ? "0" : "3";
        pillElement.style.opacity = depth < 0 ? (0.5 + 0.5 * (1 + depth)).toFixed(2) : "1";
      });
    }

    // Count-up stats.
    const countObserver = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          const target = Number.parseFloat(element.dataset.count ?? "0");
          const decimals = Number(element.dataset.dec ?? "0");
          const padding = Number(element.dataset.pad ?? "0");
          const format = (value: number) => {
            const text = value.toFixed(decimals);
            return padding ? text.padStart(padding, "0") : text;
          };
          if (reduceMotion) {
            element.textContent = format(target);
            return;
          }
          const startedAt = performance.now();
          const duration = 1400;
          const tick: FrameRequestCallback = (now) => {
            const progress = clamp((now - startedAt) / duration, 0, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = format(target * eased);
            if (progress < 1) frame(tick);
          };
          frame(tick);
        });
      },
      { threshold: 0.6 },
    );
    $$<HTMLElement>("[data-count]").forEach((element) => countObserver.observe(element));

    // Custom cursor for fine pointers.
    const cursor = $(".cursor") as HTMLElement | null;
    const dot = $(".cursor-dot") as HTMLElement | null;
    const cursorRing = $(".cursor-ring") as HTMLElement | null;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let cursorDirty = false;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer && cursor && dot && cursorRing) {
      const mouseMove = (event: MouseEvent) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursorDirty = true;
        cursor.classList.add("is-on");
      };
      const mouseOver = (event: MouseEvent) => {
        const target = event.target;
        cursor.classList.toggle(
          "is-hover",
          target instanceof Element && Boolean(target.closest("a, button, .layer, .stat, .cert")),
        );
      };
      window.addEventListener("mousemove", mouseMove, { passive: true });
      document.addEventListener("mouseover", mouseOver);
      disposers.push(() => window.removeEventListener("mousemove", mouseMove));
      disposers.push(() => document.removeEventListener("mouseover", mouseOver));
    }

    // Mobile menu.
    const menuButton = $(".menu-btn") as HTMLButtonElement | null;
    const menu = $(".mobile-menu") as HTMLElement | null;
    if (menuButton && menu) {
      const toggleMenu = (open: boolean) => {
        body.classList.toggle("menu-open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        menu.setAttribute("aria-hidden", String(!open));
        menu.inert = !open;
      };
      const menuButtonClick = () => toggleMenu(!body.classList.contains("menu-open"));
      menuButton.addEventListener("click", menuButtonClick);
      disposers.push(() => menuButton.removeEventListener("click", menuButtonClick));
      $$("a", menu).forEach((link) => {
        const menuLinkClick = () => toggleMenu(false);
        link.addEventListener("click", menuLinkClick);
        disposers.push(() => link.removeEventListener("click", menuLinkClick));
      });
    }

    // Scroll work and timeline; debounce resize measurements.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame(() => {
        updateWork();
        updateJourney();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    disposers.push(() => window.removeEventListener("scroll", onScroll));

    let resizeTimer: number | undefined;
    const onResize = () => {
      cancelLater(resizeTimer);
      resizeTimer = later(() => {
        measureOrbit();
        updateWork();
      }, 120);
    };
    window.addEventListener("resize", onResize);
    disposers.push(() => window.removeEventListener("resize", onResize));

    function loop(time: number) {
      if (!document.hidden && body.style.overflow !== "hidden") {
        if ((orbitVisible && !reduceMotion) || !geometry) drawOrbit(reduceMotion ? 0 : time);
        if (finePointer && dot && cursorRing && (cursorDirty || Math.abs(mouseX - ringX) > .1 || Math.abs(mouseY - ringY) > .1)) {
          ringX = reduceMotion ? mouseX : ringX + (mouseX - ringX) * .18;
          ringY = reduceMotion ? mouseY : ringY + (mouseY - ringY) * .18;
          dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
          cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
          cursorDirty = false;
        }
      }
      if (!disposed) frame(loop);
    }

    const start = () => {
      measureOrbit();
      drawOrbit(0);
      updateWork();
      updateJourney();
      frame(loop);
    };
    if (mobilePhoto && !mobilePhoto.complete) {
      const onPhotoLoad = () => measureOrbit();
      mobilePhoto.addEventListener("load", onPhotoLoad, { once: true });
      disposers.push(() => mobilePhoto.removeEventListener("load", onPhotoLoad));
    }
    start();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (disposed) return;
        measureOrbit();
        movePill($(".nav-links a.is-active") as HTMLAnchorElement | null);
      });
    }

    return () => {
      disposed = true;
      disposers.forEach((dispose) => dispose());
      observers.forEach((observer) => observer.disconnect());
      timers.forEach((timer) => window.clearTimeout(timer));
      frames.forEach((frameId) => window.cancelAnimationFrame(frameId));
      body.classList.remove("menu-open");
    };
  }, []);

  return null;
}
