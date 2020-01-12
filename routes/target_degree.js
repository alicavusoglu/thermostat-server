import target_degree from '../models/target_degree';
let router = require('express').Router();

router.route('/')
    .get((req, res) => {
        target_degree.find({}, (err, target_degrees) => {
            res.json(target_degrees);
        });
    })
    .post((req, res) => {
        let target_degree = new target_degree(req.body);
        target_degree.save();
        res.status(201).send(target_degree);
    });

module.exports = router;