'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'

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
  const [entries] = useState<WasteEntry[]>([
    {
      id: '1',
      milk_name: 'Whole Milk',
      amount: 1,
      unit: 'liters',
      reason: 'expired',
      cost: 2.5,
      created_at: '2026-02-05T10:30:00Z',
    },
    {
      id: '2',
      milk_name: 'Oat Milk',
      amount: 0.5,
      unit: 'cartons',
      reason: 'spilled',
      cost: 2.0,
      created_at: '2026-02-04T14:15:00Z',
    },
  ])

  const totalCost = entries.reduce((sum, e) => sum + e.cost, 0)

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Waste Log</h1>
          <Link href="/waste/log" className="btn-primary">
            + Log Waste
          </Link>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total wasted this week</span>
            <span className="font-medium">${totalCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Waste List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {entries.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {entries.map(entry => (
                <li key={entry.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{getReasonIcon(entry.reason)}</span>
                      <div>
                        <p className="font-medium text-gray-900">{entry.milk_name}</p>
                        <p className="text-sm text-gray-500">
                          {entry.amount} {entry.unit} • {entry.reason}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">-${entry.cost.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">{formatDate(entry.created_at)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">No waste logged yet 🎉</p>
              <Link href="/waste/log" className="btn-primary">
                Log First Waste
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
