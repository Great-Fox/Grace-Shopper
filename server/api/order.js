const router = require('express').Router();
const {
  models: { Order, Order_Ringtone, Ringtone },
} = require('../db/index');
const User = require('../db/models/User');
const { verifyUser } = require('./gatekeepingMiddleware');
const { Op } = require('sequelize');

//guest checkout
router.post('/guest', async (req, res, next) => {
  try {
    let ringtoneIds = req.body.ringtones.map((ringtone) => ringtone.id);
    let ringtone = await Ringtone.findAll({
      where: {
        id: {
          [Op.in]: ringtoneIds,
        },
      },
    });
    currentOrder = await Order.create(req.body.updates);
    await currentOrder.addRingtones(ringtone);
    res.status(201).send(currentOrder);
  } catch (error) {
    next(error);
  }
});

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
    console.log(products.ringtones[0]['order ringtone'].dataValues.quantity);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

//add a ringtone to cart

//!!!LOOK HERE FOR QUANTITY INFO

//here, i am trying to update the quantity of the ringtone whose id we received. 
//i can get it to update in final ringtones, but for some reason this is not adding to the db
  
router.post('/:userId', verifyUser, async (req, res, next) => {
  try {
    let currentOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false,
      },
      include: {
        model: Ringtone
      }
    });
    //console.log('order ringtones', currentOrder.ringtones);
    let ringtones = await Ringtone.findAll({
      where: {
        id: {
          [Op.in]: req.body,
        },
      }
    });
    let ringtoneIds = ringtones.map(ringtone => ringtone.dataValues.id);
    let finalRingtones = currentOrder.ringtones.map((ringtone) => {
      if (ringtoneIds.includes(ringtone.id)){
        ringtone['order ringtone'].dataValues.quantity = Number(ringtone['order ringtone'].dataValues.quantity)+1;
        return ringtone
      } else {
        return ringtone
      }
      })
      console.log('my ringtones', finalRingtones);
      console.log('og ringtones', currentOrder.ringtones);

    if (!currentOrder) {
      currentOrder = await Order.create();
      let user = await User.findByPk(req.params.userId);
      user.addOrders(currentOrder);
    }
    await currentOrder.setRingtones(finalRingtones);
    res.status(201).send(finalRingtones);
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
    let ringtone = await Ringtone.findByPk(req.params.ringtoneId);
    await currentOrder.removeRingtone(ringtone);
    res.send(ringtone);
  } catch (error) {
    next(error);
  }
});

//place an order for logged in users
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
