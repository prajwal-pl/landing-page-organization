import { type Request, type RequestHandler, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Initialize default admin user and section order if they don't exist
export const initializeAdmin = async () => {
  try {
    const adminExists = await prisma.admin.findFirst();
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await prisma.admin.create({
        data: {
          username: "admin",
          password: hashedPassword,
        },
      });
      console.log("Default admin user created");
    }

    const orderExists = await prisma.sectionOrder.findFirst();
    if (!orderExists) {
      await prisma.sectionOrder.create({
        data: {
          id: "default",
          sections: ["hero", "ourStory", "coachingServices", "meetCoach"],
        },
      });
      console.log("Default section order created");
    }
  } catch (error) {
    console.error("Error initializing admin data:", error);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin?.password!);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin?.id, username: admin?.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSectionOrder: RequestHandler = async (_req, res) => {
  try {
    const sectionOrder = await prisma.sectionOrder.findFirst({
      where: { id: "default" },
    });

    if (!sectionOrder) {
      res.status(404).json({ message: "Section order not found" });
    }

    res.status(200).json({ sections: sectionOrder?.sections });
  } catch (error) {
    console.error("Error getting section order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSectionOrder: RequestHandler = async (req, res) => {
  try {
    const { sections } = req.body;

    if (!sections || !Array.isArray(sections) || sections.length !== 4) {
      res.status(400).json({
        message:
          "Invalid section order. Must provide an array of 4 section identifiers.",
      });
    }

    // Validate that the sections array contains all required sections
    const requiredSections = [
      "hero",
      "ourStory",
      "coachingServices",
      "meetCoach",
    ];
    const isValid = requiredSections.every((section) =>
      sections.includes(section)
    );

    if (!isValid) {
      res.status(400).json({
        message: `Section order must contain exactly these sections: ${requiredSections.join(
          ", "
        )}`,
      });
    }

    const updatedOrder = await prisma.sectionOrder.update({
      where: { id: "default" },
      data: { sections },
    });

    res.status(200).json({
      message: "Section order updated successfully",
      sections: updatedOrder.sections,
    });
  } catch (error) {
    console.error("Error updating section order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
