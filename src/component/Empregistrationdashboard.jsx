import React, { useState, useEffect } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, database } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Image from "../assets/loginimg3.jpg";
import Buttoncomponent from "./Buttoncomponent";
import Inputcomp from "./Inputcomp";

function Empregistrationdashboard() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [userPostsCollection, setUserPostsCollection] = useState(null);

  useEffect(() => {
    const fetchUserPostsCollection = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userId = currentUser.uid;
          const userPostsCol = collection(database, `demo/${userId}/posts`);
          setUserPostsCollection(userPostsCol);
        } else {
          console.error("No current user found.");
        }
      } catch (error) {
        console.error("Error fetching user posts collection:", error);
      }
    };

    fetchUserPostsCollection();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      phoneno: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(2)
        .max(15)
        .required("Please enter your firstname"),
      lastname: Yup.string()
        .min(2)
        .max(15)
        .required("Please enter your lastname"),
      address: Yup.string()
        .min(2)
        .max(20)
        .required("Please enter your address"),
      email: Yup.string().email().required("Please enter your email"),
      phoneno: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Please enter your phone number"),
    }),
    onSubmit: async (values) => {
      setErrorMsg("");

      try {
        if (userPostsCollection) {
          await addDoc(userPostsCollection, {
            firstname: values.firstname,
            lastname: values.lastname,
            address: values.address,
            phoneno: values.phoneno,
            email: values.email,
          });

          toast.success("Registration successful!");
          navigate("/home");
        } else {
          console.error("User posts collection not initialized");
        }
      } catch (error) {
        setErrorMsg(error.message);
        console.error(error.message);
      }
    },
  });
  const handelclick = () => {
    navigate("/home");
  };

  return (
    <>
      <Stack
        sx={{
          backgroundImage: `url(${Image})`,
          objectFit: "cover",
          position: "center",
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
            height: "auto",
            background: "white",
            borderRadius: 4,
          }}
          className="form_container"
        >
          <Typography
            sx={{ fontWeight: "bold", paddingBottom: "15px" }}
            variant="h5"
          >
            Fill Details
          </Typography>

          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              phoneno: "",
              address: "",
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
                  handleChange={formik.handleChange}
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

                <Inputcomp
                  label={"Lastname"}
                  type={"text"}
                  inputname={"lastname"}
                  inputvalue={formik.values.lastname}
                  handleChange={formik.handleChange}
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
                <Inputcomp
                  label={"Email"}
                  type={"email"}
                  inputname={"email"}
                  inputvalue={formik.values.email}
                  handleChange={formik.handleChange}
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
                  label={"Address"}
                  type={"text"}
                  inputname={"address"}
                  inputvalue={formik.values.address}
                  handleChange={formik.handleChange}
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
                  {formik.errors.address &&
                    formik.touched.address &&
                    formik.errors.address}
                </Typography>
                <Inputcomp
                  label={"Phone No."}
                  type={"text"}
                  inputname={"phoneno"}
                  inputvalue={formik.values.phoneno}
                  handleChange={formik.handleChange}
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
                  {formik.errors.phoneno &&
                    formik.touched.phoneno &&
                    formik.errors.phoneno}
                </Typography>
                <Buttoncomponent
                  buttontype={"submit"}
                  title={"Add Employee "}
                />
                <Buttoncomponent handelclick={handelclick} title={"Cancel "} />
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
      <ToastContainer />
    </>
  );
}

export default Empregistrationdashboard;
