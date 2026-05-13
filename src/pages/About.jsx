import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function LightTag({ children }) {
  return (
    <span className="section-tag mb-6">
      <img src="/vess-icon.svg" className="h-3.5 w-auto" aria-hidden="true" />
      {children}
    </span>
  )
}

function DarkTag({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full border mb-6"
      style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.12)' }}>
      <img src="/vess-icon.svg" aria-hidden="true" style={{ height: 12, width: 'auto', opacity: 0.45 }} />
      {children}
    </span>
  )
}

export default function About() {
  return (
    <div>

      {/* ── HERO ── */}
      <section className="dark-section relative overflow-hidden py-32">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
          style={{ width: 440, opacity: 0.05, transform: 'translateY(-50%) translateX(22%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <DarkTag>Our Story</DarkTag>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.06] tracking-tight"
          >
            Built because blind spots<br />
            <span style={{ color: '#c88d5e' }}>cost networks — and their users.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mt-6 text-lg leading-relaxed max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Founded in 2025 in Canada, VeSS was built around a single conviction: mobile network operators deserve real-time, ground-truth visibility into how their networks actually perform — not in labs, but for real users, in real locations, every hour of every day.
          </motion.p>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="bg-white py-24 relative overflow-hidden">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
          style={{ width: 340, opacity: 0.05, transform: 'translateY(-50%) translateX(22%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="max-w-3xl">
            <LightTag>The Problem We Solve</LightTag>
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Network recovery doesn't mean<br />user experience recovery.
            </h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              Outages have always been difficult to detect quickly. But the harder truth is what happens after — nobody knows whether the user experience actually came back with the network. Call quality, SMS delivery, data speeds: all invisible until a subscriber complains.
            </p>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              And between outages? Service quality drifts — slowly, silently — while engineering teams remain focused on infrastructure metrics that don't reflect what users actually experience. VeSS was built to close that gap, permanently.
            </p>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Outages are hard to detect',
                body: 'Most operators learn about outages from their call centre, not their monitoring tools. VeSS detects degradation the moment it affects real-world service — automatically, continuously.',
              },
              {
                title: 'Recovery is assumed, not verified',
                body: "Restoring infrastructure doesn't guarantee users can make calls or receive SMS. VeSS confirms end-to-end service recovery through live device tests across your coverage area.",
              },
              {
                title: 'Daily quality drifts unseen',
                body: 'Without continuous testing, service quality can erode gradually with no alert ever firing. VeSS watches 24/7 so your team always knows the true state of the network.',
              },
            ].map(({ title, body }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="bg-[#f8fafc] rounded-2xl p-7 border border-slate-100 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f6ff] border border-[#c8dff5] flex items-center justify-center mb-5">
                    <img src="/vess-icon.svg" className="h-5 w-auto" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="dark-section py-28 relative overflow-hidden">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 left-0"
          style={{ width: 400, opacity: 0.05, transform: 'translateY(-50%) translateX(-22%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <DarkTag>Our Mission</DarkTag>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              "Give MNOs ground-truth visibility<br />
              <span style={{ color: '#c88d5e' }}>into their network quality."</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Not sampled data. Not synthetic estimates. Real signals, from real devices, deployed where your subscribers actually live and work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[#f8fafc] py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl mb-12">
            <LightTag>What We Stand For</LightTag>
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
              The principles behind the platform.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Reliable',
                body: 'We hold ourselves to the same standard we hold networks. Our platform delivers consistent, accurate results around the clock — because your engineering decisions depend on it.',
              },
              {
                label: 'Dependable',
                body: 'When a network engineer needs answers at 2am during an incident, VeSS is there. No gaps in coverage, no delayed data, no ambiguity.',
              },
              {
                label: 'Honest',
                body: 'We surface real data, not comfortable averages. If your network is underperforming in a region, you should know from VeSS — not from a subscriber complaint.',
              },
            ].map(({ label, body }, i) => (
              <FadeIn key={label} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm h-full">
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#1b619f] mb-4 block">{label}</span>
                  <p className="text-slate-600 leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-white py-24 relative overflow-hidden">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
          style={{ width: 320, opacity: 0.05, transform: 'translateY(-50%) translateX(22%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <LightTag>The Team</LightTag>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                A focused team building something that matters.
              </h2>
              <p className="mt-5 text-lg text-slate-500 leading-relaxed">
                We're a team of ten, headquartered in Canada, with deep roots in telecommunications, network engineering, and software development. We've experienced the consequences of poor network visibility first-hand — that shared frustration is exactly why VeSS exists.
              </p>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                Small enough to move fast. Experienced enough to build it right.
              </p>
              <div className="mt-8">
                <Link to="/careers" className="btn-primary inline-flex items-center gap-2 px-7 py-3">
                  See Open Roles <ArrowRight size={15} />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '2025',     label: 'Founded'         },
                  { val: '10',       label: 'Team Members'    },
                  { val: '3',        label: 'Test Types'      },
                  { val: '< 5s',     label: 'Result Latency'  },
                ].map(({ val, label }) => (
                  <div key={label} className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 text-center">
                    <div className="text-3xl font-extrabold text-[#1b619f]">{val}</div>
                    <div className="text-sm text-slate-500 mt-1.5">{label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="dark-section py-28 relative overflow-hidden">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
          style={{ width: 380, opacity: 0.09, transform: 'translateY(-50%) translateX(15%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="max-w-2xl">
            <DarkTag>Get Involved</DarkTag>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              See it in action.<br />
              <span style={{ color: '#c88d5e' }}>Or come build it with us.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Whether you're an MNO ready to see real network data, or an engineer who wants to work on something meaningful — we'd love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary px-8 py-3.5">
                Request a Demo <ArrowRight size={15} />
              </Link>
              <Link to="/careers" className="btn-primary px-8 py-3.5">
                Join the Team <ArrowRight size={15} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
