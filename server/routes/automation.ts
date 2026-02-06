import { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()

interface PlaybookSummary {
  slug: string
  title: string
  metaDescription: string
  tool: string
  useCase: string
  industry: string
  excerpt: string
  readTime: number
  datePublished: string
}

interface PlaybookPage {
  slug: string
  title: string
  metaDescription: string
  tool: string
  useCase: string
  industry: string
  datePublished: string
  readTime: number
  excerpt: string
  sections: {
    intro: string
    benefits: string
    workflow: string
    steps: string
    results: string
    faq: string
  }
}

function getDataDirectory(): string {
  const prodPath = path.join(process.cwd(), 'data', 'programmatic-seo')
  const devPath = path.join(__dirname, '..', '..', 'data', 'programmatic-seo')

  if (fs.existsSync(prodPath)) return prodPath
  if (fs.existsSync(devPath)) return devPath

  return prodPath
}

// GET /api/automation - Get all playbook summaries
router.get('/', async (_req: Request, res: Response) => {
  try {
    const dataDir = getDataDirectory()
    const indexPath = path.join(dataDir, 'index.json')

    if (!fs.existsSync(indexPath)) {
      return res.json({ pages: [] })
    }

    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'))
    res.json(indexData)
  } catch (error) {
    console.error('Error fetching automation index:', error)
    res.status(500).json({ error: 'Failed to fetch automation playbooks' })
  }
})

// GET /api/automation/filters - Get available filters
router.get('/filters', async (_req: Request, res: Response) => {
  try {
    const dataDir = getDataDirectory()
    const indexPath = path.join(dataDir, 'index.json')

    if (!fs.existsSync(indexPath)) {
      return res.json({ tools: [], useCases: [], industries: [] })
    }

    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'))
    const pages: PlaybookSummary[] = indexData.pages || []

    const tools = [...new Set(pages.map(p => p.tool).filter(Boolean))]
    const useCases = [...new Set(pages.map(p => p.useCase).filter(Boolean))]
    const industries = [...new Set(pages.map(p => p.industry).filter(Boolean))]

    res.json({ tools, useCases, industries })
  } catch (error) {
    console.error('Error fetching filters:', error)
    res.status(500).json({ error: 'Failed to fetch filters' })
  }
})

// GET /api/automation/:slug - Get single playbook
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const dataDir = getDataDirectory()
    const pagePath = path.join(dataDir, 'pages', `${slug}.json`)

    if (!fs.existsSync(pagePath)) {
      return res.status(404).json({ error: 'Playbook not found' })
    }

    const pageData = JSON.parse(fs.readFileSync(pagePath, 'utf8'))
    res.json(pageData)
  } catch (error) {
    console.error('Error fetching playbook:', error)
    res.status(500).json({ error: 'Failed to fetch playbook' })
  }
})

export default router
