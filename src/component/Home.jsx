import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import Image from "../assets/login1.jpg";
function Home() {
  const [value, setValue] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, "demo"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setValue(data);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deletvalue = doc(database, "demo", id);
      await deleteDoc(deletvalue);
      setValue((prevValue) => prevValue.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
    console.log(id);
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
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              fontStyle: "italic",
              fontWeight: "bold",
              fontSize: "33px",
              width: "100%",
              marginBottom :'30px'
              , textDecoration: "underline",
            }}
          >
            USER DETAILS
          </Typography>
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
        >
          {value.map((values) => (
            <Stack sx={{ display: "flex", flexWrap: "wrap", width:{ lg :"48%" , sm : '100%' , xs :'100%'} }}>
              <Stack
                sx={{
                  border: 2,
                  borderRadius: 4,
                  padding: 3,
                  borderColor: "#476c6e",
                  boxShadow: "10",
                
                  background: "white",
                }}
                key={values.id}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontWeight: "bold",
                      fontSize: "23px",
                      textDecoration: "underline",
                      marginBottom: "4px",
                    }}
                  >
                    details
                  </Typography>
                  <Typography>
                    <Button
                      sx={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                      onClick={() => handleDelete(values.id)}
                    >
                      Delete
                    </Button>
                  </Typography>
                </Box>
                <Box sx={{ fontSize: "23px", marginTop: "10px" }}>
                  firstname :{values.firstname}
                </Box>
                <Box sx={{ fontSize: "23px" }}>
                  lastname : {values.lastname}
                </Box>
                <Box sx={{ fontSize: "23px" }}> address : {values.address}</Box>
                <Box sx={{ fontSize: "23px" }}> phoneno : {values.phoneno}</Box>
                <Box sx={{ fontSize: "23px" }}> email : {values.email}</Box>

                <Button
                  sx={{
                    fontStyle: "italic",
                    fontSize: "16px",
                    textDecoration: "underline",
                  }}
                  onClick={() => handleEdit(values.id)}
                >
                  EDIT details
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
}

export default Home;
