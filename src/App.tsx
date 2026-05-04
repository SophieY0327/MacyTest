/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Camera, 
  BookOpen, 
  Mail, 
  Instagram, 
  ChevronRight, 
  Menu, 
  X, 
  Quote,
  PawPrint
} from 'lucide-react';
import { useState, useEffect, type FormEvent } from 'react';

// --- Constants & Data ---

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Growth', href: '#diary' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

const DIARY_ENTRIES = [
  {
    id: 1,
    date: '2025.12.24',
    title: 'First Christmas Eve',
    excerpt: 'On this cold winter night, I found a warm home. My human prepared a soft bed and my very first gift...',
    image: 'https://images.unsplash.com/photo-1629161747808-011867c4ec2a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    date: '2026.03.15',
    title: 'Snow First Experience',
    excerpt: 'Bernese Mountain Dogs truly belong to the cold currents. The first time stepping into deep snow, I didn\'t feel cold at all...',
    image: 'https://images.unsplash.com/photo-1612533051185-3069151f1585?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    date: '2026.05.01',
    title: 'Forest Trekking Diary',
    excerpt: 'The deep green forest is the perfect match for my tri-color coat. Here, I feel like the most majestic mountain patroller.',
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=800',
  }
];

const LOOKBOOK_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80&w=1000',
    title: 'Alpine Morning',
    desc: 'As the first rays of sun peak into the valley, Macy has already left her first paw print on the dew-covered grass.'
  },
  {
    src: 'https://images.unsplash.com/photo-1629161747808-011867c4ec2a?auto=format&fit=crop&q=80&w=1000',
    title: 'Gaze in the Warm Sun',
    desc: 'Capturing a pair of gentle eyes, filled with the peace unique to a Bernese, capable of healing all exhaustion.'
  },
  {
    src: 'https://images.unsplash.com/photo-1614272218903-8473deed1b3b?auto=format&fit=crop&q=80&w=1000',
    title: 'Meadow Revelry',
    desc: 'Despite her large size, she runs like a flexible little giant, every strand of fur dancing in the wind.'
  },
  {
    src: 'https://images.unsplash.com/photo-1612533051185-3069151f1585?auto=format&fit=crop&q=80&w=1000',
    title: 'A Winter Fairy Tale',
    desc: 'When snowflakes land on her thick black coat, she looks as if she has returned to the majestic peaks of her ancestors.'
  },
  {
    src: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?auto=format&fit=crop&q=80&w=1000',
    title: 'Porch Guardian',
    desc: 'She sits there quietly, requiring no words; her presence alone is a silent and profound companionship.'
  },
  {
    src: 'https://images.unsplash.com/photo-1643194684534-19266ab0188b?auto=format&fit=crop&q=80&w=1000',
    title: 'Cool Stream Moment',
    desc: 'By the stream in the deep forest, she explores nature\'s mysteries with a wet nose, seeking the coolness of summer.'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-macy-black/90 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-macy-rust rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
            <PawPrint className="text-white" size={20} />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tighter text-white">MACY.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-macy-rust transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="border border-white/20 text-white px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-macy-black transition-all active:scale-95"
          >
            Say Hello
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-macy-charcoal px-6 py-10 md:hidden flex flex-col gap-6"
          >
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-2xl font-serif text-white border-b border-white/5 pb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-macy-black">
    {/* Full Screen Background Image */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=2000" 
        alt="Bernese Mountain Dog in Nature" 
        className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-macy-black via-macy-black/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-macy-black via-transparent to-transparent"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="text-macy-rust font-bold uppercase tracking-[0.4em] text-xs">Origin Switzerland</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-macy-rust"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
          </div>
        </div>
        

        <div className="flex flex-col md:flex-row md:items-center gap-12 mt-12">
          <div className="space-y-4">
            <div className="flex gap-4">
              <button className="bg-macy-rust text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
                Discover My Story <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="hidden lg:block border-l border-white/10 pl-10 py-2">
            <div className="space-y-6">
              <div>
                <p className="text-white/40 uppercase text-[10px] tracking-[0.2em] font-bold mb-1">Character</p>
                <p className="text-sm font-medium">Steady, Loyal, and Infinite Patience</p>
              </div>
              <div>
                <p className="text-white/40 uppercase text-[10px] tracking-[0.2em] font-bold mb-1">Attitude</p>
                <p className="text-sm font-medium">Nap in the sun, or gallop in the wild</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
    >
      <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
      <div className="w-[1px] h-12 bg-white"></div>
    </motion.div>
  </section>
);

const About = () => (
  <section id="about" className="py-32 bg-white text-macy-black relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
      <div className="relative">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative z-10">
          <img src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=1200" alt="Macy in field" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        {/* Floating badge */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-macy-rust rounded-full flex flex-col items-center justify-center text-white z-20 shadow-2xl border-8 border-white">
          <p className="text-4xl font-serif font-bold">02</p>
          <p className="text-[10px] uppercase tracking-widest font-bold">Years of Joy</p>
        </div>
      </div>

      <div>
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9]">Born in Wild,<br /><span className="text-macy-rust">Bound by Warmth</span>.</h2>
          <div className="space-y-6 text-macy-black/70 leading-relaxed text-lg">
            <p>
              The Bernese Mountain Dog originates from the Swiss Alps. This noble lineage grants me a thick tri-color coat to withstand the snow, and a heart as calm as the peaks.
            </p>
            <p>
              I dislike the noise of the city, but I love every inch of soft meadow. My black fur holds the silence of the night, the white flash on my chest represents mountain purity, and that touch of rust is the warmth of the earth.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-10 border-t border-macy-black/5">
          <div>
            <p className="text-macy-rust font-serif text-3xl mb-1">Gentle</p>
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Temperament</p>
          </div>
          <div>
            <p className="text-macy-rust font-serif text-3xl mb-1">Steady</p>
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Stability</p>
          </div>
          <div>
            <p className="text-macy-rust font-serif text-3xl mb-1">Loyal</p>
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Loyalty</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const GrowthBanner = () => (
  <section id="diary" className="py-20 bg-white">
    <div className="max-w-[1800px] mx-auto px-4">
      <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl">
        {/* 模拟视频背景：使用极宽的场景图 */}
        <img 
          src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=2048" 
          alt="Macy in the mountains" 
          className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* 视频遮罩与动态效果 */}
        <div className="absolute inset-0 bg-macy-black/30 group-hover:bg-macy-black/20 transition-colors duration-700 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-macy-rust transition-all duration-500 relative">
              <div className="w-0 h-0 border-t-[10px] md:border-t-[12px] border-t-transparent border-l-[16px] md:border-l-[20px] border-l-white border-b-[10px] md:border-b-[12px] border-b-transparent ml-2 group-hover:border-l-macy-rust transition-colors"></div>
              {/* 扩散光圈动画 */}
              <div className="absolute inset-0 rounded-full border border-white animate-ping opacity-20"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-6 inline-block">
              Cinematic Record 2026
            </span>
            <h2 className="text-3xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
              Running Through <span className="italic font-serif">Alpine</span> Memories
            </h2>
            <p className="text-white/80 text-sm md:text-xl font-serif italic max-w-2xl mx-auto px-4">
              "There are moments in life where every breath is a poem, even without words."
            </p>
          </motion.div>

          {/* 底部进度条模拟 */}
          <div className="absolute bottom-10 left-10 right-10 hidden md:flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
            <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-macy-rust w-1/3"></div>
            </div>
            <span className="text-[10px] font-mono text-white/50 tracking-widest font-bold">01:45 / 04:20</span>
          </div>
        </div>

        {/* 边角装饰 */}
        <div className="absolute top-8 left-8 flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-macy-rust animate-pulse"></span>
            <span className="text-[10px] uppercase font-bold text-white/70 tracking-widest">Live Record</span>
        </div>
      </div>
      
      {/* 底部文字引导 */}
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-macy-black/30 border-b border-macy-black/5 pb-8 gap-6">
        <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-macy-rust">Chapter 02</span>
            <span className="h-4 w-[1px] bg-macy-black/10"></span>
            <span className="text-sm font-serif">Memories: Paw prints from Zurich to the snow peaks of Alps</span>
        </div>
        <button className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-macy-rust transition-colors flex items-center gap-2 group">
          View All Diary <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </section>
);

const Gallery = () => {
  return (
    <section id="gallery" className="py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 mb-20 text-center">
        <div className="flex items-center justify-center gap-4 mb-4 text-macy-rust">
          <Camera size={20} />
          <span className="uppercase tracking-[0.4em] font-bold text-[10px]">Photo Memorials</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-bold text-macy-black tracking-tighter leading-none mb-6">Lookbook</h2>
        <p className="text-macy-black/40 text-lg md:text-xl font-serif italic max-w-2xl mx-auto">
          "Every click of the shutter is a gentle narrative of companionship."
        </p>
      </div>

      <div className="max-w-[1800px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {LOOKBOOK_IMAGES.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 shadow-sm bg-macy-cream">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-macy-rust tracking-widest opacity-50">0{index + 1}</span>
                  <div className="flex-1 h-[1px] bg-macy-black/5"></div>
                </div>
                <h4 className="text-xl font-serif font-bold text-macy-black group-hover:text-macy-rust transition-colors leading-tight">{item.title}</h4>
                <p className="text-macy-black/50 text-[13px] leading-relaxed line-clamp-3 font-light">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => (
  <section className="py-24 bg-macy-rust/5 relative">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <Quote className="text-macy-rust/20 mx-auto mb-8" size={60} />
      <p className="text-2xl md:text-4xl font-serif italic mb-12 text-macy-rust leading-snug">
        "Macy has not only the beauty of a Bernese, but truly a heart of gold. She is the anchor of warmth in our daily lives."
      </p>
      <div>
        <p className="font-bold tracking-widest uppercase text-sm mb-1">— Sophie, Human Companion</p>
        <p className="text-macy-black/40 text-xs">Shared from 2026 Life Journal</p>
      </div>
    </div>
  </section>
);

const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, message}),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
      };
      if (!res.ok) {
        setStatus('error');
        const base =
          typeof data.error === 'string' ? data.error : 'Something went wrong.';
        const detail =
          typeof data.detail === 'string' ? ` (${data.detail})` : '';
        setErrorMsg(`${base}${detail}`);
        return;
      }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
  <footer id="contact" className="bg-macy-black text-macy-cream py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 mb-20">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Want to have a chat<br />with my paw prints?
          </h2>
          <p className="text-macy-cream/50 mb-10 text-lg max-w-sm">
            Feel free to share your stories, or just come by to say "good girl."
          </p>
          <div className="flex gap-6">
            <a href="#" className="w-14 h-14 rounded-full border border-macy-cream/10 flex items-center justify-center hover:bg-macy-rust hover:border-macy-rust transition-all group">
              <Instagram className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-macy-cream/10 flex items-center justify-center hover:bg-macy-rust hover:border-macy-rust transition-all group">
              <Mail className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div className="bg-macy-cream/5 rounded-[2rem] p-10 backdrop-blur-sm border border-macy-cream/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-xs uppercase tracking-widest opacity-50 font-bold">Your Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full bg-transparent border-b border-macy-cream/20 py-3 focus:border-macy-rust outline-none transition-colors text-macy-cream"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-xs uppercase tracking-widest opacity-50 font-bold">Your Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-transparent border-b border-macy-cream/20 py-3 focus:border-macy-rust outline-none transition-colors text-macy-cream"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-xs uppercase tracking-widest opacity-50 font-bold">Message for Macy</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-transparent border-b border-macy-cream/20 py-3 focus:border-macy-rust outline-none transition-colors resize-none text-macy-cream"
              />
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-400/90">{errorMsg}</p>
            )}
            {status === 'success' && (
              <p className="text-sm text-macy-rust">Message sent. Thank you!</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-macy-rust py-5 rounded-xl font-bold uppercase tracking-[0.2em] hover:shadow-xl transition-all active:scale-95 text-white disabled:opacity-60 disabled:pointer-events-none"
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div className="pt-12 border-t border-macy-cream/10 flex flex-col md:flex-row justify-between items-center gap-6 text-macy-cream/30 text-xs tracking-widest uppercase">
        <p>© 2026 MACY THE BERNESE. ALL RIGHTS RESERVED.</p>
        <p className="flex items-center gap-1 text-[10px]">Built with ❤️ and 🥩</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-macy-rust transition-colors">Privacy</a>
          <a href="#" className="hover:text-macy-rust transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <About />
      <GrowthBanner />
      <Testimonial />
      <Gallery />
      <Footer />
      
      {/* Background decoration elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none opacity-20">
        <div className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] bg-macy-rust/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] bg-macy-black/5 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
