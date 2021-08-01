"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPlantExists = void 0;
const models_1 = require("./models");
const checkPlantExists = (req, res, next) => {
    models_1.getPlantsByPlant(req.params.id)
        .then((plant) => {
        if (plant) {
            next();
        }
        else {
            res
                .status(404)
                .json({
                message: "We couldn't find that plant, check the id and try again",
            });
        }
    })
        .catch(next);
};
exports.checkPlantExists = checkPlantExists;
