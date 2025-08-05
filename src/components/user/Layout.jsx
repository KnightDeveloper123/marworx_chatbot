import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBarTharmax from "./Tharmax/SideBarTharmax";
import React from "react";
import NavbarTharmax from "./Tharmax/NavbarTharmax";
import NewsTharmax from "./Tharmax/NewsTharmax";

const Layout = () => {

  return (
    <>
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden" bgColor={'#fff'}>
        {/* Navbar */}
        <Box zIndex={100} position="relative">
          <NavbarTharmax />
        </Box>

        {/* Main Body: Sidebar + Chat + Right Panel */}
        <Flex h='calc(100vh - 70px)' overflowY='auto'>
          {/* Left Sidebar */}
          <Box
            // width="260px"
            position="relative"
            zIndex={90}
            borderRight="1px solid #E2E8F0"
            bg="white"
            // h='calc(100vh - 70px)'
            overflowY='auto'
            sx={{
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#BABABA",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#BABABA",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#BABABA",
              },
            }}
          >
            <SideBarTharmax />
          </Box>

          {/* Main Chat Area */}
          <Box
            flex="1"
            position="relative"
            zIndex={1}
            overflowY="auto" // prevent internal scroll
            p={0}
          >
            <Outlet />
          </Box>

          {/* Right Panel */}
          <Box
            position="relative"
            borderLeft="1px solid #E2E8F0"
            bg="white"
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
