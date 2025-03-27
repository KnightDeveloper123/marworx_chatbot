import { Box, Button, FormControl, FormLabel, Input, TableContainer, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Login() {


  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {

    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/login`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
      })
    })

    const result = await response.json();
    console.log(result);
    
    if (result.success) {
      setUserData({
        email: "",
        password: ""
      })
    }

  }

  return (

    <Box width={'100%'} height={'100vh'} display={'flex'} alignItems={'center'}
      justifyContent={'center'} >
      <Box as='form' onSubmit={handleSubmit} width={{ base: '90%', sm: '60%', md: "45%", lg: '40%', xl: '30%' }} p={'40px'} boxShadow={'2xl'}
        bgColor={'white'} display={'flex'} gap={'30px'} flexDirection={'column'} borderRadius={'10px'}>
        <Text textAlign={'center'} fontSize={'30px'} fontWeight={'semibold'} >Login</Text>
        <FormControl>
          <FormLabel >Email</FormLabel>
          <Input type='email' name='email' value={userData.email} onChange={handleChange} placeholder='Enter your email'></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type='password' name='password' value={userData.password} onChange={handleChange} placeholder='Enter your password'></Input>
        </FormControl>

        <Button type='submit' width={'full'} mt={'20px'} bgColor={'blue.500'} textColor={'white'}>Log In</Button>

      </Box>
    </Box>
  )
}
