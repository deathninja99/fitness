import useAuth from "../hooks/useAuth";

export async function logout() {
  const response = await fetch("/api/auth/logout");
  console.log("are we hitting her");
  const loggedout = await response.json();
  return loggedout;
}
export async function registerUser(username, password) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}

//working login function
export async function login(username, password) {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const { success, message, data } = await response.json();
    console.log("response in api login", response);
    console.log("response in api user", data);
    if (!success) {
      throw {
        message,
      };
    }
    return { success, message, data };
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function fetchme() {
  try {
    const response = await fetch("/api/auth/me");
    console.log("response in fetchme", response);
    console.log("response.json", response.json);
    const { success, message, user } = response.json;
    console.log("response from fetchme", success, message, user);
    if (!success) {
      throw {
        message,
      };
    }
    return {
      success,
      message,
      user,
    };
  } catch (err) {
    console.log(err);
  }
}
//getting routines
export async function fetchroutines() {
  const response = await fetch("/api/routines");
  const routines = await response.json();
  return routines;
}
//getting activities
export async function fetchactivities() {
  const response = await fetch("/api/activities");
  const activities = await response.json();
  return activities;
}
export async function fetchmyroutines(user) {
  const response = await fetch(`/api/routines/:${user}/routines`);
  const myroutines = await response.json();
  const routines = myroutines.routines;
  console.log("these are my routines", routines);
  return routines;
}

export async function postaroutine(is_public, name, goal) {
  const response = await fetch("/api/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_public, name, goal }),
  });
  const result = await response.json();
  console.log("results", result.json);
  return result;
}

export async function postaactivity(name, description) {
  const response = await fetch("/api/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });
  const result = response.json;
  console.log("resultes from react api", result);
  return;
}

export async function addactivitytoroutine(
  count,
  duration,
  routine_id,
  activity_id
) {
  const response = await fetch("api/routine_activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count, routine_id, duration, activity_id }),
  });
  const result = response.json;
  console.log(response);
  console.log("resultes from react api", result);
  return;
}

export async function deleteroutine(routine_id) {
  try {
    console.log("id in api", routine_id);
    const response = await fetch(`api/routines/${routine_id}`, {
      method: "delete",
      body: JSON.stringify(routine_id),
    });
    const result = response.json;
    console.log("response in delete routine=======", response);
    console.log("resultes from react api", result.json);
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteactivity(routine_id) {
  try {
    const response = await fetch(
      `api/routine_activities/${routine_id}/delete`,
      {
        method: "delete",
        body: JSON.stringify(routine_id),
      }
    );
  } catch (error) {
    throw error;
  }
}
export async function updateroutine(routine_id, is_public, name, goal) {}
