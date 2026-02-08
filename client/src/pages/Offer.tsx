"use client";

import { useEffect } from "react";
import { Link } from "wouter";
import { Zap, ArrowRight, Check, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CheckoutLink } from "@/components/CheckoutLink";
import { trackEvent } from "@/lib/analytics";

export default function Offer() {
  const roadmapHref = import.meta.env.VITE_STRIPE_ROADMAP_LINK as string | undefined;
  const sprintHref = import.meta.env.VITE_STRIPE_SPRINT_LINK as string | undefined;
  const careHref = import.meta.env.VITE_STRIPE_CARE_LINK as string | undefined;

  useEffect(() => {
    document.title = "Agency Ops Engine | Ayothedoc";
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute(
      "content",
      "Productized automation for marketing + web/dev agencies. Buy a roadmap, sprint, or care plan—lead-to-reporting installed fast."
    );
  }, []);

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

          <div className="hidden md:flex items-center gap-6">
            <Link href="/automation" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">
              Playbooks
            </Link>
            <Link href="/blog" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <CheckoutLink
              href={sprintHref}
              label="Buy Sprint"
              cta="nav_buy_sprint"
              className="bg-lime-400 text-gray-950 hover:bg-lime-500 font-semibold"
              size="sm"
            />
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-sm font-semibold tracking-wider uppercase">
              Agency Ops Engine
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mt-6">
              Productized automation for{" "}
              <span className="text-lime-400">marketing + web/dev agencies</span>
            </h1>
            <p className="text-xl text-gray-400 mt-6 leading-relaxed">
              Install a repeatable system for lead intake, onboarding, delivery, reporting, and retention—without
              hiring another ops person.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <CheckoutLink
                href={sprintHref}
                label="Buy Ops Sprint — from $7,500"
                cta="hero_buy_sprint"
                className="bg-lime-400 hover:bg-lime-500 text-gray-950 font-bold text-lg px-8 py-6 rounded-full shadow-lg"
              />
              <CheckoutLink
                href={roadmapHref}
                label="Buy Roadmap — $499"
                cta="hero_buy_roadmap"
                variant="outline"
                className="border-lime-400/40 text-lime-400 hover:bg-lime-400/10 font-bold text-lg px-8 py-6 rounded-full"
              />
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Pay securely via Stripe. Prefer a quick fit check?{" "}
              <a
                href="https://calendly.com/ayothedoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:underline"
                onClick={() => trackEvent("cta_click", { cta: "offer_hero_book_call", destination: "calendly" })}
              >
                Book 15 minutes
              </a>
              .
            </p>
          </div>
        </section>

        {/* Packages */}
        <section className="container mx-auto px-4 mt-14">
          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800/60 hover:border-lime-400/40 transition">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-400">Roadmap</div>
              <h2 className="text-2xl font-semibold mt-3">Automation Audit + Build Plan</h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                A scoped plan you can execute internally—or hand to us as a Sprint.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                {[
                  "Prioritized workflow map + quick wins",
                  "Tool-by-tool implementation steps",
                  "ROI estimate and timeline",
                  "48–72h delivery",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-lime-400 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CheckoutLink
                  href={roadmapHref}
                  label="Buy Roadmap — $499"
                  cta="card_buy_roadmap"
                  className="w-full bg-gray-800 text-gray-100 hover:bg-gray-700"
                />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-lime-400/5 border border-lime-400/25 hover:border-lime-400/50 transition">
              <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Most popular</div>
              <h2 className="text-2xl font-semibold mt-3">Agency Ops Sprint</h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                We install 4–6 automations end-to-end, train your team, and ship SOPs.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                {[
                  "Lead routing + follow-ups + booked calls",
                  "Onboarding: contract, invoice, kickoff",
                  "Delivery: PM templates + status updates",
                  "Reporting: dashboards + client reports",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-lime-400 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CheckoutLink
                  href={sprintHref}
                  label="Buy Ops Sprint — from $7,500"
                  cta="card_buy_sprint"
                  className="w-full bg-lime-400 text-gray-950 hover:bg-lime-500 font-semibold"
                />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800/60 hover:border-cyan-400/40 transition">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-400">Recurring</div>
              <h2 className="text-2xl font-semibold mt-3">Ops Care Plan</h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                Monitoring, fixes, and continuous improvements so your systems don’t rot.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                {[
                  "Bug fixes + incident response",
                  "Monthly improvement hours",
                  "Reporting + KPI review",
                  "Tool changes handled",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-lime-400 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CheckoutLink
                  href={careHref}
                  label="Start Care — from $1,500/mo"
                  cta="card_buy_care"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tracks */}
        <section className="container mx-auto px-4 mt-14">
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Track A: Lead-to-Booked",
                items: ["Forms → CRM", "Routing + scoring", "Instant follow-up", "Calendar + reminders"],
              },
              {
                title: "Track B: Onboarding-to-Delivery",
                items: ["Proposal/contract", "Invoice/payment", "Kickoff automation", "PM templates + updates"],
              },
              {
                title: "Track C: Reporting-to-Retention",
                items: ["Dashboards", "Client reporting", "Alerts + QA", "Renewal + QBR reminders"],
              },
            ].map((track) => (
              <div key={track.title} className="p-8 rounded-2xl bg-gray-900/30 border border-gray-800/60">
                <h3 className="text-lg font-semibold">{track.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-400">
                  {track.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-lime-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section className="container mx-auto px-4 mt-14">
          <div className="max-w-4xl mx-auto text-center p-10 rounded-3xl bg-gray-900/30 border border-gray-800/60">
            <h2 className="text-3xl md:text-4xl font-bold">Works with your stack</h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              HubSpot, Pipedrive, ClickUp, Asana, Slack, Google Workspace, Stripe, QuickBooks, Notion, Zapier, Make.com,
              n8n—bring what you use.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <CheckoutLink
                href={sprintHref}
                label="Buy Ops Sprint"
                cta="bottom_buy_sprint"
                className="bg-lime-400 text-gray-950 hover:bg-lime-500 font-semibold rounded-full px-10"
              />
              <CheckoutLink
                href={roadmapHref}
                label="Start with Roadmap"
                cta="bottom_buy_roadmap"
                variant="outline"
                className="rounded-full px-10 border-lime-400/40 text-lime-400 hover:bg-lime-400/10"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-lime-400" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-lime-400" />
                <span>Fast onboarding after payment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <section className="container mx-auto px-4 mt-10">
          <div className="max-w-6xl mx-auto flex justify-center">
            <Link href="/" onClick={() => trackEvent("cta_click", { cta: "offer_back_home", destination: "/" })}>
              <Button variant="ghost" className="text-gray-400 hover:text-lime-400">
                ← Back to main site
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

