import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-stone-400 py-20 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Column 1: Navigatie */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-2 px-[2px]">Navigatie</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-stone-400 hover:text-white transition-colors font-light text-base">Home</Link>
              <Link href="/over-ons" className="text-stone-400 hover:text-white transition-colors font-light text-base">Over ons</Link>
              <Link href="/insights" className="text-stone-400 hover:text-white transition-colors font-light text-base">Insights</Link>
              <Link href="/#diensten" className="text-stone-400 hover:text-white transition-colors font-light text-base">Diensten</Link>
            </nav>
          </div>

          {/* Column 2: Juridisch & Sociaal */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-2 px-[2px]">Juridisch & Sociaal</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/privacy" className="text-stone-400 hover:text-white transition-colors font-light text-base">Privacy Policy</Link>
              <Link href="#" className="text-stone-400 hover:text-white transition-colors font-light text-base">LinkedIn</Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-6 h-6 transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/sproscale-emblem-white.png"
                  alt="Sproscale Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl tracking-tighter text-white uppercase">SPROSCALE</span>
            </Link>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-stone-600">
            © {new Date().getFullYear()} SPROSCALE - Alle rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
