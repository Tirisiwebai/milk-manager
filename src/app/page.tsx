'use client'

import Link from 'next/link'
import { MilkBottleIcon, CalculatorIcon, ChartIcon, BellIcon, ArrowRightIcon, CheckIcon, MenuIcon } from '@/components/Icons'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-gray-900">Milk Manager</span>
              <span className="text-sm text-gray-500">from The Way to Coffee</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Features</a>
              <a href="#pricing" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Pricing</a>
              <Link href="/signin" className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Sign In
              </Link>
            </div>
            <button className="md:hidden p-2 text-gray-500">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Know your costs. Cut your waste.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The simplest way for cafes to track milk costs. Know exactly what each drink costs you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/signin" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors">
              Get Early Access <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-sm text-gray-500">Free during beta. First 3 months at $9/mo.</p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three steps. That is it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6">
                <MilkBottleIcon className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Add Milk</h3>
              <p className="text-gray-600 leading-relaxed">Enter your milk. Add cost. Set expiry. Done in seconds.</p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6">
                <ChartIcon className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Waste</h3>
              <p className="text-gray-600 leading-relaxed">Log wasted milk. See patterns over time. Find the problems.</p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6">
                <CalculatorIcon className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Know Costs</h3>
              <p className="text-gray-600 leading-relaxed">See exactly what each drink costs. Price accordingly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Features</h2>
            <p className="text-xl text-gray-600">Everything you need. Nothing you do not.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <MilkBottleIcon className="w-8 h-8 text-gray-700 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Inventory</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Track every type of milk. Dairy and plant-based.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <BellIcon className="w-8 h-8 text-gray-700 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expiry Alerts</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Know what expires before it happens.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <ChartIcon className="w-8 h-8 text-gray-700 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Waste Logging</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Log waste in one tap. See trends over time.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <CalculatorIcon className="w-8 h-8 text-gray-700 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Analysis</h3>
              <p className="text-gray-600 text-sm leading-relaxed">See exactly what each drink costs you.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <ChartIcon className="w-8 h-8 text-gray-700 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Waste Reports</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Weekly breakdown. Find the problems.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <CalculatorIcon className="w-8 h-8 text-gray-700 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Supplier Prices</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Track what you pay per supplier.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50 border-y border-gray-100 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pricing</h2>
            <p className="text-xl text-gray-600">Everything you need. Nothing you do not.</p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Free Tier */}
              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-500 mb-6">Forever. No credit card.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Track 2 milk types</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Expiry alerts</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Waste logging</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Cost analysis</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Weekly reports</span>
                  </li>
                </ul>
                <Link href="/signin" className="block w-full py-3 px-4 text-center border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Sign Up Free
                </Link>
              </div>
              {/* Pro Tier */}
              <div className="bg-white p-8 rounded-2xl border-2 border-amber-400 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Launch Price
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <p className="text-gray-500 mb-6">First 3 months. Then $19/mo.</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Everything in Free</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Unlimited milk types</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Supplier prices</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Auto-order suggestions</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">Export data</span>
                  </li>
                </ul>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-gray-900">$9<span className="text-lg font-normal text-gray-500">/mo</span></p>
                  <p className="text-sm text-gray-500">Launch price. First 3 months.</p>
                </div>
                <Link href="/signin" className="block w-full py-3 px-4 text-center bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Get Early Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">FAQ</h2>
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it really free?</h3>
              <p className="text-gray-600">Yes. Free tier has no limits on usage. No credit card required.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use it on my phone?</h3>
              <p className="text-gray-600">Yes. Works on phone, tablet, and desktop.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How does cost analysis work?</h3>
              <p className="text-gray-600">Enter your milk cost. Enter your typical pour size. See exactly what each drink costs.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What about my data?</h3>
              <p className="text-gray-600">Your data is yours. No selling. No spam.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When does the $9/mo price end?</h3>
              <p className="text-gray-600">After 3 months from launch. Then $19/mo or stay on the free tier.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Know what your coffee costs.</h2>
          <p className="text-xl text-gray-400 mb-8">Join the waitlist. Get early access.</p>
          <form className="max-w-md mx-auto" action="#" method="POST">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
              <button
                type="submit"
                className="bg-amber-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-500 transition-colors"
              >
                Join
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">No spam. Unsubscribe anytime.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg font-bold text-gray-900 mb-2">Milk Manager</p>
          <p className="text-gray-500 mb-4">From The Way to Coffee</p>
          <p className="text-sm text-gray-400">© 2026 Milk Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
