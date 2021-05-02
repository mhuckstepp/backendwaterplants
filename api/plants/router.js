const router = require("express").Router();
const { getPlantsByUser } = require("./models");
const restrictAccess = require('../auth/restrictAccess')

router.post("/", (req, res, next) => {
  res.status(200).json({message: `welcome back ${req.body.email}`, token})
});

router.get("/", restrictAccess, (req, res, next) => {
      res.status(201).json('plants');
});

router.use("/", (req, res, next) => {
  res.json("welcome to plants router");
});

module.exports = router;
