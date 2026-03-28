"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Diensten', href: '/#diensten' },
    { name: 'Over ons', href: '/over-ons' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 h-20 flex items-center ${isScrolled ? 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200 shadow-sm' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-xl tracking-tighter text-stone-950 hover:text-stone-600 transition-colors uppercase">SPROSCALE</Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs font-semibold tracking-wider uppercase text-stone-950 hover:text-stone-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-stone-950"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-50 border-b border-stone-200 overflow-hidden absolute top-20 left-0 w-full z-40 shadow-xl"
          >
            <div className="flex flex-col px-4 py-8 gap-6 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-semibold tracking-wider uppercase text-stone-950 hover:text-stone-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
