import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../../context/AppContext";
import Card from "../../../Card";
import TemViw from "../../../assets/template.png";
import Generative from "../../../assets/Generative.png";

const EmployeeProfile = () => {
  const { getGenBotforEmployee, genBotforEmployee, getAlgBotforEmployee, algBotforEmployee, getEmployeeId, employeeId, timeAgo } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getGenBotforEmployee(id);
    getAlgBotforEmployee(id);
    getEmployeeId(id);
  }, [id]);


  return (
    <>
      <Card>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={4} ml={5}>
            <Avatar
              size="xl"
              name={employeeId?.name}
              maxW={{ base: "100%", sm: "200px" }}
            />
            <Box p="1">
              <Text fontSize="var(--mini-15px)">{employeeId?.name}</Text>
              <Text fontSize="var(--mini-15px)">{employeeId?.email}</Text>
              {/* <Text fontSize="var(--mini-15px)">{employeeId?.created_at}</Text> */}
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
      <Card>
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
                      Algorithmic Bots
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
                      Generative Bots
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
                  <SimpleGrid
                    spacing={4}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)" mt='4px'
                  >
                    {algBotforEmployee?.map((bot, index) => {
                    let label = null;
                  try {
                    const parsedNodes =
                      typeof bot.nodes === "string" ? JSON.parse(bot.nodes) : bot.nodes;
                    label = parsedNodes?.[0]?.data?.label || null;
                  } catch (error) {
                    console.error("Invalid bot.nodes JSON", error);
                  }
                  return(
                      <Card key={index}>
                        <Flex
                          justify="space-between"
                          align="center"
                          gap="15px"
                        >
                          <Flex gap={2}>
                            <Box spacing="3px">
                              <Avatar
                                src={TemViw}
                                onClick={() => navigate(`/view/${bot.bot_id}`)}
                              />
                            </Box>
                            <Box spacing="3px">
                              <Text textAlign="start">{label}</Text>
                              <Text textAlign="start" fontSize={"10px"}> {timeAgo(bot.createdAt)}
                              </Text>
                            </Box>
                          </Flex>
                        </Flex>
                      </Card>
                    )})}
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <SimpleGrid spacing={4} _hover={{ cursor: "pointer" }}>
                    {genBotforEmployee?.map((bot, index) => (
                      <Card key={index}>
                        {/* {console.log(bot)} */}
                        <Flex
                          justify="space-between"
                          align="center"
                          //   p={4}
                          gap="15px"
                        >
                          <Flex gap={2}>
                            <Box spacing="3px">
                              <Avatar
                                src={Generative}
                              // onClick={() => navigate(`/view/${bot.id}`)}
                              />
                            </Box>
                            <Box spacing="3px">
                              <Text textAlign="start">{bot?.name}</Text>
                              <Text textAlign="start" fontSize={"10px"}>
                                {timeAgo(bot.createdAt)}
                              </Text>
                            </Box>
                          </Flex>
                        </Flex>
                      </Card>
                    ))}
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
      </Card>
    </>
  );
};

export default EmployeeProfile;
