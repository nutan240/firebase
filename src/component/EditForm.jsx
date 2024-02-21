import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../firebase";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "../assets/editimg.jpg";
import Buttoncomponent from "./Buttoncomponent";
import Inputcomp from "./Inputcomp";

function EditForm() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        const userId = currentUser.uid;
        const docRef = doc(database, `demo/${userId}/posts`, id);
        const docSnap = await getDoc(docRef);

        console.log(docSnap, "docSnapdocSnapdocSnap");
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    getUserData();
  }, [id]);

  const handelclick = () => {
    navigate("/home");
  };

  const handleSubmit = async (values) => {
    if (
      !values.firstname ||
      !values.lastname ||
      !values.email ||
      !values.address ||
      !values.phoneno
    ) {
      toast.error("Please fill in all the required fields");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;
      const docRef = doc(database, `demo/${userId}/posts`, id);

      await updateDoc(docRef, {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        address: values.address,
        phoneno: values.phoneno,
      });

      toast.success("Document successfully updated!");
      navigate("/home");
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Error updating document: " + error.message);
    }
  };

  return (
    <>
      <Stack
        sx={{
          backgroundImage: ` url( ${Image} )`,
          height: "100vh",
          overflow: "auto",

          width: "100%",
        }}
      >
        <Stack
          sx={{
            width: "50%",
            margin: "auto",
            border: 1,
            padding: 4,
            borderColor: "gray",
            borderRadius: 3,
            boxShadow: 10,
            background: "white",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: "35px",
              textAlign: "center",
              textDecoration: "underline",
            }}
            variant="h5"
          >
            Edit User
          </Typography>
          {userData && (
            <Formik
              initialValues={{
                firstname: userData.firstname,
                address: userData.address,
                phoneno: userData.phoneno,
                lastname: userData.lastname,
                email: userData.email,
              }}
              validationSchema={Yup.object({
                firstname: Yup.string()
                  .max(15)
                  .required("Please enter your username"),
                lastname: Yup.string()
                  .max(15)
                  .required("Please enter your username"),

                address: Yup.string()
                  .min(2)
                  .max(20)
                  .required("Please enter your address"),
                email: Yup.string().email().required("Please enter your email"),
                phoneno: Yup.string()
                  .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
                  .required("Please enter your phone number"),
              })}
              onSubmit={handleSubmit}
            >
              {({ handleChange }) => (
                <Form>
                  <Box sx={{ margin: "20px 0" }}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="firstname"
                      type="text"
                      name="firstname"
                    />
                  </Box>
                  <Box sx={{ margin: "20px 0" }}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="lastname"
                      type="text"
                      name="lastname"
                    />
                  </Box>
                  <Box sx={{ margin: "20px 0" }}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                    />
                  </Box>{" "}
                  <Box sx={{ margin: "20px 0" }}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Addres"
                      type="text"
                      name="address"
                    />
                  </Box>{" "}
                  <Box sx={{ margin: "20px 0" }}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="phoneno"
                      type="text"
                      name="phoneno"
                    />
                  </Box>
                  <Buttoncomponent
                    buttontype={"submit"}
                    title={"  Save Changes "}
                  />
                  <Buttoncomponent
                    handelclick={handelclick}
                    title={"Cancel "}
                  />
                </Form>
              )}
            </Formik>
          )}
          <ToastContainer />
        </Stack>
      </Stack>
    </>
  );
}

export default EditForm;
