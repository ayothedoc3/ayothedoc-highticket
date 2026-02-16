import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check, ChevronDown, Clock, Shield, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
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
    const handleScroll = () => setIsVisible(window.scrollY > 760);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href="/offer">
        <Button className="bg-[#a3e635] hover:bg-[#93d225] text-black font-semibold px-6 py-3 rounded-full shadow-md">
          View Offer
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0d10]/90 backdrop-blur-md border-b border-white/10">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#a3e635] flex items-center justify-center">
            <Zap className="h-5 w-5 text-black" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Ayothedoc
            </div>
            <div className="text-[11px] text-gray-400">Agency ops automation</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#market-shift" className="text-sm text-gray-400 hover:text-white transition-colors">
            Market Shift
          </a>
          <a href="#build-path" className="text-sm text-gray-400 hover:text-white transition-colors">
            Build Path
          </a>
          <a href="#proof" className="text-sm text-gray-400 hover:text-white transition-colors">
            Proof
          </a>
          <Link href="/playbook" className="text-sm text-gray-400 hover:text-white transition-colors">
            Outbound Playbook
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/offer">
            <Button className="bg-[#a3e635] hover:bg-[#93d225] text-black font-semibold rounded-full px-5">
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
  const modules = [
    "Lead intake and routing",
    "Onboarding automation",
    "Delivery status updates",
    "Client reporting loops",
  ];

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-[#0b0d10]">
      <div className="absolute inset-x-0 top-0 h-24 border-b border-white/5" />

      <div className="container relative z-10 py-14">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start"
        >
          <div>
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#a3e635]/30 bg-[#a3e635]/10 text-[#a3e635] text-sm font-medium">
                <Zap className="h-4 w-4" />
                AI-native agency model
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Build leverage,
              <br />
              <span className="text-[#a3e635]">not labor.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl leading-relaxed">
              We install one system your agency can run on: lead intake to onboarding to delivery to reporting.
              Fixed scope. Self-serve checkout. Measurable outcomes in 30 days.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 grid sm:grid-cols-2 gap-3 max-w-3xl">
              {[
                "Form to CRM to follow-up in under 60s",
                "Payment to kickoff to project setup",
                "Weekly client report generation",
                "40+ hours recovered or we keep working",
              ].map((line) => (
                <div key={line} className="p-3 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#a3e635] mt-0.5" />
                  <span>{line}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/offer">
                <Button className="bg-[#a3e635] hover:bg-[#93d225] text-black font-bold text-lg px-8 py-6 rounded-full">
                  View Offer and Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/playbook">
                <Button
                  variant="outline"
                  className="border-[#a3e635]/40 text-[#a3e635] hover:bg-[#a3e635]/10 font-semibold text-lg px-8 py-6 rounded-full"
                >
                  See Outbound Playbook
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="relative rounded-2xl border border-white/10 bg-[#11141a] p-6 md:p-7">
            <div className="text-xs uppercase tracking-wider text-gray-400">System modules</div>
            <h3 className="text-2xl font-bold mt-2 text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Agency Ops Engine
            </h3>
            <p className="text-sm text-gray-400 mt-2">Build once, run repeatedly, then turn into internal IP.</p>

            <div className="mt-6 space-y-3">
              {modules.map((moduleName) => (
                <div key={moduleName} className="p-3 rounded-lg border border-white/10 bg-[#0f1318] text-sm text-gray-300">
                  {moduleName}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg border border-[#a3e635]/25 bg-[#a3e635]/10 text-sm text-gray-200">
              Current buy path: Roadmap ($499) → Ops Sprint ($7,500+) → Care ($1,500+/mo)
            </div>

            <div className="absolute -top-3 -right-3 rounded-md bg-[#141922] border border-white/15 px-3 py-1 text-xs text-gray-300">
              lead ops
            </div>
            <div className="absolute top-24 -left-3 rounded-md bg-[#141922] border border-white/15 px-3 py-1 text-xs text-gray-300">
              onboarding
            </div>
            <div className="absolute bottom-6 -right-4 rounded-md bg-[#141922] border border-white/15 px-3 py-1 text-xs text-gray-300">
              reporting
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#market-shift" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <span className="text-xs">Scroll to see the model</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

function MarketShiftSection() {
  return (
    <section id="market-shift" className="py-22 bg-[#111317] border-y border-white/10">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider">Market shift</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Agencies are splitting into two businesses
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp} className="p-7 rounded-2xl border border-red-400/30 bg-red-500/10">
              <div className="text-xs uppercase tracking-[0.2em] text-red-300">A) Sell labor</div>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                {[
                  "Revenue depends on adding more people",
                  "Margins compress as delivery complexity grows",
                  "Knowledge stays in talent, not systems",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-300 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-7 rounded-2xl border border-[#a3e635]/35 bg-[#a3e635]/10">
              <div className="text-xs uppercase tracking-[0.2em] text-[#a3e635]">B) Sell leverage</div>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                {[
                  "Revenue scales through repeatable systems",
                  "Every sprint becomes reusable internal IP",
                  "Services cash flow funds productization",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#a3e635] mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="mt-6 p-5 rounded-xl border border-white/10 bg-[#0d1117] text-sm text-gray-300">
            Target operating model: 2-4 sprints per month + Care Plan base, with a small team and strong process automation.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BuildPathSection() {
  return (
    <section id="build-path" className="py-24 bg-[#0b0d10]">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider">Build path</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-white" style={{ fontFamily: "var(--font-heading)" }}>
              How you move from delivery to leverage
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-7">
            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-4">
              {[
                {
                  step: "01",
                  title: "Roadmap",
                  subtitle: "48-72 hours",
                  desc: "Pick one workflow clients overpay for and define the scope.",
                },
                {
                  step: "02",
                  title: "Ops Sprint",
                  subtitle: "10 business days",
                  desc: "Install the workflow end-to-end and capture proof metrics.",
                },
                {
                  step: "03",
                  title: "Care Plan",
                  subtitle: "monthly",
                  desc: "Stabilize, improve, and turn repeated components into IP.",
                },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-xl border border-white/10 bg-[#11141a]">
                  <div className="text-xs uppercase tracking-wide text-gray-400">Step {item.step}</div>
                  <h3 className="text-xl font-semibold mt-2 text-white" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <div className="text-xs text-[#a3e635] mt-1">{item.subtitle}</div>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="p-6 rounded-xl border border-white/10 bg-[#11141a]">
              <div className="text-xs uppercase tracking-wide text-gray-400">Deliverables snapshot</div>
              <h3 className="text-xl font-semibold mt-2 text-white" style={{ fontFamily: "var(--font-heading)" }}>
                One track fully installed
              </h3>

              <div className="mt-4 space-y-3 text-sm text-gray-300">
                {[
                  "Lead-to-booked engine with auto-routing",
                  "Onboarding sequence with billing triggers",
                  "Delivery status loops for internal team",
                  "Client reporting output and alerts",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#a3e635] mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg border border-[#a3e635]/25 bg-[#a3e635]/10 text-sm text-gray-200">
                Start where confidence is highest: Roadmap first or Sprint direct.
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
    <section id="proof" className="py-24 bg-[#12161d] border-y border-white/10">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="text-[#a3e635] font-semibold text-sm uppercase tracking-wider">Proof</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-white" style={{ fontFamily: "var(--font-heading)" }}>
              What we actually deploy
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-5">
            {[
              {
                title: "Lead response engine",
                metric: "<60s",
                detail: "From form submit to first outbound touch.",
              },
              {
                title: "Sprint implementation",
                metric: "10d",
                detail: "Fixed timeline for one high-leverage workflow.",
              },
              {
                title: "Time recovered",
                metric: "40h+",
                detail: "Guaranteed in 30 days or we continue free.",
              },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeInUp} className="p-6 rounded-xl border border-white/10 bg-[#0f1318]">
                <div className="text-sm uppercase tracking-wide text-gray-400">{card.title}</div>
                <div className="text-4xl font-bold text-[#a3e635] mt-3" style={{ fontFamily: "var(--font-heading)" }}>
                  {card.metric}
                </div>
                <p className="text-sm text-gray-300 mt-3 leading-relaxed">{card.detail}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-7 p-6 rounded-xl border border-white/10 bg-[#0f1318]">
            <div className="text-sm text-gray-300 leading-relaxed">
              Need verification before buying? We share sanitized workflow maps, implementation checklists, and KPI baselines during Roadmap kickoff.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24 bg-[#0b0d10]">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center p-9 rounded-2xl border border-[#a3e635]/30 bg-[#11141a]"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Build the agency that ships systems
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg text-gray-300 mt-5 max-w-2xl mx-auto">
            Start with Roadmap ($499) or buy the Ops Sprint ($7,500+) directly. If we do not recover 40+ hours in 30 days, we keep working for free.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/offer">
              <Button className="bg-[#a3e635] hover:bg-[#93d225] text-black font-bold text-lg px-8 py-6 rounded-full">
                View Offer and Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-[#a3e635]/40 text-[#a3e635] hover:bg-[#a3e635]/10 font-semibold text-lg px-8 py-6 rounded-full"
              >
                Talk to the Team
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
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
    <footer className="py-12 border-t border-white/10 bg-[#0b0d10]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#a3e635] flex items-center justify-center">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Ayothedoc
              </div>
              <div className="text-[11px] text-gray-400">Agency ops automation</div>
            </div>
          </div>
          <p className="text-sm text-gray-400">(c) {new Date().getFullYear()} Ayothedoc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/automation" className="text-sm text-gray-400 hover:text-white transition-colors">
              Playbooks
            </Link>
            <Link href="/playbook" className="text-sm text-gray-400 hover:text-white transition-colors">
              Outbound Playbook
            </Link>
            <Link href="/offer" className="text-sm text-gray-400 hover:text-white transition-colors">
              Offer
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
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
    <div className="min-h-screen bg-[#0b0d10] text-white">
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
