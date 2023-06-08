export async function registeruser(username, password) {
  try {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
        },
      }),
    });
    const result = await response.json();

    // You can log ▲▲▲ the result
    // here ▼▼▼ to view the json object before returning it
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//working login function
export async function login(username, password) {
  try {
    const response = await fetch(`${BaseURL}${cohort}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
        },
      }),
    });
    const result = await response.json();
    // maybe(result.data.token);
    sessionStorage.setItem("username", username);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
export async function fetchme() {
  const response = await fetch("/api/auth/me");
  const { sucess, message, user } = await response.json;
  if (!sucess) {
    throw {
      message,
    };
  }
  return {
    sucess,
    message,
    user,
  };
}
