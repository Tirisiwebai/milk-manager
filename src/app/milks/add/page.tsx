'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'

const milkTypes = [
  { value: 'dairy', label: 'Dairy' },
  { value: 'oat', label: 'Oat' },
  { value: 'almond', label: 'Almond' },
  { value: 'soy', label: 'Soy' },
  { value: 'other', label: 'Other' },
]

const units = [
  { value: 'liters', label: 'Liters' },
  { value: 'cartons', label: 'Cartons' },
  { value: 'bags', label: 'Bags' },
]

interface MilkData {
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

export default function AddMilkPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraError, setCameraError] = useState('')
  
  const [form, setForm] = useState<MilkData>({
    id: '',
    name: '',
    brand: '',
    type: 'dairy',
    quantity: 0,
    unit: 'liters',
    expiry_date: '',
    cost_per_unit: 0,
    supplier: '',
    created_at: new Date().toISOString(),
  })

  // Start camera
  const startCamera = async () => {
    try {
      setCameraError('')
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      setStream(mediaStream)
      setShowCamera(true)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      setCameraError('Camera not available. Please allow camera permissions.')
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setShowCamera(false)
    }
  }

  // Capture photo and try to read expiry date (simulated)
  const capturePhoto = () => {
    // For now, just stop camera
    // In production, we'd use OCR to read expiry date
    stopCamera()
    alert('Camera captured! In production, this will auto-detect the expiry date from the photo.')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create milk object with ID
    const milk: MilkData = {
      ...form,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('milks') || '[]')
    localStorage.setItem('milks', JSON.stringify([...existing, milk]))

    router.push('/milks')
  }

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/milks')}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            ← Back to Milk
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Milk</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Camera Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-center">
              {showCamera ? (
                <div>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-h-64 bg-gray-900 rounded-lg mb-4"
                  />
                  <div className="flex gap-4 justify-center">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="btn-primary"
                    >
                      📷 Capture
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📷</span>
                  </div>
                  <p className="text-gray-600 mb-4">Scan expiration date from photo</p>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="btn-secondary"
                  >
                    Open Camera
                  </button>
                  {cameraError && (
                    <p className="text-red-500 text-sm mt-2">{cameraError}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g. Whole Milk"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g. Organic Dairy"
                  value={form.brand}
                  onChange={e => setForm({ ...form, brand: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                >
                  {milkTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={form.unit}
                  onChange={e => setForm({ ...form, unit: e.target.value })}
                >
                  {units.map(u => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0"
                  value={form.quantity || ''}
                  onChange={e => setForm({ ...form, quantity: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={form.expiry_date}
                  onChange={e => setForm({ ...form, expiry_date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost per Unit
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0.00"
                  value={form.cost_per_unit || ''}
                  onChange={e => setForm({ ...form, cost_per_unit: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Supplier name"
                  value={form.supplier}
                  onChange={e => setForm({ ...form, supplier: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/milks')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Add Milk
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
