const router = require('express').Router();
const {
  models: { Ringtone },
} = require('../db/index');

//GET api/ringtone
router.get('/', async (req, res, next) => {
  try {
    let ringtones = await Ringtone.findAll();
    res.json(ringtones);
  } catch (error) {
    next(error);
  }
});

//GET api/ringtone/:ringtoneId
router.get('/:ringtoneId', async (req, res, next) => {
  try {
    let ringtone = await Ringtone.findOne({
      where: {
        id: req.params.ringtoneId,
      },
    });
    req.json(ringtone);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
