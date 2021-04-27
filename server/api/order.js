const router = require('express').Router();
const {
  models: { Order, Order_Ringtone, Ringtone },
} = require('../db/index');
const User = require('../db/models/User');
const { verifyUser } = require('./gatekeepingMiddleware');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// //GET api/order
//get cart
router.get('/:userId', verifyUser, async (req, res, next) => {
  try {
    let products = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false,
      },
      include: [
        {
          model: Ringtone,
        },
      ],
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

//add a ringtone to cart
router.post('/:userId', verifyUser, async (req, res, next) => {
  try {
    let currentOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false,
      },
    });
    let ringtones = await Ringtone.findAll({
      where: {
        id: {
          [Op.in]: req.body.id,
        },
      },
    });
    console.log(ringtones, 'RINGTONES IN POST ROUTE');
    if (!currentOrder) {
      currentOrder = await Order.create();
      let user = await User.findByPk(req.params.userId);
      user.addOrders(currentOrder);
    }
    await currentOrder.addRingtones(ringtones);
    res.status(201).send(ringtones);
  } catch (error) {
    next(error);
  }
});
//remove a ringtone from cart
router.delete('/:userId/:ringtoneId', verifyUser, async (req, res, next) => {
  try {
    let currentOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false,
      },
    });
    console.log(currentOrder, 'current order');
    let ringtone = await Ringtone.findByPk(req.params.ringtoneId);
    console.log(ringtone, 'ringtone');
    await currentOrder.removeRingtone(ringtone);
    res.send(ringtone);
  } catch (error) {
    next(error);
  }
});

//place an order
router.put('/:userId', async (req, res, next) => {
  try {
    let currentOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false,
      },
      include: {
        model: Ringtone,
      },
    });
    if (!currentOrder.ringtones) {
      throw new Error('your cart is empty!');
    } else {
      res.send(await currentOrder.update(req.body));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
