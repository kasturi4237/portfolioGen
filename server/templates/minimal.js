const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572a5',
  Java: '#b07219', 'C++': '#f34b7d', C: '#555555', 'C#': '#178600',
  PHP: '#4f5d95', Ruby: '#701516', Go: '#00add8', Rust: '#dea584',
  Swift: '#fa7343', Kotlin: '#a97bff', HTML: '#e34c26', CSS: '#563d7c',
  Shell: '#89e051', Dart: '#00b4ab', Scala: '#c22d40', Vue: '#41b883',
  R: '#198ce7', MATLAB: '#e16737'
}

export default function minimal({ profile, repos, languages, stats }) {
  const yr = new Date().getFullYear()
  const topLangs = languages.slice(0, 8)

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(profile.name)} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#fff;color:#1e1b3a;line-height:1.6}
a{color:inherit;text-decoration:none}
.wrap{max-width:960px;margin:0 auto;padding:0 28px}

header{padding:72px 0 52px}
.hd{display:flex;align-items:center;gap:44px}
.avatar{width:112px;height:112px;border-radius:50%;object-fit:cover;border:3px solid #edeaf8;flex-shrink:0}
.ht h1{font-size:2.2rem;font-weight:700;letter-spacing:-.02em;color:#1e1b3a}
.ht .handle{font-size:1rem;color:#8479b8;margin:4px 0 12px;font-weight:400}
.ht .bio{font-size:.95rem;color:#5a567a;max-width:460px;margin-bottom:16px;line-height:1.7}
.meta{display:flex;flex-wrap:wrap;gap:14px}
.ml{display:flex;align-items:center;gap:5px;font-size:.83rem;color:#8479b8}
.ml svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}
a.ml:hover{color:#5a4f9a}

.stats{display:flex;gap:36px;padding:36px 0;border-top:1px solid #f2eff9;border-bottom:1px solid #f2eff9}
.sv{font-size:1.9rem;font-weight:700;color:#1e1b3a;display:block}
.sl{font-size:.72rem;color:#a49ec8;text-transform:uppercase;letter-spacing:.07em;margin-top:2px}

section{padding:52px 0}
section+section{border-top:1px solid #f2eff9}
.st{font-size:.7rem;font-weight:600;color:#a49ec8;text-transform:uppercase;letter-spacing:.1em;margin-bottom:24px}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px}
.card{border:1.5px solid #ede9f8;border-radius:14px;padding:24px;display:block;transition:transform .18s,box-shadow .18s,border-color .18s}
.card:hover{transform:translateY(-3px);box-shadow:0 10px 36px rgba(132,121,184,.13);border-color:#d4cff0}
.cn{font-size:.98rem;font-weight:600;color:#1e1b3a;margin-bottom:8px}
.cd{font-size:.85rem;color:#6e6a8a;line-height:1.6;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.7em}
.cm{display:flex;align-items:center;flex-wrap:wrap;gap:14px;font-size:.78rem;color:#a49ec8}
.dot{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:4px;vertical-align:middle}
.tag{background:#f5f2ff;color:#7b6ed6;padding:2px 9px;border-radius:100px;font-size:.72rem;font-weight:500;margin-top:8px;display:inline-block}

.pills{display:flex;flex-wrap:wrap;gap:10px}
.pill{display:flex;align-items:center;gap:7px;padding:7px 16px;background:#faf8ff;border:1.5px solid #ede9f8;border-radius:100px;font-size:.83rem;color:#4a466a}

footer{padding:36px 0;border-top:1px solid #f2eff9;text-align:center}
.ft{font-size:.82rem;color:#a49ec8}
.ft a{color:#8479b8;font-weight:500}
.ft a:hover{text-decoration:underline}

.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:100px;font-size:.72rem;font-weight:600;margin-left:10px}
.badge-open{background:#e6f9ef;color:#2d9e5e}

@media(max-width:600px){
  .hd{flex-direction:column;text-align:center;gap:20px}
  .meta{justify-content:center}
  .stats{gap:20px;flex-wrap:wrap}
  .ht h1{font-size:1.7rem}
}
</style>
</head>
<body>
<div class="wrap">
<header>
  <div class="hd">
    <img class="avatar" src="${esc(profile.avatar)}" alt="${esc(profile.name)}">
    <div class="ht">
      <h1>${esc(profile.name)}${profile.hireable ? `<span class="badge badge-open">Open to work</span>` : ''}</h1>
      <p class="handle">@${esc(profile.username)}</p>
      ${profile.bio ? `<p class="bio">${esc(profile.bio)}</p>` : ''}
      <div class="meta">
        ${profile.location ? `<span class="ml">${locIcon}${esc(profile.location)}</span>` : ''}
        ${profile.company ? `<span class="ml">${officeIcon}${esc(profile.company)}</span>` : ''}
        ${profile.blog ? `<a class="ml" href="${safeUrl(profile.blog)}" target="_blank" rel="noopener">${linkIcon}${esc(profile.blog.replace(/^https?:\/\//, ''))}</a>` : ''}
        ${profile.twitter ? `<a class="ml" href="https://twitter.com/${esc(profile.twitter)}" target="_blank" rel="noopener">${twitterIcon}@${esc(profile.twitter)}</a>` : ''}
        <a class="ml" href="https://github.com/${esc(profile.username)}" target="_blank" rel="noopener">${ghIcon}GitHub</a>
      </div>
    </div>
  </div>
</header>

<div class="stats">
  <div><span class="sv">${profile.public_repos}</span><span class="sl">Repos</span></div>
  <div><span class="sv">${stats?.totalStars || 0}</span><span class="sl">Stars</span></div>
  <div><span class="sv">${profile.followers}</span><span class="sl">Followers</span></div>
  <div><span class="sv">${profile.following}</span><span class="sl">Following</span></div>
</div>

${repos.length ? `
<section>
  <p class="st">Featured Projects</p>
  <div class="grid">
    ${repos.map(r => `
    <a class="card" href="${esc(r.url)}" target="_blank" rel="noopener">
      <div class="cn">${esc(r.name)}</div>
      <div class="cd">${esc(r.description || 'No description provided.')}</div>
      <div class="cm">
        ${r.language ? `<span><span class="dot" style="background:${LANG_COLORS[r.language] || '#9490b8'}"></span>${esc(r.language)}</span>` : ''}
        ${r.stars > 0 ? `<span>★ ${r.stars}</span>` : ''}
        ${r.forks > 0 ? `<span>⑂ ${r.forks}</span>` : ''}
      </div>
      ${r.topics.slice(0, 3).map(t => `<span class="tag">${esc(t)}</span>`).join('')}
    </a>`).join('')}
  </div>
</section>` : ''}

${topLangs.length ? `
<section>
  <p class="st">Languages & Technologies</p>
  <div class="pills">
    ${topLangs.map(({ lang }) => `
    <div class="pill">
      <span class="dot" style="background:${LANG_COLORS[lang] || '#9490b8'}"></span>
      ${esc(lang)}
    </div>`).join('')}
  </div>
</section>` : ''}

<footer>
  <p class="ft">
    © ${yr} ${esc(profile.name)} ·
    <a href="https://github.com/${esc(profile.username)}" target="_blank" rel="noopener">View on GitHub</a>
    · Built with Portfolio Generator
  </p>
</footer>
</div>
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
const linkIcon = `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`
const twitterIcon = `<svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>`
const ghIcon = `<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`
const officeIcon = `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
