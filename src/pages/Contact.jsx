import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Building2, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    demo: false,
  })

  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@vess-solutions.com',
      href: 'mailto:info@vess-solutions.com',
    },
    {
      icon: Building2,
      label: 'Enterprise Sales',
      value: 'sales@vess-solutions.com',
      href: 'mailto:sales@vess-solutions.com',
    },
  ]

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-white via-[#f8fbff] to-[#f0f6ff] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag mb-5"><img src="/vess-icon.svg" className="h-3.5 w-auto" aria-hidden="true" />Contact</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 leading-tight"
          >
            Let's talk
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            Request a demo, ask a question, or explore how Vess fits your team.
          </motion.p>
        </div>
      </section>

      {/* Calendly embed */}
      <section id="schedule" className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-tag mb-5">
              <img src="/vess-icon.svg" className="h-3.5 w-auto" aria-hidden="true" />
              Schedule a Meeting
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Book a 30-minute call
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              Pick a time that works for you and we'll walk you through VeSS — no preparation needed on your end.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              src="https://calendly.com/vess-solutions-info/30min?hide_gdpr_banner=1"
              width="100%"
              height="700"
              style={{ minHeight: 500 }}
              frameBorder="0"
              title="Schedule a meeting with VeSS"
              className="block"
            />
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact info */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Get in touch</h2>
              <div className="space-y-5">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#f0f6ff] border border-[#c8dff5] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1b619f] transition-colors">
                      <Icon size={18} className="text-[#1b619f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</div>
                      <div className="text-sm font-medium text-slate-700 group-hover:text-[#1b619f] transition-colors">{value}</div>
                    </div>
                  </a>
                ))}
              </div>

            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center"
                >
                  <div className="w-16 h-16 bg-[#f0f6ff] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-[#1b619f]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message sent!</h3>
                  <p className="text-slate-500">
                    Thanks for reaching out. Our team will get back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', phone: '', message: '', demo: false }) }}
                    className="mt-6 text-sm text-[#1b619f] font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={submit}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handle}
                        placeholder="Jane Smith"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1b619f] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handle}
                        placeholder="jane@company.com"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1b619f] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handle}
                        placeholder="Acme Corp"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1b619f] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handle}
                        placeholder="+1 555 000 0000"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1b619f] focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handle}
                      placeholder="Tell us about your use case, current setup, or any questions you have…"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1b619f] focus:border-transparent transition resize-none"
                    />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="demo"
                      checked={form.demo}
                      onChange={handle}
                      className="w-4 h-4 rounded accent-[#1b619f]"
                    />
                    <span className="text-sm text-slate-600">I'd like to request a live demo</span>
                  </label>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3 text-sm"
                  >
                    Send Message
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
