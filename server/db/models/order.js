const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    paymentMethod: {
        type: Sequelize.ENUM,
        values: ['Credit Card', 'PayPal', 'Venmo']
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
})

module.exports = Order