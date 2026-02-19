/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import heroImage from './assets/Nithu.jpg';

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Invitation', 'RSVP'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center w-full gap-12">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white font-sans text-xs uppercase tracking-[0.2em] hover:text-gold transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { height: "100vh", opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
        className="fixed inset-0 bg-black z-40 md:hidden overflow-hidden flex flex-col items-center justify-center gap-8"
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-gold">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        {links.map((link) => (
          <button
            key={link}
            onClick={() => {
              setIsOpen(false);
              document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-white font-serif text-3xl uppercase tracking-widest hover:text-gold"
          >
            {link}
          </button>
        ))}
      </motion.div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="home" className="relative min-h-screen bg-black flex flex-col items-center pt-32 overflow-hidden">
      {/* Top Gold Texture Border */}
      <div className="absolute top-0 left-0 w-full h-32 gold-texture-border z-20 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-script text-3xl md:text-4xl text-gold mb-4">The Wedding of</p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white uppercase tracking-[0.1em] font-light leading-none mb-6">
            Nithin <span className="text-gold font-light">&</span> Deekshitha
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-sans text-gold text-xs md:text-sm tracking-[0.3em] uppercase">
            <span>Sunday, April 26, 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Vajradumbi House, Kodekal, Ujire</span>
          </div>
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div
        style={{ y: y1 }}
        className="w-full max-w-5xl h-[60vh] md:h-[70vh] relative mx-auto px-4"
      >
        <div className="absolute inset-0 border border-gold/30 z-20 m-4 md:m-8 pointer-events-none"></div>
        <div className="w-full h-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80"></div>
          <img
            src={heroImage}
            alt="Nithin and Deekshitha"
            className="w-full h-full object-cover grayscale opacity-80"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </section>
  );
};

// Invitation Section
const Invitation = () => {
  return (
    <section id="invitation" className="bg-cream py-32 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-20 left-[-10%] w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-[-10%] w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white p-12 md:p-24 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative border border-gold/20"
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

        {/* Minimalist Floral Line Art - Top Right */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0C100 50 150 100 200 100M100 0C100 50 50 100 0 100M100 200C100 150 150 100 200 100M100 200C100 150 50 100 0 100" stroke="#C9B896" strokeWidth="1" />
          </svg>
        </div>

        {/* Corner Accents - Refined */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/60"></div>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/60"></div>

        <div className="text-center space-y-10 relative z-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-charcoal/50">Together with their families</p>

          <div className="relative">
            <h2 className="font-serif text-6xl md:text-7xl text-black uppercase tracking-widest font-light relative z-10">
              Nithin <span className="text-gold text-5xl md:text-6xl align-middle">&</span> Deekshitha
            </h2>
            {/* Subtle text shadow/glow */}
            <div className="absolute inset-0 blur-xl bg-white/50 -z-10"></div>
          </div>

          <p className="font-serif text-xl italic text-charcoal/70 font-light">
            invite you to celebrate their wedding
          </p>

          <div className="py-10 border-t border-b border-gold/10 my-10 space-y-6 relative">
            {/* Vertical line accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-gold/30"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-gold/30"></div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
              <div className="text-center">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">Sunday</p>
                <p className="font-serif text-3xl text-black">April 26th</p>
              </div>
              <div className="w-[1px] h-12 bg-gold/20 hidden md:block"></div>
              <div className="text-center">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">Ceremony</p>
                <p className="font-serif text-3xl text-gold">12:00 PM</p>
              </div>
              <div className="w-[1px] h-12 bg-gold/20 hidden md:block"></div>
              <div className="text-center">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">Location</p>
                <p className="font-serif text-3xl text-black">Vajradumbi House</p>
              </div>
            </div>

            <p className="font-sans text-xs text-charcoal/50 mt-4 tracking-wide">Kodekal, Ujire</p>
          </div>

          <p className="font-serif text-lg italic text-charcoal/70">
            Dinner, drinks, and dancing to follow
          </p>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://maps.app.goo.gl/f2BmkKavtt6gXoCF9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-12 border border-gold text-black px-12 py-4 font-sans text-[10px] uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all duration-500"
          >
            View Location
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};


// API URL — points to Express backend (proxied locally, direct on Vercel)
const API_URL = '/api';

// RSVP Section
const RSVP = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState(true);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, attending, dietaryRestrictions }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9B896', '#E8DCC4', '#FFFFFF']
      });
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="rsvp" className="bg-cream py-32 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <span className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Kindly Reply</span>
        <h2 className="font-serif text-5xl text-black uppercase tracking-widest mb-12">RSVP</h2>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-12 border border-gold/30 shadow-lg"
          >
            <h3 className="font-serif text-3xl text-gold mb-4">Thank You</h3>
            <p className="font-sans text-sm text-charcoal uppercase tracking-widest">We look forward to celebrating with you.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-12 shadow-xl border-t-4 border-gold">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-sans">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-left">
                <label className="block font-sans text-xs uppercase tracking-widest text-charcoal mb-2">First Name</label>
                <input
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-cream/30 border-b border-charcoal/20 p-2 focus:border-gold outline-none transition-colors font-serif text-xl"
                />
              </div>
              <div className="text-left">
                <label className="block font-sans text-xs uppercase tracking-widest text-charcoal mb-2">Last Name</label>
                <input
                  required
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-cream/30 border-b border-charcoal/20 p-2 focus:border-gold outline-none transition-colors font-serif text-xl"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block font-sans text-xs uppercase tracking-widest text-charcoal mb-2">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cream/30 border-b border-charcoal/20 p-2 focus:border-gold outline-none transition-colors font-serif text-xl"
              />
            </div>

            <div className="flex justify-center gap-12 py-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="attending"
                  className="accent-gold w-5 h-5"
                  checked={attending === true}
                  onChange={() => setAttending(true)}
                />
                <span className="font-sans text-xs uppercase tracking-widest group-hover:text-gold transition-colors">Joyfully Accept</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="attending"
                  className="accent-gold w-5 h-5"
                  checked={attending === false}
                  onChange={() => setAttending(false)}
                />
                <span className="font-sans text-xs uppercase tracking-widest group-hover:text-gold transition-colors">Regretfully Decline</span>
              </label>
            </div>

            <div className="text-left">
              <label className="block font-sans text-xs uppercase tracking-widest text-charcoal mb-2">Dietary Restrictions</label>
              <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                className="w-full bg-cream/30 border-b border-charcoal/20 p-2 focus:border-gold outline-none transition-colors font-serif text-xl"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-gold py-4 font-sans text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Response'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="bg-black min-h-screen selection:bg-gold selection:text-black">
      <Navigation />
      <Hero />
      <Invitation />
      <RSVP />

      <footer className="bg-black py-12 text-center border-t border-gold/10">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-600">
          Nithin & Deekshitha • 2026
        </p>
      </footer>
    </div>
  );
}
