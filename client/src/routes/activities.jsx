import { useEffect, useState } from "react";
import { fetchactivities } from "../api/api";
import { Link } from "react-router-dom";

export default function Activities() {
  const [activities, setactivities] = useState([]);
  const [error, seterror] = useState(null);
  useEffect(() => {
    async function getactivities() {
      const gettthem = await fetchactivities();
      console.log(gettthem);
      setactivities(gettthem);
    }
    getactivities();
  }, []);
  try {
    return (
      <div>
        <h1>activities</h1>
        <Link to="/createactivity">create activity?</Link>
        <br />
        <Link to="/addactivity">add a activity to a routine?</Link>
        <div className="container">
          {activities.map((activity, idx) => {
            return (
              <div key={idx} className="card">
                <p>{activity.id}</p>
                <p>{activity.name}</p>
                <p>{activity.description}</p>
                <div />
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    seterror(error);
  }
}
