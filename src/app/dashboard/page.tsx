'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MilkBottleIcon, ChartIcon, BellIcon } from '@/components/Icons'

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

interface WasteLog {
  id: string
  milk_id: string
  milk_name: string
  quantity: number
  cost: number
  reason: string
  created_at: string
}

export default function Dashboard() {
  const [milks, setMilks] = useState<Milk[]>([])
  const [wasteLogs, setWasteLogs] = useState<WasteLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedMilks = localStorage.getItem('milks')
    if (savedMilks) setMilks(JSON.parse(savedMilks))
    const savedWaste = localStorage.getItem('wasteLogs')
    if (savedWaste) setWasteLogs(JSON.parse(savedWaste))
    setLoading(false)
  }, [])

  const getDaysUntilExpiry = (date: string) => {
    const exp = new Date(date)
    const now = new Date()
    return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  const totalMilks = milks.length
  const expiringCount = milks.filter(m => getDaysUntilExpiry(m.expiry_date) <= 3 && getDaysUntilExpiry(m.expiry_date) >= 0).length
  
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const weeklyWaste = wasteLogs
    .filter(w => new Date(w.created_at) >= weekAgo)
    .reduce((sum, w) => sum + w.cost, 0)

  const soonMilks = milks
    .filter(m => {
      const days = getDaysUntilExpiry(m.expiry_date)
      return days >= 0 && days <= 7
    })
    .sort((a, b) => getDaysUntilExpiry(a.expiry_date) - getDaysUntilExpiry(b.expiry_date))
    .slice(0, 5)

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <Link href="/dashboard" className="font-semibold text-gray-900">Milk Manager</Link>
            <div className="flex gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-gray-900">Dashboard</Link>
              <Link href="/milks" className="text-sm text-gray-500 hover:text-gray-900">Milk</Link>
              <Link href="/waste" className="text-sm text-gray-500 hover:text-gray-900">Waste</Link>
              <Link href="/analytics" className="text-sm text-gray-500 hover:text-gray-900">Costs</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Items</p>
            <p className="text-2xl font-bold text-gray-900">{totalMilks}</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-sm text-gray-500 mb-1">Expiring This Week</p>
            <p className="text-2xl font-bold text-gray-900">{expiringCount}</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Weekly Waste</p>
            <p className="text-2xl font-bold text-gray-900">${weeklyWaste.toFixed(2)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/milks/add" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <MilkBottleIcon className="w-5 h-5 text-gray-700" />
            </div>
            <span className="font-medium text-gray-900">Add Milk</span>
          </Link>
          <Link href="/waste/log" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <ChartIcon className="w-5 h-5 text-gray-700" />
            </div>
            <span className="font-medium text-gray-900">Log Waste</span>
          </Link>
        </div>
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BellIcon className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-900">Expiring This Week</h2>
          </div>
          {soonMilks.length > 0 ? (
            <ul className="space-y-3">
              {soonMilks.map(milk => (
                <li key={milk.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{milk.name}</p>
                    <p className="text-sm text-gray-500">{getDaysUntilExpiry(milk.expiry_date)} days left</p>
                  </div>
                  <span className="text-sm text-gray-600">{milk.quantity} {milk.unit}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">{totalMilks === 0 ? 'Add milk to see inventory' : 'Nothing expiring this week 🎉'}</p>
          )}
        </section>
      </main>
    </div>
  )
}
