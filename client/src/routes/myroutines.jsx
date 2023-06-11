import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteroutine, fetchmyroutines } from "../api/api";
import "../App.css";

export function myroutines() {
  const [routines, setroutines] = useState([]);
  const [error, seterror] = useState(null);
  useEffect(() => {
    async function getroutines() {
      const gettthem = await fetchmyroutines();
      setroutines(gettthem);
    }
    getroutines();
  }, []);
  async function deletehandler(e) {
    e.preventDefault();
    const routineid = e.target.value;
    const results = await deleteroutine(routineid);
    const response = results;
    console.log(response);
  }
  return (
    <div>
      <h1>my routines</h1>
      <Link to="/createroutine">create a routine?</Link>
      <br />
      <Link to="/updateroutine">update a routine?</Link>
      <Link to="/deleteactivity">delete a activity from routine?</Link>
      <div className="container">
        {routines.map((routine, idx) => {
          return (
            <>
              <div className="container">
                <div key={idx} className="card" value={routine.id}>
                  <p>{routine.name}</p>
                  <p>{routine.goal}</p>
                  <button
                    type="button"
                    value={routine.id}
                    onClick={deletehandler}
                  >
                    delete?
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
