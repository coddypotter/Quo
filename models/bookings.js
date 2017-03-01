"use strict";
var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var Booking = sequelize.define('booking', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        customer_id: {
            type: Sequelize.INTEGER,
            field: 'customer_id'
        },
        table_id: {
            type: Sequelize.INTEGER,
            field: 'table_id'
        },
        from_date: {
            type: Sequelize.DATE,
            field: 'from_date'
        },
        to_date: {
            type: Sequelize.DATE,
            field: 'to_date'
        }
    }, {
            freezeTableName: true ,timestamps: false
        });

    return Booking;
};