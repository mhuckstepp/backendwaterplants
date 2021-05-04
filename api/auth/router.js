const router = require("express").Router();
const { validateLogin, validateRegister, hashPass, makeToken } = require("./middleware");
const { addUser } = require("./models");

router.post("/login", validateLogin, (req, res, next) => {
  const token = makeToken(req.foundUser)
  res.status(200).json({message: `welcome back ${req.body.email}`, token})
});

router.post("/register", validateRegister, hashPass, async (req, res, next) => {
  addUser(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.use("/", (req, res, next) => {
  res.json("welcome to auth router");
});

module.exports = router;
