import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Users, ThumbsUp, Headphones, Trophy } from 'lucide-react';

const stats = [
  { icon: <Users size={28} />, value: 10000, suffix: '+', label: 'Active Users', prefix: '' },
  { icon: <ThumbsUp size={28} />, value: 99, suffix: '%', label: 'Satisfaction Rate', prefix: '' },
  { icon: <Headphones size={28} />, value: 24, suffix: '/7', label: 'Support Available', prefix: '' },
  { icon: <Trophy size={28} />, value: 3, suffix: '+', label: 'Years Experience', prefix: '' },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden text-center">
      {/* Red line top */}
      <div className="red-line mb-0 text-center" />

      <div
        className="relative text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,43,43,0.08) 0%, rgba(5,5,5,0.95) 50%, rgba(255,43,43,0.05) 100%)',
          borderTop: '1px solid rgba(255,43,43,0.1)',
          borderBottom: '1px solid rgba(255,43,43,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="text-center group text-center"
              >
                {/* Icon */}
                <div className="flex justify-center mb-3 text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-center backdrop-blur-xl border border-white/10 bg-white/5"
                    style={{
                      background: 'rgba(255,43,43,0.1)',
                      border: '1px solid rgba(255,43,43,0.2)',
                      color: '#ff2b2b',
                      boxShadow: '0 0 20px rgba(255,43,43,0.1)',
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>

                {/* Number */}
                <div className="font-orbitron font-black text-3xl md:text-4xl mb-1 text-center" style={{ color: '#ff2b2b', textShadow: '0 0 20px rgba(255,43,43,0.4)' }}>
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      delay={i * 0.1}
                      separator=","
                    />
                  )}
                  <span>{stat.suffix}</span>
                </div>

                {/* Label */}
                <div className="font-inter text-gray-500 text-lg tracking-wide text-center">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="red-line mt-0 text-center" />
    </section>
  );
}
