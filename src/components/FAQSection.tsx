import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Shield } from 'lucide-react';

const faqs = [
  {
    q: 'Is AIMOPT safe to use?',
    a: 'Absolutely. AIMOPT only modifies Windows system settings, game configs, and network parameters — all within safe, tested limits. It does NOT inject into game memory, does not modify game files, and is completely undetected by anti-cheat systems like Easy Anti-Cheat and BattlEye.',
  },
  {
    q: 'How fast is delivery after payment?',
    a: 'Delivery is near-instant. Once your payment is verified (usually within 5–15 minutes), you\'ll receive full access. We operate 24/7 and aim to fulfill all orders as fast as humanly possible.',
  },
  {
    q: 'Will it work on my low-end PC?',
    a: 'Yes! AIMOPT is specifically designed to squeeze maximum performance from low-end and mid-range systems. Users with as low as 4GB RAM and integrated graphics have reported massive FPS improvements after optimizing.',
  },
  {
    q: 'Do you offer customer support?',
    a: 'Yes, 24/7 support via Discord (therealm0997), WhatsApp (03390042189), and Email (abdulxpro786@gmail.com). Pro and Elite plan holders get priority queue support with faster response times.',
  },
  {
    q: 'What is your refund policy?',
    a: 'We offer a 24-hour satisfaction guarantee. If you haven\'t noticed any improvement and our support team hasn\'t been able to help you, we\'ll issue a full refund — no questions asked.',
  },
  {
    q: 'Which games does AIMOPT support?',
    a: 'AIMOPT works as a system-level optimizer, so it benefits all games. We have specific optimized profiles for Free Fire, PUBG Mobile (emulator), Valorant, CS2, Warzone, Apex Legends, and more.',
  },
];

function FAQItem({ faq, index, inView }: { faq: typeof faqs[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-xl overflow-hidden text-center"
      style={{ border: open ? '1px solid rgba(255,43,43,0.3)' : '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left group text-center"
        style={{ background: open ? 'rgba(255,43,43,0.06)' : 'rgba(255,255,255,0.02)', transition: 'background 0.3s' }}
      >
        <span className="font-inter font-semibold text-white text-lg md:text-lg pr-4 group-hover:text-red-400 transition-colors text-center">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-center"
        >
          <ChevronDown size={18} style={{ color: open ? '#ff2b2b' : '#4b5563' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-5 pb-5 text-center"
              style={{ background: 'rgba(255,43,43,0.03)', borderTop: '1px solid rgba(255,43,43,0.1)' }}
            >
              <p className="font-inter text-gray-400 text-lg leading-relaxed pt-4 text-center">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="faq" className="relative py-24 overflow-hidden text-center" ref={ref}>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 text-center"
        >
          <span className="badge-glow font-inter text-xs font-semibold text-red-400 px-4 py-2 rounded-full tracking-widest uppercase mb-4 inline-block text-center">
            FAQ
          </span>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-4 text-center">
            COMMON{' '}
            <span style={{ color: '#ff2b2b', textShadow: '0 0 20px rgba(255,43,43,0.5)' }}>QUESTIONS</span>
          </h2>
          <p className="font-inter text-gray-500 text-lg text-center">
            Everything you need to know before buying.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3 text-center">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 p-5 rounded-2xl text-center text-center backdrop-blur-xl border border-white/10 bg-white/5"
          style={{ background: 'rgba(255,43,43,0.05)', border: '1px solid rgba(255,43,43,0.15)' }}
        >
          <Shield size={24} className="mx-auto mb-3 text-center" style={{ color: '#ff2b2b' }} />
          <p className="font-inter text-gray-400 text-lg text-center">
            Still have questions?{' '}
            <a
              href="https://discord.com/users/therealm0997"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline transition-colors text-center"
              style={{ color: '#ff2b2b' }}
            >
              Chat with us on Discord
            </a>{' '}
            or{' '}
            <a
              href="https://wa.me/923390042189"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline transition-colors text-center"
              style={{ color: '#ff2b2b' }}
            >
              WhatsApp us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
