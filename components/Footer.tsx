import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-xl tracking-tight text-white">SPROSCALE</Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <Link href="/#diensten" className="hover:text-white transition-colors">Diensten</Link>
            <Link href="/#reviews" className="hover:text-white transition-colors">Over Ons</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 SPROSCALE - Architecting Growth Systems</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800/50 border border-stone-700">
            <span className="w-2 h-2 rounded-full bg-stone-300 animate-pulse"></span>
            <span className="text-stone-300">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
