const router = require('express').Router();
const {
  models: { Order, Order_Ringtone, Ringtone },
} = require('../db/index');
const User = require('../db/models/User');

// //GET api/order
//get cart
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

//add a ringtone to cart
router.post('/:userId', async (req, res, next) => {
    try{
        let currentOrder = await Order.findOne({
          where: {
            userId: req.params.userId, completed: false
          }
        });
        let ringtone = await Ringtone.findByPk(req.body.ringtoneId);
        if (!currentOrder) {
          currentOrder = await Order.create();
          let user = await User.findByPk(req.params.userId);
          user.addOrders(currentOrder);
        }
        await currentOrder.addRingtones(ringtone);
        res.status(201).send(currentOrder);
    } catch(error) {
        next(error)
    }
})
//remove a ringtone from cart
router.delete('/:userId', async (req, res, next) => {
  try{
      let currentOrder = await Order.findOne({
        where: {
          userId: req.params.userId, completed: false
        }
      });
      let ringtone = await Ringtone.findByPk(req.body.ringtoneId);
      await currentOrder.removeRingtones(ringtone);
      res.send(currentOrder);
  } catch(error) {
      next(error)
  }
})

//place an order
router.put('/:userId', async (req, res, next) => {
  try{
      let currentOrder = await Order.findOne({
        where: {
          userId: req.params.userId, completed: false
        }, include: {
          model: Ringtone
        }
      });
      if (!currentOrder.ringtones) {
        throw new Error('your cart is empty!');
      } else {
        res.send(await currentOrder.update(req.body))
      }
  } catch(error) {
      next(error)
  }
})

module.exports = router;