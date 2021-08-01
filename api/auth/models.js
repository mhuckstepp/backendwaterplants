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
exports.editUser = exports.addUser = exports.getUserById = exports.getUserByEmail = exports.getAllUsers = void 0;
const db_config_1 = __importDefault(require("../data/db-config"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield db_config_1.default("users");
    return users;
});
exports.getAllUsers = getAllUsers;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let [user] = yield db_config_1.default("users").where({ user_email: email });
    return user;
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let [user] = yield db_config_1.default("users").where({ user_id: id });
    console.log(user);
    return user;
});
exports.getUserById = getUserById;
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let [{ user_id }] = yield db_config_1.default("users").insert({
        user_email: user.email,
        user_password: user.password,
        location: user.city,
    }, ["user_id"]);
    return exports.getUserById(user_id);
});
exports.addUser = addUser;
// .update({ user_email: newUser.email, user_password: newUser.password });
const editUser = (user_id, newUser) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default("users")
        .where({ user_id })
        .first()
        .update({ user_email: newUser.email, user_password: newUser.password });
    return exports.getUserById(user_id);
});
exports.editUser = editUser;
