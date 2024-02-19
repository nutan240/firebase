import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "../assets/gifimg.gif";
import Image1 from "../assets/loginimg4.jpg";

function Logiin() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please enter your email"),
      password: Yup.string().min(6).required("Please enter your password"),
    }),

    onSubmit: (values) => {
      if (!values.email || !values.password) {
        setErrorMsg("Fill in all fields");
        return;
      }
      setErrorMsg("");

      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((res) => {
          const user = {
            uid: res.user.uid,
            email: res.user.email,

            firstname: values.firstname,
          };
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Login successful!");
          navigate("/home");
        })
        .catch((err) => {
          setErrorMsg(err.message);
          console.log(err.message);
        });
    },
  });
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          objectFit: "cover",
          position: "center",
          overflow: "auto",
          height: "80vh",

          display: "flex",
          background: "#006369a3",
          padding: 9,
          borderRadius: 3,
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            width: { lg: "70%", sm: "100%", xs: "auto" },
            justifyContent: "center",
            margin: "auto",
            height: "80vh",
          }}
        >
          <Stack
            sx={{
              width: "50% ",
              margin: "auto",
              boxShadow: 3,
              padding: 5,
              height: "80%",
              background: "rgb(255 255 255)",
              backgroundImage: ` url( ${Image1} )`,
              color: "white",
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 8,
              display :{ lg :'block' , sm  :'block' , xs : 'none'} ,
               justifyItems: "center",
               display : 'flex'

            }}
          >
            <Box
              sx={{
                width: { lg :"70%", sm : '50%'},
                fontStyle: "italic",
                fontWeight: "bold",
                justifyItems: "center",
                alignItems: "center",
                margin: "auto",
                fontSize: "26px",
                
               
           }}
            >
              <Typography
                sx={{
                  fontSize: { lg :"35px", sm : '30px' , sx :'0px'} ,
                  width: { lg :"70%", sm : '90%'},
                }}
              >
                JOIN OUR{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "26px",
                }}
              >
                COMMUNITY{" "}
              </Typography>
              <Typography>keep Your Employee Data saperate</Typography>
            </Box>
          </Stack>

          <Stack
            sx={{
              width: { lg: "50%", sm : '50%' , xs:"100%",  },
              // width: "50% ",
              margin: "auto",
              boxShadow: 3,
              padding: {lg :5, sm : 5 , xs : 2} ,
              height: "80%",
              background: "rgb(255 255 255)",
             
              borderTopRightRadius: 9,
              borderBottomRightRadius: 9,
            }}
            className="form_container"
          >
            <Typography
              sx={{
                fontWeight: "bold",
                paddingBottom: "15px",
                color: "rgb(37, 84, 112)",
              }}
              variant="h5"
            >
              Login ...
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Stack
                sx={{ width: "100%", fontSize: "19px" }}
                direction={"column"}
                spacing={1}
              >
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "13px",
                    fontStyle: "italic",
                  }}
                  color={"red"}
                >
                  {formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email}
                </Typography>

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "13px",
                    fontStyle: "italic",
                  }}
                  color={"red"}
                >
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </form>

            <Box sx={{ marginTop: "15px" }}>
              <NavLink
                style={{ color: "#1565c0", paddingTop: 3 }}
                to={"/signup"}
                variant="body2"
              >
                Don't have an account? Sign up
              </NavLink>
            </Box>
          </Stack>
        </Stack>
      </Stack>
      <ToastContainer />
    </>
  );
}

export default Logiin;
