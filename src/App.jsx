import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Logiin from "./component/Logiin";
import Home from "./component/Home";
import EditForm from "./component/EditForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Dashboard />} />
          <Route path="/" element={<Logiin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit/:id"  element={<EditForm />} />
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
