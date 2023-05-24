const { client } = require("../client");

async function getroutinebyid(id) {
  try {
    client.query(`
        `);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function routineswithoutactviities() {
  try {
    client.query(`
        SELECT * from routines
        `);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
