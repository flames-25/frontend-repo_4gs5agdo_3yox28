import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'

function App() {
  const [services, setServices] = useState([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferred_date: '',
    message: '',
  })

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/services`)
        const data = await res.json()
        setServices(data)
        setLoadingServices(false)
      } catch (e) {
        setLoadingServices(false)
      }
    }
    fetchServices()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Sending your inquiry...' })

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        service: form.service || 'Other',
        preferred_date: form.preferred_date || undefined,
        message: form.message || undefined,
      }
      const res = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Failed to send inquiry')
      }

      setStatus({ type: 'success', message: 'Thanks! We will get back to you shortly.' })
      setForm({ name: '', email: '', phone: '', service: '', preferred_date: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    }
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      {/* Hero Section with Spline cover */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Gradient Overlay (non-interactive) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

        <div className="relative h-full container mx-auto px-6 flex items-end pb-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Capture life’s biggest moments
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700">
              Weddings, events, school culturals, ID cards, album making, video editing, photo frames and more.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition">
                Get a quote
              </a>
              <a href="#services" className="inline-flex items-center justify-center rounded-lg bg-white/80 backdrop-blur px-6 py-3 font-semibold border border-gray-200 hover:bg-white transition">
                View services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Services</h2>
              <p className="text-gray-600 mt-2">Professional photography and media services for every occasion.</p>
            </div>
            <a href="#contact" className="hidden md:inline-flex px-4 py-2 rounded-lg bg-gray-900 text-white font-medium">Book now</a>
          </div>

          {loadingServices ? (
            <p className="text-gray-500">Loading services...</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.key} className="group rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition bg-white">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{s.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{s.key}</span>
                  </div>
                  <p className="mt-3 text-gray-600">{s.desc}</p>
                  <a href="#contact" className="mt-5 inline-flex text-gray-900 font-medium hover:underline">Enquire →</a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Timeless stories, beautifully told</h2>
            <p className="mt-4 text-gray-600">
              We combine creative direction with modern technology to craft images and films you’ll cherish forever. Our team covers everything from elegant weddings and vibrant cultural programs to professional ID photos and custom framing.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>• Cinematic wedding coverage</li>
              <li>• Multi-camera event shoots</li>
              <li>• School and college culturals</li>
              <li>• On-the-spot ID card photos and prints</li>
              <li>• Premium album designing and printing</li>
              <li>• Video editing for weddings, reels and promos</li>
              <li>• Custom photo frames and wall art</li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-100 to-white">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,#60a5fa_0,transparent_35%),radial-gradient(circle_at_70%_70%,#a78bfa_0,transparent_35%)]" />
          </div>
        </div>
      </section>

      {/* Contact / Booking */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold">Get a free quote</h2>
          <p className="text-gray-600 mt-2">Tell us about your event. We’ll reply within 24 hours.</p>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <select name="service" value={form.service} onChange={handleChange} required className="mt-1 w-full rounded-lg border-gray-300 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900">
                    <option value="">Select a service</option>
                    {services.length > 0 ? (
                      services.map((s) => (
                        <option key={s.key} value={s.key}>{s.name}</option>
                      ))
                    ) : (
                      <>
                        <option value="Wedding">Wedding</option>
                        <option value="Events">Events</option>
                        <option value="School Culturals">School Culturals</option>
                        <option value="ID Cards">ID Cards</option>
                        <option value="Album Making">Album Making</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Photo Frames">Photo Frames</option>
                        <option value="Other">Other</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Preferred date</label>
                  <input type="date" name="preferred_date" value={form.preferred_date} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Share details about your event or requirements" className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900" />
                </div>
              </div>

              {status.message && (
                <div className={`mt-4 text-sm rounded-lg px-3 py-2 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                  {status.message}
                </div>
              )}

              <button type="submit" className="mt-6 inline-flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
                Send inquiry
              </button>
            </form>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-semibold">Why choose us</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>• Experienced team across weddings and events</li>
                <li>• Modern gear and creative direction</li>
                <li>• Flexible packages for any budget</li>
                <li>• Fast delivery with premium quality</li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-white border border-gray-200">
                <p className="text-sm text-gray-600">Have an urgent booking?</p>
                <p className="font-medium">Call/WhatsApp: +91-90000-00000</p>
                <p className="text-sm text-gray-600">Email: studio@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Studio. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <a href="/test" className="hover:underline">System status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
