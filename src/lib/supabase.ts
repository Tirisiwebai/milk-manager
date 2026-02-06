import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Milk {
  id: string
  user_id: string
  name: string
  brand: string
  type: 'dairy' | 'oat' | 'almond' | 'soy' | 'other'
  quantity: number
  unit: 'liters' | 'cartons' | 'bags'
  expiry_date: string
  cost_per_unit: number
  supplier: string
  created_at: string
}

export interface WasteLog {
  id: string
  user_id: string
  milk_id: string
  amount: number
  reason: 'expired' | 'spilled' | 'returned' | 'other'
  created_at: string
}

export interface User {
  id: string
  email: string
  cafe_name: string
  created_at: string
}
