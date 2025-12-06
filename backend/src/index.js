import express from "express";
import cors from "cors";
import salesRouter from "./routes/salesRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Sales API running" });
});

app.use("/api/sales", salesRouter);

app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});
