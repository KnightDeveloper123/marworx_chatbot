import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  FormErrorMessage,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import { encrypt } from "../../utils/security";

export default function Login() {
  const navigate = useNavigate();
  const { showAlert } = useContext(AppContext);
  const [registrationPage, setRegistrationPage] = useState(false);
  const [loginPage, setLoginPage] = useState(true);
  const [forgotPasswordPage, setForgotPasswordPage] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const registerForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const forgotPasswordForm = useForm({
    defaultValues: {
      email: "",
    },
  });


  const handleRegister = async (values) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/signUp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(setOtpEmail(values.email)),
        }
      );
      const result = await response.json();
      if (result?.success) {
        showAlert("Registration successful", "success");
        setRegistrationPage(false);
        setLoginPage(true);
      } else {
        showAlert(result.error || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      showAlert("Something went wrong. Please try again.", "error");
    }
  };

  const handleLogin = async (values) => {
    // console.log(values)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const result = await response.json();
      if (result?.step === "otp-verification") {
        showAlert("OTP sent to your email", "info");
        setOtpEmail(values.email);
        setShowOtp(true); // switch to OTP input screen
      } else if (result?.success) {
        const encryptedData = await encrypt(result.data);
        localStorage.setItem("token", result.auth_token);
        localStorage.setItem("user", encryptedData);
        showAlert(result.success, "success");
        navigate("/home/dashboard");
      } else {

        showAlert(result.error || "Login failed", "error");
      }
    } catch (error) {
      console.error("Login Error:", error);
      showAlert("Something went wrong. Please try again.", "error");
    }
  };

  const handleOtpVerify = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: otpEmail, otp }),
        }
      );

      const result = await response.json();

      if (result?.success) {
        if(loginPage){
          const encryptedData = await encrypt(result.data);
          localStorage.setItem("token", result.auth_token);
          localStorage.setItem("user", encryptedData);
          showAlert(result.success, "success");
          navigate("/home/dashboard");
        }else{
          setLoginPage(true);
          setRegistrationPage(false);
          setForgotPasswordPage(false);
          setShowOtp(false);
        }
       
      } else {
        showAlert(result.error || "OTP verification failed", "error");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      showAlert("Something went wrong. Please try again.", "error");
    }
  };

  const handleForgotPassword = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/changePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      const result = await response.json();
      if (result?.step === "otp-verification") {
        showAlert("OTP sent to your email", "info");
        setOtpEmail(values.email);
        setShowOtp(true);
      } else {
        showAlert(result.error || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      showAlert("Something went wrong. Please try again.", "error");
    }
  };


  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* login page */}
      {loginPage && (
        <Flex
          as="form"
          onSubmit={loginForm.handleSubmit(handleLogin)}
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
          <FormControl isInvalid={loginForm.formState.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email address"
              {...loginForm.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
            <FormErrorMessage>
              {loginForm.formState.errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          {/* Password Field */}
          <FormControl isInvalid={loginForm.formState.errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...loginForm.register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <FormErrorMessage>
              {loginForm.formState.errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          {/* Forgot Password & Submit Button */}
          <Flex
            mt={2}
            gap={2}
            justifyContent="space-between"
            flexDir={"column"}
            alignItems="center"
          >
            <Button
              type="submit"
              width="full"
              bgColor="blue.500"
              textColor="white"
              isLoading={loginForm.formState.isSubmitting}
            >
              Log In
            </Button>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text
              fontSize="12px"
              _hover={{ textDecoration: "underline" }}
              onClick={() => {
                setRegistrationPage(true), setLoginPage(false);
              }}
            >
              register here
            </Text>
            <Text fontSize="12px" _hover={{ textDecoration: "underline" }}
              onClick={() => {
                setForgotPasswordPage(true), setLoginPage(false);
              }}>
              Forgot Password?
            </Text>
          </Flex>
        </Flex>
      )}
      <Modal isOpen={showOtp} onClose={() => setShowOtp(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="14px">
              We've sent a 6-digit OTP to <b>{otpEmail}</b>
            </Text>
            <Input
              type="text"
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              onClick={handleOtpVerify}
              width="full"
              bgColor="green.500"
              textColor="white"
              mt={4}
            >
              Verify OTP
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Registration Form */}
      {registrationPage && (
        <Flex
          as="form"
          onSubmit={registerForm.handleSubmit(handleRegister)}
          width={{ base: "90%", sm: "60%", md: "45%", lg: "40%", xl: "30%" }}
          p="40px"
          boxShadow="2xl"
          bgColor="white"
          gap="20px"
          flexDirection="column"
          borderRadius="10px"
        >
          <Text textAlign="center" fontSize="30px" fontWeight="semibold">
            Registration Form
          </Text>

          {/* Name Field */}
          <FormControl isInvalid={registerForm.formState.errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              {...registerForm.register("name", {
                required: "Name is required",
              })}
            />
            <FormErrorMessage>
              {registerForm.formState.errors.name?.message}
            </FormErrorMessage>
          </FormControl>

          {/* Email Field */}
          <FormControl isInvalid={registerForm.formState.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email address"
              {...registerForm.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
            <FormErrorMessage>
              {registerForm.formState.errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          {/* Password Field */}
          <FormControl isInvalid={registerForm.formState.errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...registerForm.register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <FormErrorMessage>
              {registerForm.formState.errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          {/* Forgot Password & Submit Button */}
          <Flex
            mt={2}
            gap={2}
            justifyContent="space-between"
            flexDir={"column"}
            alignItems="center"
          >
            <Button
              type="submit"
              width="full"
              bgColor="blue.500"
              textColor="white"
              isLoading={registerForm.formState.isSubmitting}
            >
              Register
            </Button>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text
              fontSize="12px"
              _hover={{ textDecoration: "underline" }}
              onClick={() => {
                setRegistrationPage(false), setLoginPage(true);
              }}
            >
              Login
            </Text>
            <Text fontSize="12px" _hover={{ textDecoration: "underline" }}
              onClick={() => {
                setRegistrationPage(false), setLoginPage(false), setForgotPasswordPage(true);
              }}
            >
              Forgot Password?
            </Text>
          </Flex>
        </Flex>
      )}

      {/* Forgot Password */}
      {forgotPasswordPage && (
        <Flex
          as="form"
          onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
          width={{ base: "90%", sm: "60%", md: "45%", lg: "40%", xl: "30%" }}
          p="40px"
          boxShadow="2xl"
          bgColor="white"
          gap="20px"
          flexDirection="column"
          borderRadius="10px"
        >
          <Text textAlign="center" fontSize="30px" fontWeight="semibold">
            Forgot Password
          </Text>

          {/* Email Field */}
          <FormControl isInvalid={forgotPasswordForm.formState.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email address"
              {...forgotPasswordForm.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
            <FormErrorMessage>
              {forgotPasswordForm.formState.errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          {/* Password Field */}
          <FormControl isInvalid={forgotPasswordForm.formState.errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...forgotPasswordForm.register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <FormErrorMessage>
              {forgotPasswordForm.formState.errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={forgotPasswordForm.formState.errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              {...forgotPasswordForm.register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === forgotPasswordForm.watch("password") || "Passwords do not match",
              })}
            />
            <FormErrorMessage>
              {forgotPasswordForm.formState.errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>

          {/* Forgot Password & Submit Button */}
          <Flex
            mt={2}
            gap={2}
            justifyContent="space-between"
            flexDir={"column"}
            alignItems="center"
          >
            <Button
              type="submit"
              width="full"
              bgColor="blue.500"
              textColor="white"
              isLoading={forgotPasswordForm.formState.isSubmitting}
            >
              Send Reset Link
            </Button>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text
              fontSize="12px"
              _hover={{ textDecoration: "underline" }}
              onClick={() => {
                setRegistrationPage(true), setForgotPasswordPage(false), setLoginPage(false);
              }}
            >
              register here
            </Text>
            <Text fontSize="12px" _hover={{ textDecoration: "underline" }}
              onClick={() => {
                setLoginPage(true), setForgotPasswordPage(false), setRegistrationPage(false);
              }}>
              Log in
            </Text>
          </Flex>
        </Flex>
      )}
      

    </Box>
  );
}
