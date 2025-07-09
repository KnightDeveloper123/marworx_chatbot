import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBarTharmax from "./SideBarTharmax";
import React from "react";
import NavbarTharmax from "./NavbarTharmax";
import NewsTharmax from "./NewsTharmax";

const Layout = () => {

  return (
    <>
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        {/* Navbar */}
        <Box zIndex={100} position="relative">
          <NavbarTharmax />
        </Box>

        {/* Main Body: Sidebar + Chat + Right Panel */}
        <Flex h='calc(100vh - 50px)' overflowY='auto'>
          {/* Left Sidebar */}
          <Box
            // width="260px"
            position="relative"
            zIndex={90}
            borderRight="1px solid #E2E8F0"
            bg="white"
            h='calc(100vh - 50px)'
            overflowY='auto'
          >
            <SideBarTharmax />
          </Box>

          {/* Main Chat Area */}
          <Box
            flex="1"
            position="relative"
            zIndex={1}
            overflowY="hidden" // prevent internal scroll
            bg="gray.50"
            p={0}
          >
            <Outlet />
          </Box>

          {/* Right Panel */}
          <Box
            width="300px"
            position="relative"
            borderLeft="1px solid #E2E8F0"
            bg="white"
            px={4}
            py={6}
            overflowY="auto"
          >
            <NewsTharmax />
          </Box>
        </Flex>
      </Box>


    </>
  );
};

export default Layout;
