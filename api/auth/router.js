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
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const models_1 = require("./models");
const restrictAccess_1 = __importDefault(require("./restrictAccess"));
const router = express_1.default.Router();
router.post("/login", middleware_1.validateLogin, (req, res, next) => {
    const token = middleware_1.makeToken(req.user);
    res.status(200).json({ message: `welcome back ${req.body.email}`, token });
});
router.put("/", restrictAccess_1.default, middleware_1.hashPass, (req, res, next) => {
    models_1.editUser(req.decodedToken.subject, req.body)
        .then((user) => {
        const token = middleware_1.makeToken(user);
        res.status(200).json({ message: "user info updated", token, user });
    })
        .catch(next);
});
router.get("/", restrictAccess_1.default, (req, res, next) => {
    models_1.getUserByEmail(req.decodedToken.email)
        .then((user) => {
        res.status(200).json({
            id: user.user_id,
            email: user.user_email,
            created_at: user.created_at,
        });
    })
        .catch(next);
});
router.get("/all", restrictAccess_1.default, (req, res, next) => {
    models_1.getAllUsers()
        .then((users) => {
        res.status(200).json(users);
    })
        .catch(next);
});
router.post("/register", middleware_1.validateRegister, middleware_1.hashPass, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    models_1.addUser(req.body)
        .then((user) => {
        const token = middleware_1.makeToken(user);
        res.status(201).json({ token });
    })
        .catch(next);
}));
router.use("/", (req, res, next) => {
    res.json("welcome to auth router");
});
exports.default = router;
