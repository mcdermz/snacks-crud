var express = require('express');
var router = express.Router();
const db = require('../../db/knex.js');


/* GET snacks listing. */
router.get('/', snacksIndex);

function snacksIndex(req, res, next) {
  db('snacks')
  .then(snacksIndex => {
    res.render('snacks/index', {snacksIndex});
  })
};

module.exports = router;
