import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Appointment {
  id: string;
  client_name: string;
  whatsapp: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}
