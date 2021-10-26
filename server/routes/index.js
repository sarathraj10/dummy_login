var express = require('express');
var router = express.Router();

router.use('/user/auth',require('../api/Auth'))

module.exports = router;
