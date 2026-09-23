import { EqualOperator } from "typeorm";
import { CreateUser } from "../../application/use-cases/user/createUser";
import { DeleteUser } from "../../application/use-cases/user/DeleteUser";
import { GetUserById } from "../../application/use-cases/user/GetUserById";
import { UpdateUser } from "../../application/use-cases/user/UpdateUser";
import {Request,Response} from 'express'


export class UserController{
    constructor(
        private readonly createUser: CreateUser,
        private readonly getUserById: GetUserById,
        private readonly updateUser: UpdateUser,
        private readonly deleteUser: DeleteUser,
    ){}

    async create(req:Request,res:Response){
        try{
            const user =await this.createUser.execute({
                email:req.body.email,
                password:req.body.password,
                role:req.body.role,
            })

            res.status(201).json({
                message: "User created successfully",
                user,
            });
        }catch(error){
            res.status(400).json({
                message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong",
            });
        }
    }

    async getById(req:Request,res:Response):Promise<void>{
        try{
            const user =await this.getUserById.execute(req.params.id as string);

            res.status(200).json({
                user,
            });
        }catch(error){
            res.status(404).json({
                message:error instanceof Error ? error.message : "User not found",
            });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.updateUser.execute(req.params.id as string,req.body);
      res.status(200).json({
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      res.status(404).json({
        message:
          error instanceof Error
            ? error.message
            : "User not found",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.deleteUser.execute(req.params.id as string);

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(404).json({
        message:
          error instanceof Error
            ? error.message
            : "User not found",
      });
    }
  }
}




