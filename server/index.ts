import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes";
import { initializeAdmin } from "./controllers/adminController";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize middleware
app.use(cors());
app.use(express.json());

// Initialize default admin and section order
initializeAdmin();

// Routes
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
