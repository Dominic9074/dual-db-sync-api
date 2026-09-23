import { Router } from "express";

import { MongoUserRepository } from "../../infrastructure/database/mongo/repositories/MongoUserRepository";

import { CreateUser } from "../../application/use-cases/user/createUser";
import { GetUserById } from "../../application/use-cases/user/GetUserById";
import { UpdateUser } from "../../application/use-cases/user/UpdateUser";
import { DeleteUser } from "../../application/use-cases/user/DeleteUser";

import { UserController } from "../controller/user.controller";
import { validate } from "../middlewares/validate";
import { createUserSchema, updateUserSchema } from "../../application/dtos/user/user.schema";

import { authMiddleware } from "../middlewares/auth.middleware";
import { requireOwnerOrAdmin } from "../middlewares/rbac.middleware";


const router=Router();


const userRepository=new MongoUserRepository;

const createUser=new CreateUser(userRepository)
const getUserById = new GetUserById(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

const userController = new UserController(
  createUser,
  getUserById,
  updateUser,
  deleteUser
);

//routes

router.post(
  "/",
  validate(createUserSchema),
  userController.create.bind(userController)
);

router.get(
  "/:id",
  authMiddleware,
  requireOwnerOrAdmin,
  userController.getById.bind(userController)
);

router.put(
  "/:id",
  authMiddleware,
  requireOwnerOrAdmin,
  validate(updateUserSchema),
  userController.update.bind(userController)
);

router.delete(
  "/:id",
  authMiddleware,
  requireOwnerOrAdmin,
  userController.delete.bind(userController)
);

export default router;