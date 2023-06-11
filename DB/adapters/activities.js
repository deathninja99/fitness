const { client } = require("../client");

async function createactivity({ name, description }) {
  try {
    //this works

    const { rows: activity } = await client.query(
      `
      INSERT INTO activities(name, description)
      VALUES($1,$2)

      ON CONFLICT (name) DO NOTHING
      returning *;
    `,
      [name, description]
    );
    return { success: true, message: "created activity", activity };
  } catch (error) {
    return { success: false, message: "activity already made" };
  }
}
async function updateactivity(id, name, description) {
  try {
    //tested works
    const {
      rows: [activity],
    } = await client.query(
      `
      update activities
      set name = $2,
      description = $3
      where id =$1
      
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
    //tested works
    const {
      rows: [activity],
    } = await client.query(
      `
      SELECT * from activities
      where id = $1

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
    //tested works
    const { rows } = await client.query(`
    SELECT * FROM activities
  `);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createactivity,
  updateactivity,
  getactivitybyid,
  getallactivitites,
};
