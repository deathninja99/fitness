import React, { useState } from "react";
import { postaactivity } from "../api/api";
import useAuth from "../hooks/useAuth";

export function CreateActivity() {
  try {
    const [error, seterror] = useState("");
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    async function handleSubmit(e) {
      e.preventDefault();
      const results = await postaactivity(name, description);
      console.log(results);
      // if (results.message) {
      //   seterror(results.message);
      // } else {
      //   seterror("");
      // }
    }

    return (
      <div>
        <h1>create a activity</h1>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="activity name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <br />
          <button type="submit">create activity</button>
        </form>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
