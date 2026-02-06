'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'

interface Milk {
  id: string
  name: string
  type: string
  quantity: number
  unit: string
  expiry_date: string
}

interface WasteEntry {
  id: string
  milk_name: string
  amount: number
  unit: string
  reason: string
  cost: number
  created_at: string
}

export default function Dashboard() {
  const [milks, setMilks] = useState<Milk[]>([])
  const [wasteLogs, setWasteLogs] = useState<WasteEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load milks
    const savedMilks = localStorage.getItem('milks')
    if (savedMilks) {
      setMilks(JSON.parse(savedMilks))
    }

    // Load waste logs
    const savedWaste = localStorage.getItem('wasteLogs')
    if (savedWaste) {
      setWasteLogs(JSON.parse(savedWaste))
    }

    setLoading(false)
  }, [])

  const getDaysUntilExpiry = (date: string) => {
    const exp = new Date(date)
    const now = new Date()
    return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  // Calculate stats
  const totalMilks = milks.length
  const expiringSoon = milks.filter(m => getDaysUntilExpiry(m.expiry_date) <= 3).length
  
  // Calculate weekly waste (last 7 days)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const weeklyWaste = wasteLogs
    .filter(w => new Date(w.created_at) >= weekAgo)
    .reduce((sum, w) => sum + w.cost, 0)

  // Get milks expiring soon
  const soonMilks = milks
    .filter(m => {
      const days = getDaysUntilExpiry(m.expiry_date)
      return days >= 0 && days <= 7
    })
    .sort((a, b) => getDaysUntilExpiry(a.expiry_date) - getDaysUntilExpiry(b.expiry_date))
    .slice(0, 5)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Total Milks"
            value={totalMilks.toString()}
          />
          <StatCard
            label="Expiring Soon"
            value={expiringSoon.toString()}
            highlight={expiringSoon > 0}
          />
          <StatCard
            label="Weekly Waste"
            value={`$${weeklyWaste.toFixed(2)}`}
            highlight={weeklyWaste > 0}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/milks/add" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300">
            <span className="text-2xl">📷</span>
            <span className="font-medium text-gray-900">Add Milk</span>
          </Link>
          <Link href="/waste/log" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300">
            <span className="text-2xl">📉</span>
            <span className="font-medium text-gray-900">Log Waste</span>
          </Link>
        </div>

        {/* Expiring Soon */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Expiring Soon
          </h2>
          {soonMilks.length > 0 ? (
            <ul className="space-y-3">
              {soonMilks.map(milk => (
                <li
                  key={milk.id}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{milk.name}</p>
                    <p className="text-sm text-gray-500">
                      {getDaysUntilExpiry(milk.expiry_date)} days left
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {milk.quantity} {milk.unit}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              {totalMilks === 0 ? 'Add milk to see inventory' : 'No milks expiring soon 🎉'}
            </p>
          )}
        </section>
      </main>
    </div>
  )
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`p-4 rounded-xl border ${
        highlight
          ? 'bg-amber-50 border-amber-200'
          : 'bg-white border-gray-200'
      }`}
    >
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
