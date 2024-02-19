import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, database } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import Image from "../assets/flower1.jpg";
import Navbar from '../component/Navbar'
function Home() {
 
  const [value, setValue] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const currentUser = auth.currentUser;
        const userId = currentUser.uid;
        const querySnapshot = await getDocs(collection(database, `demo/${userId}/posts`));
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


  console.log(value , 'value')

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
       <Stack
  sx={{
    backgroundImage: ` url( ${Image} )`,
    backdropFilter : 'blur(5px)' ,
    height: "100vh",
    overflow: "auto",
    backgroundSize: "cover",
          backgroundPosition: "center",
    width: "100%",
  }}
>

<Navbar/>
  <Box>
 
  
    <Typography
      sx={{
        textAlign: "center",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: "47px",
        width: "100%",
        marginBottom :'30px'
        , textDecoration: "underline",
        color :'white'
      }}
    >
      EMPLOYEE DETAILS
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
            borderColor: "#a3aba2",
            boxShadow: "10",
          
            background: "#a3aba2",
            // color:'white'
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
             EMPLOYEE
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
            Firstname :{values.firstname}
          </Box>
          <Box sx={{ fontSize: "23px" }}>
            Lastname : {values.lastname}
          </Box>
          <Box sx={{ fontSize: "23px" }}> Address : {values.address}</Box>
          <Box sx={{ fontSize: "23px" }}> phoneno : {values.phoneno}</Box>
          <Box sx={{ fontSize: "23px" }}> email : {values.email}</Box>

          <Button
            sx={{
              fontStyle: "italic",
              fontSize: "16px",
              textDecoration: "underline",
              fontWeight:'bold',
              // color:'white'
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