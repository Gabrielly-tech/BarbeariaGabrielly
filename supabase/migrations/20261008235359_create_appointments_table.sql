/*
# Create appointments table for barbershop booking system

1. New Tables
- `appointments`: stores booking requests from clients through the website.
  - `id` (uuid, primary key)
  - `client_name` (text, not null) — full name of the client
  - `whatsapp` (text, not null) — WhatsApp phone number of the client
  - `service` (text, not null) — selected service name
  - `appointment_date` (date, not null) — requested date
  - `appointment_time` (time, not null) — requested time slot
  - `notes` (text, nullable) — optional observations from the client
  - `status` (text, not null, default 'pending') — one of: pending, confirmed, cancelled
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `appointments`.
- No-auth single-tenant app, all policies use `TO anon, authenticated`.
- Allow anyone to insert new appointment requests.
- Allow anyone to read appointments (to check booked time slots).
- No updates or deletes from the public client.

3. Indexes
- Index on `appointment_date` and `appointment_time` for fast availability lookups.
- Index on `status` to filter out cancelled appointments.
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  whatsapp text NOT NULL,
  service text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_appointments" ON appointments;
CREATE POLICY "anon_read_appointments"
  ON appointments FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;
CREATE POLICY "anon_insert_appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_appointments_date_time ON appointments (appointment_date, appointment_time);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments (status);
