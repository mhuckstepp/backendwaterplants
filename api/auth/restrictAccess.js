"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { verify } = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
function restrictAccess(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Token is bad: " + err.message });
            }
            else {
                req.decodedToken = decoded;
                next();
            }
        });
    }
    else {
        res.status(401).json({ message: "Please Sign In to access this page" });
    }
}
exports.default = restrictAccess;
