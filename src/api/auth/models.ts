import db from "../data/db-config";
import { BaseUser, FrontEndUser } from "./user.interface";

export const getAllUsers = async () => {
  let users = await db("users");
  return users;
};

export const getUserByEmail = async (email: string) => {
  let [user] = await db("users").where({ user_email: email });
  return user;
};

export const getUserById = async (id: number) => {
  let [user] = await db("users").where({ user_id: id });
  console.log(user);
  return user;
};

export const addUser = async (user: FrontEndUser) => {
  let location = user.city.toLowerCase().split(" ").join("+");
  let [{ user_id }] = await db("users").insert(
    {
      user_email: user.email,
      user_password: user.password,
      location: location,
    },
    ["user_id"]
  );
  return getUserById(user_id);
};

// .update({ user_email: newUser.email, user_password: newUser.password });
export const editUser = async (user_id: number, newUser: FrontEndUser) => {
  await db("users")
    .where({ user_id })
    .first()
    .update({ user_email: newUser.email, user_password: newUser.password });
  return getUserById(user_id);
};
