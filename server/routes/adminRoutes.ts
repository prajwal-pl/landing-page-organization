import express from "express";
import { login, getSectionOrder, updateSectionOrder } from "../controllers/adminController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.post("/login", login);

// Protected routes
router.get("/section-order", getSectionOrder);
router.put("/section-order", authMiddleware, updateSectionOrder);

export default router;