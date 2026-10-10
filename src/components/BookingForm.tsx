import { useState, useEffect, useMemo, useCallback } from 'react';
import { Calendar, Clock, User, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SERVICES, BUSINESS_HOURS, SLOT_INTERVAL_MINUTES, MAX_BOOKING_DAYS_AHEAD } from '@/config';
import { supabase } from '@/lib/supabase';
import { WHATSAPP_NUMBER } from '@/config';

function formatDateBR(date: Date): string {
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`;
}

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function generateTimeSlots(open: string, close: string, interval: number): string[] {
  const slots: string[] = [];
  const [openH, openM] = open.split(':').map(Number);
  const [closeH, closeM] = close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  for (let m = openMinutes; m < closeMinutes; m += interval) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
  }
  return slots;
}

export default function BookingForm() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Listen for service selection from Services section
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      setServiceId(detail);
    };
    window.addEventListener('select-service', handler);
    return () => window.removeEventListener('select-service', handler);
  }, []);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + MAX_BOOKING_DAYS_AHEAD);
    return toDateString(d);
  }, [today]);

  const selectedDate = useMemo(() => {
    if (!date) return null;
    const d = new Date(date + 'T00:00:00');
    return d;
  }, [date]);

  // Get day config for selected date
  const dayConfig = useMemo(() => {
    if (!selectedDate) return null;
    return BUSINESS_HOURS[selectedDate.getDay()];
  }, [selectedDate]);

  // Generate available slots for selected date
  const availableSlots = useMemo(() => {
    if (!dayConfig || dayConfig.closed || !dayConfig.open || !dayConfig.close) return [];
    const slots = generateTimeSlots(dayConfig.open, dayConfig.close, SLOT_INTERVAL_MINUTES);

    // If selected date is today, filter out past times
    const now = new Date();
    const isToday = selectedDate ? toDateString(selectedDate) === toDateString(now) : false;
    if (isToday) {
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      return slots.filter((slot) => {
        const [h, m] = slot.split(':').map(Number);
        return h * 60 + m > currentMinutes;
      });
    }
    return slots;
  }, [dayConfig, selectedDate]);

  // Fetch booked slots when date changes
  const fetchBookedSlots = useCallback(async (selectedDateStr: string) => {
    if (!selectedDateStr) return;
    setLoadingSlots(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('appointment_time')
        .eq('appointment_date', selectedDateStr)
        .neq('status', 'cancelled');

      if (error) throw error;

      setBookedSlots((data ?? []).map((r: { appointment_time: string }) => r.appointment_time.slice(0, 5)));
    } catch {
      // If DB fails, allow all slots — user confirms via WhatsApp anyway
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (date) {
      fetchBookedSlots(date);
      setTime('');
    }
  }, [date, fetchBookedSlots]);

  const isSlotBooked = (slot: string) => bookedSlots.includes(slot);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Informe seu nome completo.';
    if (!whatsapp.trim()) e.whatsapp = 'Informe seu número de WhatsApp.';
    else if (whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Número inválido. Inclua DDD.';
    if (!serviceId) e.service = 'Selecione um serviço.';
    if (!date) e.date = 'Selecione uma data.';
    if (!time) e.time = 'Selecione um horário.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');

    if (!validate()) return;

    const service = SERVICES.find((s) => s.id === serviceId);
    if (!service) return;

    setSubmitting(true);

    // Save appointment to database
    try {
      await supabase.from('appointments').insert({
        client_name: name.trim(),
        whatsapp: whatsapp.trim(),
        service: service.name,
        appointment_date: date,
        appointment_time: time,
        notes: notes.trim() || null,
        status: 'pending',
      });
    } catch {
      // Non-blocking: WhatsApp confirmation is the primary path
    }

    // Build WhatsApp message
    const dateBR = selectedDate ? formatDateBR(selectedDate) : date;
    const message = `Olá! Gostaria de agendar um horário na Barbearia Gabrielly.\n\nNome: ${name.trim()}\nServiço: ${service.name}\nData: ${dateBR}\nHorário: ${time}\nObservações: ${notes.trim() || 'Nenhuma'}\n\nAguardo a confirmação do agendamento!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');

    setSubmitting(false);
    setSuccessMsg(
      'Sua solicitação foi enviada pelo WhatsApp! O horário será confirmado pela barbearia. Aguarde nosso retorno.'
    );

    // Reset form
    setName('');
    setWhatsapp('');
    setServiceId('');
    setDate('');
    setTime('');
    setNotes('');
    setErrors({});
  };

  const inputBase =
    'w-full bg-[#1a1a1a] border rounded-sm px-4 py-3 text-white placeholder-gray-500 transition-colors focus:outline-none focus:border-gold';

  return (
    <section id="agendamento" className="py-20 sm:py-28 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-10 bg-gold/50" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Agendamento Online</span>
            <div className="h-[1px] w-10 bg-gold/50" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Reserve seu <span className="gold-text-gradient">Horário</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Preencha os dados abaixo e confirme seu agendamento pelo WhatsApp. O horário será confirmado pela barbearia.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="reveal bg-gradient-to-b from-[#141414] to-[#0d0d0d] border border-gold/15 rounded-lg p-6 sm:p-10"
        >
          {/* Name + WhatsApp */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium">
                Nome completo <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className={`${inputBase} pl-11 ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium">
                WhatsApp <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className={`${inputBase} pl-11 ${errors.whatsapp ? 'border-red-500' : 'border-white/10'}`}
                />
              </div>
              {errors.whatsapp && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.whatsapp}
                </p>
              )}
            </div>
          </div>

          {/* Service */}
          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2 font-medium">
              Serviço desejado <span className="text-gold">*</span>
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className={`${inputBase} appearance-none cursor-pointer ${errors.service ? 'border-red-500' : 'border-white/10'}`}
            >
              <option value="">Selecione um serviço...</option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — R$ {s.price.toFixed(2).replace('.', ',')}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.service}
              </p>
            )}
          </div>

          {/* Date + Time */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium">
                Data <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  min={toDateString(today)}
                  max={maxDate}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${inputBase} pl-11 ${errors.date ? 'border-red-500' : 'border-white/10'}`}
                />
              </div>
              {errors.date && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                </p>
              )}
              {date && dayConfig?.closed && (
                <p className="mt-1.5 text-xs text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> A barbearia está fechada neste dia. Escolha outra data.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium">
                Horário <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!date || dayConfig?.closed || loadingSlots}
                  className={`${inputBase} pl-11 appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    errors.time ? 'border-red-500' : 'border-white/10'
                  }`}
                >
                  <option value="">
                    {loadingSlots ? 'Carregando...' : !date ? 'Escolha uma data primeiro' : 'Selecione...'}
                  </option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot} disabled={isSlotBooked(slot)}>
                      {slot} {isSlotBooked(slot) ? '— Reservado' : ''}
                    </option>
                  ))}
                </select>
              </div>
              {errors.time && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.time}
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2 font-medium">
              Observações <span className="text-gray-500 text-xs">(opcional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Alguma preferência ou informação adicional?"
              className={`${inputBase} resize-none border-white/10`}
            />
          </div>

          {/* Info note */}
          <div className="mb-6 p-4 bg-gold/5 border border-gold/20 rounded-sm">
            <p className="text-sm text-gray-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              Ao confirmar, você será direcionado ao WhatsApp. O agendamento <strong className="text-gold">não está confirmado</strong> até que a barbearia valide o horário.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full gold-gradient text-black font-bold text-base px-6 py-4 rounded-sm hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" /> CONFIRMAR AGENDAMENTO PELO WHATSAPP
              </>
            )}
          </button>

          {/* Success message */}
          {successMsg && (
            <div className="mt-5 p-4 bg-green-500/10 border border-green-500/30 rounded-sm animate-fade-in">
              <p className="text-sm text-green-300 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                {successMsg}
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
