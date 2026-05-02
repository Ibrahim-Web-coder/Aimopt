import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, MessageCircle, Mail, Phone, ExternalLink, ChevronRight, AlertCircle, Loader } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: { name: string; price: number };
}

type PaymentStep = 'select-plan' | 'select-method' | 'payment-details' | 'confirm' | 'success' | 'contact';

const plans = [
  { name: 'Starter', price: 5, description: 'Basic optimization for 1 device' },
  { name: 'Pro', price: 7, description: 'Advanced tweaks + Priority support', featured: true },
  { name: 'Elite', price: 8, description: 'Full package + VIP support' },
];

const paymentMethods = [
  {
    id: 'easypaisa',
    name: 'Easypaisa',
    logo: '🟢',
    color: '#00a651',
    number: '03277173345',
    description: 'Mobile wallet payment',
    type: 'direct',
    bgColor: 'rgba(0,166,81,0.08)',
    borderColor: 'rgba(0,166,81,0.3)',
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    logo: '🔴',
    color: '#e31e25',
    number: '03277173345',
    description: 'Mobile wallet payment',
    type: 'direct',
    bgColor: 'rgba(227,30,37,0.08)',
    borderColor: 'rgba(227,30,37,0.3)',
  },
  {
    id: 'fasset',
    name: 'Fasset Pay',
    logo: '💎',
    color: '#7c3aed',
    number: null,
    description: 'Crypto & digital assets',
    type: 'contact',
    bgColor: 'rgba(124,58,237,0.08)',
    borderColor: 'rgba(124,58,237,0.3)',
  },
  {
    id: 'faucet',
    name: 'FaucetPay',
    logo: '💧',
    color: '#0ea5e9',
    number: null,
    description: 'Micro-payment faucet',
    type: 'contact',
    bgColor: 'rgba(14,165,233,0.08)',
    borderColor: 'rgba(14,165,233,0.3)',
  },
];

export default function PaymentModal({ isOpen, onClose, plan: initialPlan }: PaymentModalProps) {
  const [step, setStep] = useState<PaymentStep>(initialPlan ? 'select-method' : 'select-plan');
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || plans[1]);
  const [selectedMethod, setSelectedMethod] = useState<typeof paymentMethods[0] | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(initialPlan ? 'select-method' : 'select-plan');
      setSelectedMethod(null);
      setTransactionId('');
      setSenderName('');
      setSenderNumber('');
      setIsLoading(false);
      setError('');
      setCopied('');
    }, 400);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSelectMethod = (method: typeof paymentMethods[0]) => {
    setSelectedMethod(method);
    if (method.type === 'contact') {
      setStep('contact');
    } else {
      setStep('payment-details');
    }
  };

  const handleConfirmPayment = async () => {
    if (!transactionId.trim()) {
      setError('Please enter your transaction ID');
      return;
    }
    if (!senderName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!senderNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate processing
    await new Promise(r => setTimeout(r, 2500));
    setIsLoading(false);
    setStep('success');
  };

  const renderContent = () => {
    switch (step) {
      case 'select-plan':
        return (
          <div>
            <h2 className="font-orbitron font-black text-2xl text-white mb-2 text-center">Choose Your Plan</h2>
            <p className="font-inter text-gray-500 text-lg mb-6 text-center">Select the plan that fits your needs</p>
            <div className="space-y-3 text-center">
              {plans.map((p) => (
                <motion.button
                  key={p.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedPlan(p); setStep('select-method'); }}
                  className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 group text-center"
                  style={{
                    background: p.featured ? 'rgba(255,43,43,0.1)' : 'rgba(255,255,255,0.03)',
                    border: p.featured ? '1px solid rgba(255,43,43,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: p.featured ? '0 0 20px rgba(255,43,43,0.1)' : 'none',
                  }}
                >
                  <div className="text-left text-center">
                    <div className="flex items-center gap-2 text-center">
                      <span className="font-orbitron font-bold text-white text-center">{p.name}</span>
                      {p.featured && (
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-inter text-center">POPULAR</span>
                      )}
                    </div>
                    <span className="font-inter text-gray-500 text-lg text-center">{p.description}</span>
                  </div>
                  <div className="flex items-center gap-3 text-center">
                    <span className="font-orbitron font-black text-2xl text-center" style={{ color: '#ff2b2b' }}>${p.price}</span>
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-red-500 transition-colors text-center" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'select-method':
        return (
          <div>
            <button onClick={() => setStep('select-plan')} className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors mb-4 font-inter text-lg text-center">
              ← Back
            </button>
            <h2 className="font-orbitron font-black text-2xl text-white mb-1 text-center">Select Payment</h2>
            <div className="flex items-center gap-3 mb-6 text-center">
              <span className="font-inter text-gray-500 text-lg text-center">Plan:</span>
              <span className="font-orbitron font-bold text-red-400 text-center">{selectedPlan.name}</span>
              <span className="font-orbitron font-black text-white text-center">${selectedPlan.price}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectMethod(method)}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 group text-center"
                  style={{
                    background: method.bgColor,
                    border: `1px solid ${method.borderColor}`,
                  }}
                >
                  <span className="text-3xl text-center">{method.logo}</span>
                  <div className="text-center text-center">
                    <div className="font-orbitron font-bold text-lg text-white text-center">{method.name}</div>
                    <div className="font-inter text-xs text-gray-500 mt-0.5 text-center">{method.description}</div>
                  </div>
                  {method.type === 'contact' && (
                    <span className="text-xs font-inter text-blue-400 flex items-center gap-1 text-center">
                      <MessageCircle size={10} /> Contact Us
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'payment-details':
        return (
          <div>
            <button onClick={() => setStep('select-method')} className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors mb-4 font-inter text-lg text-center">
              ← Back
            </button>
            <h2 className="font-orbitron font-black text-2xl text-white mb-1 text-center">Complete Payment</h2>
            <p className="font-inter text-gray-500 text-lg mb-6 text-center">Send payment and enter your transaction details</p>

            {/* Amount box */}
            <div
              className="p-4 rounded-xl mb-5 flex items-center justify-between text-center"
              style={{ background: 'rgba(255,43,43,0.08)', border: '1px solid rgba(255,43,43,0.2)' }}
            >
              <div>
                <div className="font-inter text-gray-400 text-lg text-center">Amount to Pay</div>
                <div className="font-orbitron font-black text-3xl text-center" style={{ color: '#ff2b2b' }}>
                  ${selectedPlan.price}
                </div>
              </div>
              <div className="text-right text-center">
                <div className="font-inter text-gray-400 text-lg text-center">Plan</div>
                <div className="font-orbitron font-bold text-white text-center">{selectedPlan.name}</div>
              </div>
            </div>

            {/* Account number */}
            <div
              className="p-4 rounded-xl mb-5 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between mb-2 text-center">
                <span className="font-orbitron text-lg font-bold text-center" style={{ color: selectedMethod?.color }}>
                  {selectedMethod?.name} Account
                </span>
                <span className="font-inter text-xs text-gray-500 text-center">Send payment to:</span>
              </div>
              <div className="flex items-center justify-between text-center">
                <span className="font-mono text-xl text-white font-bold tracking-wider text-center">{selectedMethod?.number}</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(selectedMethod?.number || '', 'number')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-inter text-xs transition-all text-center backdrop-blur-xl border border-white/10 bg-white/5"
                  style={{
                    background: copied === 'number' ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                    border: copied === 'number' ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    color: copied === 'number' ? '#22c55e' : '#9ca3af',
                  }}
                >
                  {copied === 'number' ? <Check size={12} /> : <Copy size={12} />}
                  {copied === 'number' ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </div>

            {/* Instructions */}
            <div
              className="p-3 rounded-xl mb-5 flex gap-3 text-center"
              style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}
            >
              <AlertCircle size={16} className="text-yellow-500 flex-shrink-0 mt-0.5 text-center" />
              <p className="font-inter text-yellow-600 text-xs leading-relaxed text-center">
                Send exactly <strong className="text-yellow-400 text-center">${selectedPlan.price}</strong> via {selectedMethod?.name}. After sending, enter the transaction details below.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-3 text-center">
              <input
                type="text"
                placeholder="Your Full Name"
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-inter text-lg text-white placeholder-gray-600 outline-none transition-all text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                onFocus={e => e.target.style.borderColor = 'rgba(255,43,43,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <input
                type="tel"
                placeholder="Your Phone Number"
                value={senderNumber}
                onChange={e => setSenderNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-inter text-lg text-white placeholder-gray-600 outline-none transition-all text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                onFocus={e => e.target.style.borderColor = 'rgba(255,43,43,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <input
                type="text"
                placeholder="Transaction ID / Reference Number"
                value={transactionId}
                onChange={e => setTransactionId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-inter text-lg text-white placeholder-gray-600 outline-none transition-all text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                onFocus={e => e.target.style.borderColor = 'rgba(255,43,43,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 mt-3 text-red-400 text-lg font-inter text-center">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirmPayment}
              disabled={isLoading}
              className="w-full mt-5 py-4 rounded-xl font-orbitron font-bold text-lg tracking-widest uppercase text-white btn-primary flex items-center justify-center gap-2 disabled:opacity-70 text-center"
            >
              {isLoading ? (
                <>
                  <Loader size={16} className="animate-spin text-center" />
                  Verifying Payment...
                </>
              ) : (
                <>
                  <Check size={16} />
                  Confirm Payment
                </>
              )}
            </motion.button>
          </div>
        );

      case 'contact':
        return (
          <div>
            <button onClick={() => setStep('select-method')} className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors mb-4 font-inter text-lg text-center">
              ← Back
            </button>

            {/* Header */}
            <div className="text-center mb-6 text-center">
              <div className="text-5xl mb-3 text-center">{selectedMethod?.logo}</div>
              <h2 className="font-orbitron font-black text-2xl text-white mb-1 text-center">{selectedMethod?.name} Payment</h2>
              <p className="font-inter text-gray-500 text-lg text-center">
                For {selectedMethod?.name} payments, please contact our support team to complete your order.
              </p>
            </div>

            {/* Info banner */}
            <div
              className="p-4 rounded-xl mb-6 text-center text-center"
              style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)' }}
            >
              <div className="font-orbitron font-bold text-blue-400 text-lg mb-1 text-center">ORDER DETAILS</div>
              <div className="font-inter text-gray-400 text-lg text-center">
                Plan: <strong className="text-white text-center">{selectedPlan.name}</strong> — Amount: <strong className="text-red-400 text-center">${selectedPlan.price}</strong>
              </div>
            </div>

            {/* Contact options */}
            <div className="space-y-3 mb-6 text-center">
              {/* Discord */}
              <a
                href="https://discord.com/users/therealm0997"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] group text-center"
                style={{ background: 'rgba(88,101,242,0.08)', border: '1px solid rgba(88,101,242,0.3)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-center"
                  style={{ background: 'rgba(88,101,242,0.2)' }}
                >
                  <span className="text-xl text-center">💬</span>
                </div>
                <div className="flex-1 text-center">
                  <div className="font-orbitron font-bold text-lg text-white text-center">Discord</div>
                  <div className="font-mono text-blue-400 text-lg text-center">therealm0997</div>
                </div>
                <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors text-center" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923390042189"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] group text-center"
                style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.3)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-center"
                  style={{ background: 'rgba(37,211,102,0.2)' }}
                >
                  <Phone size={18} style={{ color: '#25d366' }} />
                </div>
                <div className="flex-1 text-center">
                  <div className="font-orbitron font-bold text-lg text-white text-center">WhatsApp</div>
                  <div className="font-mono text-green-400 text-lg text-center">03390042189</div>
                </div>
                <ExternalLink size={14} className="text-gray-600 group-hover:text-green-400 transition-colors text-center" />
              </a>

              {/* Email */}
              <a
                href="mailto:abdulxpro786@gmail.com?subject=AIMOPT Order - Faucet Payment&body=Hello, I would like to pay via Faucet for the AIMOPT plan."
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] group text-center"
                style={{ background: 'rgba(255,43,43,0.06)', border: '1px solid rgba(255,43,43,0.2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-center"
                  style={{ background: 'rgba(255,43,43,0.15)' }}
                >
                  <Mail size={18} style={{ color: '#ff2b2b' }} />
                </div>
                <div className="flex-1 text-center">
                  <div className="font-orbitron font-bold text-lg text-white text-center">Email</div>
                  <div className="font-mono text-red-400 text-lg text-center">abdulxpro786@gmail.com</div>
                </div>
                <ExternalLink size={14} className="text-gray-600 group-hover:text-red-400 transition-colors text-center" />
              </a>
            </div>

            <div
              className="p-4 rounded-xl text-center text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="font-inter text-gray-500 text-xs leading-relaxed text-center">
                📌 For {selectedMethod?.name} payments, please contact support to complete your order. Mention your plan name and send proof of payment.
              </p>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-6 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.05))',
                border: '2px solid rgba(34,197,94,0.5)',
                boxShadow: '0 0 40px rgba(34,197,94,0.3)',
              }}
            >
              <Check size={40} className="text-green-400 text-center" strokeWidth={3} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-orbitron font-black text-3xl text-white mb-2 text-center">Order Submitted!</h2>
              <div className="font-orbitron font-bold text-green-400 text-lg tracking-widest mb-4 text-center">PAYMENT RECEIVED</div>

              <div
                className="p-4 rounded-xl mb-5 inline-block mx-auto text-center"
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                <p className="font-inter text-gray-300 text-lg leading-relaxed text-center">
                  Your <strong className="text-white text-center">{selectedPlan.name}</strong> plan order has been received.
                  Our team will verify your payment and deliver access within <strong className="text-green-400 text-center">minutes</strong>.
                </p>
              </div>

              <div className="space-y-2 mb-6 text-left text-center">
                <div
                  className="p-3 rounded-xl flex items-center gap-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Check size={14} className="text-green-400 text-center" />
                  <span className="font-inter text-gray-400 text-lg text-center">Order confirmation noted</span>
                </div>
                <div
                  className="p-3 rounded-xl flex items-center gap-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Check size={14} className="text-green-400 text-center" />
                  <span className="font-inter text-gray-400 text-lg text-center">Payment verification in progress</span>
                </div>
                <div
                  className="p-3 rounded-xl flex items-center gap-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Loader size={14} className="text-yellow-400 animate-spin text-center" />
                  <span className="font-inter text-gray-400 text-lg text-center">Access delivery pending</span>
                </div>
              </div>

              <div
                className="p-4 rounded-xl mb-5 text-center"
                style={{ background: 'rgba(255,43,43,0.06)', border: '1px solid rgba(255,43,43,0.2)' }}
              >
                <p className="font-inter text-gray-400 text-xs leading-relaxed text-center">
                  Need help? Contact us on Discord:{' '}
                  <strong className="text-red-400 text-center">therealm0997</strong>{' '}
                  or WhatsApp: <strong className="text-red-400 text-center">03390042189</strong>
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClose}
                className="btn-primary font-orbitron font-bold text-white px-10 py-3 rounded-xl tracking-widest uppercase text-lg text-center"
              >
                Done
              </motion.button>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay text-center"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl text-center backdrop-blur-xl border border-white/10 bg-white/5"
            style={{
              background: '#0d0d0d',
              border: '1px solid rgba(255,43,43,0.2)',
              boxShadow: '0 0 60px rgba(255,43,43,0.15), 0 30px 80px rgba(0,0,0,0.8)',
            }}
          >
            {/* Header bar */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 text-center"
              style={{
                background: '#0d0d0d',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex items-center gap-2 text-center">
                <div
                  className="w-2 h-2 rounded-full animate-pulse text-center"
                  style={{ background: '#ff2b2b', boxShadow: '0 0 6px #ff2b2b' }}
                />
                <span className="font-orbitron text-xs text-red-500 tracking-widest text-center">SECURE CHECKOUT</span>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-white transition-colors p-1 rounded-2xl hover:bg-white/5 text-center backdrop-blur-xl border border-white/10 bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
