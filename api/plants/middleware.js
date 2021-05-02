const hashPass = (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 6)
  req.body.password = hash
  next()
}

const makeToken = (user) => {
  const payload = {
      subject: user.id,
      email: user.email
  }
  const options = {
      expiresIn: "60 minutes"
  }
  const token  = jwt.sign(payload, secret, options)
  return token
};

const validateLogin = async (req, res, next) => {
  const user = await getUserByEmail(req.body.email)
  if (!user){
    res.status(400).json('make sure your email is spelled correctly and has been registered!')
  } else {
    req.foundUser = user
  }
  if (bcrypt.compareSync(req.body.password, user.user_password)){
    req.user = user
    next()
  } else {
    res.status(400).json('invalid credentials')
  }
};

const validateRegister = async (req, res, next) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)
  if(!email || !email.trim() || !password || !password.trim()){
    res.status(400).json('provide a valid email and password')
  } else if (user){
    res.status(400).json('You are already registered, please go to login')
  } else {
    next()
  }
};

module.exports = {
  validateLogin,
  validateRegister,
  makeToken,
  hashPass
};
