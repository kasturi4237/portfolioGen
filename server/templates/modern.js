const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572a5',
  Java: '#b07219', 'C++': '#f34b7d', C: '#555555', 'C#': '#178600',
  PHP: '#4f5d95', Ruby: '#701516', Go: '#00add8', Rust: '#dea584',
  Swift: '#fa7343', Kotlin: '#a97bff', HTML: '#e34c26', CSS: '#563d7c',
  Shell: '#89e051', Dart: '#00b4ab', Vue: '#41b883', R: '#198ce7'
}

export default function modern({ profile, repos, languages, stats }) {
  const yr = new Date().getFullYear()
  const topLangs = languages.slice(0, 8)
  const maxCount = topLangs[0]?.count || 1

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(profile.name)} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#F0EDFF;color:#1e1b3a;line-height:1.6;min-height:100vh}
a{color:inherit;text-decoration:none}

.hero{background:linear-gradient(135deg,#7B6BE8 0%,#9B7FD4 50%,#BFA8E8 100%);padding:72px 0 52px;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none}
.wrap{max-width:1000px;margin:0 auto;padding:0 28px;position:relative;z-index:1}

.hd{display:flex;align-items:center;gap:40px}
.avatar{width:100px;height:100px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,.35);flex-shrink:0;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.ht h1{font-size:2.1rem;font-weight:700;color:#fff;letter-spacing:-.02em}
.handle{font-size:.95rem;color:rgba(255,255,255,.7);margin:4px 0 10px}
.bio{font-size:.9rem;color:rgba(255,255,255,.85);max-width:500px;line-height:1.7;margin-bottom:14px}
.meta{display:flex;flex-wrap:wrap;gap:12px}
.ml{display:flex;align-items:center;gap:5px;font-size:.82rem;color:rgba(255,255,255,.75);background:rgba(255,255,255,.12);padding:4px 12px;border-radius:100px;backdrop-filter:blur(4px)}
.ml svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
a.ml:hover{background:rgba(255,255,255,.22);color:#fff}
.badge-open{background:rgba(255,255,255,.2);color:#fff;padding:3px 10px;border-radius:100px;font-size:.72rem;font-weight:600;margin-left:8px;border:1px solid rgba(255,255,255,.3)}

.stats-bar{background:rgba(255,255,255,.12);backdrop-filter:blur(8px);border-top:1px solid rgba(255,255,255,.1);margin-top:40px;padding:20px 0}
.stats-inner{display:flex;gap:0}
.stat{flex:1;text-align:center;padding:12px 0;border-right:1px solid rgba(255,255,255,.12)}
.stat:last-child{border-right:none}
.sv{font-size:1.8rem;font-weight:700;color:#fff;display:block}
.sl{font-size:.7rem;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.07em;margin-top:2px}

main{padding:48px 0}
.layout{display:grid;grid-template-columns:1fr 280px;gap:32px;align-items:start}

.section-title{font-size:.7rem;font-weight:600;color:#9490b8;text-transform:uppercase;letter-spacing:.1em;margin-bottom:20px}

.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.card{background:#fff;border:1.5px solid #ede8f8;border-radius:14px;padding:22px;display:block;transition:transform .18s,box-shadow .18s,border-color .18s}
.card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(123,107,232,.15);border-color:#c4b8f0}
.cn{font-size:.95rem;font-weight:600;color:#1e1b3a;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.cn svg{width:14px;height:14px;stroke:#9490b8;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}
.cd{font-size:.83rem;color:#6e6a8a;line-height:1.6;margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.6em}
.cm{display:flex;align-items:center;flex-wrap:wrap;gap:12px;font-size:.77rem;color:#a49ec8}
.dot{width:9px;height:9px;border-radius:50%;display:inline-block;margin-right:4px;vertical-align:middle}
.tag{background:#f5f2ff;color:#7b6ed6;padding:2px 8px;border-radius:100px;font-size:.7rem;font-weight:500}
.homepage{display:inline-flex;align-items:center;gap:4px;font-size:.78rem;color:#7B6BE8;margin-top:10px}
.homepage:hover{text-decoration:underline}

.sidebar-card{background:#fff;border:1.5px solid #ede8f8;border-radius:14px;padding:24px;margin-bottom:16px}

.lang-row{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.lang-row:last-child{margin-bottom:0}
.lang-name{font-size:.82rem;color:#4a466a;width:80px;flex-shrink:0;font-weight:500}
.lang-bar-bg{flex:1;height:6px;background:#f0eeff;border-radius:100px;overflow:hidden}
.lang-bar{height:100%;border-radius:100px;transition:width .6s ease}
.lang-pct{font-size:.75rem;color:#a49ec8;width:32px;text-align:right;flex-shrink:0}

footer{border-top:1.5px solid #ede8f8;padding:28px 0;text-align:center;background:#fff}
.ft{font-size:.82rem;color:#a49ec8}
.ft a{color:#7B6BE8;font-weight:500}
.ft a:hover{text-decoration:underline}

@media(max-width:768px){
  .layout{grid-template-columns:1fr}
  .grid{grid-template-columns:1fr}
  .hd{flex-direction:column;text-align:center;gap:20px}
  .meta{justify-content:center}
  .stats-inner{flex-wrap:wrap}
  .stat{flex:1 1 45%;border-right:none;border-bottom:1px solid rgba(255,255,255,.12)}
}
</style>
</head>
<body>
<div class="hero">
  <div class="wrap">
    <div class="hd">
      <img class="avatar" src="${esc(profile.avatar)}" alt="${esc(profile.name)}">
      <div class="ht">
        <h1>${esc(profile.name)}${profile.hireable ? `<span class="badge-open">Open to work</span>` : ''}</h1>
        <p class="handle">@${esc(profile.username)}</p>
        ${profile.bio ? `<p class="bio">${esc(profile.bio)}</p>` : ''}
        <div class="meta">
          ${profile.location ? `<span class="ml">${locIcon}${esc(profile.location)}</span>` : ''}
          ${profile.company ? `<span class="ml">${officeIcon}${esc(profile.company)}</span>` : ''}
          ${profile.blog ? `<a class="ml" href="${safeUrl(profile.blog)}" target="_blank" rel="noopener">${linkIcon}${esc(profile.blog.replace(/^https?:\/\//,''))}</a>` : ''}
          ${profile.twitter ? `<a class="ml" href="https://twitter.com/${esc(profile.twitter)}" target="_blank" rel="noopener">${twitterIcon}@${esc(profile.twitter)}</a>` : ''}
          <a class="ml" href="https://github.com/${esc(profile.username)}" target="_blank" rel="noopener">${ghIcon}GitHub</a>
        </div>
      </div>
    </div>
    <div class="stats-bar">
      <div class="stats-inner">
        <div class="stat"><span class="sv">${profile.public_repos}</span><span class="sl">Repos</span></div>
        <div class="stat"><span class="sv">${stats?.totalStars || 0}</span><span class="sl">Stars Earned</span></div>
        <div class="stat"><span class="sv">${profile.followers}</span><span class="sl">Followers</span></div>
        <div class="stat"><span class="sv">${profile.following}</span><span class="sl">Following</span></div>
      </div>
    </div>
  </div>
</div>

<main>
  <div class="wrap">
    <div class="layout">
      <div>
        ${repos.length ? `
        <p class="section-title">Featured Projects</p>
        <div class="grid">
          ${repos.map(r => `
          <a class="card" href="${esc(r.url)}" target="_blank" rel="noopener">
            <div class="cn">${repoIcon}${esc(r.name)}</div>
            <div class="cd">${esc(r.description || 'No description provided.')}</div>
            <div class="cm">
              ${r.language ? `<span><span class="dot" style="background:${LANG_COLORS[r.language] || '#9490b8'}"></span>${esc(r.language)}</span>` : ''}
              ${r.stars > 0 ? `<span>★ ${r.stars}</span>` : ''}
              ${r.forks > 0 ? `<span>⑂ ${r.forks}</span>` : ''}
            </div>
            ${r.topics.slice(0,3).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}
            ${r.homepage ? `<a class="homepage" href="${esc(r.homepage)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${linkIcon}Live demo</a>` : ''}
          </a>`).join('')}
        </div>` : ''}
      </div>

      <div>
        ${topLangs.length ? `
        <div class="sidebar-card">
          <p class="section-title">Top Languages</p>
          ${topLangs.map(({ lang, count }) => `
          <div class="lang-row">
            <span class="lang-name">${esc(lang)}</span>
            <div class="lang-bar-bg">
              <div class="lang-bar" style="width:${Math.round((count/maxCount)*100)}%;background:${LANG_COLORS[lang] || '#9490b8'}"></div>
            </div>
            <span class="lang-pct">${Math.round((count/maxCount)*100)}%</span>
          </div>`).join('')}
        </div>` : ''}

        <div class="sidebar-card">
          <p class="section-title">Quick Stats</p>
          <div style="font-size:.85rem;color:#6e6a8a;line-height:2">
            <div>📦 ${profile.public_repos} public repositories</div>
            <div>⭐ ${stats?.totalStars || 0} total stars earned</div>
            <div>👥 ${profile.followers} followers</div>
            ${profile.location ? `<div>📍 ${esc(profile.location)}</div>` : ''}
            ${profile.company ? `<div>🏢 ${esc(profile.company)}</div>` : ''}
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<footer>
  <div class="wrap">
    <p class="ft">© ${yr} ${esc(profile.name)} · <a href="https://github.com/${esc(profile.username)}" target="_blank" rel="noopener">View on GitHub</a> · Built with Portfolio Generator</p>
  </div>
</footer>
</body>
</html>`
}

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
function safeUrl(u) {
  if (!u) return '#'
  return esc(u.startsWith('http') ? u : 'https://' + u)
}

const locIcon = `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`
const linkIcon = `<svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`
const twitterIcon = `<svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>`
const ghIcon = `<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`
const repoIcon = `<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:#9490b8;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`
const officeIcon = `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
