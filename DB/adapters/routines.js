const { client } = require("../client");

async function getroutinebyid(id) {
  try {
    //untested
    const {
      rows: [routine],
    } = await client.query(
      `
    SELECT * FROM ROUTINES.name, activities.name
    FROM routines 
    WHERE routine.id = $1 
    INNER JOIN activities 
    ON routines.id = activities.id
        `,
      [id]
    );
    return routine;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function routineswithoutactviities() {
  try {
    //untested
    const { rows } = await client.query(`
        SELECT * from routines
        RETURNING *;
        `);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getallroutines() {
  //
  const { rows } = await client.query(`
    SELECT * FROM ROUTINES 
    JOIN activities on routine.id = routines_activities.id

  `);
}
async function getallpublicroutines() {
  //untested, prob doesnt work
  const { rows } = await client.query(`
    select * from routines
    join activities on routine.id = routines_activities.id
    where is_public = true
  `);
}
async function getallroutinesbyuser(username) {
  try {
    //untested prob doesnt work
    const { rows } = client.query(`
      select * from routines
      join activities on routine.id = routines_activities.id
      where username = $1
    `);
  } catch (error) {}
}
async function getpublicroutinesbyuser(username) {
  try {
    //untested prob doesnt work
    const { rows } = await client.query(
      `
      select * from routines
      join activites on routine.id = routines_activities.id
      where is_public = true && where username = $1
    `,
      [username]
    );
  } catch (error) {}
}
async function getpublicroutinesbyactivity(activity) {
  try {
    //untested prob doesnt work
    const { rows } = await client.query(
      `
      select * from routines
      join activites on routines.id = routines_activities.id
      where activity.name = $1
    `,
      [activity]
    );
  } catch (error) {}
}
async function createroutine(id, is_public, name, goal) {
  try {
    //untested prob doesnt work
    const { rows } = await client.query(
      `
      insert into routines(creator_id is_public name goal)
      values($1,$2,$3,$4)
      returning*
    `,
      [id, is_public, name, goal]
    );
  } catch (error) {}
}
async function updateroutine(id, creator_id, is_public, name, goal) {
  try {
    //untested prob doesnt work
    const { rows } = await client.query(
      `
      insert into routines(creator_id, is_public, name, goal)
      values($2,$3,$4,$5)
      where id = $1
      returning *
    `,
      [id, creator_id, is_public, name, goal]
    );
  } catch (error) {}
}
async function destroyroutine(id) {
  //untested
  const { rows } = await client.query(
    `
    delete from routines where id = $1
  `,
    [id]
  );
}

module.exports = {
  getroutinebyid,
  routineswithoutactviities,
  getallroutines,
  getallpublicroutines,
  getallroutinesbyuser,
  getpublicroutinesbyuser,
  getpublicroutinesbyactivity,
  createroutine,
  updateroutine,
  destroyroutine,
};
