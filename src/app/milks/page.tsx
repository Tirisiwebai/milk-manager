'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MilkBottleIcon, CheckIcon, XMarkIcon } from '@/components/Icons'

interface Milk {
  id: string
  name: string
  brand: string
  type: string
  quantity: number
  unit: string
  expiry_date: string
  cost_per_unit: number
  supplier: string
  created_at: string
}

export default function MilksPage() {
  const [milks, setMilks] = useState<Milk[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('milks')
    if (saved) setMilks(JSON.parse(saved))
    setLoading(false)
  }, [])

  const getDaysUntilExpiry = (date: string) => {
    const exp = new Date(date)
    const now = new Date()
    return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  const getExpiryStatus = (date: string) => {
    const days = getDaysUntilExpiry(date)
    if (days < 0) return 'expired'
    if (days <= 3) return 'urgent'
    if (days <= 7) return 'soon'
    return 'ok'
  }

  const totalValue = milks.reduce((sum, m) => sum + (m.quantity * m.cost_per_unit), 0)

  const deleteMilk = (id: string) => {
    const updated = milks.filter(m => m.id !== id)
    setMilks(updated)
    localStorage.setItem('milks', JSON.stringify(updated))
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>
  }

  const colors: Record<string, string> = {
    expired: 'bg-red-100 text-red-800',
    urgent: 'bg-amber-100 text-amber-800',
    soon: 'bg-yellow-100 text-yellow-800',
    ok: 'bg-green-100 text-green-800',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <Link href="/dashboard" className="font-semibold text-gray-900">Milk Manager</Link>
            <div className="flex gap-6">
              <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">Dashboard</Link>
              <Link href="/milks" className="text-sm font-medium text-gray-900">Milk</Link>
              <Link href="/waste" className="text-sm text-gray-500 hover:text-gray-900">Waste</Link>
              <Link href="/analytics" className="text-sm text-gray-500 hover:text-gray-900">Costs</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Milk Inventory</h1>
          <Link href="/milks/add" className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800">
            <MilkBottleIcon className="w-4 h-4" /> Add Milk
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total items</span>
            <span className="font-medium">{milks.length}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Inventory value</span>
            <span className="font-medium">${totalValue.toFixed(2)}</span>
          </div>
        </div>
        {milks.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MilkBottleIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No milk in inventory yet</p>
            <Link href="/milks/add" className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800">
              <MilkBottleIcon className="w-4 h-4" /> Add Your First Milk
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Milk</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Expires</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Cost</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {milks.map(milk => {
                  const status = getExpiryStatus(milk.expiry_date)
                  const days = getDaysUntilExpiry(milk.expiry_date)
                  const label = days < 0 ? 'Expired' : `${days}d`
                  return (
                    <tr key={milk.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{milk.name}</p>
                        <p className="text-sm text-gray-500">{milk.brand}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">{milk.type}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{milk.quantity} {milk.unit}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${colors[status]}`}>{label}</span>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900">${(milk.quantity * milk.cost_per_unit).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <button onClick={() => deleteMilk(milk.id)} className="text-gray-400 hover:text-red-500 text-lg">×</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
