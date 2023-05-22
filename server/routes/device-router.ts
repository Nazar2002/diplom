import { Router } from "express";

import { DeviceController } from "../controlers/DeviceController";

const DeviceRouter = Router();

const DeviceControllerInstance = new DeviceController();

DeviceRouter.get("/item/:id", DeviceControllerInstance.getItem);

DeviceRouter.get("/items", DeviceControllerInstance.getItems);

DeviceRouter.post("/item", DeviceControllerInstance.setItem);

DeviceRouter.delete("/item", DeviceControllerInstance.deleteItem);

export { DeviceRouter };
