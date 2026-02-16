import { useEffect, useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(241, 254, 66, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(241, 254, 66, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Content */}
            <div>
              <div
                className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-8 h-[2px] bg-neon-yellow" />
                <span className="text-neon-yellow text-sm tracking-widest uppercase">
                  Get In Touch
                </span>
              </div>

              <h2
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                INITIATE
                <br />
                <span className="text-gradient">CONTACT</span>
              </h2>

              <p
                className={`text-white/60 text-lg leading-relaxed mb-12 transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Ready to start your next project? Let's create something amazing together. 
                Reach out and let's discuss how we can help bring your vision to life.
              </p>

              {/* Contact Info */}
              <div
                className={`space-y-6 transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-neon-yellow/10 flex items-center justify-center group-hover:bg-neon-yellow/20 transition-colors">
                    <Mail className="w-5 h-5 text-neon-yellow" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50">Email</div>
                    <div className="text-white">hello@omegadigital.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-neon-yellow/10 flex items-center justify-center group-hover:bg-neon-yellow/20 transition-colors">
                    <Phone className="w-5 h-5 text-neon-yellow" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50">Phone</div>
                    <div className="text-white">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-neon-yellow/10 flex items-center justify-center group-hover:bg-neon-yellow/20 transition-colors">
                    <MapPin className="w-5 h-5 text-neon-yellow" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50">Location</div>
                    <div className="text-white">Edinburgh, Scotland</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Form */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative p-8 rounded-2xl bg-omega-dark border border-white/10">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-sm text-white/40 font-mono">
                    contact_form.exe
                  </span>
                </div>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-white/60">
                      We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="relative">
                      <label className="block text-sm text-white/50 mb-2 font-mono">
                        <span className="text-neon-yellow">$</span> name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full bg-transparent border-b-2 border-white/20 focus:border-neon-yellow text-white py-3 outline-none transition-colors font-mono"
                          placeholder="Enter your name..."
                        />
                        {focusedField === 'name' && (
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-neon-yellow animate-blink" />
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label className="block text-sm text-white/50 mb-2 font-mono">
                        <span className="text-neon-yellow">$</span> email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full bg-transparent border-b-2 border-white/20 focus:border-neon-yellow text-white py-3 outline-none transition-colors font-mono"
                          placeholder="Enter your email..."
                        />
                        {focusedField === 'email' && (
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-neon-yellow animate-blink" />
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label className="block text-sm text-white/50 mb-2 font-mono">
                        <span className="text-neon-yellow">$</span> message
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={4}
                          className="w-full bg-transparent border-b-2 border-white/20 focus:border-neon-yellow text-white py-3 outline-none transition-colors resize-none font-mono"
                          placeholder="Tell us about your project..."
                        />
                        {focusedField === 'message' && (
                          <span className="absolute right-0 bottom-4 w-2 h-4 bg-neon-yellow animate-blink" />
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-neon-yellow text-black font-semibold rounded-xl hover:shadow-neon-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          SEND TRANSMISSION
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 border-t-2 border-r-2 border-neon-yellow/30 rounded-tr-2xl" />
                <div className="absolute -bottom-2 -left-2 w-20 h-20 border-b-2 border-l-2 border-neon-yellow/30 rounded-bl-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
