import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Phone shell ──────────────────────────────────────── */
function Phone({ w = 176, h = 354, children }) {
  const r = Math.round(w * 0.19)
  return (
    <div className="relative flex-shrink-0" style={{ width: w, height: h, filter: 'drop-shadow(0 28px 56px rgba(0,0,0,0.65))' }}>
      <div className="absolute inset-0" style={{
        borderRadius: r,
        background: 'linear-gradient(160deg,#2d3d52 0%,#182538 55%,#0c1b2e 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 0 0 1px rgba(255,255,255,0.07)',
      }} />
      {/* Vol- */}
      <div className="absolute bg-slate-600" style={{ left:-2.5,top:h*.21,width:3,height:h*.07,borderRadius:2 }} />
      {/* Vol+ */}
      <div className="absolute bg-slate-600" style={{ left:-2.5,top:h*.31,width:3,height:h*.12,borderRadius:2 }} />
      {/* Power */}
      <div className="absolute bg-slate-600" style={{ right:-2.5,top:h*.26,width:3,height:h*.16,borderRadius:2 }} />
      {/* Screen */}
      <div className="absolute overflow-hidden" style={{ inset:3.5, borderRadius:r-3.5, background:'#06101e' }}>
        {/* Dynamic island */}
        <div className="absolute bg-black z-20" style={{ top:9,left:'50%',transform:'translateX(-50%)',width:w*.42,height:22,borderRadius:12 }} />
        {/* Status bar */}
        <div className="absolute z-10 flex items-center justify-between" style={{ top:0,left:0,right:0,height:40,padding:'4px 14px 0' }}>
          <span className="text-white font-semibold" style={{ fontSize:Math.max(8,w*.052) }}>9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex items-end" style={{ gap:1.5 }}>
              {[0.36,0.55,0.82,1].map((o,i)=>(
                <div key={i} style={{ width:2.5,height:[5,7,9.5,12][i]*.65,borderRadius:1.5,background:`rgba(255,255,255,${o})` }} />
              ))}
            </div>
            <div className="flex items-center ml-1">
              <div style={{ width:18,height:9,borderRadius:2,border:'1.5px solid rgba(255,255,255,0.5)',padding:1.5 }}>
                <div style={{ width:'72%',height:'100%',borderRadius:1,background:'#4ade80' }} />
              </div>
              <div style={{ width:1.5,height:5,borderRadius:'0 1px 1px 0',background:'rgba(255,255,255,0.45)',marginLeft:0.5 }} />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="absolute" style={{ top:40,left:0,right:0,bottom:0 }}>{children}</div>
      </div>
    </div>
  )
}

/* ── Step 1: Fleet of deployed devices ───────────────────── */
function Step1Visual() {
  const [sec,setSec]=useState(23)
  const [min,setMin]=useState(4)
  useEffect(()=>{
    const t=setInterval(()=>setSec(s=>{if(s===0){setMin(m=>Math.max(0,m-1));return 59}return s-1}),1000)
    return ()=>clearInterval(t)
  },[])

  return (
    <motion.div className="flex items-center justify-center gap-3 sm:gap-5 w-full h-full"
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}}>

      {/* Left ghost phone — hidden on very small screens */}
      <motion.div initial={{opacity:0,x:-24}} animate={{opacity:0.32,x:0}} transition={{delay:0.3,duration:0.5}}
        className="hidden sm:block flex-shrink-0">
        <Phone w={118} h={236}>
          <div className="h-full flex flex-col bg-[#06101e] px-2.5 py-2 text-white overflow-hidden">
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="w-5 h-5 rounded-md bg-[#1b619f] flex items-center justify-center flex-shrink-0">
                <span className="font-black text-white" style={{fontSize:7}}>V</span>
              </div>
              <span className="font-bold" style={{fontSize:9}}>VeSS Agent</span>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{boxShadow:'0 0 5px #4ade80'}} />
              <span className="text-emerald-400 font-bold tracking-wide" style={{fontSize:7.5}}>ACTIVE</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[['Tests','31'],['Pass','96%'],['Uptime','99.9%'],['SIM','OK']].map(([l,v])=>(
                <div key={l} className="bg-white/[0.05] rounded-lg p-1.5">
                  <div className="text-slate-500" style={{fontSize:6.5}}>{l}</div>
                  <div className="text-white font-bold" style={{fontSize:10}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </Phone>
      </motion.div>

      {/* Main phone */}
      <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}}>
        <Phone w={174} h={350}>
          <div className="h-full flex flex-col bg-[#06101e] text-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/[0.07] flex-shrink-0">
              <div className="w-7 h-7 rounded-[9px] bg-[#1b619f] flex items-center justify-center flex-shrink-0" style={{boxShadow:'0 2px 8px rgba(27,97,159,0.5)'}}>
                <span className="font-black text-white" style={{fontSize:10}}>V</span>
              </div>
              <div className="flex-1">
                <div className="font-bold" style={{fontSize:11}}>VeSS Agent</div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-semibold tracking-wide" style={{fontSize:8}}>ACTIVE</span>
                  <span className="text-slate-500 ml-1" style={{fontSize:8}}>Meridian</span>
                </div>
              </div>
            </div>
            {/* Next test */}
            <div className="px-3.5 py-3 border-b border-white/[0.07] flex-shrink-0">
              <div className="text-slate-500 uppercase tracking-wider mb-1" style={{fontSize:7,fontWeight:600}}>Next Scheduled Test</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold" style={{fontSize:11}}>Voice Call Test</div>
                  <div className="text-slate-500 mt-0.5" style={{fontSize:8}}>Caller → Receiver pair</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-mono font-black" style={{fontSize:22}}>{min}:{String(sec).padStart(2,'0')}</div>
                  <div className="text-slate-500" style={{fontSize:7}}>remaining</div>
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="px-3.5 py-2.5 flex-shrink-0">
              <div className="grid grid-cols-3 gap-1.5">
                {[{v:'47',l:'Tests'},{v:'94.2%',l:'Pass Rate'},{v:'99.8%',l:'Uptime'}].map(({v,l})=>(
                  <div key={l} className="bg-white/[0.04] rounded-xl p-2 text-center border border-white/[0.05]">
                    <div className="font-bold" style={{fontSize:12}}>{v}</div>
                    <div className="text-slate-500" style={{fontSize:7}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Service bars */}
            <div className="px-3.5 flex-1 min-h-0">
              <div className="text-slate-500 uppercase tracking-wider mb-2" style={{fontSize:7,fontWeight:600}}>Service Coverage</div>
              {[
                {label:'Voice',done:12,total:15,color:'#3b82f6'},
                {label:'SMS',  done:18,total:20,color:'#8b5cf6'},
                {label:'Data', done:17,total:18,color:'#06b6d4'},
              ].map(({label,done,total,color})=>(
                <div key={label} className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:color}} />
                  <span className="text-slate-400 flex-shrink-0 w-7" style={{fontSize:9}}>{label}</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{background:color}}
                      initial={{width:0}} animate={{width:`${(done/total)*100}%`}}
                      transition={{duration:1,delay:0.5}} />
                  </div>
                  <span style={{fontSize:9,color,fontWeight:600}}>✓{done}</span>
                </div>
              ))}
            </div>
            {/* Log */}
            <div className="mx-3.5 mb-3.5 rounded-xl overflow-hidden flex-shrink-0" style={{background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.05)'}}>
              <div className="px-2.5 py-2">
                <div className="text-slate-500 uppercase tracking-wider mb-1.5" style={{fontSize:7,fontWeight:600}}>Activity Log</div>
                {[
                  {c:'#4ade80',t:'✓ voice_test_47   PASS  2.1s  MOS:4.3'},
                  {c:'#4ade80',t:'✓ sms_test_46     PASS  0.8s  DR:100%'},
                  {c:'#475569',t:'○ voice_test_48   PENDING  in 4:23'},
                ].map(({c,t},i)=>(
                  <div key={i} className="font-mono" style={{fontSize:7.5,color:c,lineHeight:1.75}}>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </Phone>
      </motion.div>

      {/* Right ghost phone — hidden on very small screens */}
      <motion.div initial={{opacity:0,x:24}} animate={{opacity:0.22,x:0}} transition={{delay:0.4,duration:0.5}}
        className="hidden sm:block flex-shrink-0">
        <Phone w={104} h={208}>
          <div className="h-full flex flex-col bg-[#06101e] px-2 py-2 text-white overflow-hidden">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-4 h-4 rounded bg-[#1b619f] flex items-center justify-center flex-shrink-0">
                <span className="font-black text-white" style={{fontSize:6}}>V</span>
              </div>
              <span className="font-bold" style={{fontSize:8}}>VeSS Agent</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-400" style={{fontSize:7}}>ACTIVE</span>
            </div>
            <div className="text-slate-400" style={{fontSize:7}}>Tests: 28</div>
            <div className="text-slate-400 mt-0.5" style={{fontSize:7}}>Pass: 96.4%</div>
          </div>
        </Phone>
      </motion.div>
    </motion.div>
  )
}

/* ── Step 2: Call test between two devices ──────────────── */
function Step2Visual() {
  const [elapsed,setElapsed]=useState(7)
  useEffect(()=>{
    const t=setInterval(()=>setElapsed(s=>s+1),1000)
    return ()=>clearInterval(t)
  },[])
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`

  return (
    <motion.div className="flex items-center justify-center w-full h-full gap-2 sm:gap-3 px-3 sm:px-5"
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}}>

      {/* Caller */}
      <motion.div initial={{opacity:0,x:-28}} animate={{opacity:1,x:0}} transition={{delay:0.1,duration:0.4}}>
        <Phone w={146} h={292}>
          <div className="h-full flex flex-col bg-[#06101e] text-white overflow-hidden">
            <div className="px-3 py-2 border-b border-white/[0.07] flex-shrink-0">
              <div className="font-bold" style={{fontSize:9.5}}>VeSS Agent</div>
              <div className="text-slate-500" style={{fontSize:7.5}}>Device A · Meridian</div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-3">
              <motion.div className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                style={{background:'rgba(74,222,128,0.12)'}}
                animate={{boxShadow:['0 0 0 0px rgba(74,222,128,0.35)','0 0 0 14px rgba(74,222,128,0)']}}
                transition={{repeat:Infinity,duration:1.6}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/>
                </svg>
              </motion.div>
              <div className="text-emerald-400 font-bold tracking-widest" style={{fontSize:8.5,letterSpacing:'0.14em'}}>CALL ACTIVE</div>
              <div className="font-mono font-black mt-1.5" style={{fontSize:22}}>{fmt(elapsed)}</div>
              <div className="text-slate-500 mt-1.5" style={{fontSize:8}}>→ Device B</div>
            </div>
            <div className="px-3 pb-3 flex-shrink-0">
              <div className="rounded-xl p-2 text-center" style={{background:'rgba(74,222,128,0.07)',border:'1px solid rgba(74,222,128,0.18)'}}>
                <div style={{fontSize:7.5,color:'#4ade80',fontWeight:600}}>MOS 4.2 · CST 1.8s · RSRP −78dBm</div>
              </div>
            </div>
          </div>
        </Phone>
      </motion.div>

      {/* Signal viz */}
      <div className="flex flex-col items-center justify-center flex-1" style={{minWidth:90,maxWidth:130}}>
        <svg width="110" height="72" viewBox="0 0 110 72" style={{overflow:'visible'}}>
          <path d="M6 36 Q55 6 104 36"  fill="none" stroke="rgba(74,222,128,0.18)"  strokeWidth="1.5" strokeDasharray="5 4"/>
          <path d="M6 36 Q55 66 104 36" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1.5" strokeDasharray="5 4"/>
          {[0,0.48,0.96].map((d,i)=>(
            <circle key={`o${i}`} r="3" fill="#4ade80">
              <animateMotion dur="1.4s" repeatCount="indefinite" begin={`${d}s`} path="M6 36 Q55 6 104 36"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite" begin={`${d}s`}/>
            </circle>
          ))}
          {[0.25,0.75].map((d,i)=>(
            <circle key={`r${i}`} r="2.5" fill="#3b82f6">
              <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${d}s`} path="M104 36 Q55 66 6 36"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="1.6s" repeatCount="indefinite" begin={`${d}s`}/>
            </circle>
          ))}
        </svg>
        <div className="text-center mt-2 space-y-1">
          <div className="font-bold tracking-widest" style={{fontSize:7.5,color:'#4ade80',letterSpacing:'0.16em'}}>VOICE TEST</div>
          <div className="text-slate-500" style={{fontSize:7}}>RTP · G.711 codec</div>
          <div className="px-3 py-1 rounded-full" style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.22)'}}>
            <span style={{fontSize:7.5,color:'#86efac',fontWeight:600}}>Signal: Good</span>
          </div>
        </div>
      </div>

      {/* Receiver */}
      <motion.div initial={{opacity:0,x:28}} animate={{opacity:1,x:0}} transition={{delay:0.2,duration:0.4}}>
        <Phone w={146} h={292}>
          <div className="h-full flex flex-col bg-[#06101e] text-white overflow-hidden">
            <div className="px-3 py-2 border-b border-white/[0.07] flex-shrink-0">
              <div className="font-bold" style={{fontSize:9.5}}>VeSS Agent</div>
              <div className="text-slate-500" style={{fontSize:7.5}}>Device B · Meridian</div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-3">
              <motion.div className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                style={{background:'rgba(59,130,246,0.12)'}}
                animate={{boxShadow:['0 0 0 0px rgba(59,130,246,0.35)','0 0 0 14px rgba(59,130,246,0)']}}
                transition={{repeat:Infinity,duration:1.6,delay:0.4}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/>
                </svg>
              </motion.div>
              <div className="text-blue-400 font-bold tracking-widest" style={{fontSize:8.5,letterSpacing:'0.14em'}}>RECEIVING</div>
              <div className="font-mono font-black mt-1.5" style={{fontSize:22}}>{fmt(elapsed)}</div>
              <div className="text-slate-500 mt-1.5" style={{fontSize:8}}>← Device A</div>
            </div>
            <div className="px-3 pb-3 flex-shrink-0">
              <div className="rounded-xl p-2 text-center" style={{background:'rgba(59,130,246,0.07)',border:'1px solid rgba(59,130,246,0.18)'}}>
                <div style={{fontSize:7.5,color:'#3b82f6',fontWeight:600}}>RSSI −72dBm · CDR 0.0% · Jitter 2ms</div>
              </div>
            </div>
          </div>
        </Phone>
      </motion.div>
    </motion.div>
  )
}

/* ── Step 3: Live dashboard ──────────────────────────────── */
function Step3Visual() {
  const [asr,setAsr]=useState(0)
  const [ccr,setCcr]=useState(0)
  useEffect(()=>{
    let raf,start
    const run=ts=>{
      if(!start)start=ts
      const p=Math.min((ts-start)/1600,1)
      const e=1-Math.pow(1-p,3)
      setAsr(parseFloat((96.4*e).toFixed(1)))
      setCcr(parseFloat((94.1*e).toFixed(1)))
      if(p<1)raf=requestAnimationFrame(run)
    }
    raf=requestAnimationFrame(run)
    return ()=>cancelAnimationFrame(raf)
  },[])

  const bars=[72,81,78,89,85,92,88,94,91,96,94,97]
  const maxB=Math.max(...bars)

  return (
    <motion.div className="flex items-center justify-center w-full h-full px-5 py-5"
      initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:0.5}}>
      <div className="w-full max-w-[510px] rounded-2xl overflow-hidden flex flex-col"
        style={{background:'#f8fafc',boxShadow:'0 36px 72px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.09)',maxHeight:430}}>

        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0" style={{background:'#e2e8f0',borderBottom:'1px solid rgba(0,0,0,0.08)'}}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex items-center gap-1.5 bg-white/70 rounded-md px-2.5 py-1" style={{border:'1px solid rgba(0,0,0,0.1)'}}>
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none"><rect x="0.5" y="4.5" width="7" height="5" rx="1" stroke="#94a3b8" strokeWidth="1"/><path d="M2 4.5V3a2 2 0 114 0v1.5" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round"/></svg>
            <span className="text-slate-400" style={{fontSize:8.5}}>app.vess.io/dashboard</span>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-600 font-semibold" style={{fontSize:7.5}}>Live</span>
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0 bg-white" style={{borderBottom:'1px solid #f1f5f9'}}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#1b619f] flex items-center justify-center" style={{boxShadow:'0 2px 6px rgba(27,97,159,0.3)'}}>
              <span className="text-white font-black" style={{fontSize:9}}>V</span>
            </div>
            <div>
              <div className="font-bold text-slate-900" style={{fontSize:12}}>VeSS Dashboard</div>
              <div className="text-slate-400" style={{fontSize:7.5}}>Network Quality Monitor</div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.28)'}}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-700 font-semibold" style={{fontSize:8}}>All Systems</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2.5 px-4 pt-3 pb-3 flex-shrink-0 bg-white">
          <div className="rounded-xl p-3 text-white" style={{background:'linear-gradient(135deg,#1b619f 0%,#0d4a87 100%)',boxShadow:'0 4px 14px rgba(27,97,159,0.28)'}}>
            <div style={{fontSize:7.5,fontWeight:600,opacity:0.7,letterSpacing:'0.1em'}}>ASR</div>
            <div style={{fontSize:26,fontWeight:800,lineHeight:1,fontVariantNumeric:'tabular-nums'}}>
              {asr.toFixed(1)}<span style={{fontSize:14}}>%</span>
            </div>
            <div style={{fontSize:7,opacity:0.65,marginTop:2}}>Answer Success Rate</div>
            <div style={{fontSize:8,color:'#86efac',fontWeight:600,marginTop:4}}>↑ +2.1% vs yesterday</div>
          </div>
          <div className="rounded-xl p-3 bg-slate-50" style={{border:'1px solid #e2e8f0'}}>
            <div style={{fontSize:7.5,fontWeight:600,color:'#64748b',letterSpacing:'0.08em'}}>CCR</div>
            <div style={{fontSize:22,fontWeight:800,color:'#0f172a',lineHeight:1}}>
              {ccr.toFixed(1)}<span style={{fontSize:12,color:'#94a3b8'}}>%</span>
            </div>
            <div style={{fontSize:7,color:'#94a3b8',marginTop:2}}>Call Completion</div>
            <div style={{fontSize:8,color:'#16a34a',fontWeight:600,marginTop:4}}>↑ +1.4%</div>
          </div>
          <div className="rounded-xl p-3 bg-slate-50" style={{border:'1px solid #e2e8f0'}}>
            <div style={{fontSize:7.5,fontWeight:600,color:'#64748b',letterSpacing:'0.08em'}}>SMS DR</div>
            <div style={{fontSize:22,fontWeight:800,color:'#0f172a',lineHeight:1}}>
              98.7<span style={{fontSize:12,color:'#94a3b8'}}>%</span>
            </div>
            <div style={{fontSize:7,color:'#94a3b8',marginTop:2}}>Delivery Rate</div>
            <div style={{fontSize:8,color:'#16a34a',fontWeight:600,marginTop:4}}>↑ +0.6%</div>
          </div>
        </div>

        {/* Chart */}
        <div className="px-4 pb-3 bg-white flex-shrink-0">
          <div className="rounded-xl p-3" style={{border:'1px solid #f1f5f9',background:'#fafbfc'}}>
            <div className="flex items-center justify-between mb-2">
              <span style={{fontSize:9,fontWeight:600,color:'#334155'}}>ASR — Last 12 Voice Tests</span>
              <span style={{fontSize:8,color:'#16a34a',fontWeight:600}}>↑ +4.2% trend</span>
            </div>
            <div className="flex items-end gap-1" style={{height:48}}>
              {bars.map((v,i)=>(
                <motion.div key={i} className="flex-1 rounded-sm"
                  style={{background:v>=90?'#4ade80':v>=80?'#fbbf24':'#f87171'}}
                  initial={{height:0,opacity:0}}
                  animate={{height:`${(v/maxB)*100}%`,opacity:1}}
                  transition={{delay:i*0.04+0.3,duration:0.35,ease:'easeOut'}}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span style={{fontSize:6.5,color:'#94a3b8'}}>09:00</span>
              <span style={{fontSize:6.5,color:'#94a3b8'}}>Now</span>
            </div>
          </div>
        </div>

        {/* Recent tests */}
        <div className="px-4 pb-4 bg-white flex-shrink-0">
          <div className="rounded-xl overflow-hidden" style={{border:'1px solid #f1f5f9'}}>
            <div className="flex items-center justify-between px-3 py-2" style={{background:'#f8fafc',borderBottom:'1px solid #f1f5f9'}}>
              <span style={{fontSize:8.5,fontWeight:600,color:'#475569'}}>Recent Tests</span>
              <span style={{fontSize:7.5,color:'#94a3b8'}}>Streaming live</span>
            </div>
            {[
              {id:'VT-0847',type:'Voice',region:'North Region',lat:'2.1s'},
              {id:'ST-0312',type:'SMS',  region:'West District',lat:'0.8s'},
              {id:'DT-0194',type:'Data', region:'Central',      lat:'48ms'},
            ].map(({id,type,region,lat},i)=>(
              <motion.div key={id}
                initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.6+i*0.1,duration:0.3}}
                className="flex items-center gap-2.5 px-3 py-2" style={{borderBottom:i<2?'1px solid #f8fafc':undefined}}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" style={{boxShadow:'0 0 5px rgba(74,222,128,0.7)'}} />
                <span style={{fontSize:8.5,fontWeight:600,color:'#0f172a',width:46}}>{id}</span>
                <span style={{fontSize:8,color:'#64748b',flex:1}}>{type} · {region}</span>
                <span style={{fontSize:8,fontWeight:600,color:'#16a34a'}}>PASS</span>
                <span style={{fontSize:7.5,color:'#94a3b8',width:32,textAlign:'right'}}>{lat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Steps data ──────────────────────────────────────────── */
const STEPS = [
  {
    num: '01',
    title: 'Deploy Real Devices',
    desc: 'Android devices with active SIM cards become permanent testing agents — deployed in real homes, offices, and cell towers across your coverage area.',
  },
  {
    num: '02',
    title: 'Vess App Tests Automatically',
    desc: 'The Vess App runs silently 24/7, executing scheduled voice, SMS, and data tests. Zero human involvement. Automatic retry and offline sync included.',
  },
  {
    num: '03',
    title: 'Real-Time Insights',
    desc: 'Test results stream to the VeSS backend within 5 seconds. Access live KPIs, trend analysis, and threshold alerts via the dashboard or your existing tools.',
  },
]

const STEP_DURATION = 4000

/* ── Main export — auto-play, full-screen ────────────────── */
export default function HowItWorksSection() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setActive(s => (s + 1) % 3), STEP_DURATION)
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  return (
    <section className="bg-[#f8fafc]" style={{ minHeight: '100vh' }}>
      <div className="h-full flex flex-col" style={{ minHeight: '100vh' }}>

        {/* Header */}
        <div className="flex-shrink-0 text-center pt-16 pb-8 px-4">
          <span className="section-tag">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-4">How VeSS works</h2>
          <p className="text-slate-500 mt-2">Three components. One complete picture.</p>
        </div>

        {/* Stage — stacks on mobile, side-by-side on lg+ */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 pb-12">

          {/* Left: step info */}
          <div className="lg:w-[38%] flex flex-col justify-center px-6 sm:px-10 lg:pl-16 lg:pr-8 flex-shrink-0 pb-8 lg:pb-0">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
                <div className="font-black leading-none select-none mb-4 hidden sm:block"
                  style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: 'rgba(27,97,159,0.07)' }}>
                  {STEPS[active].num}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-4">
                  {STEPS[active].title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{STEPS[active].desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Step dots */}
            <div className="flex gap-2.5 mt-8 lg:mt-10">
              {STEPS.map((_, i) => (
                <button key={i} onClick={() => { setActive(i); startTimer() }}
                  className="h-1 rounded-full transition-all duration-300 focus:outline-none"
                  style={{ width: i === active ? 28 : 8, background: i === active ? '#1b619f' : '#cbd5e1' }} />
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <div className="flex-1 flex items-center justify-center py-4 px-4 sm:px-8 lg:pr-16 min-w-0 min-h-[400px] sm:min-h-[500px]">
            <AnimatePresence mode="wait">
              {active === 0 && <div key="s1" className="w-full h-full flex items-center justify-center"><Step1Visual /></div>}
              {active === 1 && <div key="s2" className="w-full h-full flex items-center justify-center"><Step2Visual /></div>}
              {active === 2 && <div key="s3" className="w-full h-full flex items-center justify-center"><Step3Visual /></div>}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
