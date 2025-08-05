import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Logo from "../../assets/TharmaxLogo.png"

const UserLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUsername } = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();
  const APP_URL = import.meta.env.VITE_BACKEND_URL

  const onSubmit = async (data) => {
    try {

      const response = await axios.post(`${APP_URL}/user/login`, {
        email: data.email,
        password: data.password,
      }, {
        headers: { 'Content-Type': 'application/json' } // Ensure correct content type
      });

      // console.log(response.data.auth_token);


      setUsername(response.data.data.name);

      const userid = response.data.data.id;

      if (response) {
        toast({
          title: "Login Successful!",
          description: "Welcome back!",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        localStorage.setItem("token", response.data.auth_token);
        localStorage.setItem("chatLimitReached", "false");
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate(`/${userid}`);
      }
    } catch (err) {
      // console.log(err);
      toast({
        title: "Login Failed!",
        description: err.response.data.error,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }

  };


  return (
    <Box bg="#fff">
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Flex top={"20px"} left="30px" position="absolute">
          <Image boxSize={"40px"} src={Logo} />
        </Flex>
        <Flex
          maxW="400px"
          w={'100%'}
          // bg="#171923"
          color="black"
          justifyContent="center"
          alignItems="center"
          borderRadius="10px"
          flexDirection="column"
          border={"1px solid #cbcbcb"}
          boxShadow={'0 0 4px #cbcbcb94, 0 0 8px #cbcbcb3b'}
          py={'4%'}
          px={'2%'}
        >
          <Heading mb="20px" fontSize="30px">
            Login
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            {/* Email Field */}
            <FormControl isInvalid={errors.email}>

              <FormLabel fontSize={'13px'} mb={1}>Email</FormLabel>
              <Input
                fontSize={'14px'}
                type="text"
                placeholder="eg: john@example.com"
                {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" } })}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>

            {/* Password Field */}
            <FormControl isInvalid={errors.password} mt="10px">
              <FormLabel fontSize={'13px'} mb={1}>Password</FormLabel>
              <Input
                fontSize={'14px'}
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button type="submit" color={"white"} bgColor={"#ED3438"} mt={4} width="100%">
              Login
            </Button>
          </form>

          <Text
            alignSelf="flex-start"
            fontSize={'12px'}
            mt={1}
            color="gray"
            cursor="pointer"
          >
            Don&apos;t have an account <Link to={'/signup'} style={{ color: '#0082ff'}}>SignUp?</Link>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
export default UserLogin;
