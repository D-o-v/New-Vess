import { useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap, Globe, BarChart3, Bell, Lock, Smartphone } from 'lucide-react'
const FeaturesGlobe = lazy(() => import('../components/FeaturesGlobe'))

/* ── Helpers ── */
function FadeIn({ children, delay = 0, className = '', x = 0, y = 22 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

function Check({ children }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#c88d5e' }} />
      <span className="text-[15px] text-slate-600 leading-snug">{children}</span>
    </li>
  )
}

function Tag({ children, dark }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full border mb-6"
      style={dark
        ? { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.12)' }
        : { background: 'rgba(27,97,159,0.07)', color: '#1b619f', borderColor: 'rgba(27,97,159,0.18)' }}>
      <img src="/vess-icon.svg" aria-hidden="true" style={{ height: 12, width: 'auto', opacity: dark ? 0.45 : 1 }} />
      {children}
    </span>
  )
}

/* ── Visual Panels ── */
function TestPanel() {
  const rows = [
    { id: 'VT-0847', type: 'Voice', status: 'Pass', mos: '4.3', cst: '1.8s', color: '#1b619f' },
    { id: 'ST-0312', type: 'SMS',   status: 'Pass', mos: '—',   cst: '0.9s', color: '#8b5cf6' },
    { id: 'DT-0194', type: 'Data',  status: 'Pass', mos: '—',   cst: '48ms', color: '#0891b2' },
    { id: 'VT-0846', type: 'Voice', status: 'Fail', mos: '—',   cst: '—',    color: '#1b619f' },
    { id: 'ST-0311', type: 'SMS',   status: 'Pass', mos: '—',   cst: '1.1s', color: '#8b5cf6' },
  ]
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-xl bg-white">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-600">Live test results</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">streaming · 5s latency</span>
      </div>
      <div className="divide-y divide-slate-50">
        {rows.map((r, i) => (
          <motion.div key={r.id}
            initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22,1,0.36,1] }}
            className="flex items-center gap-4 px-5 py-3">
            <span className="text-[10px] font-mono text-slate-400 w-16">{r.id}</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md"
              style={{ background: `${r.color}12`, color: r.color }}>{r.type}</span>
            <span className={`text-[11px] font-semibold ml-auto ${r.status === 'Pass' ? 'text-emerald-600' : 'text-red-500'}`}>
              {r.status}
            </span>
            <span className="text-[11px] font-mono text-slate-400 w-10 text-right">{r.cst}</span>
            {r.mos !== '—' && (
              <span className="text-[10px] font-bold text-[#c88d5e] w-14 text-right">MOS {r.mos}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function AnalyticsPanel() {
  const bars = [94, 97, 91, 98, 96, 88, 99]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const maxH = 96 // px — total bar track height

  return (
    <div className="rounded-2xl overflow-hidden border shadow-xl" style={{ background: '#030912', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="px-5 py-3.5 border-b flex items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <BarChart3 size={13} style={{ color: '#c88d5e' }} />
        <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>Pass Rate — 7 days</span>
        <span className="ml-auto text-xs font-bold text-emerald-400">96.4% avg</span>
      </div>
      <div className="p-5">
        {/* fixed-height track so scaleY percentages resolve correctly */}
        <div className="flex items-end gap-2" style={{ height: maxH + 20 }}>
          {bars.map((v, i) => {
            const barH = Math.round(((v - 80) / 20) * maxH)
            const isHigh = v >= 95
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5" style={{ height: maxH + 16 }}>
                {/* track background */}
                <div className="w-full relative rounded-t-md" style={{ height: maxH, background: 'rgba(255,255,255,0.05)' }}>
                  {/* animated bar — grows from bottom using scaleY */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-0 left-0 right-0 rounded-t-md"
                    style={{
                      height: barH,
                      transformOrigin: 'bottom',
                      background: isHigh
                        ? 'linear-gradient(to top, #1b619f, #4da6e0)'
                        : 'linear-gradient(to top, #c88d5e, #e0b080)',
                    }}
                  />
                </div>
                <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{days[i]}</span>
              </div>
            )
          })}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[['97.1%','Voice'],['98.4%','SMS'],['245 Mbps','Avg Speed']].map(([v, l]) => (
            <div key={l} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-base font-extrabold text-white">{v}</div>
              <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AlertsPanel() {
  const alerts = [
    { sev: 'Critical', msg: 'DEV-004 offline · East Region',         t: '2m ago',  c: '#ef4444' },
    { sev: 'Warning',  msg: 'CST exceeded 4s · East Region',         t: '14m ago', c: '#f59e0b' },
    { sev: 'Info',     msg: 'Firmware v2.4.1 available — 3 devices', t: '1h ago',  c: '#1b619f' },
    { sev: 'Resolved', msg: 'East Node reconnected',                  t: '2h ago',  c: '#22c55e' },
  ]
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-xl bg-white">
      <div className="px-5 py-3.5 border-b border-slate-50 flex items-center gap-2">
        <Bell size={13} className="text-[#c88d5e]" />
        <span className="text-xs font-semibold text-slate-600">Alerts &amp; Notifications</span>
        <span className="ml-auto text-[11px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">2 new</span>
      </div>
      <div className="divide-y divide-slate-50">
        {alerts.map((a, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22,1,0.36,1] }}
            className="flex items-center gap-3 px-5 py-3.5">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.c }} />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wide mr-2" style={{ color: a.c }}>{a.sev}</span>
              <span className="text-xs text-slate-600 truncate">{a.msg}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">{a.t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Integration chips ── */
const INTEGRATIONS = [
  { name: 'Slack',              dot: '#4A154B' },
  { name: 'Prometheus',         dot: '#E6522C' },
  { name: 'Grafana',            dot: '#F46800' },
  { name: 'PagerDuty',          dot: '#06AC38' },
  { name: 'Microsoft Teams',    dot: '#6264A7' },
  { name: 'REST API',           dot: '#1b619f' },
  { name: 'Webhooks',           dot: '#1b619f' },
  { name: 'Regulatory Reports', dot: '#c88d5e' },
]

function Chip({ name, dot, bg = '#fff' }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-slate-100 flex-shrink-0 shadow-sm"
      style={{ background: bg }}>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
      <span className="font-semibold text-slate-700 text-sm whitespace-nowrap">{name}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
export default function Features() {
  return (
    <>
      <style>{`
        @keyframes marqueeL { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>

      <div>

        {/* ── HERO ── */}
        <section className="relative dark-section overflow-hidden" style={{ minHeight: '90vh' }}>
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(100,140,200,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          {/* Left fade vignette over globe */}
          <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, #030912 38%, rgba(2,8,24,0.7) 65%, transparent 100%)' }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to top, #030912, transparent)' }} />

          {/* Globe — covers right ~72% of the section */}
          <div className="absolute top-0 right-0 h-full pointer-events-none"
            style={{ width: '72%' }}>
            <Suspense fallback={null}><FeaturesGlobe /></Suspense>
          </div>

          {/* Text content — sits above globe via z-index */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-32 flex items-center"
            style={{ minHeight: '90vh' }}>
            <div className="max-w-xl">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <Tag dark>Platform Features</Tag>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.06] tracking-tight">
                Real devices.<br />
                <span style={{ color: '#c88d5e' }}>Real signals.</span><br />
                Complete coverage.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="mt-6 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                VeSS deploys Android phones as silent testing agents across your entire
                coverage area — voice, SMS, and data tested continuously, results streamed
                in 5 seconds.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 }}
                className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary text-sm">
                  Request Demo <ArrowRight size={15} />
                </Link>
              </motion.div>

              {/* Stats strip */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.48 }}
                className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5">
                {[
                  ['5s',         'Result latency'           ],
                  ['Android 8+', 'Device support'           ],
                  ['3 types',    'Voice · SMS · Data'       ],
                  ['24/7',       'Silent background testing'],
                ].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div className="text-2xl font-extrabold text-white">{val}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>{lbl}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 1: TESTING — light, text left / panel right ── */}
        <section className="bg-white py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left */}
              <FadeIn x={-16} y={0}>
                <Tag>Core Testing</Tag>
                <h2 className="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  Test every layer<br />of your network.
                </h2>
                <p className="mt-5 text-slate-500 leading-relaxed max-w-md">
                  Silent Android agents run continuously in the background — no user intervention,
                  no app switching. Results stream to your dashboard in under 5 seconds.
                </p>
                <ul className="mt-8 space-y-3.5">
                  <Check>Voice — CCR, ASR, CST, CDR, MOS scoring</Check>
                  <Check>SMS — delivery rate, delivery time, bounce rate</Check>
                  <Check>Data — throughput, RTT, packet loss, jitter, DNS</Check>
                  <Check>Auto-retry on failure with configurable intervals</Check>
                  <Check>Offline sync when connectivity is restored</Check>
                </ul>
                <div className="mt-8">
                </div>
              </FadeIn>

              {/* Right — live test feed panel */}
              <FadeIn x={16} y={0} delay={0.1}>
                <TestPanel />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: ANALYTICS — dark, panel left / text right ── */}
        <section className="dark-section py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left — chart panel */}
              <FadeIn x={-16} y={0}>
                <AnalyticsPanel />
              </FadeIn>

              {/* Right */}
              <FadeIn x={16} y={0} delay={0.1}>
                <Tag dark>Analytics & Reporting</Tag>
                <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
                  Every metric,<br />in one place.
                </h2>
                <p className="mt-5 leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  From real-time KPIs to scheduled PDF reports — see exactly where your
                  network performs and where it falls short.
                </p>
                <ul className="mt-8 space-y-3.5">
                  <Check>Real-time KPI dashboard with live streaming</Check>
                  <Check>Geographic heatmap by region and operator</Check>
                  <Check>Time-series trend analysis across any period</Check>
                  <Check>Region-to-region and operator comparison</Check>
                  <Check>Threshold-based alerts with configurable rules</Check>
                  <Check>Scheduled PDF and CSV report delivery</Check>
                </ul>
                <div className="mt-8">
                  <Link to="/contact" className="btn-primary text-sm">
                    See a live demo <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: ALERTS — light, text left / panel right ── */}
        <section className="bg-[#f8fafc] py-28 relative overflow-hidden">
          <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
            style={{ width: 340, opacity: 0.06, transform: 'translateY(-50%) translateX(20%)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left */}
              <FadeIn x={-16} y={0}>
                <Tag>Alerts & Automation</Tag>
                <h2 className="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  Know the moment<br />something breaks.
                </h2>
                <p className="mt-5 text-slate-500 leading-relaxed max-w-md">
                  Configurable thresholds fire alerts the instant your network degrades —
                  before your customers notice.
                </p>
                <ul className="mt-8 space-y-3.5">
                  <Check>Critical, warning, and info severity tiers</Check>
                  <Check>Slack, Teams, PagerDuty, email &amp; SMS channels</Check>
                  <Check>Per-device and per-region alert rules</Check>
                  <Check>Webhook triggers for custom automation</Check>
                  <Check>7-year audit log for compliance reporting</Check>
                </ul>
                <div className="mt-8">
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1b619f] hover:gap-2.5 transition-all">
                    Talk to an engineer <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>

              {/* Right — alerts panel */}
              <FadeIn x={16} y={0} delay={0.1}>
                <AlertsPanel />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── CAPABILITY BENTO GRID ── */}
        <section className="bg-white py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-16">
              <Tag>Everything Included</Tag>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Built for enterprise networks.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: Smartphone,
                  label: 'Silent Android Agents',
                  detail: 'Android 8+ · 24/7 background · auto-retry · offline sync',
                  accent: '#1b619f',
                },
                {
                  icon: Zap,
                  label: '5-Second Streaming',
                  detail: 'Results appear in the dashboard within 5 seconds of test completion',
                  accent: '#c88d5e',
                },
                {
                  icon: Globe,
                  label: 'Multi-Region Coverage',
                  detail: 'Deploy agents across any geography — field, urban, rural, roaming',
                  accent: '#1b619f',
                },
                {
                  icon: BarChart3,
                  label: 'Deep KPI Library',
                  detail: 'CCR, ASR, CST, CDR, MOS, throughput, RTT, jitter, DNS and more',
                  accent: '#c88d5e',
                },
                {
                  icon: Bell,
                  label: 'Smart Alert Engine',
                  detail: 'Threshold rules, severity tiers, multi-channel delivery, webhook triggers',
                  accent: '#1b619f',
                },
                {
                  icon: Lock,
                  label: 'Enterprise Security',
                  detail: 'TLS 1.3, AES-256, MFA, RBAC, GDPR-ready, 7-year audit logs',
                  accent: '#c88d5e',
                },
              ].map(({ icon: Icon, label, detail, accent }, i) => (
                <FadeIn key={label} delay={i * 0.06}>
                  <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300 h-full">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors"
                      style={{ background: `${accent}10` }}>
                      <Icon size={18} style={{ color: accent }} />
                    </div>
                    <div className="font-bold text-slate-900 text-[15px] mb-2">{label}</div>
                    <div className="text-sm text-slate-500 leading-relaxed">{detail}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS ── */}
        <section className="bg-[#f8fafc] py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <FadeIn>
              <Tag>Integrations</Tag>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Plugs into your stack.
              </h2>
            </FadeIn>
          </div>

          <div className="flex overflow-hidden">
            <div className="flex gap-4" style={{ animation: 'marqueeL 65s linear infinite', willChange: 'transform' }}>
              {[...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS].map(({ name, dot }, i) => (
                <Chip key={i} name={name} dot={dot} />
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <FadeIn>
              <p className="text-sm text-slate-500">
                REST API &amp; webhook support for any custom integration.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="dark-section py-28 relative overflow-hidden">
          {/* Brand icon accent */}
          <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
            style={{ width: 380, opacity: 0.09, transform: 'translateY(-50%) translateX(15%)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <FadeIn>
                <Tag dark>Get Started</Tag>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Ready to see it<br />in action?
                </h2>
                <p className="mt-5 text-lg max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Book a live demo and see real test results streaming from real devices
                  into the VeSS dashboard.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary px-8 py-3.5">
                    Request Demo <ArrowRight size={15} />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
