import {
    Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const APP_URL = import.meta.env.VITE_BACKEND_URL

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const toast = useToast();
    const navigate = useNavigate();
    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            const { confirmPassword, ...payload } = data;

            const response = await axios.post(`${APP_URL}/user/signUp`, payload);
            // console.log(response);


            if (response.status === 200) {
                toast({
                    title: "User added successfully",
                    description: response.data.success,
                    status: "success",
                    duration: 5000,
                    position: "top",
                    isClosable: true,
                });
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            toast({
                title: "Something went wrong",
                description: err.response.data.error,
                status: "error",
                duration: 5000,
                position: "top",
                isClosable: true,
            });
        }
    };

    return (
        <Box h="100vh" bg="#1A202C">
            <Flex h="100vh" justifyContent="center" alignItems="center">
                <Flex top={"40px"} left="40px" position="absolute">
                    <Button colorScheme='blue' onClick={() => navigate("/")}><ArrowBackIcon fontSize={"20px"} /></Button>
                </Flex>
                <Flex
                    h="600px" w="500px" bg="#171923" color="white"
                    justifyContent="center" alignItems="center"
                    borderRadius="20px" flexDirection="column"
                >
                    <Heading mb="20px" fontSize="30px">Sign Up</Heading>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "60%" }}>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                placeholder="Username"
                                {...register("name", { required: "Username is required" })}
                            />
                            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl mt="4" isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email format"
                                    }
                                })}
                            />
                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl mt="4" isInvalid={errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password" placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                            />
                            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl mt="4" isInvalid={errors.confirmPassword}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                type="password" placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) => value === password || "Passwords do not match"
                                })}
                            />
                            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                        </FormControl>

                        <Button type="submit" colorScheme="blue" mt="6" width="100%">
                            Sign Up
                        </Button>
                    </form>

                    <Text mt="4" color="gray" cursor="pointer" onClick={() => navigate("/login")}>
                        Already have an account? Log in
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default SignUp;
