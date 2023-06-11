import { useEffect, useState } from "react";
import { fetchroutines } from "../api/api";
import Activities from "./activities";
import "../App.css";
import { Link } from "react-router-dom";

export default function Routines() {
  const [routines, setroutines] = useState([]);
  const [activities, setactivities] = useState([]);
  const [error, seterror] = useState(null);
  useEffect(() => {
    async function getroutines() {
      const gettthem = await fetchroutines();
      setroutines(gettthem);
    }
    getroutines();
  }, []);
  try {
    return (
      <div>
        <h1>Routines</h1>
        <Link to="/createroutine">create a routine?</Link>
        <div className="container">
          {routines.map((routine, idx) => {
            return (
              <>
                <div>
                  <div key={idx} className="card">
                    <p>{routine.name}</p>
                    <p>{routine.id}</p>
                    <p>{routine.goal}</p>
                    {routine.activities.map((activity, idx) => {
                      return (
                        <div key={idx}>
                          <p>{activity.name}:</p>
                          <p>
                            {activity.count} reps for {activity.duration}{" "}
                            minutes
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    seterror(error);
  }
}
