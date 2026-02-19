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

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Allow entrance stagger to finish before switching to fast hover transitions
          const lastCardDelay = 400 + (services.length - 1) * 150;
          setTimeout(() => setHasAnimated(true), lastCardDelay + 700);
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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-yellow/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-8 h-[2px] bg-neon-yellow" />
              <span className="text-neon-yellow text-sm tracking-widest uppercase">
                What We Do
              </span>
              <div className="w-8 h-[2px] bg-neon-yellow" />
            </div>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              OUR{' '}
              <span className="text-gradient">SERVICES</span>
            </h2>
            <p
              className={`text-white/50 max-w-2xl mx-auto mt-6 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
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
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transition: hasAnimated
                    ? 'flex 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'flex 700ms ease-out, opacity 700ms ease-out, transform 700ms ease-out',
                  transitionDelay: hasAnimated ? '0ms' : isVisible ? `${400 + index * 150}ms` : '0ms',
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
    </section>
  );
}
