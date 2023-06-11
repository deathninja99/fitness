import React, { useState } from "react";
import { Link } from "react-router-dom";

export function myroutines() {
  const [routines, setroutines] = useState([
    "nothing to see here",
    <br />,
    <Link to="/createroutine">create a new one?</Link>,
  ]);
  return (
    <>
      <p>{routines}</p>
    </>
  );
}
