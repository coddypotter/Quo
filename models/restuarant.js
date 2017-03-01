"use strict";
var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var Restuarant = sequelize.define('restuarant', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        address: {
            type: Sequelize.STRING,
            field: 'address'
        },
        city: {
            type: Sequelize.STRING,
            field: 'city'
        },
        cuisines: {
            type: Sequelize.STRING,
            field: 'cuisines'
        }
    }, {
            freezeTableName: true 
        });

    return Restuarant;
};