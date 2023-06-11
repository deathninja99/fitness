import React, { useState } from "react";
import { registerUser, login } from "../../api/api";
import { useLocation } from "react-router-dom";
import "../../index.css";
import "../../App.css";
import useAuth from "../../hooks/useAuth";

export function AuthForm() {
  try {
    let location = useLocation();
    // login form
    const [error, seterror] = useState([]);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const { setloggedin, setUser } = useAuth();

    async function handleSubmit(e) {
      e.preventDefault();
      if (!username.length || !password.length) {
        seterror("You must add a valid username and password");
        return;
      }
      try {
        let result;
        if (location.pathname === "/register") {
          result = registerUser(username, password);
        } else {
          result = login(username, password);
        }
        let response = await result;
        if (response.success) {
          const user = response.data;
          setloggedin(true);
          setUser(user);
          seterror("");
        }
      } catch (error) {
        console.log(error);
        seterror(error.message);
      }
      setusername("");
      setpassword("");
    }
    return (
      <>
        <form
          className="form"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h1>{location.pathname.substring(1)}</h1>
          {error && <p>{error}</p>}
          <input
            className="inputspace"
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            className="inputspace"
            name="password"
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <button type="submit">{location.pathname.substring(1)}</button>
        </form>
      </>
    );
  } catch (error) {
    throw error;
  }
}
