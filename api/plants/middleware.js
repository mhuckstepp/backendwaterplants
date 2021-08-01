const { getPlantsByPlant } = require("./models");

const checkPlantExists = (req, res, next) => {
  getPlantsByPlant(req.params.id)
    .then((plant) => {
      if (plant) {
        next();
      } else {
        res
          .status(404)
          .json({ message: "We couldn't find that plant, check the id and try again"});
      }
    })
    .catch(next);
};

module.exports = {
  checkPlantExists,
};
