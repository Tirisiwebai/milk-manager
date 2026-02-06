import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">Milk Manager</span>
              <span className="ml-2 text-sm text-secondary">from The Way to Coffee</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-secondary hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-secondary hover:text-primary transition-colors">How it Works</a>
              <a href="#pricing" className="text-secondary hover:text-primary transition-colors">Pricing</a>
              <a href="#faq" className="text-secondary hover:text-primary transition-colors">FAQ</a>
              <Link href="#signup" className="btn-primary">
                Get Early Access
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
          One tap. Three benefits.
        </h1>
        <p className="text-xl sm:text-2xl text-secondary mb-12 max-w-3xl mx-auto">
          Save time. Save money. Reduce waste. The simplest way to track milk for your cafe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="#signup" className="btn-primary text-lg px-8 py-4">
            Get Early Access →
          </Link>
        </div>
        <p className="text-sm text-secondary">
          Free during beta. First 3 months at $9/mo.
        </p>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white border-y border-border">
        <div className="section">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
            How It Works
          </h2>
          <p className="text-xl text-secondary text-center mb-12">
            Three steps. That's it.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card text-center">
              <div className="text-6xl mb-6">📷</div>
              <h3 className="text-xl font-bold text-primary mb-3">Scan</h3>
              <p className="text-secondary">
                Open the app. Scan your milk. Done. Expiration dates detected automatically.
              </p>
            </div>
            {/* Step 2 */}
            <div className="card text-center">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-xl font-bold text-primary mb-3">Track</h3>
              <p className="text-secondary">
                Waste, usage, costs — all in one place. See your data in seconds, not spreadsheets.
              </p>
            </div>
            {/* Step 3 */}
            <div className="card text-center">
              <div className="text-6xl mb-6">💰</div>
              <h3 className="text-xl font-bold text-primary mb-3">Save</h3>
              <p className="text-secondary">
                AI predicts waste. Alerts when milks expire. Know your real costs per drink.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-12">
          Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="text-3xl mb-4">📷</div>
            <h3 className="text-lg font-bold text-primary mb-2">Photo Scanning</h3>
            <p className="text-secondary">Snap a photo. Expiration dates detected automatically.</p>
          </div>
          <div className="card">
            <div className="text-3xl mb-4">🔔</div>
            <h3 className="text-lg font-bold text-primary mb-2">Smart Alerts</h3>
            <p className="text-secondary">Get notified before milk expires. No more waste.</p>
          </div>
          <div className="card">
            <div className="text-3xl mb-4">📉</div>
            <h3 className="text-lg font-bold text-primary mb-2">Waste Tracking</h3>
            <p className="text-secondary">Log waste in one tap. See patterns over time.</p>
          </div>
          <div className="card">
            <div className="text-3xl mb-4">💵</div>
            <h3 className="text-lg font-bold text-primary mb-2">Cost Calculator</h3>
            <p className="text-secondary">Know your real costs per drink. Auto-calculated.</p>
          </div>
          <div className="card">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-lg font-bold text-primary mb-2">AI Predictions</h3>
            <p className="text-secondary">Predict waste before it happens. Powered by AI.</p>
          </div>
          <div className="card">
            <div className="text-3xl mb-4">📦</div>
            <h3 className="text-lg font-bold text-primary mb-2">Supplier Comparison</h3>
            <p className="text-secondary">Compare prices across suppliers. Order smarter.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-white border-y border-border">
        <div className="section">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
            Pricing
          </h2>
          <p className="text-xl text-secondary text-center mb-12">
            Everything you need. Nothing you don't.
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Tier */}
              <div className="card">
                <h3 className="text-2xl font-bold text-primary mb-2">Free</h3>
                <p className="text-secondary mb-6">Forever. No credit card.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Track 2 milk types</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Expiration alerts</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Photo scanning</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Waste logging</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Manual entry</span>
                  </li>
                </ul>
                <Link href="#signup" className="btn-secondary w-full text-center block">
                  Sign Up Free
                </Link>
              </div>
              {/* Pro Tier */}
              <div className="card border-accent border-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-primary">Pro</h3>
                  <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                    Launch Price
                  </span>
                </div>
                <p className="text-secondary mb-6">First 3 months. Then $19/mo.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Unlimited milk types</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>AI predictions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Cost calculator</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Supplier comparison</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Auto-order suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Export data</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-2">$9/mo</p>
                  <p className="text-sm text-secondary mb-4">Launch price. First 3 months.</p>
                  <Link href="#signup" className="btn-primary w-full text-center block">
                    Get Early Access
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-12">
          FAQ
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-primary mb-2">Is it really free?</h3>
            <p className="text-secondary">Yes. Free tier has no limits on usage. No credit card required.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-bold text-primary mb-2">Can I use it on my phone?</h3>
            <p className="text-secondary">Yes. Works on phone, tablet, and desktop. Install as PWA for offline use.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-bold text-primary mb-2">How does the photo scan work?</h3>
            <p className="text-secondary">Open app → Point camera → Tap. Expiration dates detected automatically using OCR.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-bold text-primary mb-2">What about my data?</h3>
            <p className="text-secondary">Your data is yours. No selling. No spam. GDPR compliant.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-bold text-primary mb-2">When does the $9/mo price end?</h3>
            <p className="text-secondary">After 3 months from launch. Then $19/mo or stay on the free tier.</p>
          </div>
        </div>
      </section>

      {/* Sign Up CTA */}
      <section id="signup" className="py-16 bg-primary text-white">
        <div className="section text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to save time and money?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the waitlist. Get early access. Be among the first to try Milk Manager.
          </p>
          <form className="max-w-md mx-auto" action="#" method="POST">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="bg-accent hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Join Waitlist
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-border">
        <div className="section text-center">
          <p className="text-lg font-bold text-primary mb-2">Milk Manager</p>
          <p className="text-secondary mb-4">From The Way to Coffee</p>
          <p className="text-sm text-secondary">
            A simple tool for cafe owners who care about waste, costs, and running a better business.
          </p>
          <p className="text-sm text-secondary mt-8">
            © 2026 Milk Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
