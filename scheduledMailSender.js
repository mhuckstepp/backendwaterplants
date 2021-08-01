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
require("dotenv").config();
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const db_config_1 = __importDefault(require("./api/data/db-config"));
const mailSender = (recip, plants) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: `${recip}`,
        from: "test@emailplants.com",
        subject: "Plants to water today!",
        text: `Please water these plants today! ${plants}. To view all your plants, please visit https://water-my-plants-mhuckstepp.vercel.app/myplants`,
        html: `<p> Please water these plants today!</p> <h3> ${plants} </h3> <br> <p> To view all your plants, please visit https://water-my-plants-mhuckstepp.vercel.app/myplants </p>`,
    };
    mail_1.default
        .send(msg)
        .then(() => {
        console.log("Email sent", msg);
    })
        .catch((error) => {
        console.error(error);
    });
});
const scheduledRun = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield db_config_1.default("users");
    users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
        let plantsToWater = "";
        let plantsByUser = yield db_config_1.default("plants").where({ user_id: user.user_id });
        plantsByUser.forEach((plant) => __awaiter(void 0, void 0, void 0, function* () {
            let dayCounter = Math.floor((Date.now() - plant.baseDate) / 86400000);
            if (dayCounter % Number(plant.water_freq) === 0) {
                if (plantsToWater.length === 0) {
                    plantsToWater = `${plant.nickname}.`;
                }
                else {
                    plantsToWater = `${plant.nickname}, ` + plantsToWater;
                }
            }
        }));
        if (plantsToWater.length > 1) {
            console.log(`sending email to ${user.user_email} about ${plantsToWater} `);
            mailSender(user.user_email, plantsToWater);
        }
        else {
            console.log("Checked for plants to be watered but didn't find any");
        }
    }));
});
scheduledRun();
