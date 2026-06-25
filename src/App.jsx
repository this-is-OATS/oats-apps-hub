import { useState, useEffect } from "react";

const T = {
  bg:"#0A0A0A", surface:"#111111", card:"#161616",
  border:"#1E1E1E", border2:"#2A2A2A",
  gold:"#C8A96E", text:"#E8E4DC", textMid:"#9A9690", textDim:"#555550",
  teal:"#7EB8A4", purple:"#B07CC6", blue:"#5B9BD5",
  green:"#6DBF6D", amber:"#E0A030", red:"#E07B6A",
};

// version: manually set per app. ghRepo: "org/repo" for live commit fetch (public repos only).
const APPS_DEFAULT = [
  { id:"fookn-oats-main", name:"Fook'n Oats Enterprises - WEB", emoji:"🌾", version:"v1.0", status:"live", progress:55,
    stack:["HTML","JS","Netlify"],
    description:"The primary digital portfolio and enterprise gateway. Showcasing all active brands, creative services, audio releases, and public project logs.",
    url:"https://fookn-oats.enterprises", ghRepo:"this-is-oats-mgmt/fookn-oats-main", color:T.gold },
  { id:"oats-mgmt", name:"OATS MGMT", emoji:"⬡", version:"v0.8.16", status:"live", progress:78,
    stack:["React","Vite","Firebase","Vercel"],
    description:"The primary workspace hub. Central tracking, metrics, and operations dashboard for FOOK'N OATS ENTERPRISES.",
    url:"https://oats-mgmt.vercel.app", ghRepo:"this-is-OATS/O.A.T.S.MGMT-APP", color:T.gold },
  { id:"gigwars", name:"Gig Wars", emoji:"🎮", version:"v0.2", status:"live", progress:22,
    stack:["JS","Browser","TI-85 aesthetic"],
    description:"A custom TI-85 graphing calculator clone re-engineered into a fast-paced touring and travel simulation game.",
    url:"https://gigwars.vercel.app", ghRepo:"this-is-OATS/gigwars", color:T.green },
  { id:"skynet-waterglass", name:"SkyNet / WaterGlass", emoji:"👁", version:"v0.5", status:"live", progress:45,
    stack:["React","Claude API","YouTube"],
    description:"Looking Glass Intelligence Engine. Aggregating multi-source text transcripts, logs, and structural pattern data.",
    url:"https://skynet-waterglass.vercel.app/indexes/looking_glass_mindmap.html", ghRepo:"this-is-oats-mgmt/skynet_waterglass", color:T.teal },
  { id:"esoteric-agent", name:"WatersAbove Sentinel", emoji:"🔮", version:"v1.0", status:"live", progress:60,
    stack:["HTML","JS","Netlify"],
    description:"2026 Fire Horse timeline tracker. Applied cyclical analytics and pattern evaluation models.",
    url:"https://esotericagent.netlify.app", ghRepo:"this-is-oats-mgmt/skynet_waterglass", color:T.teal },
  { id:"oats-notes", name:"OATS Notes: by Nathan", emoji:"📝", version:"v0.3", status:"live", progress:35,
    stack:["React","Next.js","Vercel"],
    description:"Dump the decisions, pick up the wins. Quick-capture notes and wins app.",
    url:"https://oats-app.vercel.app", ghRepo:null, color:T.textMid },
  { id:"lx-supertech", name:"LX Powerbook", emoji:"🔦", version:"v0.4", status:"live", progress:40,
    stack:["JS","Excel","Netlify"],
    description:"Touring lighting production toolkit. Excel-based light write & show file management.",
    url:"https://lx-powerbook.netlify.app", ghRepo:"this-is-oats-mgmt/LX_POWERBOOK", color:T.amber },
  { id:"oats-apps-hub", name:"OATS Apps Hub", emoji:"⬡", version:"v2.0", status:"live", progress:75,
    stack:["React","Vite","Vercel"],
    description:"Standalone public directory of all OATS Apps Series. This page.",
    url:"https://oats-apps-hub.vercel.app", ghRepo:"this-is-OATS/oats-apps-hub", color:T.gold },
  { id:"princess-comms", name:"Princess Comms", emoji:"🌙", version:"v0.4", status:"in-dev", progress:40,
    stack:["React Native","GPS","Firebase"],
    description:"A living sky of memories, waking up as a.princess moves through life IRL. A real-world scavenger hunt where locations choose the stories to be discovered next.",
    url:null, ghRepo:null, color:T.purple },
  { id:"shotsort", name:"ShotSort", emoji:"🔍", version:"v0.6", status:"in-dev", progress:60,
    stack:["Flask","Python","Claude Vision"],
    description:"Screenshot text extractor. Sorting ~2,600 iCloud screenshots into HQ zones.",
    url:null, ghRepo:"this-is-oats-mgmt/shotsort", color:T.blue, category:"internal" },
  { id:"voice-memo-pipeline", name:"Voice Memo Pipeline", emoji:"🎙️", version:"v0.5", status:"in-dev", progress:65,
    stack:["Notion API","Apple Voice Memos","Google Drive"],
    description:"Automated pipeline capturing local voice memos, checking text alignments, and processing transcripts straight into Notion.",
    url:null, ghRepo:null, color:T.red, category:"internal" },
  { id:"media-transcriber", name:"Media Transcriber", emoji:"🎞️", version:"v0.1", status:"live", progress:60,
    stack:["NAS","Audio/Video","Transcription","Local"],
    description:"Local media monitoring utility. Scans local storage directories and media files to cross-check transcription logs.",
    url:null, ghRepo:null, color:T.blue, category:"internal" },
  { id:"will-oats-tree", name:"Will Oats Tree", emoji:"🌳", version:"v3.0", status:"live", progress:70,
    stack:["Three.js","WebGL","Vercel"],
    description:"An interactive 3D spatial node mapping a 12-zone lifetime encyclopedia and multi-year data archive. Functions as the generative WebGL visual framework and core energy source code for FOE",
    url:"https://will-oats-tree.vercel.app", ghRepo:"this-is-OATS/will-oats-tree", color:T.green },
  { id:"encycle", name:"Encycle-Oats-Paedia", emoji:"📼", version:"v0.0", status:"planned", progress:8,
    stack:["Audio","AI","Archive"],
    description:"Personal audio logging and indexing engine designed to match data channels with internal tracking tools.",
    url:null, ghRepo:null, color:T.amber },
  { id:"convergance", name:"Convergance Tool", emoji:"⟁", version:"v0.0", status:"planned", progress:5,
    stack:["TBD"], description:"Data intersection and alignment tool. Purpose and integration pipelines TBD.",
    url:null, ghRepo:"this-is-oats-mgmt/convergance_tool", color:T.purple },
];

const PUBLIC_REPOS = new Set(["this-is-OATS/oats-apps-hub"]);

const STATUS_META = {
  "live": { label:"LIVE", color:T.green },
  "in-dev": { label:"IN DEV", color:T.amber },
  "planned": { label:"PLANNED",color:T.blue },
  "paused": { label:"PAUSED", color:T.textDim},
};

function timeAgo(iso) {
  if (!iso) return null;
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff/86400)}d ago`;
  return `${Math.floor(diff/604800)}w ago`;
}

function useApps() {
  const [apps, setApps] = useState(() => {
    try {
      const s = localStorage.getItem("oats_apps_v4");
      if (!s) return APPS_DEFAULT;
      const saved = JSON.parse(s);
      return APPS_DEFAULT.map(def => {
        const cached = saved.find(a => a.id === def.id);
        if (!cached) return def;
        return { ...cached, version: def.version, url: def.url, ghRepo: def.ghRepo, stack: def.stack, description: def.description, status: def.status, progress: def.progress };
      });
    } catch { return APPS_DEFAULT; }
  });
  const save = (updated) => {
    setApps(updated);
    try { localStorage.setItem("oats_apps_v4", JSON.stringify(updated)); } catch {}
  };
  const update = (id, patch) => save(apps.map(a => a.id === id ? { ...a, ...patch } : a));
  return [apps, update];
}

async function fetchCommit(ghRepo) {
  try {
    const r = await fetch(`https://api.github.com/repos/${ghRepo}/commits?per_page=1`, {
      headers: { Accept: "application/vnd.github.v3+json" }
    });
    if (!r.ok) return null;
    const [commit] = await r.json();
    return {
      sha: commit.sha.slice(0,7),
      message: commit.commit.message.split("\n")[0].slice(0,60),
      date: commit.commit.author.date,
    };
  } catch { return null; }
}

async function fetchOgImage(url) {
  try {
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const r = await fetch(proxy);
    const { contents } = await r.json();
    const m = contents.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || contents.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    return m ? m[1] : null;
  } catch { return null; }
}

function AppIcon({ app }) {
  const [ogImg, setOgImg] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!app.url) return;
    fetchOgImage(app.url).then(img => { if (img) setOgImg(img); });
  }, [app.url]);

  const showOg = ogImg && !failed;

  return (
    <div style={{ width:40, height:40, borderRadius:10, background:app.color+"18", border:`1px solid ${app.color}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0, overflow:"hidden" }}>
      {showOg ? (
        <img
          src={ogImg}
          onError={() => setFailed(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:9 }}
          alt=""
        />
      ) : (
        app.emoji
      )}
    </div>
  );
}

function AppCard({ app, statusMeta, editing, setEditing, commits, loading, updateApp }) {
  const meta = statusMeta(app.status);
  const isEditing = editing === app.id;
  const commit = app.ghRepo ? commits[app.ghRepo] : null;
  const hasLiveCommit = commit && PUBLIC_REPOS.has(app.ghRepo);

  return (
    <div key={app.id}
      onClick={() => setEditing(isEditing ? null : app.id)}
      style={{ background:T.card, border:`1px solid ${isEditing ? app.color+"60" : T.border}`, borderRadius:16, padding:"16px", cursor:"pointer", transition:"border-color 0.15s" }}>

      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, flex:1, minWidth:0 }}>
          <AppIcon app={app} />
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:700, color:T.text, lineHeight:1.2 }}>{app.name}</div>
            <div style={{ display:"flex", gap:4, marginTop:4, flexWrap:"wrap" }}>
              {app.stack.map(s => <span key={s} style={{ fontSize:8, fontFamily:"monospace", color:T.textDim, background:T.surface, border:`1px solid ${T.border}`, borderRadius:3, padding:"2px 6px" }}>{s}</span>)}
            </div>
          </div>
        </div>
        <div style={{ fontSize:8, fontFamily:"monospace", color:meta.color, background:meta.color+"18", border:`1px solid ${meta.color}40`, borderRadius:20, padding:"3px 9px", letterSpacing:"0.08em", flexShrink:0, marginLeft:8 }}>{meta.label}</div>
      </div>

      <div style={{ fontSize:12, color:T.textMid, lineHeight:1.55, marginBottom:10 }}>{app.description}</div>

      <div style={{ background:T.surface, borderRadius:8, padding:"8px 10px", marginBottom:12, border:`1px solid ${T.border}` }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
          <span style={{ fontSize:10, fontFamily:"monospace", color:app.color, fontWeight:700, letterSpacing:"0.04em", flexShrink:0 }}>{app.version}</span>

          {hasLiveCommit ? (
            <span style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1, textAlign:"center" }}>
              {commit.message}
            </span>
          ) : app.ghRepo && !PUBLIC_REPOS.has(app.ghRepo) ? (
            <span style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, flex:1, textAlign:"center" }}>private repo</span>
          ) : loading && app.ghRepo ? (
            <span style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, flex:1, textAlign:"center" }}>fetching…</span>
          ) : (
            <span style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, flex:1, textAlign:"center" }}>—</span>
          )}

          {hasLiveCommit && (
            <span style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, flexShrink:0 }}>{timeAgo(commit.date)}</span>
          )}

          {app.status === "live" && (
            <div style={{ width:6, height:6, borderRadius:"50%", background:T.green, flexShrink:0, boxShadow:`0 0 4px ${T.green}` }} />
          )}
        </div>

        {hasLiveCommit && (
          <div style={{ marginTop:5, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:8, fontFamily:"monospace", color:T.textDim, background:T.card, border:`1px solid ${T.border}`, borderRadius:3, padding:"1px 5px" }}>{commit.sha}</span>
            <span style={{ fontSize:8, fontFamily:"monospace", color:T.green }}>● deployed</span>
          </div>
        )}
      </div>

      <div style={{ marginBottom:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
          <span style={{ fontSize:8, fontFamily:"monospace", color:T.textDim, letterSpacing:"0.08em" }}>PROGRESS</span>
          <span style={{ fontSize:11, fontFamily:"monospace", color:app.color, fontWeight:700 }}>{app.progress}%</span>
        </div>
        <div style={{ height:4, background:T.surface, borderRadius:4, overflow:"hidden", border:`1px solid ${T.border}` }}>
          <div style={{ height:"100%", width:`${app.progress}%`, background:`linear-gradient(90deg,${app.color}99,${app.color})`, borderRadius:4 }} />
        </div>
      </div>

      {(app.url || app.ghRepo) && (
        <div style={{ display:"flex", gap:7 }}>
          {app.url && <a href={app.url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{ fontSize:10, fontFamily:"monospace", color:T.gold, textDecoration:"none", background:T.gold+"11", border:`1px solid ${T.gold}30`, borderRadius:6, padding:"5px 12px", letterSpacing:"0.04em", minHeight:34, display:"flex", alignItems:"center" }}>↗ live</a>}
          {app.ghRepo && <a href={`https://github.com/${app.ghRepo}`} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{ fontSize:10, fontFamily:"monospace", color:T.textDim, textDecoration:"none", background:"transparent", border:`1px solid ${T.border}`, borderRadius:6, padding:"5px 12px", letterSpacing:"0.04em", minHeight:34, display:"flex", alignItems:"center" }}>⌥ repo</a>}
        </div>
      )}

      {isEditing && (
        <div onClick={e=>e.stopPropagation()} style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${T.border2}`, display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ fontSize:8, fontFamily:"monospace", color:T.textDim, letterSpacing:"0.1em" }}>EDIT</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {Object.entries(STATUS_META).map(([s, m]) => (
              <button key={s} onClick={()=>updateApp(app.id,{status:s})}
                style={{ fontSize:9, fontFamily:"monospace", padding:"6px 12px", borderRadius:20, border:`1px solid ${app.status===s?m.color:T.border}`, background:app.status===s?m.color+"22":"transparent", color:app.status===s?m.color:T.textDim, cursor:"pointer", letterSpacing:"0.06em", minHeight:34 }}>
                {m.label}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontSize:8, fontFamily:"monospace", color:T.textDim, marginBottom:6, letterSpacing:"0.06em" }}>PROGRESS: {app.progress}%</div>
            <input type="range" min={0} max={100} value={app.progress}
              onChange={e=>updateApp(app.id,{progress:parseInt(e.target.value)})}
              style={{ width:"100%", cursor:"pointer", height:20 }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [apps, updateApp] = useApps();
  const [editing, setEditing] = useState(null);
  const [commits, setCommits] = useState({});
  const [loading, setLoading] = useState(true);

  const statusMeta = (s) => STATUS_META[s] || { label: s.toUpperCase(), color: T.textDim };
  const counts = Object.fromEntries(
    Object.keys(STATUS_META).map(s => [s, apps.filter(a => a.status === s).length])
  );
  const publicApps = apps.filter(a => a.category !== "internal");
  const internalApps = apps.filter(a => a.category === "internal");

  useEffect(() => {
    const publicApps = apps.filter(a => a.ghRepo && PUBLIC_REPOS.has(a.ghRepo));
    const uniqueRepos = [...new Set(publicApps.map(a => a.ghRepo))];
    Promise.all(
      uniqueRepos.map(repo => fetchCommit(repo).then(data => [repo, data]))
    ).then(results => {
      setCommits(Object.fromEntries(results));
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',-apple-system,system-ui,sans-serif", display:"flex", justifyContent:"center" }}>
      <div style={{ width:"100%", maxWidth:860, display:"flex", flexDirection:"column", minHeight:"100vh" }}>

        <div style={{ height:14, background:T.surface }} />

        <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:22 }}>🌾</div>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:T.gold, fontFamily:"monospace", letterSpacing:"0.1em", textTransform:"uppercase", lineHeight:1.2 }}>OATS APPS</div>
              <div style={{ fontSize:8, color:T.textDim, fontFamily:"monospace", letterSpacing:"0.1em", textTransform:"uppercase" }}>Oatmeal Intelligence Division</div>
              <div style={{ fontSize:8, color:T.gold, fontFamily:"monospace", opacity:0.5, marginTop:1 }}>v2.0 · 2026.06.16</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <a href="https://fookn-oats.enterprises" style={{ fontSize:10, color:T.textMid, fontFamily:"monospace", textDecoration:"none", border:`1px solid ${T.border2}`, borderRadius:6, padding:"5px 10px", background:T.card }}>FOE →</a>
          </div>
        </div>

        <div style={{ flex:1, padding:"20px 16px 80px" }}>

          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:24, fontWeight:800, color:T.text, letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:8 }}>
              The Apps Series.
            </div>
            <div style={{ fontSize:13, color:T.textDim, lineHeight:1.6 }}>
              Everything inside the Oatmeal Intelligence Division.
            </div>
          </div>

          <div style={{ display:"flex", gap:6, marginBottom:24, flexWrap:"wrap" }}>
            {Object.entries(STATUS_META).map(([s, m]) => counts[s] > 0 && (
              <div key={s} style={{ background:T.card, border:`1px solid ${m.color}30`, borderRadius:20, padding:"5px 12px", display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:m.color }} />
                <span style={{ fontSize:9, fontFamily:"monospace", color:m.color, letterSpacing:"0.08em" }}>{m.label}</span>
                <span style={{ fontSize:14, fontWeight:800, color:T.text }}>{counts[s]}</span>
              </div>
            ))}
            <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:20, padding:"5px 12px", display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:9, fontFamily:"monospace", color:T.textDim, letterSpacing:"0.08em" }}>TOTAL</span>
              <span style={{ fontSize:14, fontWeight:800, color:T.text }}>{apps.length}</span>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(360px, 1fr))", gap:10 }}>
            {publicApps.map(app => (
              <AppCard key={app.id} app={app} statusMeta={statusMeta} editing={editing} setEditing={setEditing} commits={commits} loading={loading} updateApp={updateApp} />
            ))}
          </div>

          {internalApps.length > 0 && (
            <>
              <div style={{ marginTop:36, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:10, fontFamily:"monospace", color:T.textDim, letterSpacing:"0.12em", textTransform:"uppercase" }}>⌬ Core Utilities</span>
                <span style={{ flex:1, height:1, background:T.border }} />
                <span style={{ fontSize:8, fontFamily:"monospace", color:T.textDim, opacity:0.6 }}>not public-facing</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(360px, 1fr))", gap:10 }}>
                {internalApps.map(app => (
                  <AppCard key={app.id} app={app} statusMeta={statusMeta} editing={editing} setEditing={setEditing} commits={commits} loading={loading} updateApp={updateApp} />
                ))}
              </div>
            </>
          )}

          <div style={{ marginTop:40, paddingTop:20, borderTop:`1px solid ${T.border}` }}>
            <div style={{ fontSize:9, color:T.textDim, fontFamily:"monospace", letterSpacing:"0.06em", marginBottom:6 }}>FOOK'N OATS ENTERPRISES</div>
            <div style={{ fontSize:9, color:T.textDim, fontFamily:"monospace", letterSpacing:"0.06em", opacity:0.6 }}>OATMEAL INTELLIGENCE DIVISION</div>
          </div>
        </div>
      </div>
    </div>
  );
}
