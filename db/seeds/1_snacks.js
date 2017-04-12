'use strict';

exports.seed = function(knex) {
  return knex('snacks').del()
    .then(() => {
      return knex('snacks').insert([{
        id: 1,
        name: 'Snickers',
        company: 'Mars',
        rating: 5,
        img_url: 'http://www.worldofsnacks.com/uploads/1/3/1/2/13127180/s643667121527569464_p60_i1_w640.jpeg'
      },
      {
        id: 2,
        name: 'Hershey Bar',
        company: 'Hershey',
        rating: 2,
        img_url: 'https://images-na.ssl-images-amazon.com/images/I/61FeEuondaL._SL1500_.jpg'
      },
      {
        id: 3,
        name: 'M&Ms',
        company: 'Mars',
        rating: 4,
        img_url: 'http://cdn.www.ministry-to-children.com/wp-content/uploads/2012/04/M-M-candy.jpg'
      },
      {
        id: 4,
        name: '100 Grand',
        company: 'Nestle',
        rating: 3,
        img_url: 'https://upload.wikimedia.org/wikipedia/en/e/e9/100-Grand-Wrapper-Small.jpg'
      }])
    }).then(() => {
      return knex.raw(
        "SELECT setval('snacks_id_seq', (SELECT MAX(id) FROM snacks));"
      )
    });
};
