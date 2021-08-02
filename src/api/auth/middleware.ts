import { getUserByEmail } from "./models"
import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "./user.interface";
import { ReqWithUser } from "../definitions";
import { mailSender } from "../../scheduledMailSender"
const secret: any = process.env.JWT_SECRET;
const hashes = process.env.HASH_NUM;

export const hashPass = (req: Request, res: Response, next: NextFunction) => {
  const hash = bcrypt.hashSync(req.body.password, 6);
  req.body.password = hash;
  next();
};

export const makeToken = (user: User) => {
  const payload = {
    subject: user.user_id,
    email: user.user_email,
  };
  const options = {
    expiresIn: "600 minutes",
  };
  const token = jwt.sign(payload, secret, options);

  return token;
};

export const validateLogin = async (req: ReqWithUser, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user: User | undefined = await getUserByEmail(email);
  if (!user) {
    res
      .status(400)
      .json(
        "make sure your email is spelled correctly and has been registered!"
      );
    return 
  } else {
    req.user = user;
    if (bcrypt.compareSync(password, user.user_password)) {
      req.user = user;
      next();
    } else {
      res.status(400).json("invalid credentials");
    }
  }
};

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user: User | undefined = await getUserByEmail(email);
  if (!email || !email.trim() || !password || !password.trim()) {
    res.status(400).json("Please provide a valid email and password");
  } else if (user) {
    res.status(400).json("You are already registered, please go to login");
  } else {
    mailSender('mhuckstepp@gmail.com', `NEW SIGNUP FOR ${email} on waterplants`)
    next();
  }
};

