import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../Card";
import { IoMdAdd } from "react-icons/io";

export default function Bot() {
  const navigate = useNavigate();

  const navigateData = () => {
      navigate("/bot_builder");
      // console.log("sdfhds");
    };

  return (
    <Card>
      <Flex
        w="100%"
        justifyContent="space-between"
        flexDirection={"column"}
        p="15px"
      >
        <Flex
                 w="100%"
                 alignItems={"center"}
                 justifyContent="space-between"
                 gap="10px"
               >
                 <Text fontWeight="var(--big-font-weight)" fontSize="var(--semi-big)">
                   Bot
                 </Text>
                 <Flex gap={2}>
       
                   <Flex gap={3}
                   // display={location.pathname === "/admin/dashboard" ? "none" : "Flex"}
                   >
                     {/* {userDetails.type === "admin" || userDetails.active === 1 ? ( */}
                     {/* <Input h={"35px"} htmlSize={20} width='auto'  fontSize="var(--mini-text)"
                       fontWeight="var(--big-font-weight)"
                     placeholder="Search Name"
                     value={filteredSectors} onChange={(e) => setFilteredSectors(e.target.value)} /> */}
                     <Button
                       borderRadius="var(--radius)"
                       leftIcon={<IoMdAdd fontSize={"20px"} />}
                       _hover={{ bgColor: "var(--active-bg)" }}
                       bgColor="var(--active-bg)"
                       color="#fff"
                       h={"35px"}
                       fontSize="var(--mini-text)"
                       fontWeight="var(--big-font-weight)"
                       onClick={navigateData}
                     >
                       Build Chatbot
                     </Button>
       
                   </Flex>
                 </Flex>
               </Flex>
       
       
        </Flex>
      
    </Card>
  );
}
