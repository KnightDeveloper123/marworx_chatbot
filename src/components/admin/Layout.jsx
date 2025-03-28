import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React, { Suspense } from "react";

const Layout = () => {

  return (
    <Box h={'100vh'}>
      <Navbar />
      <Box w='100%' h='calc(100vh - 60px)'>
        <Suspense fallback={
          <Flex w='100%' h='calc(100vh - 60px)' bgColor='#f0f8ff' justifyContent='center' alignItems='center'>
            <Spinner size='lg' />
          </Flex>
        }>

          <Box w='100%' p={{ xl: '10px 10px', lg: '10px 10px', md: '10px 10px', sm: '10px 5px', base: '10px 5px' }} h='calc(100vh - 60px)' bg={'#f0f8ff'}  overflow={'auto'}>
            <Outlet />
          </Box>
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
