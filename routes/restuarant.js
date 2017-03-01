var express = require('express');
var pg = require('pg');

var router = express.Router();
var models = require("../models/index")
router.post('/create', function (req, res) {
    models.restuarant.create({
        "name": req.body.name,
        "address": req.body.address,
        "city": req.body.city,
        "cuisines": req.body.cuisines
    }).then(function (insertedVal) {
        res.json({ "status": 200, "message": "Restuarant Created Successfully", "restuarant": insertedVal.dataValues });
    }).catch(function (error) {
        res.json({ "status": 500, "message": error });
    });
});
//delete method to remove a patient
router.delete('/:id', function (req, res) {
    models.restuarant.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (patient) {
        res.json({ "status": 200, "messge": "Restuarant Deleted" });
    }).catch(function (err) {
        res.json({ "status": 500, "messge": err });
    });
});
router.put('/:id', function (req, res) {

    models.restuarant.find({
        where: {
            id: req.params.id
        }
    }).then(function (updatedRecords) {
        updatedRecords.updateAttributes(req.body).then(function (updatedRecord) {
            res.json({ "status": 200, "message": "Restuarant Details Updated", "restuarant": updatedRecord });
        });
    }).catch(function (error) {
        res.json({ "status": 404, "message": "No restuarant found" });
    });
});
router.get('/', function (req, res) {
    models.restuarant.findAll({limit: 100}).then(function (restuarant) {
        // console.log(members)
        res.json({ "status": 200, "restuarant": restuarant });
    }).catch(function (error) {
        res.json({ "status": 500, "message": error });
    });
});
router.get('/:id', function (req, res) {
    models.restuarant.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (restuarant) {
        if (restuarant == null) {
            res.status(404).json({ "status": 404, "restuarant": "No restuarant found" });
        } else {
            res.status(200).json({ "status": 200, "restuarant": restuarant });
        }

    }).catch(function (err) {
        res.status(404).json({ "status": 404, "messge": "Nothing Found" });
    });
});

module.exports = router;