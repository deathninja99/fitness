const client = require("../client");
async function getroutineactivitybyid(id) {
  const { rows } = client.query(`
  
  `);
}
async function addactivitytoroutine(routine_id, activity_id, count, duration) {
  try {
    const { rows } = await client.query(
      `
        insert into routines_activities(routine_id,activity_id,count,duration)
        values($1,$2,$3,$4)
        `,
      [routine_id, activity_id, count, duration]
    );
    return;
  } catch (error) {
    throw error;
  }
}
async function updateroutineactivity(id, count, duration) {}
async function destroyroutineactivity(id) {}
async function getroutineactiviesbyroutine(params) {}

module.exports = {
  getroutineactiviesbyroutine,
  getroutineactivitybyid,
  destroyroutineactivity,
  updateroutineactivity,
  addactivitytoroutine,
};
