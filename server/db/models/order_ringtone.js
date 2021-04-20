const Sequelize = require('sequelize')
const db = require('../db')

const Order_Ringtone = db.define('order ringtone', {
    price: {
        type: Sequelize.DOUBLE,
    },
    quantity: {
        type: Sequelize.INTEGER
    }
})

module.exports = Order_Ringtone