import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react'

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

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 49,
    annualPrice: 39,
    desc: 'For small teams getting started with automated telecom testing.',
    cta: 'Start Free Trial',
    ctaHref: '/contact',
    highlight: false,
    features: [
      'Up to 5 monitored services',
      '500 test runs / month',
      'Basic KPI dashboard',
      'Email alerts',
      '30-day test history',
      'Community support',
    ],
  },
  {
    name: 'Professional',
    monthlyPrice: 149,
    annualPrice: 119,
    desc: 'For growing teams who need deeper analytics and enterprise integrations.',
    cta: 'Start Free Trial',
    ctaHref: '/contact',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited services',
      'Unlimited test runs',
      'Advanced analytics & trends',
      'All integrations (Slack, Prometheus, Grafana…)',
      '1-year test history',
      'Custom alert thresholds',
      'Priority email & chat support',
      'REST API access',
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    desc: 'For organisations with strict compliance, scale, and SLA requirements.',
    cta: 'Contact Sales',
    ctaHref: '/contact',
    highlight: false,
    features: [
      'Everything in Professional',
      'SSO / SAML authentication',
      'Role-based access control',
      'Audit logs',
      'Custom SLA reporting',
      'Dedicated Slack channel',
      'Onboarding & training',
      'On-premise deployment option',
    ],
  },
]

const faqs = [
  {
    q: 'What counts as a "test run"?',
    a: 'A test run is a single execution of a configured test against one service endpoint. Batch suites that execute 10 tests count as 10 runs.',
  },
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes. Upgrades take effect immediately. Downgrades apply at the start of your next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Starter and Professional plans include a 14-day free trial. No credit card required.',
  },
  {
    q: 'What integrations are included on Starter?',
    a: 'Starter includes email alerts only. Integrations with Slack, Prometheus, Grafana, and others are available on Professional and above.',
  },
  {
    q: 'Do you offer discounts for non-profits or startups?',
    a: 'Yes — contact us and we will work out a suitable arrangement.',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-white via-[#f8fbff] to-[#f0f6ff] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag mb-5"><img src="/vess-icon.svg" className="h-3.5 w-auto" aria-hidden="true" />Pricing</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 leading-tight"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-slate-600"
          >
            Start free. Scale as you grow. No hidden fees.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-2 shadow-sm"
          >
            <span className={`text-sm font-medium ${!annual ? 'text-[#1b619f]' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-11 h-6 rounded-full transition-colors ${annual ? 'bg-[#1b619f]' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-[#1b619f]' : 'text-slate-500'}`}>
              Annual <span className="text-[#c88d5e] font-semibold">–20%</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map(({ name, monthlyPrice, annualPrice, desc, cta, ctaHref, highlight, badge, features }, i) => {
              const price = annual ? annualPrice : monthlyPrice
              return (
                <FadeIn key={name} delay={i * 0.1}>
                  <div className={`relative rounded-2xl p-8 h-full flex flex-col ${
                    highlight
                      ? 'bg-[#1b619f] text-white shadow-2xl scale-[1.02]'
                      : 'bg-white border border-slate-200 shadow-sm'
                  }`}>
                    {badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="bg-[#c88d5e] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
                          {badge}
                        </span>
                      </div>
                    )}

                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
                      <p className={`text-sm mb-6 ${highlight ? 'text-blue-200' : 'text-slate-500'}`}>{desc}</p>

                      <div className="mb-8">
                        {price !== null ? (
                          <>
                            <span className={`text-5xl font-extrabold ${highlight ? 'text-white' : 'text-slate-900'}`}>
                              ${price}
                            </span>
                            <span className={`text-sm ml-1 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>/mo</span>
                            {annual && (
                              <div className={`text-xs mt-1 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                                Billed annually
                              </div>
                            )}
                          </>
                        ) : (
                          <span className={`text-4xl font-extrabold ${highlight ? 'text-white' : 'text-slate-900'}`}>
                            Custom
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {features.map(f => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${highlight ? 'text-[#c88d5e]' : 'text-[#1b619f]'}`} />
                          <span className={highlight ? 'text-blue-100' : 'text-slate-600'}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={ctaHref}
                      className={highlight ? 'btn-highlight w-full py-3 text-sm' : 'btn-primary w-full py-3 text-sm'}
                    >
                      {cta} <ArrowRight size={15} />
                    </Link>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">Frequently asked questions</h2>
          </FadeIn>
          <div className="space-y-6">
            {faqs.map(({ q, a }, i) => (
              <FadeIn key={q} delay={i * 0.08}>
                <div className="card p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle size={18} className="text-[#1b619f] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">{q}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-12">
            <p className="text-slate-500 text-sm">
              Still have questions?{' '}
              <Link to="/contact" className="text-[#1b619f] font-medium hover:underline">
                Contact our team →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
