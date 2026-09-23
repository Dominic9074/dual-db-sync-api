import { Request, Response, NextFunction } from "express";

export const requireRole = (role: "user" | "admin") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    if (req.user.role !== role) {
      res.status(403).json({
        message: "Forbidden",
      });
      return;
    }

    next();
  };
};

export const requireOwnerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      message: "Authentication required",
    });
    return;
  }

  const isAdmin = req.user.role === "admin";
  const isOwner = req.user.userId === req.params.id;

  if (!isAdmin && !isOwner) {
    res.status(403).json({
      message: "You are not allowed to access this resource",
    });
    return;
  }

  next();
};