import { IUserRepository } from "../../../domain/repositories/IuserRepository";



export class DeleteUser{
    constructor(private readonly userRepository:IUserRepository){};

    async execute(id:string){
        const existingUser = await this.userRepository.findById(id);

        if (!existingUser) {
            throw new Error("User not found");
        }

        const deleted = await this.userRepository.delete(id);

        if (!deleted) {
            throw new Error("Failed to delete user");
        }
    }
}

