import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Button,
  IconButton,
  useDisclosure,
  VStack,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();


  const adminNavbar = [
    { title: "Dashboard", url: "/admin/dashboard" },
    { title: "Employee", url: "/admin/employee" },
    { title: "Users", url: "/admin/user" },
    { title: "Queries", url: "/admin/queries" },
  ];

  return (
    <HStack
      p={{
        xl: "0px 20px",
        lg: "0px 20px",
        md: "0px 20px",
        sm: "0px 5px",
        base: "0px",
      }}
      justifyContent="space-between"
      alignItems={"center"}
      w="100%"
      height="60px"
      bg="#fff !important"
      zIndex={111}
    >
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        mx={3}
        gap={2}
      >
        <Flex
          w="100%"
          h="100%"
          justifyContent="space-between"
          alignItems="center"
          gap={{ xl: 3, lg: 3, md: 2, sm: 5, base: 2 }}
        >
          <Flex mr="0px" gap={2}>
            <IconButton
              display={{
                "2xl": "none",
                xl: "none",
                lg: "none",
                md: "block",
                sm: "block",
                base: "block",
              }}
              onClick={onDrawerOpen}
              aria-label="Search database"
              icon={<HamburgerIcon fontSize="25px" />}
              size="sm"
              bg="transparent"
              _hover={{
                bgColor: "#007bff29",
                // boxShadow:'0 0 5px #007bff59',
                color: "#007bff",
              }}
              sx={{
                "&:hover p": {
                  color: "#007bff",
                },
              }}
              transition="0.25s"
            />
            Marworx Chat Bot
          </Flex>
          <Flex
            justifyContent="space-evenly"
            gap={4}
            alignItems="center"
            display={{ xl: "flex", lg: "flex", md: "none", sm: "none", base: "none" }}
          >
            {adminNavbar.map((item, index) => (
              <NavLink
                key={index}
                to={item.url}
                style={({ isActive }) => ({
                  color: isActive ? "#FF5722" : "#000000",
                  backgroundColor: isActive ? "#FF572215" : "transparent",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  transition: "0.25s",
                  textDecoration: "none",
                })}
              >
                <Text fontSize="15px" fontWeight="500" cursor="pointer">
                  {item.title}
                </Text>
              </NavLink>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor="#fafbff">Menu</DrawerHeader>
          <DrawerBody p="0px" bgColor="#fafbff">
            <Box
              w="100%"
              gap={{ xl: 35, lg: 25, md: 13, sm: 5, base: 2 }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                w="100%"
                h="100%"
                justifyContent="space-between"
                alignItems="center"
                gap={{ xl: 3, lg: 3, md: 2, sm: 5, base: 2 }}
              >
                <Box
                  mx="10px"
                  minW={{
                    xl: "250px",
                    lg: "150px",
                    md: "150px",
                    sm: "250px",
                    base: "250px",
                  }}
                ></Box>
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}

export default Navbar;
