const { green, red } = require('chalk');
const { db, User, Ringtone, Order } = require('./server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });
    
//spotify:track:

    // const projects = await Promise.all([
    //   Project.create({  title: 'Marketing', deadline: new Date, priority: 2, completed: true, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'}),
    //   Project.create({  title: 'Sales'}),
    //   Project.create({  title: 'Engineering'}),
    // ]);
    const [DejaVu] = ringtones;
    //const [marketing, sales, engineering] = projects;
//   await hannah.setProjects([marketing, engineering]);
//   await dom.setProjects([marketing]);
  return [DejaVu];

  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}