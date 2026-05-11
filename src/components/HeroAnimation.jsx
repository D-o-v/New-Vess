export default function HeroAnimation() {
  return (
    <div className="w-full max-w-[680px] mx-auto select-none animate-float">
      <svg
        viewBox="0 0 680 420"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
        aria-hidden="true"
      >
        <defs>
          <marker id="arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#1b619f" opacity="0.6" />
          </marker>
          <marker id="arrow-sm" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill="#1b619f" opacity="0.5" />
          </marker>

          <filter id="vessglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="phoneglow" x="-20%" y="-10%" width="140%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1b619f" floodOpacity="0.35" />
          </filter>

          <filter id="serverglow" x="-10%" y="-10%" width="120%" height="125%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#1b619f" floodOpacity="0.12" />
          </filter>

          <filter id="outshadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#64748b" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* ── Background decoration ─────────────────── */}
        <circle cx="340" cy="100" r="145" fill="#1b619f" opacity="0.03" />

        {/* ── CONNECTING LINES ─────────────────────── */}
        {/* App → Vess */}
        <path d="M 105,95 L 265,100" stroke="#1b619f" strokeWidth="2"
          strokeDasharray="6 4" fill="none" markerEnd="url(#arrow-blue)" opacity="0.5"
          className="animate-dash" />

        {/* Vess → Backend */}
        <path d="M 415,100 L 545,95" stroke="#1b619f" strokeWidth="2"
          strokeDasharray="6 4" fill="none" markerEnd="url(#arrow-blue)" opacity="0.5"
          className="animate-dash" />

        {/* Backend → down */}
        <path d="M 598,170 L 598,250" stroke="#1b619f" strokeWidth="1.5"
          strokeDasharray="5 4" fill="none" opacity="0.35" />

        {/* Horizontal bus */}
        <path d="M 250,250 L 598,250" stroke="#1b619f" strokeWidth="1.5"
          strokeDasharray="5 4" fill="none" opacity="0.35" />

        {/* Drops */}
        <path d="M 250,250 L 250,268" stroke="#1b619f" strokeWidth="1.5"
          strokeDasharray="5 4" fill="none" markerEnd="url(#arrow-sm)" opacity="0.35" />
        <path d="M 382,250 L 382,268" stroke="#4A154B" strokeWidth="1.5"
          strokeDasharray="5 4" fill="none" markerEnd="url(#arrow-sm)" opacity="0.35" />
        <path d="M 515,250 L 515,268" stroke="#E6522C" strokeWidth="1.5"
          strokeDasharray="5 4" fill="none" markerEnd="url(#arrow-sm)" opacity="0.35" />

        {/* ── ANIMATED DATA PACKETS ─────────────────── */}
        <circle r="5" fill="#c88d5e" opacity="0.9">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 105,95 L 265,100" />
        </circle>
        <circle r="5" fill="#c88d5e" opacity="0.9">
          <animateMotion dur="1.5s" begin="0.7s" repeatCount="indefinite" path="M 415,100 L 545,95" />
        </circle>
        <circle r="4" fill="#1b619f" opacity="0.8">
          <animateMotion dur="2.8s" begin="1.2s" repeatCount="indefinite"
            path="M 598,170 L 598,250 L 250,250 L 250,268" />
        </circle>
        <circle r="4" fill="#4A154B" opacity="0.8">
          <animateMotion dur="2.8s" begin="2.1s" repeatCount="indefinite"
            path="M 598,170 L 598,250 L 382,250 L 382,268" />
        </circle>
        <circle r="4" fill="#E6522C" opacity="0.8">
          <animateMotion dur="2.8s" begin="3s" repeatCount="indefinite"
            path="M 598,170 L 598,250 L 515,250 L 515,268" />
        </circle>

        {/* ══════════════════════════════════════════════
            VESS APP — PHONE NODE
            x=15 y=20 w=90 h=150
        ══════════════════════════════════════════════ */}
        <g filter="url(#phoneglow)">
          {/* Phone chassis */}
          <rect x="15" y="20" width="90" height="150" rx="18" fill="#1b619f" />

          {/* Side buttons */}
          <rect x="11" y="54"  width="4" height="16" rx="2" fill="#14497a" />
          <rect x="11" y="76"  width="4" height="16" rx="2" fill="#14497a" />
          <rect x="105" y="64" width="4" height="22" rx="2" fill="#14497a" />

          {/* Screen bezel */}
          <rect x="21" y="38" width="78" height="116" rx="10" fill="#0b3260" />

          {/* Notch */}
          <rect x="43" y="28" width="34" height="14" rx="7" fill="#1b619f" />
          {/* Camera */}
          <circle cx="52" cy="35" r="2.5" fill="#082344" />

          {/* Home bar */}
          <rect x="45" y="164" width="30" height="3" rx="1.5" fill="white" opacity="0.3" />

          {/* ── Status bar ── */}
          <text x="26" y="50" fontSize="6.5" fill="white" opacity="0.6" fontFamily="Inter,sans-serif">9:41</text>
          {/* Signal bars */}
          <rect x="82"   y="45" width="3" height="5" rx="0.5" fill="white" opacity="0.5" />
          <rect x="86.5" y="43" width="3" height="7" rx="0.5" fill="white" opacity="0.5" />
          <rect x="91"   y="41" width="3" height="9" rx="0.5" fill="white" opacity="0.5" />
          {/* Battery */}
          <rect x="95.5" y="43" width="9" height="6" rx="1" stroke="white" strokeWidth="0.8" fill="none" opacity="0.5" />
          <rect x="96.5" y="44" width="6" height="4" rx="0.5" fill="white" opacity="0.5" />
          <rect x="104.5" y="45" width="1.5" height="2" rx="0.5" fill="white" opacity="0.4" />

          {/* ── Vess icon on screen (white) ── */}
          <g transform="translate(46, 57) scale(0.075)">
            <path fill="white" fillRule="evenodd"
              d="m284.45,301.01c-77.1,44.52-175.85,18.06-220.36-59.04C19.58,164.87,46.03,66.12,123.14,21.61c77.1-44.5,175.85-18.05,220.35,59.05.71,1.21,6.87,11.84,7.14,14.32l-59.82,34.29.03.09-144.05,83.41s-6.41-52.3,28.59-78.59c19.35-14.54,56.19-35.63,78.53-48.03-28.19-20.13-66.27-25.18-97.08-7.4-42.92,24.78-61.44,86.04-36.66,128.97,24.78,42.9,88.39,63.43,131.3,38.65,13.94-8.04,39.58-27.25,50.95-56.42,15.67-40.18,30.72-52.56,66.72-67.1,10.79,64.48-24.76,143.58-84.68,178.17" />
            <path fill="white" fillRule="evenodd"
              d="m33.84,216.04c3.51,11.83,8.44,23.44,14.88,34.58,2.81,4.86,5.83,9.52,9.06,13.97L.44,297.8s-6.27-52.08,28.73-78.35c1.47-1.1,3.02-2.24,4.67-3.4" />
          </g>

          {/* ── App label ── */}
          <text x="60" y="87" textAnchor="middle" fontSize="8.5" fontWeight="700"
            fill="white" fontFamily="Inter,sans-serif">Vess App</text>

          {/* ── Active testing pulse ── */}
          <circle cx="60" cy="96" r="3.5" fill="#22c55e">
            <animate attributeName="opacity" values="1;0.5;1" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="96" r="7" fill="#22c55e" opacity="0.2">
            <animate attributeName="r" values="5;10;5" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0;0.25" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* ── Test bars ── */}
          {/* Voice */}
          <text x="26" y="110" fontSize="6" fill="#93c5fd" fontFamily="Inter,sans-serif">Voice Call</text>
          <rect x="26" y="112" width="68" height="3" rx="1.5" fill="white" opacity="0.1" />
          <rect x="26" y="112" width="68" height="3" rx="1.5" fill="#22c55e" />

          {/* SMS */}
          <text x="26" y="122" fontSize="6" fill="#93c5fd" fontFamily="Inter,sans-serif">SMS</text>
          <rect x="26" y="124" width="68" height="3" rx="1.5" fill="white" opacity="0.1" />
          <rect x="26" y="124" width="58" height="3" rx="1.5" fill="#22c55e" />

          {/* Data – animated (running) */}
          <text x="26" y="134" fontSize="6" fill="#93c5fd" fontFamily="Inter,sans-serif">Data</text>
          <rect x="26" y="136" width="68" height="3" rx="1.5" fill="white" opacity="0.1" />
          <rect x="26" y="136" width="42" height="3" rx="1.5" fill="#c88d5e">
            <animate attributeName="width" values="18;52;18" dur="2.4s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* ══════════════════════════════════════════════
            VESS ENGINE — CENTER NODE
            x=265 y=30 w=150 h=140
        ══════════════════════════════════════════════ */}
        <g filter="url(#vessglow)">
          <rect x="265" y="30" width="150" height="140" rx="16" fill="#1b619f" />
        </g>
        {/* Vess icon (white) */}
        <g transform="translate(290, 45) scale(0.108)">
          <path fill="white" fillRule="evenodd"
            d="m284.45,301.01c-77.1,44.52-175.85,18.06-220.36-59.04C19.58,164.87,46.03,66.12,123.14,21.61c77.1-44.5,175.85-18.05,220.35,59.05.71,1.21,6.87,11.84,7.14,14.32l-59.82,34.29.03.09-144.05,83.41s-6.41-52.3,28.59-78.59c19.35-14.54,56.19-35.63,78.53-48.03-28.19-20.13-66.27-25.18-97.08-7.4-42.92,24.78-61.44,86.04-36.66,128.97,24.78,42.9,88.39,63.43,131.3,38.65,13.94-8.04,39.58-27.25,50.95-56.42,15.67-40.18,30.72-52.56,66.72-67.1,10.79,64.48-24.76,143.58-84.68,178.17" />
          <path fill="white" fillRule="evenodd"
            d="m33.84,216.04c3.51,11.83,8.44,23.44,14.88,34.58,2.81,4.86,5.83,9.52,9.06,13.97L.44,297.8s-6.27-52.08,28.73-78.35c1.47-1.1,3.02-2.24,4.67-3.4" />
        </g>
        <text x="340" y="126" textAnchor="middle" fontSize="12" fontWeight="700"
          fill="white" fontFamily="Inter,sans-serif">Vess Engine</text>
        <text x="340" y="141" textAnchor="middle" fontSize="8.5"
          fill="#93c5fd" fontFamily="Inter,sans-serif">Testing Orchestrator</text>

        {/* Pulsing ring */}
        <circle cx="340" cy="100" r="78" fill="none" stroke="#1b619f" strokeWidth="1.5" opacity="0.15">
          <animate attributeName="r" values="74;90;74" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.18;0.04;0.18" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* ══════════════════════════════════════════════
            BACKEND — SERVER RACK NODE
            x=545 y=20 w=110 h=150
        ══════════════════════════════════════════════ */}
        <g filter="url(#serverglow)">
          <rect x="545" y="20" width="110" height="150" rx="14" fill="white" stroke="#c8dff5" strokeWidth="1.5" />
        </g>

        {/* Rack chassis */}
        <rect x="551" y="27" width="98" height="116" rx="9" fill="#f0f6ff" stroke="#dbeafe" strokeWidth="1" />

        {/* Server unit 1 */}
        <rect x="555" y="33" width="90" height="27" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="564" cy="46.5" r="4" fill="#22c55e" />
        <circle cx="564" cy="46.5" r="7" fill="#22c55e" opacity="0.2">
          <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <text x="574" y="50" fontSize="7.5" fontWeight="600" fill="#475569" fontFamily="Inter,sans-serif">API Server</text>
        {/* Activity dots */}
        {[614, 621, 628, 635].map((cx, i) => (
          <circle key={i} cx={cx} cy="46.5" r="2" fill="#1b619f" opacity="0.25" />
        ))}

        {/* Server unit 2 */}
        <rect x="555" y="66" width="90" height="27" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="564" cy="79.5" r="4" fill="#22c55e" />
        <circle cx="564" cy="79.5" r="7" fill="#22c55e" opacity="0.15">
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2.8s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <text x="574" y="83" fontSize="7.5" fontWeight="600" fill="#475569" fontFamily="Inter,sans-serif">Database</text>
        {[614, 621, 628, 635].map((cx, i) => (
          <circle key={i} cx={cx} cy="79.5" r="2" fill="#1b619f" opacity="0.25" />
        ))}

        {/* Server unit 3 */}
        <rect x="555" y="99" width="90" height="27" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="564" cy="112.5" r="4" fill="#22c55e" />
        <circle cx="564" cy="112.5" r="7" fill="#22c55e" opacity="0.15">
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3.2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <text x="574" y="116" fontSize="7.5" fontWeight="600" fill="#475569" fontFamily="Inter,sans-serif">Results Store</text>
        {[614, 621, 628, 635].map((cx, i) => (
          <circle key={i} cx={cx} cy="112.5" r="2" fill="#1b619f" opacity="0.25" />
        ))}

        {/* Port strip */}
        <rect x="555" y="132" width="90" height="6" rx="3" fill="#1b619f" opacity="0.08" />
        {[561, 568, 575, 582, 589, 596, 603, 610, 617, 624, 631, 638].map((cx, i) => (
          <circle key={i} cx={cx} cy="135" r="1.5" fill="#1b619f" opacity="0.3" />
        ))}

        {/* Backend label */}
        <text x="600" y="157" textAnchor="middle" fontSize="10" fontWeight="700"
          fill="#1b619f" fontFamily="Inter,sans-serif">Vess Backend</text>

        {/* ══════════════════════════════════════════════
            OUTPUT NODES
        ══════════════════════════════════════════════ */}

        {/* Dashboard */}
        <g filter="url(#outshadow)">
          <rect x="185" y="268" width="130" height="72" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        </g>
        <g transform="translate(218, 276)">
          <rect x="0"  y="16" width="10" height="12" rx="2" fill="#1b619f" opacity="0.35" />
          <rect x="14" y="9"  width="10" height="19" rx="2" fill="#1b619f" opacity="0.6" />
          <rect x="28" y="2"  width="10" height="26" rx="2" fill="#1b619f" />
        </g>
        <text x="250" y="326" textAnchor="middle" fontSize="10" fontWeight="600"
          fill="#334155" fontFamily="Inter,sans-serif">Dashboard</text>

        {/* Slack */}
        <g filter="url(#outshadow)">
          <rect x="330" y="268" width="104" height="72" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        </g>
        <g transform="translate(358, 278)">
          <line x1="10" y1="2"  x2="7"  y2="24" stroke="#4A154B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="2"  x2="17" y2="24" stroke="#4A154B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="2"  y1="9"  x2="24" y2="9"  stroke="#4A154B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="1"  y1="17" x2="23" y2="17" stroke="#4A154B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <text x="382" y="326" textAnchor="middle" fontSize="10" fontWeight="600"
          fill="#334155" fontFamily="Inter,sans-serif">Slack</text>

        {/* Prometheus */}
        <g filter="url(#outshadow)">
          <rect x="450" y="268" width="130" height="72" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        </g>
        <g transform="translate(488, 276)">
          <circle cx="27" cy="16" r="14" stroke="#E6522C" strokeWidth="1.8" fill="none" />
          <path d="M14,16 Q18,9 22,16 Q26,23 30,16 Q34,9 38,16"
            stroke="#E6522C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
        <text x="515" y="326" textAnchor="middle" fontSize="10" fontWeight="600"
          fill="#334155" fontFamily="Inter,sans-serif">Prometheus</text>

      </svg>
    </div>
  )
}
