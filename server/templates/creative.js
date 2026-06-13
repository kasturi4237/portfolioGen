const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572a5',
  Java: '#b07219', 'C++': '#f34b7d', C: '#555555', 'C#': '#178600',
  PHP: '#4f5d95', Ruby: '#701516', Go: '#00add8', Rust: '#dea584',
  Swift: '#fa7343', Kotlin: '#a97bff', HTML: '#e34c26', CSS: '#563d7c',
  Shell: '#89e051', Dart: '#00b4ab', Vue: '#41b883', R: '#198ce7'
}

const CARD_ACCENTS = ['#E87B5A', '#7B9EC8', '#8EC4A4', '#C4A0D4', '#E8C25A', '#7BBFC8']

export default function creative({ profile, repos, languages, stats }) {
  const yr = new Date().getFullYear()
  const topLangs = languages.slice(0, 10)

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(profile.name)} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#FEF9F5;color:#2D2420;line-height:1.6}
a{color:inherit;text-decoration:none}
.wrap{max-width:1040px;margin:0 auto;padding:0 32px}

/* Hero */
.hero{padding:80px 0;background:#FEF9F5;border-bottom:2px solid #F2E8DF}
.hero-grid{display:grid;grid-template-columns:auto 1fr;gap:52px;align-items:start}
.avatar-wrap{position:relative}
.avatar{width:130px;height:130px;border-radius:24px;object-fit:cover;display:block;box-shadow:8px 8px 0 #E8C8B4}
.avatar-accent{position:absolute;bottom:-8px;right:-8px;width:40px;height:40px;background:#E87B5A;border-radius:10px;display:flex;align-items:center;justify-content:center}
.avatar-accent svg{width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
h1{font-size:2.8rem;font-weight:800;color:#2D2420;letter-spacing:-.03em;line-height:1.1;margin-bottom:8px}
.handle{font-size:1rem;color:#C4896A;font-weight:500;margin-bottom:14px}
.bio{font-size:.95rem;color:#6A5A52;max-width:520px;line-height:1.75;margin-bottom:20px}
.meta{display:flex;flex-wrap:wrap;gap:10px}
.ml{display:flex;align-items:center;gap:5px;font-size:.82rem;color:#6A5A52;background:#F5EDE6;padding:5px 13px;border-radius:8px;font-weight:500}
.ml svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
a.ml:hover{background:#EDD8C8;color:#C4896A}
.badge-open{background:#E8F5EC;color:#3D9E5A;padding:4px 12px;border-radius:8px;font-size:.75rem;font-weight:600;margin-left:10px}

/* Stats strip */
.stats-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:40px 0 0}
.stat{background:#fff;border:1.5px solid #F2E8DF;border-radius:16px;padding:20px;text-align:center;position:relative;overflow:hidden}
.stat::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--accent)}
.sv{font-size:2rem;font-weight:800;color:#2D2420;display:block;letter-spacing:-.02em}
.sl{font-size:.72rem;color:#B4A09A;text-transform:uppercase;letter-spacing:.07em;margin-top:2px}

/* Sections */
section{padding:60px 0}
section+section{border-top:1.5px solid #F2E8DF}
.st{font-size:.72rem;font-weight:700;color:#C4896A;text-transform:uppercase;letter-spacing:.1em;margin-bottom:28px;display:flex;align-items:center;gap:10px}
.st::after{content:'';flex:1;height:1px;background:#F2E8DF}

/* Project cards */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
.card{background:#fff;border:1.5px solid #F2E8DF;border-radius:16px;padding:24px 24px 24px 28px;display:block;position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s}
.card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--accent,#E87B5A);border-radius:4px 0 0 4px}
.card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(45,36,32,.1)}
.cn{font-size:1rem;font-weight:700;color:#2D2420;margin-bottom:8px}
.cd{font-size:.85rem;color:#7A6A62;line-height:1.65;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.8em}
.cm{display:flex;align-items:center;flex-wrap:wrap;gap:12px;font-size:.79rem;color:#B4A09A}
.dot{width:9px;height:9px;border-radius:50%;display:inline-block;margin-right:4px;vertical-align:middle}
.tags{margin-top:10px;display:flex;flex-wrap:wrap;gap:6px}
.tag{padding:3px 10px;border-radius:6px;font-size:.71rem;font-weight:600;color:#C4896A;background:#FEF0E8;border:1px solid #F2DDD0}
.live-link{display:inline-flex;align-items:center;gap:4px;font-size:.79rem;color:#E87B5A;margin-top:10px;font-weight:500}
.live-link:hover{text-decoration:underline}

/* Languages */
.lang-cloud{display:flex;flex-wrap:wrap;gap:12px}
.lang-chip{display:flex;align-items:center;gap:7px;padding:8px 16px;background:#fff;border:1.5px solid #F2E8DF;border-radius:100px;font-size:.85rem;color:#4A3A32;font-weight:500;transition:transform .15s,border-color .15s}
.lang-chip:hover{transform:translateY(-2px);border-color:#E8C8B4}
.ld{width:11px;height:11px;border-radius:50%}

/* Footer */
footer{background:#2D2420;padding:40px 0;color:#C4AEA8}
.footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.footer-name{font-size:1.1rem;font-weight:700;color:#fff}
.footer-links{display:flex;gap:20px}
.footer-links a{font-size:.85rem;color:#C4AEA8;font-weight:500}
.footer-links a:hover{color:#fff}
.footer-copy{font-size:.8rem;color:#7A6A62;margin-top:16px}

@media(max-width:640px){
  .hero-grid{grid-template-columns:1fr;gap:28px}
  h1{font-size:2rem}
  .stats-strip{grid-template-columns:1fr 1fr}
  .footer-inner{flex-direction:column;text-align:center}
}
</style>
</head>
<body>

<div class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div class="avatar-wrap">
        <img class="avatar" src="${esc(profile.avatar)}" alt="${esc(profile.name)}">
        <div class="avatar-accent">${ghIcon}</div>
      </div>
      <div>
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
        <div class="stats-strip">
          <div class="stat" style="--accent:#E87B5A"><span class="sv">${profile.public_repos}</span><span class="sl">Repos</span></div>
          <div class="stat" style="--accent:#7B9EC8"><span class="sv">${stats?.totalStars || 0}</span><span class="sl">Stars</span></div>
          <div class="stat" style="--accent:#8EC4A4"><span class="sv">${profile.followers}</span><span class="sl">Followers</span></div>
          <div class="stat" style="--accent:#C4A0D4"><span class="sv">${profile.following}</span><span class="sl">Following</span></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="wrap">

${repos.length ? `
<section>
  <p class="st">Projects</p>
  <div class="grid">
    ${repos.map((r, i) => `
    <a class="card" href="${esc(r.url)}" target="_blank" rel="noopener" style="--accent:${CARD_ACCENTS[i % CARD_ACCENTS.length]}">
      <div class="cn">${esc(r.name)}</div>
      <div class="cd">${esc(r.description || 'No description provided.')}</div>
      <div class="cm">
        ${r.language ? `<span><span class="dot" style="background:${LANG_COLORS[r.language] || '#9490b8'}"></span>${esc(r.language)}</span>` : ''}
        ${r.stars > 0 ? `<span>★ ${r.stars}</span>` : ''}
        ${r.forks > 0 ? `<span>⑂ ${r.forks}</span>` : ''}
      </div>
      ${r.topics.length ? `<div class="tags">${r.topics.slice(0,4).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
      ${r.homepage ? `<span class="live-link" onclick="event.stopPropagation()">${linkIcon} Live demo</span>` : ''}
    </a>`).join('')}
  </div>
</section>` : ''}

${topLangs.length ? `
<section>
  <p class="st">Technologies</p>
  <div class="lang-cloud">
    ${topLangs.map(({ lang }) => `
    <div class="lang-chip">
      <span class="ld" style="background:${LANG_COLORS[lang] || '#9490b8'}"></span>
      ${esc(lang)}
    </div>`).join('')}
  </div>
</section>` : ''}

</div>

<footer>
  <div class="wrap">
    <div class="footer-inner">
      <div>
        <div class="footer-name">${esc(profile.name)}</div>
        <div class="footer-copy">© ${yr} · Built with Portfolio Generator</div>
      </div>
      <div class="footer-links">
        <a href="https://github.com/${esc(profile.username)}" target="_blank" rel="noopener">GitHub</a>
        ${profile.twitter ? `<a href="https://twitter.com/${esc(profile.twitter)}" target="_blank" rel="noopener">Twitter</a>` : ''}
        ${profile.blog ? `<a href="${safeUrl(profile.blog)}" target="_blank" rel="noopener">Website</a>` : ''}
      </div>
    </div>
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
const officeIcon = `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
