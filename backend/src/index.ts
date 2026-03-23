import "dotenv/config";
import express from "express";
import cors from "cors";
import { Env } from "./config/Env";
import { connectDB } from "./config/db";
import appRoutes from "./routes/index";

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Healty server" });
});

app.use("/api", appRoutes);

app.listen(Env.PORT, () =>
  console.log(`Server running at http://localhost${Env.PORT}`),
);
