import express, { type Express, type Request, type Response } from "express";
import router from "./routes/router";
import { errorMiddleware } from "./middlewares/errors.middleware";

const app: Express = express();

app.use(express.json());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is up and running" });
});
app.use((req, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorMiddleware);

export default app;
