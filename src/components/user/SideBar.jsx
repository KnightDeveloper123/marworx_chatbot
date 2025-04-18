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

  const { clearChat } = useContext(AppContext);

  const { id } = useParams();
  const { userid } = useParams();

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


  const partData = async (value) => {
    navigate(`/${userid}/${value}`)
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
                <Text fontSize="sm">Today</Text>
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
                      {/* <DeleteIcon onClick={() => handleDelete(data.id)} cursor="pointer" color={"#FF0000"} /> */}

                      <Popover>
                        <PopoverTrigger>
                          <DeleteIcon cursor="pointer" color="#FF0000" />
                        </PopoverTrigger>
                        <Portal>
                          <Box zIndex="99999" position="relative">
                            <PopoverContent
                              position="absolute"
                              zIndex="inherit"
                              w="250px"

                              ml={'-100px'}
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
                          </Box>
                        </Portal>
                      </Popover>

                    </Text>

                  )}

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
