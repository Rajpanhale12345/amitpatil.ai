import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";

import profileRoutes from "./routes/profile.js";
import clientRoutes from "./routes/clients.js";
import servicesRoutes from "./routes/services.js";
import contactRoutes from "./routes/contact.js";
import infoRoutes from "./routes/info.js";

dotenv.config();

const app = express();

// ---- CORS ----
// Put your Netlify URL(s) here
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,        // e.g. https://your-site.netlify.app
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // allow no Origin (e.g., curl, health checks)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: false,
  })
);

// ---- Parsers ----
app.use(express.json());

// ---- Root & Health ----
app.get("/", (_req, res) => res.send("API running ✅"));
app.get("/api/health", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS ok");
    res.json({ ok: true, db: rows[0]?.ok === 1 });
  } catch (e) {
    res.status(500).json({ ok: false, db: false, error: e.message });
  }
});

// ---- Routes ----
app.use("/profile", profileRoutes);
app.use("/clients", clientRoutes);
app.use("/services", servicesRoutes);
app.use("/contact", contactRoutes);
app.use("/info", infoRoutes);

// ---- 404 ----
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});

// ---- Error handler ----
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res
    .status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500)
    .json({ error: err.message || "Server error" });
});

// ---- Start ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} 🚀`);
  // warm up DB connection on boot
  try {
    await db.query("SELECT 1");
    console.log("MySQL connection ✅");
  } catch (e) {
    console.error("MySQL connection ❌", e.message);
  }
});
