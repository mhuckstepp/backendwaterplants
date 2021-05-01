const db = require("../data/db-config");

  const getUserByEmail = async (email) => {
    console.log(email);
    let [user] = await db("users").where({ 'users.user_email': email });
    return user
  };

const getUserById = async (id) => {
  let [user] = await db("users").where({ user_id: id });
  return {
    id: user.user_id,
    email: user.user_email
  };
};

const addUser = async (user) => {
  console.log(user);
  let [{ user_id }] = await db("users").insert({
    user_email: user.email,
    user_password: user.password
  }, ["user_id"]);
  return getUserById(user_id);
};

module.exports = {
  addUser,
  getUserByEmail
};
