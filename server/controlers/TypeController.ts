import express from "express";

import { Type } from "../models/models";

class TypeController {
  async createType(req: express.Request, res: express.Response) {
    const { name } = req.body;

    const type = await Type.create({ name });

    return res.status(200).json(type);
  }

  async getAll(req: express.Request, res: express.Response) {
    const types = await Type.findAll();

    return res.status(200).json(types);
  }
}

export { TypeController };
