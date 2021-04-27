'use strict';

const {
  db,
  models: { Ringtone, User, Order },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Ringtones
  const ringtones = await Promise.all([
    Ringtone.create({
      name: 'Deja Vu',
      artist: 'Olivia Rodrigo',
      genre: 'Pop',
      price: 99,
      songUrl: 'spotify:track:61KpQadow081I2AsbeLcsb',
    }),
    Ringtone.create({
      name: 'Montero',
      artist: 'Lil Nas X',
      genre: 'Hip-Hop',
      songUrl: 'spotify:track:67BtfxlNbhBmCDR2L2l8qd',
    }),
    Ringtone.create({
      name: 'Champagne Problems',
      artist: 'Taylor Swift',
      genre: 'Pop',
      songUrl: 'spotify:track:1gcyHQpBQ1lfXGdhZmWrHP',
    }),
    Ringtone.create({
      name: 'Gaslighter',
      artist: 'The Chicks',
      genre: 'Country',
      songUrl: 'spotify:track:4UN6sBmFTt2IqxN3IRqJT3',
    }),
    Ringtone.create({
      name: 'Go Your Own Way',
      artist: 'Fleetwood Mac',
      genre: 'Rock',
      songUrl: 'spotify:track:4xh7W7tlNMIczFhupCPniY',
    }),
    Ringtone.create({
      name: 'Peaches',
      artist: 'Justin Bieber',
      genre: 'Pop',
      songUrl: 'spotify:track:4iJyoBOLtHqaGxP12qzhQI',
    }),
    Ringtone.create({
      name: 'WAP',
      artist: 'Cardi B',
      genre: 'Rap',
      songUrl: 'spotify:track:4iJyoBOLtHqaGxP12qzhQI',
    }),
    Ringtone.create({
      name: 'Willow',
      artist: 'Taylor Swift',
      genre: 'Pop',
      songUrl: 'spotify:track:3Uo7WG0vmLQ07WB4BDwy7D',
    }),
    Ringtone.create({
      name: `Mr.Perfectly Fine (Taylor's Version)`,
      artist: 'Taylor Swift',
      genre: 'Pop',
      songUrl: 'spotify:track:2CYVETnhM9aytqrazYYwrK',
    }),
    Ringtone.create({
      name: 'Coney Island',
      artist: 'Taylor Swift',
      genre: 'Pop',
      songUrl: 'spotify:track:2awNGIJHodfLZSClB3PYhz',
    }),
  ]);
  const users = await Promise.all([
    User.create({
      email: 'cody@mail.com',
      firstName: 'Cody',
      lastName: 'Smith',
      password: 'cody123',
    }),
    User.create({
      email: 'murphy@mail.com',
      firstName: 'Murphy',
      lastName: 'Pink',
      password: 'murphy123',
    }),
    User.create({
      email: 'hannah@mail.com',
      firstName: 'Hannah',
      lastName: 'Park',
      password: 'hannah123',
      isAdmin: true,
    }),
    User.create({
      email: 'anna@mail.com',
      firstName: 'Anna',
      lastName: 'Rodriguez',
      password: 'anna123',
      isAdmin: true,
    }),
    User.create({
      email: 'matt@mail.com',
      firstName: 'Matt',
      lastName: 'Taylor',
      password: 'matt123',
    }),
    User.create({
      email: 'ralph@mail.com',
      firstName: 'Ralph',
      lastName: 'Shi',
      password: 'ralph123',
    }),
    User.create({
      email: 'paul@mail.com',
      firstName: 'Paul',
      lastName: 'Rudd',
      password: 'paul123',
    }),
    User.create({
      email: 'mickey@mail.com',
      firstName: 'Mickey',
      lastName: 'Pi',
      password: 'mickey123',
    }),
    User.create({
      email: 'rebecca@mail.com',
      firstName: 'Rebecca',
      lastName: 'Fang',
      password: 'rebecca123',
    }),
    User.create({
      email: 'chris@mail.com',
      firstName: 'Chris',
      lastName: 'Evans',
      password: 'chris123',
    }),
    User.create({
      email: 'vickie@mail.com',
      firstName: 'Vickie',
      lastName: 'Evans',
      password: 'vickie123',
      isAdmin: true,
    }),
    User.create({
      email: 'shiyang@mail.com',
      firstName: 'Shiyang',
      lastName: 'Fox',
      password: 'shiyang123',
      isAdmin: true,
    }),
  ]);
  const orders = await Promise.all([
    Order.create({
      paymentMethod: 'Credit Card',
      completed: false,
      totalPrice: 199,
    }),
    Order.create({ paymentMethod: 'Venmo', completed: true, totalPrice: 199 }),
    Order.create({
      paymentMethod: 'PayPal',
      completed: false,
      totalPrice: 597,
    }),
    Order.create({ paymentMethod: 'Venmo', completed: false, totalPrice: 199 }),
    Order.create({ paymentMethod: 'PayPal', completed: true, totalPrice: 199 }),
    Order.create({
      paymentMethod: 'Credit Card',
      completed: true,
      totalPrice: 199,
    }),
    Order.create({
      paymentMethod: 'PayPal',
      completed: false,
      totalPrice: 199,
    }),
    Order.create({ paymentMethod: 'Venmo', completed: false, totalPrice: 199 }),
    Order.create({ paymentMethod: 'Venmo', completed: true, totalPrice: 398 }),
    Order.create({ paymentMethod: 'PayPal', completed: true, totalPrice: 398 }),
  ]);

  const [
    DejaVu,
    Montero,
    ChampagneProblems,
    Gaslighter,
    GoYourOwnWay,
    Peaches,
    WAP,
    Willow,
    MrPerfectlyFine,
    ConeyIsland,
  ] = ringtones;
  console.log(`seeded ${ringtones.length} ringtones`);
  console.log(`seeded successfully`);
  await users[0].setOrders([orders[0], orders[1], orders[2]]);
  await users[1].setOrders(orders[3]);
  await users[5].setOrders([orders[4], orders[5]]);
  await users[6].setOrders(orders[6]);
  await users[7].setOrders(orders[7]);
  await users[8].setOrders([orders[8], orders[9]]);
  await orders[0].setRingtones(DejaVu);
  await orders[1].setRingtones(Montero);
  await orders[2].setRingtones([ChampagneProblems, Gaslighter, GoYourOwnWay]);
  await orders[3].setRingtones([Peaches]);
  await orders[4].setRingtones(WAP);
  await orders[5].setRingtones(Willow);
  await orders[6].setRingtones(MrPerfectlyFine);
  await orders[7].setRingtones(ConeyIsland);
  await orders[8].setRingtones([Peaches, Gaslighter]);
  await orders[9].setRingtones([Montero, ConeyIsland]);
  return [
    DejaVu,
    Montero,
    ChampagneProblems,
    Gaslighter,
    GoYourOwnWay,
    Peaches,
    WAP,
    Willow,
    MrPerfectlyFine,
    ConeyIsland,
  ];
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
