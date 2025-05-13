import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../Card";
import { IoMdAdd } from "react-icons/io";
import { AppContext } from "../../context/AppContext";
import { RxDotsHorizontal } from "react-icons/rx";
import { GrFormView } from "react-icons/gr";
import { MdOutlineModeEdit } from "react-icons/md";
import { LuEye } from "react-icons/lu";

export default function Bot() {
  const navigate = useNavigate();
  const { bots, fetchBot } = useContext(AppContext);

  const navigateData = () => {
    navigate("/bot_builder");
    // console.log("sdfhds");
  };

  useEffect(() => {
    fetchBot();
  }, []);

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
            <Flex gap={3}>
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

        <TableContainer mt="20px" borderRadius="5px 5px 0px 0px">
          <Table size="sm" className="custom-striped-table">
            <Thead border="0.5px solid #FFF5F3">
              <Tr h="40px" bgColor="#FFF5F3">
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  Bot name
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  Sector name
                </Th>

                <Th
                  h
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {bots.map((item, i) => {
                return (
                  <Tr>
                    <Td
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {item.name}
                    </Td>

                    <Td
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      Automobile
                    </Td>

                    <Td
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      <Flex gap={2}>
                        <Box bgColor={"#E7EAFB"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                            <LuEye  size={20} color={"#3550FF"}  onClick={() => navigate(`/view/${item.id}`)} />
                        </Box>
                      </Flex>
                      {/* <Menu>
                        <MenuButton
                          bgColor="transparent"
                          _hover={{
                            bgColor: "transparent",
                            color: "var(--active-bg)",
                          }}
                          _active={{
                            bgColor: "transparent",
                            color: "var(--active-bg)",
                          }}
                          as={Button}
                        >
                          <RxDotsHorizontal />
                        </MenuButton>
                        <MenuList gap={2}>
                          <MenuItem
                            w="100%"
                            minW="100px"
                            onClick={() => navigate(`/view/${item.id}`)}
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                          >
                            <GrFormView color="green" />
                            <Text
                              fontSize="var(--mini-text)"
                              fontWeight="var(--big-font-weight)"
                            >
                              View
                            </Text>
                          </MenuItem>
                        </MenuList>
                      </Menu> */}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Card>
  );
}
