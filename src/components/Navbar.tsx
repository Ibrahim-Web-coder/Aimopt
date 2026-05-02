import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  onBuyNow: () => void;
}

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ onBuyNow }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-center"
        style={{
          background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,43,43,0.1)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-between h-16 md:h-20 text-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer text-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div
                className="w-8 h-8 rounded-2xl flex items-center justify-center text-center backdrop-blur-xl border border-white/10 bg-white/5"
                style={{ background: 'linear-gradient(135deg, #ff2b2b, #cc0000)', boxShadow: '0 0 15px rgba(255,43,43,0.5)' }}
              >
                <Zap size={16} className="text-white text-center" fill="white" />
              </div>
              <span
                className="font-orbitron font-black text-xl tracking-widest text-center"
                style={{ color: '#ff2b2b', textShadow: '0 0 15px rgba(255,43,43,0.5)' }}
              >
                AIMOPT
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-center">
              {navLinks.map((link) => (
                <motion.button
                  key={link.label}
                  whileHover={{ color: '#ff2b2b' }}
                  onClick={() => handleNavClick(link.href)}
                  className="font-inter text-lg font-medium text-gray-400 hover:text-red-500 transition-colors duration-200 tracking-wide text-center"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4 text-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,43,43,0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onBuyNow}
                className="hidden md:flex btn-primary font-orbitron font-bold text-lg text-white px-6 py-2.5 rounded-xl tracking-widest uppercase text-center"
              >
                Buy Now
              </motion.button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-gray-400 hover:text-white transition-colors p-1 text-center"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-red-500/10 text-center"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4 text-center">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-inter text-gray-300 hover:text-red-500 transition-colors py-2 text-lg border-b border-white/5 text-center"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setMobileOpen(false); onBuyNow(); }}
                className="btn-primary font-orbitron font-bold text-white py-3 rounded-xl tracking-widest uppercase mt-2 text-center"
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
