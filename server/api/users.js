const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;
const { verifyUser } = require('./gatekeepingMiddleware');

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email'],
//     });
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// });

router.put('/:userId', verifyUser, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    let updatedUser = await user.update(req.body);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', verifyUser, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
