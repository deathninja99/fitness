import React, { useState, useEffect } from "react";
import Activities from "./activities";
import {
  addactivitytoroutine,
  deleteactivity,
  fetchactivities,
} from "../api/api";
import { fetchmyroutines } from "../api/api";

export function DeleteActivity() {
  const [activities, setactivities] = useState([]);
  const [error, seterror] = useState(null);

  useEffect(() => {
    async function getactivities() {
      const gettthem = await fetchactivities();
      setactivities(gettthem);
    }
    getactivities();
  }, []);

  const [routines, setroutines] = useState([]);
  useEffect(() => {
    async function getroutines() {
      const gettthem = await fetchmyroutines();
      setroutines(gettthem);
    }
    getroutines();
  }, []);

  try {
    const [routine_id, setroutine_id] = useState();
    async function handleSubmit(e) {
      e.preventDefault();
      const result = await deleteactivity(routine_id);
    }

    return (
      <div>
        <h1>delete a activities from a routine</h1>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <p>
            {" "}
            which routine?
            <select
              name="routine"
              value={routines.id}
              onChange={(e) => {
                setroutine_id(e.target.value);
              }}
            >
              <option>routine</option>
              {routines.map((routine, idx) => {
                return (
                  <option key={routine.id} value={routine.id}>
                    {routine.name}
                  </option>
                );
              })}
            </select>
          </p>
          <br />
          <button type="submit">delete activities</button>
        </form>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
