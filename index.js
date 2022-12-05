import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(cookieParser);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Running");
});
