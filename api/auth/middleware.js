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
exports.validateRegister = exports.validateLogin = exports.makeToken = exports.hashPass = void 0;
const models_1 = require("./models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const hashes = process.env.HASH_NUM;
const hashPass = (req, res, next) => {
    const hash = bcrypt_1.default.hashSync(req.body.password, 6);
    req.body.password = hash;
    next();
};
exports.hashPass = hashPass;
const makeToken = (user) => {
    const payload = {
        subject: user.user_id,
        email: user.user_email,
    };
    const options = {
        expiresIn: "600 minutes",
    };
    const token = jsonwebtoken_1.default.sign(payload, secret, options);
    return token;
};
exports.makeToken = makeToken;
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield models_1.getUserByEmail(email);
    if (!user) {
        res
            .status(400)
            .json("make sure your email is spelled correctly and has been registered!");
        return;
    }
    else {
        req.user = user;
        if (bcrypt_1.default.compareSync(password, user.user_password)) {
            req.user = user;
            next();
        }
        else {
            res.status(400).json("invalid credentials");
        }
    }
});
exports.validateLogin = validateLogin;
const validateRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield models_1.getUserByEmail(email);
    if (!email || !email.trim() || !password || !password.trim()) {
        res.status(400).json("Please provide a valid email and password");
    }
    else if (user) {
        res.status(400).json("You are already registered, please go to login");
    }
    else {
        next();
    }
});
exports.validateRegister = validateRegister;
