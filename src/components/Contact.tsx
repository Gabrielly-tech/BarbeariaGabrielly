import { MapPin, Phone, Instagram, MessageCircle, Clock } from 'lucide-react';
import { WHATSAPP_NUMBER, ADDRESS, INSTAGRAM_URL, BUSINESS_HOURS } from '@/config';

export default function Contact() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Olá! Vim pelo site da Barbearia Gabrielly e gostaria de mais informações.'
  )}`;

  return (
    <section id="contato" className="py-20 sm:py-28 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-10 bg-gold/50" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Contato</span>
            <div className="h-[1px] w-10 bg-gold/50" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Localização e <span className="gold-text-gradient">Contato</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info card */}
          <div className="reveal bg-gradient-to-b from-[#141414] to-[#0d0d0d] border border-gold/15 rounded-lg p-8">
            <h3 className="font-display text-2xl font-semibold text-white mb-6">
              Barbearia Gabrielly
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3 mb-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-gold/20 bg-gold/5 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Endereço</p>
                <p className="text-gray-300 text-sm">{ADDRESS}</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-3 mb-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-gold/20 bg-gold/5 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">WhatsApp</p>
                <p className="text-gray-300 text-sm">
                  {WHATSAPP_NUMBER.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}
                </p>
              </div>
            </div>

            {/* Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 mb-5 group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-gold/20 bg-gold/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                <Instagram className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Instagram</p>
                <p className="text-gray-300 text-sm group-hover:text-gold transition-colors">
                  @{INSTAGRAM_URL.replace('https://instagram.com/', '').replace(/\/$/, '')}
                </p>
              </div>
            </a>

            {/* Hours summary */}
            <div className="flex items-start gap-3 mb-7">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-gold/20 bg-gold/5 flex items-center justify-center">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Funcionamento</p>
                <div className="space-y-0.5">
                  {BUSINESS_HOURS.filter((d) => !d.closed).map((d) => (
                    <p key={d.day} className="text-gray-400 text-xs">
                      <span className="text-gray-300">{d.day.replace('-feira', '')}:</span> {d.open} — {d.close}
                    </p>
                  ))}
                  <p className="text-gray-500 text-xs">Domingo: Fechado</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gold-gradient text-black font-bold px-6 py-4 rounded-sm hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> FALAR PELO WHATSAPP
            </a>
          </div>

          {/* Map placeholder */}
          <div className="reveal rounded-lg overflow-hidden border border-white/5 min-h-[400px] relative bg-[#141414] flex items-center justify-center">
            <div className="text-center px-6">
              <MapPin className="w-12 h-12 text-gold/30 mx-auto mb-3" />
              <p className="text-gray-500 text-sm max-w-xs">
                Mapa interativo será exibido aqui quando o endereço real for configurado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
