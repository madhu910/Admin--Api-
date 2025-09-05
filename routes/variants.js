import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

// create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Get all variants
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Variants");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new variant
router.post("/", async (req, res) => {
  try {
    const { product_id, color, size, stock, price } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Variants (product_id, color, size, stock, price) VALUES (?, ?, ?, ?, ?)",
      [product_id, color, size, stock, price]
    );
    res.json({ id: result.insertId, message: "Variant added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
