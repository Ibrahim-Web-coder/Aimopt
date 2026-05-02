import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, ChevronRight } from 'lucide-react';

interface CTASectionProps {
  onBuyNow: () => void;
}

export default function CTASection({ onBuyNow }: CTASectionProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden text-center">
      {/* Intense glow background */}
      <div
        className="absolute inset-0 text-center"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,43,43,0.18) 0%, rgba(255,43,43,0.05) 40%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 text-center" />

      {/* Animated glow orbs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse-glow pointer-events-none text-center"
        style={{ background: 'radial-gradient(circle, rgba(255,43,43,0.7) 0%, transparent 70%)' }}
      />

      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px text-center"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,43,43,0.6), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px text-center"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,43,43,0.6), transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8 text-center"
        >
          <span className="badge-glow font-inter text-xs font-semibold text-red-400 px-4 py-2 rounded-full tracking-widest uppercase flex items-center gap-2 text-center">
            <Zap size={12} fill="currentColor" />
            Limited Time Offer
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-orbitron font-black text-5xl md:text-6xl lg:text-8xl leading-none mb-6 text-center"
        >
          <span className="block text-white text-center">READY TO</span>
          <span
            className="block glow-text-red animate-flicker text-center"
            style={{ color: '#ff2b2b' }}
          >
            DOMINATE?
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-inter text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-center"
        >
          Join 10,000+ elite players who upgraded their game. Start dominating today — your opponents won't know what hit them.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(255,43,43,0.8)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onBuyNow}
            className="btn-primary font-orbitron font-black text-white px-10 py-5 rounded-2xl tracking-widest uppercase text-lg flex items-center gap-3 group text-center backdrop-blur-xl border border-white/10 bg-white/5"
          >
            <Zap size={20} fill="white" />
            Buy Now — Starting $5
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-center" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBuyNow}
            className="btn-secondary font-orbitron font-bold text-red-400 px-10 py-5 rounded-2xl tracking-widest uppercase text-lg text-center backdrop-blur-xl border border-white/10 bg-white/5"
          >
            Upgrade Your Aim
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-lg text-gray-600 font-inter text-center"
        >
          <span>🔒 Secure Checkout</span>
          <span>⚡ Instant Delivery</span>
          <span>🛡️ Safe & Trusted</span>
          <span>💬 24/7 Support</span>
        </motion.div>
      </div>
    </section>
  );
}
