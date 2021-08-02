import express, { NextFunction, Response } from "express"
import { ReqWithToken, ReqWithUser } from "../definitions"
import {
  validateLogin,
  validateRegister,
  hashPass,
  makeToken,
} from "./middleware"
import { addUser, getUserByEmail, getAllUsers, editUser } from "./models"
import restrictAccess from "./restrictAccess"

const router = express.Router()

router.post("/login", validateLogin, (req: ReqWithUser, res: Response, next: NextFunction) => {
  const token = makeToken(req.user);
  res.status(200).json({ message: `welcome back ${req.body.email}`, token });
});

router.put("/", restrictAccess, hashPass, (req: ReqWithToken, res: Response, next: NextFunction) => {
  editUser(req.decodedToken.subject, req.body)
    .then((user) => {
      const token = makeToken(user);
      res.status(200).json({ message: "user info updated", token, user });
    })
    .catch(next);
});

router.get("/", restrictAccess, (req: ReqWithToken, res: Response, next: NextFunction) => {
  getUserByEmail(req.decodedToken.email)
    .then((user) => {
      res.status(200).json({
        id: user.user_id,
        email: user.user_email,
        created_at: user.created_at,
      });
    })
    .catch(next);
});

router.get("/all", restrictAccess, (req: ReqWithToken, res: Response, next: NextFunction) => {
  getAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.post("/register", validateRegister, hashPass, async (req, res, next) => {
  addUser(req.body)
    .then((user) => {
      const token = makeToken(user);
      res.status(201).json({ token });
    })
    .catch(next);
});

router.use("/", (req, res, next) => {
  res.json("welcome to auth router");
});

export default router
