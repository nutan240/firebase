import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "../assets/profileimg.jpg";
import { NavLink } from "react-router-dom";
function Profile() {
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  useEffect(() => {
    // Retrieve user details from local storage after login
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData ,'userDatauserData')
    if (userData) {
      setUserProfileInfo(userData);
    }
  }, []);

  console.log(userProfileInfo , 'userProfileInfo')
  return (
    <>
      <Stack
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "auto",
          height: "100vh",
          padding: 2,
        }}
      >
        <NavLink to={"/home"}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              fontStyle: "italic",
              width: "100px",
            }}
          >
            Go back
          </Typography>
        </NavLink>
        <Stack
          sx={{
            borderRadius: 4,
            padding: 3,
            boxShadow: 10,
            background: "#EBEBEB",
 
            minWidth:'200px' ,
                    
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            height: "200px",
          }}
        >
          {userProfileInfo && (
            <Stack
              sx={{
                textAlign: "center",
                fontSize: "20px",
                fontStyle: "italic",

              }}
            >
              <Box
              >ID: {userProfileInfo.uid}</Box>
              
              <Box>Email: {userProfileInfo.email}</Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}
export default Profile;