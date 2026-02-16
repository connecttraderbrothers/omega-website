import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const directionRef = useRef<'forward' | 'reverse'>('forward');
  const drawRafRef = useRef<number | null>(null);
  const reverseRafRef = useRef<number | null>(null);

  // ─── Draw video frame onto canvas (object-fit: cover) ───
  const drawFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match canvas size to its display size
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const cw = rect.width * dpr;
    const ch = rect.height * dpr;

    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }

    // Only draw if video has data
    if (video.readyState >= 2) {
      const vw = video.videoWidth;
      const vh = video.videoHeight;

      if (vw && vh) {
        // Calculate object-fit: cover crop
        const canvasRatio = cw / ch;
        const videoRatio = vw / vh;

        let sx = 0, sy = 0, sw = vw, sh = vh;

        if (videoRatio > canvasRatio) {
          // Video is wider — crop sides
          sw = vh * canvasRatio;
          sx = (vw - sw) / 2;
        } else {
          // Video is taller — crop top/bottom
          sh = vw / canvasRatio;
          sy = (vh - sh) / 2;
        }

        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
      }
    }

    drawRafRef.current = requestAnimationFrame(drawFrame);
  }, []);

  // ─── Reverse playback by stepping currentTime backwards ───
  const stepReverse = useCallback(() => {
    const video = videoRef.current;
    if (!video || directionRef.current !== 'reverse') return;

    if (video.currentTime <= 0.05) {
      // Reached the start — switch back to forward
      directionRef.current = 'forward';
      video.currentTime = 0;
      video.play().catch(() => {});
      return;
    }

    // Step backwards ~30fps
    video.currentTime = Math.max(0, video.currentTime - 0.033);
    reverseRafRef.current = requestAnimationFrame(stepReverse);
  }, []);

  // ─── Video setup + canvas draw loop ───
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted (required for autoplay)
    video.muted = true;
    video.defaultMuted = true;

    // Handle end of video — start reverse
    const handleEnded = () => {
      directionRef.current = 'reverse';
      video.pause();
      reverseRafRef.current = requestAnimationFrame(stepReverse);
    };

    video.addEventListener('ended', handleEnded);

    // Start canvas draw loop immediately
    drawRafRef.current = requestAnimationFrame(drawFrame);

    // Attempt autoplay
    const tryPlay = () => {
      video.play().catch(() => {
        setTimeout(() => video.play().catch(() => {}), 100);
      });
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay, { once: true });

    // Fallback: play on user interaction
    const handleInteraction = () => {
      if (video.paused && directionRef.current === 'forward') {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });

    // Delay hero content animations until after splash screen (~5.2s)
    const splashTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 5200);

    return () => {
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      if (drawRafRef.current) cancelAnimationFrame(drawRafRef.current);
      if (reverseRafRef.current) cancelAnimationFrame(reverseRafRef.current);
      clearTimeout(splashTimer);
    };
  }, [stepReverse, drawFrame]);

  // ─── Mouse parallax ───
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 15, y: y * 15 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Hidden video — data source only, never visible */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
        style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
      >
        <source src="/omega-background.mp4" type="video/mp4" />
      </video>

      {/* Canvas background — renders video frames, no controls ever */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px) scale(1.1)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Poster fallback — shows while video loads, hidden once canvas is drawing */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero-bg-poster.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px) scale(1.1)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(241, 254, 66, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(241, 254, 66, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-yellow/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Glow Effects */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(241,254,66,0.3) 0%, transparent 60%)',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-yellow/30 bg-neon-yellow/5 mb-8 transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <span className="w-2 h-2 bg-neon-yellow rounded-full animate-pulse" />
                <span className="text-sm text-neon-yellow tracking-wide">
                  Web Design & Development
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="mb-6">
                <span
                  className={`block text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-1000 delay-200 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <span className="text-gradient">OMEGA</span>
                </span>
                <span
                  className={`block text-4xl sm:text-5xl lg:text-6xl font-light text-white/90 mt-2 transition-all duration-1000 delay-400 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  DIGITAL
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className={`text-lg sm:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed transition-all duration-1000 delay-600 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                We craft immersive digital experiences that captivate, convert, and elevate your brand to new dimensions.
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-800 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <button
                  onClick={() => scrollToSection('#services')}
                  className="group px-8 py-4 bg-neon-yellow text-black font-semibold rounded-full hover:shadow-neon-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Explore Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:border-neon-yellow hover:text-neon-yellow transition-all duration-300"
                >
                  Start Project
                </button>
              </div>
            </div>

            {/* Right Content - Hero Logo */}
            <div
              className={`relative order-1 lg:order-2 transition-all duration-1500 delay-300 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <div
                className="relative max-w-xs sm:max-w-sm mx-auto"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                {/* Glow Effect Behind Logo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[70%] h-[70%] bg-neon-yellow/25 blur-[80px] rounded-full animate-pulse-glow" />
                </div>

                {/* Hero Logo — tightly clipped so golden rings touch the edge */}
                <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden">
                  <img
                    ref={imageRef}
                    src="/hero-logo-circle.png"
                    alt="Omega Digital"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Subtle outer glow ring */}
                <div className="absolute inset-[-3%] rounded-full border border-neon-yellow/10 pointer-events-none animate-pulse-glow" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <button
          onClick={() => scrollToSection('#introduction')}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-neon-yellow transition-colors"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
