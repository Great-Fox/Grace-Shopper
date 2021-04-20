'use strict'

const {db, models: {Ringtone, User, Order} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Ringtones
  const ringtones = await Promise.all([
    Ringtone.create({  name: 'Deja Vu', artist: 'Olivia Rodrigo', genre: 'pop', price: .99, songUrl: 'spotify:track:61KpQadow081I2AsbeLcsb' }),
    Ringtone.create({  name: 'Montero', artist: 'Lil Nas X', genre: 'hip-hop', songUrl: 'spotify:track:67BtfxlNbhBmCDR2L2l8qd' }),
    Ringtone.create({  name: 'Champagne Problems', artist: 'Taylor Swift', genre: 'pop', songUrl: 'spotify:track:1gcyHQpBQ1lfXGdhZmWrHP' }),
    Ringtone.create({  name: 'Gaslighter', artist: 'The Chicks', genre: 'country', songUrl: 'spotify:track:4UN6sBmFTt2IqxN3IRqJT3' }),
    Ringtone.create({  name: 'Go Your Own Way', artist: 'Fleetwood Mac', genre: 'Rock', songUrl: 'spotify:track:4xh7W7tlNMIczFhupCPniY' }),
    Ringtone.create({  name: 'Peaches', artist: 'Justin Bieber', genre: 'Pop', songUrl: 'spotify:track:4iJyoBOLtHqaGxP12qzhQI' }),
    Ringtone.create({  name: 'WAP', artist: 'Cardi B', genre: 'Rap', songUrl: 'spotify:track:4iJyoBOLtHqaGxP12qzhQI' }),
    Ringtone.create({  name: 'Willow', artist: 'Taylor Swift', genre: 'pop', songUrl: 'spotify:track:3Uo7WG0vmLQ07WB4BDwy7D' }),
    Ringtone.create({  name: `Mr.Perfectly Fine (Taylor's Version)`, artist: 'Taylor Swift', genre: 'pop', songUrl: 'spotify:track:2CYVETnhM9aytqrazYYwrK' }),
    Ringtone.create({  name: 'Coney Island', artist: 'Taylor Swift', genre: 'pop', songUrl: 'spotify:track:2awNGIJHodfLZSClB3PYhz' })
  ]);
  const users = await Promise.all([
    User.create({ email: 'cody@mail.com', firstName: 'Cody', lastName: 'Smith', password: 'cody123' }),
    User.create({ email: 'murphy@mail.com', firstName: 'Murphy', lastName: 'Pink', password: 'murphy123' }),
    User.create({ email: 'hannah@mail.com', firstName: 'Hannah', lastName: 'Park', password: 'hannah123' }),
    User.create({ email: 'anna@mail.com', firstName: 'Anna', lastName: 'Rodriguez', password: 'anna123' }),
    User.create({ email: 'matt@mail.com', firstName: 'Matt', lastName: 'Taylor', password: 'matt123' }),
    User.create({ email: 'ralph@mail.com', firstName: 'Ralph', lastName: 'Shi', password: 'ralph123' }),
    User.create({ email: 'paul@mail.com', firstName: 'Paul', lastName: 'Rudd', password: 'paul123' }),
    User.create({ email: 'mickey@mail.com', firstName: 'Mickey', lastName: 'Pi', password: 'mickey123' }),
    User.create({ email: 'rebecca@mail.com', firstName: 'Rebecca', lastName: 'Fang', password: 'rebecca123' }),
    User.create({ email: 'chris@mail.com', firstName: 'Chris', lastName: 'Evans', password: 'chris123' }),
  ]);
  const orders = await Promise.all([
    Order.create({ paymentMethod: 'Credit Card', completed: false}),
    Order.create({ paymentMethod: 'Venmo', completed: true}),
    Order.create({ paymentMethod: 'PayPal', completed: false}),
    Order.create({ paymentMethod: 'Venmo', completed: false}),
    Order.create({ paymentMethod: 'PayPal', completed: true}),
    Order.create({ paymentMethod: 'Credit Card', completed: true}),
    Order.create({ paymentMethod: 'PayPal', completed: false}),
    Order.create({ paymentMethod: 'Venmo', completed: false}),
    Order.create({ paymentMethod: 'Venmo', completed: true}),
    Order.create({ paymentMethod: 'PayPal', completed: true}),
  ])
  
  const [DejaVu, Montero, ChampagneProblems, Gaslighter, GoYourOwnWay, Peaches, WAP, Willow, MrPerfectlyFine, ConeyIsland] = ringtones;
  console.log(`seeded ${ringtones.length} ringtones`)
  console.log(`seeded successfully`)
  return [DejaVu, Montero, ChampagneProblems, Gaslighter, GoYourOwnWay, Peaches, WAP, Willow, MrPerfectlyFine, ConeyIsland]
}
/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
