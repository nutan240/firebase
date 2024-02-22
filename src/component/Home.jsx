import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Card,
  CircularProgress,
} from "@mui/material";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import Image from "../assets/flower1.jpg";
import Navbar from "../component/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "mui-styles-hook";



const useStyles = makeStyles(() => ({

  box_loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  stack_container: {
    backgroundImage: ` url( ${Image} )`,
    height: "100vh",
    overflow: "auto",
    backgroundPosition: "center",
    width: "100vw",
  },
  typography: {
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: {lg :"47px" , sm :'30px' , xs :'27px'},
    width: "100%",
    marginBottom: "30px",
    textDecoration: "underline",
    color: "white",
  },
  stack_container1: {
    width: { lg: "70%" },
    gap: 2,
    margin: { sm: 5, lg: "auto" ,xs :4 },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "auto",
    padding: "4px",
  },
  box_container: {
    overflowX: "auto",
    width: { lg: "100%", sm: "100%" },
  },
  card_container: {
    justifyContent: "center",
    width: 150,
    padding: 2,
    boxShadow: 2,
    bgcolor: "#1b3c4b",
    display: "flex",
    
    color: "white",

  },
  card_container1: {
    width: 150,
    padding: 2,
    boxShadow: 2,
    display: "flex",
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
  },

}));

function Home() {
  const classes = useStyles();
  const [value, setValue] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          setLoading(true);

          const querySnapshot = await getDocs(
            collection(database, `demo/${userId}/posts`)
          );
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setValue(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error getting documents: ", error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;
      const deletvalue = doc(database, `demo/${userId}/posts`, id);
      await deleteDoc(deletvalue);
      setValue((prevValue) => prevValue.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      {loading ? (
        <Box sx={classes.box_loader}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack sx={classes.stack_container}>
          <Navbar />
          <Box>
            <Typography sx={classes.typography}>EMPLOYEE DETAILS</Typography>

            <Stack sx={classes.stack_container1}>
              <Box sx={classes.box_container}>
                {value.length > 0 && (
                  <table>
                    <tr>
                      <th>
                        <Card sx={classes.card_container} variant="outlined">
                          FIRSTNAME
                        </Card>
                      </th>
                      <th>
                        <Card sx={classes.card_container} variant="outlined">
                          LASTNAME
                        </Card>
                      </th>{" "}
                      <th>
                        <Card sx={classes.card_container} variant="outlined">
                          ADDRESS
                        </Card>
                      </th>
                      <th>
                        <Card sx={classes.card_container} variant="outlined">
                          EMAIL ID
                        </Card>
                      </th>
                      <th>
                        <Card sx={classes.card_container} variant="outlined">
                          PHONE NO .
                        </Card>
                      </th>
                      <th>
                        <Card sx={classes.card_container} variant="outlined">
                          DELETE
                        </Card>
                      </th>
                      <th>
                        <Card sx={classes.card_container} variant="outlined">
                          EDIT
                        </Card>
                      </th>
                    </tr>
                    <tbody>
                      {value.map((values) => (
                        <tr key={values.id}>
                          <td>
                            <Card
                              sx={classes.card_container1}
                              variant="outlined"
                            >
                              {values.firstname}
                            </Card>
                          </td>
                          <td>
                            <Card
                              sx={classes.card_container1}
                              variant="outlined"
                            >
                              {values.lastname}
                            </Card>
                          </td>
                          <td>
                            <Card
                              sx={classes.card_container1}
                              variant="outlined"
                            >
                              {values.address}
                            </Card>
                          </td>
                          <td>
                            <Card
                              sx={classes.card_container1}
                              variant="outlined"
                            >
                              {values.email}
                            </Card>
                          </td>
                          <td>
                            <Card
                              sx={classes.card_container1}
                              variant="outlined"
                            >
                              {values.phoneno}
                            </Card>
                          </td>
                          <td>
                            <Card
                              sx={classes.card_container1}
                              variant="outlined"
                            >
                              <DeleteIcon
                                sx={{
                                  color: "red",
                                  padding: "0px",
                                  margin: "0px",
                                  fontSize: "20px",
                                }}
                                onClick={() => handleDelete(values.id)}
                              />
                            </Card>
                          </td>

                          <td>
                            <Card
                              sx={classes.card_container1}
                              variant="outlined"
                            >
                              <EditIcon
                                sx={{
                                  color: "blue",
                                  fontSize: "20px",
                                }}
                                onClick={() => handleEdit(values.id)}
                              />
                            </Card>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </Box>
            </Stack>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default Home;
