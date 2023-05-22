import { Router } from "express";

import { BrandController } from "../controlers/BrandController";

const BrandRouter = Router();

const BrandControllerInstance = new BrandController();

BrandRouter.post("/", BrandControllerInstance.createBrand);

BrandRouter.get("/", BrandControllerInstance.getAll);

export { BrandRouter };
