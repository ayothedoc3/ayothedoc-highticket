import { Check } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ProofArtifact = {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
};

type ProofKpiRow = {
  workflow: string;
  baseline: string;
  after: string;
  change: string;
  verification: string;
};

const proofArtifacts: ProofArtifact[] = [
  {
    title: "Workflow map snapshot",
    subtitle: "Sanitized pipeline view used during kickoff and handoff",
    src: "/proof/workflow-map-anon.svg",
    alt: "Anonymized workflow map screenshot",
  },
  {
    title: "Ops dashboard snapshot",
    subtitle: "30-day KPI view for lead, onboarding, and reporting tracks",
    src: "/proof/ops-dashboard-anon.svg",
    alt: "Anonymized operations dashboard screenshot",
  },
  {
    title: "Execution log snapshot",
    subtitle: "Automation run history used for QA and guarantee verification",
    src: "/proof/activity-log-anon.svg",
    alt: "Anonymized activity log screenshot",
  },
];

const proofKpiRows: ProofKpiRow[] = [
  {
    workflow: "Lead response",
    baseline: "17m median",
    after: "52s median",
    change: "-95%",
    verification: "CRM activity logs + message timestamps",
  },
  {
    workflow: "Client onboarding admin time",
    baseline: "2.6h / client",
    after: "22m / client",
    change: "-86%",
    verification: "Task board cycle time + SOP checklist",
  },
  {
    workflow: "Weekly reporting production",
    baseline: "6.4h / week",
    after: "2.1h / week",
    change: "-67%",
    verification: "Reporting tool logs + team time audit",
  },
];

export function ProofBlock() {
  return (
    <div className="mt-7 space-y-5">
      <div className="grid md:grid-cols-3 gap-5">
        {proofArtifacts.map((artifact) => (
          <div key={artifact.title} className="p-4 rounded-xl border border-white/10 bg-[#0f1318]">
            <img
              src={artifact.src}
              alt={artifact.alt}
              loading="lazy"
              className="w-full rounded-lg border border-white/10 bg-[#0b0d10] object-cover"
            />
            <div className="mt-3 text-sm font-semibold text-white">{artifact.title}</div>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{artifact.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-white/10 bg-[#0f1318]">
        <div className="text-sm uppercase tracking-wide text-gray-400">Baseline vs post-install KPI table</div>
        <p className="text-xs text-gray-500 mt-2">
          Anonymized sample format. Replace rows with verified client values before publishing.
        </p>
        <div className="mt-4">
          <Table className="text-sm">
            <TableHeader className="border-white/10">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-gray-300">Workflow</TableHead>
                <TableHead className="text-gray-300">Baseline</TableHead>
                <TableHead className="text-gray-300">After</TableHead>
                <TableHead className="text-gray-300">Change</TableHead>
                <TableHead className="text-gray-300">Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proofKpiRows.map((row) => (
                <TableRow key={row.workflow} className="border-white/10 hover:bg-white/0">
                  <TableCell className="text-white">{row.workflow}</TableCell>
                  <TableCell className="text-gray-400">{row.baseline}</TableCell>
                  <TableCell className="text-gray-200">{row.after}</TableCell>
                  <TableCell className="text-[#a3e635] font-semibold">{row.change}</TableCell>
                  <TableCell className="text-gray-400">{row.verification}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-5 p-4 rounded-lg border border-white/10 bg-[#11141a] text-sm text-gray-300 leading-relaxed">
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#a3e635] mt-0.5" />
            <span>
              Guarantee rule: 40+ hours is measured against kickoff baseline (time estimates + activity logs), then
              verified with post-install logs and task volume over the next 30 days.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
