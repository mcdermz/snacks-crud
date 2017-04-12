var express = require('express');
var router = express.Router();
const db = require('../../db/knex.js');


/* GET snacks listing. */
router.get('/', snacksIndex);

router.get('/new', snacksForm);
router.get('/:id', snacksShow);
router.post('/', snacksCreate)

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
    next(err)
  })
};

function snacksForm (req, res, next) {
  res.render('snacks/form');
}

function snacksCreate(req, res, next) {
  const {name, company, img_url, rating} = req.body;
  db('snacks')
  .insert({name, company, img_url, rating}, 'id')
  .then(resId => {
    let id = resId[0];
    res.redirect(`/snacks/${id}`)
  }).catch(err => {
    next(err)
  })
}

module.exports = router;
