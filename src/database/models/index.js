import { Sequelize, DataTypes } from "sequelize";
import config from "../../config/database.js";
import UserModel from "./User.js";
import GeneratedImageModel from "./GeneratedImage.js";

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
    port: config[env].port,
    logging: config[env].logging,
    dialectOptions: config[env].dialectOptions,
    define: config[env].define,
  }
);

// Init models
const User = UserModel(sequelize, DataTypes);
const GeneratedImage = GeneratedImageModel(sequelize, DataTypes);

// 💡 Define associations (relations) here
User.hasMany(GeneratedImage, { foreignKey: "userId", onDelete: "CASCADE" });
GeneratedImage.belongsTo(User, { foreignKey: "userId" });

// 💡 Export models and sequelize instance
export { sequelize, User, GeneratedImage };
