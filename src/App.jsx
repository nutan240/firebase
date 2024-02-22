

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Logiin from "./component/Logiin";
import Home from "./component/Home";
import EditForm from "./component/EditForm";
import Protected from "./Router/Protected"; 
import Profile from "./component/Profile";
import Empregistrationdashboard from "./component/Empregistrationdashboard";



function App() {
  return (
    <>
  
      <Router>
        <Routes>
          <Route path="/signup" element={<Dashboard />} />
          <Route path="/" element={<Logiin />} />
          <Route path="/home" element={<Protected Component={Home} />} />
          
          <Route path="/edit/:id" element={<EditForm />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/dashboard" element={<Empregistrationdashboard/>} />
         
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
