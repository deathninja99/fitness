import React from "react";
import { useState } from "react";

export function CreateActivity() {
  const [error, seterror] = useState();

  return (
    <div>
      <form>
        <input type="text" name="name" />
        <br />
        <input type="text" name="description" />
        <button type="submit">create activity</button>
      </form>
    </div>
  );
}
