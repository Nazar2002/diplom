import express from "express";

import { BasketDevice, Device } from "../models/models";

class BasketController {
  async addToBasket(req: any, res: express.Response) {
    const user: any = req.user.user;

    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(404).json({ message: 'DeviceId обов"язкове поле' });
    }

    const basketCheck = await BasketDevice.findOne({
      where: { deviceId: deviceId },
    });

    if (basketCheck) {
      return res
        .status(404)
        .json({ message: "Даний продукт знаходиться у вашій корзині" });
    }

    const basket = await BasketDevice.create({
      basketId: user.id,
      deviceId: deviceId,
    });
    return res.status(200).json(basket);
  }

  async getBasketUser(req: any, res: express.Response) {
    try {
      const { id } = req.user.user;

      const basket = await BasketDevice.findAll({
        include: { model: Device },
        where: { basketId: id },
      });

      return res.status(200).json(basket);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFromBasket(req: express.Request, res: express.Response) {
    try {
      const { id } = req.query as { id: string };

      if (!id) {
        return res.status(404).json({ message: 'Id обов"язкове поле' });
      }

      await BasketDevice.destroy({ where: { id } });

      const devices = await BasketDevice.findAll();

      return res.status(200).json(devices);
    } catch (e) {
      console.log(e);
    }
  }
}

export { BasketController };
