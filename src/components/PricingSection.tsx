import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Zap, Crown, Flame } from 'lucide-react';

interface PricingSectionProps {
  onBuyNow: (plan: string, price: number) => void;
}

const plans = [
  {
    icon: <Zap size={24} />,
    name: 'Starter',
    price: 5,
    badge: null,
    description: 'Perfect entry point to competitive gaming performance.',
    features: [
      'Basic system optimization',
      'FPS boost pack',
      'Input lag reduction',
      '1 device license',
      'Email support',
      '30-day access',
    ],
    featured: false,
    color: 'rgba(255,255,255,0.08)',
    btnClass: 'btn-secondary',
  },
  {
    icon: <Flame size={24} />,
    name: 'Pro',
    price: 7,
    badge: 'MOST POPULAR',
    description: 'The complete toolkit for serious competitive players.',
    features: [
      'Advanced system tweaks',
      'Max FPS configuration',
      'Network optimization',
      'Priority 24/7 support',
      '2 device licenses',
      'Lifetime updates',
      'Better gaming configs',
    ],
    featured: true,
    color: 'rgba(255,43,43,0.12)',
    btnClass: 'btn-primary',
  },
  {
    icon: <Crown size={24} />,
    name: 'Elite',
    price: 8,
    badge: null,
    description: 'The ultimate package for players who refuse to lose.',
    features: [
      'Full performance package',
      'Max precision tuning',
      'Custom game profiles',
      'VIP support line',
      'Unlimited devices',
      'Lifetime license',
      'Early access features',
    ],
    featured: false,
    color: 'rgba(255,255,255,0.08)',
    btnClass: 'btn-secondary',
  },
];

export default function PricingSection({ onBuyNow }: PricingSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="pricing" className="relative py-24 overflow-hidden text-center" ref={ref}>
      <div
        className="absolute top-0 left-0 right-0 h-1/2 opacity-5 pointer-events-none text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,43,43,0.6) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 text-center"
        >
          <span className="badge-glow font-inter text-xs font-semibold text-red-400 px-4 py-2 rounded-full tracking-widest uppercase mb-4 inline-block text-center">
            Pricing Plans
          </span>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4 text-center">
            CHOOSE YOUR{' '}
            <span style={{ color: '#ff2b2b', textShadow: '0 0 20px rgba(255,43,43,0.5)' }}>PLAN</span>
          </h2>
          <p className="font-inter text-gray-400 text-lg max-w-xl mx-auto text-center">
            Simple pricing. Elite results. No hidden fees.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center text-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
              whileHover={{ y: plan.featured ? -6 : -4, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl p-6 lg:p-8 ${plan.featured ? 'pricing-featured lg:scale-105' : 'glass-card'}`}
              style={{
                border: plan.featured
                  ? '1px solid rgba(255,43,43,0.5)'
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: plan.featured
                  ? '0 0 60px rgba(255,43,43,0.2), 0 30px 60px rgba(0,0,0,0.5)'
                  : '0 10px 40px rgba(0,0,0,0.3)',
              }}
            >
              {/* Featured badge */}
              {plan.badge && (
                <div className="backdrop-blur-xl border border-white/10 bg-white/5 absolute -top-4 left-1/2 -translate-x-1/2e-x-1/2 z-10 text-center">
                  <div
                    className="font-orbitron font-black text-xs text-white px-4 py-1.5 rounded-full tracking-widest flex items-center gap-1.5 text-center"
                    style={{
                      background: 'linear-gradient(135deg, #ff2b2b, #cc0000)',
                      boxShadow: '0 0 20px rgba(255,43,43,0.6)',
                    }}
                  >
                    <Star size={10} fill="white" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-4 text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-center"
                  style={{
                    background: plan.featured ? 'rgba(255,43,43,0.2)' : 'rgba(255,43,43,0.08)',
                    border: '1px solid rgba(255,43,43,0.3)',
                    color: '#ff2b2b',
                  }}
                >
                  {plan.icon}
                </div>
                <div>
                  <h3 className="font-orbitron font-black text-xl text-white text-center">{plan.name}</h3>
                  <p className="font-inter text-gray-500 text-xs text-center">{plan.description.slice(0, 30)}...</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-white/5 text-center">
                <div className="flex items-end gap-1 text-center">
                  <span className="font-inter text-gray-500 text-lg text-center">$</span>
                  <span
                    className="font-orbitron font-black text-6xl text-center"
                    style={{
                      color: plan.featured ? '#ff2b2b' : '#ffffff',
                      textShadow: plan.featured ? '0 0 30px rgba(255,43,43,0.5)' : 'none',
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="font-inter text-gray-500 text-lg mb-2 text-center">/one-time</span>
                </div>
                <p className="font-inter text-gray-500 text-lg mt-2 text-center">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 text-center">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-center">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-center"
                      style={{
                        background: 'rgba(255,43,43,0.15)',
                        border: '1px solid rgba(255,43,43,0.3)',
                      }}
                    >
                      <Check size={10} style={{ color: '#ff2b2b' }} strokeWidth={3} />
                    </div>
                    <span className="font-inter text-gray-400 text-lg text-center">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onBuyNow(plan.name, plan.price)}
                className={`w-full py-4 rounded-xl font-orbitron font-bold text-lg tracking-widest uppercase ${
                  plan.featured ? 'btn-primary text-white' : 'btn-secondary text-red-400'
                }`}
              >
                {plan.featured ? '⚡ Get Pro Now' : `Get ${plan.name}`}
              </motion.button>

              {/* Glow effect for featured */}
              {plan.featured && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-30 text-center backdrop-blur-xl border border-white/10 bg-white/5"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(255,43,43,0.2) 0%, transparent 60%)',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center font-inter text-gray-600 text-lg mt-10 text-center"
        >
          🔒 Secure payment. Instant delivery. 100% satisfaction guaranteed.
        </motion.p>
      </div>
    </section>
  );
}
