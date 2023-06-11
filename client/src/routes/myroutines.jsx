import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchmyroutines } from "../api/api";
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
  return (
    <div>
      <h1>my routines</h1>
      <Link to="/createroutine">create a routine?</Link>
      <div className="container">
        {routines.map((routine, idx) => {
          return (
            <>
              <div className="container">
                <div key={idx} className="card">
                  <p>{routine.name}</p>
                  <p>{routine.goal}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
