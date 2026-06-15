import { useState } from "react";

const T = {
  bg:"#0A0A0A", surface:"#111111", card:"#161616",
  border:"#1E1E1E", border2:"#2A2A2A",
  gold:"#C8A96E", text:"#E8E4DC", textMid:"#9A9690", textDim:"#555550",
  teal:"#7EB8A4", purple:"#B07CC6", blue:"#5B9BD5",
  green:"#6DBF6D", amber:"#E0A030", red:"#E07B6A",
};

const APPS_DEFAULT = [
  {
    id:"oats-mgmt", name:"OATS APPS", emoji:"⬡",
    status:"live", progress:78,
    stack:["React","Vite","Firebase","Vercel"],
    description:"The hub. Project & production management for Fook'n Oats Enterprises.",
    url:"https://oats-mgmt.vercel.app",
    repo:"https://github.com/this-is-OATS/O.A.T.S.MGMT-APP",
    color:T.gold,
  },
  {
    id:"fookn-oats-main", name:"Fook'n Oats", emoji:"🌾",
    status:"live", progress:55,
    stack:["HTML","JS","Netlify"],
    description:"The Will-Oats Universe. Production services, creative brands, music, touring stories. One ecosystem, multiple identities.",
    url:"https://fookn-oats.enterprises",
    repo:"https://github.com/this-is-oats-mgmt/fookn-oats-main",
    color:T.gold,
  },
  {
    id:"gigwars", name:"Gig Wars", emoji:"🎮",
    status:"live", progress:22,
    stack:["JS","Browser","TI-85 aesthetic"],
    description:"TI-85 graphing calculator REIMAGINED. DrugWars × rave/touring world.",
    url:"https://gigwars.vercel.app",
    repo:"https://github.com/this-is-OATS/gigwars",
    color:T.green,
  },
  {
    id:"skynet-waterglass", name:"SkyNet / WaterGlass", emoji:"👁",
    status:"live", progress:45,
    stack:["React","Claude API","YouTube"],
    description:"Looking Glass Intelligence Engine. Transcript analysis & esoteric market intelligence for WatersAbove.",
    url:"https://skynet-waterglass.vercel.app",
    repo:"https://github.com/this-is-oats-mgmt/skynet_waterglass",
    color:T.teal,
  },
  {
    id:"esoteric-agent", name:"WatersAbove Sentinel", emoji:"🔮",
    status:"live", progress:60,
    stack:["HTML","JS","Netlify"],
    description:"2026 Fire Horse Decoder. Esoteric calendar intelligence, alchemical timeline, numerological engine.",
    url:"https://esotericagent.netlify.app",
    repo:"https://github.com/this-is-oats-mgmt/skynet_waterglass",
    color:T.teal,
  },
  {
    id:"oats-notes", name:"OATS Notes", emoji:"📝",
    status:"live", progress:35,
    stack:["React","Next.js","Vercel"],
    description:"Dump the decisions, pick up the wins. Quick-capture notes and wins app.",
    url:"https://oats-app.vercel.app",
    repo:null,
    color:T.textMid,
  },
  {
    id:"lx-supertech", name:"LX Powerbook", emoji:"🔦",
    status:"live", progress:40,
    stack:["JS","Excel","Netlify"],
    description:"Touring lighting production toolkit. Excel-based light write & show file management.",
    url:"https://lx-powerbook.netlify.app",
    repo:"https://github.com/this-is-oats-mgmt/LX_POWERBOOK",
    color:T.amber,
  },
  {
    id:"oats-apps-hub", name:"OATS Apps Hub", emoji:"⬡",
    status:"live", progress:75,
    stack:["React","Vite","Vercel"],
    description:"Standalone public directory of all OATS Apps Series. This page.",
    url:"https://oats-apps-hub.vercel.app",
    repo:"https://github.com/this-is-OATS/oats-apps-hub",
    color:T.gold,
  },
  {
    id:"princess-comms", name:"Princess Comms", emoji:"🌙",
    status:"in-dev", progress:40,
    stack:["React Native","GPS","Firebase"],
    description:"GPS-triggered scavenger hunt app. Milwaukee-Chicago corridor. Celestial visuals.",
    url:null,
    repo:null,
    color:T.purple,
  },
  {
    id:"shotsort", name:"ShotSort", emoji:"🔍",
    status:"in-dev", progress:60,
    stack:["Flask","Python","Claude Vision"],
    description:"Screenshot text extractor. Sorting ~2,600 iCloud screenshots into HQ zones.",
    url:null,
    repo:"https://github.com/this-is-oats-mgmt/shotsort",
    color:T.blue,
  },
  {
    id:"will-oats-tree", name:"Will Oats Tree", emoji:"🌳",
    status:"in-dev", progress:5,
    stack:["TBD"],
    description:"Personal timeline tree and master life map — OATS intelligence engine.",
    url:null,
    repo:"https://github.com/this-is-oats-mgmt/will-oats-tree",
    color:T.green,
  },
  {
    id:"encycle", name:"Encycle-Oats-Paedia", emoji:"📼",
    status:"planned", progress:8,
    stack:["Audio","AI","Archive"],
    description:"Personal POV audio chronicle system. Twin knowledge with WatersAbove.",
    url:null,
    repo:null,
    color:T.amber,
  },
  {
    id:"convergance", name:"Convergance Tool", emoji:"⟁",
    status:"planned", progress:5,
    stack:["TBD"],
    description:"Convergance. Purpose TBD.",
    url:null,
    repo:"https://github.com/this-is-oats-mgmt/convergance_tool",
    color:T.purple,
  },
];

const STATUS_META = {
  "live":    { label:"LIVE",    color:T.green  },
  "in-dev":  { label:"IN DEV", color:T.amber  },
  "planned": { label:"PLANNED",color:T.blue   },
  "paused":  { label:"PAUSED", color:T.textDim},
};

function useApps() {
  const [apps, setApps] = useState(() => {
    try { const s = localStorage.getItem("oats_apps_v1"); return s ? JSON.parse(s) : APPS_DEFAULT; }
    catch { return APPS_DEFAULT; }
  });
  const save = (updated) => {
    setApps(updated);
    try { localStorage.setItem("oats_apps_v1", JSON.stringify(updated)); } catch {}
  };
  const update = (id, patch) => save(apps.map(a => a.id === id ? { ...a, ...patch } : a));
  return [apps, update];
}

export default function App() {
  const [apps, updateApp] = useApps();
  const [editing, setEditing] = useState(null);
  const mobile = typeof window !== "undefined" && window.innerWidth < 600;

  const statusMeta = (s) => STATUS_META[s] || { label: s.toUpperCase(), color: T.textDim };

  const counts = Object.fromEntries(
    Object.keys(STATUS_META).map(s => [s, apps.filter(a => a.status === s).length])
  );

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',-apple-system,system-ui,sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:mobile?"14px 16px":"18px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ fontSize:28 }}>🌾</div>
          <div>
            <div style={{ fontSize:mobile?14:16, fontWeight:800, color:T.gold, fontFamily:"monospace", letterSpacing:"0.1em", textTransform:"uppercase" }}>OATS APPS</div>
            <div style={{ fontSize:9, color:T.textDim, fontFamily:"monospace", letterSpacing:"0.12em", textTransform:"uppercase", marginTop:2 }}>ai oatmeal coding division · fook'n oats enterprises</div>
          </div>
        </div>
        <a href="https://oats-mgmt.vercel.app" style={{ fontSize:11, color:T.gold, fontFamily:"monospace", textDecoration:"none", border:`1px solid ${T.gold}50`, borderRadius:6, padding:"6px 14px", background:T.gold+"11" }}>mgmt →</a>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:mobile?"20px 16px 60px":"32px 24px 60px" }}>

        {/* ── HERO ── */}
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:mobile?26:36, fontWeight:800, color:T.text, letterSpacing:"-0.02em", lineHeight:1.1, marginBottom:10 }}>
            The Apps Series.
          </div>
          <div style={{ fontSize:14, color:T.textDim, lineHeight:1.7, maxWidth:520 }}>
            Everything being built inside the AI Oatmeal Coding Division. Touring lighting, music, art, hardware, community.
          </div>
        </div>

        {/* ── STAT CHIPS ── */}
        <div style={{ display:"flex", gap:10, marginBottom:32, flexWrap:"wrap" }}>
          {Object.entries(STATUS_META).map(([s, m]) => counts[s] > 0 && (
            <div key={s} style={{ background:T.card, border:`1px solid ${m.color}30`, borderRadius:20, padding:"6px 16px", display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:m.color }} />
              <span style={{ fontSize:10, fontFamily:"monospace", color:m.color, letterSpacing:"0.08em" }}>{m.label}</span>
              <span style={{ fontSize:16, fontWeight:800, color:T.text }}>{counts[s]}</span>
            </div>
          ))}
          <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:20, padding:"6px 16px", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:10, fontFamily:"monospace", color:T.textDim, letterSpacing:"0.08em" }}>TOTAL</span>
            <span style={{ fontSize:16, fontWeight:800, color:T.text }}>{apps.length}</span>
          </div>
        </div>

        {/* ── APP GRID ── */}
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"repeat(auto-fill, minmax(400px,1fr))", gap:14 }}>
          {apps.map(app => {
            const meta = statusMeta(app.status);
            const isEditing = editing === app.id;
            return (
              <div key={app.id}
                onClick={() => setEditing(isEditing ? null : app.id)}
                style={{ background:T.card, border:`1px solid ${isEditing ? app.color+"60" : T.border}`, borderRadius:16, padding:"20px 22px", cursor:"pointer", transition:"border-color 0.15s, transform 0.1s", position:"relative" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = app.color+"50"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { if (!isEditing) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; } }}>

                {/* Top: emoji + name + status */}
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:app.color+"18", border:`1px solid ${app.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{app.emoji}</div>
                    <div>
                      <div style={{ fontSize:15, fontWeight:700, color:T.text, lineHeight:1.2 }}>{app.name}</div>
                      <div style={{ display:"flex", gap:5, marginTop:5, flexWrap:"wrap" }}>
                        {app.stack.map(s => <span key={s} style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, background:T.surface, border:`1px solid ${T.border}`, borderRadius:4, padding:"2px 7px" }}>{s}</span>)}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize:9, fontFamily:"monospace", color:meta.color, background:meta.color+"18", border:`1px solid ${meta.color}40`, borderRadius:20, padding:"4px 11px", letterSpacing:"0.08em", flexShrink:0, marginTop:2 }}>{meta.label}</div>
                </div>

                {/* Description */}
                <div style={{ fontSize:13, color:T.textMid, lineHeight:1.6, marginBottom:16 }}>{app.description}</div>

                {/* Progress bar */}
                <div style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                    <span style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, letterSpacing:"0.08em" }}>PROGRESS</span>
                    <span style={{ fontSize:12, fontFamily:"monospace", color:app.color, fontWeight:700 }}>{app.progress}%</span>
                  </div>
                  <div style={{ height:5, background:T.surface, borderRadius:5, overflow:"hidden", border:`1px solid ${T.border}` }}>
                    <div style={{ height:"100%", width:`${app.progress}%`, background:`linear-gradient(90deg, ${app.color}99, ${app.color})`, borderRadius:5, transition:"width 0.4s ease" }} />
                  </div>
                </div>

                {/* Links */}
                {(app.url || app.repo) && (
                  <div style={{ display:"flex", gap:8 }}>
                    {app.url && <a href={app.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize:10, fontFamily:"monospace", color:T.gold, textDecoration:"none", background:T.gold+"11", border:`1px solid ${T.gold}30`, borderRadius:6, padding:"5px 12px", letterSpacing:"0.04em" }}>↗ live</a>}
                    {app.repo && <a href={app.repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize:10, fontFamily:"monospace", color:T.textDim, textDecoration:"none", background:"transparent", border:`1px solid ${T.border}`, borderRadius:6, padding:"5px 12px", letterSpacing:"0.04em" }}>⌥ repo</a>}
                  </div>
                )}

                {/* Inline edit */}
                {isEditing && (
                  <div onClick={e => e.stopPropagation()} style={{ marginTop:18, paddingTop:16, borderTop:`1px solid ${T.border2}`, display:"flex", flexDirection:"column", gap:12 }}>
                    <div style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, letterSpacing:"0.1em" }}>EDIT</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {Object.entries(STATUS_META).map(([s, m]) => (
                        <button key={s} onClick={() => updateApp(app.id, { status: s })}
                          style={{ fontSize:9, fontFamily:"monospace", padding:"5px 12px", borderRadius:20, border:`1px solid ${app.status === s ? m.color : T.border}`, background:app.status === s ? m.color+"22" : "transparent", color:app.status === s ? m.color : T.textDim, cursor:"pointer", letterSpacing:"0.06em" }}>
                          {m.label}
                        </button>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, marginBottom:6, letterSpacing:"0.06em" }}>PROGRESS: {app.progress}%</div>
                      <input type="range" min={0} max={100} value={app.progress}
                        onChange={e => updateApp(app.id, { progress: parseInt(e.target.value) })}
                        style={{ width:"100%", cursor:"pointer" }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── FOOTER ── */}
        <div style={{ marginTop:48, paddingTop:24, borderTop:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div style={{ fontSize:11, color:T.textDim, fontFamily:"monospace", letterSpacing:"0.06em" }}>FOOK'N OATS ENTERPRISES · AI OATMEAL CODING DIVISION</div>
          <a href="https://oats-mgmt.vercel.app" style={{ fontSize:11, color:T.gold, fontFamily:"monospace", textDecoration:"none", opacity:0.7 }}>oats-mgmt.vercel.app →</a>
        </div>
      </div>
    </div>
  );
}
