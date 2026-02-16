import { useEffect, useRef, useState, useCallback } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Introduction from './sections/Introduction';
import Services from './sections/Services';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// ─── Splash Screen ────────────────────────────────────────────
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'logo' | 'shine' | 'done'>('loading');

  useEffect(() => {
    // Phase 1: Loading bar fills over ~2.2s
    let frame: number;
    let start: number | null = null;
    const duration = 2200;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease-out curve for a smooth fill
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);

      if (p < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        // Phase 2: Fade in logo
        setPhase('logo');
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase === 'logo') {
      // Logo fades in for 1s, then hold for 0.6s, then shine
      const timer = setTimeout(() => setPhase('shine'), 1600);
      return () => clearTimeout(timer);
    }
    if (phase === 'shine') {
      // Shine flash for 0.8s, then done
      const timer = setTimeout(() => setPhase('done'), 800);
      return () => clearTimeout(timer);
    }
    if (phase === 'done') {
      // Let the fade-out animation finish before unmounting
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black transition-opacity duration-600 ${
        phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Logo — fades in during 'logo' phase */}
      <div
        className={`relative mb-12 transition-all duration-1000 ${
          phase === 'loading'
            ? 'opacity-0 scale-90'
            : 'opacity-100 scale-100'
        }`}
      >
        <div className="w-40 h-40 sm:w-52 sm:h-52 relative">
          <img
            src="/hero-logo-circle.png"
            alt="Omega Digital"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Glow behind logo */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
            phase !== 'loading' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-[60%] h-[60%] bg-neon-yellow/30 blur-[60px] rounded-full" />
        </div>
      </div>

      {/* Loading bar — visible during 'loading' phase */}
      <div
        className={`relative w-64 sm:w-80 transition-opacity duration-500 ${
          phase === 'loading' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Bar track */}
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          {/* Bar fill */}
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #F1FE42, #00BFFF)',
            }}
          />
        </div>
        {/* Percentage */}
        <div className="mt-4 text-center">
          <span className="text-xs tracking-[0.25em] text-white/40 font-mono">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Brand text — appears with logo */}
      <div
        className={`absolute bottom-12 transition-all duration-700 delay-300 ${
          phase !== 'loading' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-xs tracking-[0.3em] text-white/30 uppercase">
          Omega Digital
        </span>
      </div>

      {/* Bright shine flash */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          phase === 'shine' ? 'opacity-100 duration-300' : 'opacity-0 duration-500'
        }`}
        style={{
          background: 'radial-gradient(circle at center, rgba(241,254,66,0.6) 0%, rgba(241,254,66,0.2) 30%, rgba(0,191,255,0.1) 50%, transparent 70%)',
        }}
      />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────
function App() {
  const [scrollY, setScrollY] = useState(0);
  const [splashDone, setSplashDone] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  useEffect(() => {
    // Prevent scrolling while splash is active
    if (!splashDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [splashDone]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Splash Screen */}
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation scrollY={scrollY} />
      
      {/* Main Content */}
      <main>
        <Hero />
        <Introduction />
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
