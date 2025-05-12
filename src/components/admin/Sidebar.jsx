// Sidebar.jsx
import React from "react";
import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { FaTachometerAlt, FaUser, FaUserPlus } from "react-icons/fa";
import { SiGooglebigquery } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineTemplate } from "react-icons/hi";
import { PiBagSimpleFill } from "react-icons/pi";

const Sidebar = () => {
  const location = useLocation();

  const adminNavbar = [
    { title: "Dashboard", url: "/home/dashboard", icon: <Icon as={FaTachometerAlt} mr={2} /> },
    { title: "Admin", url: "/home/admin", icon: <Icon as={FaCircleUser} mr={2} /> },
    { title: "Employee", url: "/home/employee", icon: <Icon as={PiBagSimpleFill} mr={2} /> },
    { title: "Users", url: "/home/user", icon: <Icon as={FaUser} mr={2} /> },
    { title: "Queries", url: "/home/queries", icon: <Icon as={SiGooglebigquery} mr={2} /> },
    { title: "Templates", url: "/home/template", icon: <Icon as={HiOutlineTemplate } mr={2} /> },
  ];
  return (
    <Box width={'250px'} bg="#FFF5F3" color="black" p={5} height="100vh">
      <Text fontSize="xl" fontWeight="bold" mb={8}>
        Marworx Chat Bot
      </Text>
      <VStack spacing={1} align="stretch">
        {adminNavbar.map((item, index) => {
                  const isActive = location.pathname === item.url;
        
                  return (
                    <Link key={index} to={item.url}>
                      <Box
                        p={2}
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        bg={isActive ? "#ff5f35" : "transparent"}
                        color={isActive ? "#fff" : "#000"}
                        transition="background 0.2s"
                      >
                        {item.icon}
                        <Text fontSize="15px" fontWeight="500" cursor="pointer">
                          {item.title}
                        </Text>
                      </Box>
                    </Link>
                  );
                })}
      </VStack>
    </Box>
  );
};

export default Sidebar;
