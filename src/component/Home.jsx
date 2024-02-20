import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Card } from "@mui/material";
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
          setLoading(true) 

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
        <h1>Loading...</h1>
      ) : (
        <Stack
          sx={{
            backgroundImage: ` url( ${Image} )`,
            backdropFilter: "blur(5px)",
            height: "100vh",
            overflow: "auto",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
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
                // overflowX: "auto" ,
                height :'auto' ,
                padding :'4px'
              }}
            >
              <Box sx={{overflowX: "auto" ,  width: { lg :"auto"  , sm :"100%"} ,}}>
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
                            sx={{ color: "red" }}
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
                            }}
                            onClick={() => handleEdit(values.id)}
                          />
                        </Card>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </Box>
            </Stack>
          </Box>
          <Stack
            direction={"row"}
            gap={5}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "98%",
              marginX: "auto",
            }}
          ></Stack>
        </Stack>
      )}
    </>
  );
}

export default Home;
