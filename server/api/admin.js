const router = require('express').Router();
const {
  models: { User, Order, Order_Ringtone, Ringtone },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

//GET /admin/users
router.get('/users', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
