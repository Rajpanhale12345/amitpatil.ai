import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM services ORDER BY updated_at ASC");
    if (!rows.length) return res.status(200).json();
    res.json(rows);
  } catch (err) {
    console.error("Query Error:", err);
    res.status(500).json({ error: "Database query failed"});
  }
});
export default router;