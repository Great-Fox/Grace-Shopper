const Sequelize = require('sequelize')
const db = require('../db')

const Ringtone = db.define('ringtone', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    artist: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    price : {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        defaultValue: 1.99
    },
    songUrl: {
        type: Sequelize.TEXT
    }
})

module.exports = Ringtone