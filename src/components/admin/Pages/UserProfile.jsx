import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../../context/AppContext";
import Card from "../../../Card";

const APP_URL = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [queries, setQueries] = useState([]);
  const [chatTitle, setChatTitle] = useState([]);
  const [allChat, setAllChat] = useState([]);
  const { formatDate } = useContext(AppContext);

  const userData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get(`${APP_URL}/user/getUser/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setUser(response.data.data[0]);
    } catch (err) {
      console.error("Failed to fetch user data");
    }
  };

  const queryData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      // console.log("Token being sent:", token);

      const response = await axios.get(
        `${APP_URL}/support/getAllQueriesByUser?user_id=${id}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      setQueries(response.data.data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };
  const getChatTitle = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        `${APP_URL}/chatbot/getChatTitle?user_id=${id}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      // console.log(response.data)
      setChatTitle(response.data.data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  const getAllChat = async (titleId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        `${APP_URL}/chatbot/getAllChats?title_id=${titleId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      // console.log(response.data)
      setAllChat(response.data.data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };
  const [selectedTitleId, setSelectedTitleId] = useState(null);
  const handleTitleClick = (titleId) => {
    setSelectedTitleId(titleId);
    getAllChat(titleId);
  };

  useEffect(() => {
    userData();
    queryData();
    getChatTitle();
    // getAllChat();
  }, [id]);

  // console.log(chatTitle)
  return (
    <>
      <Card>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={4} ml={5}>
            <Avatar
              size="xl"
              name={user.name}
              maxW={{ base: "100%", sm: "200px" }}
            />
            <Box p="1">
              <Text fontSize="var(--mini-15px)">{user.name}</Text>
              <Text fontSize="var(--mini-15px)">{user.email}</Text>
              <Text fontSize="var(--mini-15px)">{user.mobile_no}</Text>
            </Box>
          </Flex>
          <Flex justifyContent={"lex-start"}>
            <Button
              onClick={() => window.history.back()}
              type="button"
              size={"sm"}
              fontSize={"13px"}
              border={"1px solid #FF5722"}
              textColor={"#FF5722"}
              bgColor={"white"}
              mr={3}
              _hover={{ bgColor: "white" }} // Optional hover effect
            >
              Back
            </Button>
          </Flex>
        </Flex>
      </Card>

      <Divider py="2" />
      <Card >
        <Box w="100%" overflow="auto">
          <Tabs position="relative" variant="unstyled">
            <Box
              display={"flex"}
              flexDirection={"column"}
              bg={"#fff"}
              p={"3px"}
              borderRadius="10px"
            >
              <TabList
                justifyContent={{ base: "center", md: "start" }}
                gap="2rem"
                p={{ base: "0", md: "0.2rem 6rem" }}
              >
                <Tab>
                  {" "}
                  <Box
                    // as="button"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="3px"
                  >
                    {/* <ImProfile fontSize="20px" /> */}
                    <Text textAlign="center" fontSize="13px" fontWeight="500">
                      Chats
                    </Text>
                  </Box>
                </Tab>
                <Tab>
                  {" "}
                  <Box
                    // as="button"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="3px"
                  >
                    {/* <ImProfile fontSize="20px" /> */}
                    <Text textAlign="center" fontSize="13px" fontWeight="500">
                      Queries
                    </Text>
                  </Box>
                </Tab>
              </TabList>
            </Box>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="var(--active-bg)"
              borderRadius="1px"
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              bg={"#fff"}
              p="3px"
              borderRadius="10px"
              mt="10px"
            >
              <TabPanels>
                <TabPanel>
                
                  <Accordion>
                    {chatTitle.map((title, index) => (
                      <AccordionItem>
                      <AccordionButton  key={index}
                      direction="column"
                      mt={2}
                      boxShadow="var(--shadow)"
                      p={4}
                      cursor="pointer"
                      onClick={() => handleTitleClick(title.id)}
                      bg={selectedTitleId === title.id ? "gray.100" : "white"}>
                      <Box p={0}>
                        <Text
                          fontWeight="var(--big-font-weight)"
                          fontSize="var(--heading)"
                          mb={2}
                        >
                          {title.title}
                        </Text>
                      </Box>
                      {/* <AccordionIcon /> */}
                    </AccordionButton>
                 
                 {selectedTitleId && allChat.length > 0 ? (
                   <AccordionPanel pb={4}  maxH='325px' overflowY={'scroll'} className="scroll">
                    <Box spacing={4} align="stretch">
                      {allChat.map((query, index) => (
                        <Flex
                          key={index}
                          direction="column"
                          mt={2}
                          boxShadow="var(--shadow)"
                          p={4}
                          borderRadius="8px"
                          width={'max-content'} justifyContent={ "flex-end"}
                        >
                          <Flex
                            justifyContent={ "flex-end"}
                          >
                            <Box
                              p={3}
                              borderRadius="10px"
                            >
                              <Text fontSize="sm" fontWeight="bold" mb={1}>
                                {query.sender ==="user"  ? "user" : "bot"}
                              </Text>
                              <Text fontSize="sm">{query.message}</Text>
                              <Text
                                fontSize="xs"
                                textAlign="right"
                                mt={1}
                                opacity={0.6}
                              >
                                {/* {query.time} */}
                              </Text>
                            </Box>
                          </Flex>
                        </Flex>
                      ))}
                    </Box> 
                    </AccordionPanel>
                  ) : (
                    selectedTitleId && (
                      <Text mt={4} color="gray.400">
                        No queries found for this title.
                      </Text>
                    )
                  )}
                  </AccordionItem>
                  ))}
                  </Accordion>
                 

                 

                  {/* {selectedTitleId && allChat.length > 0
                    ? allChat.map((query, index) => (
                        <Flex
                          key={index}
                          direction="column"
                          mt={2}
                          boxShadow="var(--shadow)"
                          p={4}
                        >
                          <Box p={0}>
                            <Text
                              fontWeight="var(--big-font-weight)"
                              fontSize="var(--heading)"
                              mb={2}
                            >
                              {query.message}
                            </Text>
                          </Box>
                      
                        </Flex>
                      ))
                    : selectedTitleId && (
                        <Text mt={4}>No queries found for this title.</Text>
                      )} */}
                </TabPanel>

                <TabPanel>
                  {queries.map((query, index) => (
                    <Flex
                      key={index}
                      direction="column"
                      mt={2}
                      boxShadow="var(--shadow)"
                      p={4}
                    >
                      <Box p={0}>
                        <Text
                          fontWeight="var(--big-font-weight)"
                          fontSize="var(--heading)"
                          mb={2}
                        >
                          {query.query}
                        </Text>
                      </Box>

                      <Box display={"flex"} gap="5">
                        <Flex>
                          {" "}
                          <Text
                            fontWeight="var(--big-font-weight)"
                            fontSize="var(--mini-text)"
                            mr={1}
                          >
                            Status:{" "}
                          </Text>{" "}
                          <Text fontSize="var(--mini-text)">
                            {" "}
                            {query.query_status}
                          </Text>
                        </Flex>
                        <Flex>
                          {" "}
                          <Text
                            fontWeight="var(--big-font-weight)"
                            fontSize="var(--mini-text)"
                            mr={1}
                          >
                            Created At:{" "}
                          </Text>{" "}
                          <Text fontSize="var(--mini-text)">
                            {" "}
                            {formatDate(query.created_at)}
                          </Text>
                        </Flex>
                        <Flex>
                          {" "}
                          <Text
                            fontWeight="var(--big-font-weight)"
                            fontSize="var(--mini-text)"
                            mr={1}
                          >
                            Assignee:{" "}
                          </Text>{" "}
                          <Text fontSize="var(--mini-text)">
                            {" "}
                            {query.assignee_id
                              ? query.assignee_name
                              : "Unassigned"}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  ))}
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
      </Card>
    </>
  );
};

export default UserProfile;
