import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../infrastructure/auth/jwt.service";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Authentication token required",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};





