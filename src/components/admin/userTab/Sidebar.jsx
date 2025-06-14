import React from "react";
// Sidebar.jsx
import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { FaTachometerAlt, } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { RiTelegram2Line } from "react-icons/ri";
import { MdProductionQuantityLimits } from "react-icons/md";
import { LuBot } from "react-icons/lu";
import { RiAiGenerate2 } from "react-icons/ri";
import { LuSection } from "react-icons/lu";
import { PiBagSimpleFill, PiRecycleFill } from "react-icons/pi";

const Sidebar = () => {

  const location = useLocation();
  
  const adminNavbar = [
    { title: "Dashboard", url: "/home/dashboard", icon: <Icon as={FaTachometerAlt} mr={2} /> },
    { title: "Employee", url: "/home/employee", icon: <Icon as={PiBagSimpleFill} mr={2} /> },
    // { title: "Employee", url: "/home/employee", icon: <Icon as={FaCircleUser} mr={2} /> },
    { title: "Sector", url: "/home/sector", icon: <Icon as={LuSection} mr={2} /> },
    // { title: "Users", url: "/home/user", icon: <Icon as={FaUser} mr={2} /> },
    { title: "Product Services ", url: "/home/product", icon: <Icon as={MdProductionQuantityLimits } mr={2} /> },
    { title: "Bot Builder", url: "/home/bot", icon: <Icon as={LuBot } mr={2} /> },
    { title: "Campaign", url: "/home/campaign", icon: <Icon as={RiTelegram2Line} mr={2} /> },
    { title: "Genarative Bot", url: "/home/gen_bot", icon: <Icon as={RiAiGenerate2} mr={2} /> },
    { title: "Recycle bin", url: "/home/recycle_bin", icon: <Icon as={PiRecycleFill} mr={2} /> },
  ];
  return (
    <Box w="240px"  p={5} height="100vh" bg="#fff5f3" boxShadow='base'>
      <Text fontSize="xl" fontWeight="bold" mb={8}>
        Marworx Chat Bot
      </Text>
      {/* <VStack spacing={1} align="stretch">
        {adminNavbar.map((item, index) => (
          <Link key={index} to={item.url}>
            <Box
              // _hover={{ bg: "gray.700" }}
              p={2}
            
              borderRadius="md"
              display={"flex"}
            >
              {item.icon}
              <Text fontSize="15px" fontWeight="500" cursor="pointer">
                {item.title}
              </Text>
            </Box>
          </Link>
        ))}
      </VStack> */}
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
