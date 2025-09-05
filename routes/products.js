import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Add product
router.post("/", async (req, res) => {
  const { collection_id, name, description, base_price, image_url } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO Products (collection_id, name, description, base_price, image_url) VALUES (?, ?, ?, ?, ?)",
      [collection_id, name, description, base_price, image_url]
    );
    res.json({ id: result.insertId, message: "✅ Product added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM Products");
  res.json(rows);
});

export default router;
