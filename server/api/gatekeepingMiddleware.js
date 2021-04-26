const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.id !== Number(req.params.userId)) {
      return res.status(403).send('This is not your cart!');
    } else {
      req.user = user;
      next();
    }
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
  verifyUser,
  requireToken,
  isAdmin,
};
