import { useState, useEffect, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import PaymentModal from './components/PaymentModal';
import SectionDivider from './components/SectionDivider';

interface PlanType {
  name: string;
  price: number;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | undefined>(undefined);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  // Mouse follow glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBuyNow = (planName?: string, planPrice?: number) => {
    if (planName && planPrice) {
      setSelectedPlan({ name: planName, price: planPrice });
    } else {
      setSelectedPlan(undefined);
    }
    setModalOpen(true);
  };

  const handleContactFaucet = (_methodId: string) => {
    // Open modal so user can select plan then contact for faucet
    setSelectedPlan(undefined);
    setModalOpen(true);
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <div
          className="relative min-h-screen overflow-x-hidden text-center"
          style={{ background: '#050505' }}
        >
          {/* Mouse follow glow */}
          <div
            ref={mouseGlowRef}
            className="mouse-glow text-center"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              transition: 'left 0.15s ease, top 0.15s ease',
            }}
          />

          {/* Particles */}
          <ParticlesBackground />

          {/* Navbar */}
          <Navbar onBuyNow={() => handleBuyNow()} />

          {/* Main content */}
          <main className="relative z-10 text-center">
            <HeroSection onBuyNow={() => handleBuyNow()} />
            <StatsSection />
            <SectionDivider />
            <FeaturesSection />
            <SectionDivider flip />
            <PricingSection onBuyNow={(name, price) => handleBuyNow(name, price)} />
            <PaymentMethodsSection onContactFaucet={handleContactFaucet} />
            <SectionDivider />
            <TestimonialsSection />
            <SectionDivider flip />
            <FAQSection />
            <SectionDivider />
            <CTASection onBuyNow={() => handleBuyNow()} />
          </main>

          <Footer />

          {/* Payment Modal */}
          <PaymentModal
            isOpen={modalOpen}
            onClose={() => { setModalOpen(false); setSelectedPlan(undefined); }}
            plan={selectedPlan}
          />
        </div>
      )}
    </>
  );
}
