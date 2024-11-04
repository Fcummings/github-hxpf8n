import React, { useState, useEffect } from 'react';
import { 
  Rocket, Menu, X, Code, Cpu, ArrowRight, 
  Users, Lightbulb, Workflow, Target, Layers, Zap,
  LineChart, Building, Briefcase, Brain, Globe,
  Cloud, Shield, Smartphone
} from 'lucide-react';
import ContactForm from './components/ContactForm';
import NavLink from './components/NavLink';
import ServiceCard from './components/ServiceCard';
import StatsCard from './components/StatsCard';
import FeatureCard from './components/FeatureCard';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary text-white">
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/90 backdrop-blur-lg shadow-lg' : ''}`}>
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center group">
              <Rocket className="mr-2 text-accent group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-gradient">F-Labs</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <NavLink href="#approach">Our Approach</NavLink>
              <NavLink href="#ventures">Ventures</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#contact" onClick={handleContactClick}>Contact</NavLink>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 p-4 glass-card">
              <NavLink href="#approach" onClick={() => setIsMenuOpen(false)}>Our Approach</NavLink>
              <NavLink href="#ventures" onClick={() => setIsMenuOpen(false)}>Ventures</NavLink>
              <NavLink href="#services" onClick={() => setIsMenuOpen(false)}>Services</NavLink>
              <NavLink href="#contact" onClick={(e) => { setIsMenuOpen(false); handleContactClick(e); }}>Contact</NavLink>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-24">
        <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_50%)] opacity-20"></div>
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              We Build & Scale <br />
              <span className="text-gradient">Tomorrow's Companies</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/80">
              F-Labs is a venture studio that combines capital, talent, and expertise to build market-defining companies
            </p>
            <button onClick={handleContactClick} className="btn text-lg group">
              Partner With Us <ArrowRight className="ml-2 inline group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        <section id="approach" className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Our <span className="text-gradient">Approach</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Brain />}
                title="Ideation"
                description="We identify market opportunities and develop innovative solutions"
              />
              <FeatureCard
                icon={<Building />}
                title="Company Building"
                description="We provide the foundation, team, and resources to build successful companies"
              />
              <FeatureCard
                icon={<LineChart />}
                title="Scaling"
                description="We accelerate growth through our network and operational expertise"
              />
              <FeatureCard
                icon={<Briefcase />}
                title="Investment"
                description="We invest capital and maintain long-term partnerships"
              />
            </div>
          </div>
        </section>

        <section id="ventures" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Venture <span className="text-gradient">Studio Model</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="text-accent" />
                  Founding Team
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-accent" size={16} />
                    Experienced entrepreneurs
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-accent" size={16} />
                    Technical co-founders
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-accent" size={16} />
                    Industry experts
                  </li>
                </ul>
              </div>
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Cpu className="text-accent" />
                  Resources
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-accent" size={16} />
                    Initial capital
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-accent" size={16} />
                    Tech infrastructure
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-accent" size={16} />
                    Operational support
                  </li>
                </ul>
              </div>
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="text-accent" />
                  Focus Areas
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-accent" size={16} />
                    Enterprise SaaS
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-accent" size={16} />
                    AI/ML Applications
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-accent" size={16} />
                    Digital Infrastructure
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 bg-gradient-to-b from-transparent to-black/20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Custom <span className="text-gradient">Software Solutions</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <ServiceCard
                icon={<Globe />}
                title="Web Applications"
                description="Scalable, responsive web applications built with modern technologies and best practices"
              />
              <ServiceCard
                icon={<Smartphone />}
                title="Mobile Apps"
                description="Native and cross-platform mobile applications for iOS and Android"
              />
              <ServiceCard
                icon={<Cloud />}
                title="Cloud Solutions"
                description="Cloud-native architectures and microservices deployment"
              />
              <ServiceCard
                icon={<Shield />}
                title="Security & DevOps"
                description="Secure infrastructure and automated deployment pipelines"
              />
            </div>
            <div className="glass-card p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Development</h3>
                  <p className="text-white/80 mb-6">
                    Our expert team delivers robust, scalable solutions tailored to your business needs. We combine technical excellence with strategic thinking to create software that drives growth and efficiency.
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-center">
                      <Code className="mr-3 text-accent" size={20} />
                      Full-stack development expertise
                    </li>
                    <li className="flex items-center">
                      <Layers className="mr-3 text-accent" size={20} />
                      Microservices architecture
                    </li>
                    <li className="flex items-center">
                      <Workflow className="mr-3 text-accent" size={20} />
                      Agile development methodology
                    </li>
                    <li className="flex items-center">
                      <Zap className="mr-3 text-accent" size={20} />
                      Rapid prototyping and MVP development
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Development team collaboration"
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">
              Build With <span className="text-gradient">F-Labs</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/80">
              Partner with us to build, launch, and scale your next venture
            </p>
            <button 
              onClick={handleContactClick}
              className="btn"
            >
              Start the Conversation
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Rocket className="mr-2 text-accent" />
              <span className="text-gradient font-bold">F-Labs</span>
            </div>
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} F-Labs. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
}

export default App;