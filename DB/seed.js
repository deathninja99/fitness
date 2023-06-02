const { client } = require("./client");
//here is where you create tables, drop tables, bundled into rebuild db
const { users } = require("./seed_data");
const {
  createuser,
  getuser,
  getuserbyid,
  getuserbyusername,
} = require("./adapters/users");
const { createactivity } = require("./adapters/activities");
const {
  createroutine,
  routineswithoutactviities,
  getpublicroutinesbyactivity,
  getpublicroutinesbyuser,
} = require("./adapters/routines");
const {
  addactivitytoroutine,
  updateroutineactivity,
  destroyroutineactivity,
  getroutineactiviesbyroutine,
} = require("./adapters/routines_activities");
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
    console.log("createactivity");
    await createuser({ username: "frank", password: "4312" });
    await createuser({ username: "bob", password: "1234" });
    await createuser({ username: "canada", password: "mapleleaf" });
    await createactivity({ name: "running", description: "go fast" });
    await createactivity({ name: "pushups", description: "doing push ups" });
    await createactivity({ name: "pullups", description: "pull ups" });
    console.log("create routine");
    await createroutine(1, true, "fit fit", "git fit");
    await createroutine(2, true, "tat", "tot");
    console.log("finished crating routine");
    await addactivitytoroutine(1, 1, 110, 100);
    await addactivitytoroutine(1, 2, 5, 10);
    await addactivitytoroutine(2, 1, 50, 100);
    console.log("finished adding activities");
    console.log("getting public routines by user");
    await getpublicroutinesbyuser("frank");
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuilddb();
