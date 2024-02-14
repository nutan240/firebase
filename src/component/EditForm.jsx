import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        address: values.address,
        phoneno : values.phoneno
      });
      console.log("Document successfully updated!");
      navigate('/home');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
    <Stack>
      <Typography variant="h5">Edit User</Typography>
      {userData && (
        <Formik
          initialValues={{
            firstname : userData.firstname ,
            address :  userData.address  ,
            phoneno :  userData.phoneno  ,
            lastname : userData.lastname ,
            email: userData.email,
          }}
          validationSchema={Yup.object({
            firstname: Yup.string().required("Please enter your username"),
            lastname: Yup.string().required("Please enter your username"),
            email: Yup.string().email().required("Please enter your email"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <Box sx={{  margin: "20px 0" }}>
              <Field
                as={TextField}
                fullWidth
                label="firstname"
                type="text"
                name="firstname"
              />
            </Box>
            <Box sx={{  margin: "20px 0" }}>
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
            </Box> <Box sx={{  margin: "20px 0" }}>
              <Field
                as={TextField}
                fullWidth
                label="Addres"
                type="text"
                name="address"
              />
            </Box> <Box sx={{  margin: "20px 0" }}>
              <Field
                as={TextField}
                fullWidth
                label="phoneno"
                type="text"
                name="phoneno"
              />
            </Box>

            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </Form>
        </Formik>
      )}
      </Stack>
    </>
  );
}

export default EditForm;
