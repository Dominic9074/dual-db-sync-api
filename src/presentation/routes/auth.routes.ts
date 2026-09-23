import { Router } from "express";

import { MongoUserRepository } from "../../infrastructure/database/mongo/repositories/MongoUserRepository";

import { Login } from "../../application/use-cases/auth/Login";

import { AuthController } from "../controller/auth.controller";

const router = Router();

const userRepository = new MongoUserRepository();

const login = new Login(userRepository);

const authController = new AuthController(login);

router.post(
  "/login",
  authController.loginUser.bind(authController)
);

export default router;