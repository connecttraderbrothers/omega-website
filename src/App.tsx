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
  const [phase, setPhase] = useState<'loading' | 'name' | 'fadeout' | 'done'>('loading');

  useEffect(() => {
    // Phase 1: Loading bar fills over ~2s
    let frame: number;
    let start: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);

      if (p < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setPhase('name');
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase === 'name') {
      // Company name fades in, hold for 1.4s, then fade out
      const timer = setTimeout(() => setPhase('fadeout'), 1400);
      return () => clearTimeout(timer);
    }
    if (phase === 'fadeout') {
      // Splash fades out over 0.8s, then unmount
      const timer = setTimeout(() => setPhase('done'), 800);
      return () => clearTimeout(timer);
    }
    if (phase === 'done') {
      const timer = setTimeout(onComplete, 100);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black transition-opacity ${
        phase === 'fadeout' || phase === 'done' ? 'opacity-0 duration-700' : 'opacity-100 duration-300'
      }`}
      style={{ pointerEvents: phase === 'done' ? 'none' : 'auto' }}
    >
      {/* Loading bar */}
      <div
        className={`relative w-64 sm:w-80 transition-opacity duration-500 ${
          phase === 'loading' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #F1FE42, #00BFFF)',
            }}
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-xs tracking-[0.25em] text-white/40 font-mono">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Company name — fades in after loading bar completes */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
          phase === 'name' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wider">
            <span className="text-gradient">OMEGA</span>
          </h2>
          <p className="text-lg sm:text-xl font-light text-white/70 tracking-widest mt-1">
            DIGITAL
          </p>
        </div>
      </div>
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
    <div ref={mainRef} className="relative min-h-screen bg-black text-white" style={{ overflowX: 'clip' }}>
      {/* Splash Screen */}
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation scrollY={scrollY} />
      
      {/* Main Content */}
      <main>
        {/* Hero group — Hero stays fixed while Introduction slides over */}
        <div className="relative">
          <div className="sticky top-0 z-0">
            <Hero />
          </div>
          <div className="relative z-10">
            <Introduction />
          </div>
        </div>

        <Services />
        <Process />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
