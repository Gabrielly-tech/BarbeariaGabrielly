// ============================================================
// CONFIGURAÇÃO DA BARBEARIA — Edite facilmente aqui
// ============================================================

// Número do WhatsApp da barbearia (formato: código do país + DDD + número, sem espaços ou símbolos)
// EXEMPLO — substitua pelo número real
export const WHATSAPP_NUMBER = '5511934704783';

// Endereço da barbearia — substitua pelo endereço real
export const ADDRESS = 'Rua Exemplo, 123 — Centro — Sua Cidade / UF';

// Link do Instagram — substitua pelo perfil real
export const INSTAGRAM_URL = 'https://instagram.com/barbeariadolucasgabriel';

// E-mail de contato (opcional)
export const EMAIL = 'contato@barbeariadolucasgabriel.com.br';

// ============================================================
// SERVIÇOS E PREÇOS — Edite os preços e nomes conforme necessário
// ============================================================
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string; // nome do ícone lucide
}

export const SERVICES: Service[] = [
  {
    id: 'corte-masculino',
    name: 'Corte Masculino',
    description: 'Corte personalizado com tesoura e máquina, adaptado ao seu estilo.',
    price: 35,
    icon: 'Scissors',
  },
  {
    id: 'corte-degrade',
    name: 'Corte Degradê (Fade)',
    description: 'Degradê preciso com transições suaves e acabamento impecável.',
    price: 40,
    icon: 'Wand2',
  },
  {
    id: 'corte-barba',
    name: 'Corte + Barba',
    description: 'Combinação completa de corte e modelagem de barba para um visual renovado.',
    price: 60,
    icon: 'Sparkles',
  },
  {
    id: 'barba-completa',
    name: 'Barba Completa',
    description: 'Modelagem, toalha quente e navalha para uma barba alinhada e macia.',
    price: 25,
    icon: 'Wind',
  },
  {
    id: 'pezinho-acabamento',
    name: 'Pezinho e Acabamento',
    description: 'Manutenção rápida dos contornos e acabamento para manter o visual sempre novo.',
    price: 15,
    icon: 'Ruler',
  },
  {
    id: 'sobrancelha',
    name: 'Sobrancelha',
    description: 'Design e limpeza da sobrancelha masculina com técnica discreta.',
    price: 10,
    icon: 'Eye',
  },
  {
    id: 'corte-infantil',
    name: 'Corte Infantil',
    description: 'Corte para crianças até 12 anos em um ambiente acolhedor e paciente.',
    price: 30,
    icon: 'Baby',
  },
];

// ============================================================
// HORÁRIOS DE FUNCIONAMENTO — Edite conforme o expediente real
// ============================================================
// index 0 = Domingo, 1 = Segunda, ... 6 = Sábado
export interface BusinessHours {
  day: string;
  open: string | null; // formato "HH:mm" ou null se fechado
  close: string | null;
  closed: boolean;
}

export const BUSINESS_HOURS: BusinessHours[] = [
  { day: 'Domingo', open: null, close: null, closed: true },
  { day: 'Segunda-feira', open: '09:00', close: '19:00', closed: false },
  { day: 'Terça-feira', open: '09:00', close: '19:00', closed: false },
  { day: 'Quarta-feira', open: '09:00', close: '19:00', closed: false },
  { day: 'Quinta-feira', open: '09:00', close: '19:00', closed: false },
  { day: 'Sexta-feira', open: '09:00', close: '20:00', closed: false },
  { day: 'Sábado', open: '08:00', close: '18:00', closed: false },
];

// Intervalo entre horários em minutos (30 ou 60)
export const SLOT_INTERVAL_MINUTES = 30;

// Número máximo de dias à frente que podem ser agendados
export const MAX_BOOKING_DAYS_AHEAD = 30;
