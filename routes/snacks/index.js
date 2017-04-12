var express = require('express');
var router = express.Router();
// const db = require('../../db/knex.js');


/* GET snacks listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
