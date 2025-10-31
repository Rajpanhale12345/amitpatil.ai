// config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Prefer a single connection URL; fall back to discrete vars if needed
const URL_FROM_ENV =
  process.env.DB_URL ||
  process.env.DATABASE_URL ||
  process.env.MYSQL_URL ||
  null;

const url = URL_FROM_ENV;
const usingRailwayPublicProxy = (() => {
  try {
    return url ? new URL(url).hostname.endsWith("proxy.rlwy.net") : false;
  } catch {
    return false;
  }
})();

const pool = url
  ? mysql.createPool({
      uri: url,                 // e.g. mysql://root:pwd@host:port/db
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      // Only add SSL if you really need it. Most Railway MySQL connections work fine without this.
      ssl: usingRailwayPublicProxy ? undefined : undefined
      // If you *must* force TLS and see cert errors, try:
      // ssl: { rejectUnauthorized: false }
    })
  : mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

// Convenience helpers
export default {
  query: (...args) => pool.query(...args),
  getConnection: () => pool.getConnection(),
  pool,
};
