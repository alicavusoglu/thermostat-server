import room_state from '../models/room_state';
let router = require('express').Router(); 
router.route('/')
    .get((req, res) => {
        room_state.find({}, (err, room_states) => {
            res.json(room_states);
        });
    })
    .post((req, res) => {
        let input = new room_state(req.body);
        input.save();
        res.status(201).send("Input OK");
    });

module.exports = router;