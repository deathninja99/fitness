import React from "react";
import { postaroutine } from "../api/api";

export function CreateRoutine() {
  try {
    return (
      <div>
        <h1>create a routine</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault([]);
            const form = event.target;
            const formData = new FormData(form);
            const values = Object.fromEntries(formData.entries());
            let result = postaroutine(
              values.is_public,
              values.name,
              values.goal
            );
          }}
        >
          <p>
            private?
            <input type="checkbox" name="is_public" defaultChecked />
          </p>
          <input type="text" name="name" placeholder="routine name" />
          <br />
          <input type="text" name="goal" placeholder="goal" />
          <br />
          <button type="submit">create routine</button>
        </form>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
