const { client } = require("../client");
async function getroutineactivitybyid(id) {
  const { rows } = await client.query(
    `
    select * from routines_activities
    where id = $1
  `,
    [id]
  );
  return rows;
}
async function addactivitytoroutine(routine_id, activity_id, count, duration) {
  try {
    //works
    const { rows } = await client.query(
      `insert into routines_activities(routine_id,activity_id,count,duration)
    values($1,$2,$3,$4)`,
      [routine_id, activity_id, count, duration]
    );
    return;
  } catch (error) {
    throw error;
  }
}
async function updateroutineactivity(id, count, duration) {
  await client.query(
    //works
    `
    update routines_activities
    set
    count = $2,
    duration = $3
    where id = $1
  `,
    [id, count, duration]
  );
  return;
}
async function destroyroutineactivity(id) {
  await client.query(
    //tested
    `
    delete from routines_activities
    where id = $1
  `,
    [id]
  );
  return;
}
async function destroyroutines_activity(id) {
  await client.query(
    //tested
    `
    delete from routines_activities
    where routine_id = $1
  `,
    [id]
  );
  return;
}
async function getroutineactiviesbyroutine(id) {
  //works
  const { rows } = await client.query(
    `
    select * from routines_activities
    where routine_id = $1
  `,
    [id]
  );
  console.log(rows);
  return rows;
}

module.exports = {
  getroutineactiviesbyroutine,
  getroutineactivitybyid,
  destroyroutineactivity,
  updateroutineactivity,
  addactivitytoroutine,
  destroyroutines_activity,
};
