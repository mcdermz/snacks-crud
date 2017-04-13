var express = require('express');
var router = express.Router();
const db = require('../../db/knex.js');


/* GET snacks listing. */
router.get('/', snacksIndex);

router.get('/new', snacksForm);
router.get('/:id', snacksShow);
router.post('/', snacksCreate);
router.delete('/:id', snacksDelete);
router.get('/:id/edit', snacksEditForm);
router.put('/:id', snacksUpdate)

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
  res.render('snacks/form', {route: "/snacks"});
}

function snacksCreate(req, res, next) {
  const {name, company, rating, img_url} = req.body;

  let newSnack = req.body.img_url ?
  {name, company, rating, img_url} : {name, company, rating};

  if ([name, company, rating, img_url].some((el) => !el)) {
    res.render('snacks/form', {name, company, img_url, rating, id, error: {message: 'One or more fields are not filled out'}, route: "/snacks"})
  }

  db('snacks')
  .insert(newSnack, 'id')
  .then(resId => {
    let id = resId[0];
    res.redirect(`snacks/${id}`)
  }).catch(err => {
    next(err)
  })
}

function snacksDelete(req, res, next) {
  const id = req.params.id;

  db('snacks').del().where({ id })
  .then(() => {
    res.redirect('/snacks')
  }).catch(err => {
    next(err);
  });
}

function snacksEditForm(req, res, next) {
  const id = req.params.id;

  db('snacks').where({ id })
  .then(snack => {
    const {name, company, img_url, rating, id} = snack[0]
    res.render('snacks/form', {name, company, img_url, rating, id, route: "/snacks/" + id + "?_method=PUT"})
  })
}

function snacksUpdate(req, res, next) {
  let id = req.params.id;
  const {name, company, rating, img_url} = req.body;

  if ([name, company, rating, img_url].some((el) => !el)) {
    res.render('snacks/form', {name, company, img_url, rating, id, error: {message: 'One or more fields are not filled out'}, route: "/snacks/" + id + "?_method=PUT"})
  }
  db('snacks').where({ id })
  .update({name, company, rating, img_url}, 'id')
  .then(resId => {
    id = resId[0];
    res.redirect('/snacks/' + id);
  }).catch(err => {
    next(err);
  });

}
module.exports = router;
