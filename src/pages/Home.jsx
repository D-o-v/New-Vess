import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence, useAnimation, useReducedMotion } from 'framer-motion'
import HowItWorksSection from '../components/HowItWorksSection'

const GlobeHero = lazy(() => import('../components/GlobeHero'))
import {
  ChevronDown, ArrowRight, CheckCircle2,
  LayoutDashboard, Shield, Lock, FileCheck,
  Users, KeyRound, ClipboardList, Smartphone, Activity,
  Bell, BarChart3, Radio
} from 'lucide-react'

/* ─────────────────────────────────────────────
   FadeIn
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   AnimatedCounter
───────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 1800 / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

/* ─────────────────────────────────────────────
   MetricCard — animated sparkline + countup
───────────────────────────────────────────── */
function MetricCard({ name, abbr, value, unit, spark, color = '#1b619f' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const target = parseFloat(value)
    let raf, start
    const run = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1100, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCount(parseFloat((target * e).toFixed(unit === 's' || unit === 'ms' ? 1 : 1)))
      if (p < 1) raf = requestAnimationFrame(run)
    }
    raf = requestAnimationFrame(run)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, unit])

  const W = 100, H = 38
  const min = Math.min(...spark), max = Math.max(...spark)
  const range = max - min || 1
  const pts = spark.map((v, i) => [
    (i / (spark.length - 1)) * W,
    H - ((v - min) / range) * (H - 4) - 2,
  ])
  const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${W},${H} L0,${H} Z`
  const [lx, ly] = pts[pts.length - 1]

  return (
    <motion.div ref={ref}
      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300 group"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 tracking-wide"
            style={{ background: `${color}18`, color }}>
            {abbr}
          </span>
          <div className="font-semibold text-slate-700 text-sm leading-snug">{name}</div>
        </div>
        <div className="flex items-end gap-0.5 ml-3 flex-shrink-0">
          <span className="font-black text-slate-900 tabular-nums" style={{ fontSize: 24 }}>{count}</span>
          <span className="text-slate-400 font-semibold mb-0.5" style={{ fontSize: 13 }}>{unit}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
        <span className="text-xs font-medium" style={{ color }}>Live</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 42 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g-${abbr}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={areaPath} fill={`url(#g-${abbr})`}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.4 }} />
        <motion.path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} />
        <motion.circle cx={lx} cy={ly} r="3" fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.95, duration: 0.25 }} />
      </svg>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Dashboard Mockup sub-views
───────────────────────────────────────────── */
function DashboardOverview() {
  const shouldReduceMotion = useReducedMotion()
  const kpis = [
    { label: 'Active Tests',      value: '30',    color: '#1b619f' },
    { label: 'Online Devices',    value: '4',     color: '#22c55e' },
    { label: 'AVG Network Speed', value: '98.5%', color: '#1b619f' },
    { label: 'Failed Tests',      value: '30',    color: '#ef4444' },
  ]
  const sms  = [96,97,95,98,97,99,98]
  const call = [91,93,90,94,92,96,95]
  const MIN = 88, RANGE = 13, W = 260, H = 68
  const xStep = W / (sms.length - 1)
  const py = (v) => H - ((v - MIN) / RANGE) * H
  const C = 2 * Math.PI * 22
  const onlineLen = C * (4/6), warnLen = C * (1/6), offLen = C * (1/6)

  return (
    <div className="p-3 overflow-hidden h-full">
      <div className="text-[10px] font-bold text-slate-700 mb-2">Overview</div>
      <div className="grid grid-cols-2 gap-1.5 mb-2.5">
        {kpis.map(({ label, value, color }, i) => (
          <motion.div
            key={label}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: 1.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-xl p-2 border border-slate-100 shadow-sm"
          >
            <div className="text-[7px] text-slate-400 uppercase tracking-wider font-medium truncate">{label}</div>
            <div className="text-sm font-bold mt-0.5 leading-none" style={{ color }}>{value}</div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <div className="col-span-2 bg-white rounded-xl p-2 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[8px] font-semibold text-slate-600">Success Rate</span>
            <div className="flex gap-2">
              <div className="flex items-center gap-1"><div className="w-3 h-px bg-[#1b619f]"/><span className="text-[6.5px] text-slate-400">Call</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-px bg-[#22c55e]"/><span className="text-[6.5px] text-slate-400">SMS</span></div>
            </div>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:56 }} preserveAspectRatio="none">
            {[0,0.33,0.67,1].map(t => <line key={t} x1={0} y1={t*H} x2={W} y2={t*H} stroke="#f1f5f9" strokeWidth="1"/>)}
            <motion.polyline
              points={sms.map((v,i)=>`${i*xStep},${py(v)}`).join(' ')}
              fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.75, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.polyline
              points={call.map((v,i)=>`${i*xStep},${py(v)}`).join(' ')}
              fill="none" stroke="#1b619f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="flex justify-between mt-1">
            {['M','T','W','T','F','S','S'].map((d,i) => <span key={i} className="text-[6px] text-slate-300 flex-1 text-center">{d}</span>)}
          </div>
        </div>
        <div className="bg-white rounded-xl p-2 border border-slate-100 shadow-sm flex flex-col">
          <span className="text-[8px] font-semibold text-slate-600 mb-1">Device Status</span>
          <div className="flex items-center justify-center flex-1">
            <svg viewBox="0 0 60 60" style={{ width:52, height:52 }}>
              <circle cx="30" cy="30" r="22" fill="none" stroke="#22c55e" strokeWidth="8"
                strokeDasharray={`${onlineLen} ${C-onlineLen}`} strokeDashoffset="0" transform="rotate(-90 30 30)"/>
              <circle cx="30" cy="30" r="22" fill="none" stroke="#f59e0b" strokeWidth="8"
                strokeDasharray={`${warnLen} ${C-warnLen}`} strokeDashoffset={-onlineLen} transform="rotate(-90 30 30)"/>
              <circle cx="30" cy="30" r="22" fill="none" stroke="#cbd5e1" strokeWidth="8"
                strokeDasharray={`${offLen} ${C-offLen}`} strokeDashoffset={-(onlineLen+warnLen)} transform="rotate(-90 30 30)"/>
              <text x="30" y="32.5" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1e293b">4/6</text>
              <text x="30" y="40" textAnchor="middle" fontSize="5.5" fill="#94a3b8">devices</text>
            </svg>
          </div>
          <div className="space-y-0.5">
            {[{label:'Online',color:'#22c55e',n:4},{label:'Warning',color:'#f59e0b',n:1},{label:'Offline',color:'#cbd5e1',n:1}].map(({label,color,n})=>(
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{backgroundColor:color}}/>
                  <span className="text-[6.5px] text-slate-400">{label}</span>
                </div>
                <span className="text-[6.5px] font-bold text-slate-600">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TestManagementView() {
  const stats = [
    { label:'Active',          value:'42',    color:'#1b619f' },
    { label:'Completed Today', value:'12',    color:'#22c55e' },
    { label:'Failed',          value:'3',     color:'#ef4444' },
    { label:'AVG Success',     value:'98.5%', color:'#1b619f' },
  ]
  const tests = [
    { name:'Metro-East Voice Test',  type:'Voice', status:'Running'   },
    { name:'Zone B SMS Delivery',    type:'SMS',   status:'Scheduled' },
    { name:'Central Data Speed',     type:'Data',  status:'Running'   },
    { name:'West-South Data Test',   type:'Data',  status:'Completed' },
    { name:'Regional Voice Check',   type:'Voice', status:'Scheduled' },
    { name:'Priority SMS Alert',     type:'SMS',   status:'Completed' },
  ]
  const badge = {
    Running:   { bg:'#dcfce7', fg:'#16a34a' },
    Scheduled: { bg:'#eff6ff', fg:'#1b619f' },
    Completed: { bg:'#f1f5f9', fg:'#64748b' },
  }
  return (
    <div className="p-3 h-full">
      <div className="text-[10px] font-bold text-slate-700 mb-2">Test Management</div>
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-2 border border-slate-100 shadow-sm text-center">
            <div className="text-xs font-bold leading-none" style={{ color }}>{value}</div>
            <div className="text-[6.5px] text-slate-400 mt-0.5 leading-tight">{label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid px-3 py-1.5 bg-slate-50 border-b border-slate-100" style={{ gridTemplateColumns:'1fr 60px 70px' }}>
          {['Test Name','Type','Status'].map(h => <span key={h} className="text-[7px] font-semibold text-slate-400 uppercase tracking-wide">{h}</span>)}
        </div>
        {tests.map(({ name, type, status }) => (
          <div key={name} className="grid px-3 py-1.5 border-b border-slate-50 last:border-0 items-center"
            style={{ gridTemplateColumns:'1fr 60px 70px' }}>
            <span className="text-[7.5px] text-slate-700 font-medium truncate pr-2">{name}</span>
            <span className="text-[7px] text-slate-400">{type}</span>
            <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full w-fit"
              style={{ backgroundColor:badge[status].bg, color:badge[status].fg }}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DeviceManagementView() {
  const stats = [
    { label:'Total',   value:'6', color:'#1b619f' },
    { label:'Online',  value:'4', color:'#22c55e' },
    { label:'Offline', value:'1', color:'#ef4444' },
    { label:'Warning', value:'1', color:'#f59e0b' },
  ]
  const devices = [
    { name:'CTR-Central-01', city:'Central Hub',  battery:87, net:'4G', status:'Online'  },
    { name:'WST-Station-02', city:'West Station', battery:92, net:'4G', status:'Online'  },
    { name:'DWN-Core-03',    city:'Downtown',     battery:45, net:'5G', status:'Online'  },
    { name:'NTH-Campus-04',  city:'North Campus', battery:10, net:'4G', status:'Warning' },
  ]
  const dot = { Online:'#22c55e', Warning:'#f59e0b', Offline:'#ef4444' }
  const batColor = (b) => b < 20 ? '#ef4444' : b < 50 ? '#f59e0b' : '#22c55e'

  return (
    <div className="p-3 h-full">
      <div className="text-[10px] font-bold text-slate-700 mb-2">Device Management</div>
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-2 border border-slate-100 shadow-sm text-center">
            <div className="text-xs font-bold leading-none" style={{ color }}>{value}</div>
            <div className="text-[6.5px] text-slate-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {devices.map(({ name, city, battery, net, status }) => (
          <div key={name} className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor:dot[status] }}/>
                <span className="text-[6.5px] font-semibold text-slate-500">{status}</span>
              </div>
              <span className="text-[7px] font-bold text-[#1b619f] bg-[#eff6ff] px-1.5 py-0.5 rounded-full">{net}</span>
            </div>
            <div className="text-[8px] font-bold text-slate-800 truncate leading-tight">{name}</div>
            <div className="text-[6.5px] text-slate-400 mb-1.5">{city}</div>
            <div className="flex items-center gap-1.5">
              <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width:`${battery}%`, backgroundColor:batColor(battery) }}/>
              </div>
              <span className="text-[6.5px] font-semibold text-slate-500 w-7 text-right">{battery}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BlankView({ label }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 rounded-lg bg-[#f0f6ff] flex items-center justify-center mx-auto mb-2">
          <BarChart3 size={14} className="text-[#1b619f]"/>
        </div>
        <div className="text-[9px] font-semibold text-slate-600">{label}</div>
        <div className="text-[7.5px] text-slate-400 mt-0.5">Coming soon</div>
      </div>
    </div>
  )
}

function DashboardMockup() {
  const [view, setView] = useState('dashboard')
  const nav = [
    { id:'dashboard',  label:'Dashboard',            icon:LayoutDashboard },
    { id:'tests',      label:'Test Management',       icon:ClipboardList   },
    { id:'devices',    label:'Device Management',     icon:Smartphone      },
    { id:'monitoring', label:'Real-time Monitoring',  icon:Activity        },
    { id:'reports',    label:'Reports & Analytics',   icon:BarChart3       },
    { id:'control',    label:'Remote Device Control', icon:Radio           },
    { id:'alerts',     label:'Alerts & Notifications',icon:Bell            },
    { id:'settings',   label:'Settings',              icon:Shield          },
  ]
  const renderView = () => {
    if (view === 'dashboard') return <DashboardOverview/>
    if (view === 'tests')     return <TestManagementView/>
    if (view === 'devices')   return <DeviceManagementView/>
    return <BlankView label={nav.find(n=>n.id===view)?.label??''}/>
  }
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
      <div className="bg-[#1a1f2e] px-4 py-2.5 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80"/>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-80"/>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 opacity-80"/>
        <div className="ml-3 flex-1 bg-[#0f1420] rounded-md px-3 py-1 text-[10px] text-slate-400 font-mono truncate">
          app.vess-solutions.com
        </div>
      </div>
      {/* Scrollable wrapper on small screens */}
      <div className="overflow-x-auto">
        <div className="flex" style={{ height: 440, minWidth: 480 }}>
          <div className="flex flex-col bg-[#1b619f] flex-shrink-0" style={{ width: 152 }}>
            <div className="px-3 pt-3 pb-2 border-b border-white/10">
              <div className="text-[7px] text-white/50 uppercase tracking-wider mb-1">Network</div>
              <div className="bg-white/15 rounded-lg px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-white/20 transition-colors">
                <span className="text-[8.5px] text-white font-semibold">Acme Telecom</span>
                <ChevronDown size={8} className="text-white/70 flex-shrink-0 ml-1"/>
              </div>
            </div>
            <div className="flex-1 px-2 py-2 space-y-0.5 overflow-hidden">
              {nav.map(({ id, label, icon:Icon }) => (
                <button key={id} onClick={() => setView(id)}
                  className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg transition-colors text-left ${view===id?'bg-white/20 shadow-sm':'hover:bg-white/10'}`}>
                  <Icon size={10} className={`flex-shrink-0 ${view===id?'text-white':'text-white/55'}`}/>
                  <span className={`text-[8px] font-medium truncate leading-none ${view===id?'text-white':'text-white/65'}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-[#f4f7fc] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={view} initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:0.18}} className="h-full">
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Animated Dashboard wrapper
───────────────────────────────────────────── */
function AnimatedDashboard() {
  const controls = useAnimation()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.start({ opacity: 1, y: 0, rotateX: 0, scale: 1 })
      return
    }
    async function sequence() {
      await controls.start({
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: { duration: 1.0, delay: 0.85, ease: [0.22, 1, 0.36, 1] },
      })
      controls.start({
        y: [0, -7, 0],
        transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
      })
    }
    sequence()
  }, [controls, shouldReduceMotion])

  return (
    <div style={{ perspective: '1400px' }}>
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 14, scale: 0.96 }}
        animate={controls}
        style={{
          filter: 'drop-shadow(0 40px 80px rgba(27,97,159,0.18))',
          transformOrigin: 'center 85%',
          willChange: 'transform',
        }}
      >
        <DashboardMockup />
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Metric tab data
───────────────────────────────────────────── */
const V = '#1b619f', S = '#8b5cf6', D = '#0891b2'
const metricTabs = {
  voice: [
    { name:'Call Completion Rate', abbr:'CCR', value:'96.4', unit:'%', color:V, spark:[88,90,87,92,91,94,93,95,95,96] },
    { name:'Answer-Seizure Ratio', abbr:'ASR', value:'94.8', unit:'%', color:V, spark:[84,87,83,89,88,92,91,93,94,95] },
    { name:'Call Setup Time',      abbr:'CST', value:'1.8',  unit:'s', color:V, spark:[2.9,2.6,2.7,2.3,2.1,2.0,1.9,1.8,1.8,1.8] },
    { name:'Call Drop Rate',       abbr:'CDR', value:'1.2',  unit:'%', color:V, spark:[3.4,3.0,3.1,2.6,2.2,1.9,1.6,1.4,1.3,1.2] },
    { name:'Call Success Rate',    abbr:'CSR', value:'97.1', unit:'%', color:V, spark:[91,92,91,94,93,95,95,96,96,97] },
  ],
  sms: [
    { name:'SMS Delivery Rate', abbr:'DR',  value:'98.7', unit:'%', color:S, spark:[94,95,94,96,96,97,97,98,98,99] },
    { name:'SMS Delivery Time', abbr:'DT',  value:'2.1',  unit:'s', color:S, spark:[4.2,3.8,3.5,3.1,2.8,2.5,2.4,2.2,2.1,2.1] },
    { name:'SMS Bounce Rate',   abbr:'SBR', value:'0.8',  unit:'%', color:S, spark:[2.8,2.4,2.5,2.0,1.6,1.4,1.2,1.0,0.9,0.8] },
  ],
  data: [
    { name:'Download Throughput', abbr:'DL',  value:'42.5', unit:'Mbps', color:D, spark:[28,32,30,35,34,38,37,40,41,43] },
    { name:'Upload Throughput',   abbr:'UL',  value:'18.3', unit:'Mbps', color:D, spark:[12,14,13,15,14,16,16,17,18,18] },
    { name:'Latency',             abbr:'RTT', value:'24',   unit:'ms',   color:D, spark:[48,44,46,40,38,34,32,28,25,24] },
    { name:'Packet Loss',         abbr:'PL',  value:'0.3',  unit:'%',    color:D, spark:[1.8,1.6,1.5,1.2,1.0,0.8,0.6,0.5,0.4,0.3] },
    { name:'Jitter',              abbr:'J',   value:'3.2',  unit:'ms',   color:D, spark:[9,8,8,7,6,5,4,4,3,3] },
    { name:'DNS Resolution Time', abbr:'DNS', value:'18',   unit:'ms',   color:D, spark:[42,38,36,32,29,26,24,21,19,18] },
  ],
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
export default function Home() {
  const [tab, setTab] = useState('voice')

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ────────────────────────────────── */}
      <section className="relative flex flex-col bg-[#030912] overflow-hidden" style={{ minHeight: '100dvh' }}>

        {/* Radial blue glow behind globe */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)',
            width:'90%', height:'65%',
            background:'radial-gradient(ellipse at center, rgba(27,97,159,0.28) 0%, transparent 68%)',
            filter:'blur(50px)' }} />
          <div style={{ position:'absolute', bottom:'10%', left:'50%', transform:'translateX(-50%)',
            width:'70%', height:'40%',
            background:'radial-gradient(ellipse at center, rgba(27,97,159,0.12) 0%, transparent 65%)',
            filter:'blur(60px)' }} />
        </div>

        {/* Text — upper portion */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-10 pb-6">
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="mb-7">
            <span className="inline-flex items-center gap-2 bg-white/10 text-blue-300 text-sm font-semibold px-4 py-1.5 rounded-full border border-white/[0.15]">
              Network Quality Platform
            </span>
          </motion.div>

          <h1 className="font-extrabold tracking-tight leading-[1.04] text-[2.5rem] sm:text-6xl lg:text-7xl text-white">
            {[
              { text:'Network quality', delay:0.10 },
              { text:'monitoring,',     delay:0.22 },
              { text:'reimagined.',     delay:0.34, accent:true },
            ].map(({ text, delay, accent }) => (
              <motion.div key={text} initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.65, delay, ease:'easeOut' }}
                className={`block ${accent ? 'text-blue-400' : ''}`}>
                {text}
              </motion.div>
            ))}
          </h1>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.5 }}
            className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real-time, comprehensive network insights at 10% of traditional costs —
            using the devices already in your customers' hands.
          </motion.p>

          <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.65 }}
            className="mt-9 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary text-sm px-8 py-3.5">Request Demo</Link>
            <Link to="/features" className="btn-primary text-sm px-8 py-3.5">
              Explore Platform <ArrowRight size={16}/>
            </Link>
          </motion.div>
        </div>

        {/* Globe — fills remaining viewport */}
        <div className="relative flex-1" style={{ minHeight: '58vh' }}>
          <Suspense fallback={null}><GlobeHero /></Suspense>
        </div>

        {/* Bottom fade — dark → light */}
        <div className="absolute bottom-0 inset-x-0 h-44 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, #f8fafc 100%)' }} />
      </section>


      {/* ── STATS BAR ───────────────────────────── */}
      <section className="bg-[#f8fafc] border-b border-slate-100 py-14 relative overflow-hidden">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
          style={{ width: 320, opacity: 0.06, transform: 'translateY(-50%) translateX(20%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { target:10000,  suffix:'+', label:'Devices Deployed' },
              { target:100000, suffix:'+', label:'Tests Per Day'    },
              { value:'< 5s',              label:'Result Latency'   },
              { value:'99.9%',             label:'Uptime SLA'       },
            ].map(({ target, suffix, label, value }) => (
              <FadeIn key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  {value ?? <AnimatedCounter target={target} suffix={suffix}/>}
                </div>
                <div className="text-sm text-slate-500 mt-1.5 font-medium">{label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
            <span className="section-tag mb-5"><img src="/vess-icon.svg" className="h-3.5 w-auto" aria-hidden="true" />The Challenge</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mt-5">
              The old way of monitoring networks is broken
            </h2>
            <p className="text-slate-500 mt-4 text-lg leading-relaxed">
              Traditional drive testing and lab equipment are expensive, slow, and don't reflect real user experience.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { label:'01', title:'Prohibitive Cost',  desc:'Traditional network testing equipment costs $500k–$2M+ per deployment. Only the largest operators can afford meaningful coverage.' },
              { label:'02', title:'Synthetic Results', desc:"Lab-based tests don't capture what real users on real networks actually experience in the field." },
              { label:'03', title:'Limited Coverage',  desc:'Expensive equipment means sparse deployment. Rural areas and secondary cities are left unmonitored.' },
            ].map(({ label, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="border border-slate-100 rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition-shadow h-full">
                  <span className="text-[11px] font-black text-[#c88d5e] tracking-[0.2em] uppercase">{label}</span>
                  <h3 className="font-bold text-slate-900 text-lg mt-3 mb-3">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────── */}
      <HowItWorksSection />

      {/* ── METRICS SHOWCASE ────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="section-tag mb-5"><img src="/vess-icon.svg" className="h-3.5 w-auto" aria-hidden="true" />KPI Coverage</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-5">
              Every signal. Measured. Analyzed. Delivered.
            </h2>
          </FadeIn>
          <FadeIn className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1">
              {['voice','sms','data'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${tab===t?'bg-white text-[#1b619f] shadow-sm border-b-2 border-[#1b619f]':'text-slate-500 hover:text-slate-700'}`}>
                  {t === 'voice' ? 'Voice' : t === 'sms' ? 'SMS' : 'Data'}
                </button>
              ))}
            </div>
          </FadeIn>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
              transition={{ duration:0.35 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {metricTabs[tab].map((m, i) => (
                <FadeIn key={m.name} delay={i * 0.06}><MetricCard {...m}/></FadeIn>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── FEATURE: DEVICE FLEET ───────────────── */}
      <section className="bg-[#f8fafc] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="text-[11px] font-bold text-[#c88d5e] tracking-[0.18em] uppercase">Device Fleet</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mt-4">
                Deploy once. Test forever.
              </h2>
              <p className="text-slate-500 mt-5 text-base leading-relaxed">
                Android devices with active SIMs become permanent, silent testing agents. The Vess App
                runs in the background — autonomously placing calls, sending messages, and measuring
                data quality around the clock with zero human intervention.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  'Android 8.0+ support, zero user interaction required',
                  'Configurable test schedules per device or fleet-wide',
                  'Automatic retry and offline queue with sync on reconnect',
                  'Battery, connectivity, and health status monitoring',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="text-[#1b619f] flex-shrink-0 mt-0.5"/>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6">
                <div className="text-xs font-bold text-slate-700 mb-4">Device Fleet — Live View</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id:'CTR-Central-01', zone:'Central Hub',  bat:87, net:'4G', ok:true,  test:'Voice' },
                    { id:'WST-Station-02', zone:'West Station', bat:92, net:'4G', ok:true,  test:'SMS'   },
                    { id:'DWN-Core-03',    zone:'Downtown',     bat:45, net:'5G', ok:true,  test:'Data'  },
                    { id:'NTH-Campus-04',  zone:'North Campus', bat:10, net:'4G', ok:false, test:'Voice' },
                    { id:'EST-Tower-05',   zone:'East Tower',   bat:78, net:'4G', ok:true,  test:'SMS'   },
                    { id:'STH-Core-06',    zone:'South Core',   bat:63, net:'5G', ok:true,  test:'Data'  },
                  ].map(({ id, zone, bat, net, ok, test }) => (
                    <div key={id} className="border border-slate-100 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-2 h-2 rounded-full ${ok ? bat<20 ? 'bg-amber-400' : 'bg-emerald-400' : 'bg-slate-300'}`}/>
                        <span className="text-[9px] font-bold text-[#1b619f] bg-[#eff6ff] px-1.5 py-0.5 rounded-full">{net}</span>
                      </div>
                      <div className="text-[9.5px] font-bold text-slate-800 truncate">{id}</div>
                      <div className="text-[8px] text-slate-400 mb-1.5">{zone}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:`${bat}%`, backgroundColor:bat<20?'#f59e0b':'#22c55e' }}/>
                        </div>
                        <span className="text-[8px] text-slate-400">{bat}%</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${test==='Voice'?'bg-[#1b619f]':test==='SMS'?'bg-emerald-400':'bg-[#c88d5e]'}`}/>
                        <span className="text-[8px] text-slate-400">{test} testing</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FEATURE: REAL-TIME ANALYTICS ─────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Analytics visual */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6">
                <div className="text-xs font-bold text-slate-700 mb-4">Live KPI Dashboard</div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label:'CCR',     value:'98.4%', up:true  },
                    { label:'SMS DR',  value:'99.1%', up:true  },
                    { label:'Latency', value:'44ms',  up:false },
                  ].map(({ label, value, up }) => (
                    <div key={label} className="bg-[#f8fafc] rounded-xl p-3 border border-slate-100">
                      <div className="text-[9px] text-slate-400 font-medium">{label}</div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">{value}</div>
                      <div className={`text-[9px] font-semibold mt-0.5 ${up ? 'text-emerald-500' : 'text-[#c88d5e]'}`}>
                        {up ? '↑ improving' : '↓ improving'}
                      </div>
                    </div>
                  ))}
                </div>
                {(() => {
                  const sms  = [94,96,95,98,97,99,98]
                  const call = [90,92,91,94,93,96,95]
                  const MIN=88, RANGE=13, W=400, H=90
                  const xStep = W/(sms.length-1)
                  const py = (v) => H - ((v-MIN)/RANGE)*H
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[10px] font-semibold text-slate-600">Success Rate — 7 Days</div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-[#1b619f] rounded"/><span className="text-[8px] text-slate-400">Call</span></div>
                          <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-emerald-500 rounded"/><span className="text-[8px] text-slate-400">SMS</span></div>
                        </div>
                      </div>
                      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:80 }} preserveAspectRatio="none">
                        {[0.25,0.5,0.75].map(t=><line key={t} x1={0} y1={t*H} x2={W} y2={t*H} stroke="#f1f5f9" strokeWidth="1"/>)}
                        <polyline points={sms.map((v,i)=>`${i*xStep},${py(v)}`).join(' ')} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points={call.map((v,i)=>`${i*xStep},${py(v)}`).join(' ')} fill="none" stroke="#1b619f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )
                })()}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <span className="text-[11px] font-bold text-[#c88d5e] tracking-[0.18em] uppercase">Analytics & Alerting</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mt-4">
                From device to dashboard in 5 seconds.
              </h2>
              <p className="text-slate-500 mt-5 text-base leading-relaxed">
                Test results stream from field devices to the VeSS backend in near-real-time.
                A live dashboard surfaces trends, coverage breakdowns, and threshold alerts
                the moment a KPI drifts outside your defined SLA.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  'Real-time KPI dashboard updating every 5 seconds',
                  'Geographic heatmap by coverage region',
                  'Threshold-based alerts via Slack, PagerDuty, or any webhook',
                  'Automated PDF/CSV reports on any schedule',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="text-[#1b619f] flex-shrink-0 mt-0.5"/>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/features" className="inline-flex items-center gap-2 text-[#1b619f] font-semibold text-sm mt-7 hover:underline">
                See all analytics features <ArrowRight size={15}/>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE ──────────────────────────── */}
      <section className="dark-section py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full border border-white/20 mb-5">
              Enterprise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Security and compliance, built in from day one.
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto text-base leading-relaxed">
              TLS 1.3, AES-256 at rest, RBAC with three roles, MFA, and 7-year audit logs.
              VeSS meets the compliance bar set by the most security-conscious operators.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon:Lock,          title:'TLS 1.3 Encryption',    desc:'All data in transit encrypted with TLS 1.3. Zero plaintext communication.' },
              { icon:Shield,        title:'AES-256 at Rest',        desc:'Test results and device data encrypted at rest. Decryption keys are tenant-scoped.' },
              { icon:FileCheck,     title:'Data Privacy Compliant', desc:'Designed for full compliance with GDPR and regional data protection regulations. No subscriber data collected.' },
              { icon:Users,         title:'Role-Based Access',      desc:'Admin, Operator, and Viewer roles with granular per-group permissions.' },
              { icon:KeyRound,      title:'Multi-Factor Auth',      desc:'MFA enforced via TOTP authenticator apps for all enterprise accounts.' },
              { icon:ClipboardList, title:'7-Year Audit Logs',      desc:'Full audit trail of all user actions, API calls, and configuration changes.' },
            ].map(({ icon:Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/[0.07] transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#c88d5e]"/>
                  </div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="bg-white py-28 relative overflow-hidden">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
          style={{ width: 360, opacity: 0.05, transform: 'translateY(-50%) translateX(18%)' }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{ position:'absolute', top:'-30%', left:'10%', width:'80%', height:'160%',
            background:'radial-gradient(ellipse at center, rgba(27,97,159,0.07) 0%, transparent 65%)',
            filter:'blur(60px)' }} />
        </div>
        <FadeIn>
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Start monitoring with confidence.
            </h2>
            <p className="text-slate-500 mt-5 text-lg leading-relaxed max-w-xl mx-auto">
              Book a live demo and see real test results streaming from real devices into the VeSS dashboard.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary px-9 py-3.5">Request Demo</Link>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
