const bcrypt = require("bcrypt");
const { client } = require("../client");
const SALTROUNDS = 10;
const cookie_parser = require("cookie-parser");
const { cookie_secret } = process.env;

async function createuser({ username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);

    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES($1,$2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,
      [username, hashedPassword]
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
      SELECT username, password, id FROM users
      where $1 = username
    `,
      [username]
    );
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log("valid credentials");
      return true, user.id;
    } else {
      console.log("invalid credentials");
      return false;
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
