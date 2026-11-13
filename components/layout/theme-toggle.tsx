"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let nextDark = prefersDark;
    try {
      const saved = window.localStorage.getItem("youssef-portfolio-theme");
      if (saved === "dark" || saved === "light") nextDark = saved === "dark";
    } catch {
      nextDark = prefersDark;
    }
    const frame = window.requestAnimationFrame(() => {
      setDark(nextDark);
      document.body.dataset.theme = nextDark ? "dark" : "light";
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.body.dataset.theme = nextDark ? "dark" : "light";
    try {
      window.localStorage.setItem("youssef-portfolio-theme", nextDark ? "dark" : "light");
    } catch {
      return;
    }
  }

  return (
    <button
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <span aria-hidden="true">{dark ? "☼" : "◐"}</span>
    </button>
  );
}
