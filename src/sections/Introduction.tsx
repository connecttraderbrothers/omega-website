import { useEffect, useRef, useState } from 'react';
import { Sparkles, Zap, Target, Code2 } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Creative Design',
    description: 'Stunning visuals that capture your brand essence',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Optimized, scalable, and maintainable development',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Lightning-fast load times and smooth interactions',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Focused on conversions and business growth',
  },
];

export default function Introduction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="introduction"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute inset-0 bg-gradient-to-l from-neon-cyan/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              {/* Section Label */}
              <div
                className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-8 h-[2px] bg-neon-yellow" />
                <span className="text-neon-yellow text-sm tracking-widest uppercase">
                  About Us
                </span>
              </div>

              {/* Heading */}
              <h2
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Welcome to{' '}
                <span className="text-gradient">OMEGA</span>
                <br />
                <span className="font-light text-white/80">DIGITAL</span>
              </h2>

              {/* Description */}
              <div
                className={`space-y-6 text-white/60 text-lg leading-relaxed transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <p>
                  We are a creative web design and development studio based in Edinburgh, 
                  dedicated to crafting immersive digital experiences that captivate and convert.
                </p>
                <p>
                  Our team of designers, developers, and strategists work together to bring 
                  your vision to life. We believe in the power of great design and clean code 
                  to transform businesses and create lasting impressions.
                </p>
                <p>
                  From startups to enterprise clients, we approach every project with the same 
                  level of passion and commitment to excellence.
                </p>
              </div>

              {/* CTA */}
              <div
                className={`mt-10 transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-neon-yellow hover:gap-4 transition-all duration-300"
                >
                  <span className="font-semibold">Discover Our Services</span>
                  <span className="text-xl">â†’</span>
                </a>
              </div>
            </div>

            {/* Right Content - Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-yellow/50 hover:bg-white/10 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-neon-yellow/10 flex items-center justify-center mb-4 group-hover:bg-neon-yellow/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-neon-yellow" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
