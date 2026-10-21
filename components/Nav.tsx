"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/content/site.config";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " isScrolled" : ""}`}>
      <a href="#top" className="navLogo" aria-label="回到顶部">
        {site.alias}
      </a>

      <nav className="navLinks">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="navCta">
        联系我
      </a>
    </header>
  );
}
