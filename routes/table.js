var express = require('express');
var pg = require('pg');

var router = express.Router();
var models = require("../models/index")
router.post('/create', function (req, res) {
    models.table.create({
        "restuarant_id": req.body.restuarant_id,
        "name": req.body.name,
        "capacity": req.body.capacity
    }).then(function (insertedVal) {
        res.json({ "status": 200, "message": "Table Created Successfully", "table": insertedVal.dataValues });
    }).catch(function (error) {
        res.json({ "status": 500, "message": error });
    });
});
//delete method to remove a patient
router.delete('/:id', function (req, res) {
    models.table.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (patient) {
        res.json({ "status": 200, "messge": "Table Deleted" });
    }).catch(function (err) {
        res.json({ "status": 500, "messge": err });
    });
});
router.put('/:id', function (req, res) {

    models.table.find({
        where: {
            id: req.params.id
        }
    }).then(function (updatedRecords) {
        updatedRecords.updateAttributes(req.body).then(function (updatedRecord) {
            res.json({ "status": 200, "message": "Table Details Updated", "table": updatedRecord });
        });
    }).catch(function (error) {
        res.json({ "status": 404, "message": "No records found" });
    });
});
router.get('/', function (req, res) {
    models.table.findAll({limit: 100}).then(function (table) {
        res.json({ "status": 200, "table": table });
    }).catch(function (error) {
        res.json({ "status": 500, "message": error });
    });
});
router.get('/:id', function (req, res) {
    models.table.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (table) {
        if (table == null) {
            res.status(404).json({ "status": 404, "table": "No table found" });
        } else {
            res.status(200).json({ "status": 200, "table": table });
        }

    }).catch(function (err) {
        res.status(404).json({ "status": 404, "messge": "Nothing Found" });
    });
});

module.exports = router;