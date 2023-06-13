import path from "path";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config({
  path: path.join(__dirname + `/../../config/${process.env.NODE_ENV}.env`),
});

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
