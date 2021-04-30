require("dotenv").config();

const server = require("./api/server");

const port = process.env.PORT;

// server.use(express.static(path.join(__dirname, 'client/dist')))

// server.get('*', (req, res) => {
//   // if you want to serve a SPA using Express you totally can!
//   res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
// })

server.use("/", (req, res) => {
  res.send({ message: "Welcome to our water my plants api" });
});

server.listen(port, () => {
  console.log("listening on " + port);
});
