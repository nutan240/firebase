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
import { NavLink, useNavigate } from "react-router-dom";
import Image from "../assets/flower1.jpg";
import Navbar from "../component/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Home() {
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

  console.log(value, "value");

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Stack
          sx={{
            backgroundImage: ` url( ${Image} )`,
            height: "100vh",
            overflow: "auto",
            backgroundPosition: "center",
            width: "100vw",
          }}
        >
          <Navbar />
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "47px",
                width: "100%",
                marginBottom: "30px",
                textDecoration: "underline",
                color: "white",
                // height: "100vh",
              }}
            >
              EMPLOYEE DETAILS
            </Typography>

            <Stack
              sx={{
                width: { lg: "70%" },
                gap: 2,
                margin: { sm: 5, lg: "auto" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflowX: "auto",
                // height :'100%' ,
                padding: "4px",
              }}
            >
              <Box
                sx={{ overflowX: "auto", width: { lg: "100%", sm: "100%" } }}
              >
                <table>
                  <tr>
                    <th>
                      <Card
                        sx={{
                          justifyContent: "center",
                          width: 150,
                          padding: 2,
                          boxShadow: 2,
                          bgcolor: "#1b3c4b",
                          display: "flex",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        FIRSTNAME
                      </Card>
                    </th>
                    <th>
                      <Card
                        sx={{
                          width: 150,
                          padding: 2,
                          boxShadow: 2,
                          bgcolor: "#1b3c4b",
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        LASTNAME
                      </Card>
                    </th>{" "}
                    <th>
                      <Card
                        sx={{
                          width: 150,
                          padding: 2,
                          boxShadow: 2,
                          bgcolor: "#1b3c4b",
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        ADDRESS
                      </Card>
                    </th>
                    <th>
                      <Card
                        sx={{
                          width: 150,
                          padding: 2,
                          boxShadow: 2,
                          bgcolor: "#1b3c4b",
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        EMAIL ID
                      </Card>
                    </th>
                    <th>
                      <Card
                        sx={{
                          width: 150,
                          padding: 2,
                          boxShadow: 2,
                          bgcolor: "#1b3c4b",
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        PHONE NO .
                      </Card>
                    </th>
                    <th>
                      <Card
                        sx={{
                          width: "auto",
                          padding: 2,
                          boxShadow: 2,
                          bgcolor: "#1b3c4b",
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        DELETE
                      </Card>
                    </th>
                    <th>
                      <Card
                        sx={{
                          width: "auto",
                          padding: 2,
                          boxShadow: 2,
                          bgcolor: "#1b3c4b",
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        EDIT
                      </Card>
                    </th>
                  </tr>
                  <tbody>
                    {value.map((values) => (
                      <tr key={values.id}>
                        <td>
                          <Card
                            sx={{
                              width: 150,
                              padding: 2,
                              boxShadow: 2,

                              display: "flex",
                              justifyContent: "center",
                            }}
                            variant="outlined"
                          >
                            {values.firstname}
                          </Card>
                        </td>
                        <td>
                          <Card
                            sx={{
                              width: 150,
                              padding: 2,
                              boxShadow: 2,

                              display: "flex",
                              justifyContent: "center",
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                            variant="outlined"
                          >
                            {values.lastname}
                          </Card>
                        </td>
                        <td>
                          <Card
                            sx={{
                              width: 150,
                              padding: 2,
                              boxShadow: 2,

                              display: "flex",
                              justifyContent: "center",

                              flexWrap: "wrap",
                            }}
                            variant="outlined"
                          >
                            {values.address}
                          </Card>
                        </td>
                        <td>
                          <Card
                            sx={{
                              width: 150,
                              padding: 2,
                              boxShadow: 2,
                              display: "flex",

                              flexWrap: "wrap",
                              justifyContent: "center",
                            }}
                            variant="outlined"
                          >
                            {values.email}
                          </Card>
                        </td>
                        <td>
                          <Card
                            sx={{
                              width: 150,
                              padding: 2,
                              boxShadow: 2,

                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "center",
                            }}
                            variant="outlined"
                          >
                            {values.phoneno}
                          </Card>
                        </td>
                        <td>
                          <Card
                            sx={{
                              width: 80,
                              padding: 2,
                              boxShadow: 2,

                              display: "flex",
                              justifyContent: "center",
                            }}
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
                            sx={{
                              width: 80,
                              padding: 2,
                              boxShadow: 2,

                              display: "flex",
                              justifyContent: "center",
                            }}
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

                {value.map((values) => (
                  <Stack>
                    <Box sx={{ display: "flex" }}>
                      <Typography>FIRSTNAME :</Typography>
                      <Typography>{values.phoneno}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default Home;
