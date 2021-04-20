const Sequelize = require('sequelize')
const db = require('../db')

const Order_Ringtone = db.define('order ringtone', {
    price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    }
})

module.exports = Order_Ringtone