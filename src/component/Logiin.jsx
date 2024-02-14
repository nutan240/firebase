import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "../assets/loginimg.jpg";

function Logiin() {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
   

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema : Yup.object({
        email: Yup.string().email().required("Please enter your email"),
        password: Yup.string().min(6).required("Please enter your password"),
      }),
   
    onSubmit: (values) => {
      if (!values.email || !values.password) {
        setErrorMsg('Fill in all fields'); return;
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
            height: 290,
            background: "rgb(255 255 255)",
          }}
          className="form_container"
        >
          <Typography sx={{ fontWeight: "bold", paddingBottom: '15px', color: 'rgb(37, 84, 112)' }} variant="h5">
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
