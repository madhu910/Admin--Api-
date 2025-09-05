import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
import variantsRouter from "./routes/variants.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple auth middleware
app.use((req, res, next) => {
  const token = req.headers["x-admin-token"];
  if (req.method !== "GET" && token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
});

app.use("/products", productsRouter);
app.use("/variants", variantsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Admin API running on port ${PORT}`));
