let router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: ''
    });
});
module.exports = router;