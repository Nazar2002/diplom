import { Sequelize } from "sequelize";

const SequelizeInstance = new Sequelize(
  process.env.DB_NAME ?? "",
  process.env.DB_USER ?? "postgres",
  process.env.DB_PASSWORD ?? "22011980",
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) ?? 5432,
  }
);

export { SequelizeInstance };
