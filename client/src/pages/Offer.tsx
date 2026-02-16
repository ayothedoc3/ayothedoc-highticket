"use client";

import { useEffect } from "react";
import { Link } from "wouter";
import { Zap, ArrowRight, Check, Shield, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CheckoutLink } from "@/components/CheckoutLink";
import { trackEvent } from "@/lib/analytics";

export default function Offer() {
  const runtimeStripe = typeof window !== "undefined" ? window.__AY_CONFIG__?.stripe : undefined;
  const roadmapHref = runtimeStripe?.roadmap || (import.meta.env.VITE_STRIPE_ROADMAP_LINK as string | undefined);
  const sprintHref = runtimeStripe?.sprint || (import.meta.env.VITE_STRIPE_SPRINT_LINK as string | undefined);
  const careHref = runtimeStripe?.care || (import.meta.env.VITE_STRIPE_CARE_LINK as string | undefined);

  useEffect(() => {
    document.title = "Agency Ops Engine | Ayothedoc";
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute(
      "content",
      "Productized automation for marketing and web/dev agencies. Buy Roadmap, Ops Sprint, or Care Plan with self-serve checkout."
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/85 backdrop-blur-md border-b border-gray-800/50">
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

          <div className="hidden md:flex items-center gap-6">
            <Link href="/automation" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">
              Playbooks
            </Link>
            <Link href="/blog" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">
              Blog
            </Link>
            <Link href="/playbook" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">
              Outbound Playbook
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">
              Contact
            </Link>
          </div>

          <CheckoutLink
            href={sprintHref}
            label="Buy Sprint"
            cta="nav_buy_sprint"
            className="bg-lime-400 text-gray-950 hover:bg-lime-500 font-semibold"
            size="sm"
          />
        </div>
      </nav>

      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center rounded-3xl border border-lime-400/20 bg-gradient-to-b from-lime-400/5 to-transparent p-8 md:p-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-sm font-semibold tracking-wider uppercase">
              Agency Ops Engine
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mt-6">
              Choose how you want to buy
              <span className="text-lime-400"> leverage</span>
            </h1>
            <p className="text-xl text-gray-400 mt-6 leading-relaxed max-w-4xl mx-auto">
              We install systems for agencies:{" "}
              {"lead intake -> onboarding -> delivery -> reporting -> retention"}.
              Checkout is self-serve. Scope is fixed. Outcomes are measurable.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <CheckoutLink
                href={sprintHref}
                label="Buy Ops Sprint - from $7,500"
                cta="hero_buy_sprint"
                className="bg-lime-400 hover:bg-lime-500 text-gray-950 font-bold text-lg px-8 py-6 rounded-full shadow-lg"
              />
              <CheckoutLink
                href={roadmapHref}
                label="Buy Roadmap - $499"
                cta="hero_buy_roadmap"
                variant="outline"
                className="border-lime-400/40 text-lime-400 hover:bg-lime-400/10 font-bold text-lg px-8 py-6 rounded-full"
              />
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Need a quick fit check first?{" "}
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

        <section className="container mx-auto px-4 mt-14">
          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800/60 hover:border-lime-400/40 transition">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-400">Roadmap</div>
              <h2 className="text-2xl font-semibold mt-3">Scope and prioritize</h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                Get clarity on what to automate first, what it saves, and how to implement.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                {[
                  "Workflow map and bottleneck diagnosis",
                  "ROI-prioritized implementation backlog",
                  "System architecture and timeline",
                  "Delivered in 48-72 hours",
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
                  label="Buy Roadmap - $499"
                  cta="card_buy_roadmap"
                  className="w-full bg-gray-800 text-gray-100 hover:bg-gray-700"
                />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-lime-400/10 border border-lime-400/35 hover:border-lime-400/60 transition">
              <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Most popular</div>
              <h2 className="text-2xl font-semibold mt-3">Agency Ops Sprint</h2>
              <p className="text-gray-300 mt-3 leading-relaxed">
                We implement 4-6 automations end-to-end, train your team, and hand off SOPs.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-300">
                {[
                  "Lead intake -> routing -> follow-up",
                  "Onboarding: contract -> invoice -> kickoff",
                  "Delivery status updates and PM templates",
                  "Client reporting dashboard and alerts",
                  "Loom walkthrough and team handoff",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-lime-300 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CheckoutLink
                  href={sprintHref}
                  label="Buy Ops Sprint - from $7,500"
                  cta="card_buy_sprint"
                  className="w-full bg-lime-400 text-gray-950 hover:bg-lime-500 font-semibold"
                />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800/60 hover:border-cyan-400/40 transition">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-400">Care Plan</div>
              <h2 className="text-2xl font-semibold mt-3">Protect and improve</h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                Ongoing monitoring, fixes, and iteration so your systems stay reliable.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                {[
                  "Bug fixes and incident response",
                  "Monthly improvement hours",
                  "KPI review and recommendations",
                  "Support through stack changes",
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
                  label="Start Care - from $1,500/mo"
                  cta="card_buy_care"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mt-14">
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Track A: Lead-to-Booked",
                items: ["Forms -> CRM", "Routing and scoring", "Instant follow-up", "Calendar reminders"],
              },
              {
                title: "Track B: Onboarding-to-Delivery",
                items: ["Proposal and contract", "Invoice and payment", "Kickoff automation", "PM update loops"],
              },
              {
                title: "Track C: Reporting-to-Retention",
                items: ["Dashboards", "Client reports", "Alerts and QA", "Renewal reminders"],
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

        <section className="container mx-auto px-4 mt-14">
          <div className="max-w-5xl mx-auto p-10 rounded-3xl bg-gray-900/40 border border-gray-800/60">
            <h2 className="text-3xl md:text-4xl font-bold text-center">What happens after checkout</h2>
            <p className="text-gray-400 mt-4 leading-relaxed text-center max-w-3xl mx-auto">
              Pay first, then we execute. The process is fast and structured.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-4">
              {[
                { step: "1", title: "Checkout", description: "Secure Stripe payment and instant confirmation." },
                { step: "2", title: "Intake", description: "You submit stack access, goals, and constraints." },
                { step: "3", title: "Build", description: "We implement and QA your selected track." },
                { step: "4", title: "Handoff", description: "SOPs, walkthroughs, and team training delivered." },
              ].map((item) => (
                <div key={item.step} className="p-6 rounded-2xl bg-gray-950/40 border border-gray-800/60">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Step {item.step}</div>
                  <div className="text-lg font-semibold mt-2">{item.title}</div>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-lime-400" />
                <span>40-hour guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-lime-400" />
                <span>Fast onboarding after payment</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-lime-400" />
                <span>Self-serve checkout</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mt-10">
          <div className="max-w-6xl mx-auto flex justify-center">
            <Link href="/" onClick={() => trackEvent("cta_click", { cta: "offer_back_home", destination: "/" })}>
              <Button variant="ghost" className="text-gray-400 hover:text-lime-400">
                Back to main site
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
