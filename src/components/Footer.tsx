import { Scissors, Instagram, MessageCircle, ArrowUp } from 'lucide-react';
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from '@/config';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Agendamento', href: '#agendamento' },
  { label: 'Contato', href: '#contato' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Scissors className="w-6 h-6 text-gold" />
              <span className="font-display text-lg font-semibold text-white tracking-wide">
                BARBEARIA
              </span>
            </div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Gabrielly</p>
            <p className="text-gray-500 text-sm italic">Estilo, precisão e personalidade.</p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Navegação</p>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-gray-400 text-sm hover:text-gold transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Redes Sociais</p>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-gold/20 bg-gold/5 flex items-center justify-center hover:bg-gold/15 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gold" />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-gold/20 bg-gold/5 flex items-center justify-center hover:bg-gold/15 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            © {year} Barbearia Gabrielly. Todos os direitos reservados.
          </p>
          <button
            onClick={() => scrollTo('#inicio')}
            className="text-gray-500 hover:text-gold transition-colors flex items-center gap-1.5 text-xs"
          >
            Voltar ao topo <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
