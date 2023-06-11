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
async function addactivitytoroutine(updateObj) {
  try {
    const setString = Object.keys(updateObj)
      //const name = object keys of input
      .map((key, i) => {
        //map over the object where keys are i/index
        return `${key}=$${i + 1}`;
        //returning the key starting at one
      })
      .join(", ");
    console.log("keys?", Object.keys(updateObj));
    console.log("setstring, ", setString);

    // seperating them with a comma
    const {
      rows: [routines_activity],
    } = await client.query(
      `insert into routines_activities(${Object.keys(updateObj)})
    values($1,$2,$3,$4)`,
      Object.values(updateObj)
    );
    console.log(setString);
    return routines_activity;
  } catch (error) {
    throw error;
  }
}
async function updateroutineactivity(id, updateObj) {
  const setString = Object.keys(updateObj)
    //const name = object keys of input
    .map((key, i) => {
      //map over the object where keys are i/index
      return `${key}=$${i + 1}`;
      //returning the key starting at one
    })
    .join(", ");
  console.log("setstring, ", setString);
  // seperating them with a comma
  const {
    rows: [updatedRoutine],
  } = await client.query(
    `
      update routines_activities
        set ${setString}
        where id = ${id}
        returning *
    `,
    Object.values(updateObj)
  );
  return updatedRoutine;
}
async function destroyroutineactivity(id) {
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
};
