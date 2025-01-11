import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser"

import { connectDB } from "./lib/db.js"
import path from "path";

import binRoutes from "./routes/bin.route.js"
import userRoutes from "./routes/user.route.js"
import complaintRoutes from "./routes/complaint.route.js"
import adminRoutes from "./routes/admin.route.js";
import driverRoutes from "./routes/driver.route.js"
import workRoutes from "./routes/work.route.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

dotenv.config();

const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

//defining routes
app.use("/api/bins", binRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use('/api', complaintRoutes);
app.use("/api", driverRoutes);
app.use("/api", workRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    connectDB();
})
