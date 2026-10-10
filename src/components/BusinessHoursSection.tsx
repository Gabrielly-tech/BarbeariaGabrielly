import { Clock } from 'lucide-react';
import { BUSINESS_HOURS } from '@/config';

export default function BusinessHoursSection() {
  const today = new Date().getDay();

  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-10 bg-gold/50" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Expediente</span>
            <div className="h-[1px] w-10 bg-gold/50" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Horários de <span className="gold-text-gradient">Funcionamento</span>
          </h2>
        </div>

        <div className="reveal max-w-2xl mx-auto bg-gradient-to-b from-[#141414] to-[#0d0d0d] border border-white/5 rounded-lg overflow-hidden">
          {BUSINESS_HOURS.map((entry, idx) => {
            const isToday = idx === today;
            return (
              <div
                key={entry.day}
                className={`flex items-center justify-between px-6 py-4 transition-colors ${
                  idx % 2 === 0 ? 'bg-white/[0.02]' : ''
                } ${isToday ? 'border-l-2 border-l-gold' : ''}`}
              >
                <div className="flex items-center gap-3">
                  {isToday && <Clock className="w-4 h-4 text-gold" />}
                  <span className={`text-sm sm:text-base ${isToday ? 'text-gold font-semibold' : 'text-gray-300'}`}>
                    {entry.day}
                    {isToday && <span className="ml-2 text-xs text-gold/70">(Hoje)</span>}
                  </span>
                </div>
                <span className={`text-sm sm:text-base ${entry.closed ? 'text-red-400/70' : isToday ? 'text-gold' : 'text-gray-400'}`}>
                  {entry.closed ? 'Fechado' : `${entry.open} — ${entry.close}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
