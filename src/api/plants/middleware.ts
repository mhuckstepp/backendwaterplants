import { getPlantsByPlant } from "./models";
import { Plant } from "./plant.interface";

export const checkPlantExists = (req: any, res: any, next: any) => {
  getPlantsByPlant(req.params.id)
    .then((plant: Plant) => {
      if (plant) {
        next();
      } else {
        res
          .status(404)
          .json({
            message: "We couldn't find that plant, check the id and try again",
          });
      }
    })
    .catch(next);
};
