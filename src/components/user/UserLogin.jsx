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
import { useNavigate } from "react-router-dom";
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
    <Box h="100vh" bg="#fff">
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Flex top={"40px"} left="40px" position="absolute">
          <Image ml={"50px"} boxSize={"40px"} src={Logo} />
        </Flex>
        <Flex
          h="500px"
          w="500px"
          // bg="#171923"
          color="black"
          justifyContent="center"
          alignItems="center"
          borderRadius="20px"
          flexDirection="column"
          border={"2px solid grey"}
        >
          <Heading mb="20px" fontSize="30px">
            Login
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "60%" }}>
            {/* Email Field */}
            <FormControl isInvalid={errors.email}>

              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" } })}
              />
              {errors.email ? (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Enter the email.</FormHelperText>
              )}
            </FormControl>

            {/* Password Field */}
            <FormControl isInvalid={errors.password} mt="20px">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password ? (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Enter the Password.</FormHelperText>
              )}
            </FormControl>

            <Button type="submit" color={"white"} bgColor={"#ED3438"} mt="40px" width="100%">
              Login
            </Button>
          </form>

          <Text
            alignSelf="flex-start"
            ml="20px"
            mt="20px"
            color="gray"
            cursor="pointer"
            onClick={() => navigate("/signup")}
          >
            Don&apos;t have an account?
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
export default UserLogin;
