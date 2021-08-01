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
const axios_1 = __importDefault(require("axios"));
const db_config_1 = __importDefault(require("./api/data/db-config"));
let apiKey = process.env.WEATHER_API_KEY;
const rainCheckerFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    const rainCheckMemo = {};
    let users = yield db_config_1.default("users");
    for (const user of users) {
        let place = user.location;
        let user_id = user.user_id;
        // if we haven't checked the weather for that specific place go and get check it
        if (!rainCheckMemo[place]) {
            yield axios_1.default
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`)
                .then((response) => {
                let weather = response.data.weather[0].main;
                console.log("rainchecker run", weather);
                if (/rain/i.test(weather) || /showers/i.test(weather)) {
                    rainCheckMemo[place] = "rain";
                }
                else {
                    rainCheckMemo[place] = "No rain";
                }
            })
                .catch((err) => console.log(err));
        }
        // if it rained there reset the plants watering date
        if (rainCheckMemo[place] && rainCheckMemo[place] === "rain") {
            yield db_config_1.default("plants").update({ baseDate: Date.now() }).where({ user_id });
        }
    }
});
rainCheckerFunc();
