import express from "express";
import { createServer } from "http";
import path from "path";

// Import routes
import blogRouter from "./routes/blog.js";
import leadsRouter from "./routes/leads.js";

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
    console.log(`  - GET  /api/health`);
  });
}

startServer().catch(console.error);
