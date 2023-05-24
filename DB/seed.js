const { client } = require("./client");
//here is where you create tables, drop tables, bundled into rebuild db
const { users } = require("./seed_data");
const {
  createuser,
  getuser,
  getuserbyid,
  getuserbyusername,
} = require("./adapters/users");
async function createtables() {
  console.log("Creating Tables....");
  await client.query(`
    
    create table users(
      id serial primary key,
      username varchar(255) unique,
      password varchar(255)
    );
    create table routines(
      id serial primary key ,
      creator_id integer references users(id),
      is_public boolean default false,
      name varchar(255) unique not null,
      goal text not null
    );
    create table activities(
      id serial primary key,
      name varchar(255) unique not null,
      description text not null
    );
    create table routines_activities(
      id serial primary key,
      routine_id integer references routines(id),
      activity_id integer references activities(id),
      duration integer,
      count integer
    );
    
    `);
}

async function droptables() {
  console.log("Dropping tables");
  await client.query(`
    drop table if exists routines_activities, activities, routines, users;
    `);
}

async function rebuilddb() {
  client.connect();
  try {
    await droptables();
    await createtables();
    console.log("creating a user");
    await createuser({ username: "test", password: "1234" });
    console.log("finished creating a user");
    console.log("getuser");
    await getuser({ username: "test", password: "1234" });
    console.log("get user by username");
    await getuserbyusername("test");
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuilddb();
