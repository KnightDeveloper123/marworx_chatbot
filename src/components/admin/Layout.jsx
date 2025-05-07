import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React, { Suspense } from "react";
import Sidebar from "./Sidebar";
import BreadCrumb from "./BreadCrumb";
import { decrypt } from "../utils/security";
import UserSidebar from "../admin/userTab/Sidebar";

const Layout = () => {
  const user = decrypt(localStorage.getItem("user"));

  return (
    <Box h="100vh">
      {/* Top Navbar */}
      <Box
        h="60px"
        w="100%"
        position="fixed"
        top="0"
        left="0"
        zIndex="1000"
        bg="white"
      >
        <Navbar />
      </Box>

      {/* Sidebar + Main Content Wrapper */}
      <Flex h="100vh" >
        {/* Sidebar (Visible only on large screens) */}
        <Box
          w="250px"
          display={{ base: "none", lg: "block" }}
          position="fixed"
          // top="60px"
          // bottom="0"
          zIndex={"999"}
          left="0"
          h="100vh"
          overflowY="auto"
        >
          {user.role === "Super-Admin" ? <Sidebar /> : <UserSidebar />}
        </Box>

        {/* Main Content Area */}
        <Box
          ml={{ base: 0, lg: "250px" }}
          w="100%"
          // h="calc(100vh - 60px)"
          overflowY="auto"
          bg="#FFFBFA"
          px={{ base: 3, md: 5 }}
          // pt={2}
          pt="60px"
        >
          <BreadCrumb />

          <Suspense
            fallback={
              <Flex
                w="100%"
                h="100%"
                justify="center"
                align="center"
                bgColor="#f0f8ff"
              >
                <Spinner size="lg" />
              </Flex>
            }
          >
            <Box pb={8} w="100%"  >
              <Outlet />
            </Box>
          </Suspense>
        </Box>
      </Flex>
    </Box>

    //   <Box h={'100vh'}>

    //   <Flex w={'auto'} h='calc(100vh - 60px)' bg="gray.800" color="white" display={{base:"none" ,sm:"none", md:"none", lg:"block" ,xl:"block"}}>
    //     {user.role === "Super-Admin" ?  <Sidebar /> : <UserSidebar/>}
    //   </Flex>

    //   {/* Main Content Area */}
    //   <Flex direction="column"  w='100%' h='calc(100vh - 60px)'>
    //     {/* Top Navbar */}
    //     <Box h="60px" w="100%">
    //       <Navbar />
    //     </Box>

    //     {/* Page Content */}
    //     <Box
    //       w='100%' h='calc(100vh - 60px)'
    //       overflow="auto"
    //       bg="#f0f8ff"
    //       px={{ base: 3, md: 5 }}
    //       pt={2}
    //     >
    //       {/* Uncomment this if you want breadcrumb above */}
    //     <BreadCrumb />
    //       <Suspense
    //         fallback={
    //           <Flex
    //             w="100%"
    //             h="calc(100vh - 60px)"
    //             justify="center"
    //             align="center"
    //             bgColor='#f0f8ff'
    //           >
    //             <Spinner size="lg" />
    //           </Flex>
    //         }
    //       >
    //         <Box pb={8}  w='100%' h='calc(100vh - 60px)' bg={'#f0f8ff'}  overflow={'auto'}>
    //           <Outlet />
    //         </Box>
    //       </Suspense>
    //     </Box>
    //   </Flex>
    // </Box>

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
