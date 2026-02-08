import { useState, useEffect } from 'react'
import { Link, useParams } from 'wouter'
import { Button } from '@/components/ui/button'
import { Zap, ArrowLeft } from 'lucide-react'

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

interface PlaybookSummary {
  slug: string
  title: string
  metaDescription: string
  tool: string
  useCase: string
  industry: string
  excerpt: string
  readTime: number
}

export default function AutomationPlaybook() {
  const { slug } = useParams<{ slug: string }>()
  const [playbook, setPlaybook] = useState<PlaybookPage | null>(null)
  const [related, setRelated] = useState<PlaybookSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return

    Promise.all([
      fetch(`/api/automation/${slug}`).then(r => {
        if (!r.ok) throw new Error('Playbook not found')
        return r.json()
      }),
      fetch('/api/automation').then(r => r.json())
    ]).then(([data, indexData]) => {
      setPlaybook(data)
      const allPlaybooks: PlaybookSummary[] = indexData.pages || []
      setRelated(allPlaybooks.filter(p => p.slug !== slug).slice(0, 3))
      setLoading(false)
      document.title = `${data.title} | Automation Playbooks | Ayothedoc`
    }).catch(err => {
      console.error('Error fetching playbook:', err)
      setError('Playbook not found')
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
          <div className="container mx-auto px-4 flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-950" />
              </div>
              <span className="font-bold text-lg text-lime-400">Ayothedoc</span>
            </Link>
          </div>
        </nav>
        <main className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading playbook...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error || !playbook) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
          <div className="container mx-auto px-4 flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-950" />
              </div>
              <span className="font-bold text-lg text-lime-400">Ayothedoc</span>
            </Link>
          </div>
        </nav>
        <main className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Playbook Not Found</h1>
            <p className="text-gray-400 mb-6">The automation playbook you're looking for doesn't exist.</p>
            <Link href="/automation">
              <Button className="bg-lime-400 text-gray-950 hover:bg-lime-500">
                Browse all playbooks
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
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
            <span className="font-bold text-lg text-lime-400">Ayothedoc</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/automation">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-lime-400">
                Playbooks
              </Button>
            </Link>
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

      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link href="/automation" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-lime-400 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            All Playbooks
          </Link>

          {/* Meta tags */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
              {playbook.tool}
            </span>
            <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-gray-800 text-gray-400">
              {playbook.useCase}
            </span>
            <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-gray-800 text-gray-400">
              {playbook.industry}
            </span>
            {playbook.readTime && (
              <span className="text-xs text-gray-500 ml-2">{playbook.readTime} min read</span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {playbook.title}
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-relaxed">{playbook.metaDescription}</p>

          {/* Who this is for */}
          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-lime-400">Who this playbook is for</h2>
            <p className="text-gray-400 leading-relaxed">
              Built for teams that want to ship this automation in the next 30 days. Use the workflow below as your implementation
              checklist or pass it to our team to deliver for you.
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-12 [&_p]:text-gray-300 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ul]:text-gray-300 [&_li]:leading-relaxed [&_ol]:space-y-3 [&_ol]:text-gray-300 [&_strong]:text-gray-100 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-gray-100 [&_h4]:mt-6 [&_h4]:mb-2">
            {playbook.sections.intro && (
              <section dangerouslySetInnerHTML={{ __html: playbook.sections.intro }} />
            )}

            {playbook.sections.benefits && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                <div dangerouslySetInnerHTML={{ __html: playbook.sections.benefits }} />
              </section>
            )}

            {playbook.sections.workflow && (
              <section className="p-6 rounded-2xl bg-lime-400/5 border border-lime-400/20">
                <h2 className="text-2xl font-bold mb-3 text-lime-400">Workflow Overview</h2>
                <div dangerouslySetInnerHTML={{ __html: playbook.sections.workflow }} />
              </section>
            )}

            {playbook.sections.steps && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Implementation Steps</h2>
                <div dangerouslySetInnerHTML={{ __html: playbook.sections.steps }} />
              </section>
            )}

            {playbook.sections.results && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Expected Results & ROI</h2>
                <div dangerouslySetInnerHTML={{ __html: playbook.sections.results }} />
              </section>
            )}

            {playbook.sections.faq && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div dangerouslySetInnerHTML={{ __html: playbook.sections.faq }} />
              </section>
            )}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-500 text-gray-950">
            <h2 className="text-2xl font-bold mb-3">Launch this automation with Ayothedoc</h2>
            <p className="text-lg mb-6 max-w-2xl text-gray-800">
              We build, document, and train your team on this workflow. Choose a package, check out, and we’ll onboard you fast.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/offer">
                <Button className="bg-gray-950 text-lime-400 hover:bg-gray-800">
                  View Offer & Checkout
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-gray-950 text-gray-950 hover:bg-gray-950 hover:text-lime-400">
                  Talk to the team
                </Button>
              </Link>
            </div>
          </div>
        </article>

        {/* Related playbooks */}
        {related.length > 0 && (
          <section className="container mx-auto px-4 max-w-5xl mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related playbooks</h2>
              <Link href="/automation" className="text-sm text-lime-400 hover:underline font-semibold">
                View all
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((summary) => (
                <Link
                  key={summary.slug}
                  href={`/automation/${summary.slug}`}
                  className="group block p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-lime-400/30 transition-all duration-300"
                >
                  <div className="text-xs uppercase tracking-wider text-lime-400 mb-3">{summary.tool}</div>
                  <h3 className="text-lg font-bold group-hover:text-lime-400 transition-colors mb-3 line-clamp-2">
                    {summary.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{summary.excerpt || summary.metaDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-lime-400 font-semibold">
                    View playbook &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-950" />
              </div>
              <span className="font-bold text-lime-400">Ayothedoc</span>
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
