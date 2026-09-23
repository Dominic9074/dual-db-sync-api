import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/IuserRepository";
import bcrypt from 'bcrypt'

interface UpdateUserInput {
  email?: string;
  password?: string;
  role?: "user" | "admin";
}


export class UpdateUser{
    constructor(private readonly userRepository:IUserRepository){}

    async execute(id:string,input:UpdateUserInput):Promise<User>{
        const existingUser=await this.userRepository.findById(id);

        if (!existingUser) {
            throw new Error("User not found");
        }

        const updateData: UpdateUserInput = {
            ...input,
        };

        if (input.password) {
            updateData.password = await bcrypt.hash(input.password, 10);
        }

        const updatedUser = await this.userRepository.update(
            id,
            updateData
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    }
}

