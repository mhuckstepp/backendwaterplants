"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const router_1 = __importDefault(require("./auth/router"));
const router_2 = __importDefault(require("./plants/router"));
const server = express_1.default();
server.use(express_1.default.json());
server.use(helmet_1.default());
server.use(cors_1.default());
server.use("/api/auth", router_1.default);
server.use("/api/plants", router_2.default);
//eslint-disable-next-line
server.use((err, req, res, next) => {
    res.status(500).json({ error: err, message: err.message });
});
exports.default = server;
