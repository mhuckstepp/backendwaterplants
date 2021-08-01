"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlant = exports.updatePlant = exports.getPlantsByPlant = exports.getPlantsByUser = exports.delPlant = exports.getPlants = void 0;
const db_config_1 = __importDefault(require("../data/db-config"));
const getPlants = () => {
    return db_config_1.default("plants as p").join("species as s", "p.species_id", "s.id");
};
exports.getPlants = getPlants;
const delPlant = (id) => {
    return db_config_1.default("plants as p").del().where({ id });
};
exports.delPlant = delPlant;
const getPlantsByUser = (userInfo) => {
    return db_config_1.default("plants as p")
        .join("species as s", "p.species_id", "s.id")
        .join("users as u", "p.user_id", "u.user_id")
        .select("p.*", "s.species")
        .where({ "u.user_id": userInfo.subject });
};
exports.getPlantsByUser = getPlantsByUser;
const getPlantsByPlant = (plantId) => {
    return db_config_1.default("plants as p")
        .join("species as s", "p.species_id", "s.id")
        .join("users as u", "p.user_id", "u.user_id")
        .select("p.*", "s.species")
        .where({ "p.id": plantId })
        .first();
};
exports.getPlantsByPlant = getPlantsByPlant;
const updatePlant = (plantId, plant) => __awaiter(void 0, void 0, void 0, function* () {
    let plant_id;
    yield db_config_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        const { nickname, water_freq, img, baseDate, species } = plant;
        // insert species
        let species_id;
        const [existing_species] = yield trx("species").where({ species });
        if (existing_species) {
            species_id = existing_species.id;
        }
        else {
            let [{ id }] = yield trx("species").insert({ species }, ["id"]);
            species_id = id;
        }
        let [{ id }] = yield db_config_1.default("plants as p")
            .join("species as s", "p.species_id", "s.id")
            .join("users as u", "p.user_id", "u.user_id")
            .select("p.*", "s.species")
            .where({ "p.id": plantId })
            .first()
            .update({
            nickname,
            water_freq,
            species_id,
            img,
            baseDate,
        }, ["id"]);
        plant_id = id;
    }));
    return exports.getPlantsByPlant(plant_id);
});
exports.updatePlant = updatePlant;
const addPlant = (user_id, plant) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, water_freq, species, img, baseDate } = plant;
    let plant_id;
    yield db_config_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        // insert species
        let species_id;
        const [existing_species] = yield trx("species").where({ species });
        if (existing_species) {
            species_id = existing_species.id;
        }
        else {
            let [{ id }] = yield trx("species").insert({ species }, ["id"]);
            species_id = id;
        }
        const [{ id }] = yield trx("plants").insert({ nickname, water_freq, img, baseDate, species_id, user_id }, ["id"]);
        plant_id = id;
    }));
    return exports.getPlantsByPlant(plant_id);
});
exports.addPlant = addPlant;
