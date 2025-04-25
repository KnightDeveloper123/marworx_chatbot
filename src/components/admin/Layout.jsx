import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React, { Suspense } from "react";
import Sidebar from "./Sidebar";
import BreadCrumb from "./Breadcrumb";

const Layout = () => {

  return (
    <Flex h="100vh" w="100%">
    {/* Sidebar on the left */}
    <Box w="240px" bg="gray.800" color="white">
      <Sidebar />
    </Box>

    {/* Main Content Area */}
    <Flex direction="column" flex="1" h="100vh">
      {/* Top Navbar */}
      <Box h="60px" w="100%">
        <Navbar />
      </Box>

      {/* Page Content */}
      <Box
        flex="1"
        overflow="auto"
        bg="#f0f8ff"
        px={{ base: 3, md: 5 }}
        pt={2}
      >
        {/* Uncomment this if you want breadcrumb above */}
      <BreadCrumb></BreadCrumb>

        <Suspense
          fallback={
            <Flex
              w="100%"
              h="calc(100vh - 60px)"
              justify="center"
              align="center"
            >
              <Spinner size="lg" />
            </Flex>
          }
        >
          <Box pb={8}>
            <Outlet />
          </Box>
        </Suspense>
      </Box>
    </Flex>
  </Flex>


    // <Box h={'100vh'}>
    //   <Navbar />
    //   <Box w='100%' h='calc(100vh - 60px)'>
    //     <Suspense fallback={
    //       <Flex w='100%' h='calc(100vh - 60px)' bgColor='#f0f8ff' justifyContent='center' alignItems='center'>
    //         <Spinner size='lg' />
    //       </Flex>
    //     }>

    //       <Box w='100%' p={{ xl: '10px 10px', lg: '10px 10px', md: '10px 10px', sm: '10px 5px', base: '10px 5px' }} h='calc(100vh - 60px)' bg={'#f0f8ff'}  overflow={'auto'}>
    //         <Outlet />
    //       </Box>
    //     </Suspense>
    //   </Box>
    // </Box>
  );
};

export default Layout;
