import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "colors";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoute.js";
import bookRoutes from "./src/routes/bookRoute.js";
import borrowRoutes from "./src/routes/borrowRoute.js";
import userRoutes from "./src/routes/userRoute.js";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import { notifyUsers } from "./src/services/notifyUsers.js";
import { removeUnverifiedAccount } from "./src/services/removeUnverifiedAccount.js";

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.get("/test", (req, res) => {
  res.send("Test route working");
});

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/borrow", borrowRoutes);
app.use("/api/v1/user", userRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/dist")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(errorMiddleware);

app.listen(port, () => {
  connectDB();
  notifyUsers();
  removeUnverifiedAccount();
  console.log(`Server is running on http://localhost:${port}`.bgMagenta.white);
});
