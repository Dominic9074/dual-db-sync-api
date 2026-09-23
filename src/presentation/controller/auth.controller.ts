import { Request, Response } from "express";
import { Login } from "../../application/use-cases/auth/Login";


export class AuthController {
  constructor(private readonly login: Login) {}

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.login.execute(req.body);

      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      res.status(401).json({
        message:
          error instanceof Error
            ? error.message
            : "Invalid email or password",
      });
    }
  }
}