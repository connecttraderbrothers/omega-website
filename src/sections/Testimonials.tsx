import { useEffect, useRef, useState } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Milosz Sawczak.',
    role: 'Director',
    image: '/client-1.jpg',
    quote: 'In the construction business, we know that a project is only as good as its foundation. When it came time to build our digital presence, Omega proved they are the master contractors of the web. They didn’t just build us a "pretty" site; they built a high-performance lead-generation machine.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dean Finlayson',
    role: 'Founder',
    image: '/client-2.jpg',
    quote: 'As a "growth partner" deeply embedded in the world of AI-driven automations, we at Level One have a pretty high bar when it comes to digital infrastructure. We spend our days optimizing workflows and building future-ready systems, so we knew our own brand identity needed to reflect that same level of precision and innovation. Omega didn't just meet that bar, they cleared it comfortably.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Founder, StartupXYZ',
    image: '/client-3.jpg',
    quote: 'The team is incredibly talented and professional. They took our vague ideas and turned them into a stunning reality. Highly recommended!',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/10 rounded-full blur-[150px]" />
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
                Testimonials
              </span>
              <div className="w-8 h-[2px] bg-neon-yellow" />
            </div>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              CLIENT{' '}
              <span className="text-gradient">VOICES</span>
            </h2>
            <p
              className={`text-white/50 max-w-2xl mx-auto mt-6 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Don't just take our word for it. Here's what our clients have to say 
              about working with us.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${300 + index * 150}ms`,
                  animation: isVisible && hoveredCard !== testimonial.id ? `float ${5 + index}s ease-in-out infinite` : 'none',
                  animationDelay: `${index * 0.5}s`,
                }}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`relative p-8 rounded-2xl bg-omega-dark border transition-all duration-500 ${
                    hoveredCard === testimonial.id
                      ? 'border-neon-yellow/50 shadow-neon scale-105'
                      : 'border-white/10'
                  }`}
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-neon-yellow flex items-center justify-center">
                    <Quote className="w-5 h-5 text-black" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-neon-yellow text-neon-yellow"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white/70 leading-relaxed mb-8 text-lg">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-white/50">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div
                    className={`absolute bottom-0 right-0 w-20 h-20 opacity-10 transition-opacity duration-500 ${
                      hoveredCard === testimonial.id ? 'opacity-20' : ''
                    }`}
                  >
                    <div className="absolute bottom-4 right-4 text-6xl font-bold text-neon-yellow">
                      "
                    </div>
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
