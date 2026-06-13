import { useState } from 'react'
import { Github, Zap, Palette, Download, Star, Code2, Globe } from 'lucide-react'

export default function LandingPage({ onSubmit }) {
  const [username, setUsername] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (username.trim()) onSubmit(username.trim())
  }

  const examples = ['torvalds', 'gaearon', 'sindresorhus', 'addyosmani']

  return (
    <div className="min-h-screen bg-cream">
      {/* Navbar */}
      <nav className="border-b border-border bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-soft-purple rounded-lg flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-text-dark text-sm">PortfolioGen</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-light text-sm hover:text-text-dark transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-1.5 text-xs font-medium text-soft-purple mb-8 shadow-sm">
          <Star className="w-3.5 h-3.5" />
          Free · No signup · GitHub API
        </div>

        <h1 className="text-5xl font-bold text-text-dark leading-tight tracking-tight mb-5">
          Your GitHub profile,<br />
          <span className="text-soft-purple">turned into a portfolio.</span>
        </h1>
        <p className="text-text-mid text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Enter any GitHub username and get a beautiful, downloadable portfolio website in seconds.
          Pick from 3 themes. No account needed.
        </p>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto mb-5">
          <div className="flex-1 relative">
            <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-light" style={{width:'18px',height:'18px'}} />
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-text-dark placeholder-text-light text-sm focus:outline-none focus:ring-2 focus:ring-soft-purple/30 focus:border-soft-purple transition-all shadow-sm"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!username.trim()}
            className="px-6 py-3 bg-soft-purple text-white rounded-xl text-sm font-semibold hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Generate
          </button>
        </form>

        {/* Example usernames */}
        <p className="text-text-light text-xs mb-1">Try an example:</p>
        <div className="flex gap-2 justify-center flex-wrap">
          {examples.map(u => (
            <button
              key={u}
              onClick={() => { setUsername(u); }}
              className="px-3 py-1 bg-white border border-border rounded-full text-xs text-text-mid hover:border-soft-purple hover:text-soft-purple transition-colors"
            >
              @{u}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: <Zap className="w-5 h-5 text-soft-purple" />,
              title: 'Instant generation',
              desc: 'Pulls your repos, stars, languages, and bio automatically from the free GitHub API.'
            },
            {
              icon: <Palette className="w-5 h-5 text-soft-purple" />,
              title: '3 beautiful themes',
              desc: 'Minimal, Modern, and Creative — all with soft, professional color palettes.'
            },
            {
              icon: <Download className="w-5 h-5 text-soft-purple" />,
              title: 'Ready to deploy',
              desc: 'Download a single self-contained HTML file. Drop it on GitHub Pages, Netlify, or Vercel for free.'
            }
          ].map(f => (
            <div key={f.title} className="bg-white border border-border rounded-2xl p-6">
              <div className="w-10 h-10 bg-[#F5F0FF] rounded-xl flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-text-dark mb-2 text-sm">{f.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deploy targets strip */}
      <div className="border-t border-border bg-white/50 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-text-light text-xs uppercase tracking-widest mb-4 font-medium">Deploy for free on</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['GitHub Pages', 'Netlify', 'Vercel', 'Cloudflare Pages'].map(p => (
              <span key={p} className="flex items-center gap-2 text-text-mid text-sm font-medium">
                <Globe className="w-4 h-4 text-soft-purple" />
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
