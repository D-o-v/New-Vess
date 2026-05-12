import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect, Component, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Lazy-load every page so only the current route's JS is fetched
const Home     = lazy(() => import('./pages/Home'))
const Features = lazy(() => import('./pages/Features'))
const Contact  = lazy(() => import('./pages/Contact'))
const About    = lazy(() => import('./pages/About'))
const Careers  = lazy(() => import('./pages/Careers'))

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '2.5px solid #e2e8f0',
        borderTopColor: '#1b619f',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(e) { return { error: e } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', background: '#fff', minHeight: '100vh' }}>
          <h2 style={{ color: 'red' }}>App crashed — error details:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#333', marginTop: 16 }}>
            {this.state.error?.message}{'\n\n'}{this.state.error?.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: '#1b619f', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.25rem', color: '#64748b', marginTop: 8 }}>Page not found</p>
      <Link to="/" style={{ marginTop: 24, padding: '10px 28px', background: '#1b619f', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
        Go Home
      </Link>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <ErrorBoundary>
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
    </ErrorBoundary>
  )
}
