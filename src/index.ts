import express, { type Express, type Request, type Response } from "express";
import { PORT } from "./envhandler";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server up and running http://localhost:${PORT}`);
});
