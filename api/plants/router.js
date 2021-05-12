const router = require("express").Router();
const { getPlantsByUser, getPlants, addPlant, delPlant, updatePlant } = require("./models");
const restrictAccess = require("../auth/restrictAccess");
const { checkPlantExists } = require('./middleware')

router.post("/", restrictAccess, (req, res, next) => {
  console.log(req.decodedToken);
  addPlant(req.decodedToken.subject, req.body).then(plant => {
    res.status(201).json(plant)
  }).catch(next)
});

router.delete("/:id", restrictAccess, checkPlantExists, (req, res, next) => {
  delPlant(req.params.id).then(plant => { //eslint-disable-line
    res.status(201).json(`plant with id:${req.params.id} was deleted`)
  }).catch(next)
});

router.put("/:id", restrictAccess, checkPlantExists, (req, res, next) => {
  updatePlant(req.params.id, req.body).then(plant => {
    res.status(201).json(plant)
  }).catch(next)
});

router.get("/", restrictAccess, (req, res, next) => {
  getPlantsByUser(req.decodedToken)
    .then((plants) => {
      res.status(201).json(plants);
    })
    .catch(next);
});

router.get("/all", restrictAccess, (req, res, next) => {
  getPlants()
    .then((plants) => {
      res.status(201).json(plants);
    })
    .catch(next);
});

router.use("/", (req, res, next) => {
  res.json("welcome to plants router");
});

module.exports = router;
