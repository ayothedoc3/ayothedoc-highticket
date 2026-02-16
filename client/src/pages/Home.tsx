/*
 * DESIGN: AI-native agency landing page
 * Structure: Hero -> Market Shift -> Build Path -> Proof -> CTA
 * Colors: Dark with lime accents
 */

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  Zap,
  Shield,
  Clock,
  ChevronDown,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 720);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href="/offer">
        <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-semibold px-6 py-3 rounded-full shadow-lg glow-lime pulse-cta">
          View Offer
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#a3e635] flex items-center justify-center">
            <Zap className="h-5 w-5 text-black" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
              Ayothedoc
            </div>
            <div className="text-[11px] text-muted-foreground">Agency ops automation</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#market-shift" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Market Shift
          </a>
          <a href="#build-path" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Build Path
          </a>
          <a href="#proof" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Proof
          </a>
          <Link href="/offer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Offer
          </Link>
          <Link href="/playbook" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Outbound Playbook
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/offer">
            <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-semibold rounded-full px-5">
              View Offer
            </Button>
          </Link>
          <Link href="/contact" className="hidden sm:inline-flex">
            <Button
              variant="outline"
              className="border-[#a3e635]/40 text-[#a3e635] hover:bg-[#a3e635]/10 font-semibold rounded-full px-5"
            >
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  const offers = [
    { name: "Roadmap", price: "$499", detail: "48-72h scoped plan" },
    { name: "Ops Sprint", price: "$7,500+", detail: "10-day implementation" },
    { name: "Care Plan", price: "$1,500+/mo", detail: "Ongoing optimization" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/hero-automation.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background z-0" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.14),transparent_48%),radial-gradient(circle_at_80%_30%,rgba(163,230,53,0.08),transparent_42%)]" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start"
        >
          <div>
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] text-sm font-medium">
                <Zap className="h-4 w-4" />
                AI-native model for agencies
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Sell leverage, not labor.
              <br />
              <span className="gradient-text">Build your agency ops engine.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed"
            >
              We install an end-to-end system for marketing and web/dev agencies:{" "}
              {"lead intake -> onboarding -> delivery -> reporting"}.
              You buy outcomes with self-serve checkout, not open-ended retainers.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid sm:grid-cols-3 gap-3 mb-10">
              {[
                "Form -> CRM -> follow-up -> booked call",
                "Payment -> kickoff -> project setup",
                "Weekly client reporting and alerts",
              ].map((item) => (
                <div key={item} className="p-4 rounded-xl border border-border bg-card/50 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/offer">
                <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-bold text-lg px-8 py-6 rounded-full glow-lime">
                  View Offer and Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-[#a3e635]/50 text-[#a3e635] hover:bg-[#a3e635]/10 font-semibold text-lg px-8 py-6 rounded-full"
                >
                  Ask a Question
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#a3e635]" />
                <span>Self-serve checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#a3e635]" />
                <span>40-hour guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#a3e635]" />
                <span>10-day sprint delivery</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="p-7 rounded-2xl border border-[#a3e635]/30 bg-card/70 backdrop-blur-md">
            <div className="text-xs uppercase tracking-wider text-[#a3e635]">What you can buy today</div>
            <h3 className="text-2xl font-bold mt-2" style={{ fontFamily: "var(--font-heading)" }}>
              Productized offer stack
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Start where you are: scope, implement, then stabilize.
            </p>

            <div className="mt-6 space-y-3">
              {offers.map((offer) => (
                <div key={offer.name} className="p-4 rounded-xl border border-border bg-background/50">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{offer.name}</div>
                    <div className="text-[#a3e635] font-bold">{offer.price}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{offer.detail}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20">
              <div className="text-sm font-semibold text-foreground">No sales call required</div>
              <div className="text-xs text-muted-foreground mt-1">
                Checkout first. We collect intake, confirm scope, and launch.
              </div>
            </div>

            <Link href="/offer" className="mt-6 inline-flex w-full">
              <Button className="w-full bg-[#a3e635] hover:bg-[#84cc16] text-black font-semibold rounded-full">
                Go to Offer Page
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#market-shift" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xs">Scroll to see the model</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

function MarketShiftSection() {
  return (
    <section id="market-shift" className="py-20 bg-secondary/30 border-y border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider">The split</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ fontFamily: "var(--font-heading)" }}>
              Agency model is splitting into two businesses
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp} className="rounded-2xl border border-red-500/30 bg-red-500/5 p-7">
              <div className="text-sm uppercase tracking-wide text-red-300">A) Sell labor</div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  "Revenue scales with headcount",
                  "Delivery margin gets squeezed",
                  "Knowledge stays in people, not systems",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-400 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-2xl border border-[#a3e635]/30 bg-[#a3e635]/5 p-7">
              <div className="text-sm uppercase tracking-wide text-[#a3e635]">B) Sell leverage</div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  "Revenue scales with reusable systems",
                  "Each sprint creates proprietary IP",
                  "Services fund productization and moat",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#a3e635] mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BuildPathSection() {
  return (
    <section id="build-path" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: "url(/images/value-stack-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider">Build path</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4" style={{ fontFamily: "var(--font-heading)" }}>
              How we build leverage in 30 days
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-5">
              {[
                {
                  step: "01",
                  title: "Roadmap (48-72h)",
                  description: "Identify highest-value workflow and lock scope.",
                },
                {
                  step: "02",
                  title: "Ops Sprint (10 days)",
                  description: "Build 4-6 automations end-to-end on your stack.",
                },
                {
                  step: "03",
                  title: "Care Plan (monthly)",
                  description: "Monitor, fix, and improve as volume grows.",
                },
              ].map((item) => (
                <div key={item.step} className="relative p-6 rounded-2xl bg-card/50 border border-border">
                  <div className="text-5xl font-bold text-[#a3e635]/10 absolute right-3 top-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold relative z-10" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 relative z-10">{item.description}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-card border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Workflow output</div>
              <h3 className="text-xl font-bold mt-2" style={{ fontFamily: "var(--font-heading)" }}>
                Example: lead-to-booked system
              </h3>
              <div className="mt-5 space-y-3">
                {[
                  "Website form submits lead",
                  "Lead is enriched and scored",
                  "Follow-up sequence starts in <60s",
                  "Calendar booking and owner routing",
                  "Project + tasks created after payment",
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-[#a3e635]/15 text-[#a3e635] text-xs font-semibold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section id="proof" className="py-24 bg-secondary/30">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider">Proof</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3" style={{ fontFamily: "var(--font-heading)" }}>
              What we install in a sprint
            </h2>
            <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
              This is a sanitized example of a real client system. Replaceable manual steps become one repeatable workflow.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Lead-to-booked installation
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {[
                  "Capture leads from form, chat, and inbound email",
                  "Auto-enrich and route in CRM by service and geography",
                  "Trigger instant follow-up and reminder sequences",
                  "Book calls and sync owner, notes, and stage updates",
                  "Push closed-won deals into delivery workflow",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#a3e635] mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-3 mt-7">
                {[
                  { value: "<60s", label: "Lead response" },
                  { value: "10d", label: "Sprint timeline" },
                  { value: "40h+", label: "Time recovered" },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-lg bg-secondary/50 text-center border border-border">
                    <div className="text-lg font-bold text-[#a3e635]">{item.value}</div>
                    <div className="text-[11px] text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-card/50 border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Flow map</div>
              {[
                "Form/Chat -> CRM",
                "CRM -> follow-up sequence",
                "Follow-up -> booked meeting",
                "Stripe payment -> project setup",
                "Project setup -> reporting dashboard",
              ].map((item, idx, arr) => (
                <div key={item}>
                  <div className="flex items-center gap-3 text-sm">
                    <ArrowRight className="h-4 w-4 text-[#a3e635]" />
                    <span>{item}</span>
                  </div>
                  {idx < arr.length - 1 && <div className="h-3 ml-2.5 border-l border-[#a3e635]/25 my-2" />}
                </div>
              ))}

              <div className="mt-7 p-4 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20 text-sm text-muted-foreground">
                Need deeper proof before buying? We share sanitized screenshots and execution details in the Roadmap kickoff.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center p-10 rounded-3xl border border-[#a3e635]/30 bg-gradient-to-br from-card to-[#a3e635]/5"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Build the agency that scales with systems
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with the Roadmap ($499) or buy the Ops Sprint ($7,500+) directly. If we do not recover 40+ hours in 30 days, we keep working for free.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/offer">
              <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-bold text-lg px-8 py-6 rounded-full glow-lime pulse-cta">
                View Offer and Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-[#a3e635]/50 text-[#a3e635] hover:bg-[#a3e635]/10 font-semibold text-lg px-8 py-6 rounded-full"
              >
                Talk to the Team
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#a3e635]" />
              <span>40-hour guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#a3e635]" />
              <span>30-day outcome window</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#a3e635]" />
              <span>Done-for-you implementation</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#a3e635] flex items-center justify-center">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                Ayothedoc
              </div>
              <div className="text-[11px] text-muted-foreground">Agency ops automation</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            (c) {new Date().getFullYear()} Ayothedoc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/automation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Playbooks
            </Link>
            <Link href="/offer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Offer
            </Link>
            <Link href="/playbook" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Outbound Playbook
            </Link>
            <Link href="/checklist" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Free Checklist
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <MarketShiftSection />
        <BuildPathSection />
        <ProofSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
