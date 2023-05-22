import { Router } from "express";

import { UserController } from "../controlers/UserController";

import { authMiddleware } from "../middleware/authMiddleware";

const UserRouter = Router();

const UserControllerInstance = new UserController();

UserRouter.post("/sign-in", UserControllerInstance.signIn);

UserRouter.post("/sign-up", UserControllerInstance.signUp);

UserRouter.get(
  "/authenticate",
  authMiddleware,
  UserControllerInstance.authenticate
);

export { UserRouter };
