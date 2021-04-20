//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')

const Order_Ringtone = require('./models/order_ringtone')

const Ringtone = require('./models/ringtone')

const Order = require('./models/order')

//associations could go here!
User.hasMany(Order)
Order.belongsTo(User)
Ringtone.belongsToMany(Order, {through: Order_Ringtone})
Order.belongsToMany(Ringtone, {through: Order_Ringtone})

module.exports = {
  db,
  models: {
    User,
    Order_Ringtone,
    Ringtone,
    Order
  },
}
