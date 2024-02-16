import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Box, Stack, Typography } from "@mui/material";
import Image from "../assets/profileimg.jpg";
import { NavLink } from "react-router-dom";
function Profile() {
  const [userProfileInfo, setUserProfileInfo] = useState("");

  console.log(userProfileInfo, "userProfileInfo");
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user"));

        const q = query(
          collection(database, "demo"),
          where("email", "==", userInfo.email)
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserProfileInfo(userData[0]);
      } catch (error) {
        console.error("Error getting user information: ", error);
      }
    };

    getUserInfo();
  }, []);

  const userInfo = JSON.parse(localStorage.getItem("user"));
  console.log(userInfo, "userInfouserInfo");
  return (
    <>
      <Stack
        sx={{
          backgroundImage: ` url( ${Image} )`,
          backgroundSize: "100% 100%",
          objectFit: "cover",
          position: "center",
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
            go back{" "}
          </Typography>
        </NavLink>

        <Stack
          sx={{
            borderRadius: 4,
            padding: 3,
            boxShadow: "10",
            background: "#ebebeb",
            width: "40%",
            margin: "auto",
            display: "flex ",
            justifyContent: "center",
            height: "200px",
          }}
        >
          {userProfileInfo && (
            <Stack
              sx={{
                textAlign: "center ",
                fontSize: "20px",
                fontStyle: "italic",
              }}
            >
              <Box>ID: {userProfileInfo.id}</Box>
              <Box>First Name: {userProfileInfo.firstname}</Box>
              <Box>Last Name: {userProfileInfo.lastname}</Box>
              <Box>Email: {userProfileInfo.email}</Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default Profile;
