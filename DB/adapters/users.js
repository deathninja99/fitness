const bcrypt = require("bcrypt");
const { client } = require("../client");
const SALTROUNDS = 10;

async function createuser({ username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
    delete password;
    password = hashedPassword;
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES($1,$2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getuser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT username, password FROM users
      where $1 = username
    `,
      [username]
    );
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log("valid credentials");
      return "valid credentials";
    } else {
      console.log("invalid credentials");
      return "invalid credentials";
    }
  } catch (error) {
    throw error;
  }
}
async function getuserbyid(id) {
  try {
    console.log("get user by Id");
    const {
      rows: [user],
    } = await client.query(
      `
     SELECT username FROM users
     WHERE id = $1
     `,
      [id]
    );
    if (!user) {
      return null;
    }
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
}
async function getuserbyusername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      select * from users
      where username = $1
    `,
      [username]
    );
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createuser,
  getuser,
  getuserbyid,
  getuserbyusername,
};
