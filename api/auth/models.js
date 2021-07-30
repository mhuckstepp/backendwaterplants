const db = require("../data/db-config");

const getAllUsers = async () => {
  let users = await db("users");
  return users;
};

const getUserByEmail = async (email) => {
  let [user] = await db("users").where({ user_email: email });
  return user;
};

const getUserById = async (id) => {
  let [user] = await db("users").where({ user_id: id });
  return {
    id: user.user_id,
    email: user.user_email,
  };
};

const addUser = async (user) => {
  let [{ user_id }] = await db("users").insert(
    {
      user_email: user.email,
      user_password: user.password,
      location: user.city
    },
    ["user_id"]
  );
  return getUserById(user_id);
};

const editUser = async (user_id, newUser) => {
  await db("users")
    .where({ user_id })
    .first()
    .update({ user_email: newUser.email, user_password: newUser.password });
  return getUserById(user_id);
};

// .update({ user_email: newUser.email, user_password: newUser.password });
module.exports = {
  addUser,
  getUserByEmail,
  editUser,
  getAllUsers
};
