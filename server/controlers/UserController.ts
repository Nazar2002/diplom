import express from "express";

import bcrypt from "bcrypt";

import { generateJsonWebToken } from "../utils/common";

import { Basket, User } from "../models/models";

class UserController {
  async signIn(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;

      const user: any = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Даного користувача не знайдено" });
      }

      const comparePassword = bcrypt.compareSync(password, user?.password);

      if (!comparePassword) {
        return res
          .status(404)
          .json({ message: "Не правильний email або пароль" });
      }

      const jsonWebToken = generateJsonWebToken(user);

      return res.status(200).json({ user, jsonWebToken });
    } catch (e) {
      console.log(e);
    }
  }

  async signUp(req: express.Request, res: express.Response) {
    try {
      const { email, password, firstName, lastName, role } = req.body;

      if (!email || !password) {
        return res
          .status(404)
          .json({ message: "Не правильний email або пароль" });
      }

      const testEmail = await User.findOne({ where: { email } });

      if (testEmail) {
        return res
          .status(404)
          .json({ message: "Такий користувач уже створений" });
      }

      const hashPassword = await bcrypt.hash(password.toString(), 4);

      const user: any = await User.create({
        email,
        role,
        password: hashPassword,
        firstName,
        lastName,
      });

      await Basket.create({ userId: user?.id });

      const jsonWebToken = generateJsonWebToken(user);

      return res.status(200).json({ user, jsonWebToken });
    } catch (e) {
      console.log(e);
    }
  }

  async authenticate(req: any, res: express.Response) {
    try {
      return res.status(200).json(req.user);
    } catch (e) {
      console.log(e);
    }
  }
}

export { UserController };
