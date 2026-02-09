/*
 * DESIGN: "Conversion Machine" — Direct Response Landing Page
 * Structure: Hero → Problem → Solution → Value Stack → Case Study → Guarantee → FAQ → Final CTA
 * Colors: Dark (#0d0d0d) with Lime (#a3e635) accents
 * Typography: Outfit (headlines), Source Sans 3 (body)
 */

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Check, 
  Clock, 
  Zap, 
  Shield, 
  TrendingUp,
  ChevronDown,
  X
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
          <a href="#problem" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            The Problem
          </a>
          <a href="#solution" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Solution
          </a>
          <a href="#guarantee" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Guarantee
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            FAQ
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
            <strong className="text-foreground">Guaranteed to free up 40+ hours of manual work in the first 30 days, or we work for free.</strong>
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
            <a href="#guarantee">
              <Button variant="outline" className="border-[#a3e635]/50 text-[#a3e635] hover:bg-[#a3e635]/10 font-semibold text-lg px-8 py-6 rounded-full">
                <Shield className="mr-2 h-5 w-5" />
                See Our Guarantee
              </Button>
            </a>
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
        <a href="#problem" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xs">Scroll to learn more</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

// Problem Section
function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: "You're drowning in manual tasks",
      description: "Copy-pasting data, sending follow-up emails, updating spreadsheets... Your team spends 40+ hours/month on work that should be automated."
    },
    {
      icon: TrendingUp,
      title: "Growth is creating chaos",
      description: "More customers = more manual work. Your operations can't scale because every new client means more hours of repetitive tasks."
    },
    {
      icon: X,
      title: "Freelancers keep failing you",
      description: "You've hired automation 'experts' before. They delivered half-baked solutions that broke within weeks. Now you're skeptical."
    }
  ];

  return (
    <section id="problem" className="py-24 bg-secondary/30">
      <div className="container">
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
            The Problem
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Your Agency Is Leaking Time and Money
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground"
          >
            Every hour your team spends on manual, repetitive work is an hour they're not spending on growth, strategy, or serving customers.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-8 rounded-2xl bg-card border border-border card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-6">
                <problem.icon className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Agitation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 p-8 rounded-2xl bg-destructive/5 border border-destructive/20 max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">The cost of inaction:</strong> If your team wastes just 10 hours/week on manual tasks at $50/hour, that's{" "}
            <strong className="text-destructive">$26,000/year</strong> going down the drain—not counting missed opportunities and burned-out employees.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Solution Section
function SolutionSection() {
  return (
    <section id="solution" className="py-24 relative overflow-hidden">
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
            The Solution
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Introducing: <span className="gradient-text">The Agency Ops Engine</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground"
          >
            A productized, done-for-you implementation sprint that installs your agency’s lead-to-reporting ops system and gives you back 40+ hours every month—guaranteed.
          </motion.p>
        </motion.div>

        {/* How It Works */}
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

// Value Stack Section
function ValueStackSection() {
  const deliverables = [
    {
      title: "One track installed end-to-end",
      description: "Lead-to-Booked, Onboarding-to-Delivery, or Reporting-to-Retention.",
    },
    {
      title: "4–6 automations built on your stack",
      description: "CRM routing, follow-ups, onboarding handoffs, dashboards, and client reporting.",
    },
    {
      title: "QA + error handling",
      description: "Retries, alerts, and guardrails so workflows stay reliable as your tools change.",
    },
    {
      title: "SOPs + Loom walkthroughs",
      description: "Clear documentation so your team can run the system without you.",
    },
    {
      title: "Team training + deployment support",
      description: "Handoff session + support channel while we deploy and stabilize.",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
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
            What You Get
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Everything Included in an Ops Sprint
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
            This is not “random automations.” It’s a cohesive ops system your agency runs on—installed fast, documented, and handed off.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="rounded-2xl bg-card/40 border border-border overflow-hidden"
          >
            {deliverables.map((item) => (
              <motion.div key={item.title} variants={fadeInUp} className="flex items-start gap-4 p-6 border-b border-border last:border-b-0">
                <div className="w-6 h-6 rounded-full bg-[#a3e635] flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="p-8 rounded-2xl bg-card border-2 border-[#a3e635]/40 text-center"
          >
            <p className="text-muted-foreground mb-2">Ops Sprint pricing</p>
            <p className="text-5xl font-extrabold text-[#a3e635] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              $7,500+
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              Self-serve checkout on the offer page. Want clarity first? Start with the Roadmap ($499) to lock scope before the Sprint.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/offer">
                <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-bold px-8 py-6 rounded-full glow-lime">
                  View Offer & Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-[#a3e635]/40 text-[#a3e635] hover:bg-[#a3e635]/10 font-semibold px-8 py-6 rounded-full"
                >
                  Ask a question
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#a3e635]" />
                <span>40-hour guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#a3e635]" />
                <span>Fast implementation</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#a3e635]" />
                <span>Done-for-you</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Case Study Section
function CaseStudySection() {
  return (
    <section className="py-24">
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
            A real workflow we install (sanitized)
          </motion.h2>

          <motion.div variants={fadeInUp} className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="p-8 md:p-10 rounded-2xl bg-card border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Example Sprint (client under NDA)
              </div>
              <h3 className="text-2xl font-bold mt-3" style={{ fontFamily: "var(--font-heading)" }}>
                Lead-to-Booked system for an agency
              </h3>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                This is what “done-for-you” means in practice: we connect your tools so every lead gets routed, followed up, and moved into a
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

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link href="/offer">
                  <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-semibold rounded-full px-6">
                    View Offer & Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#a3e635]/40 text-[#a3e635] hover:bg-[#a3e635]/10 rounded-full px-6">
                    Request proof pack
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-8 md:p-10 rounded-2xl bg-card/40 border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
                Simple flow (what gets automated)
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[860px] flex items-center gap-3">
                  {[
                    { title: "Form / Chat", detail: "Lead captured" },
                    { title: "CRM", detail: "Enrich + assign" },
                    { title: "Follow-up", detail: "Email/SMS sequences" },
                    { title: "Calendar", detail: "Booked call" },
                    { title: "Stripe", detail: "Payment received" },
                    { title: "PM Tool", detail: "Project + tasks" },
                    { title: "Reporting", detail: "Client updates" },
                  ].map((step, idx, arr) => (
                    <div key={step.title} className="flex items-center gap-3">
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                        <div className="font-semibold">{step.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{step.detail}</div>
                      </div>
                      {idx < arr.length - 1 && (
                        <ArrowRight className="h-5 w-5 text-[#a3e635]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                Want screenshots from a stack similar to yours? We’ll share sanitized examples on request.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Guarantee Section
function GuaranteeSection() {
  return (
    <section id="guarantee" className="py-24 bg-secondary/30">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <img 
              src="/images/guarantee-badge.png" 
              alt="Guarantee Badge" 
              className="w-32 h-32 mx-auto"
            />
          </motion.div>

          <motion.span 
            variants={fadeInUp}
            className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider"
          >
            Our Promise
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The 40-Hour Guarantee
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="p-8 md:p-12 rounded-2xl bg-card border-2 border-[#a3e635]/50 mb-8"
          >
            <p className="text-xl md:text-2xl leading-relaxed">
              If we do not successfully implement the system and free up a minimum of{" "}
              <strong className="text-[#a3e635]">40 hours</strong> of manual, profit-draining work for your team within the first 30 days, we will{" "}
              <strong className="text-[#a3e635]">continue to work for free</strong> until that 40-hour benchmark is met.
            </p>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-muted-foreground mb-8">
            No fine print. No exceptions. We're so confident in our system that we put our money where our mouth is.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link href="/offer">
              <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-bold text-lg px-8 py-6 rounded-full glow-lime">
                View Offer & Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Comparison Section
function ComparisonSection() {
  const comparisons = [
    { feature: "Guaranteed results", us: true, freelancer: false },
    { feature: "Done-for-you implementation", us: true, freelancer: false },
    { feature: "30-day deployment timeline", us: true, freelancer: false },
    { feature: "Ongoing support included", us: true, freelancer: false },
    { feature: "Team training & documentation", us: true, freelancer: false },
    { feature: "Risk-free guarantee", us: true, freelancer: false },
  ];

  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The Ops Sprint vs. Hiring a Freelancer
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-border overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-secondary/50 p-4 font-semibold">
              <div>Feature</div>
              <div className="text-center text-[#a3e635]">Ops Sprint</div>
              <div className="text-center text-muted-foreground">Freelancer</div>
            </div>
            {comparisons.map((item, index) => (
              <div key={index} className="grid grid-cols-3 p-4 border-t border-border items-center">
                <div className="text-sm md:text-base">{item.feature}</div>
                <div className="flex justify-center">
                  {item.us ? (
                    <div className="w-6 h-6 rounded-full bg-[#a3e635] flex items-center justify-center">
                      <Check className="h-4 w-4 text-black" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                      <X className="h-4 w-4 text-destructive" />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {item.freelancer ? (
                    <div className="w-6 h-6 rounded-full bg-[#a3e635] flex items-center justify-center">
                      <Check className="h-4 w-4 text-black" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                      <X className="h-4 w-4 text-destructive" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Who is this for?",
      answer:
        "Best fit: marketing + web/dev agencies doing roughly $20k–$250k/month with 3+ team members. If you're smaller, start with the $499 Roadmap. If you're larger, we can scope a multi-sprint rollout."
    },
    {
      question: "What tools and platforms do you work with?",
      answer:
        "We work with most modern agency stacks: HubSpot, Pipedrive, HighLevel, Airtable, ClickUp, Asana, Slack, Google Workspace, Stripe, QuickBooks, Notion, Zapier, Make.com, n8n, and more."
    },
    {
      question: "How long does implementation take?",
      answer:
        "Roadmap: 48–72 hours. Ops Sprint: typically 10 business days for the core build. You should see meaningful time savings within 30 days (or we keep working until you do)."
    },
    {
      question: "What happens after the 30-day managed care period?",
      answer:
        "You can continue on the Care Plan (from $1,500/month) for monitoring, fixes, and improvements—or manage the system yourself. We provide SOPs, Loom walkthroughs, and team training either way."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "Our 40-Hour Guarantee means we work for free until you hit the 40-hour time savings benchmark. If for any reason you're not satisfied, we'll work with you until you are. We've never had a client invoke this guarantee."
    },
    {
      question: "How is this different from hiring an automation freelancer?",
      answer:
        "Freelancers typically deliver one-off projects without strong guardrails. We deliver a system (end-to-end), with a clear scope, team training + SOPs, and a time-savings guarantee."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between bg-card hover:bg-card/80 transition-colors"
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                {openIndex === index && (
                  <div className="p-6 pt-0 bg-card">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
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
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Stop drowning in manual tasks. Stop wasting money on broken automations. Get a proven system that delivers results—guaranteed.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/offer">
              <Button className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-bold text-lg px-8 py-6 rounded-full glow-lime pulse-cta">
                View Offer & Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
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
        <ProblemSection />
        <SolutionSection />
        <ValueStackSection />
        <CaseStudySection />
        <GuaranteeSection />
        <ComparisonSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
