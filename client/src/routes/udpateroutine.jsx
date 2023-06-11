import React, { useState, useEffect } from "react";
import { postaroutine } from "../api/api";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { fetchmyroutines } from "../api/api";

export function UpdateRoutine() {
  try {
    let location = useLocation();
    const [error, seterror] = useState("");
    const [name, setname] = useState("");
    const [goal, setgoal] = useState("");
    const [ispublic, setispublic] = useState(true);
    const [form, setform] = useState([]);

    const [routines, setroutines] = useState([]);
    useEffect(() => {
      async function getroutines() {
        const gettthem = await fetchmyroutines();
        setroutines(gettthem);
        console.log(gettthem);
      }
      getroutines();
    }, []);

    async function handleSubmit(e) {
      e.preventDefault();

      if (results.message) {
        seterror(results.message);
      } else {
        seterror("");
      }
    }

    return (
      <div>
        <h1> update a routine</h1>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <select>
            {" "}
            <option>routine</option>
            {routines.map((routine, idx) => {
              return (
                <option key={routine.id} value={routine.id}>
                  {routine.name}
                </option>
              );
            })}
          </select>
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
          <button type="submit">{location.pathname.substring(1)}</button>
        </form>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
