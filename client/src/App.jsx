import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import LandingPage from './components/LandingPage'
import PortfolioPreview from './components/PortfolioPreview'
import LoadingSpinner from './components/LoadingSpinner'

export default function App() {
  const [step, setStep] = useState('landing')
  const [githubData, setGithubData] = useState(null)
  const [selectedTheme, setSelectedTheme] = useState('minimal')

  async function handleFetch(username) {
    setStep('loading')
    try {
      const { data } = await axios.get(`/api/github/${username.trim()}`)
      setGithubData(data)
      setStep('preview')
      toast.success(`Loaded ${data.profile.name}'s GitHub profile!`)
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to fetch GitHub data'
      toast.error(msg)
      setStep('landing')
    }
  }

  async function handleDownload() {
    const toastId = toast.loading('Generating portfolio…')
    try {
      const res = await axios.post(
        '/api/generate',
        { githubData, theme: selectedTheme },
        { responseType: 'blob' }
      )
      const url = URL.createObjectURL(new Blob([res.data], { type: 'text/html' }))
      const a = document.createElement('a')
      a.href = url
      a.download = `${githubData.profile.username}-portfolio.html`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Portfolio downloaded!', { id: toastId })
    } catch {
      toast.error('Download failed. Try again.', { id: toastId })
    }
  }

  async function handlePreview() {
    try {
      const res = await axios.post(
        '/api/generate',
        { githubData, theme: selectedTheme },
        { responseType: 'text' }
      )
      return res.data
    } catch {
      return null
    }
  }

  function handleReset() {
    setStep('landing')
    setGithubData(null)
    setSelectedTheme('minimal')
  }

  if (step === 'loading') return <LoadingSpinner />

  if (step === 'preview') {
    return (
      <PortfolioPreview
        githubData={githubData}
        selectedTheme={selectedTheme}
        onThemeChange={setSelectedTheme}
        onDownload={handleDownload}
        onPreview={handlePreview}
        onReset={handleReset}
      />
    )
  }

  return <LandingPage onSubmit={handleFetch} />
}
