var express = require('express');
var router = express.Router();
const db = require('../../db/knex.js');


/* GET snacks listing. */
router.get('/', snacksIndex);
router.get('/:id', snacksShow);

function snacksIndex(req, res, next) {
  db('snacks')
  .then(snacksIndex => {
    res.render('snacks/index', {snacksIndex});
  })
};

function snacksShow(req, res, next) {
  const id = req.params.id;
  db('snacks').where({ id }).first()
  .then(snack => {
    res.render('snacks/show', { snack })
  }).catch(err => {
    console.error(err);
    next(err)
  })
};

module.exports = router;
