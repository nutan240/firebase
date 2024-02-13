import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Logiin() {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    if (!values.email || !values.password) {
      setErrorMsg('Fill in all fields');
      return;
    }
    setErrorMsg('');

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        const user = res.user;
        toast.success('Login successful!');
        navigate('/home');
        console.log(res);
      })
      .catch(err => {
        setErrorMsg(err.message);
        console.log(err.message);
      });
  };

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
            height: 250,
            background: "rgb(255 255 255)",
          }}
          className="form_container"
        >
          <Typography sx={{ fontWeight: "bold" , paddingBottom : '15px' , color: 'rgb(37, 84, 112)' }} variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Stack
                  sx={{ width: "100%", fontSize: "19px" }}
                  direction={"column"}
                  spacing={1}
                >
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />

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
              </Form>
            )}
          </Formik>
          <Box sx={{ marginTop: '15px' }}>
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
      <ToastContainer />
    </>
  );
}

export default Logiin;
