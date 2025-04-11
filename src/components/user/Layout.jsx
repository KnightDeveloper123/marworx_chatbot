import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import React from "react";

const Layout = () => {
  
  return (
    <Flex flexDirection="row" height="100vh">
      <Box zIndex={9999}>
      <SideBar />
      </Box>
      
      <Box flex="1" zIndex={1}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
