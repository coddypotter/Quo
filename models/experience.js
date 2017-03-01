"use strict";
var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var Experience = sequelize.define('experience', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        booking_id: {
            type: Sequelize.INTEGER,
            field: 'booking_id'
        },
        comment: {
            type: Sequelize.STRING,
            field: 'comment'
        }
    }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });

    return Experience;
};