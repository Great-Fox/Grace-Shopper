const router = require('express').Router();
const {
  models: { User, Ringtone },
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

//POST /admin/ringtones
router.post('/ringtones', requireToken, isAdmin, async (req, res, next) => {
  try {
    let newRingtone = await Ringtone.create(req.body);
    res.json(newRingtone);
  } catch (error) {
    next(error);
  }
});

//PUT /admin/:ringtoneId
router.put('/:ringtoneId', requireToken, isAdmin, async (req, res, next) => {
  try {
    let ringtone = await Ringtone.findByPk(req.params.ringtoneId);
    let updatedRingtone = await ringtone.update(req.body);
    res.json(updatedRingtone);
  } catch (error) {
    next(error);
  }
});

//DELETE /admin/:ringtoneId

router.delete('/:ringtoneId', requireToken, isAdmin, async (req, res, next) => {
  try {
    let ringtone = await Ringtone.findByPk(req.params.ringtoneId);
    await ringtone.destroy();
    res.json(ringtone);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
