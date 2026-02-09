import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Zap } from 'lucide-react'

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

interface Filters {
  tools: string[]
  useCases: string[]
  industries: string[]
}

export default function Automation() {
  const [playbooks, setPlaybooks] = useState<PlaybookSummary[]>([])
  const [filters, setFilters] = useState<Filters>({ tools: [], useCases: [], industries: [] })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({
    tool: '',
    useCase: '',
    industry: ''
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/automation').then(r => r.json()),
      fetch('/api/automation/filters').then(r => r.json())
    ]).then(([data, filterData]) => {
      setPlaybooks(data.pages || [])
      setFilters(filterData)
      setLoading(false)
    }).catch(err => {
      console.error('Error fetching automation data:', err)
      setLoading(false)
    })
  }, [])

  const filteredPlaybooks = playbooks.filter(playbook => {
    if (activeFilters.tool && playbook.tool !== activeFilters.tool) return false
    if (activeFilters.useCase && playbook.useCase !== activeFilters.useCase) return false
    if (activeFilters.industry && playbook.industry !== activeFilters.industry) return false
    if (searchQuery) {
      const haystack = [playbook.title, playbook.metaDescription, playbook.excerpt, playbook.tool, playbook.useCase, playbook.industry]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(searchQuery.toLowerCase())
    }
    return true
  })

  const toggleFilter = (type: 'tool' | 'useCase' | 'industry', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gray-950" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg text-lime-400">Ayothedoc</div>
              <div className="text-[11px] text-gray-500">Agency ops automation</div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-lime-400">
                Blog
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-lime-400">
                Contact
              </Button>
            </Link>
            <Link href="/offer">
              <Button variant="outline" size="sm" className="border-lime-400/30 text-lime-400 hover:bg-lime-400/10">
                View Offer
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(163, 230, 53, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative text-center max-w-3xl">
          <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Automation Playbooks
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Launch-ready <span className="text-lime-400">automation strategies</span> for your team
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Browse automation blueprints covering tools, use cases, and industries we implement every week.
            Each playbook maps the problem, workflow, and ROI so you can launch fast.
          </p>

          {/* Search */}
          <div className="flex gap-3 max-w-lg mx-auto">
            <Input
              type="search"
              placeholder="Search playbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border-gray-700 focus:border-lime-400"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-gray-800/50">
        <div className="container mx-auto px-4 space-y-6">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tool</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilters.tool ? "outline" : "default"}
                size="sm"
                onClick={() => setActiveFilters(prev => ({ ...prev, tool: '' }))}
                className={activeFilters.tool
                  ? "border-gray-700 text-gray-400 hover:text-lime-400 hover:border-lime-400/30"
                  : "bg-lime-400 text-gray-950 hover:bg-lime-500"}
              >
                All tools
              </Button>
              {filters.tools.map((tool) => (
                <Button
                  key={tool}
                  variant={activeFilters.tool === tool ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('tool', tool)}
                  className={activeFilters.tool === tool
                    ? "bg-lime-400 text-gray-950 hover:bg-lime-500"
                    : "border-gray-700 text-gray-400 hover:text-lime-400 hover:border-lime-400/30"}
                >
                  {tool}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Use case</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilters.useCase ? "outline" : "default"}
                size="sm"
                onClick={() => setActiveFilters(prev => ({ ...prev, useCase: '' }))}
                className={activeFilters.useCase
                  ? "border-gray-700 text-gray-400 hover:text-lime-400 hover:border-lime-400/30"
                  : "bg-lime-400 text-gray-950 hover:bg-lime-500"}
              >
                All use cases
              </Button>
              {filters.useCases.map((useCase) => (
                <Button
                  key={useCase}
                  variant={activeFilters.useCase === useCase ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('useCase', useCase)}
                  className={activeFilters.useCase === useCase
                    ? "bg-lime-400 text-gray-950 hover:bg-lime-500"
                    : "border-gray-700 text-gray-400 hover:text-lime-400 hover:border-lime-400/30"}
                >
                  {useCase}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Industry</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilters.industry ? "outline" : "default"}
                size="sm"
                onClick={() => setActiveFilters(prev => ({ ...prev, industry: '' }))}
                className={activeFilters.industry
                  ? "border-gray-700 text-gray-400 hover:text-lime-400 hover:border-lime-400/30"
                  : "bg-lime-400 text-gray-950 hover:bg-lime-500"}
              >
                All industries
              </Button>
              {filters.industries.map((industry) => (
                <Button
                  key={industry}
                  variant={activeFilters.industry === industry ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('industry', industry)}
                  className={activeFilters.industry === industry
                    ? "bg-lime-400 text-gray-950 hover:bg-lime-500"
                    : "border-gray-700 text-gray-400 hover:text-lime-400 hover:border-lime-400/30"}
                >
                  {industry}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading playbooks...</p>
            </div>
          ) : filteredPlaybooks.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-3">No playbooks match your filters yet</h3>
              <p className="text-gray-400 mb-6">Reset the filters or reach out and we will draft a custom automation plan for you.</p>
              <Link href="/contact">
                <Button className="bg-lime-400 text-gray-950 hover:bg-lime-500">
                  Request a custom workflow
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {filteredPlaybooks.map((playbook) => (
                <article
                  key={playbook.slug}
                  className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-lime-400/30 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-xs uppercase tracking-wider px-2 py-1 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
                      {playbook.tool}
                    </span>
                    <span className="text-xs uppercase tracking-wider px-2 py-1 rounded-full bg-gray-800 text-gray-400">
                      {playbook.useCase}
                    </span>
                    <span className="text-xs uppercase tracking-wider px-2 py-1 rounded-full bg-gray-800 text-gray-400">
                      {playbook.industry}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-lime-400 transition-colors">
                    {playbook.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {playbook.excerpt || playbook.metaDescription}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {playbook.readTime ? `${playbook.readTime} min read` : 'Quick read'}
                    </span>
                    <Link
                      href={`/automation/${playbook.slug}`}
                      className="inline-flex items-center gap-2 text-lime-400 font-semibold hover:text-lime-300 transition"
                    >
                      View playbook &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-950" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-lime-400">Ayothedoc</div>
                <div className="text-[11px] text-gray-500">Agency ops automation</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Ayothedoc. All rights reserved.
            </p>
            <Link href="/" className="text-sm text-lime-400 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
