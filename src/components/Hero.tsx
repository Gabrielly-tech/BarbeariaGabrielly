import { Scissors, Calendar, ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3356174/pexels-photo-3356174.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Barbeiro realizando corte masculino"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Brand name */}
        <div className="animate-fade-in-up mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-[1px] w-12 bg-gold/60" />
            <Scissors className="w-5 h-5 text-gold" />
            <div className="h-[1px] w-12 bg-gold/60" />
          </div>
          <p className="text-gold text-sm sm:text-base tracking-[0.4em] uppercase font-light">
            Barbearia Gabrielly
          </p>
        </div>

        {/* Main title */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight animate-fade-in-up"
          style={{ animationDelay: '0.15s', opacity: 0 }}
        >
          SEU ESTILO.
          <br />
          <span className="gold-text-gradient">SUA IDENTIDADE.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-light animate-fade-in-up"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          Mais do que um corte, uma experiência. Precisão, qualidade e estilo em cada detalhe.
        </p>

        {/* Buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: '0.45s', opacity: 0 }}
        >
          <button
            onClick={() => scrollTo('#agendamento')}
            className="gold-gradient text-black font-semibold px-8 py-4 rounded-sm hover:shadow-2xl hover:shadow-gold/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            AGENDAR AGORA
          </button>
          <button
            onClick={() => scrollTo('#servicos')}
            className="border border-gold/50 text-gold font-semibold px-8 py-4 rounded-sm hover:bg-gold/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            CONHECER SERVIÇOS
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#servicos')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60 hover:text-gold transition-colors animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
