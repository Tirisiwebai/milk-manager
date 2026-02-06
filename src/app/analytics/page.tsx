'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'week' | 'month'>('week')

  const data = {
    week: {
      wasteByType: [
        { type: 'Whole Milk', amount: 2.5, cost: 6.25 },
        { type: 'Oat Milk', amount: 1, cost: 4.0 },
        { type: 'Almond Milk', amount: 0.5, cost: 1.75 },
      ],
      totalWaste: 4,
      totalCost: 12.0,
      topReason: 'Expired',
      trend: '+12%',
    },
    month: {
      wasteByType: [
        { type: 'Whole Milk', amount: 10, cost: 25.0 },
        { type: 'Oat Milk', amount: 4, cost: 16.0 },
        { type: 'Almond Milk', amount: 2, cost: 7.0 },
      ],
      totalWaste: 16,
      totalCost: 48.0,
      topReason: 'Expired',
      trend: '-5%',
    },
  }

  const current = data[period]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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
            value={`${current.totalWaste}L`}
            subValue={`$${current.totalCost.toFixed(2)}`}
          />
          <StatCard
            label="Top Waste Type"
            value={current.wasteByType[0].type}
            subValue={`${current.wasteByType[0].amount}L lost`}
          />
          <StatCard
            label="Main Reason"
            value={current.topReason}
            subValue={`Trend: ${current.trend}`}
            highlight={current.trend.startsWith('+')}
          />
        </div>

        {/* Waste by Type */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Waste by Type</h2>
          <div className="space-y-4">
            {current.wasteByType.map(item => (
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
                      width: `${(item.amount / current.totalWaste) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Savings Tips */}
        <section className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h2 className="text-lg font-semibold text-amber-900 mb-2">💡 AI Insights</h2>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• Whole Milk accounts for 62% of your waste — check expiration dates more frequently.</li>
            <li>• Most waste happens on Mondays — consider reducing Monday orders.</li>
            <li>• Switching to smaller, more frequent orders could save ~$15/month.</li>
          </ul>
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
