import "./App.css";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Home from "./routes/home";
import { AuthForm } from "./routes/auth/authform";
import Routines from "./routes/routines";
import Activities from "./routes/activities";
import { logout } from "./api/api";
import { myroutines as MyRoutines } from "./routes/myroutines";
import { CreateRoutine } from "./routes/createroutine";
import useAuth from "./hooks/useAuth";
import { CreateActivity } from "./routes/createactivity";
import { AddActivity } from "./routes/addactivity";
import { UpdateRoutine } from "./routes/udpateroutine";
import { DeleteActivity } from "./routes/deleteactivity";

function App() {
  const { user, setUser, loggedin } = useAuth();
  async function logouthandler() {
    logout();
    setUser({ id: null, username: "Guest" });
  }

  return (
    <div className="App">
      <nav>
        {<h4>welcome, {user.username}</h4>}
        <Link to="/">home</Link>
        <Link to="/register">register</Link>
        <Link to="/login">login</Link>
        <Link to="/routines">Routines</Link>
        {loggedin ? <Link to="/myroutines">My Routines</Link> : <></>}
        <Link to="/activities">Activities</Link>
        <button onClick={logouthandler}>logout</button>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<AuthForm />}></Route>
          <Route path="/register" element={<AuthForm />}></Route>
          <Route path="/routines" element={<Routines></Routines>} />
          <Route path="/myroutines" element={<MyRoutines></MyRoutines>}></Route>
          <Route path="/activities" element={<Activities />} />
          <Route path="/createroutine" element={<CreateRoutine />}></Route>
          <Route
            path="/deleteactivity"
            element={<DeleteActivity></DeleteActivity>}
          ></Route>
          <Route
            path="/createactivity"
            element={<CreateActivity></CreateActivity>}
          ></Route>
          <Route
            path="/addactivity"
            element={<AddActivity></AddActivity>}
          ></Route>
          <Route
            path="/updateroutine"
            element={<UpdateRoutine></UpdateRoutine>}
          ></Route>
        </Routes>
      </div>
      <footer>sass 2023</footer>
    </div>
  );
}

export default App;
