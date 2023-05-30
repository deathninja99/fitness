const { client } = require("../client");

async function getroutinebyid(id) {
  try {
    // i would have never gotten this if i didnt watch the office hours that i got kidna skipped over
    const { rows } = await client.query(
      `
   
      SELECT 
	routines.id as id,
	routines.name as name,
	routines.goal as goal, 
    CASE WHEN routines_activities.routine_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
    	JSON_BUILD_OBJECT(
    	'id', activities.id,
    	'name', activities.name,
    	'description', activities.description,
    	'duration', routines_activities.duration,
    	'count', routines_activities.count
    	)
    ) END AS activities
    FROM routines
    JOIN routines_activities 
    ON routines.id = routines_activities.routine_id
    JOIN activities 
    ON routines_activities.activity_id = activities.id
    WHERE routines.id = '1'
    GROUP BY routines.id, routines_activities.routine_id
    
        `,
      [id]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function routineswithoutactviities() {
  try {
    //needs work
    const { rows } = await client.query(`
    select * from routines
    left join routines_activities
    on routines.id = routines_activities.routine_id
    where routines_activities.activity_id is null
        `);
    console.log(rows);

    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getallroutines() {
  //works
  const { rows } = await client.query(`
  SELECT 
	routines.id as id,
	routines.name as name,
	routines.goal as goal, 
    CASE WHEN routines_activities.routine_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
    	JSON_BUILD_OBJECT(
    	'id', activities.id,
    	'name', activities.name,
    	'description', activities.description,
    	'duration', routines_activities.duration,
    	'count', routines_activities.count
    	)
    ) END AS activities
    FROM routines
    JOIN routines_activities 
    ON routines.id = routines_activities.routine_id
    JOIN activities 
    ON routines_activities.activity_id = activities.id
    GROUP BY routines.id, routines_activities.routine_id

  `);
}
async function getallpublicroutines() {
  //works
  const { rows } = await client.query(`
  SELECT 
	routines.id as id,
	routines.name as name,
	routines.goal as goal, 
    CASE WHEN routines_activities.routine_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
    	JSON_BUILD_OBJECT(
    	'id', activities.id,
    	'name', activities.name,
    	'description', activities.description,
    	'duration', routines_activities.duration,
    	'count', routines_activities.count
    	)
    ) END AS activities
    FROM routines
    JOIN routines_activities 
    ON routines.id = routines_activities.routine_id
    JOIN activities 
    ON routines_activities.activity_id = activities.id
    where routines.is_public = true
    GROUP BY routines.id, routines_activities.routine_id
  `);
}
async function getallroutinesbyuser(username) {
  try {
    //works
    const { rows } = client.query(
      `
    SELECT 
    routines.id as id,
    routines.name as name,
    routines.goal as goal,
      CASE WHEN routines_activities.routine_id IS NULL THEN '[]'::json
      ELSE 
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'duration', routines_activities.duration,
        'count', routines_activities.count
        )
      ) END AS activities
      FROM routines
      JOIN routines_activities 
      ON routines.id = routines_activities.routine_id
      JOIN activities 
      ON routines_activities.activity_id = activities.id
      join users
      on users.id = routines.creator_id
      where users.username = $1
      GROUP BY routines.id, routines_activities.routine_id
    `,
      [username]
    );
  } catch (error) {}
}
async function getpublicroutinesbyuser(username) {
  try {
    //works
    const { rows } = await client.query(
      `
      SELECT 
	routines.id as id,
	routines.name as name,
	routines.goal as goal,
    CASE WHEN routines_activities.routine_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
    	JSON_BUILD_OBJECT(
    	'id', activities.id,
    	'name', activities.name,
    	'description', activities.description,
    	'duration', routines_activities.duration,
    	'count', routines_activities.count
    	)
    ) END AS activities
    FROM routines
    JOIN routines_activities 
    ON routines.id = routines_activities.routine_id
    JOIN activities 
    ON routines_activities.activity_id = activities.id
    join users
    on users.id = routines.creator_id
    where users.username = $1 and routines.is_public = true
    GROUP BY routines.id, routines_activities.routine_id
    `,
      [username]
    );
  } catch (error) {}
}
async function getpublicroutinesbyactivity(activity) {
  try {
    //works
    const { rows } = await client.query(
      `
      SELECT 
	routines.id as id,
	routines.name as name,
	routines.goal as goal, 
    CASE WHEN routines_activities.routine_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
    	JSON_BUILD_OBJECT(
    	'id', activities.id,
    	'name', activities.name,
    	'description', activities.description,
    	'duration', routines_activities.duration,
    	'count', routines_activities.count
    	)
    ) END AS activities
    FROM routines
    JOIN routines_activities 
    ON routines.id = routines_activities.routine_id
    JOIN activities 
    ON routines_activities.activity_id = activities.id
    where activities.name like $1
    GROUP BY routines.id, routines_activities.routine_id
    `,
      [activity]
    );
    console.log(rows);
    return rows;
  } catch (error) {}
}
async function createroutine(id, is_public, name, goal) {
  try {
    //works
    const { rows } = await client.query(
      `
      insert into routines(creator_id, is_public, name, goal)
      values($1,$2,$3,$4)
    `,
      [id, is_public, name, goal]
    );
    return rows;
  } catch (error) {}
}
async function updateroutine(id, creator_id, is_public, name, goal) {
  try {
    //works
    const { rows } = await client.query(
      `
      update routines
        set 
          creator_id = $2,
          is_public = $3,
          name = $4, 
          goal = $5
        where id = $1
    `,
      [id, creator_id, is_public, name, goal]
    );
  } catch (error) {}
}
async function destroyroutine(id) {
  //untested
  const { rows } = await client.query(
    `
    delete from routines where id = $1
  `,
    [id]
  );
}

module.exports = {
  getroutinebyid,
  routineswithoutactviities,
  getallroutines,
  getallpublicroutines,
  getallroutinesbyuser,
  getpublicroutinesbyuser,
  getpublicroutinesbyactivity,
  createroutine,
  updateroutine,
  destroyroutine,
};
