import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#f7f4ee]">
      <Navbar />
      <Hero />

      {/* Sections below Hero: 80% Black / 20% Lighter Cyber Atmospheric Gradient */}
      <div className="relative cyber-gradient-container text-[#f7f4ee]">
        {/* Soft Ambient Radial Lighting Accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          {/* Work Section Lighting Accent */}
          <div className="absolute top-[4%] right-[-80px] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-[#c59b6d]/[0.05] rounded-full blur-[140px]" />
          
          {/* About Section Lighting Accent */}
          <div className="absolute top-[28%] left-[-120px] w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-[#dfb88e]/[0.04] rounded-full blur-[150px]" />
          
          {/* Experience Section Lighting Accent */}
          <div className="absolute top-[56%] right-[-100px] w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] bg-[#c59b6d]/[0.055] rounded-full blur-[150px]" />
          
          {/* Contact Section Warm Ambient Accent */}
          <div className="absolute top-[82%] left-[5%] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-[#dfb88e]/[0.045] rounded-full blur-[130px]" />
        </div>

        {/* Content Layers */}
        <div className="relative z-10">
          <SelectedWork />
          <AboutSection />
          <ExperienceSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
