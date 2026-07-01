import { useEffect, useRef, useState } from "react";
import "./HeroSection.css";

const NAV_LINKS = ["Início", "Sobre", "Projetos", "Galeria"];

const VIDEOS = [
  { src: "/videos/hero.mp4", autoPlay: true, loop: false },
  { src: "/videos/hero-2.mp4", autoPlay: false, loop: true },
  { src: "/videos/hero-3.mp4", autoPlay: false, loop: true },
];

const TRANSITION_MS = 700;

export default function HeroSection() {
  const heroRef = useRef(null);
  const videoRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const lockedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onWheel = (e) => {
      const current = activeIndexRef.current;
      const goingDown = e.deltaY > 0 && current < VIDEOS.length - 1;
      const goingUp = e.deltaY < 0 && current > 0;
      if (!goingDown && !goingUp) return;

      e.preventDefault();
      if (lockedRef.current) return;

      const next = goingDown ? current + 1 : current - 1;
      lockedRef.current = true;
      activeIndexRef.current = next;
      setActiveIndex(next);

      videoRefs.current[current]?.pause();
      const incoming = videoRefs.current[next];
      if (incoming) {
        incoming.currentTime = 0;
        incoming.play();
      }

      window.setTimeout(() => {
        lockedRef.current = false;
      }, TRANSITION_MS);
    };

    hero.addEventListener("wheel", onWheel, { passive: false });
    return () => hero.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div
        className="hero__video-track"
        style={{
          width: `${VIDEOS.length * 100}%`,
          transform: `translateX(-${activeIndex * (100 / VIDEOS.length)}%)`,
        }}
      >
        {VIDEOS.map((video, i) => (
          <video
            key={video.src}
            ref={(el) => (videoRefs.current[i] = el)}
            className="hero__video"
            src={video.src}
            autoPlay={video.autoPlay}
            muted
            loop={video.loop}
            playsInline
            style={{ width: `${100 / VIDEOS.length}%` }}
          />
        ))}
      </div>
      <div className="hero__overlay" />

      <nav className="hero__nav">
        <div className="hero__nav-pill">
          <span className="hero__logo">
            Arch<span className="hero__logo-fade">itects</span>
          </span>
          <div className="hero__nav-divider" />
          <div className="hero__nav-links">
            {NAV_LINKS.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>
        </div>
        <div className="hero__nav-cta">
          <span className="hero__nav-cta-dot" />
          Fale Conosco
        </div>
      </nav>

      <div className="hero__heading">
        <h1>
          Arch<span className="hero__heading-fade">itects</span>
          <br />
          <span className="hero__heading-fade">&amp; Interiores</span>
        </h1>
      </div>

      <div className="hero__intro">
        <p>
          Na Arch, unimos inovação e design atemporal para criar espaços que
          inspiram. Nossa arquitetura equilibra estética, funcionalidade e
          sustentabilidade para um futuro melhor.
        </p>
        <div className="hero__intro-actions">
          <div className="hero__btn hero__btn--ghost">Ver Projetos</div>
          <div className="hero__btn hero__btn--solid">Fale Conosco</div>
        </div>
      </div>

      <div className="hero__dots">
        {VIDEOS.map((video, i) => (
          <span
            key={video.src}
            className={`hero__dot${i === activeIndex ? " hero__dot--active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
