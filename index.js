require("dotenv").config();

const server = require("./api/server");

const port = process.env.PORT;

server.use("/", (req, res) => {
  res.send({ message: "Welcome to our water my plants api" });
});

server.listen(port, () => {
  console.log("listening on " + port);
});
