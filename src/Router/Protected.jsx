import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../firebase";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = () => {
      const currentUser = auth.currentUser; 

      if (!currentUser) {
        
        navigate("/home");
      }
    };

    checkAuthentication();
  }, [navigate]);


  return <>{Component ? <Component /> : <Navigate to="/" />}</>;
}

export default Protected;
