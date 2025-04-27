import {
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Extend Express Request interface to include user data
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
      };
    }
  }
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized - Invalid token format" });
    }

    try {
      const decoded = jwt.verify(token!, JWT_SECRET) as jwt.JwtPayload;

      if (!decoded.id || !decoded.username) {
        res
          .status(401)
          .json({ message: "Unauthorized - Invalid token payload" });
      }

      req.user = {
        id: decoded.id as string,
        username: decoded.username as string,
      };
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
