/**
 * Generates the 40-Hour Automation Audit Checklist PDF
 * Run: npx tsx scripts/generate-checklist-pdf.ts
 */

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const LIME = "#a3e635";
const DARK = "#0d0d0d";
const GRAY = "#6b7280";
const WHITE = "#ffffff";
const LIGHT_BG = "#f9fafb";

const categories = [
  {
    title: "1. Lead & Sales Pipeline",
    items: [
      "Lead capture and routing — are new leads automatically added to your CRM?",
      "Follow-up sequences — do leads get instant email/SMS follow-ups?",
      "CRM data entry — is contact info manually copied between tools?",
      "Quote/proposal generation — are proposals created from templates automatically?",
    ],
  },
  {
    title: "2. Customer Onboarding",
    items: [
      "Welcome sequences — do new clients get an automated onboarding email series?",
      "Account setup — are projects/accounts created automatically after payment?",
      "Document collection — are contracts, NDAs, and briefs collected via automated forms?",
    ],
  },
  {
    title: "3. Order Processing",
    items: [
      "Order confirmation — do customers get instant confirmation emails?",
      "Inventory updates — does stock sync automatically across platforms?",
      "Shipping notifications — are tracking updates sent without manual input?",
      "Invoice generation — are invoices created and sent automatically?",
    ],
  },
  {
    title: "4. Internal Communication",
    items: [
      "Status updates — does your team get auto-notified when tasks change status?",
      "Meeting scheduling — are meetings booked without back-and-forth emails?",
      "Task assignments — are tasks auto-created and assigned from intake forms?",
    ],
  },
  {
    title: "5. Reporting & Analytics",
    items: [
      "Daily/weekly reports — are reports generated and sent automatically?",
      "Dashboard updates — do dashboards pull live data without manual refresh?",
      "KPI tracking — are key metrics tracked and alerted on automatically?",
      "Data consolidation — is data from multiple tools combined without spreadsheets?",
    ],
  },
  {
    title: "6. Customer Support",
    items: [
      "Ticket routing — are support requests auto-assigned to the right person?",
      "FAQ responses — do common questions get instant auto-replies?",
      "Escalation workflows — are urgent issues flagged and escalated automatically?",
    ],
  },
  {
    title: "7. Financial Operations",
    items: [
      "Invoice processing — are incoming invoices captured and categorized automatically?",
      "Expense tracking — do expenses sync from cards/tools without manual entry?",
      "Payment reminders — are overdue payment follow-ups sent automatically?",
    ],
  },
  {
    title: "8. HR & Team Management",
    items: [
      "Time tracking — is time logged automatically or prompted by task changes?",
      "Leave requests — are PTO requests handled via an automated workflow?",
      "Onboarding checklists — do new hires get auto-assigned setup tasks?",
    ],
  },
];

function generatePDF() {
  const outputPath = path.join(
    process.cwd(),
    "client",
    "public",
    "downloads",
    "40-hour-automation-audit-checklist.pdf"
  );

  // Ensure directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 50, right: 50 },
    info: {
      Title: "The 40-Hour Automation Audit Checklist",
      Author: "Ayothedoc",
      Subject: "Find the hidden time-wasters costing your business $26,000+ per year",
    },
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  // ── Cover / Title Area ──
  doc.rect(0, 0, doc.page.width, 220).fill(DARK);

  // Brand
  doc
    .fontSize(12)
    .fillColor(LIME)
    .text("AYOTHEDOC", 50, 40, { characterSpacing: 2 })
    .fontSize(9)
    .fillColor(GRAY)
    .text("Agency ops automation", 50, 56);

  // Title
  doc
    .fontSize(28)
    .fillColor(WHITE)
    .text("The 40-Hour Automation", 50, 90, { width: pageWidth })
    .text("Audit Checklist", 50, 125, { width: pageWidth });

  // Subtitle
  doc
    .fontSize(12)
    .fillColor(LIME)
    .text(
      "27 checkpoints to find the hidden time-wasters costing your agency $26,000+/year",
      50,
      170,
      { width: pageWidth }
    );

  // ── Intro ──
  doc
    .fontSize(11)
    .fillColor("#374151")
    .text(
      "How to use this checklist: Go through each category and check off items that are already automated in your business. " +
      "Unchecked items represent automation opportunities. For each unchecked item, estimate how many hours per week your team " +
      "spends on it manually. The total is your recoverable time.",
      50,
      245,
      { width: pageWidth, lineGap: 4 }
    );

  // Scoring guide
  const guideY = 310;
  doc.rect(50, guideY, pageWidth, 60).fillAndStroke(LIGHT_BG, "#e5e7eb");
  doc
    .fontSize(10)
    .fillColor(DARK)
    .font("Helvetica-Bold")
    .text("Scoring Guide", 62, guideY + 10)
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#4b5563")
    .text("0–5 unchecked = You're well-automated. Focus on optimization.", 62, guideY + 26)
    .text("6–15 unchecked = Significant savings available. Start with quick wins.", 62, guideY + 38)
    .text("16–27 unchecked = Major opportunity. An Ops Sprint would transform your operations.", 62, guideY + 50);

  // ── Categories ──
  let y = guideY + 90;

  for (const category of categories) {
    // Check if we need a new page
    const neededHeight = 30 + category.items.length * 28;
    if (y + neededHeight > doc.page.height - 80) {
      doc.addPage();
      y = 60;
    }

    // Category header
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor(DARK)
      .text(category.title, 50, y, { width: pageWidth });
    y += 24;

    // Items
    for (const item of category.items) {
      // Checkbox
      doc
        .rect(54, y + 1, 12, 12)
        .lineWidth(1.2)
        .strokeColor("#d1d5db")
        .stroke();

      // Item text
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#374151")
        .text(item, 76, y + 1, { width: pageWidth - 36, lineGap: 2 });

      // Hours estimate field
      const textHeight = doc.heightOfString(item, { width: pageWidth - 36 });
      y += Math.max(textHeight + 8, 22);
    }

    y += 14;
  }

  // ── Summary section ──
  if (y + 160 > doc.page.height - 80) {
    doc.addPage();
    y = 60;
  }

  doc.rect(50, y, pageWidth, 100).fillAndStroke(LIGHT_BG, "#e5e7eb");

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor(DARK)
    .text("Your Results", 62, y + 12);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#4b5563")
    .text("Total unchecked items: ______ / 27", 62, y + 32)
    .text("Estimated hours wasted per week: ______ hrs", 62, y + 48)
    .text("Estimated annual cost ($50/hr): $______", 62, y + 64)
    .text("Top 3 categories to automate first:", 62, y + 80);

  y += 120;

  // ── CTA ──
  if (y + 100 > doc.page.height - 80) {
    doc.addPage();
    y = 60;
  }

  doc.rect(50, y, pageWidth, 80).fillAndStroke(DARK, DARK);

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor(LIME)
    .text("Want us to build the automations for you?", 62, y + 14, { width: pageWidth - 24 });

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(WHITE)
    .text(
      "The Agency Ops Engine: We install 4-6 automations end-to-end in 10 business days. " +
      "Guaranteed to free up 40+ hours or we work for free.",
      62,
      y + 36,
      { width: pageWidth - 24, lineGap: 3 }
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(LIME)
    .text("Visit ayothedoc.com/offer to learn more", 62, y + 62);

  // Finalize
  doc.end();

  stream.on("finish", () => {
    const stats = fs.statSync(outputPath);
    console.log(`PDF generated: ${outputPath}`);
    console.log(`Size: ${(stats.size / 1024).toFixed(1)} KB`);
  });
}

generatePDF();
