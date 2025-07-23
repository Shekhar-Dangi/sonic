import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { requireAuth } from "./middleware/auth";

import logsRoute from "./routes/logs";
import metricsRoute from "./routes/metrics";

import { AuthenticatedRequest } from "./middleware/auth";

dotenv.config();
const app: Application = express();

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.send("server is healthy!");
});

app.use("/test", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: "You're authenticated" });
});

app.use("/api/logs", logsRoute);
app.use("/api/metrics", metricsRoute);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
