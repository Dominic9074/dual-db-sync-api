import { User, userRole } from "../../../../domain/entities/user";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { UserModel } from "../models/UserModel";
import { publishUserEvent } from "../../../messaging/rabbitmq/publisher";

export interface CreateUserData {
  email: string;
  password: string;
  role: userRole;
}

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

    async create(data: CreateUserData): Promise<User> {
        const createdUser =await UserModel.create({
            email:data.email,
            password:data.password,
            role:data.role,
        })

        const user: User = {
            id: createdUser._id.toString(),
            email: createdUser.email,
            password: createdUser.password,
            role: createdUser.role,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
        };

        publishUserEvent({
            type: "user.created",
            userId: user.id,
            data: {
            email: user.email,
            password: user.password,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            },
        });

        return user;
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



