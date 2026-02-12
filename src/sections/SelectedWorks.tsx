import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    category: 'Branding',
    description: 'Complete brand identity and visual system for a fintech startup.',
    image: '/project-1.jpg',
    color: '#00BFFF',
  },
  {
    id: 2,
    title: 'Project Beta',
    category: 'Web Design',
    description: 'Modern e-commerce platform with immersive shopping experience.',
    image: '/project-2.jpg',
    color: '#F1FE42',
  },
  {
    id: 3,
    title: 'Project Gamma',
    category: 'Development',
    description: 'Custom SaaS dashboard with real-time data visualization.',
    image: '/project-3.jpg',
    color: '#00FF88',
  },
  {
    id: 4,
    title: 'Project Delta',
    category: 'E-Commerce',
    description: 'Luxury brand online store with AR product preview.',
    image: '/project-4.jpg',
    color: '#FFD700',
  },
];

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
      id="works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(241, 254, 66, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(241, 254, 66, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <div
                className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-8 h-[2px] bg-neon-yellow" />
                <span className="text-neon-yellow text-sm tracking-widest uppercase">
                  Portfolio
                </span>
              </div>
              <h2
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                SELECTED
                <br />
                <span className="text-gradient">WORKS</span>
              </h2>
            </div>
            <p
              className={`text-white/50 max-w-md mt-6 lg:mt-0 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              A curated selection of our finest projects, showcasing our expertise 
              in design, development, and digital innovation.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-omega-dark border border-white/10 hover:border-neon-yellow/50 transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Scan Line Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-transparent via-${project.color}/20 to-transparent transition-opacity duration-300 ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        animation: hoveredProject === project.id ? 'scan-line 2s linear infinite' : 'none',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="text-sm text-white/60 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-yellow transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/50 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-neon-yellow opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-sm font-semibold">View Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div
            className={`text-center mt-16 transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:border-neon-yellow hover:bg-neon-yellow/5 transition-all duration-300">
              <span className="font-semibold">View All Projects</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
