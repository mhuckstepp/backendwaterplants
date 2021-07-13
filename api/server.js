const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const AuthRouter = require("./auth/router");
const PlantRouter = require("./plants/router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", AuthRouter);
server.use("/api/plants", PlantRouter);

//eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(500).json({ error: err, message: err.message });
});

module.exports = server;
