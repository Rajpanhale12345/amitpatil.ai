import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM profiles ORDER BY updated_at DESC LIMIT 1");
    if (!rows.length) return res.status(404).json({ error: "Profile not found" });
    res.json(rows[0]);
  } catch (err) {
   return res.status(500).json({ error: "Database query failed" });
  }
});

export default router;
