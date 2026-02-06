'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'

const reasons = [
  { value: 'expired', label: 'Expired', icon: '📅' },
  { value: 'spilled', label: 'Spilled', icon: '💧' },
  { value: 'returned', label: 'Customer Return', icon: '↩️' },
  { value: 'other', label: 'Other', icon: '❓' },
]

interface Milk {
  id: string
  name: string
  type: string
  quantity: number
  unit: string
}

export default function WasteLogPage() {
  const router = useRouter()
  const [selectedMilk, setSelectedMilk] = useState('')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('expired')

  const [milks] = useState<Milk[]>([
    { id: '1', name: 'Whole Milk', type: 'dairy', quantity: 5, unit: 'liters' },
    { id: '2', name: 'Barista Oat', type: 'oat', quantity: 3, unit: 'cartons' },
  ])

  const selectedMilkData = milks.find(m => m.id === selectedMilk)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save to Supabase
    console.log({ selectedMilk, amount, reason })
    router.push('/waste')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/waste" className="text-sm text-gray-500 hover:text-gray-900">
            ← Back to Waste Log
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Log Waste</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Reason Selection */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Why are you throwing this away?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {reasons.map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setReason(r.value)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    reason === r.value
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{r.icon}</span>
                  <span className="font-medium text-gray-900">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Milk Selection */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Which milk?
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              value={selectedMilk}
              onChange={e => setSelectedMilk(e.target.value)}
            >
              <option value="">Select a milk...</option>
              {milks.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.quantity} {m.unit})
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          {selectedMilkData && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How much? ({selectedMilkData.unit})
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  required
                  min="0"
                  max={selectedMilkData.quantity}
                  step="0.01"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="0"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setAmount(selectedMilkData.quantity.toString())}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  All
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Available: {selectedMilkData.quantity} {selectedMilkData.unit}
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-4">
            <Link href="/waste" className="btn-secondary flex-1 text-center">
              Cancel
            </Link>
            <button type="submit" className="btn-primary flex-1">
              Log Waste
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
