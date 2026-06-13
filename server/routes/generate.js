import { Router } from 'express'
import { generatePortfolio } from '../utils/templateEngine.js'

const router = Router()

router.post('/', (req, res) => {
  const { githubData, theme = 'minimal' } = req.body

  if (!githubData?.profile) {
    return res.status(400).json({ error: 'Missing GitHub data' })
  }

  try {
    const html = generatePortfolio(githubData, theme)
    const filename = `${githubData.profile.username}-portfolio.html`

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(html)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate portfolio' })
  }
})

export default router
