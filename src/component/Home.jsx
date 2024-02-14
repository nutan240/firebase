import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [value, setValue] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'demo'));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setValue(data);
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deletvalue = doc(database, 'demo', id);
      await deleteDoc(deletvalue);
      setValue((prevValue) => prevValue.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
    console.log(id)
  }

  return (
    <>
      {value.map((values) => (
        <Stack key={values.id}>
          <Box>{values.firstname}</Box>
          <Box>{values.lastname}</Box>
          <Box>{values.email}</Box>
          <Button onClick={() => handleDelete(values.id)}>Delete</Button>
          <Button onClick={() => handleEdit(values.id)}>EDIT</Button>
        </Stack>
      ))}
    </>
  );
}

export default Home;
