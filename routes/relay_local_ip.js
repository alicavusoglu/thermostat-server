import relay_local_ip from '../models/relay_local_ip';
let router = require('express').Router(); 
router.route('/')
    .get((req, res) => {
        relay_local_ip.findOne().sort({timeStamp: -1}).exec(function (err, input) {
            res.json(input);
            });
    })
    .post((req, res) => {
        let input = new relay_local_ip(req.body);
        input.save();
        res.status(201).send("Input OK");
    });

module.exports = router;