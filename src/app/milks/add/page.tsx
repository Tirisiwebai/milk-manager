'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'

const milkTypes = [
  { value: 'dairy', label: 'Dairy' },
  { value: 'oat', label: 'Oat' },
  { value: 'almond', label: 'Almond' },
  { value: 'soy', label: 'Soy' },
  { value: 'other', label: 'Other' },
]

const units = [
  { value: 'liters', label: 'Liters' },
  { value: 'cartons', label: 'Cartons' },
  { value: 'bags', label: 'Bags' },
]

export default function AddMilkPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    brand: '',
    type: 'dairy',
    quantity: '',
    unit: 'liters',
    expiry_date: '',
    cost_per_unit: '',
    supplier: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save to Supabase
    console.log('Submit:', form)
    router.push('/milks')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/milks" className="text-sm text-gray-500 hover:text-gray-900">
            ← Back to Milk
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Milk</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Capture Placeholder */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📷</span>
            </div>
            <p className="text-gray-600 mb-2">Scan expiration date</p>
            <button type="button" className="btn-secondary text-sm">
              Open Camera
            </button>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g. Whole Milk"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g. Organic Dairy"
                  value={form.brand}
                  onChange={e => setForm({ ...form, brand: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                >
                  {milkTypes.map(t => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  value={form.unit}
                  onChange={e => setForm({ ...form, unit: e.target.value })}
                >
                  {units.map(u => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="0"
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  value={form.expiry_date}
                  onChange={e => setForm({ ...form, expiry_date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost per Unit
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="0.00"
                  value={form.cost_per_unit}
                  onChange={e => setForm({ ...form, cost_per_unit: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Supplier name"
                  value={form.supplier}
                  onChange={e => setForm({ ...form, supplier: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Link href="/milks" className="btn-secondary flex-1 text-center">
              Cancel
            </Link>
            <button type="submit" className="btn-primary flex-1">
              Add Milk
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
