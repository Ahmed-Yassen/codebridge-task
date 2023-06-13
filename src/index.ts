import app from "./api/app";

const PORT = process.env.SERVER_PORT || 3000;

app.listen(() => {
  console.log(`Server is listening on port ${PORT}`);
});
