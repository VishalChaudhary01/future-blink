import "dotenv/config";
import express from "express";
import { Env } from "./config/Env";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Healty server" });
});

app.listen(Env.PORT, () =>
  console.log(`Server running at http://localhost${Env.PORT}`),
);
