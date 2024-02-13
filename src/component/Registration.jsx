import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

function Registration() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username"),
      email: Yup.string().email().required("Please enter your email"),
      password: Yup.string().min(6).required("Please enter your password"),
    }),
    onSubmit: (values) => {
      if (!values.username || !values.email || !values.password) {
        setErrorMsg("Fill in all fields");
        return;
      }
      setErrorMsg("");

      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((res) => {
          const user = res.user;
          toast.success("Registration successful!");
          navigate("/");
          console.log(user);
          console.log(res);
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
        sx={{
          overflow: "auto",
          height: "100vh",
          width: "100%",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            width: { lg: "30%", sm: "60%", xs: "auto" },
            margin: "auto",
            boxShadow: 3,
            padding: 5,
            height: 350,
            background: "rgb(255 255 255)",
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
              username: "",
              email: "",
              password: "",
            }}
            onSubmit={formik.handleSubmit}
          >
            <Form>
              <Stack
                sx={{ width: "100%", fontSize: "19px" }}
                direction={"column"}
                spacing={1}
              >
                <Field
                  as={TextField}
                  fullWidth
                  label="Username"
                  type="text"
                  name="username"
                  value={formik.values.username}
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
                  {formik.errors.username &&
                    formik.touched.username &&
                    formik.errors.username}
                </Typography>
                <Field
                  as={TextField}
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
                <Field
                  as={TextField}
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
                  Sign Up
                </Button>
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
      </Stack>
      <ToastContainer />
    </>
  );
}

export default Registration;
