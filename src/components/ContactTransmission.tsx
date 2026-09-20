import React, { useState } from 'react';
import { Send, CheckCircle2, Radio, Sparkles, Terminal, Mail, ArrowUpRight, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { PORTFOLIO_DATA } from '../portfolioData';
import { sendContactEmail } from '../utils/emailService';

export const ContactTransmission: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  const handleInputChange = (field: string, val: string) => {
    sound.playKey();
    if (errorMessage) setErrorMessage(null);
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleUnlockTransmission = () => {
    sound.playWarp();
    setIsLocked(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playWarp();
    setStatus('sending');
    setErrorMessage(null);

    const result = await sendContactEmail({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    if (result.success) {
      sound.playSuccess();
      setStatus('sent');

      // Satisfying particle burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff1e27', '#ffffff', '#27272e'],
      });
    } else {
      setStatus('idle');
      setErrorMessage(result.message || 'Transmission failed. Please check your API configuration.');
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-void py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 mb-16 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-crimson font-mono text-sm font-bold tracking-widest">[06]</span>
            <h2 className="font-mono text-sm tracking-widest text-white/80 uppercase">
              THE TRANSMISSION CHAMBER // FINAL SCENE
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-crimson">
            <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
            <span>DIRECT PROTOCOL</span>
          </div>
        </div>

        {/* Lead In */}
        <div className="mb-12">
          <h3 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight mb-3">
            {PORTFOLIO_DATA.contact.title}
          </h3>
          <p className="font-mono text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
            {PORTFOLIO_DATA.contact.subtitle}
          </p>
        </div>

        {/* Interactive Gate: If locked, require user interaction */}
        {isLocked ? (
          <div className="p-10 border border-crimson/40 bg-surface-900/60 backdrop-blur-md text-center flex flex-col items-center justify-center space-y-6">
            <div className="p-4 rounded-full bg-crimson/10 border border-crimson/30">
              <Radio className="w-8 h-8 text-crimson animate-pulse" />
            </div>

            <div>
              <h4 className="font-display font-bold text-2xl text-white mb-2">
                SIGNAL PROTOCOL STANDBY
              </h4>
              <p className="font-mono text-xs text-white/50 max-w-md">
                Initiate encrypted communication link with Anmol Verma's direct workspace.
              </p>
            </div>

            <button
              onClick={handleUnlockTransmission}
              onMouseEnter={() => sound.playHover()}
              data-cursor="SIGNAL"
              className="px-8 py-3.5 bg-crimson hover:bg-crimson-hover text-white font-mono text-xs tracking-widest uppercase rounded shadow-2xl transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>ENGAGE TRANSMISSION LINK</span>
            </button>
          </div>
        ) : status === 'sent' ? (
          /* Success Screen */
          <div className="p-12 border border-emerald-500/40 bg-surface-900 text-center flex flex-col items-center justify-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="font-display font-bold text-3xl text-white mb-2">
                TRANSMISSION DELIVERED
              </h4>
              <p className="font-mono text-xs text-white/60 max-w-md">
                Thank you, {formData.name}. Your signal has been received. I will review your dispatch shortly.
              </p>
            </div>

            <div className="font-mono text-xs text-white/40 border-t border-white/10 pt-4">
              RECEIVER: {PORTFOLIO_DATA.contact.email}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setStatus('idle');
                setFormData({ name: '', email: '', message: '' });
              }}
              className="px-6 py-2 border border-white/20 hover:border-white text-white font-mono text-xs transition-colors"
            >
              SEND ANOTHER SIGNAL
            </button>
          </div>
        ) : (
          /* Active Transmission Form */
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-12 border border-white/10 bg-surface-900/60 backdrop-blur-md shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 tracking-wider uppercase">
                  NAME // IDENTITY <span className="text-crimson">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your Name or Organization"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 focus:border-crimson outline-none font-mono text-xs text-white placeholder-white/20 transition-colors"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block font-mono text-xs text-white/60 tracking-wider uppercase">
                  RETURN ADDRESS // EMAIL <span className="text-crimson">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 focus:border-crimson outline-none font-mono text-xs text-white placeholder-white/20 transition-colors"
                />
              </div>

            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-white/60 tracking-wider uppercase">
                DISPATCH PAYLOAD // MESSAGE <span className="text-crimson">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Share your ideas, inquiries, project proposals, or greetings..."
                className="w-full px-4 py-3 bg-black/40 border border-white/10 focus:border-crimson outline-none font-mono text-xs text-white placeholder-white/20 transition-colors resize-none"
              />
            </div>

            {/* Error Notification Alert */}
            {errorMessage && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded flex items-start gap-2.5 text-xs font-mono text-rose-400 animate-in fade-in duration-200">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <div>
                  <span className="font-bold">TRANSMISSION NOTICE: </span>
                  {errorMessage}
                </div>
              </div>
            )}

            {/* Send Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/10 gap-4">
              <div className="font-mono text-[11px] text-white/40">
                LATENCY: {PORTFOLIO_DATA.contact.responseLatency}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={() => sound.playHover()}
                data-cursor="DISPATCH"
                className="px-8 py-3.5 bg-crimson hover:bg-crimson-hover disabled:opacity-50 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
              >
                {status === 'sending' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>LAUNCH SIGNAL</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
