import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Home from "./routes/home";
import { AuthForm } from "./routes/auth/authform";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">home</Link>
        <Link to="/register">register</Link>
        <Link to="/login">login</Link>
        <Link to="/routines">Routines</Link>
        <Link to="/myroutines">My Routines</Link>
        <Link to="/activities">Activities</Link>
        <button>logout</button>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<AuthForm />}></Route>
          <Route path="/register" element={<AuthForm />}></Route>
        </Routes>
      </div>
      <footer>sass 2023</footer>
    </div>
  );
}

export default App;
