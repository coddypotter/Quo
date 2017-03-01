var express = require('express');
var pg = require('pg');

var router = express.Router();
var models = require("../models/index")
router.post('/booktable', function (req, res) {
    models.booking.create(req.body).then(function (insertedVal) {
        res.json({ "status": 200, "message": "Table Booked", "booking": insertedVal.dataValues });
    }).catch(function (error) {
        res.json({ "status": 500, "message": error });
    });
});
router.post('/experience', function (req, res) {
    models.booking.create(req.body).then(function (insertedVal) {
        res.json({ "status": 200, "message": "Thank you for your feedback" });
    }).catch(function (error) {
        res.json({ "status": 500, "message": error });
    });
});
router.get('/booktable', function (req, res) {
    models.booking.findAll({ limit: 100 }).then(function (table) {
        res.json({ "status": 200, "table": table });
    }).catch(function (error) {
        res.json({ "status": 500, "message": error });
    });
});
router.delete('/cancelbooking/:id', function (req, res) {
    models.booking.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (patient) {
        res.json({ "status": 200, "messge": "Booking Cancelled" });
    }).catch(function (err) {
        res.json({ "status": 500, "messge": err });
    });
});
router.get('/search', function (req, res) {
    models.restuarant.findAll({
        where: {
            $or: [
                {
                    name: {
                        $iLike: '%' + req.query.q + '%'
                    }
                },
                {
                    address: {
                        $iLike: '%' + req.query.q + '%'
                    }
                },
                {
                    city: {
                        $iLike: '%' + req.query.q + '%'
                    }
                },
                {
                    cuisines: {
                        $iLike: '%' + req.query.q + '%'
                    }
                }
            ]
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
router.get('/searchtable', function (req, res) {
    models.table.findAll({
        where: {
            $and: [
                {
                    restuarant_id: req.query.restuarant_id
                },
                {
                    capacity: {
                        $gte: req.query.capacity
                    }
                }
            ]

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
router.get('/getbookings', function (req, res) {
    models.booking.findAll({
        where: {


            $and: [
                {
                    table_id: req.query.table_id
                },
                {
                    from_date: {
                        $gte: new Date(req.query.from)
                    }
                },
                {
                    to_date: {
                        $lte: new Date(req.query.to)
                    }
                }
            ]

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