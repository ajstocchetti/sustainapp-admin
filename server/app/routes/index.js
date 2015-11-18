'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/company', require('./companies.js'));
router.use('/category', require('./category.js'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
