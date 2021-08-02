import express from "express";
import cors from "cors";
import helmet from "helmet";
import AuthRouter from "./auth/router";
import PlantRouter from "./plants/router";

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", AuthRouter);
server.use("/api/plants", PlantRouter);

//eslint-disable-next-line
server.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: err, message: err.message });
});

export default server
