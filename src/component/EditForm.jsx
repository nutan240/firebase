import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import * as Yup from "yup";

function EditForm() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
const navigate = useNavigate()
  useEffect(() => {
    const getUserData = async () => {
      try {
        const docRef = doc(database, "demo", id);
        const docSnap = await getDoc(docRef);

        console.log(docSnap , 'docSnapdocSnapdocSnap')
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

  const handleSubmit = async (values) => {
    try {
      const docRef = doc(database, "demo", id);
      await updateDoc(docRef, {
        username: values.username,
        email: values.email,
      });
      console.log("Document successfully updated!");
      navigate('/home');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <Typography variant="h5">Edit User</Typography>
      {userData && (
        <Formik
          initialValues={{
            username: userData.username,
            email: userData.email,
          }}
          validationSchema={Yup.object({
            username: Yup.string().required("Please enter your username"),
            email: Yup.string().email().required("Please enter your email"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <Box sx={{ width: "300px", margin: "20px 0" }}>
              <Field
                as={TextField}
                fullWidth
                label="Username"
                type="text"
                name="username"
              />
            </Box>
            <Box sx={{ width: "300px", margin: "20px 0" }}>
              <Field
                as={TextField}
                fullWidth
                label="Email"
                type="email"
                name="email"
              />
            </Box>
            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </Form>
        </Formik>
      )}
    </>
  );
}

export default EditForm;
