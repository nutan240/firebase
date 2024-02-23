import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../firebase";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "../assets/editimg.jpg";
import { makeStyles } from "mui-styles-hook";
import CustomButton from "./CustomButton";

const useStyles = makeStyles(() => ({
  container: {
    backgroundImage: `url(${Image})`,
    height: "100vh",
    overflow: "auto",
    width: "100%",
  },
  container2: {
    width: "50%",
    margin: "auto",
    border: 1,
    padding: 4,
    borderColor: "gray",
    borderRadius: 3,
    boxShadow: 10,
    background: "white",
  },
  typography: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: "35px",
    textAlign: "center",
    textDecoration: "underline",
  },
  box: {
    margin: "20px 0",
  },
  button: {
    position: "relative",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  typographypara: {
    fontSize: "13px",
    fontStyle: "italic",
  },
}));

function EditForm() {
  const classes = useStyles();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const addressOptions = ["Albania", "India", "Iran", "Iraq"];

  return (
    <>
      <Stack sx={classes.container}>
        <Stack sx={classes.container2}>
          <Typography sx={classes.typography} variant="h5">
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
                phoneno: Yup.number()
                  .typeError("Phone number must be a number")
                  .positive("Phone number can't start with a minus")
                  .integer("Phone number can't include a decimal point")
                  .test(
                    "len",
                    "Phone number must be exactly 10 digits",
                    (val) => {
                      if (!val) return false;
                      return val.toString().length === 10;
                    }
                  )
                  .required("A phone number is required"),
              })}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched, values, handleChange }) => (
                <Form>
                  <Box sx={classes.box}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="firstname"
                      type="text"
                      name="firstname"
                    />
                    <Typography
                      variant="p"
                      sx={classes.typographypara}
                      color={"red"}
                    >
                      {errors.firstname &&
                        touched.firstname &&
                        errors.firstname}
                    </Typography>
                  </Box>
                  <Box sx={classes.box}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="lastname"
                      type="text"
                      name="lastname"
                    />
                    <Typography
                      variant="p"
                      sx={classes.typographypara}
                      color={"red"}
                    >
                      {errors.lastname && touched.lastname && errors.lastname}
                    </Typography>
                  </Box>
                  <Box sx={classes.box}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                    />
                    <Typography
                      variant="p"
                      sx={classes.typographypara}
                      color={"red"}
                    >
                      {errors.email && touched.email && errors.email}
                    </Typography>
                  </Box>
                  <Box sx={classes.box}>
                    <FormControl fullWidth>
                      <InputLabel id="address-label">Address</InputLabel>
                      <Select
                        labelId="address-label"
                        id="address"
                        name="address"
                        value={userData.address && values.address}
                        onChange={handleChange}
                      >
                        {addressOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography
                      variant="p"
                      sx={classes.typographypara}
                      color={"red"}
                    >
                      {errors.address && touched.address && errors.address}
                    </Typography>
                  </Box>
                  <Box sx={classes.box}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="phoneno"
                      type="text"
                      name="phoneno"
                    />
                    <Typography
                      variant="p"
                      sx={classes.typographypara}
                      color={"red"}
                    >
                      {errors.phoneno && touched.phoneno && errors.phoneno}
                    </Typography>
                  </Box>
                  <Box className={classes.button}>
                    {!loading && (
                      <CustomButton
                        buttontype={"submit"}
                        title={"  Save Changes "}
                        disabled={isSubmitting || loading}
                      />
                    )}
                    {loading && (
                      <CircularProgress
                        sx={{ width: "50px" }}
                        size={24}
                        className={classes.loader}
                      />
                    )}
                    <CustomButton handelclick={handelclick} title={"Cancel "} />
                  </Box>
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
