import app from "./api/app";
import connection from "./database/db-connection";
import { DBDog } from "./database/models/DBDog";

const PORT = process.env.SERVER_PORT || 3000;

const start = async () => {
  await connection.sync();

  const dogsRepository = connection.getRepository(DBDog);
  await dogsRepository.findOrCreate({
    where: { name: "Neo" },
    defaults: {
      name: "Neo",
      color: "red & amber",
      tail_length: 22,
      weight: 32,
    },
  });

  await dogsRepository.findOrCreate({
    where: { name: "Jessy" },
    defaults: {
      name: "Jessy",
      color: "black & white",
      tail_length: 7,
      weight: 14,
    },
  });

  console.log("Connected to db successfully");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

start();
