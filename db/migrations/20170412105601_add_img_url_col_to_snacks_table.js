
exports.up = function(knex, Promise) {
  return knex.schema.table('snacks', table => {
    table.text('img_url').default('https://previews.123rf.com/images/iqoncept/iqoncept1208/iqoncept120800014/14783233-A-brown-chocolate-candy-bar-wrapper-with-the-word-Snack-illustrating-junk-food-high-calorie-snacks-t-Stock-Photo.jpg')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumn('img_url')
};
