import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  role: "user" | "admin";
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.userId !== "string" ||
    (decoded.role !== "user" && decoded.role !== "admin")
  ) {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decoded.userId,
    role: decoded.role,
  };
};