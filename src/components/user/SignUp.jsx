import {
    Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, Text, useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Logo from "../../assets/TharmaxLogo.png"

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
        <Box h="100vh">
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
                    <Heading mb="20px" fontSize="30px">Sign Up</Heading>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel fontSize={'13px'} mb={1}>Name</FormLabel>
                            <Input
                                fontSize={'14px'}
                                placeholder="eg: John Doe"
                                {...register("name", { required: "Username is required" })}
                            />
                            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl mt="10px" isInvalid={errors.email}>
                            <FormLabel fontSize={'13px'} mb={1}>Email</FormLabel>
                            <Input
                                fontSize={'14px'}
                                placeholder="eg: john@example.com"
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

                        <FormControl mt="10px" isInvalid={errors.password}>
                            <FormLabel fontSize={'13px'} mb={1}>Password</FormLabel>
                            <Input
                                fontSize={'14px'}
                                type="password" placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                            />
                            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl mt="10px" isInvalid={errors.confirmPassword}>
                            <FormLabel fontSize={'13px'} mb={1}>Confirm Password</FormLabel>
                            <Input
                                fontSize={'14px'}
                                type="password" placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) => value === password || "Passwords do not match"
                                })}
                            />
                            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                        </FormControl>

                        <Button type="submit" color={"white"} bgColor={"#ED3438"} mt={4} width="100%">
                            Sign Up
                        </Button>
                    </form>

                    <Text
                        alignSelf="flex-start"
                        fontSize={'12px'}
                        mt={1}
                        color="gray"
                        cursor="pointer"
                    >
                        Already have an account <Link to={'/'} style={{ color: '#0082ff' }}>Login?</Link>
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default SignUp;
