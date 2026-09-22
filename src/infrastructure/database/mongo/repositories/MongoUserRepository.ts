import { User } from "../../../../domain/entities/user";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { UserModel } from "../models/UserModel";


export class MongoUserRepository implements IUserRepository{
    async findById(id: string): Promise<User | null> {
        const user =await UserModel.findById(id).lean();

        if(!user){
            return null;
        };

        return {
            id:user._id.toString(),
            email:user.email,
            password: user.password,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        const user=await UserModel.findOne({email}).lean();

        if (!user) {
            return null;
        }

        return {
            id: user._id.toString(),
            email: user.email,
            password: user.password,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    async create(user: User): Promise<User> {
        const createdUser =await UserModel.create({
            email:user.email,
            password:user.password,
            role:user.role,
        })

        return {
            id: createdUser._id.toString(),
            email: createdUser.email,
            password: createdUser.password,
            role: createdUser.role,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
        };
    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        const updatedUser=await UserModel.findByIdAndUpdate(id,data,{new:true,runValidators:true}).lean();

        if(!updatedUser){
            return null;
        }

        return {
            id: updatedUser._id.toString(),
            email: updatedUser.email,
            password: updatedUser.password,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        };

    }

    async delete(id: string): Promise<boolean> {
        const deletedUser=await UserModel.findByIdAndDelete(id);

        return deletedUser !==null;
    }
}



