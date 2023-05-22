import { Router } from "express";

import { BasketController } from "../controlers/BasketController";

import { authMiddleware } from "../middleware/authMiddleware";

const BasketRouter = Router();

const BasketControllerInstance = new BasketController();

BasketRouter.get("/", authMiddleware, BasketControllerInstance.getBasketUser);

BasketRouter.post("/", authMiddleware, BasketControllerInstance.addToBasket);

BasketRouter.delete(
  "/",
  authMiddleware,
  BasketControllerInstance.deleteFromBasket
);

export { BasketRouter };
