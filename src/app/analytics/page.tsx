'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CalculatorIcon, ChartIcon, MilkBottleIcon } from '@/components/Icons'

interface Milk {
  id: string
  name: string
  type: string
  cost_per_unit: number
  unit: string
}

export default function Analytics() {
  const [milks, setMilks] = useState<Milk[]>([])
  const [selectedMilk, setSelectedMilk] = useState<string>('')
  const [pourSize, setPourSize] = useState<number>(150)
  const [sellPrice, setSellPrice] = useState<number>(5)
  const [result, setResult] = useState<{ cost: number; margin: number; marginPercent: number } | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('milks')
    if (saved) {
      const allMilks = JSON.parse(saved)
      setMilks(allMilks)
      if (allMilks.length > 0 && !selectedMilk) {
        setSelectedMilk(allMilks[0].id)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedMilk && milks.length > 0) {
      const milk = milks.find(m => m.id === selectedMilk)
      if (milk) {
        const costPerMl = milk.cost_per_unit / 1000 // assume unit is ml
        const drinkCost = costPerMl * pourSize
        const margin = sellPrice - drinkCost
        const marginPercent = (margin / sellPrice) * 100
        setResult({ cost: drinkCost, margin, marginPercent })
      }
    }
  }, [selectedMilk, pourSize, sellPrice, milks])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <Link href="/dashboard" className="font-semibold text-gray-900">Milk Manager</Link>
            <div className="flex gap-6">
              <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">Dashboard</Link>
              <Link href="/milks" className="text-sm text-gray-500 hover:text-gray-900">Milk</Link>
              <Link href="/waste" className="text-sm text-gray-500 hover:text-gray-900">Waste</Link>
              <Link href="/analytics" className="text-sm font-medium text-gray-900">Costs</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <CalculatorIcon className="w-7 h-7 text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-900">Cost Calculator</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Calculate Drink Cost</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Milk</label>
                {milks.length > 0 ? (
                  <select
                    value={selectedMilk}
                    onChange={(e) => setSelectedMilk(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    {milks.map(milk => (
                      <option key={milk.id} value={milk.id}>
                        {milk.name} - ${milk.cost_per_unit.toFixed(2)}/{milk.unit}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <MilkBottleIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Add milk first to calculate costs</p>
                    <Link href="/milks/add" className="inline-flex items-center gap-2 mt-3 text-sm text-gray-900 font-medium">
                      Add Milk
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pour Size (ml)</label>
                <input
                  type="number"
                  value={pourSize}
                  onChange={(e) => setPourSize(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">Typical: 120ml (8oz) or 150ml (12oz)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sell Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>
          </div>
          <div>
            {result ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Results</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Milk Cost Per Drink</p>
                    <p className="text-3xl font-bold text-gray-900">${result.cost.toFixed(3)}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Your Profit Per Drink</p>
                    <p className="text-2xl font-bold text-green-600">${result.margin.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Margin</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${result.marginPercent >= 60 ? 'bg-green-500' : result.marginPercent >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(result.marginPercent, 100)}%` }}
                        />
                      </div>
                      <span className="text-lg font-semibold text-gray-900">{result.marginPercent.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {result.marginPercent >= 70 ? '✅ Great margin. Profitable.' : result.marginPercent >= 50 ? '⚠️ Consider increasing price.' : '❌ Low margin. Review costs.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center py-16">
                <CalculatorIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Add milk and enter values to calculate</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Reference</h2>
          <p className="text-gray-600 mb-4">Most cafes aim for 65-75% margin on milk-based drinks.</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">65%+</p>
              <p className="text-sm text-gray-500">Healthy</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">50-65%</p>
              <p className="text-sm text-gray-500">Acceptable</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">&lt;50%</p>
              <p className="text-sm text-gray-500">Review</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
