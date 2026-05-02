import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'xXProKillerXx',
    handle: '@proKiller_ff',
    avatar: '🎮',
    rating: 5,
    game: 'Free Fire',
    text: 'Massive FPS improvement! Went from 45 FPS to 120+ on my mid-range PC. This optimizer is insane. Worth every rupee easily.',
    verified: true,
    before: '45 FPS',
    after: '120+ FPS',
  },
  {
    name: 'AimGod_Ali',
    handle: '@aimgod_ali',
    avatar: '🎯',
    rating: 5,
    game: 'PUBG Mobile',
    text: 'Feels smoother instantly. The input lag reduction is real — my shots register so much faster now. The pro plan is 100% worth it.',
    verified: true,
    before: '18ms lag',
    after: '2ms lag',
  },
  {
    name: 'GhostFragger',
    handle: '@ghost_fragger',
    avatar: '👻',
    rating: 5,
    game: 'Valorant',
    text: 'Worth every rupee. My rank went up two divisions after using AIMOPT. The stability alone makes the difference in late-game fights.',
    verified: true,
    before: 'Gold II',
    after: 'Platinum I',
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="reviews" className="relative py-24 overflow-hidden text-center" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none text-center"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(255,43,43,0.06) 0%, transparent 60%)',
        }}
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
            Player Reviews
          </span>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-4 text-center">
            WHAT PLAYERS{' '}
            <span style={{ color: '#ff2b2b', textShadow: '0 0 20px rgba(255,43,43,0.5)' }}>SAY</span>
          </h2>
          <p className="font-inter text-gray-400 text-lg text-center">
            10,000+ satisfied gamers can't be wrong.
          </p>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40, x: i === 0 ? -20 : i === 2 ? 20 : 0 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative glass-card rounded-2xl p-6 group text-center backdrop-blur-xl border border-white/10 bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Quote icon */}
              <div
                className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity text-center"
                style={{ color: '#ff2b2b' }}
              >
                <Quote size={40} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 text-center">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} style={{ color: '#ff2b2b' }} fill="#ff2b2b" />
                ))}
              </div>

              {/* Review text */}
              <p className="font-inter text-gray-300 text-lg leading-relaxed mb-5 italic text-center">
                "{t.text}"
              </p>

              {/* Before / After */}
              <div className="flex gap-3 mb-5 text-center">
                <div
                  className="flex-1 p-2 rounded-2xl text-center text-center backdrop-blur-xl border border-white/10 bg-white/5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="font-inter text-gray-600 text-xs text-center">Before</div>
                  <div className="font-orbitron font-bold text-lg text-gray-400 text-center">{t.before}</div>
                </div>
                <div className="flex items-center text-gray-600 text-xs text-center">→</div>
                <div
                  className="flex-1 p-2 rounded-2xl text-center text-center backdrop-blur-xl border border-white/10 bg-white/5"
                  style={{ background: 'rgba(255,43,43,0.06)', border: '1px solid rgba(255,43,43,0.15)' }}
                >
                  <div className="font-inter text-gray-500 text-xs text-center">After</div>
                  <div className="font-orbitron font-bold text-lg text-center" style={{ color: '#ff2b2b' }}>{t.after}</div>
                </div>
              </div>

              {/* Divider */}
              <div className="red-line mb-4 text-center" />

              {/* User info */}
              <div className="flex items-center gap-3 text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 text-center"
                  style={{ background: 'rgba(255,43,43,0.1)', border: '1px solid rgba(255,43,43,0.2)' }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-center">
                    <span className="font-orbitron font-bold text-lg text-white text-center">{t.name}</span>
                    {t.verified && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded font-inter text-center"
                        style={{ background: 'rgba(255,43,43,0.15)', color: '#ff6666', fontSize: '9px' }}
                      >
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>
                  <div className="font-inter text-gray-600 text-xs text-center">{t.handle} • {t.game}</div>
                </div>
              </div>

              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none text-center backdrop-blur-xl border border-white/10 bg-white/5"
                style={{ border: '1px solid rgba(255,43,43,0.25)', boxShadow: '0 0 20px rgba(255,43,43,0.1)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-8 mt-12 flex-wrap text-center"
        >
          <div className="text-center text-center">
            <div className="font-orbitron font-black text-2xl text-center" style={{ color: '#ff2b2b' }}>10K+</div>
            <div className="font-inter text-gray-600 text-xs text-center">Happy Players</div>
          </div>
          <div className="w-px h-10 bg-white/10 text-center" />
          <div className="text-center text-center">
            <div className="font-orbitron font-black text-2xl text-center" style={{ color: '#ff2b2b' }}>4.9/5</div>
            <div className="font-inter text-gray-600 text-xs text-center">Average Rating</div>
          </div>
          <div className="w-px h-10 bg-white/10 text-center" />
          <div className="text-center text-center">
            <div className="font-orbitron font-black text-2xl text-center" style={{ color: '#ff2b2b' }}>99%</div>
            <div className="font-inter text-gray-600 text-xs text-center">Would Recommend</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
