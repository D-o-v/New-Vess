import { Link } from 'react-router-dom'
import { Mail, Linkedin, Twitter } from 'lucide-react'

const companyLinks = [
  { label: 'Home',           href: '/'         },
  { label: 'Features',       href: '/features' },
  { label: 'About',          href: '/about'    },
  { label: 'Careers',        href: '/careers'  },
  { label: 'Contact',        href: '/contact'  },
  { label: 'Privacy Policy', href: '#'         },
]

export default function Footer() {
  return (
    <footer className="dark-section text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src="/vess-logo-white.svg" alt="VeSS" className="h-8 w-auto" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Automated telecom service testing that gives your team real-time confidence in every service you depend on.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="mailto:info@vess-solutions.com" className="text-slate-400 hover:text-white transition-colors">
                <Mail size={18} />
              </a>
              <a href="https://www.linkedin.com/company/vess-solutions/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://x.com/VeSS_Solutions" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <ul className="grid grid-cols-3 gap-x-4 gap-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Vess. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Built for telecom teams who demand reliability.
          </p>
        </div>
      </div>
    </footer>
  )
}
