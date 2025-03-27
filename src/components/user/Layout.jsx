import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  
  return (
    <Flex flexDirection="row" height="100vh">
      <SideBar />
      
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
