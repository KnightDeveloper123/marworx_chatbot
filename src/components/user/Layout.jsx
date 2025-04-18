import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import React from "react";

const Layout = () => {
  
  return (
    <Flex flexDirection="row" height="100vh" position={'relative'}>
      <Box  zIndex={100} position="relative">
      <SideBar />
      </Box>
      
      <Box flex="1" zIndex={1} position="relative">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
