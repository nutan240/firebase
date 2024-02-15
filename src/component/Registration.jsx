import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import Image from "../assets/loginimg3.jpg";

function Registration() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

 
  const usersCollection = collection(database, 'demo');

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
     
      email: "",
      password: "",
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
       
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        
       
        await addDoc(usersCollection, { firstname: values.firstname,
          lastname: values.lastname,
          
          email: values.email });

       
        toast.success("Registration successful!");
        navigate("/");
      } catch (error) {
        setErrorMsg(error.message);
        console.error(error.message);
      }
    },
  });

  return (
    <>
      <Stack
        sx={{
          backgroundImage: ` url(https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif)`,
          objectFit :'cover' ,
          position : 'center',
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
            height: 'auto',
            background: "white",
            
            borderRadius : 4
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
              lastname : '',
              email: "",
              password: "",
              phoneno : ''
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
                  label="Firstname"
                  type="text"
                  name="firstname"
                  value={formik.values.firstname}
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
                  {formik.errors.firstname &&
                    formik.touched.firstname &&
                    formik.errors.firstname}
                </Typography>
                <Field
                  as={TextField}
                  fullWidth
                  label="Lastname"
                  type="text"
                  name="lastname"
                  value={formik.values.lastname}
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
                  {formik.errors.lastname &&
                    formik.touched.lastname &&
                    formik.errors.lastname}
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
