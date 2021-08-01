import express from "express";
const router = express.Router();
import {
  getPlantsByUser,
  getPlants,
  addPlant,
  delPlant,
  updatePlant,
} from "./models"
import restrictAccess from "../auth/restrictAccess"
import { checkPlantExists } from "./middleware"
import { Plant, BasePlant } from './plant.interface'

router.post("/", restrictAccess, (req: any, res: any, next: any) => {
  addPlant(req.decodedToken.subject, req.body)
    .then((plant: Plant) => {
      res.status(201).json(plant);
    })
    .catch(next);
});

router.delete(
  "/:id",
  restrictAccess,
  checkPlantExists,
  (req: any, res: any, next: any) => {
    delPlant(req.params.id)
      //eslint-disable-next-line
      .then((_) => {
        res
          .status(204)
          .json({ message: `plant with id:${req.params.id} was deleted` });
      })
      .catch(next);
  }
);

router.put(
  "/:id",
  restrictAccess,
  checkPlantExists,
  (req: any, res: any, next: any) => {
    updatePlant(req.params.id, req.body)
      .then((plant: Plant) => {
        res.status(200).json(plant);
      })
      .catch(next);
  }
);

router.get("/", restrictAccess, (req: any, res: any, next: any) => {
  getPlantsByUser(req.decodedToken)
    .then((plants: Plant[]) => {
      res.status(200).json(plants);
    })
    .catch(next);
});

router.get("/all", restrictAccess, (req: any, res: any, next: any) => {
  getPlants()
    .then((plants: Plant[]) => {
      res.status(200).json(plants);
    })
    .catch(next);
});

router.use("/", (req: any, res: any, next: any) => {
  //eslint-disable-line
  res.json("welcome to plants router");
});

export default router;
