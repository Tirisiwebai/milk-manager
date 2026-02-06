'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'

interface Milk {
  id: string
  name: string
  type: string
  quantity: number
  unit: string
  expiry_date: string
}

interface Stats {
  totalMilks: number
  expiringSoon: number
  weeklyWaste: number
}

export default function Dashboard() {
  const [milks, setMilks] = useState<Milk[]>([])
  const [stats, setStats] = useState<Stats>({
    totalMilks: 0,
    expiringSoon: 0,
    weeklyWaste: 0,
  })

  useEffect(() => {
    // Fetch milks (placeholder - connect to Supabase later)
    setMilks([
      {
        id: '1',
        name: 'Whole Milk',
        type: 'dairy',
        quantity: 5,
        unit: 'liters',
        expiry_date: '2026-02-10',
      },
      {
        id: '2',
        name: 'Oat Milk',
        type: 'oat',
        quantity: 3,
        unit: 'cartons',
        expiry_date: '2026-02-15',
      },
    ])
    setStats({
      totalMilks: 2,
      expiringSoon: 1,
      weeklyWaste: 0.5,
    })
  }, [])

  const getDaysUntilExpiry = (date: string) => {
    const exp = new Date(date)
    const now = new Date()
    return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Milks" value={stats.totalMilks.toString()} />
          <StatCard
            label="Expiring Soon"
            value={stats.expiringSoon.toString()}
            highlight={stats.expiringSoon > 0}
          />
          <StatCard label="Weekly Waste" value={`${stats.weeklyWaste}L`} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <ActionCard href="/milks/add" icon="📷" label="Add Milk" />
          <ActionCard href="/waste/log" icon="📉" label="Log Waste" />
        </div>

        {/* Expiring Soon */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Expiring Soon
          </h2>
          {milks.filter(m => getDaysUntilExpiry(m.expiry_date) <= 3).length > 0 ? (
            <ul className="space-y-3">
              {milks
                .filter(m => getDaysUntilExpiry(m.expiry_date) <= 3)
                .map(milk => (
                  <li
                    key={milk.id}
                    className="flex justify-between items-center py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{milk.name}</p>
                      <p className="text-sm text-gray-500">
                        Expires in {getDaysUntilExpiry(milk.expiry_date)} days
                      </p>
                    </div>
                    <span className="text-sm text-gray-600">
                      {milk.quantity} {milk.unit}
                    </span>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500">No milks expiring soon 🎉</p>
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

function ActionCard({
  href,
  icon,
  label,
}: {
  href: string
  icon: string
  label: string
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-gray-900">{label}</span>
    </a>
  )
}
