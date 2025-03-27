import {
  Box, Button, Flex, FormControl, FormLabel, Input, Text, FormErrorMessage, Link
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import { encrypt } from "../utils/security"

export default function Login() {
  const navigate = useNavigate();
  const { showAlert } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/employee/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (result?.success) {
        const encryptedData = await encrypt(result.data);
        localStorage.setItem("token", result.auth_token);
        localStorage.setItem("user", encryptedData);
        showAlert(result.success, "success");
        navigate("/admin/dashboard");
      } else {
        showAlert(result.error || "Login failed", "error");
      }
    } catch (error) {
      console.error("Login Error:", error);
      showAlert("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <Box width="100%" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        width={{ base: "90%", sm: "60%", md: "45%", lg: "40%", xl: "30%" }}
        p="40px"
        boxShadow="2xl"
        bgColor="white"
        gap="20px"
        flexDirection="column"
        borderRadius="10px"
      >
        <Text textAlign="center" fontSize="30px" fontWeight="semibold">
          Login
        </Text>

        {/* Email Field */}
        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        {/* Password Field */}
        <FormControl isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        {/* Forgot Password & Submit Button */}
        <Flex mt={2} gap={2} justifyContent="space-between" flexDir={'column'} alignItems='center'>
          <Link>
            <Text fontSize="12px">Forgot Password?</Text>
          </Link>
          <Button
            type="submit"
            width="full"
            bgColor="blue.500"
            textColor="white"
            isLoading={isSubmitting} // Shows loading spinner
          >
            Log In
          </Button>
        </Flex>
      </Flex>
    </Box >
  );
}
