const router = require('express').Router();
const {
  models: { Order, Order_Ringtone, Ringtone },
} = require('../db/index');

// //GET api/order
router.get('/:userId', async (req, res, next) => {
  try {
    let products = await Order.findOne({
      where: {
      userId: req.params.userId, completed: false
    }, 
  include: [{
    model: Ringtone
  }]})
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId', async (req, res, next) => {
    try{
        let order = await Order.create(req.body)
        const ringtones = req.body.ringtones.map(ringtone => ringtone.id);
        const filteredRingtones = await Ringtone.findAll({
          where: {
            id: ringtones
          }, 
          include: {
            model: 'ringtones'
          }
        });
        await order.setRingtones(filteredRingtones);
        res.status(201).send(order)
    } catch(error) {
        next(error)
    }
})

module.exports = router;