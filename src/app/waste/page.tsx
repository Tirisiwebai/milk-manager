'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface WasteEntry {
  id: string
  milk_name: string
  amount: number
  unit: string
  reason: string
  cost: number
  created_at: string
}

export default function WastePage() {
  const [entries, setEntries] = useState<WasteEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('wasteLogs')
    if (saved) {
      setEntries(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const totalCost = entries.reduce((sum, e) => sum + e.cost, 0)

  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const thisWeek = entries.filter(e => new Date(e.created_at) >= weekAgo)
  const thisWeekCost = thisWeek.reduce((sum, e) => sum + e.cost, 0)

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getReasonIcon = (reason: string) => {
    const icons: Record<string, string> = {
      expired: '📅',
      spilled: '💧',
      returned: '↩️',
      other: '❓',
    }
    return icons[reason] || '❓'
  }

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id)
    setEntries(updated)
    localStorage.setItem('wasteLogs', JSON.stringify(updated))
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <Link href="/dashboard" className="font-semibold text-gray-900">Milk Manager</Link>
            <div className="flex gap-6">
              <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">Dashboard</Link>
              <Link href="/milks" className="text-sm text-gray-500 hover:text-gray-900">Milk</Link>
              <Link href="/waste" className="text-sm font-medium text-gray-900">Waste</Link>
              <Link href="/analytics" className="text-sm text-gray-500 hover:text-gray-900">Analytics</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Waste Log</h1>
          <Link href="/waste/log" className="btn-primary">+ Log Waste</Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">This week</span>
            <span className="font-medium">${thisWeekCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Total logged</span>
            <span className="font-medium">${totalCost.toFixed(2)}</span>
          </div>
        </div>
        {entries.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500 mb-4">No waste logged yet 🎉</p>
            <Link href="/waste/log" className="btn-primary">Log First Waste</Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {entries
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map(entry => (
                  <li key={entry.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{getReasonIcon(entry.reason)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{entry.milk_name}</p>
                          <p className="text-sm text-gray-500">{entry.amount} {entry.unit} • {entry.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium text-red-600">-${entry.cost.toFixed(2)}</p>
                          <p className="text-xs text-gray-400">{formatDate(entry.created_at)}</p>
                        </div>
                        <button onClick={() => deleteEntry(entry.id)} className="text-gray-400 hover:text-red-500">×</button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}
