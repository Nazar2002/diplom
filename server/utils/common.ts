import jwt from "jsonwebtoken";

const generateJsonWebToken = (user: any) => {
  return jwt.sign({ user }, process.env.SECRET_KEY ?? "", { expiresIn: "12h" });
};

export { generateJsonWebToken };
