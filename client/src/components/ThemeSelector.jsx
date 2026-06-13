import { Check } from 'lucide-react'

const THEMES = [
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Clean white, typography-focused',
    preview: {
      bg: '#ffffff',
      accent: '#7B6BE8',
      text: '#1e1b3a',
      card: '#f8f5ff',
      border: '#ede9f8'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Soft lavender, gradient header',
    preview: {
      bg: '#F0EDFF',
      accent: '#7B6BE8',
      text: '#1e1b3a',
      card: '#ffffff',
      border: '#ede8f8'
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    desc: 'Warm cream, coral accents',
    preview: {
      bg: '#FEF9F5',
      accent: '#E87B5A',
      text: '#2D2420',
      card: '#ffffff',
      border: '#F2E8DF'
    }
  }
]

export default function ThemeSelector({ selected, onChange }) {
  return (
    <div className="space-y-2">
      {THEMES.map(theme => (
        <button
          key={theme.id}
          onClick={() => onChange(theme.id)}
          className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
            selected === theme.id
              ? 'border-soft-purple bg-[#F5F0FF] shadow-sm'
              : 'border-border bg-white hover:border-soft-purple/40 hover:bg-[#FAF8FF]'
          }`}
        >
          {/* Mini preview swatch */}
          <div
            className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden relative"
            style={{ background: theme.preview.bg, border: `1.5px solid ${theme.preview.border}` }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-3"
              style={{ background: theme.preview.accent, opacity: theme.id === 'modern' ? 1 : 0.15 }}
            />
            <div className="absolute bottom-1.5 left-1.5 right-1.5 flex flex-col gap-0.5">
              <div className="h-1 rounded-full" style={{ background: theme.preview.text, opacity: 0.5, width: '70%' }} />
              <div className="h-0.5 rounded-full" style={{ background: theme.preview.border, width: '100%' }} />
              <div className="h-0.5 rounded-full" style={{ background: theme.preview.border, width: '80%' }} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text-dark">{theme.name}</p>
            <p className="text-[11px] text-text-light truncate">{theme.desc}</p>
          </div>

          {selected === theme.id && (
            <div className="w-5 h-5 bg-soft-purple rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
