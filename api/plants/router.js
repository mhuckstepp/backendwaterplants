const router = require("express").Router();
const { getPlantsByUser, getPlants, addPlant, delPlant } = require("./models");
const restrictAccess = require("../auth/restrictAccess");
const { checkPlantExists } = require('./middleware')

router.post("/", restrictAccess, (req, res, next) => {
  addPlant(req.decodedToken.subject, req.body).then(plant => {
    res.status(201).json(plant)
  }).catch(next)
});

router.delete("/:id", restrictAccess, checkPlantExists, (req, res, next) => {
  delPlant(req.params.id).then(plant => {
    res.status(201).json(`plant with id:${req.params.id} was deleted`)
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
