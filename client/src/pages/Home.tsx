/*
 * DESIGN: Clean, focused landing page
 * Structure: Hero → How It Works → Proof → CTA
 * Colors: Dark (#0d0d0d) with Lime (#a3e635) accents
 * Typography: Outfit (headlines), Source Sans 3 (body)
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
} from "lucide-react";
import { useState, useEffect } from "react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Sticky CTA Component
function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
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
          View Offer <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
}

// Header Component
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#a3e635] flex items-center justify-center">
            <Zap className="h-5 w-5 text-black" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
              Ayothedoc
            </div>
            <div className="text-[11px] text-muted-foreground">
              Agency ops automation
            </div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            How It Works
          </a>
          <a href="#proof" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Proof
          </a>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Blog
          </Link>
          <Link href="/automation" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Playbooks
          </Link>
          <Link href="/offer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Offer
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

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-automation.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-0" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] text-sm font-medium">
              <Zap className="h-4 w-4" />
              For Marketing + Web/Dev Agencies
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Agency Ops Engine That{" "}
            <span className="gradient-text">Guarantees 40+ Hours</span>{" "}
            Back in 30 Days
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed"
          >
            We install an end-to-end ops automation system for agencies—lead intake → onboarding → delivery → reporting—so you can scale without hiring another ops person.{" "}
            <strong className="text-foreground">Guaranteed to free up 40+ hours in the first 30 days, or we work for free.</strong>
          </motion.p>

          {/* Concrete deliverables */}
          <motion.div variants={fadeInUp} className="grid gap-4 sm:grid-cols-3 mb-10">
            {[
              {
                title: "Lead-to-Booked",
                flow: "Form → CRM → follow-up → meeting booked",
                tools: "CRM + email/SMS + calendar",
              },
              {
                title: "Onboarding-to-Delivery",
                flow: "Payment → contract → kickoff → project created",
                tools: "Stripe + docs + ClickUp/Asana",
              },
              {
                title: "Reporting-to-Retention",
                flow: "Dashboards → client report → alerts → renewals",
                tools: "Sheets/Looker + Slack + PM",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-card/50 backdrop-blur border border-border"
              >
                <div className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.title}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <span className="text-foreground/90">{item.flow}</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{item.tools}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/offer">
              <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-bold text-lg px-8 py-6 rounded-full glow-lime">
                View the Offer & Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-[#a3e635]/50 text-[#a3e635] hover:bg-[#a3e635]/10 font-semibold text-lg px-8 py-6 rounded-full">
                Ask a Question
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#a3e635]" />
              <span>Self-serve checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#a3e635]" />
              <span>Results in 30 days</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#a3e635]" />
              <span>Done-for-you implementation</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#how-it-works" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xs">Scroll to learn more</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url(/images/value-stack-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider"
          >
            How It Works
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Three steps to a <span className="gradient-text">running system</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {[
            {
              step: "01",
              title: "Roadmap (48–72h)",
              description: "We map your current workflow, pick the highest-leverage automations, and lock the implementation plan."
            },
            {
              step: "02",
              title: "Ops Sprint (10 business days)",
              description: "We build 4–6 automations end-to-end across one track (Lead-to-Booked, Onboarding, or Reporting)."
            },
            {
              step: "03",
              title: "Care Plan (monthly)",
              description: "We monitor, fix, and improve the system so it stays reliable as your tools and clients change."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative p-8 rounded-2xl bg-card/50 backdrop-blur border border-border card-hover"
            >
              <span className="text-6xl font-bold text-[#a3e635]/10 absolute top-4 right-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {item.step}
              </span>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <img
            src="/images/case-study-visual.png"
            alt="Example workflow map deliverable (sanitized)"
            className="w-full rounded-2xl border border-border shadow-2xl"
          />
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Example workflow map we deliver in the Roadmap (sanitized).
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Proof Section
function ProofSection() {
  return (
    <section id="proof" className="py-24 bg-secondary/30">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            variants={fadeInUp}
            className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider"
          >
            Proof
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-12"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What we actually build for agencies
          </motion.h2>

          <motion.div variants={fadeInUp} className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="p-8 md:p-10 rounded-2xl bg-card border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Example Ops Sprint
              </div>
              <h3 className="text-2xl font-bold mt-3" style={{ fontFamily: "var(--font-heading)" }}>
                Lead-to-Booked system for an agency
              </h3>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                We connect your tools so every lead gets routed, followed up, and moved into a
                delivery workflow without manual copy/paste.
              </p>

              <div className="mt-8 space-y-4 text-sm text-muted-foreground">
                {[
                  "Capture leads from forms + chat + inbound email",
                  "Create/enrich leads in your CRM and assign owner",
                  "Send instant follow-up sequences + reminders",
                  "Create the project + tasks automatically after payment",
                  "Generate weekly client reports and internal alerts",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#a3e635]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-[#a3e635]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-10 rounded-2xl bg-card/40 border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
                The full flow (what gets automated)
              </div>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Form / Chat", detail: "Lead captured from website, ads, or referral" },
                  { step: "2", title: "CRM", detail: "Lead enriched, scored, and assigned to owner" },
                  { step: "3", title: "Follow-up", detail: "Instant email/SMS sequences sent automatically" },
                  { step: "4", title: "Calendar", detail: "Discovery call booked without back-and-forth" },
                  { step: "5", title: "Stripe", detail: "Payment received, invoice generated" },
                  { step: "6", title: "PM Tool", detail: "Project + tasks created, team notified" },
                  { step: "7", title: "Reporting", detail: "Weekly client reports + internal alerts" },
                ].map((step, idx, arr) => (
                  <div key={step.title}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#a3e635]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-[#a3e635]">{step.step}</span>
                      </div>
                      <div className="flex-grow">
                        <div className="font-semibold text-sm">{step.title}</div>
                        <div className="text-xs text-muted-foreground">{step.detail}</div>
                      </div>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="ml-4 h-3 border-l border-[#a3e635]/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section (with guarantee merged in)
function FinalCTASection() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Get <span className="gradient-text">40+ Hours Back</span> Every Month?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto"
          >
            We install the system, train your team, and hand off SOPs. If we don't free up 40+ hours in 30 days, we keep working for free.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/offer">
              <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-bold text-lg px-8 py-6 rounded-full glow-lime pulse-cta">
                View Offer & Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-[#a3e635]/50 text-[#a3e635] hover:bg-[#a3e635]/10 font-semibold text-lg px-8 py-6 rounded-full">
                Ask a Question
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#a3e635]" />
              <span>40-Hour Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#a3e635]" />
              <span>30-Day Deployment</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#a3e635]" />
              <span>Done-For-You</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
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
              <div className="font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                Ayothedoc
              </div>
              <div className="text-[11px] text-muted-foreground">
                Agency ops automation
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ayothedoc. All rights reserved.
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

// Main Home Component
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ProofSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
