import { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços e Preços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Agendamento', href: '#agendamento' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark border-b border-gold/20 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#inicio')}
          className="flex items-center gap-2 group"
        >
          <Scissors className="w-7 h-7 text-gold group-hover:rotate-12 transition-transform duration-300" />
          <div className="text-left leading-none">
            <span className="block font-display text-lg sm:text-xl font-semibold tracking-wide text-white">
              BARBEARIA
            </span>
            <span className="block text-[10px] sm:text-xs tracking-[0.3em] text-gold uppercase">
              Gabrielly
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-gray-300 hover:text-gold transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('#agendamento')}
            className="hidden sm:inline-flex gold-gradient text-black font-semibold text-sm px-5 py-2.5 rounded-sm hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
          >
            AGENDAR HORÁRIO
          </button>
          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden glass-dark border-t border-gold/10 mt-3 animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-gray-300 hover:text-gold py-2 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#agendamento')}
              className="gold-gradient text-black font-semibold text-sm px-5 py-3 rounded-sm text-center mt-2"
            >
              AGENDAR HORÁRIO
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
