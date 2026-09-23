import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/IuserRepository";



export class GetUserById{
    constructor(private readonly userRepository:IUserRepository){};

    async execute(id:string):Promise<User>{
        const user =await this.userRepository.findById(id);

        if(!user){
            throw new Error('User Not Found')
        }

        return user;
    }

}




