const db = require("../data/db-config");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;


const makeToken = (user) => {
    const payload = {
        subject: user.id,
        email: user.email
    }
    const options = {
        expiresIn: "600 minutes"
    }
    const token  = jwt.sign(payload, secret, options)
    return token
  };

  const getUserByEmail = async (email) => {
    let [user] = await db("users").where({ user_email: email });
    return {
      user_id: user.user_id,
      user_email: user.user_email
    };
  };

const getUserById = async (id) => {
  let [user] = await db("users").where({ user_id: id });
  console.log(user);
  return {
    user_id: user.user_id,
    user_email: user.user_email
  };
};

const addUser = async (user) => {
  console.log(user);
  let [{ user_id }] = await db("users").insert(user, ["user_id"]);
  return getUserById(user_id);
};

module.exports = {
  addUser,
  getUserByEmail,
  makeToken
};
