import { Request } from "express";
import { User } from "./auth/user.interface";

interface DecodedToken {
  subject: number;
  email: string;
  iat: number;
  exp: number;
}

export interface ReqWithToken extends Request {
  decodedToken?: DecodedToken;
}

export interface ReqWithUser extends Request {
    user?: User;
  }
