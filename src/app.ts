import express, { type Express, type Request, type Response } from "express";
import router from "./routes/router";

const app: Express = express();

app.use(express.json());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is up and running" });
});
app.use((req, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
