import {
  Scissors, Wand2, Sparkles, Wind, Ruler, Eye, Baby,
  Calendar, type LucideIcon,
} from 'lucide-react';
import { SERVICES } from '@/config';

const iconMap: Record<string, LucideIcon> = {
  Scissors, Wand2, Sparkles, Wind, Ruler, Eye, Baby,
};

export default function Services() {
  const scrollToBooking = (serviceId: string) => {
    const el = document.querySelector('#agendamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to set selected service
      window.dispatchEvent(new CustomEvent('select-service', { detail: serviceId }));
    }
  };

  return (
    <section id="servicos" className="py-20 sm:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-10 bg-gold/50" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Tabela de Preços</span>
            <div className="h-[1px] w-10 bg-gold/50" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Serviços e <span className="gold-text-gradient">Preços</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Cada serviço é executado com técnicas profissionais e produtos de alta qualidade.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.icon] ?? Scissors;
            return (
              <div
                key={service.id}
                className="reveal group relative bg-gradient-to-b from-[#141414] to-[#0d0d0d] border border-white/5 rounded-lg p-8 hover:border-gold/30 transition-all duration-500 hover:shadow-xl hover:shadow-gold/10"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-lg border border-gold/20 bg-gold/5 group-hover:bg-gold/10 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-gold" />
                </div>

                {/* Name + Description */}
                <h3 className="font-display text-2xl font-semibold text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Price + Button */}
                <div className="flex items-center justify-between gap-3 pt-5 border-t border-white/5">
                  <span className="text-2xl font-bold text-gold">
                    R$ {service.price.toFixed(2).replace('.', ',')}
                  </span>
                  <button
                    onClick={() => scrollToBooking(service.id)}
                    className="text-xs font-semibold text-gray-300 border border-gold/30 px-4 py-2 rounded-sm hover:bg-gold hover:text-black transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    AGENDAR
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
