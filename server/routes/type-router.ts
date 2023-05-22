import { Router } from "express";

import { TypeController } from "../controlers/TypeController";

const TypeRouter = Router();

const TypeControllerInstance = new TypeController();

TypeRouter.post("/", TypeControllerInstance.createType);

TypeRouter.get("/", TypeControllerInstance.getAll);

export { TypeRouter };
