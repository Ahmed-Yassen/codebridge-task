import app from "./api/app";
import connection from "./database/db-connection";
import { DBDog } from "./database/models/DBDog";

const PORT = process.env.SERVER_PORT || 3000;

const start = async () => {
  await connection.sync();
  console.log("Connected to db successfully");
  app.listen(() => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

start();
