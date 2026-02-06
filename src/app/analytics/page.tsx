'use client'

import { useState, useEffect } from 'react'
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

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'week' | 'month'>('week')
  const [entries, setEntries] = useState<WasteEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('wasteLogs')
    if (saved) {
      setEntries(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const getPeriodData = () => {
    const days = period === 'week' ? 7 : 30
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)
    
    const filtered = entries.filter(e => new Date(e.created_at) >= cutoff)
    const totalCost = filtered.reduce((sum, e) => sum + e.cost, 0)
    
    // Group by milk type
    const byType: Record<string, { amount: number; cost: number }> = {}
    filtered.forEach(e => {
      if (!byType[e.milk_name]) {
        byType[e.milk_name] = { amount: 0, cost: 0 }
      }
      byType[e.milk_name].amount += e.amount
      byType[e.milk_name].cost += e.cost
    })

    // Get top reason
    const byReason: Record<string, number> = {}
    filtered.forEach(e => {
      byReason[e.reason] = (byReason[e.reason] || 0) + e.cost
    })
    const topReason = Object.entries(byReason).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'

    // Calculate trend (compare to previous period)
    const prevCutoff = new Date()
    prevCutoff.setDate(prevCutoff.getDate() - days * 2)
    const prevFiltered = entries.filter(e => {
      const d = new Date(e.created_at)
      return d >= prevCutoff && d < cutoff
    })
    const prevCost = prevFiltered.reduce((sum, e) => sum + e.cost, 0)
    const trend = prevCost > 0 ? ((totalCost - prevCost) / prevCost * 100).toFixed(0) : '0'

    return {
      wasteByType: Object.entries(byType).map(([type, data]) => ({
        type,
        ...data
      })).sort((a, b) => b.cost - a.cost),
      totalWaste: filtered.reduce((sum, e) => sum + e.amount, 0),
      totalCost,
      topReason,
      trend: `${parseInt(trend) > 0 ? '+' : ''}${trend}%`,
      trendDirection: parseInt(trend) > 0 ? 'up' : parseInt(trend) < 0 ? 'down' : 'same',
    }
  }

  const data = getPeriodData()
  const maxAmount = Math.max(...data.wasteByType.map(t => t.amount), 1)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  // Mock data if no real data
  const displayData = entries.length > 0 ? data : {
    wasteByType: [
      { type: 'Whole Milk', amount: 2.5, cost: 6.25 },
      { type: 'Oat Milk', amount: 1, cost: 4.0 },
      { type: 'Almond Milk', amount: 0.5, cost: 1.75 },
    ],
    totalWaste: 4,
    totalCost: 12.0,
    topReason: 'Expired',
    trend: '+12%',
    trendDirection: 'up' as const,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setPeriod('week')}
              className={`px-3 py-1 text-sm rounded-lg ${
                period === 'week'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1 text-sm rounded-lg ${
                period === 'month'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Total Waste"
            value={`${displayData.totalWaste}L`}
            subValue={`$${displayData.totalCost.toFixed(2)}`}
          />
          <StatCard
            label="Top Waste Type"
            value={displayData.wasteByType[0]?.type || 'None'}
            subValue={displayData.wasteByType[0] ? `${displayData.wasteByType[0].amount}L lost` : '-'}
          />
          <StatCard
            label="Main Reason"
            value={displayData.topReason}
            subValue={`Trend: ${displayData.trend}`}
            highlight={displayData.trend.startsWith('+')}
          />
        </div>

        {/* Waste by Type */}
        {displayData.wasteByType.length > 0 ? (
          <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Waste by Type</h2>
            <div className="space-y-4">
              {displayData.wasteByType.map(item => (
                <div key={item.type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.type}</span>
                    <span className="font-medium">
                      {item.amount}L (${item.cost.toFixed(2)})
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full"
                      style={{
                        width: `${(item.amount / maxAmount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6 text-center">
            <p className="text-gray-500">No waste data for this period</p>
          </section>
        )}

        {/* AI Insights */}
        <section className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h2 className="text-lg font-semibold text-amber-900 mb-2">💡 AI Insights</h2>
          {entries.length > 0 ? (
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• {displayData.wasteByType[0]?.type || 'N/A'} accounts for most waste — check expiration dates more frequently.</li>
              {displayData.trend.startsWith('+') && (
                <li>• Waste is trending {displayData.trend} compared to last {period}.</li>
              )}
              <li>• Consider reducing orders for high-waste items.</li>
            </ul>
          ) : (
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• Log more waste data to get personalized insights.</li>
              <li>• Track your waste patterns over time.</li>
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

function StatCard({
  label,
  value,
  subValue,
  highlight = false,
}: {
  label: string
  value: string
  subValue: string
  highlight?: boolean
}) {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${highlight ? 'text-red-600' : 'text-gray-900'}`}>
        {value}
      </p>
      <p className="text-sm text-gray-500">{subValue}</p>
    </div>
  )
}
