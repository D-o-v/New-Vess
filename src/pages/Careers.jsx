import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Briefcase, Globe, ChevronDown, Mail } from 'lucide-react'

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

function DarkTag({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full border mb-6"
      style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.12)' }}>
      <img src="/vess-icon.svg" aria-hidden="true" style={{ height: 12, width: 'auto', opacity: 0.45 }} />
      {children}
    </span>
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

const ROLES = [
  {
    id: 'latam',
    title: 'Senior Marketing Manager',
    region: 'Latin America (LATAM)',
    flag: '🌎',
    type: 'Full-time',
    travel: 'Up to 50% regional travel',
    languages: 'Spanish (required) · Portuguese (strong advantage)',
    summary: 'Lead VeSS market presence across Latin America, building pipeline with MNOs and telecoms from Mexico to the Southern Cone.',
    about: `As VeSS expands into Latin America, we're looking for a driven, telecom-savvy marketing professional to own our regional go-to-market strategy. You'll be the face of VeSS across LATAM — building relationships with mobile network operators, representing us at industry events, and translating our global product story into campaigns that resonate with the regional market.

This is a high-impact, highly autonomous role at an early-stage company. You'll work directly with the founding team and have real influence over how VeSS grows across one of the world's most dynamic telecom markets.`,
    responsibilities: [
      "Develop and execute VeSS's go-to-market strategy across LATAM, covering key markets including Brazil, Mexico, Colombia, Argentina, Chile, and Peru",
      'Build and nurture relationships with MNOs, regulatory bodies, and telecom industry associations across the region',
      "Plan and manage VeSS's presence at regional telecom events and industry conferences (e.g. TelevisaUnivision, GSMA LatAm, AfricaCom equivalents)",
      'Create bilingual (Spanish/Portuguese) marketing collateral, case studies, and campaign assets tailored to regional audiences',
      'Generate and qualify pipeline through targeted ABM campaigns, events, and partner co-marketing',
      'Collaborate with the global team on product positioning and messaging, adapting it for the LATAM context',
      'Track and report on regional marketing KPIs including pipeline contribution, brand awareness, and event ROI',
      'Identify and cultivate strategic partnerships with system integrators, telecom consultants, and regional distributors',
    ],
    requirements: [
      '5+ years of B2B marketing experience, with at least 3 years in the telecommunications or MNO sector',
      'Native or fluent Spanish speaker — this is non-negotiable',
      'Portuguese proficiency is a strong advantage, particularly for the Brazilian market',
      'Proven track record of demand generation and pipeline creation in enterprise or mid-market B2B environments',
      'Deep understanding of the LATAM telecom landscape, including key operators, regulators, and market dynamics',
      'Experience with multi-country marketing campaigns across diverse cultural contexts',
      'Comfortable working autonomously in a fast-moving, early-stage environment',
      'Available and willing to travel extensively across the region (up to 50% of working time)',
      'Based in Latin America or willing to relocate',
    ],
    niceToHave: [
      'Experience marketing SaaS, monitoring platforms, or network testing solutions',
      'Existing relationships with LATAM MNOs or telecom procurement teams',
      'Experience presenting at or organising industry conferences and events',
      'Familiarity with OSS/BSS ecosystems and telecom network operations',
    ],
  },
  {
    id: 'africa',
    title: 'Senior Marketing Manager',
    region: 'Africa',
    flag: '🌍',
    type: 'Full-time',
    travel: 'Up to 50% regional travel',
    languages: 'English (required) · French (required)',
    summary: "Own VeSS's growth strategy across Africa, engaging MNOs and telecoms across both Anglophone and Francophone markets.",
    about: `Africa is one of the world's fastest-growing mobile markets and a central part of VeSS's global expansion. We're looking for a bilingual marketing professional with deep roots in the African telecom industry to lead our go-to-market across the continent.

You'll be the primary VeSS presence across African markets — from West Africa to East Africa, from North Africa to the Southern Cone — engaging MNOs, building regional partnerships, and positioning VeSS as the trusted standard for network quality monitoring on the continent.`,
    responsibilities: [
      "Develop and execute VeSS's go-to-market strategy across Africa, with initial focus on key markets including Nigeria, South Africa, Kenya, Egypt, Ghana, Côte d'Ivoire, Senegal, and Morocco",
      'Build relationships with MNOs, telecom regulators (NCC, ICASA, CA, etc.), and industry bodies across both Anglophone and Francophone Africa',
      "Plan and manage VeSS's presence at major African telecom events, including AfricaCom, Capacity Africa, and regional GSMA events",
      'Create marketing assets in both English and French, ensuring culturally relevant messaging for each sub-region',
      'Generate and qualify enterprise pipeline through targeted outreach, account-based marketing, and event-led demand generation',
      'Represent VeSS in media, trade publications, and thought leadership forums relevant to the African telecom industry',
      'Track and report on pipeline contribution, brand awareness, event ROI, and regional marketing performance',
      'Identify and develop partnerships with regional system integrators, telecom consultants, and local distribution partners',
    ],
    requirements: [
      '5+ years of B2B marketing experience, with at least 3 years in the telecommunications or MNO sector',
      'Fluent in both English and French — both are required for this role given our multi-regional African focus',
      'Strong understanding of the African telecom landscape, including key operators, regulatory frameworks, and market dynamics across multiple countries',
      'Proven experience building pipeline and brand presence in enterprise B2B environments',
      'Experience executing multi-country, bilingual marketing campaigns across diverse cultural contexts',
      'Comfortable working autonomously at an early-stage company with high levels of ownership and accountability',
      'Available and willing to travel extensively across the continent (up to 50% of working time)',
      'Based in Africa or willing to relocate to the region',
    ],
    niceToHave: [
      'Experience marketing SaaS, monitoring, or network testing solutions to telecoms',
      'Existing relationships with African MNOs, regulatory bodies, or telecom procurement teams',
      'Knowledge of additional African languages (e.g. Swahili, Arabic, Portuguese for Lusophone Africa)',
      'Experience presenting at or organising AfricaCom or similar regional conferences',
      'Familiarity with OSS/BSS systems and telecom network operations',
    ],
  },
]

function JobListing({ role, index }) {
  const [open, setOpen] = useState(false)

  return (
    <FadeIn delay={index * 0.1}>
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open ? 'border-[#1b619f] shadow-lg shadow-blue-100' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}>

        {/* Header — always visible */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full text-left px-5 sm:px-8 py-5 sm:py-7 flex items-start justify-between gap-4 sm:gap-6 group"
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#1b619f] bg-[#f0f6ff] border border-[#c8dff5] px-2.5 py-0.5 rounded-full">
                {role.region}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full">
                {role.type}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{role.title}</h3>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-2xl">{role.summary}</p>

            <div className="flex flex-wrap gap-5 mt-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Globe size={13} className="text-slate-400" />{role.languages}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={13} className="text-slate-400" />{role.region}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Briefcase size={13} className="text-slate-400" />{role.travel}
              </span>
            </div>
          </div>

          <div className={`flex-shrink-0 mt-1 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${open ? 'border-[#1b619f] bg-[#1b619f] text-white rotate-180' : 'border-slate-300 text-slate-400 group-hover:border-[#1b619f] group-hover:text-[#1b619f]'}`}>
            <ChevronDown size={16} />
          </div>
        </button>

        {/* Expanded body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-8 pb-6 sm:pb-8 border-t border-slate-100">
                <div className="pt-7 space-y-8">

                  {/* About the role */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">About the Role</h4>
                    {role.about.split('\n\n').map((para, i) => (
                      <p key={i} className="text-slate-600 leading-relaxed text-sm mb-3">{para}</p>
                    ))}
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">What You'll Do</h4>
                    <ul className="space-y-2.5">
                      {role.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1b619f] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">What We're Looking For</h4>
                    <ul className="space-y-2.5">
                      {role.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1b619f] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nice to have */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Nice to Have</h4>
                    <ul className="space-y-2.5">
                      {role.niceToHave.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c88d5e] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply CTA */}
                  <div className="bg-[#f8fafc] rounded-xl p-6 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Ready to apply?</p>
                      <p className="text-sm text-slate-500 mt-0.5">Send your CV and a short note about why you're a great fit.</p>
                    </div>
                    <a
                      href={`mailto:hr@vess-solutions.com?subject=Application: ${role.title} – ${role.region}`}
                      className="btn-primary text-sm py-2.5 px-6 flex-shrink-0 inline-flex items-center gap-2"
                    >
                      <Mail size={14} />
                      Send Your Resume
                    </a>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  )
}

export default function Careers() {
  return (
    <div>

      {/* ── HERO ── */}
      <section className="dark-section relative overflow-hidden py-32">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
          style={{ width: 440, opacity: 0.05, transform: 'translateY(-50%) translateX(22%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <DarkTag>We're Hiring</DarkTag>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.06] tracking-tight"
          >
            Help us bring network<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span style={{ color: '#c88d5e' }}>visibility to the world.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mt-6 text-lg leading-relaxed max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            VeSS is a small, focused team building something meaningful for the global telecom industry. We move fast, operate with high autonomy, and care deeply about the problem we're solving.
          </motion.p>
        </div>
      </section>

      {/* ── WHY VESS ── */}
      <section className="bg-[#f8fafc] py-20 relative overflow-hidden">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
          style={{ width: 300, opacity: 0.05, transform: 'translateY(-50%) translateX(22%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="max-w-2xl mb-12">
            <LightTag>Why Join VeSS</LightTag>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Real ownership. Real impact.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Work on a hard problem',
                body: 'Network quality visibility is a genuine, unsolved challenge for MNOs worldwide. Your work will directly affect how reliably millions of people connect.',
              },
              {
                title: 'High autonomy from day one',
                body: "We're a team of ten. There's no bureaucracy to navigate. You'll own your region, make real decisions, and see the results of your work quickly.",
              },
              {
                title: 'Global from the start',
                body: "VeSS is built for MNOs worldwide. From your first week you'll be working across multiple countries and cultures — this is not a regional backwater role.",
              },
            ].map(({ title, body }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm h-full">
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#1b619f] mb-3 block">{title}</span>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <LightTag>Open Positions</LightTag>
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {ROLES.length} roles open now.
            </h2>
            <p className="text-slate-500 mt-3 text-lg">Click a role to read the full job description.</p>
          </FadeIn>

          <div className="space-y-5">
            {ROLES.map((role, i) => (
              <JobListing key={role.id} role={role} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GENERAL CTA ── */}
      <section className="dark-section py-24 relative overflow-hidden">
        <img src="/vess-icon.svg" aria-hidden="true" className="absolute pointer-events-none select-none top-1/2 right-0"
          style={{ width: 360, opacity: 0.09, transform: 'translateY(-50%) translateX(15%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="max-w-2xl">
            <DarkTag>Don't See Your Role?</DarkTag>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
              We're always open to<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <span style={{ color: '#c88d5e' }}>exceptional people.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
              If you believe in what we're building and have skills that could help VeSS grow, send us a note. We read every message.
            </p>
            <div className="mt-8">
              <a
                href="mailto:hr@vess-solutions.com?subject=General Application – VeSS"
                className="btn-primary px-8 py-3.5 inline-flex items-center gap-2"
              >
                <Mail size={15} />
                hr@vess-solutions.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
