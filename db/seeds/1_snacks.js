'use strict';

exports.seed = function(knex) {
  return knex('snacks').del()
    .then(() => {
      return knex('snacks').insert([{
        id: 1,
        name: 'Snickers',
        company: 'Mars',
        rating: 5
      },
      {
        id: 2,
        name: 'Hersheys Bar',
        company: 'Hershey',
        rating: 2
      },
      {
        id: 3,
        name: 'M&Ms',
        company: 'Mars',
        rating: 4
      },
      {
        id: 4,
        name: '100 Grand',
        company: 'Nestle',
        rating: 3
      }])
    }).then(() => {
      return knex.raw(
        "SELECT setval('snacks_id_seq', (SELECT MAX(id) FROM snacks));"
      )
    });
};
