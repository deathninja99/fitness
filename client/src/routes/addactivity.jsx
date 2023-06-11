import React, { useState, useEffect } from "react";
import Activities from "./activities";
import { addactivitytoroutine, fetchactivities } from "../api/api";
import { fetchmyroutines } from "../api/api";

export function AddActivity() {
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
    const [error, seterror] = useState("");
    const [count, setcount] = useState("");
    const [routine_id, setroutine_id] = useState();
    const [activity, setactivitity] = useState();
    const [duration, setduration] = useState("");
    async function handleSubmit(e) {
      e.preventDefault();
      console.log(count, duration, routine_id, activity);
      const result = await addactivitytoroutine(
        count,
        duration,
        routine_id,
        activity
      );
    }

    return (
      <div>
        <h1>add an activity to a routine</h1>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <p>
            {" "}
            which activity?
            <select
              name="activities"
              value={activities.id}
              onChange={(e) => {
                setactivitity(e.target.value);
              }}
            >
              {" "}
              <option>activity</option>
              {activities.map((activity, idx) => {
                return (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                );
              })}
            </select>
          </p>
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
          <p>
            <input
              type="text"
              name="description"
              placeholder="duration"
              value={duration}
              onChange={(e) => {
                setduration(e.target.value);
              }}
            />
            for how many minutes
          </p>
          <p>
            <input
              type="text"
              name="description"
              placeholder="count"
              value={count}
              onChange={(e) => {
                setcount(e.target.value);
              }}
            />
            how many times
          </p>

          <br />
          <button type="submit">create activity</button>
        </form>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
