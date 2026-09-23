import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/IuserRepository";
import bcrypt from "bcrypt";


interface CreateUserInput{
    email:string,
    password:string,
    role?:'user'|'admin'
}

export class CreateUser{
    constructor(private readonly userRepository:IUserRepository){}

    async execute(input:CreateUserInput):Promise<User>{
        const existingUser=await this.userRepository.findByEmail(input.email);

        if(existingUser){
            throw new Error('User Already Exist')
        }

        const hashedPassword=await bcrypt.hash(input.password,10);

        return await this.userRepository.create({
            email: input.email,
            password: hashedPassword,
            role: input.role ?? "user",
        });
     }
}
