import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gauge, Zap, Shield, Target, Package, Wrench } from 'lucide-react';

const features = [
  {
    icon: <Gauge size={32} />,
    title: 'Boost FPS',
    description: 'Unlock hidden FPS by eliminating bottlenecks, optimizing GPU settings, and fine-tuning your system for maximum frame output.',
    tag: 'PERFORMANCE',
  },
  {
    icon: <Zap size={32} />,
    title: 'Reduce Input Lag',
    description: 'Sub-millisecond input optimization. Your clicks register faster, giving you a reaction edge over every opponent.',
    tag: 'PRECISION',
  },
  {
    icon: <Shield size={32} />,
    title: 'Better Stability',
    description: 'Eliminate stutters, frame drops, and freezes. Experience consistent frame times for smooth, reliable gameplay.',
    tag: 'STABILITY',
  },
  {
    icon: <Target size={32} />,
    title: 'Improve Precision',
    description: 'Mouse acceleration removed, raw input optimized, eDPI perfectly calibrated for pixel-perfect crosshair control.',
    tag: 'ACCURACY',
  },
  {
    icon: <Package size={32} />,
    title: 'Lightweight Setup',
    description: 'Zero bloatware. Our optimizer runs silently in the background using less than 1% CPU — minimal footprint, maximum impact.',
    tag: 'LIGHTWEIGHT',
  },
  {
    icon: <Wrench size={32} />,
    title: 'Easy Installation',
    description: 'One-click install. No technical expertise required. Be fully optimized within minutes of purchase.',
    tag: 'SIMPLE',
  },
];

export default function FeaturesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="features" className="relative py-24 overflow-hidden text-center" ref={ref}>
      {/* Background elements */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 blur-3xl pointer-events-none text-center"
        style={{ background: 'radial-gradient(circle, rgba(255,43,43,0.8) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 text-center"
        >
          <span className="badge-glow font-inter text-xs font-semibold text-red-400 px-4 py-2 rounded-full tracking-widest uppercase mb-4 inline-block text-center">
            Why Choose Us
          </span>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4 text-center">
            ELITE{' '}
            <span style={{ color: '#ff2b2b', textShadow: '0 0 20px rgba(255,43,43,0.5)' }}>FEATURES</span>
          </h2>
          <p className="font-inter text-gray-400 text-lg max-w-2xl mx-auto text-center">
            Every feature engineered for one purpose — making you unstoppable.
          </p>
          <div className="red-line mt-6 max-w-xs mx-auto text-center" />
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="feature-card relative glass-card rounded-2xl p-6 group cursor-default text-center backdrop-blur-xl border border-white/10 bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 left-0 w-0 h-0 border-t-0 border-l-0 group-hover:w-8 group-hover:h-8 transition-all duration-300 text-center"
                style={{ borderTop: '2px solid #ff2b2b', borderLeft: '2px solid #ff2b2b' }}
              />
              <div
                className="absolute bottom-0 right-0 w-0 h-0 group-hover:w-8 group-hover:h-8 transition-all duration-300 text-center"
                style={{ borderBottom: '2px solid #ff2b2b', borderRight: '2px solid #ff2b2b' }}
              />

              {/* Tag */}
              <span className="inline-block font-mono text-xs tracking-widest text-red-600 mb-4 text-center">
                [{feature.tag}]
              </span>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 text-center"
                style={{
                  background: 'rgba(255,43,43,0.08)',
                  border: '1px solid rgba(255,43,43,0.2)',
                  color: '#ff2b2b',
                  boxShadow: '0 0 20px rgba(255,43,43,0.08)',
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-orbitron font-bold text-xl text-white mb-3 group-hover:text-red-400 transition-colors text-center">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-inter text-gray-500 text-lg leading-relaxed text-center">
                {feature.description}
              </p>

              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none text-center backdrop-blur-xl border border-white/10 bg-white/5"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,43,43,0.06) 0%, transparent 70%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
