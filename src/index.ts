import app from "./app";
import { PORT } from "./envhandler";

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server up and running http://localhost:${PORT}`);
  });
};

startServer();
