import { useRef, useEffect, useMemo, useState } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

/* ── Large countries: 20 dots | Small countries: 10 dots
   All coordinates are named city centres, verified on land (~75% active)
──────────────────────────────────────────────────────────────────────── */
const mk = (lat, lng, active) => ({ lat, lng, active, phase: Math.random() })

const POINTS = [

  // ── USA (20) — coast-to-coast spread ──
  mk(40.71,-74.01,true),  mk(34.05,-118.24,true), mk(41.88,-87.63,true),  mk(29.76,-95.37,false),
  mk(33.45,-112.07,true), mk(39.95,-75.17,true),  mk(29.42,-98.49,true),  mk(32.78,-96.80,false),
  mk(37.77,-122.42,true), mk(30.27,-97.74,true),  mk(39.96,-82.99,true),  mk(39.79,-86.15,false),
  mk(39.74,-104.98,true), mk(36.17,-86.78,true),  mk(47.61,-122.33,true), mk(33.75,-84.39,false),
  mk(38.25,-85.76,true),  mk(45.52,-122.68,true), mk(44.98,-93.27,true),  mk(35.23,-80.84,false),

  // ── Canada (20) — east to west ──
  mk(43.65,-79.38,true),  mk(45.50,-73.57,true),  mk(49.28,-123.12,true), mk(51.05,-114.07,false),
  mk(53.55,-113.49,true), mk(45.42,-75.70,true),  mk(49.90,-97.14,true),  mk(46.81,-71.21,false),
  mk(43.25,-79.87,true),  mk(43.45,-80.49,true),  mk(44.65,-63.57,true),  mk(52.13,-106.67,false),
  mk(50.45,-104.62,true), mk(47.56,-52.71,true),  mk(42.98,-81.25,false), mk(49.88,-119.50,true),
  mk(42.32,-83.04,true),  mk(48.38,-89.25,true),  mk(49.69,-112.84,true), mk(58.30,-134.42,false),

  // ── Mexico (20) — north to south ──
  mk(19.43,-99.13,true),  mk(20.67,-103.35,true), mk(25.67,-100.31,true), mk(19.04,-98.20,false),
  mk(32.51,-117.04,true), mk(21.12,-101.68,true), mk(31.73,-106.49,true), mk(25.54,-103.45,false),
  mk(20.97,-89.62,true),  mk(28.63,-106.07,true), mk(17.07,-96.72,true),  mk(24.80,-107.39,false),
  mk(19.70,-101.19,true), mk(19.54,-96.93,true),  mk(22.15,-100.98,true), mk(29.07,-110.96,false),
  mk(21.88,-102.30,true), mk(23.74,-99.14,true),  mk(25.42,-101.00,true), mk(20.59,-100.39,false),

  // ── Brazil (20) — spread across vast territory ──
  mk(-23.55,-46.63,true), mk(-22.91,-43.17,true), mk(-15.78,-47.93,true), mk(-12.97,-38.50,false),
  mk(-3.72,-38.54,true),  mk(-19.92,-43.94,true), mk(-3.10,-60.02,true),  mk(-25.43,-49.27,false),
  mk(-8.05,-34.88,true),  mk(-30.03,-51.23,true), mk(-1.46,-48.50,true),  mk(-16.69,-49.25,false),
  mk(-27.59,-48.55,true), mk(-9.66,-35.74,true),  mk(-5.09,-42.80,true),  mk(-20.46,-54.62,false),
  mk(-7.12,-34.86,true),  mk(-2.55,-44.31,true),  mk(-10.91,-37.05,true), mk(-5.79,-35.21,false),

  // ── Russia (20) — sprawled across 11 time zones ──
  mk(55.75,37.62,true),   mk(59.95,30.32,true),   mk(55.03,82.92,true),   mk(56.85,60.61,false),
  mk(55.80,49.11,true),   mk(56.33,44.00,true),   mk(55.15,61.40,true),   mk(53.20,50.15,false),
  mk(54.99,73.37,true),   mk(47.23,39.72,true),   mk(54.73,55.94,true),   mk(56.01,92.86,false),
  mk(58.00,56.31,true),   mk(51.67,39.21,true),   mk(48.71,44.51,true),   mk(45.04,38.98,false),
  mk(51.53,46.03,true),   mk(57.15,65.53,true),   mk(52.27,104.30,true),  mk(43.12,131.90,false),

  // ── China (20) — east to west ──
  mk(39.91,116.39,true),  mk(31.23,121.47,true),  mk(23.13,113.26,true),  mk(30.57,104.07,false),
  mk(29.56,106.55,true),  mk(30.59,114.31,true),  mk(34.26,108.95,true),  mk(30.25,120.16,false),
  mk(32.06,118.80,true),  mk(39.34,117.36,true),  mk(41.79,123.43,true),  mk(45.75,126.64,false),
  mk(25.04,102.73,true),  mk(34.75,113.65,true),  mk(28.23,112.94,true),  mk(36.07,120.37,false),
  mk(38.91,121.62,true),  mk(24.48,118.09,true),  mk(26.65,106.63,true),  mk(22.82,108.32,false),

  // ── India (20) — north to south, inland ──
  mk(19.08,72.88,true),   mk(28.61,77.21,true),   mk(12.97,77.59,true),   mk(22.57,88.36,false),
  mk(17.39,78.49,true),   mk(13.08,80.27,true),   mk(18.52,73.86,true),   mk(23.02,72.57,false),
  mk(26.91,75.79,true),   mk(26.85,80.95,true),   mk(21.15,79.09,true),   mk(25.59,85.13,false),
  mk(22.72,75.86,true),   mk(23.26,77.41,true),   mk(11.00,76.96,true),   mk(9.93,76.26,false),
  mk(26.18,91.74,true),   mk(17.69,83.22,true),   mk(21.17,72.83,true),   mk(26.46,80.33,false),

  // ── Australia (20) — spread across continent ──
  mk(-33.87,151.21,true), mk(-37.81,144.96,true), mk(-27.47,153.02,true), mk(-31.95,115.86,false),
  mk(-34.93,138.60,true), mk(-35.31,149.12,true), mk(-32.93,151.78,true), mk(-34.43,150.89,false),
  mk(-42.88,147.32,true), mk(-38.14,144.35,true), mk(-19.25,146.82,true), mk(-16.92,145.78,false),
  mk(-12.46,130.84,true), mk(-23.70,133.88,true), mk(-27.56,151.95,true), mk(-41.43,147.14,false),
  mk(-21.15,149.17,true), mk(-23.38,150.51,true), mk(-37.56,143.86,true), mk(-28.65,114.61,false),

  // ── Nigeria (10) — spread north to south ──
  mk(6.45,3.40,true),    mk(9.07,7.40,true),    mk(12.00,8.52,true),   mk(4.82,7.05,false),
  mk(7.38,3.90,true),    mk(10.52,7.44,true),   mk(6.34,5.63,true),    mk(9.93,8.90,false),
  mk(8.50,4.55,true),    mk(11.85,13.16,true),

  // ── South Africa (10) ──
  mk(-26.20,28.04,true), mk(-33.92,18.42,true), mk(-29.86,31.02,true), mk(-25.75,28.19,false),
  mk(-33.96,25.60,true), mk(-29.12,26.21,true), mk(-33.02,27.91,true), mk(-29.62,30.39,false),
  mk(-23.90,29.45,true), mk(-28.74,24.77,true),

  // ── Egypt (10) — Nile Valley & Delta ──
  mk(30.04,31.24,true),  mk(31.21,29.95,true),  mk(25.68,32.64,true),  mk(24.09,32.91,false),
  mk(31.04,31.38,true),  mk(30.79,30.99,true),  mk(27.18,31.18,true),  mk(28.10,30.75,false),
  mk(26.56,31.70,true),  mk(29.07,31.10,true),

  // ── Rwanda (10) — landlocked, all inland ──
  mk(-1.94,30.06,true),  mk(-2.60,29.74,true),  mk(-1.58,30.07,true),  mk(-1.70,29.26,false),
  mk(-2.07,29.74,true),  mk(-2.48,28.91,true),  mk(-2.15,30.10,true),  mk(-2.35,29.75,false),
  mk(-1.32,30.42,true),  mk(-2.06,29.35,true),

  // ── United Kingdom (10) ──
  mk(51.51,-0.13,true),  mk(52.49,-1.90,true),  mk(53.48,-2.24,true),  mk(55.86,-4.25,false),
  mk(53.41,-2.98,true),  mk(55.95,-3.19,true),  mk(53.80,-1.55,true),  mk(53.38,-1.47,false),
  mk(51.45,-2.59,true),  mk(51.48,-3.18,true),

  // ── France (10) ──
  mk(48.85,2.35,true),   mk(45.75,4.85,true),   mk(43.30,5.37,true),   mk(43.60,1.44,false),
  mk(47.22,-1.55,true),  mk(48.58,7.75,true),   mk(43.61,3.88,true),   mk(44.84,-0.58,false),
  mk(48.08,-1.68,true),  mk(49.25,4.03,true),

  // ── Singapore (10) — spread across main island ──
  mk(1.29,103.85,true),  mk(1.33,103.73,true),  mk(1.35,103.94,true),  mk(1.44,103.80,false),
  mk(1.37,103.85,true),  mk(1.31,103.77,true),  mk(1.43,103.84,true),  mk(1.32,103.93,false),
  mk(1.40,103.91,true),  mk(1.28,103.82,true),

  // ── Qatar (10) — spread across peninsula ──
  mk(25.29,51.53,true),  mk(25.38,51.48,true),  mk(25.17,51.56,true),  mk(25.68,51.50,false),
  mk(25.43,50.90,true),  mk(25.55,51.43,true),  mk(25.20,51.52,true),  mk(25.40,51.39,false),
  mk(25.05,51.45,true),  mk(26.05,51.28,true),

  // ── Thailand (10) — north to south ──
  mk(13.75,100.52,true), mk(18.79,98.98,true),  mk(16.43,102.83,true), mk(14.99,102.10,false),
  mk(17.41,102.79,true), mk(7.01,100.47,true),  mk(9.13,99.33,true),   mk(12.96,100.87,false),
  mk(19.91,99.84,true),  mk(7.89,98.40,true),

  // ── New Zealand (10) — both islands ──
  mk(-36.87,174.77,true), mk(-41.29,174.78,true), mk(-43.53,172.64,true), mk(-37.78,175.28,false),
  mk(-37.69,176.17,true), mk(-39.49,176.92,true), mk(-45.87,170.50,true), mk(-40.36,175.61,false),
  mk(-39.07,174.08,true), mk(-38.14,176.25,true),
]

const RINGS = POINTS.filter(d => d.active)

export default function FeaturesGlobe() {
  const globeRef     = useRef()
  const containerRef = useRef()
  const [size, setSize]           = useState({ w: 0, h: 0 })
  const [countries, setCountries] = useState({ features: [] })
  const [now, setNow]             = useState(Date.now())
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    fetch('/countries.geojson')
      .then(r => r.json())
      .then(setCountries)
      .catch(() => {})
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!globeRef.current || size.w === 0) return
    const ctrl = globeRef.current.controls()
    ctrl.autoRotate      = !shouldReduceMotion
    ctrl.autoRotateSpeed = -0.6
    ctrl.enableZoom      = false
    ctrl.enablePan       = false
    ctrl.enableRotate    = false
    globeRef.current.pointOfView({ lat: 10, lng: 18, altitude: 1.25 }, 0)
  }, [size, shouldReduceMotion])

  // Per-dot independent blink via shared timestamp
  useEffect(() => {
    if (shouldReduceMotion) return
    const id = setInterval(() => setNow(Date.now()), 350)
    return () => clearInterval(id)
  }, [shouldReduceMotion])

  const globeMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color:             new THREE.Color('#06102a'),
    emissive:          new THREE.Color('#0b1d3f'),
    emissiveIntensity: 0.45,
    shininess:         8,
    transparent:       true,
    opacity:           0.96,
  }), [])

  return (
    <div ref={containerRef} className="w-full h-full">
      {size.w > 0 && (
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={globeMaterial}
          showAtmosphere
          atmosphereColor="#1b619f"
          atmosphereAltitude={0.26}
          showGraticules
          polygonsData={countries.features}
          polygonCapColor={() => 'rgba(27, 90, 170, 0.13)'}
          polygonSideColor={() => 'transparent'}
          polygonStrokeColor={() => 'rgba(120, 170, 230, 0.28)'}
          polygonAltitude={0.004}
          pointsData={POINTS}
          pointColor={d => {
            const isOn = ((now / 7000) + d.phase) % 1 < 0.5
            const on   = d.active ? '#5ba3d9' : '#c88d5e'
            const dim  = d.active ? 'rgba(91,163,217,0.15)' : 'rgba(200,141,94,0.15)'
            return isOn ? on : dim
          }}
          pointAltitude={0.002}
          pointRadius={0.22}
          pointResolution={16}
          ringsData={RINGS}
          ringColor={() => t => `rgba(91,163,217,${Math.max(0, 0.55 - t * 0.55)})`}
          ringMaxRadius={1.4}
          ringPropagationSpeed={1.8}
          ringRepeatPeriod={1400}
        />
      )}
    </div>
  )
}
