"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        e.preventDefault();
        setIsMenuOpen(false);
        
        // Scroll to the element smoothly
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          // Update the URL hash without jumping
          window.history.pushState(null, '', href.replace('/', ''));
        }, 50);
        return;
      }
    }
    
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Diensten', href: '/#diensten' },
    { name: 'Over ons', href: '/about' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-xl tracking-tight text-stone-900">SPROSCALE</Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-stone-600 hover:text-stone-900"
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
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lg font-medium text-stone-800 hover:text-stone-500 transition-colors"
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
