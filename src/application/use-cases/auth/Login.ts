import bcrypt from "bcrypt";

import { IUserRepository } from "../../../domain/repositories/IuserRepository"; 
import { signToken } from "../../../infrastructure/auth/jwt.service";

interface LoginInput {
  email: string;
  password: string;
}

export class Login {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: LoginInput): Promise<string> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(
      input.password,
      user.password
    );

    if (!passwordMatches) {
      throw new Error("Invalid email or password");
    }

    const token = signToken({
      userId: user.id,
      role: user.role,
    });

    return token;
  }
}