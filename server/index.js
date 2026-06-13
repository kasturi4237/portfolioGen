import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import githubRoutes from './routes/github.js'
import generateRoutes from './routes/generate.js'

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.use('/api/github', githubRoutes)
app.use('/api/generate', generateRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
