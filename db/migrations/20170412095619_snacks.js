
'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('snacks', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.string('company').notNullable().defaultTo('');
    table.integer('rating').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('snacks');
};
