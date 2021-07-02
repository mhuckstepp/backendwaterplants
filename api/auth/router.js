const router = require("express").Router();
const {
  validateLogin,
  validateRegister,
  hashPass,
  makeToken,
} = require("./middleware");
const { addUser, getUserByEmail, getAllUsers, editUser } = require("./models");
const restrictAccess = require("./restrictAccess");

router.post("/login", validateLogin, (req, res, next) => {
  const token = makeToken(req.foundUser);
  res.status(200).json({ message: `welcome back ${req.body.email}`, token });
});

router.put("/", restrictAccess, hashPass, (req, res, next) => {
  editUser(req.decodedToken.subject, req.body)
    .then((user) => {
      const token = makeToken(user);
      res.status(200).json({ message: "user info updated", token, user });
    })
    .catch(next);
});

router.get("/", restrictAccess, (req, res, next) => {
  getUserByEmail(req.decodedToken.email)
    .then((user) => {
      res.status(200).json({
        id: user.user_id,
        email: user.user_email,
        created_at: user.created_at,
      });
    })
    .catch(next);
});

router.get("/all", restrictAccess, (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.post("/register", validateRegister, hashPass, async (req, res, next) => {
  addUser(req.body)
    .then((user) => {
      const token = makeToken({ user_id: user.id, user_email: user.email });
      res.status(201).json({ token });
    })
    .catch(next);
});

router.use("/", (req, res, next) => {
  res.json("welcome to auth router");
});

module.exports = router;
