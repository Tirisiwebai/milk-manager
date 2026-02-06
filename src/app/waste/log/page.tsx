'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const reasons = [
  { value: 'expired', label: 'Expired', icon: '📅' },
  { value: 'spilled', label: 'Spilled', icon: '💧' },
  { value: 'returned', label: 'Customer Return', icon: '↩️' },
  { value: 'other', label: 'Other', icon: '❓' },
]

export default function WasteLogPage() {
  const router = useRouter()
  const [selectedMilk, setSelectedMilk] = useState('')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('expired')
  const [milks, setMilks] = useState<any[]>([])
  const [wasteLogs, setWasteLogs] = useState<any[]>([])

  useEffect(() => {
    const savedMilks = localStorage.getItem('milks')
    if (savedMilks) setMilks(JSON.parse(savedMilks))
    const savedWaste = localStorage.getItem('wasteLogs')
    if (savedWaste) setWasteLogs(JSON.parse(savedWaste))
  }, [])

  const selectedMilkData = milks.find(m => m.id === selectedMilk)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMilkData) return
    const wasteAmount = parseFloat(amount)
    if (isNaN(wasteAmount) || wasteAmount <= 0) return
    const entry = {
      id: Date.now().toString(),
      milk_id: selectedMilk,
      milk_name: selectedMilkData.name,
      amount: wasteAmount,
      unit: selectedMilkData.unit,
      reason,
      cost: wasteAmount * selectedMilkData.cost_per_unit,
      created_at: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('wasteLogs') || '[]')
    localStorage.setItem('wasteLogs', JSON.stringify([...existing, entry]))
    router.push('/waste')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <button onClick={() => router.push('/waste')} className="font-semibold text-gray-500 hover:text-gray-900">← Back</button>
            <h1 className="font-semibold text-gray-900">Log Waste</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Why are you throwing this away?</label>
            <div className="grid grid-cols-2 gap-3">
              {reasons.map(r => (
                <button key={r.value} type="button" onClick={() => setReason(r.value)} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${reason === r.value ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <span className="text-xl">{r.icon}</span>
                  <span className="font-medium text-gray-900">{r.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Which milk?</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={selectedMilk} onChange={e => { setSelectedMilk(e.target.value); setAmount('') }}>
              <option value="">Select a milk...</option>
              {milks.map(m => <option key={m.id} value={m.id}>{m.name} ({m.quantity} {m.unit})</option>)}
            </select>
            {milks.length === 0 && <p className="text-sm text-amber-600 mt-2">No milks in inventory. <button type="button" onClick={() => router.push('/milks/add')} className="underline">Add milk first.</button></p>}
          </div>
          {selectedMilkData && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">How much? ({selectedMilkData.unit})</label>
              <div className="flex gap-3">
                <input type="number" required min="0" max={selectedMilkData.quantity} step="0.01" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} />
                <button type="button" onClick={() => setAmount(selectedMilkData.quantity.toString())} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">All</button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Available: {selectedMilkData.quantity} {selectedMilkData.unit}</p>
              {amount && <p className="text-sm text-red-600 mt-2">Waste cost: ${(parseFloat(amount) * selectedMilkData.cost_per_unit).toFixed(2)}</p>}
            </div>
          )}
          <div className="flex gap-4">
            <button type="button" onClick={() => router.push('/waste')} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={!selectedMilk || !amount} className="btn-primary flex-1 disabled:opacity-50">Log Waste</button>
          </div>
        </form>
      </main>
    </div>
  )
}
