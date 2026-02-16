"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Zap,
  Check,
  ArrowRight,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { getAttribution, trackEvent } from "@/lib/analytics";

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

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    trackEvent("lead_submit", { source: "contact" });
    setIsSubmitting(true);

    let leadCaptured = false;
    let emailSent = false;
    const attribution = getAttribution();
    const sourceChannel =
      typeof attribution.utm_source === "string" && attribution.utm_source
        ? attribution.utm_source
        : "direct";

    try {
      try {
        const apiResponse = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            email: formData.email,
            company: formData.company,
            source: `contact_${sourceChannel}`,
          }),
        });

        leadCaptured = apiResponse.ok;
      } catch (error) {
        console.warn("Lead capture failed:", error);
      }

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

      const templateParams = {
        to_name: "Ayothedoc Team",
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone || "Not provided",
        company: formData.company || "Not provided",
        service: formData.service || "Not specified",
        message: formData.message,
        newsletter: formData.newsletter ? "Yes" : "No",
        reply_to: formData.email,
        timestamp: new Date().toISOString(),
      };

      if (serviceId && templateId && publicKey) {
        const emailjs = await import("emailjs-com");
        await emailjs.default.send(serviceId, templateId, templateParams, publicKey);
        emailSent = true;
      } else {
        console.warn("EmailJS not configured - skipping email send");
      }

      if (!leadCaptured && !emailSent) {
        throw new Error("Contact submission failed: no delivery method succeeded");
      }

      trackEvent("lead_submit_success", {
        source: "contact",
        lead_captured: leadCaptured,
        email_sent: emailSent,
      });

      toast.success("Message received!", {
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
        newsletter: false
      });
    } catch (error) {
      console.error("Contact submission failed:", error);
      trackEvent("lead_submit_error", { source: "contact" });
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Link href="/offer">
              <Button variant="outline" size="sm" className="border-lime-400/30 text-lime-400 hover:bg-lime-400/10">
                View Offer
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-lime-400/30 text-lime-400 hover:bg-lime-400/10">
                &larr; Back
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

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span variants={fadeInUp} className="text-lime-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
              CONTACT US
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Don&apos;t Wait &mdash;{" "}
              <span className="text-lime-400">Let&apos;s Get Started</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-400">
              Ready to transform your business with smart automation? Book your free consultation today.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      First Name *
                    </label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-gray-800 border-gray-700 focus:border-lime-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Last Name
                    </label>
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-gray-800 border-gray-700 focus:border-lime-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gray-800 border-gray-700 focus:border-lime-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone (Optional)
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-gray-800 border-gray-700 focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Company
                  </label>
                  <Input
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-gray-800 border-gray-700 focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Service Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  >
                    <option value="">Select a service</option>
                    <option value="ai-automation">AI Automation</option>
                    <option value="web-development">Web Development</option>
                    <option value="process-optimization">Process Optimization</option>
                    <option value="business-audit">Business Audit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-lime-400 focus:ring-lime-400"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-400">
                    Subscribe to our newsletter for automation tips
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-lime-400 text-gray-950 hover:bg-lime-500 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
                <p className="text-gray-400 text-lg">
                  Ready to streamline your business operations and boost productivity? We&apos;re here to help you discover the perfect automation solutions.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-lime-400">
                  Free Consultation Includes:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Comprehensive business process analysis",
                    "Custom automation recommendations",
                    "Time and cost savings projection",
                    "Implementation roadmap and timeline",
                    "No-obligation project proposal"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-lime-400" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-900 border border-lime-400/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@ayothedoc.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-lime-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    hello@ayothedoc.com
                  </a>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5" />
                    Remote &mdash; Serving clients worldwide
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-lime-400 text-gray-950 hover:bg-lime-500"
                  onClick={() => window.open('https://calendly.com/ayothedoc', '_blank')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Call Instead
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked{" "}
              <span className="text-lime-400">Questions</span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How long does a typical project take?",
                  a: "Project timelines vary depending on complexity, but most automation setups take 1-3 weeks while web development projects take 2-6 weeks."
                },
                {
                  q: "Do you provide ongoing support?",
                  a: "Yes! We offer comprehensive support packages to ensure your automations continue running smoothly."
                },
                {
                  q: "What makes your automation solutions different?",
                  a: "We focus on practical, business-specific solutions using proven platforms. Our approach prioritizes ease of use and measurable time savings."
                },
                {
                  q: "Can you work with my existing systems?",
                  a: "Absolutely. We specialize in integrating with existing tools and platforms. We'll assess your setup during the consultation."
                }
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-lime-400/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
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
  );
}
