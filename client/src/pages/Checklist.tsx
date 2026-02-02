/**
 * Lead Magnet Page: The 40-Hour Automation Audit Checklist
 * 
 * Design: Conversion Machine style - dark theme, lime accents
 * Purpose: Capture leads with a free checklist download
 * Structure: Hero → What's Inside → Categories → Who It's For → Social Proof → Final CTA
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Check, 
  X, 
  Clock, 
  Calculator, 
  Target, 
  Users, 
  ShoppingCart, 
  MessageSquare, 
  BarChart3, 
  Headphones, 
  DollarSign, 
  UserCog,
  ArrowRight,
  Download,
  Star,
  Zap,
  ChevronDown
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const categories = [
  {
    icon: Users,
    title: "Lead & Sales Pipeline",
    items: ["Lead capture and routing", "Follow-up sequences", "CRM data entry", "Quote/proposal generation"],
    count: 4
  },
  {
    icon: UserCog,
    title: "Customer Onboarding",
    items: ["Welcome sequences", "Account setup", "Document collection"],
    count: 3
  },
  {
    icon: ShoppingCart,
    title: "Order Processing",
    items: ["Order confirmation", "Inventory updates", "Shipping notifications", "Invoice generation"],
    count: 4
  },
  {
    icon: MessageSquare,
    title: "Internal Communication",
    items: ["Status updates", "Meeting scheduling", "Task assignments"],
    count: 3
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    items: ["Daily/weekly reports", "Dashboard updates", "KPI tracking", "Data consolidation"],
    count: 4
  },
  {
    icon: Headphones,
    title: "Customer Support",
    items: ["Ticket routing", "FAQ responses", "Escalation workflows"],
    count: 3
  },
  {
    icon: DollarSign,
    title: "Financial Operations",
    items: ["Invoice processing", "Expense tracking", "Payment reminders"],
    count: 3
  },
  {
    icon: Clock,
    title: "HR & Team Management",
    items: ["Time tracking", "Leave requests", "Onboarding checklists"],
    count: 3
  }
];

export default function Checklist() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email) {
      toast.error("Please fill in your name and email");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Store lead in Airtable via API
      const apiResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          company: formData.company,
          source: 'checklist'
        })
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to save lead');
      }

      // 2. Send EmailJS notification
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_CHECKLIST_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const emailjs = await import("emailjs-com");
        await emailjs.default.send(serviceId, templateId, {
          to_name: "Ayothedoc Team",
          from_name: formData.firstName,
          from_email: formData.email,
          company: formData.company || "Not provided",
          source: "Checklist Download",
          reply_to: formData.email,
          timestamp: new Date().toISOString(),
        }, publicKey);
      }

      toast.success("Check your inbox! Your checklist is on its way.", {
        description: "You'll receive the download link within 2 minutes."
      });

      setFormData({ firstName: "", email: "", company: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center">
              <Zap className="w-5 h-5 text-background" />
            </div>
            <span className="font-display font-bold text-lg text-lime">Ayothedoc</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="border-lime/30 text-lime hover:bg-lime/10">
              ← Back to Main Site
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(163, 230, 53, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/10 border border-lime/20 text-lime text-sm font-medium mb-6">
                  <Download className="w-4 h-4" />
                  FREE DOWNLOAD
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The 40-Hour{" "}
                <span className="text-lime">Automation Audit</span>{" "}
                Checklist
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground mb-4">
                Find the Hidden Time-Wasters Costing Your Business{" "}
                <span className="text-lime font-semibold">€26,000+ Per Year</span>
              </motion.p>

              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
                The exact 27-point checklist we use to identify 40+ hours of automatable work in every business we audit. Download it free and run your own audit in under 30 minutes.
              </motion.p>

              {/* Trust Indicators */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 mb-8">
                {[
                  { text: "Used by 150+ businesses", icon: Users },
                  { text: "Avg. €2,100/month recovered", icon: DollarSign },
                  { text: "Takes under 30 minutes", icon: Clock }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-lime" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </motion.div>

              {/* Form */}
              <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-card border-border focus:border-lime"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-card border-border focus:border-lime"
                    required
                  />
                </div>
                <Input
                  placeholder="Company Name (optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-card border-border focus:border-lime"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-lime text-background hover:bg-lime/90 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Get My Free Checklist
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </motion.form>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img 
                  src="/images/checklist-mockup.png" 
                  alt="The 40-Hour Automation Audit Checklist"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-card border border-lime/30 rounded-lg px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-lime" />
                    <span className="text-sm font-medium">27 Checkpoints</span>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute bottom-20 -left-4 bg-card border border-lime/30 rounded-lg px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-lime" />
                    <span className="text-sm font-medium">30 min audit</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-lime text-sm font-semibold tracking-wider uppercase mb-4 block">
              WHAT YOU'LL DISCOVER
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold">
              Inside the 27-Point Automation Audit Checklist
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Clock,
                title: "Time Leak Finder",
                description: "Pinpoint the exact tasks eating up your team's hours. Our checklist covers 8 categories of hidden time-wasters most businesses overlook."
              },
              {
                icon: Calculator,
                title: "ROI Calculator",
                description: "Calculate the real cost of manual work. Each checklist item includes a time estimate so you can quantify your potential savings."
              },
              {
                icon: Target,
                title: "Priority Matrix",
                description: "Know what to automate first. Our scoring system helps you identify quick wins vs. long-term projects based on impact and complexity."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-card border border-border rounded-2xl p-8 hover:border-lime/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-lime/10 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-lime" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The 8 Audit Categories */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-lime text-sm font-semibold tracking-wider uppercase mb-4 block">
              THE 8 AUDIT CATEGORIES
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold mb-4">
              We Audit Every Corner of Your Operations
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each category contains specific checkpoints to help you identify automation opportunities you might be missing.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {categories.map((category, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-lime/30 transition-colors"
              >
                <button
                  onClick={() => setExpandedCategory(expandedCategory === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-lime" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} checkpoints</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedCategory === i ? 'rotate-180' : ''}`} />
                </button>
                {expandedCategory === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5"
                  >
                    <ul className="space-y-2 pl-14">
                      {category.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-lime flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              size="lg" 
              className="bg-lime text-background hover:bg-lime/90"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Get the Full Checklist Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="text-lime text-sm font-semibold tracking-wider uppercase mb-4 block">
                IS THIS FOR YOU?
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                This Checklist Is Perfect For You If...
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Qualifying */}
              <motion.div variants={fadeInUp} className="bg-card border border-lime/20 rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-lime" />
                  </div>
                  You're a Good Fit
                </h3>
                <ul className="space-y-4">
                  {[
                    "You run a business doing €500K-€5M in revenue",
                    "Your team spends 10+ hours/week on repetitive tasks",
                    "You've tried automation before but it didn't stick",
                    "You're ready to scale but operations can't keep up",
                    "You want to free up time for strategy, not admin"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Disqualifying */}
              <motion.div variants={fadeInUp} className="bg-card border border-border rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  Not the Right Fit
                </h3>
                <ul className="space-y-4">
                  {[
                    "You're a solopreneur with no team",
                    "You're not using any digital tools yet",
                    "You're looking for a magic button (this requires honest assessment)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="text-lime text-sm font-semibold tracking-wider uppercase mb-4 block">
                WHAT OTHERS SAY
              </span>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-lime text-lime" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-display mb-8 leading-relaxed">
                "I thought we were pretty efficient until I ran this audit. Found{" "}
                <span className="text-lime font-semibold">23 hours of automatable work</span>{" "}
                in the first pass. We've already automated 15 of those hours and the ROI has been incredible."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center">
                  <span className="font-display font-bold text-lime">MT</span>
                </div>
                <div>
                  <p className="font-semibold">Marcus T.</p>
                  <p className="text-sm text-muted-foreground">Operations Director, E-commerce Brand</p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: "150+", label: "Downloads" },
                { value: "23 hrs", label: "Avg. identified" },
                { value: "4.9/5", label: "Rating" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-card/50 rounded-xl border border-border">
                  <p className="font-display text-2xl font-bold text-lime">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Creator */}
      <section className="py-12 bg-card/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="text-lime text-sm font-semibold tracking-wider uppercase mb-4 block">
              CREATED BY
            </span>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Ayothedoc</span> — We've audited 50+ businesses and implemented automation systems that have collectively saved over 10,000 hours of manual work. This checklist is the exact tool we use in our €500 AI Readiness Audit, now available free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Hidden{" "}
              <span className="text-lime">40 Hours</span>?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
              Download the free checklist and run your own automation audit today. No fluff, no sales pitch—just a practical tool to identify where you're leaking time.
            </motion.p>

            <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="bg-card border-border focus:border-lime"
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-card border-border focus:border-lime"
                required
              />
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-lime text-background hover:bg-lime/90 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Me the Checklist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.form>

            <motion.p variants={fadeInUp} className="text-sm text-muted-foreground mt-6">
              Join 150+ business owners who've already uncovered their automation opportunities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center">
                <Zap className="w-5 h-5 text-background" />
              </div>
              <span className="font-display font-bold text-lime">Ayothedoc</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Ayothedoc. All rights reserved.
            </p>
            <Link href="/" className="text-sm text-lime hover:underline">
              Want us to do the audit for you? Learn about the 40-Hour Profit System →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
