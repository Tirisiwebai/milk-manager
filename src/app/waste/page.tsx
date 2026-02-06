'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChartIcon, MilkBottleIcon } from '@/components/Icons'

interface WasteLog {
  id: string
  milk_id: string
  milk_name: string
  quantity: number
  cost: number
  reason: string
  created_at: string
}

export default function WastePage() {
  const [wasteLogs, setWasteLogs] = useState<WasteLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('wasteLogs')
    if (saved) setWasteLogs(JSON.parse(saved))
    setLoading(false)
  }, [])

  const totalCost = wasteLogs.reduce((sum, w) => sum + w.cost, 0)
  
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const weeklyCost = wasteLogs
    .filter(w => new Date(w.created_at) >= weekAgo)
    .reduce((sum, w) => sum + w.cost, 0)

  const deleteLog = (id: string) => {
    const updated = wasteLogs.filter(w => w.id !== id)
    setWasteLogs(updated)
    localStorage.setItem('wasteLogs', JSON.stringify(updated))
  }

  const reasons = ['Expired', 'Spilled', 'Customer Return', 'Preparation Error', 'Other']

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
              <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">Dashboard</Link>
              <Link href="/milks" className="text-sm text-gray-500 hover:text-gray-900">Milk</Link>
              <Link href="/waste" className="text-sm font-medium text-gray-900">Waste</Link>
              <Link href="/analytics" className="text-sm text-gray-500 hover:text-gray-900">Costs</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Waste Log</h1>
          <Link href="/waste/log" className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800">
            <ChartIcon className="w-4 h-4" /> Log Waste
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Waste</p>
            <p className="text-2xl font-bold text-red-600">${totalCost.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">This Week</p>
            <p className="text-2xl font-bold text-gray-900">${weeklyCost.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Entries</p>
            <p className="text-2xl font-bold text-gray-900">{wasteLogs.length}</p>
          </div>
        </div>
        {wasteLogs.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No waste logged yet</p>
            <Link href="/waste/log" className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800">
              <ChartIcon className="w-4 h-4" /> Log Your First Waste
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Milk</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Reason</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Quantity</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Cost</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {wasteLogs
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map(log => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(log.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{log.milk_name}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">{log.reason}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{log.quantity}ml</td>
                      <td className="py-3 px-4 text-right text-red-600">${log.cost.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <button onClick={() => deleteLog(log.id)} className="text-gray-400 hover:text-red-500 text-lg">×</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
