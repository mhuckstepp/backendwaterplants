import * as dotenv from "dotenv";
dotenv.config();
import server from './api/server'

if (!process.env.PORT) {
  process.exit(1);
}

const port: number = parseInt(process.env.PORT as string, 10);

server.use("/", (req: any, res: any) => {
  res.send({ message: "Welcome to our water my plants api" });
});

server.listen(port, () => {
  console.log("listening on " + port);
});
