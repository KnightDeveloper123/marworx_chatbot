import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "../user/SideBar";
import Navbar from "./Navbar";
import { Suspense } from "react";

const Layout = () => {
  
  return (
    <Box>
      <Navbar />
      
      <Suspense fallback={
          <Flex w='100%' h='calc(100vh - 60px)' bgColor='#f0f8ff' justifyContent='center' alignItems='center'>
                  <Spinner size='lg' />
              </Flex>
          }>

              <Flex p={{ xl: '0px 10px', lg: '0px 10px', md: '0px 10px', sm: '0px 5px', base: '0px 5px' }} zIndex='-1' h='calc(100vh - 60px)' bg={'#f0f8ff'} >
                  <Box w='100%' p='15px 0px'>
                      <Outlet />
                  </Box>
              </Flex>
          </Suspense>
    </Box>
  );
};

export default Layout;
