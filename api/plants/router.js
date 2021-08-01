"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const models_1 = require("./models");
const restrictAccess_1 = __importDefault(require("../auth/restrictAccess"));
const middleware_1 = require("./middleware");
router.post("/", restrictAccess_1.default, (req, res, next) => {
    models_1.addPlant(req.decodedToken.subject, req.body)
        .then((plant) => {
        res.status(201).json(plant);
    })
        .catch(next);
});
router.delete("/:id", restrictAccess_1.default, middleware_1.checkPlantExists, (req, res, next) => {
    models_1.delPlant(req.params.id)
        //eslint-disable-next-line
        .then((_) => {
        res
            .status(204)
            .json({ message: `plant with id:${req.params.id} was deleted` });
    })
        .catch(next);
});
router.put("/:id", restrictAccess_1.default, middleware_1.checkPlantExists, (req, res, next) => {
    models_1.updatePlant(req.params.id, req.body)
        .then((plant) => {
        res.status(200).json(plant);
    })
        .catch(next);
});
router.get("/", restrictAccess_1.default, (req, res, next) => {
    models_1.getPlantsByUser(req.decodedToken)
        .then((plants) => {
        res.status(200).json(plants);
    })
        .catch(next);
});
router.get("/all", restrictAccess_1.default, (req, res, next) => {
    models_1.getPlants()
        .then((plants) => {
        res.status(200).json(plants);
    })
        .catch(next);
});
router.use("/", (req, res, next) => {
    //eslint-disable-line
    res.json("welcome to plants router");
});
exports.default = router;
