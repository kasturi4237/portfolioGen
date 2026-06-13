import { useState, useEffect, useCallback } from 'react'
import { Download, RefreshCw, ExternalLink, ChevronDown, Info } from 'lucide-react'
import ThemeSelector from './ThemeSelector'
import toast from 'react-hot-toast'

export default function PortfolioPreview({
  githubData, selectedTheme, onThemeChange,
  onDownload, onPreview, onReset
}) {
  const { profile, repos, languages, stats } = githubData
  const [previewHtml, setPreviewHtml] = useState(null)
  const [loadingPreview, setLoadingPreview] = useState(true)
  const [showDeploy, setShowDeploy] = useState(false)

  const loadPreview = useCallback(async () => {
    setLoadingPreview(true)
    const html = await onPreview()
    setPreviewHtml(html)
    setLoadingPreview(false)
  }, [selectedTheme]) // eslint-disable-line

  useEffect(() => { loadPreview() }, [loadPreview])

  const totalStars = stats?.totalStars || 0

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-border h-14 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-text-light text-sm hover:text-text-dark transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          New
        </button>
        <div className="h-5 w-px bg-border" />
        <div className="flex items-center gap-2 min-w-0">
          <img src={profile.avatar} alt="" className="w-6 h-6 rounded-full" />
          <span className="text-text-dark text-sm font-medium truncate">{profile.name}</span>
          <span className="text-text-light text-xs">@{profile.username}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setShowDeploy(s => !s)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-mid border border-border rounded-lg hover:border-soft-purple hover:text-soft-purple transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Deploy guide
            <ChevronDown className={`w-3 h-3 transition-transform ${showDeploy ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-soft-purple text-white text-xs font-semibold rounded-lg hover:bg-purple-600 transition-all shadow-sm hover:shadow active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            Download HTML
          </button>
        </div>
      </div>

      {/* Deploy guide dropdown */}
      {showDeploy && (
        <div className="bg-white border-b border-border px-5 py-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-text-dark mb-3 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-soft-purple" />
              How to deploy your portfolio for free
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-text-mid">
              <div className="bg-cream rounded-lg p-3 border border-border">
                <p className="font-semibold text-text-dark mb-1">GitHub Pages</p>
                <ol className="space-y-0.5 list-decimal list-inside text-text-light">
                  <li>Create a repo named <code className="bg-white px-1 rounded text-[10px]">username.github.io</code></li>
                  <li>Upload the HTML file as <code className="bg-white px-1 rounded text-[10px]">index.html</code></li>
                  <li>Enable Pages in repo Settings</li>
                </ol>
              </div>
              <div className="bg-cream rounded-lg p-3 border border-border">
                <p className="font-semibold text-text-dark mb-1">Netlify Drop</p>
                <ol className="space-y-0.5 list-decimal list-inside text-text-light">
                  <li>Go to netlify.com/drop</li>
                  <li>Drag & drop the HTML file</li>
                  <li>Live instantly — free forever</li>
                </ol>
              </div>
              <div className="bg-cream rounded-lg p-3 border border-border">
                <p className="font-semibold text-text-dark mb-1">Vercel</p>
                <ol className="space-y-0.5 list-decimal list-inside text-text-light">
                  <li>Put the HTML in a folder</li>
                  <li>Run <code className="bg-white px-1 rounded text-[10px]">vercel deploy</code></li>
                  <li>Or import the GitHub repo</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 bg-white border-r border-border overflow-y-auto scrollbar-thin p-4">
          {/* Stats summary */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold text-text-light uppercase tracking-widest mb-3">Stats</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Repos', value: profile.public_repos },
                { label: 'Stars', value: totalStars },
                { label: 'Followers', value: profile.followers },
                { label: 'Languages', value: languages.length }
              ].map(s => (
                <div key={s.label} className="bg-cream rounded-lg p-2.5 text-center border border-border">
                  <p className="text-base font-bold text-text-dark">{s.value}</p>
                  <p className="text-[10px] text-text-light">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Theme selector */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold text-text-light uppercase tracking-widest mb-3">Theme</p>
            <ThemeSelector selected={selectedTheme} onChange={onThemeChange} />
          </div>

          {/* Top languages */}
          {languages.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-text-light uppercase tracking-widest mb-3">Languages</p>
              <div className="flex flex-wrap gap-1.5">
                {languages.slice(0, 8).map(({ lang }) => (
                  <span key={lang} className="px-2 py-0.5 bg-[#F5F0FF] text-soft-purple text-[11px] rounded-full border border-border font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview iframe */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="bg-[#E8E4F0] px-4 py-2 flex items-center gap-2 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
              <div className="w-3 h-3 rounded-full bg-[#FFD93D]" />
              <div className="w-3 h-3 rounded-full bg-[#6BCB77]" />
            </div>
            <div className="flex-1 bg-white rounded-md px-3 py-1 text-[11px] text-text-light border border-border text-center">
              {profile.username}-portfolio.html
            </div>
          </div>
          <div className="flex-1 overflow-hidden relative">
            {loadingPreview ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-border border-t-soft-purple rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-text-light text-sm">Rendering preview…</p>
                </div>
              </div>
            ) : previewHtml ? (
              <iframe
                srcDoc={previewHtml}
                className="w-full h-full border-none"
                title="Portfolio preview"
                sandbox="allow-same-origin allow-popups"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-cream">
                <p className="text-text-light text-sm">Preview unavailable. Click Download to get your portfolio.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
