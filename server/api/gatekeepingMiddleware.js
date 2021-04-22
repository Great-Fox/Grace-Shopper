const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    //THIS IS THE PROBLEM TOKEN = UNDEFINED

    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('You are not an admin!');
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
