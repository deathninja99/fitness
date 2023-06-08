import React, { useState } from "react";
import { registeruser, login } from "../../api/api";
import { useLocation } from "react-router-dom";

export function AuthForm() {
  const { error, seterror } = useState();
  try {
    let location = useLocation();
    // login form
    return (
      <>
        <p>{error}</p>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const values = Object.fromEntries(formData.entries());
            let result;
            if (location.pathname == "/login") {
              result = login(values.username, values.username);
            } else {
              result = registeruser(values.username, values.username);
            }
            if (result.success) {
            }
          }}
        >
          <h1>{location.pathname.substring(1)}</h1>
          <input
            className="inputspace"
            name="username"
            type="text"
            placeholder="username"
          />
          <input
            className="inputspace"
            name="password"
            type="text"
            placeholder="password"
          />

          <button type="submit">{location.pathname.substring(1)}</button>
        </form>
      </>
    );
  } catch (error) {
    seterror(error);
  }
}
