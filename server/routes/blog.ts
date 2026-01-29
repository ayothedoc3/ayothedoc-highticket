import { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()

// In production, content is in /app/content/posts, in dev it's in ../content/posts
function getPostsDirectory(): string {
  const prodPath = path.join(process.cwd(), 'content', 'posts')
  const devPath = path.join(__dirname, '..', '..', 'content', 'posts')

  if (fs.existsSync(prodPath)) return prodPath
  if (fs.existsSync(devPath)) return devPath

  // Create if doesn't exist
  fs.mkdirSync(prodPath, { recursive: true })
  return prodPath
}

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  image: string
  published: boolean
  author: string
  tags: string[]
}

export interface Post {
  meta: PostMeta
  html: string
}

async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const postsDirectory = getPostsDirectory()

    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx?$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data } = matter(fileContents)

          return {
            slug,
            title: data.title || '',
            excerpt: data.excerpt || '',
            date: data.date || '',
            category: data.category || '',
            readTime: data.readTime || '',
            image: data.image || '',
            published: data.published !== false,
            author: data.author || '',
            tags: data.tags || []
          } as PostMeta
        })
    )

    return allPostsData
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postsDirectory = getPostsDirectory()
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)

    let filePath = ''
    if (fs.existsSync(fullPath)) {
      filePath = fullPath
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(remarkHtml, { sanitize: false })
      .process(content)
    const html = processedContent.toString()

    return {
      meta: {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        category: data.category || '',
        readTime: data.readTime || '',
        image: data.image || '',
        published: data.published !== false,
        author: data.author || '',
        tags: data.tags || []
      },
      html
    }
  } catch (error) {
    console.error('Error reading post:', error)
    return null
  }
}

// GET /api/blog - Get all posts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

// GET /api/blog/categories - Get all categories
router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const posts = await getAllPosts()
    const categories = posts.map(post => post.category)
    const uniqueCategories = Array.from(new Set(categories)).filter(Boolean)
    res.json(uniqueCategories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// GET /api/blog/recent - Get recent posts
router.get('/recent', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 3
    const posts = await getAllPosts()
    res.json(posts.slice(0, limit))
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    res.status(500).json({ error: 'Failed to fetch recent posts' })
  }
})

// GET /api/blog/:slug - Get single post
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const post = await getPostBySlug(slug)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    res.status(500).json({ error: 'Failed to fetch post' })
  }
})

// GET /api/blog/category/:category - Get posts by category
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const { category } = req.params
    const posts = await getAllPosts()
    const filteredPosts = posts.filter(post => post.category === category)
    res.json(filteredPosts)
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

export default router
