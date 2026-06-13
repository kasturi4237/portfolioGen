import { Router } from 'express'

const router = Router()

router.get('/:username', async (req, res) => {
  const { username } = req.params
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-generator-app'
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=30&type=owner`, { headers })
    ])

    if (profileRes.status === 404) {
      return res.status(404).json({ error: `User "${username}" not found on GitHub` })
    }
    if (profileRes.status === 403) {
      return res.status(429).json({
        error: 'GitHub API rate limit hit. Add a free GITHUB_TOKEN to server/.env for 5000 req/hr.'
      })
    }
    if (!profileRes.ok) {
      return res.status(profileRes.status).json({ error: 'GitHub API error' })
    }

    const profile = await profileRes.json()
    const allRepos = reposRes.ok ? await reposRes.json() : []

    const langMap = {}
    let totalStars = 0

    allRepos.forEach(repo => {
      totalStars += repo.stargazers_count
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1
      }
    })

    const topRepos = allRepos
      .filter(r => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
      .slice(0, 6)

    res.json({
      profile: {
        name: profile.name || profile.login,
        username: profile.login,
        bio: profile.bio || '',
        avatar: profile.avatar_url,
        location: profile.location || '',
        blog: profile.blog || '',
        email: profile.email || '',
        twitter: profile.twitter_username || '',
        followers: profile.followers,
        following: profile.following,
        public_repos: profile.public_repos,
        company: profile.company || '',
        hireable: profile.hireable || false
      },
      repos: topRepos.map(r => ({
        name: r.name,
        description: r.description || '',
        url: r.html_url,
        homepage: r.homepage || '',
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language || '',
        topics: r.topics || [],
        updated_at: r.updated_at
      })),
      languages: Object.entries(langMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([lang, count]) => ({ lang, count })),
      stats: { totalStars, totalRepos: profile.public_repos, followers: profile.followers }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch GitHub data' })
  }
})

export default router
