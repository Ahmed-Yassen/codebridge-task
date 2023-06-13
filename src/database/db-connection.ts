import path from "path";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

const connection = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [path.join(__dirname + "/models/")],
  repositoryMode: true,
});

export default connection;
