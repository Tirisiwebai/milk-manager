'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/milks', label: 'Milk' },
  { href: '/waste', label: 'Waste' },
  { href: '/analytics', label: 'Analytics' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <Link href="/dashboard" className="font-semibold text-gray-900">
            Milk Manager
          </Link>
          <div className="flex gap-6">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  pathname === item.href
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
