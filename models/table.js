"use strict";
var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var Table = sequelize.define('table', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        restuarant_id: {
            type: Sequelize.INTEGER,
            field: 'restuarant_id'
        },
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        capacity: {
            type: Sequelize.INTEGER,
            field: 'capacity'
        }
    }, {
            freezeTableName: true, // Model tableName will be the same as the model name
        });

    return Table;
};