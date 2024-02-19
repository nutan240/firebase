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

function Registration() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

 
  const usersCollection = collection(database, 'posts');

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
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
    
        await addDoc(usersCollection, { 
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email 
        });
    
        localStorage.setItem('user', JSON.stringify(user)); 
        toast.success("Registration successful!");
        navigate("/");
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
        // sx={{
        //   backgroundImage: ` url(https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif)`,
        //   objectFit :'cover' ,
        //   position : 'center',
        //   overflow: "auto",
        //   height: "100vh",
        //   width: "100%",
        // }}
      >
      <Grid sx={{display :'grid' ,    gridTemplateColumns: 'repeat(2, 1fr)',
      width : '100%' ,
      height: "100vh",
      // paddingTop : "40px"
      }}>
        <Grid sx={{ background: "#5e879d",}}>


        <Stack
          direction={"column"}
          sx={{
            display :'grid ' ,
            // gridTemplateColumns: '1',
            float :'right ' ,
            width: { lg: "50%", sm: "60%", xs: "auto" },
            // margin: "auto",
            marginTop :'100px' ,
            boxShadow: 3,
            padding: 5,
            height: 'auto',
            background: "white",
            borderTopLeftRadius: 6,
              borderBottomLeftRadius: 8,
            // borderRadius : 4
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
                    background :' rgb(37, 84, 112)' ,
                    // background:
                    //   "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
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

        </Grid>
        <Grid sx={{background :'#303f5ea3'}}>
        <Stack
        sx={{
          backgroundImage: ` url( ${Image1} )`,
          objectFit :'cover' ,
          position : 'center',
          overflow: "auto",
          height: "493.3px",
          width: { lg: "55%", sm: "60%", xs: "auto" },
          marginTop :'100px' ,
          
          borderTopRightRadius: 9,
              borderBottomRightRadius: 9,

        }}
      >
      </Stack>
        
        </Grid>
      </Grid>
        {/* <Stack
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
        </Stack> */}
      </Stack>
      <ToastContainer />
    </>
  );
}

export default Registration;
