const router = require('express').Router();
const {
  models: { Order, Order_Ringtone },
} = require('../db/index');

// //GET api/order
router.get('/:userId', async (req, res, next) => {
  try {
    let order = await Order.findOne({where: {userId: userId, completed: false}});
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId', async (req, res, next) => {
    try{
        let order = await Order.create(req.body)
        res.status(201).send(order)
    } catch(error) {
        next(error)
    }
})

module.exports = router;