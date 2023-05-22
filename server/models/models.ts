import { DataTypes } from "sequelize";

import { SequelizeInstance } from "../db";

const User = SequelizeInstance.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  email: { type: DataTypes.STRING, unique: true },

  password: { type: DataTypes.STRING },

  firstName: { type: DataTypes.STRING, allowNull: false },

  lastName: { type: DataTypes.STRING, allowNull: false },

  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = SequelizeInstance.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = SequelizeInstance.define("basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = SequelizeInstance.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: { type: DataTypes.STRING, allowNull: false },

  price: { type: DataTypes.INTEGER, allowNull: false },

  rating: { type: DataTypes.INTEGER, defaultValue: 0 },

  mainDescription: { type: DataTypes.TEXT, allowNull: false },

  img: { type: DataTypes.STRING, allowNull: false },
});

const Brand = SequelizeInstance.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Type = SequelizeInstance.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = SequelizeInstance.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = SequelizeInstance.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  title: { type: DataTypes.STRING, allowNull: false },

  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = SequelizeInstance.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export {
  User,
  Basket,
  Device,
  Brand,
  Type,
  DeviceInfo,
  BasketDevice,
  TypeBrand,
  Rating,
};
