import relay_local_ip from '../models/relay_local_ip';
let router = require('express').Router();

router.route('/')
    .get((req, res) => {
        relay_local_ip.find({}, (err, relay_local_ips) => {
            res.json(relay_local_ips);
        });
    })
    .post((req, res) => {
        let relay_local_ip = new relay_local_ip(req.body);
        relay_local_ip.save();
        res.status(201).send(relay_local_ip);
    });

module.exports = router;