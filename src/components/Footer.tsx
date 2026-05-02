import { motion } from 'framer-motion';
import { Zap, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative pt-12 pb-8 overflow-hidden text-center"
      style={{ background: '#050505', borderTop: '1px solid rgba(255,43,43,0.1)' }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 pointer-events-none text-center"
        style={{ background: 'linear-gradient(180deg, rgba(255,43,43,0.6), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-center">
          {/* Brand */}
          <div className="md:col-span-2 text-center">
            <div className="flex items-center gap-2 mb-4 text-center">
              <div
                className="w-8 h-8 rounded-2xl flex items-center justify-center text-center backdrop-blur-xl border border-white/10 bg-white/5"
                style={{ background: 'linear-gradient(135deg, #ff2b2b, #cc0000)', boxShadow: '0 0 15px rgba(255,43,43,0.4)' }}
              >
                <Zap size={16} className="text-white text-center" fill="white" />
              </div>
              <span className="font-orbitron font-black text-xl tracking-widest text-center" style={{ color: '#ff2b2b' }}>
                AIMOPT
              </span>
            </div>
            <p className="font-inter text-gray-600 text-lg leading-relaxed max-w-xs mb-4 text-center">
              The elite gaming optimization platform trusted by 10,000+ competitive players worldwide. Dominate every match.
            </p>
            <div className="flex gap-3 text-center">
              <a
                href="https://discord.com/users/therealm0997"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-inter text-xs font-medium transition-all hover:scale-105 text-center"
                style={{ background: 'rgba(88,101,242,0.15)', border: '1px solid rgba(88,101,242,0.3)', color: '#818cf8' }}
              >
                💬 Discord
                <ExternalLink size={10} />
              </a>
              <a
                href="https://wa.me/923390042189"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-inter text-xs font-medium transition-all hover:scale-105 text-center"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: '#4ade80' }}
              >
                📱 WhatsApp
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-orbitron font-bold text-lg text-white mb-4 tracking-wider text-center">PRODUCT</h4>
            <ul className="space-y-2 text-center">
              {['Features', 'Pricing', 'Reviews', 'FAQ'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const el = document.querySelector(`#${link.toLowerCase()}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-inter text-gray-600 hover:text-red-400 transition-colors text-lg text-center"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-orbitron font-bold text-lg text-white mb-4 tracking-wider text-center">CONTACT</h4>
            <ul className="space-y-2 text-center">
              <li>
                <a
                  href="https://discord.com/users/therealm0997"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-gray-600 hover:text-red-400 transition-colors text-lg text-center"
                >
                  Discord: therealm0997
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923390042189"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-gray-600 hover:text-red-400 transition-colors text-lg text-center"
                >
                  WhatsApp: 03390042189
                </a>
              </li>
              <li>
                <a
                  href="mailto:abdulxpro786@gmail.com"
                  className="font-inter text-gray-600 hover:text-red-400 transition-colors text-lg text-center"
                >
                  abdulxpro786@gmail.com
                </a>
              </li>
              <li>
                <span className="font-inter text-gray-700 text-xs text-center">Available 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="red-line mb-6 text-center" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-lg font-inter text-gray-700 text-center">
          <span>© 2026 AIMOPT. All rights reserved.</span>

          <div className="flex gap-6 text-center">
            <button className="hover:text-gray-400 transition-colors text-center">Terms of Service</button>
            <button className="hover:text-gray-400 transition-colors text-center">Privacy Policy</button>
            <button className="hover:text-gray-400 transition-colors text-center">Refund Policy</button>
          </div>
        </div>

        {/* Watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-center"
        >
          <span className="font-mono text-xs text-center" style={{ color: 'rgba(255,43,43,0.2)', letterSpacing: '0.3em' }}>
            AIMOPT v2.6.0 — ELITE GAMING PERFORMANCE ENGINE
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
