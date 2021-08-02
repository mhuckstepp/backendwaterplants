const { verify } = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
import { Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ReqWithToken } from "../definitions";
import { TokenUser } from "./user.interface";

function restrictAccess(req: ReqWithToken, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (token) {
    verify(token, secret, (err: JsonWebTokenError, decoded: TokenUser) => {
      if (err) {
        res.status(401).json({ message: "Token is bad: " + err.message });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please Sign In to access this page" });
  }
}

export default restrictAccess;
