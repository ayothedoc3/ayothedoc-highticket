import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, Copy, Mail, MessageSquare, Zap } from "lucide-react";
import { toast } from "sonner";

import { CheckoutLink } from "@/components/CheckoutLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAttribution, trackEvent } from "@/lib/analytics";

type ScriptTemplate = {
  id: string;
  channel: string;
  title: string;
  subject?: string;
  body: string;
};

const scriptTemplates: ScriptTemplate[] = [
  {
    id: "cold_email_1",
    channel: "Email",
    title: "Cold Email #1 (Problem First)",
    subject: "quick idea for {{agency_name}} ops",
    body: `{{first_name}},

I looked at {{agency_name}} and noticed your team is likely handling lead follow-up, onboarding, and client reporting across multiple tools.

We install an end-to-end ops system for agencies (lead intake -> onboarding -> delivery -> reporting) in a fixed 10-day sprint.

Typical wins:
- lead response in under 60 seconds
- fewer missed follow-ups
- 40+ hours/month recovered

If useful, I can send a 1-page teardown for your current workflow.

- {{your_name}}`,
  },
  {
    id: "follow_up_1",
    channel: "Email",
    title: "Follow-up #1",
    subject: "re: {{agency_name}} ops",
    body: `Wanted to bump this.

If your team is dealing with manual follow-ups or reporting drag, I can send a concrete workflow map specific to your stack.

Worth sending?`,
  },
  {
    id: "follow_up_loom",
    channel: "Email + Loom",
    title: "Follow-up #2 (Loom)",
    subject: "made this for {{agency_name}}",
    body: `Recorded a 90-second teardown for your lead-to-booked workflow:
{{loom_link}}

If this is close to your current process, we can implement this in a 10-day sprint.`,
  },
  {
    id: "linkedin_dm",
    channel: "LinkedIn DM",
    title: "DM Opener",
    body: `Noticed your team is growing. Most agencies at your stage are still handling lead follow-up and reporting manually across tools.

We install a fixed-scope ops system in 10 days. If useful, I can send a short teardown based on your current stack.`,
  },
];

function formatTemplate(template: ScriptTemplate): string {
  if (!template.subject) return template.body;
  return `Subject: ${template.subject}\n\n${template.body}`;
}

export default function Playbook() {
  const runtimeStripe = typeof window !== "undefined" ? window.__AY_CONFIG__?.stripe : undefined;
  const roadmapHref = runtimeStripe?.roadmap || (import.meta.env.VITE_STRIPE_ROADMAP_LINK as string | undefined);
  const sprintHref = runtimeStripe?.sprint || (import.meta.env.VITE_STRIPE_SPRINT_LINK as string | undefined);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState("https://yourdomain.com");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    company: "",
    pain: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "AI-Native Agency Playbook | Ayothedoc";
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute(
      "content",
      "Outbound scripts and implementation playbook for AI-native agencies. Copy scripts, track with UTM, and book Roadmap or Sprint."
    );

    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const sampleTrackingLink = useMemo(
    () =>
      `${baseUrl}/offer?utm_source=linkedin&utm_medium=dm&utm_campaign=playbook_cold_email_1&utm_content=teardown_offer`,
    [baseUrl]
  );

  const handleCopy = async (template: ScriptTemplate) => {
    try {
      await navigator.clipboard.writeText(formatTemplate(template));
      setCopiedId(template.id);
      trackEvent("playbook_script_copy", { script_id: template.id, script_channel: template.channel });
      toast.success("Script copied");
      setTimeout(() => setCopiedId((current) => (current === template.id ? null : current)), 1200);
    } catch (error) {
      console.error("Failed to copy script", error);
      toast.error("Copy failed");
    }
  };

  const copyTrackingLink = async () => {
    try {
      await navigator.clipboard.writeText(sampleTrackingLink);
      trackEvent("playbook_tracking_link_copy", { destination: "offer" });
      toast.success("Tracking link copied");
    } catch (error) {
      console.error("Failed to copy tracking link", error);
      toast.error("Copy failed");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.firstName || !formData.email) {
      toast.error("First name and email are required");
      return;
    }

    setIsSubmitting(true);
    const attribution = getAttribution();
    const sourceChannel =
      typeof attribution.utm_source === "string" && attribution.utm_source
        ? attribution.utm_source
        : "direct";

    trackEvent("playbook_lead_submit", {
      source: "playbook",
      source_channel: sourceChannel,
      pain: formData.pain || "unspecified",
    });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          company: formData.company,
          source: `playbook_${sourceChannel}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      trackEvent("playbook_lead_submit_success", {
        source: "playbook",
        source_channel: sourceChannel,
      });
      toast.success("Playbook request received");
      setFormData({ firstName: "", email: "", company: "", pain: "" });
    } catch (error) {
      console.error("Playbook lead submit error", error);
      trackEvent("playbook_lead_submit_error", { source: "playbook", source_channel: sourceChannel });
      toast.error("Could not submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-gray-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0d10]/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#a3e635] flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg text-white">Ayothedoc</div>
              <div className="text-[11px] text-gray-400">Agency ops automation</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/offer" className="text-sm text-gray-400 hover:text-white transition-colors">
              Offer
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <CheckoutLink
            href={sprintHref}
            label="Buy Sprint"
            cta="playbook_nav_buy_sprint"
            className="bg-[#a3e635] text-black hover:bg-[#93d225] font-semibold"
            size="sm"
          />
        </div>
      </nav>

      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
            <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-[#11141a]">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] text-sm font-semibold uppercase tracking-wider">
                AI-native agency playbook
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mt-6">
                Outbound scripts that feed a
                <span className="text-[#a3e635]"> leverage offer stack</span>
              </h1>
              <p className="text-xl text-gray-400 mt-6 max-w-3xl leading-relaxed">
                Copy scripts, deploy UTM links, and route buyers into Roadmap ($499) or Ops Sprint ($7,500+) with a clean handoff to checkout.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <CheckoutLink
                  href={roadmapHref}
                  label="Start with Roadmap"
                  cta="playbook_hero_buy_roadmap"
                  className="bg-[#a3e635] text-black hover:bg-[#93d225] font-bold text-lg px-8 py-6 rounded-full"
                />
                <CheckoutLink
                  href={sprintHref}
                  label="Buy Ops Sprint"
                  cta="playbook_hero_buy_sprint"
                  variant="outline"
                  className="border-[#a3e635]/40 text-[#a3e635] hover:bg-[#a3e635]/10 font-bold text-lg px-8 py-6 rounded-full"
                />
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-[#11141a]">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Campaign flow</div>
              <h2 className="text-2xl font-semibold mt-3">How this page makes revenue</h2>
              <div className="mt-6 space-y-3">
                {[
                  "Pick script by channel",
                  "Send with UTM checkout link",
                  "Track clicks and lead source",
                  "Convert to Roadmap or Sprint",
                ].map((step) => (
                  <div key={step} className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-[#0f1318] text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#a3e635] mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-[#a3e635]/25 bg-[#a3e635]/10 p-4 text-sm text-gray-200">
                Use this playbook for outbound execution, then close on the self-serve offer page.
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mt-14">
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
            {scriptTemplates.map((template) => (
              <div key={template.id} className="p-6 rounded-2xl bg-[#11141a] border border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-500">{template.channel}</div>
                    <h2 className="text-xl font-semibold mt-2">{template.title}</h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#a3e635]/30 text-[#a3e635] hover:bg-[#a3e635]/10"
                    onClick={() => handleCopy(template)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedId === template.id ? "Copied" : "Copy"}
                  </Button>
                </div>

                <pre className="mt-4 whitespace-pre-wrap text-xs leading-relaxed text-gray-300 bg-[#0f1318] border border-white/10 rounded-xl p-4">
{formatTemplate(template)}
                </pre>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 mt-14">
          <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-2">
            <div className="p-8 rounded-2xl bg-[#11141a] border border-white/10">
              <div className="flex items-center gap-2 text-[#a3e635] text-sm uppercase tracking-[0.2em]">
                <Mail className="w-4 h-4" />
                Tracking setup
              </div>
              <h3 className="text-2xl font-semibold mt-3">Use UTM links in every outbound message</h3>
              <p className="text-gray-400 mt-3 leading-relaxed">
                This link format ties outreach source and script variant to checkout clicks and lead submissions.
              </p>
              <div className="mt-5 p-4 rounded-xl bg-[#0f1318] border border-white/10 text-xs break-all text-gray-300">
                {sampleTrackingLink}
              </div>
              <Button
                variant="outline"
                className="mt-4 border-[#a3e635]/30 text-[#a3e635] hover:bg-[#a3e635]/10"
                onClick={copyTrackingLink}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Tracking Link
              </Button>

              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                {[
                  "Set utm_source as channel (linkedin, email, x)",
                  "Set utm_campaign to script id (playbook_cold_email_1)",
                  "Set utm_content to hook variant",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#a3e635] mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#11141a] border border-white/10">
              <div className="flex items-center gap-2 text-[#a3e635] text-sm uppercase tracking-[0.2em]">
                <MessageSquare className="w-4 h-4" />
                Request teardown
              </div>
              <h3 className="text-2xl font-semibold mt-3">Get the full outbound playbook + custom teardown</h3>
              <p className="text-gray-400 mt-3">Submit your details and we will send a tailored workflow map.</p>

              <div className="mt-5 space-y-3">
                <Input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, firstName: event.target.value }))}
                  className="bg-[#0f1318] border-white/15"
                />
                <Input
                  type="email"
                  placeholder="Work email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="bg-[#0f1318] border-white/15"
                />
                <Input
                  placeholder="Agency name"
                  value={formData.company}
                  onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                  className="bg-[#0f1318] border-white/15"
                />
                <Textarea
                  placeholder="Biggest bottleneck (lead follow-up, onboarding, reporting, etc.)"
                  value={formData.pain}
                  onChange={(event) => setFormData((prev) => ({ ...prev, pain: event.target.value }))}
                  className="bg-[#0f1318] border-white/15 min-h-28"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-full bg-[#a3e635] text-black hover:bg-[#93d225] font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Send me the playbook"}
              </Button>
            </form>
          </div>
        </section>

        <section className="container mx-auto px-4 mt-14">
          <div className="max-w-6xl mx-auto p-8 rounded-2xl border border-white/10 bg-[#11141a] flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Ready to turn repeated service work into IP?</h3>
              <p className="text-gray-400 mt-2">Use the scripts to book calls, then convert into Roadmap and Ops Sprint checkouts.</p>
            </div>
            <Link href="/offer">
              <Button className="bg-[#a3e635] text-black hover:bg-[#93d225] font-semibold rounded-full px-8">
                Go to Offer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
