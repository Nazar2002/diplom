import express from "express";

import { Brand } from "../models/models";

class BrandController {
  async createBrand(req: express.Request, res: any) {
    const { name } = req.body;

    const brand = await Brand.create({ name });

    return res.status(200).json(brand);
  }

  async getAll(req: express.Request, res: any) {
    const brands = await Brand.findAll();

    return res.status(200).json(brands);
  }
}

export { BrandController };
