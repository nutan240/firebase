import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "../assets/profileimg.jpg";
import { NavLink } from "react-router-dom";
import { makeStyles } from "mui-styles-hook";

const useStyles = makeStyles(() => ({
  stack_container: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "auto",
    height: "100vh",
    padding: 2,
  },
  typography: {
    fontSize: "20px",
    fontWeight: "bold",
    fontStyle: "italic",
    width: "100px",
  },
  stack_container1: {
    borderRadius: 4,
    padding: 3,
    boxShadow: 10,
    background: "#EBEBEB",

    minWidth: "200px",

    margin: "auto",
    display: "flex",
    justifyContent: "center",
    height: "200px",
  },
  box_container: {
    textAlign: "center",
    fontSize: "20px",
    fontStyle: "italic",
  },
}));

function Profile() {
  const classes = useStyles();

  const [userProfileInfo, setUserProfileInfo] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserProfileInfo(userData);
    }
  }, []);

  return (
    <>
      <Stack sx={classes.stack_container}>
        <NavLink to={"/home"}>
          <Typography sx={classes.typography}>Go back</Typography>
        </NavLink>
        <Stack sx={classes.stack_container1}>
          {userProfileInfo && (
            <Stack sx={classes.box_container}>
              <Box>ID: {userProfileInfo.uid}</Box>

              <Box>Email: {userProfileInfo.email}</Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}
export default Profile;
