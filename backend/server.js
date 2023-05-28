import path from "path";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
const port = process.env.PORT || 7000;
import userRoutes from "./routes/userRoutes.js";

connectDb();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", () => {
    console.log("server runs!!!");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server is running on port:", port);
});
