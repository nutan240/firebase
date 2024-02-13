import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Logiin from "./component/Logiin";
import Home from "./component/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Dashboard />} />
          <Route path="/" element={<Logiin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
