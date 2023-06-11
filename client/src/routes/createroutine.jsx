import React, { useState } from "react";
import { postaroutine } from "../api/api";
import useAuth from "../hooks/useAuth";

export function CreateRoutine() {
  try {
    const [error, seterror] = useState("");
    const [name, setname] = useState("");
    const [goal, setgoal] = useState("");
    const [ispublic, setispublic] = useState(true);
    async function handleSubmit(e) {
      e.preventDefault();
      const results = await postaroutine(ispublic, name, goal);
      if (results.message) {
        seterror(results.message);
      } else {
        seterror("");
      }
    }

    return (
      <div>
        <h1>create a routine</h1>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <p>
            private
            <input
              type="radio"
              name="public"
              value={false}
              onChange={(e) => {
                setispublic(e.target.value);
              }}
            ></input>
          </p>
          <input
            type="text"
            name="name"
            placeholder="routine name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            name="goal"
            placeholder="goal"
            value={goal}
            onChange={(e) => {
              setgoal(e.target.value);
            }}
          />
          <br />
          <button type="submit">create routine</button>
        </form>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
