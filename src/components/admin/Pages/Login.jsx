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
  Image,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { encrypt } from "../../utils/security";
import bgImage from "../../../assets/e019f0de4c5a3728f9711d0decd90d60f652325d.png";
import loginImage from "../../../assets/loginImage.png";
import bgLogin from "../../../assets/bgLogin.png";
import logo from "../../../assets/Logo.png";
import bgSignup from "../../../assets/pana.png";

export default function Login() {
  const navigate = useNavigate();
  const { showAlert } = useContext(AppContext);
  const [registrationPage, setRegistrationPage] = useState(false);
  const [loginPage, setLoginPage] = useState(true);
  const [forgotPasswordPage, setForgotPasswordPage] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");

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
        if (loginPage) {
          const encryptedData = await encrypt(result.data);
          localStorage.setItem("token", result.auth_token);
          localStorage.setItem("user", encryptedData);
          showAlert(result.success, "success");
          navigate("/home/dashboard");
        } else {
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

  const handleOtpVerifyForgotPass = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/changePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: otpEmail,
          password: tempPassword,
          otp,
          step: "verify-and-reset"
        }),
      });

      const result = await response.json();

      if (result.success) {
        showAlert("Password successfully changed", "success");
        setShowOtp(false);
        // Redirect to login or reset form
      } else {
        showAlert(result.error || "Invalid OTP", "error");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      showAlert("Something went wrong. Please try again.", "error");
    }
  }

  const handleForgotPassword = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/changePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          step: "request-otp"
        }),
      });

      const result = await response.json();

      if (result?.step === "otp-verification") {
        showAlert("OTP sent to your email", "info");
        setOtpEmail(values.email);
        setTempPassword(values.password);
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
      bgColor="#FFF5F3"
    >
      {/* login page */}
      {loginPage && (
        <Flex
          w="100%"
          h="100vh"
          justify="center"
          align="center"
          direction={{ base: "column", md: "row" }}
          overflow={"auto"}
        >

          <Flex
          flex={1}
            // w={{ base: "100%", md: "40%" }}
            // h={{ base: "50vh", md: "100vh" }}
            h={"100vh"}
            bgColor="#FF5F35E6"
            borderBottomRadius={{ base: "40px", md: "0px" }}
            borderRightRadius={{ base: "40px", md: "100px" }}
            position="relative"
          >
            <Image
              src={bgImage}
              position="absolute"
              top="0"
              left="0"
              h="40%"
              w="auto"
              opacity="6%"
              zIndex="0"
            />
            <Flex w="100%" justify="center" align="center">
              <Image
                src={loginImage}
                maxH={{ base: "70%", md: "50%" }}
                w="auto"
                zIndex="1"
                mt={{ base: "70px", md: "0px" }}
              />
            </Flex>
            <Image
              src={bgLogin}
              position="absolute"
              bottom="0"
              right="0"
              h="40%"
              w="auto"
              zIndex="0"
            />
          </Flex>

          {/* Right Side */}
          <Flex
            flex={1}
            justify="center"
            align="center"
            px={{ base: 4, sm: 6, md: 10 }}
            py={{ base: 6, md: 0 }}
            w="100%"
            flexDir={"column"}
          >
            <Flex
              as="form"
              onSubmit={loginForm.handleSubmit(handleLogin)}
              w="full"
              maxW="400px"
              gap="20px"
              direction="column"
              p={{ base: 4, md: 6 }}
            >
              <Image alignSelf={{ base: "center", md: "flex-start" }} src={logo} maxW="100px" maxH={"60px"} mb="10px" />
              <Text alignSelf={{ base: "center", md: "flex-start" }} fontSize="2xl" fontWeight="semibold">
                Sign in
              </Text>

              {/* Email Field */}
              <FormControl isInvalid={loginForm.formState.errors.email}>
                <Input
                  type="email"
                  bgColor={"white"}
                  placeholder="Email"
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
                <Input
                  type="password"
                  bgColor={"white"}
                  placeholder="Password"
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

              {/* Submit & Links */}
              <Flex mt={2} gap={2} direction="column" align="center">
                <Button
                  type="submit"
                  width="full"
                  bg="#FF6E49"
                  color="white"
                  _hover={{ bg: "#FF5F35E5" }}
                  isLoading={loginForm.formState.isSubmitting}
                >
                  Sign In
                </Button>
              </Flex>

              <Flex justify="space-between">
                <Text
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => {
                    setRegistrationPage(true);
                    setLoginPage(false);
                  }}
                >
                  Register here
                </Text>
                <Text
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => {
                    setForgotPasswordPage(true);
                    setLoginPage(false);
                  }}
                >
                  Forgot Password?
                </Text>
              </Flex>
            </Flex>
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
              onClick={forgotPasswordPage ? handleOtpVerifyForgotPass : handleOtpVerify}
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
           w="100%"
          h="100vh"
          justify="center"
          align="center"
          direction={{ base: "column", md: "row" }}
          overflow={"auto"}
        >
          <Flex
            flex={1}
            // w={{ base: "100%", md: "40%" }}
            // h={{ base: "60vh", md: "100vh" }}
            h={"100vh"}
            bgColor="#fff"
            borderBottomRadius={{ base: "40px", md: "0px" }}
            borderRightRadius={{ base: "40px", md: "100px" }}
            position="relative"
            boxShadow={"lg"}
          >
            <Image
              src={bgImage}
              position="absolute"
              top="0"
              left="0"
              h="40%"
              w="auto"
              opacity="6%"
              zIndex="0"
            />
            <Flex w="100%" justify="center" align="center">
              <Image
                src={bgSignup}
                maxH={{ base: "40%", md: "50%" }}
                w="auto"
                zIndex="1"
                mt={{ base: "250px", md: "0px" }}
              />
            </Flex>
            <Image
              src={bgLogin}
              position="absolute"
              bottom="0"
              right="0"
              h="40%"
              w="auto"
              zIndex="0"
            />
          </Flex>

          <Flex
             flex={1}
            justify="center"
            align="center"
            px={{ base: 4, sm: 6, md: 10 }}
            py={{ base: 6, md: 0 }}
            w="100%"
            flexDir={"column"}
          >
            <Flex
              as="form"
              onSubmit={registerForm.handleSubmit(handleRegister)}
              w="full"
              maxW="400px"
              gap="20px"
              direction="column"
              p={{ base: 4, md: 6 }}
            >
              <Image alignSelf={{ base: "center", md: "flex-start" }} src={logo} maxW="100px" maxH={"60px"} mb="10px" />
              <Text  alignSelf={{ base: "center", md: "flex-start" }} fontSize="30px" fontWeight="semibold">
                Registration Form
              </Text>

              {/* Name Field */}
              <FormControl isInvalid={registerForm.formState.errors.name}>
                <Input
                  type="text"
                  bgColor="white"
                  placeholder="Name"
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
                <Input
                  type="email"
                  bgColor="white"
                  placeholder="Email"
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

              <FormControl isInvalid={registerForm.formState.errors.name}>
                <Input
                  type="number"
                  bgColor="white"
                  placeholder="Mobile No"
                  {...registerForm.register("mobile_no", {
                    required: "Mobile No is required",
                  })}
                />
                <FormErrorMessage>
                  {registerForm.formState.errors.name?.message}
                </FormErrorMessage>
              </FormControl>

              {/* Password Field */}
              <FormControl isInvalid={registerForm.formState.errors.password}>
                <Input
                  type="password"
                  bgColor="white"
                  placeholder="Password"
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

              <FormControl isInvalid={registerForm.formState.errors.confirmPassword}>
                <Input
                  type="password"
                  bgColor="white"
                  placeholder="Confirm Password"
                  {...registerForm.register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === registerForm.watch("password") || "Passwords do not match",
                  })}
                />
                <FormErrorMessage>
                  {registerForm.formState.errors.confirmPassword?.message}
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
                  bgColor="#FF6E49"
                  _hover={{ bgColor: "#FF6E49" }}
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
          </Flex>
        </Flex>
      )}

      {/* Forgot Password */}
      {forgotPasswordPage && (
        <Flex
          w="100%"
          h="100vh"
          justify="center"
          align="center"
          direction={{ base: "column", md: "row" }}
          overflow={"auto"}
        >
          <Flex
          flex={1}
            // w={{ base: "100%", md: "40%" }}
            // h={{ base: "60vh", md: "100vh" }}
            h={"100vh"}
            bgColor="#fff"
            borderBottomRadius={{ base: "40px", md: "0px" }}
            borderRightRadius={{ base: "40px", md: "100px" }}
            position="relative"
            boxShadow={"lg"}
          >
            <Image
              src={bgImage}
              position="absolute"
              top="0"
              left="0"
              h="40%"
              w="auto"
              opacity="6%"
              zIndex="0"
            />
            <Flex w="100%" justify="center" align="center">
              <Image
                src={bgSignup}
                maxH={{ base: "50%", md: "50%" }}
                w="auto"
                zIndex="1"
                mt={{ base: "120px", md: "0px" }}
              />
            </Flex>
            <Image
              src={bgLogin}
              position="absolute"
              bottom="0"
              right="0"
              h="40%"
              w="auto"
              zIndex="0"
            />
          </Flex>

          <Flex
            flex={1}
            justify="center"
            align="center"
            px={{ base: 4, sm: 6, md: 10 }}
            py={{ base: 6, md: 0 }}
            w="100%"
            flexDir={"column"}
          >
            <Flex
              as="form"
              onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
              w="full"
              maxW="400px"
              gap="20px"
              direction="column"
              p={{ base: 4, md: 6 }}
              justifyContent={"flex-start"}
            >
              <Image alignSelf={{ base: "center", md: "flex-start" }} src={logo} maxW="100px" maxH={"60px"} mb="10px" />
              <Text alignSelf={{ base: "center", md: "flex-start" }} fontSize="30px" fontWeight="semibold">
                Forgot Password
              </Text>

              {/* Email Field */}
              <FormControl isInvalid={forgotPasswordForm.formState.errors.email}>
                <Input
                  type="email"
                  bgColor="white"
                  placeholder="Email"
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
                <Input
                  type="password"
                  bgColor="white"
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
                <Input
                  type="password"
                  bgColor="white"
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
                  bgColor="#FF6E49"
                  _hover={{ bgColor: "#FF6E49" }}
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
          </Flex>
        </Flex>
      )}


    </Box>
  );
}
