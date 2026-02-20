import { useEffect, useRef, useState } from 'react';
import {
  Palette,
  Code,
  Megaphone,
  LineChart,
  Search,
  Globe
} from 'lucide-react';

const services = [
  {
    id: 1,
    icon: Palette,
    title: 'Web Design',
    description: 'We create stunning, user-centric designs that capture your brand essence and engage your audience. From wireframes to high-fidelity mockups, every pixel is crafted with purpose.',
    features: ['UI/UX Design', 'Responsive Design', 'Prototyping', 'Design Systems'],
    color: '#F1FE42',
  },
  {
    id: 2,
    icon: Code,
    title: 'Development',
    description: 'Clean, scalable code that powers your digital presence. We build fast, secure, and maintainable applications using cutting-edge technologies.',
    features: ['React/Next.js', 'Node.js', 'Database Design', 'API Integration'],
    color: '#00BFFF',
  },
  {
    id: 3,
    icon: Megaphone,
    title: 'Branding',
    description: 'Build a memorable brand identity that resonates with your target audience. We craft visual systems that tell your story.',
    features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
    color: '#FF6B6B',
  },
  {
    id: 4,
    icon: LineChart,
    title: 'Marketing',
    description: 'Data-driven digital marketing strategies that drive growth. We help you reach, engage, and convert your ideal customers.',
    features: ['Content Strategy', 'Analytics', 'Conversion Rate', 'Social Media'],
    color: '#00FF88',
  },
  {
    id: 5,
    icon: Search,
    title: 'SEO & GEO',
    description: 'Get found on Google and AI-powered search. We boost your rankings across traditional and generative search engines so customers find you first.',
    features: ['Search Optimisation', 'Technical Audits', 'Generative Engine Optimisation'],
    color: '#FFD700',
  },
  {
    id: 6,
    icon: Globe,
    title: 'E-Commerce',
    description: 'End-to-end e-commerce solutions that drive sales. From product pages to checkout flows, we optimize every step.',
    features: ['Shopify', 'WooCommerce', 'Custom Solutions', 'Payment Integration'],
    color: '#9B59B6',
  },
];

// Timings for sequential code-like reveal (ms)
const REVEAL_TIMINGS = [0, 80, 160, 350, 430, 510, 590, 670, 750];
const REVEAL_DONE = 1000;

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [revealStep, setRevealStep] = useState(-1);
  const [activeService, setActiveService] = useState<number | null>(1);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const currentRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Code-like sequential reveal — elements snap in one by one
  useEffect(() => {
    if (!isVisible) return;
    const timers = REVEAL_TIMINGS.map((delay, i) =>
      setTimeout(() => setRevealStep(i), delay)
    );
    const doneTimer = setTimeout(() => setHasAnimated(true), REVEAL_DONE);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [isVisible]);

  // Smooth mouse tracking with lerp — viewport-relative for pinned bg
  useEffect(() => {
    let frameId: number;

    const tick = () => {
      const lerp = 0.08;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
      setMousePos({ x: currentRef.current.x, y: currentRef.current.y });
      frameId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    frameId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Shared style for the code-like snap-in transition
  const codeRevealStyle = { transitionTimingFunction: 'steps(4, end)' };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-black"
      style={{ overflowX: 'clip' }}
    >
      {/* Hero Background — sticks to viewport while content scrolls over it */}
      <div className={`sticky top-0 h-screen z-0 overflow-hidden transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img
          src="/project-3.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * -12}px, ${(mousePos.y - 0.5) * -12}px) scale(1.05)`,
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Cursor spotlight — reveals the image underneath */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,255,136,0.12) 0%, transparent 60%)`,
          }}
        />
        {/* Edge blends — soften hero image boundaries */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black z-10" />
      </div>

      {/* Content — pulls up over sticky bg via negative margin, scrolls normally */}
      <div className="relative z-10" style={{ marginTop: '-100vh' }}>
        <div className="min-h-screen flex flex-col justify-center py-24 lg:py-32">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div
                  className={`inline-flex items-center gap-2 mb-6 transition-all duration-200 ${
                    revealStep >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                  }`}
                  style={codeRevealStyle}
                >
                  <div className="w-8 h-[2px] bg-neon-yellow" />
                  <span className="text-neon-yellow text-sm tracking-widest uppercase">
                    What We Do
                  </span>
                  <div className="w-8 h-[2px] bg-neon-yellow" />
                </div>
                <h2
                  className={`text-4xl sm:text-5xl lg:text-6xl font-bold transition-all duration-200 ${
                    revealStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                  }`}
                  style={codeRevealStyle}
                >
                  OUR{' '}
                  <span className="text-gradient">SERVICES</span>
                </h2>
                <p
                  className={`text-white/50 max-w-2xl mx-auto mt-6 transition-all duration-200 ${
                    revealStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                  }`}
                  style={codeRevealStyle}
                >
                  Comprehensive digital solutions tailored to your unique needs.
                  From concept to launch, we're with you every step of the way.
                </p>
              </div>

              {/* Services Accordion */}
              <div className="flex flex-col lg:flex-row gap-4">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`service-slice relative rounded-2xl overflow-hidden cursor-pointer min-h-[200px] lg:h-[400px] ${
                      activeService === service.id ? 'lg:flex-[4]' : 'lg:flex-1'
                    } ${
                      revealStep >= 3 + index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                    }`}
                    style={{
                      transition: hasAnimated
                        ? 'flex 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                        : 'flex 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms steps(4, end), transform 200ms steps(4, end)',
                    }}
                    onMouseEnter={() => setActiveService(service.id)}
                  >
                    <div
                      className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                        activeService === service.id
                          ? 'bg-omega-dark'
                          : 'bg-white/5'
                      }`}
                    />

                    {/* Border Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl transition-all duration-300 ease-in-out"
                      style={{
                        border: `2px solid ${activeService === service.id ? service.color : 'rgba(255,255,255,0.1)'}`,
                        boxShadow: activeService === service.id ? `0 0 30px ${service.color}30` : 'none',
                      }}
                    />

                    <div className="relative h-full p-6 lg:p-8 flex flex-col">
                      {/* Icon */}
                      <div
                        className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center mb-6"
                        style={{
                          backgroundColor: `${service.color}20`,
                        }}
                      >
                        <service.icon
                          className="w-7 h-7 transition-transform duration-300 ease-in-out"
                          style={{ color: service.color }}
                        />
                      </div>

                      {/* Title - Always Visible */}
                      <h3
                        className={`text-xl lg:text-2xl font-bold mb-4 transition-all duration-300 ease-in-out ${
                          activeService === service.id ? '' : 'lg:writing-mode-vertical'
                        }`}
                        style={{
                          color: activeService === service.id ? service.color : 'white',
                        }}
                      >
                        {service.title}
                      </h3>

                      {/* Content - Only visible when active */}
                      <div
                        className={`flex-1 transition-all duration-300 ease-in-out ${
                          activeService === service.id
                            ? 'opacity-100 translate-y-0 delay-200'
                            : 'opacity-0 translate-y-4 pointer-events-none absolute delay-0'
                        }`}
                      >
                        <p className="text-white/60 mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Number */}
                      <div
                        className={`absolute bottom-6 right-6 text-6xl font-bold transition-all duration-300 ease-in-out ${
                          activeService === service.id ? 'opacity-20' : 'opacity-10'
                        }`}
                        style={{ color: service.color }}
                      >
                        0{service.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
