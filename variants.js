import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { product_id, color, size, stock, price } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO Variants (product_id, color, size, stock, price) VALUES (?, ?, ?, ?, ?)",
      [product_id, color, size, stock, price]
    );
    res.json({ id: result.insertId, message: "✅ Variant added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM Variants");
  res.json(rows);
});

export default router;
