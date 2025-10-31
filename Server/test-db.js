import pool from "./config/db.js";

(async () => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("✅ Connected successfully:", rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
})();
