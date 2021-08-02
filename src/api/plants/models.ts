import { Knex } from "knex";
import { TokenUser } from "../auth/user.interface";
import db from "../data/db-config"
import { BasePlant, Plant } from "./plant.interface";

export const getPlants = () => {
  return db("plants as p").join("species as s", "p.species_id", "s.id");
};

export const delPlant = (id: number) => {
  return db("plants as p").del().where({ id });
};

export const getPlantsByUser = (userInfo: TokenUser) => {
  return db("plants as p")
    .join("species as s", "p.species_id", "s.id")
    .join("users as u", "p.user_id", "u.user_id")
    .select("p.*", "s.species")
    .where({ "u.user_id": userInfo.subject });
};

export const getPlantsByPlant = (plantId: number) => {
  return db("plants as p")
    .join("species as s", "p.species_id", "s.id")
    .join("users as u", "p.user_id", "u.user_id")
    .select("p.*", "s.species")
    .where({ "p.id": plantId })
    .first();
};

export const updatePlant = async (plantId: number, plant: Plant) => {
  let plant_id;

  await db.transaction(async (trx: Knex.Transaction) => {
    const { nickname, water_freq, img, baseDate, species } = plant;
    // insert species
    let species_id;
    const [existing_species] = await trx("species").where({ species });

    if (existing_species) {
      species_id = existing_species.id;
    } else {
      let [{ id }] = await trx("species").insert({ species }, ["id"]);
      species_id = id;
    }

    let [{ id }] = await db("plants as p")
      .join("species as s", "p.species_id", "s.id")
      .join("users as u", "p.user_id", "u.user_id")
      .select("p.*", "s.species")
      .where({ "p.id": plantId })
      .first()
      .update(
        {
          nickname,
          water_freq,
          species_id,
          img,
          baseDate,
        },
        ["id"]
      );
    plant_id = id;
  });
  return getPlantsByPlant(plant_id);
};

export const addPlant = async (user_id: number, plant: BasePlant) => {
  const { nickname, water_freq, species, img, baseDate } = plant;
  let plant_id;
  await db.transaction(async (trx: Knex.Transaction) => {
    // insert species
    let species_id;
    const [existing_species] = await trx("species").where({ species });

    if (existing_species) {
      species_id = existing_species.id;
    } else {
      let [{ id }] = await trx("species").insert({ species }, ["id"]);
      species_id = id;
    }

    const [{ id }] = await trx("plants").insert(
      { nickname, water_freq, img, baseDate, species_id, user_id },
      ["id"]
    );

    plant_id = id;
  });
  return getPlantsByPlant(plant_id);
};
