import { useRef, useEffect, useMemo, useState } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

/* ── Global telecom hub arcs ── */
const HUBS = {
  lagos:      { lat: 6.52,   lng: 3.38   }, nairobi:    { lat: -1.28,  lng: 36.82  },
  accra:      { lat: 5.56,   lng: -0.20  }, dakar:      { lat: 14.69,  lng: -17.44 },
  tunis:      { lat: 33.88,  lng: 9.54   }, addis:      { lat: 9.02,   lng: 38.74  },
  maputo:     { lat: -25.96, lng: 32.59  }, joburg:     { lat: -26.20, lng: 28.04  },
  cairo:      { lat: 30.04,  lng: 31.24  }, casablanca: { lat: 33.57,  lng: -7.59  },
  london:     { lat: 51.50,  lng: -0.12  }, paris:      { lat: 48.85,  lng: 2.35   },
  frankfurt:  { lat: 50.11,  lng: 8.68   }, madrid:     { lat: 40.42,  lng: -3.70  },
  amsterdam:  { lat: 52.37,  lng: 4.90   }, warsaw:     { lat: 52.23,  lng: 21.01  },
  nyc:        { lat: 40.71,  lng: -74.01 }, chicago:    { lat: 41.88,  lng: -87.63 },
  la:         { lat: 34.05,  lng: -118.24}, toronto:    { lat: 43.65,  lng: -79.38 },
  miami:      { lat: 25.77,  lng: -80.19 }, saopaulo:   { lat: -23.55, lng: -46.63 },
  bogota:     { lat: 4.71,   lng: -74.07 }, lima:       { lat: -12.05, lng: -77.04 },
  buenosaires:{ lat: -34.60, lng: -58.38 }, dubai:      { lat: 25.20,  lng: 55.27  },
  mumbai:     { lat: 19.08,  lng: 72.88  }, singapore:  { lat: 1.35,   lng: 103.82 },
  tokyo:      { lat: 35.68,  lng: 139.69 }, beijing:    { lat: 39.91,  lng: 116.39 },
  seoul:      { lat: 37.57,  lng: 126.98 }, bangkok:    { lat: 13.75,  lng: 100.52 },
  karachi:    { lat: 24.86,  lng: 67.01  }, sydney:     { lat: -33.87, lng: 151.21 },
  melbourne:  { lat: -37.81, lng: 144.96 }, auckland:   { lat: -36.85, lng: 174.76 },
}
const arc = (a, b) => ({ startLat: HUBS[a].lat, startLng: HUBS[a].lng, endLat: HUBS[b].lat, endLng: HUBS[b].lng })
const ARCS = [
  arc('lagos','nairobi'), arc('lagos','accra'), arc('lagos','dakar'), arc('lagos','joburg'),
  arc('lagos','tunis'), arc('nairobi','maputo'), arc('nairobi','addis'), arc('nairobi','joburg'),
  arc('cairo','tunis'), arc('cairo','addis'), arc('dakar','casablanca'), arc('casablanca','tunis'),
  arc('london','paris'), arc('london','amsterdam'), arc('paris','frankfurt'),
  arc('frankfurt','warsaw'), arc('madrid','paris'), arc('amsterdam','frankfurt'),
  arc('nyc','chicago'), arc('nyc','miami'), arc('nyc','toronto'), arc('chicago','la'), arc('la','miami'),
  arc('saopaulo','bogota'), arc('saopaulo','buenosaires'), arc('bogota','lima'), arc('lima','buenosaires'),
  arc('dubai','mumbai'), arc('dubai','singapore'), arc('mumbai','karachi'), arc('mumbai','singapore'),
  arc('singapore','bangkok'), arc('singapore','tokyo'), arc('tokyo','beijing'), arc('beijing','seoul'),
  arc('beijing','singapore'), arc('sydney','melbourne'), arc('sydney','auckland'),
  arc('lagos','london'), arc('lagos','paris'), arc('cairo','frankfurt'), arc('nairobi','london'),
  arc('casablanca','madrid'), arc('tunis','frankfurt'), arc('nairobi','dubai'), arc('lagos','dubai'),
  arc('cairo','dubai'), arc('london','nyc'), arc('paris','nyc'), arc('madrid','saopaulo'),
  arc('london','toronto'), arc('amsterdam','nyc'), arc('nyc','saopaulo'), arc('miami','bogota'),
  arc('la','bogota'), arc('london','dubai'), arc('frankfurt','dubai'), arc('frankfurt','mumbai'),
  arc('warsaw','beijing'), arc('london','singapore'), arc('singapore','sydney'), arc('tokyo','sydney'),
  arc('beijing','sydney'), arc('la','tokyo'), arc('la','singapore'), arc('nyc','tokyo'),
  arc('saopaulo','tokyo'), arc('lagos','saopaulo'), arc('dakar','miami'),
]

export default function GlobeHero() {
  const globeRef    = useRef()
  const containerRef = useRef()
  const [size, setSize]       = useState({ w: 0, h: 0 })
  const [countries, setCountries] = useState({ features: [] })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    fetch('/countries.geojson')
      .then(r => r.json())
      .then(data => setCountries(data))
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
    ctrl.autoRotate = !shouldReduceMotion
    ctrl.autoRotateSpeed = 0.55
    ctrl.enableZoom = false
    ctrl.enablePan = false
    ctrl.enableRotate = false
    globeRef.current.pointOfView({ lat: 18, lng: 12, altitude: 1.45 }, 0)
  }, [size, shouldReduceMotion])

  const globeMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color:             new THREE.Color('#060d1f'),
    emissive:          new THREE.Color('#0b1a35'),
    emissiveIntensity: 0.35,
    shininess:         6,
    transparent:       true,
    opacity:           0.94,
  }), [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      {size.w > 0 && (
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={globeMaterial}
          showAtmosphere
          atmosphereColor="#1b619f"
          atmosphereAltitude={0.22}
          showGraticules
          polygonsData={countries.features}
          polygonCapColor={() => 'rgba(27, 80, 160, 0.10)'}
          polygonSideColor={() => 'transparent'}
          polygonStrokeColor={() => 'rgba(100, 160, 220, 0.22)'}
          polygonAltitude={0.003}
          arcsData={ARCS}
          arcColor={() => ['rgba(200,141,94,0.85)', 'rgba(27,97,159,0.85)']}
          arcDashLength={0.35}
          arcDashGap={0.15}
          arcDashAnimateTime={1800}
          arcStroke={0.5}
          arcAltitude={0.02}
        />
      )}
    </div>
  )
}
