import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

function Protected(props) {
  const { Component } = props;
  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = false;
      if (!isAuthenticated) {
        navigate("/home");
      }
    };

    checkAuthentication();
  }, []);

  const navigate = useNavigate();
  return <>{Component ? <Component /> : <Navigate to="/" />}</>;
}

export default Protected;
