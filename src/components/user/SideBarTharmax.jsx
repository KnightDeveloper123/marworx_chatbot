import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Divider, Flex, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Stack, Tag, TagLabel, Text, VStack } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaPlus, FaRobot } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const APP_URL = import.meta.env.VITE_BACKEND_URL

const SideBarTharmax = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [sideData, setSideData] = useState([]);
  const token = localStorage.getItem("token");
  const { clearChat, startNewChat } = useContext(AppContext);

  const { id } = useParams();
  console.log("id", id)
  const { userid } = useParams();
  const navigate = useNavigate();
  console.log("userid", userid)

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get(`${APP_URL}/chatbot/getChatTitle?user_id=${userid}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      setSideData(response.data.data);
    } catch (error) {
      console.error("Error fetching chat data", error);
    }
  };

  const [template, setTemplate] = useState([])

  const fetchTemplate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/template/get_all_templates`, {
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
          Authorization: token
        },
      })
      const result = await response.json();
      console.log("temp", result.data)
      setTemplate(result?.data || [])
    } catch (error) {
      console.log(error)
      setTemplate([])
      // showAlert('Internal server error', 'error')
    }
  }

  const partData = async (value) => {
    navigate(`/${userid}/${value}`)
  }

  const templateData = async (value) => {
    navigate(`/template/${value}`)
  }

  const handleDelete = async (deleteId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios.delete(`${APP_URL}/chatbot/deleteChatTitle`, {
        headers: { Authorization: `${token}` },
        data: { title_id: deleteId },
      });


      getData();
      navigate(`/${userid}`);
      // if (id && id === deleteId) {
      //   navigate(`/${userid}`);
      // }
    } catch (error) {
      console.error("Error fetching chat data", error);
    }
  }

  useEffect(() => {

    getData();
    fetchTemplate()

  }, [id, clearChat]);

  return (
    <>
      <Box
        bg="white"
        w="260px"
        p={4}
        borderRight="1px solid #E2E8F0"
        boxShadow="sm"
      >
        <VStack align="start" spacing={4} border={"2px solid #E9E9E9"} borderRadius={"xl"} p={5}>
          {/* Header */}
          <Box display="flex" alignItems="center" gap={3} >
            <Box
              bg="orange.100"
              borderRadius="full"
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FaRobot color="orangered" />
            </Box>
            <Heading fontSize="md" fontWeight="bold">
              AI Chatbot
            </Heading>
          </Box>

          {/* New Chat Button */}
          <Button
            leftIcon={<FaPlus />}
            colorScheme="red"
            size="sm"
            borderRadius="md"
            width="100%"
            onClick={() => startNewChat(navigate, userid)}
          >
            New Chat
          </Button>

          {/* Sub Prompt */}
          <Box
            bg="red.50"
            color="red.600"
            fontSize="xs"
            p={2}
            borderRadius="md"
            width="100%"
            textAlign="center"
          >
            Ask me anything about heating systems!
          </Box>

          {/* Recent Searches */}
          <Box width="100%">
            <Text fontWeight="semibold" fontSize="sm" mb={2}>
              Recent Searches
            </Text>
            <VStack align="start" spacing={1} fontSize="sm" color="gray.700">
              <Text>Boiler efficiency optimization</Text>
              <Text>Heat Exchanger maintenance</Text>
              <Text>Thermax steam systems</Text>
              <Text>Energy recovery units</Text>
            </VStack>
          </Box>

          <Divider />

          {/* Popular Topics */}
          <Box width="100%">
            <Text fontWeight="semibold" fontSize="sm" mb={2}>
              Popular Topics
            </Text>
            <VStack align="start" spacing={2} flexWrap="wrap">
              <Tag size="sm" borderRadius="full" bg="purple.100" color="purple.700">
                <TagLabel>Boilers</TagLabel>
              </Tag>
              <Tag size="sm" borderRadius="full" bg="green.100" color="green.700">
                <TagLabel>Heat recovery</TagLabel>
              </Tag>
              <Tag size="sm" borderRadius="full" bg="gray.100" color="gray.700">
                <TagLabel>Steam Systems</TagLabel>
              </Tag>
              <Tag size="sm" borderRadius="full" bg="blue.100" color="blue.700">
                <TagLabel>Efficiency</TagLabel>
              </Tag>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default SideBarTharmax;


{/* <Popover>
<PopoverTrigger>
  <DeleteIcon cursor="pointer" color="#FF0000" />
</PopoverTrigger>
<Portal>
  // {/* <Box zIndex="99999" position="relative"> 
    <PopoverContent
      position="absolute"
      zIndex="inherit"
      w="250px"
      // zIndex="99999" 
      // ml={'-100px'}
      h="120px"
      bg="#171923"
      color="white"
      border="none"
      boxShadow="lg"
      borderRadius="md"
    >
      <PopoverArrow bgColor="#171923" />
      <PopoverHeader bgColor="#171923" border="none" />
      <PopoverCloseButton color="white" />
      <PopoverBody
        bgColor="#171923"
        display="flex"
        flexDirection="column"
      >
        <Text color="white">Do You want to delete?</Text>
        <Button colorScheme="red" onClick={() => handleDelete(data.id)}>
          Delete
        </Button>
      </PopoverBody>
    </PopoverContent>
  {/* </Box> 
</Portal>
</Popover> */}