import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
     AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
      AlertDialogOverlay, Box, Button, Flex, Grid, GridItem, Heading, IconButton, Menu, MenuButton, 
      MenuItem, MenuList, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../../ChatContext";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { MdOutlinePeople } from "react-icons/md";
import { BsPersonFillGear } from "react-icons/bs";

const AdminDashboard = () => {

    // const { username, logout } = useChat();
    // const [userData, setUserData] = useState([]);

    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const cancelRef = useRef();

    // const navigate = useNavigate();

    // const handleLogout = async () => {
    
    //     try {
    //         await axios.post("http://localhost:5000/logout",{}, { withCredentials: true });
    //         logout();
    //         navigate("/");
    //     } catch (err) {
    //         console.log(err);
    //     }

    // };

    // const userdata = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/getallusers', { withCredentials: true });
    //         console.log(response.data);
    //         setUserData(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     userdata();
    // }, []);


    return (
        <Flex flexDirection="column" w="100%" h="100%" pt={'20px'}>
        {/* {userDetails.type === "admin" && ( */}
          <Grid
            h="max-content"
            w="100%"
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={3}
          >
            <GridItem boxShadow=" rgba(149, 157, 165, 0.2) 0px 8px 24px" w="100%" borderRadius="7px" p={{ base: '5px', md: '10px' }} color={'#000'} bgColor="#fff" display={'flex'} flexDir={'column'} justifyContent={'space-between'} gap={{ base: '5px', md: '10px' }}>
              <Flex w={'100%'} justifyContent={'space-between'}>
                <Text   fontSize={{ base: '14px', md: "18px" }}>User</Text>
                <Text h={'max-content'} border={'1px solid black'} p={'3px'} borderRadius={'full'} color="black" fontSize={{ base: '18px', md: '24px' }}><MdOutlinePeople /></Text>
              </Flex>
              <Flex w="100%" flexDirection="column">
                <Text cursor={'default'} py={0} lineHeight={'1'} fontSize={{ base: '12px', md: "16px" }}>
                  {/* {dashCounts?.lead?.leads} */} 10
                </Text>
              </Flex>
            </GridItem>
  
            <GridItem boxShadow=" rgba(149, 157, 165, 0.2) 0px 8px 24px" w="100%" borderRadius="7px" p={{ base: '5px', md: '10px' }} color={'#000'} bgColor="#fff" display={'flex'} flexDir={'column'} justifyContent={'space-between'} gap={{ base: '5px', md: '10px' }}>
              <Flex w={'100%'} justifyContent={'space-between'}>
                <Text fontSize={{ base: '14px', md: "18px" }}>Total Employees</Text>
                <Text h={'max-content'} border={'1px solid black'} p={'3px'} borderRadius={'full'} color="black" fontSize={{ base: '18px', md: '24px' }}><BsPersonFillGear /></Text>
              </Flex>
              <Flex w="100%" flexDirection="column">
                <Text cursor={'default'} py={0} lineHeight={'1'} fontSize={{ base: '12px', md: "16px" }}>
                  {/* {dashCounts?.employee?.employee} */} 5
                </Text>
              </Flex>
            </GridItem>
          </Grid>
        {/* )} */}
  
        <Box pt={'20px'}  >
           {/* <Leads flag={false} showalert={showalert} /> */}
        </Box>
  
  
  
          
            
      </Flex>
    )
}

export default AdminDashboard;