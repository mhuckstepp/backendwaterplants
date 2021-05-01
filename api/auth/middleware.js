const db = require("../data/db-config");
const {getUserByEmail} = require('./models')

const checkUserExists = (req, res, next) => {
  getUserByEmail(req.body.user_email).then(user => {
    if(!user){
      res.status(400).json('invalid credentials')
    } else{
      next();
    }
  })
};

const validateUser = (req, res, next) => {
  const { user_email, user_password} = req.body
  if(!user_email || !user_password){
    res.status(400).json('provide a valid email and password')
  } else {
    next();
  }
};

module.exports = {
  checkUserExists,
  validateUser,
};
