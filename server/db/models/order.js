const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    paymentMethod: {
        type: Sequelize.ENUM,
        values: ['Credit Card', 'PayPal', 'Venmo']
    },
    creditCard: {
        type: Sequelize.INTEGER
    },
    zipCode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
})

Order.beforeUpdate( async order => {
    if (order.completed === true) {
        if (order.paymentMethod === 'Credit Card') {
            if (!order.creditCard) {
                throw new Error('Input Credit Card Number!')
            }
        }
        if (!order.paymentMethod) {
            throw new Error('Input a Payment Method!')
        }
    }
})

module.exports = Order