import { useScrollReveal } from '@/hooks/useScrollReveal';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import BookingForm from '@/components/BookingForm';
import BusinessHoursSection from '@/components/BusinessHoursSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <BookingForm />
        <BusinessHoursSection />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
