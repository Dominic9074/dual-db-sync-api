import { JwtPayload } from "../../infrastructure/auth/jwt.service";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};