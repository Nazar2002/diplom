import { v4 as uuidv4 } from "uuid";

import path from "path";

import { Device, DeviceInfo } from "../models/models";
import express from "express";

class DeviceController {
  async getItems(req: express.Request, res: express.Response) {
    try {
      let { brandId, typeId } = req.query as {
        brandId: string;
        typeId: string;
      };

      let devices;

      if (!brandId && !typeId) {
        devices = await Device.findAll();
      }

      if (brandId && !typeId) {
        devices = await Device.findAll({ where: { brandId } });
      }

      if (!brandId && typeId) {
        devices = await Device.findAll({ where: { typeId } });
      }

      if (brandId && typeId) {
        devices = await Device.findAll({ where: { typeId, brandId } });
      }

      return res.status(200).json(devices);
    } catch (e) {
      console.log(e);
    }
  }
  async getItem(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });

      if (!device) {
        return res.status(404).json({ message: "Даний продукт не знайдено" });
      }

      return res.status(200).json(device);
    } catch (e) {
      console.log(e);
    }
  }
  async deleteItem(req: express.Request, res: express.Response) {
    try {
      const { id } = req.body;
      await Device.destroy({ where: { id } });

      const devices = await Device.findAll();

      return res.status(200).json(devices);
    } catch (e) {
      console.log(e);
    }
  }
  async setItem(req: express.Request, res: express.Response) {
    try {
      let { name, price, rating, info, brandId, typeId, mainDescription } =
        req.body;
      const { img } = req.files as any;

      let fileName = uuidv4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "assets", fileName));

      const device: any = await Device.create({
        name,
        price,
        rating,
        info,
        mainDescription,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i: any) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.status(200).json(device);
    } catch (e) {
      console.log(e);
    }
  }
}

export { DeviceController };
