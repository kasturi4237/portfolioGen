export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-border"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-soft-purple animate-spin"></div>
      </div>
      <div className="text-center">
        <p className="text-text-dark font-semibold text-lg">Fetching GitHub data…</p>
        <p className="text-text-light text-sm mt-1">Pulling repos, languages & stats</p>
      </div>
    </div>
  )
}
