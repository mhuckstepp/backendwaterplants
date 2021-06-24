const db = require("../data/db-config");

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
    },
    ["user_id"]
  );
  return getUserById(user_id);
};

const editUser = async (user_id, newUser) => {
  console.log("edit user", user_id, newUser);
  let user = await db("users")
    .where({ user_id })
    .first()
    .update({ user_email: newUser.email, user_password: newUser.password });
  console.log("get", user);
  return getUserById(user_id);
};

// .update({ user_email: newUser.email, user_password: newUser.password });
module.exports = {
  addUser,
  getUserByEmail,
  editUser,
};
