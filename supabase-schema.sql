-- Milk Manager Database Schema
-- Run this in Supabase SQL Editor

-- Users table (extends Supabase auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  cafe_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Milk inventory table
CREATE TABLE milks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand TEXT,
  type TEXT NOT NULL CHECK (type IN ('dairy', 'oat', 'almond', 'soy', 'other')),
  quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
  unit TEXT NOT NULL CHECK (unit IN ('liters', 'cartons', 'bags')),
  expiry_date DATE,
  cost_per_unit DECIMAL(10,2) DEFAULT 0,
  supplier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Waste log table
CREATE TABLE waste_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  milk_id UUID NOT NULL REFERENCES milks(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  reason TEXT NOT NULL CHECK (reason IN ('expired', 'spilled', 'returned', 'other')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE milks ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_logs ENABLE ROW LEVEL SECURITY;

-- Policies (users can only see their own data)
CREATE POLICY "Users can view own users" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own users" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own users" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own milks" ON milks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own milks" ON milks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own milks" ON milks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own milks" ON milks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own waste logs" ON waste_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own waste logs" ON waste_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own waste logs" ON waste_logs FOR DELETE USING (auth.uid() = user_id);

-- Auto-create user record on signup (trigger function)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, cafe_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'cafe_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
