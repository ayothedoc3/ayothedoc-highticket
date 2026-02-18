import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";

// Import routes
import blogRouter from "./routes/blog.js";
import leadsRouter from "./routes/leads.js";
import automationRouter from "./routes/automation.js";

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS for development
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // API Routes
  app.use("/api/blog", blogRouter);
  app.use("/api/leads", leadsRouter);
  app.use("/api/automation", automationRouter);

  // Runtime client config (avoids Vite build-time env limitations)
  app.get("/config.js", (_req, res) => {
    res.setHeader("Content-Type", "application/javascript; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");

    const config = {
      gaMeasurementId: process.env.VITE_GA_MEASUREMENT_ID || "",
      stripe: {
        roadmap: process.env.VITE_STRIPE_ROADMAP_LINK || "",
        sprint: process.env.VITE_STRIPE_SPRINT_LINK || "",
        care: process.env.VITE_STRIPE_CARE_LINK || "",
      },
    };

    res.send(`window.__AY_CONFIG__ = ${JSON.stringify(config)};`);
  });

  // robots.txt
  app.get("/robots.txt", (_req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /
Sitemap: https://ayothedoc.com/sitemap.xml
`);
  });

  // sitemap.xml - dynamically built from blog posts + automation playbooks
  app.get("/sitemap.xml", async (_req, res) => {
    const base = "https://ayothedoc.com";
    const today = new Date().toISOString().split("T")[0];

    // Static pages
    const staticPages = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/blog", priority: "0.8", changefreq: "weekly" },
      { loc: "/automation", priority: "0.8", changefreq: "weekly" },
      { loc: "/checklist", priority: "0.7", changefreq: "monthly" },
      { loc: "/offer", priority: "0.9", changefreq: "monthly" },
      { loc: "/playbook", priority: "0.7", changefreq: "monthly" },
      { loc: "/contact", priority: "0.6", changefreq: "monthly" },
    ];

    // Blog posts
    const blogUrls: { loc: string; priority: string; changefreq: string }[] = [];
    const postsDir = path.join(process.cwd(), "content", "posts");
    if (fs.existsSync(postsDir)) {
      const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));
      for (const file of files) {
        const slug = file.replace(/\.mdx?$/, "");
        blogUrls.push({ loc: `/blog/${slug}`, priority: "0.7", changefreq: "monthly" });
      }
    }

    // Automation playbooks
    const autoUrls: { loc: string; priority: string; changefreq: string }[] = [];
    const pagesDir = path.join(process.cwd(), "data", "programmatic-seo", "pages");
    if (fs.existsSync(pagesDir)) {
      const files = fs.readdirSync(pagesDir).filter(f => f.endsWith(".json"));
      for (const file of files) {
        const slug = file.replace(/\.json$/, "");
        autoUrls.push({ loc: `/automation/${slug}`, priority: "0.7", changefreq: "monthly" });
      }
    }

    const allUrls = [...staticPages, ...blogUrls, ...autoUrls];
    const urlEntries = allUrls.map(u => `  <url>
    <loc>${base}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n");

    res.setHeader("Content-Type", "application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`);
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Serve static files from dist/public
  // When running with tsx, __dirname is the server/ folder
  // The static files are in dist/public relative to project root
  const staticPath = path.resolve(process.cwd(), "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ error: "Not found" });
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`API endpoints:`);
    console.log(`  - GET  /api/blog`);
    console.log(`  - GET  /api/blog/:slug`);
    console.log(`  - GET  /api/blog/categories`);
    console.log(`  - GET  /api/blog/recent`);
    console.log(`  - POST /api/leads`);
    console.log(`  - GET  /api/automation`);
    console.log(`  - GET  /api/automation/filters`);
    console.log(`  - GET  /api/automation/:slug`);
    console.log(`  - GET  /api/health`);
  });
}

startServer().catch(console.error);
