import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageCircle } from 'lucide-react';

interface PaymentMethodsSectionProps {
  onContactFaucet: (method: string) => void;
}

const methods = [
  {
    id: 'easypaisa',
    name: 'Easypaisa',
    emoji: '🟢',
    tagline: 'Pakistan\'s #1 Wallet',
    color: '#00a651',
    bg: 'rgba(0,166,81,0.08)',
    border: 'rgba(0,166,81,0.25)',
    hoverBorder: 'rgba(0,166,81,0.6)',
    type: 'direct',
    number: '03277173345',
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    emoji: '🔴',
    tagline: 'Instant Mobile Payment',
    color: '#e31e25',
    bg: 'rgba(227,30,37,0.08)',
    border: 'rgba(227,30,37,0.25)',
    hoverBorder: 'rgba(227,30,37,0.6)',
    type: 'direct',
    number: '03277173345',
  },
  {
    id: 'fasset',
    name: 'Fasset Pay',
    emoji: '💎',
    tagline: 'Crypto & Digital Assets',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.25)',
    hoverBorder: 'rgba(124,58,237,0.6)',
    type: 'contact',
    number: null,
  },
  {
    id: 'faucet',
    name: 'FaucetPay',
    emoji: '💧',
    tagline: 'Contact Us for Faucet',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.25)',
    hoverBorder: 'rgba(14,165,233,0.6)',
    type: 'contact',
    number: null,
  },
];

export default function PaymentMethodsSection({ onContactFaucet }: PaymentMethodsSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="payment" className="relative py-28 overflow-hidden text-center" ref={ref}>
      <div className="red-line mb-20 text-center" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 text-center"
        >
          <span className="badge-glow font-inter text-xs font-semibold text-red-400 px-4 py-2 rounded-full tracking-widest uppercase mb-4 inline-block text-center">
            Payment Methods
          </span>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-3 text-center">
            WE ACCEPT
          </h2>
          <p className="font-inter text-gray-500 text-lg text-center">
            Fast, secure, and flexible payment options for everyone
          </p>
        </motion.div>

        {/* Payment cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {methods.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="payment-card relative rounded-2xl p-5 flex flex-col items-center gap-3 text-center cursor-default group text-center backdrop-blur-xl border border-white/10 bg-white/5"
              style={{ background: m.bg, border: `1px solid ${m.border}` }}
              onClick={() => m.type === 'contact' ? onContactFaucet(m.id) : undefined}
            >
              {/* Contact badge */}
              {m.type === 'contact' && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-inter font-medium cursor-pointer text-center"
                  style={{ background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.4)', color: '#38bdf8' }}
                >
                  <MessageCircle size={10} />
                  Contact Us
                </div>
              )}

              {/* Emoji */}
              <div className="text-4xl mt-2 text-center">{m.emoji}</div>

              {/* Name */}
              <div>
                <h3 className="font-orbitron font-bold text-lg text-white mb-0.5 text-center">{m.name}</h3>
                <p className="font-inter text-xs text-center" style={{ color: m.color }}>{m.tagline}</p>
              </div>

              {/* Account number or contact */}
              {m.type === 'direct' && m.number && (
                <div
                  className="w-full px-3 py-2 rounded-xl text-center text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="font-inter text-gray-600 text-xs mb-0.5 text-center">Account</div>
                  <div className="font-mono text-white text-lg font-bold text-center">{m.number}</div>
                </div>
              )}

              {m.type === 'contact' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onContactFaucet(m.id)}
                  className="w-full py-2 rounded-xl font-inter text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-center"
                  style={{
                    background: `rgba(${m.id === 'faucet' ? '14,165,233' : '124,58,237'},0.15)`,
                    border: `1px solid ${m.border}`,
                    color: m.color,
                  }}
                >
                  <MessageCircle size={12} />
                  Contact for Payment
                </motion.button>
              )}

              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-center backdrop-blur-xl border border-white/10 bg-white/5"
                style={{ boxShadow: `0 0 20px ${m.border}, inset 0 0 20px rgba(0,0,0,0.3)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-6 mt-10 flex-wrap text-center"
        >
          {['🔒 256-bit Secure', '⚡ Instant Delivery', '✅ Verified Seller', '🛡️ Buyer Protection'].map((item) => (
            <span key={item} className="font-inter text-gray-600 text-lg text-center">{item}</span>
          ))}
        </motion.div>
      </div>

      <div className="red-line mt-20 text-center" />
    </section>
  );
}
