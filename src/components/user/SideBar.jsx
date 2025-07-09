import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Stack, Text } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const APP_URL = import.meta.env.VITE_BACKEND_URL

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [sideData, setSideData] = useState([]);
  const token = localStorage.getItem("token");
  const { clearChat } = useContext(AppContext);

  const { id } = useParams();
  console.log("id",id)
  const { userid } = useParams();
console.log("userid",userid)
  const navigate = useNavigate();

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
      console.log("temp",result.data)
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
      <Box display="flex" >
        <Box
          h="100vh"
          w={isOpen ? "250px" : "0px"}
          overflow="hidden"
          bgColor="#171923"
          p={isOpen ? "4" : "0"}
          color="white"
          transition="width 0.5s"
          z-index={9999}
          position={{ base: "absolute", md: "unset" }}
          overflowY={"auto"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#2D3748",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#4A5568",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#718096",
            },
          }}
        >


          {isOpen && (
            <IconButton
              icon={<HamburgerIcon boxSize={6} />}
              colorScheme="whiteAlpha"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            />
          )}

          {isOpen && (
            <Box ml="10px" >
              <Flex gap="2" align="center">
                <FaRobot />
                <Heading size="sm">ChatBot</Heading>
              </Flex>

              <Stack ml="10px" mt="15px" >

                {/* sidebar chat history  */}
                {/* <Text fontSize="md">Today</Text>
                <Stack whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' >
                  {sideData.map((data) =>
                    <Text onClick={() => {
                      partData(data.id);
                    }}
                      cursor="pointer"
                      fontSize="xs"
                      display={"flex"}

                      justifyContent={"space-between"}
                      key={data.id}>{data.title}
                   

                      <Popover closeOnBlur={true}>
                        <PopoverTrigger>
                          <DeleteIcon cursor="pointer" color="#FF0000" />
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent
                            w="250px"
                            h="120px"
                            bg="#171923"
                            zIndex={1000}
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
                              <Text color="white">Do you want to delete?</Text>
                              <Button colorScheme="red" onClick={() => handleDelete(data.id)}>
                                Delete
                              </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>


                    </Text>
                  )}


                </Stack> */}

                
                <Text fontSize="sm">Template</Text>
                <Stack whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' >
                 
                  {
                  template.slice(0,2).map((data) => {
                    let label = null;
                    try {
                      const parsedNodes =
                        typeof data.node === "string" ? JSON.parse(data.node) : data.node;
                      label = parsedNodes?.[0]?.data?.label || null;
                    } catch (error) {
                      console.error("Invalid bot.nodes JSON", error);
                    }
                    // console.log(data)
                    return (
                      <Text
                        onClick={() => {
                          templateData(data.id);
                        }}
                        cursor="pointer"
                        key={data.id}
                        fontSize="xs"
                        display={"flex"}

                        justifyContent={"space-between"}
                      >{label}
                      </Text>
                    )
                  })}

                </Stack>
              </Stack>
            </Box>
          )}
        </Box>

        {!isOpen && (
          <IconButton
            icon={<HamburgerIcon boxSize={6} />}
            colorScheme="whiteAlpha"
            variant="ghost"
            onClick={() => setIsOpen(true)}
            position="absolute"
            top="16px"
            left="16px"
            zIndex="10"
          />
        )}
      </Box>
    </>
  );
};

export default SideBar;


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