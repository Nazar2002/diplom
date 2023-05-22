import { Router } from "express";

import { UserRouter } from "./auth-router";

import { BasketRouter } from "./basket-router";

import { TypeRouter } from "./type-router";

import { BrandRouter } from "./brand-router";

import { DeviceRouter } from "./device-router";

const routerInstance = Router();

routerInstance.use("/auth", UserRouter);

routerInstance.use("/device", DeviceRouter);

routerInstance.use("/type", TypeRouter);

routerInstance.use("/brand", BrandRouter);

routerInstance.use("/basket", BasketRouter);

export { routerInstance };
