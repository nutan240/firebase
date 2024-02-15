import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Box, Stack, Typography } from '@mui/material';

function Profile() {

  const [userProfileInfo, setUserProfileInfo] = useState("");

 console.log(userProfileInfo ,'userProfileInfo')
 useEffect(() => {
  const getUserInfo = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const q = query(collection(database, 'demo'), where('email', '==', userInfo.email));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserProfileInfo(userData[0]);
    } catch (error) {
      console.error('Error getting user information: ', error);
    }
  };

  getUserInfo();
}, []);

  const userInfo = JSON.parse(localStorage.getItem('user'));
console.log( userInfo , 'userInfouserInfo')
  return (
    <>
      
      {userProfileInfo && (
        <Stack>
          <Box>ID: {userProfileInfo.id}</Box>
          <Box>First Name: {userProfileInfo.firstname}</Box>
          <Box>Last Name: {userProfileInfo.lastname}</Box>
          <Box>Email: {userProfileInfo.email}</Box>
          
        </Stack>
      )}
    </>
  );
}

export default Profile;
