const { client } = require("../client");

async function createactivity({ name, description }) {
  try {
    //this works, BUT it throws error TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
    //idk how to fix
    const {
      rows: [activity],
    } = client.query(
      `
      INSERT INTO activities(name, description)
      VALUES($1,$2)

      ON CONFLICT (name) DO NOTHING
      returning *;
    `,
      [name, description]
    );
    console.log(activity);

    return activity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function updateactivity(id, name, description) {
  try {
    //untested
    const {
      rows: [activity],
    } = client.query(
      `
    INSERT INTO ACTIVITIES(name, description)
    VALUES($2,$3)
    WHERE id = $1
    returning*;
  `,
      [id, name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getactivitybyid(id) {
  try {
    //untested
    const {
      rows: [activity],
    } = client.query(
      `
      SELECT * from activities
      where id = $1
      returning *
    `,
      [id]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getallactivitites() {
  try {
    //untested
    const { rows } = client.query(`
    SELECT * FROM activities
    returning *
  `);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createactivity,
};
