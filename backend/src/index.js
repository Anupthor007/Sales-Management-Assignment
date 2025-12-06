import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import salesRouter from "./routes/salesRoutes.js";
import { loadSalesData } from "./utils/loadData.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

await loadSalesData();

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "TruEstate Retail Sales API" });
});

app.use("/api/sales", salesRouter);

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
