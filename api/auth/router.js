const router = require("express").Router();
const { checkUserExists, validateUser } = require("./middleware");
const { addUser, makeToken } = require("./models");

router.post("/login", checkUserExists, (req, res, next) => {
  const token = makeToken(req.body)
  res.json("welcome to auth router login");
});

router.post("/register", validateUser, (req, res, next) => {
  addUser(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.use("/", (req, res, next) => {
  res.json("welcome to auth router");
});

module.exports = router;
