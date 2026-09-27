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
      <SelectedWork />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
