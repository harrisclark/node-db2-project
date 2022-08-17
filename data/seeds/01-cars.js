// STRETCH

exports.seed = async function(knex) {
  await knex('cars').del();
  await knex('cars').insert([
    {
      vin: 1212121212121212,
      make: "honda",
      model: "fit",
      mileage: 100200,
      transmission: "manual"
    },
    {
      vin: 3434343434343434,
      make: "honda",
      model: "crv",
      mileage: 22000,
      title: "salvage"
    }
  ])
}