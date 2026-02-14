import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  ArrowUp,
  Heart
} from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#introduction' },
      { name: 'Services', href: '#services' },
      { name: 'Process', href: '#process' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Web Design', href: '#services' },
      { name: 'Development', href: '#services' },
      { name: 'Branding', href: '#services' },
      { name: 'Marketing', href: '#services' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-omega-dark border-t border-white/10">
      {/* Main Footer */}
      <div className="w-full px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <a href="#hero" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neon-yellow/50 hover:border-neon-yellow transition-colors">
                  <img 
                    src="/hero-logo.jpg" 
                    alt="Omega Digital Logo" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <span className="font-bold text-xl tracking-wider block">OMEGA</span>
                  <span className="text-sm text-white/50">DIGITAL</span>
                </div>
              </a>
              <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
                We craft immersive digital experiences that captivate, convert, 
                and elevate your brand to new dimensions.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-yellow hover:text-black transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="font-semibold text-white mb-6">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                            scrollToSection(link.href);
                          }
                        }}
                        className="text-white/50 hover:text-neon-yellow transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-6 lg:px-12 py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span>Â© 2024 Omega Digital. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>in New York</span>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-white/50 hover:text-neon-yellow transition-colors"
            >
              <span className="text-sm">Back to top</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-yellow group-hover:bg-neon-yellow/10 transition-all">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Large Background Logo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden">
        <div className="text-[20vw] font-bold text-white/[0.02] leading-none select-none">
          Î©
        </div>
      </div>
    </footer>
  );
}
