import { useEffect, useRef, useState } from 'react';
import { Search, Lightbulb, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Discovery',
    description: 'We dive deep into understanding your business, goals, target audience, and competitive landscape.',
    details: ['Market Research', 'User Analysis', 'Competitive Audit', 'Goal Definition'],
  },
  {
    id: 2,
    icon: Lightbulb,
    title: 'Strategy',
    description: 'We craft a comprehensive roadmap that aligns with your objectives and sets clear milestones.',
    details: ['Project Planning', 'Technical Architecture', 'Content Strategy', 'Timeline'],
  },
  {
    id: 3,
    icon: PenTool,
    title: 'Design',
    description: 'We create visually stunning designs that bring your brand to life and delight your users.',
    details: ['Wireframing', 'Visual Design', 'Prototyping', 'User Testing'],
  },
  {
    id: 4,
    icon: Code,
    title: 'Develop',
    description: 'We build robust, scalable solutions using cutting-edge technologies and best practices.',
    details: ['Frontend Development', 'Backend Development', 'API Integration', 'Quality Assurance'],
  },
  {
    id: 5,
    icon: Rocket,
    title: 'Launch',
    description: 'We ensure a smooth deployment and provide ongoing support to help you succeed.',
    details: ['Deployment', 'Performance Optimization', 'Training', 'Maintenance'],
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const triggerY = window.innerHeight * 0.55;
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const timelineHeight = timelineRect.height;

      // Determine active step by checking which nodes the trigger line has passed
      let newActiveStep = -1;
      for (let i = 0; i < nodeRefs.current.length; i++) {
        const node = nodeRefs.current[i];
        if (!node) continue;
        const nodeCenter = node.getBoundingClientRect().top + node.offsetHeight / 2;
        if (nodeCenter <= triggerY) {
          newActiveStep = i;
        }
      }
      setActiveStep(newActiveStep);

      // Progress bar: fill from timeline top to the trigger line position,
      // but cap at the last node so it hits 100% exactly when step 5 lights up
      const lastNode = nodeRefs.current[nodeRefs.current.length - 1];
      if (!lastNode) return;
      const lastNodeCenter = lastNode.getBoundingClientRect().top + lastNode.offsetHeight / 2;
      const lastNodeOffset = (lastNodeCenter - timelineRect.top) / timelineHeight;

      const triggerOffset = (triggerY - timelineRect.top) / timelineHeight;
      const progress = lastNodeOffset > 0
        ? Math.max(0, Math.min(1, triggerOffset / lastNodeOffset))
        : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Edge blends — smooth transitions with adjacent sections */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div
              className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-8 h-[2px] bg-neon-yellow" />
              <span className="text-neon-yellow text-sm tracking-widest uppercase">
                How We Work
              </span>
              <div className="w-8 h-[2px] bg-neon-yellow" />
            </div>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              OUR{' '}
              <span className="text-gradient">PROCESS</span>
            </h2>
            <p
              className={`text-white/50 max-w-2xl mx-auto mt-6 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              A proven methodology that ensures every project is delivered on time, 
              on budget, and beyond expectations.
            </p>
          </div>

          {/* Process Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Central Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 hidden lg:block">
              {/* Animated Progress Line */}
              <div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-neon-yellow to-neon-cyan transition-[height] duration-150 ease-out"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-16 lg:space-y-24">
              {steps.map((step, index) => {
                const isActive = index <= activeStep;
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={step.id}
                    className={`relative transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${300 + index * 150}ms` }}
                  >
                    <div
                      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                        isLeft ? '' : 'lg:direction-rtl'
                      }`}
                    >
                      {/* Content */}
                      <div
                        className={`${isLeft ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16 lg:order-2'}`}
                      >
                        <div
                          className={`inline-flex items-center gap-3 mb-4 ${
                            isLeft ? 'lg:flex-row-reverse' : ''
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                              isActive ? 'bg-neon-yellow scale-110' : 'bg-white/10'
                            }`}
                          >
                            <step.icon
                              className={`w-6 h-6 transition-colors duration-500 ${
                                isActive ? 'text-black' : 'text-white/50'
                              }`}
                            />
                          </div>
                          <span
                            className={`text-4xl font-bold transition-colors duration-500 ${
                              isActive ? 'text-neon-yellow' : 'text-white/20'
                            }`}
                          >
                            0{step.id}
                          </span>
                        </div>

                        <h3
                          className={`text-2xl lg:text-3xl font-bold mb-4 transition-colors duration-500 ${
                            isActive ? 'text-white' : 'text-white/50'
                          }`}
                        >
                          {step.title}
                        </h3>

                        <p
                          className={`text-white/60 mb-6 leading-relaxed transition-all duration-500 ${
                            isActive ? 'opacity-100' : 'opacity-50'
                          }`}
                        >
                          {step.description}
                        </p>

                        {/* Details */}
                        <div
                          className={`flex flex-wrap gap-2 ${
                            isLeft ? 'lg:justify-end' : 'lg:justify-start'
                          }`}
                        >
                          {step.details.map((detail) => (
                            <span
                              key={detail}
                              className={`px-3 py-1 text-xs rounded-full transition-all duration-500 ${
                                isActive
                                  ? 'bg-neon-yellow/20 text-neon-yellow'
                                  : 'bg-white/5 text-white/40'
                              }`}
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Node */}
                      <div
                        className={`hidden lg:flex items-center justify-center ${
                          isLeft ? 'lg:order-2' : 'lg:order-1'
                        }`}
                      >
                        <div
                          ref={(el) => { nodeRefs.current[index] = el; }}
                          className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? 'border-neon-yellow bg-neon-yellow/20 scale-110 animate-circuit-pulse'
                              : 'border-white/20 bg-black'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full transition-all duration-500 ${
                              isActive ? 'bg-neon-yellow' : 'bg-white/20'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
