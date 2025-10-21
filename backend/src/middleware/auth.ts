import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function verifyAccessToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
   // console.log("Middleware using SECRET:", process.env.JWT_ACCESS_SECRET);
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as any;
    req.userId = payload.userId;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
