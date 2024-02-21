import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import Image1 from "../assets/loginimg.jpg";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Buttoncomponent from "./Buttoncomponent";
import Inputcomp from "./Inputcomp";

function Registration() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const usersCollection = collection(database, "posts");

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please enter your firstname"),
      lastname: Yup.string().required("Please enter your lastname"),
      email: Yup.string().email().required("Please enter your email"),
      password: Yup.string().min(6).required("Please enter your password"),
    }),

    onSubmit: async (values) => {
      setErrorMsg("");

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        await addDoc(usersCollection, {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
        });

        toast.success("Registration successful!");
        navigate("/");

        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        setErrorMsg(error.message);
        console.error("Error during registration:", error);
        toast.error("Registration failed. Please try again.");
      }
    },
  });

  return (
    <>
      <Stack
        sx={
          {
            // height: "100vh",
            // overflow: "auto",
          }
        }
      >
        <Grid
          sx={{
            display: "flex",
            width: "100%",
            overflow: "auto",
            height: { lg: "100vh", sm: "auto", sx: "auto" },
            // height :'100vh'
          }}
        >
          <Grid
            sx={{
              background: "#5e879d",
              width: { lg: "50%", sm: "100%", xs: "100%" },
              // height: "100vh",
              // overflow: "auto",
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                display: "flex ",
                float: { lg: "right ", sm: "none" },
                width: { lg: "50%", sm: "60%", xs: "auto" },
                marginTop: "100px",
                marginX: { lg: "0px ", sm: " auto" },
                boxShadow: 3,
                padding: 5,
                background: "white",
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 8,
                height: "550px",
              }}
              className="form_container"
            >
              <Typography
                sx={{ fontWeight: "bold", paddingBottom: "15px" }}
                variant="h5"
              >
                Sign Up
              </Typography>

              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: "",
                  phoneno: "",
                }}
                onSubmit={formik.handleSubmit}
              >
                <Form>
                  <Stack
                    sx={{ width: "100%", fontSize: "19px" }}
                    direction={"column"}
                    spacing={1}
                  >
                    <Inputcomp
                      label={"Firstname"}
                      type={"text"}
                      inputname={"firstname"}
                      inputvalue={formik.values.firstname}
                      handelchange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                    />
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "13px",
                        fontStyle: "italic",
                      }}
                      color={"red"}
                    >
                      {formik.errors.firstname &&
                        formik.touched.firstname &&
                        formik.errors.firstname}
                    </Typography>
                    {/* <Field
                      as={TextField}
                      fullWidth
                      label="Lastname"
                      type="text"
                      name="lastname"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    /> */}
                    <Inputcomp
                      label={"Lastname"}
                      type={"text"}
                      inputname={"lastname"}
                      inputvalue={formik.values.lastname}
                      handelchange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                    />
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "13px",
                        fontStyle: "italic",
                      }}
                      color={"red"}
                    >
                      {formik.errors.lastname &&
                        formik.touched.lastname &&
                        formik.errors.lastname}
                    </Typography>
                    {/* <Field
                      as={TextField}
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    /> */}

                    <Inputcomp
                      label={"Email"}
                      type={"email"}
                      inputname={"email"}
                      inputvalue={formik.values.email}
                      handelchange={formik.handleChange}
                      handleBlur={formik.handleBlur}
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

                    <Inputcomp
                      label={"Password"}
                      type={formik.values.showPassword ? "text" : "password"}
                      inputname={"password"}
                      inputvalue={formik.values.password}
                      handelchange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                formik.setValues({
                                  ...formik.values,
                                  showPassword: !formik.values.showPassword,
                                })
                              }
                              edge="end"
                            >
                              {formik.values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
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

                    <Buttoncomponent buttontype={"submit"} title={"sign up "} />
                  </Stack>
                </Form>
              </Formik>

              <Box sx={{ paddingTop: 3 }}>
                <NavLink
                  style={{ color: "#1565c0", paddingTop: 3 }}
                  to={"/"}
                  variant="body2"
                >
                  Already have an account? Sign in
                </NavLink>
              </Box>
            </Stack>
          </Grid>
          <Grid
            sx={{
              background: "#303f5ea3",
              width: "50%",
              display: { lg: "block", sm: "none", xs: "none" },
              // height :'100vh'
              // height:'550px'
            }}
          >
            <Stack
              sx={{
                backgroundImage: ` url( ${Image1} )`,
                objectFit: "cover",
                position: "center",
                overflow: "auto",
                height: "550px",

                width: { lg: "55%", sm: "60%", xs: "auto" },
                marginTop: "100px",
                borderTopRightRadius: 9,
                borderBottomRightRadius: 9,
              }}
            ></Stack>
          </Grid>
        </Grid>
      </Stack>
      <ToastContainer />
    </>
  );
}

export default Registration;
