import React, { useState, useEffect } from "react";
import Activities from "./activities";
import { fetchactivities } from "../api/api";

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
  try {
    const [error, seterror] = useState("");
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    async function handleSubmit(e) {
      e.preventDefault();
      console.log(results);
      // if (results.message) {
      //   seterror(results.message);
      // } else {
      //   seterror("");
      // }
    }

    return (
      <div>
        <h1>add an activity to a routine</h1>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <select name="" id="">
            {activities.map((activity, idx) => {
              return <option key={activity.id}>{activity.name}</option>;
            })}
          </select>
          <br />
          <p>
            <input
              type="text"
              name="description"
              placeholder="duration"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            in minutes
          </p>
          <p>
            <input
              type="text"
              name="description"
              placeholder="count"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
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
