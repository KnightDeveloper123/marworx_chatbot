import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../Card";
import { IoMdAdd } from "react-icons/io";
import { AppContext } from "../../context/AppContext";
import { RxDotsHorizontal } from "react-icons/rx";
import { GrFormView } from "react-icons/gr";
import { MdOutlineModeEdit } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import Algorithmic from "../../../assets/Algorithmic.png"
import Campaign from "../../../assets/Campaign.png"
import Generative from "../../../assets/Generative.png"
import { decrypt } from '../../utils/security'
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { FaMagic, FaPencilAlt, FaPuzzlePiece } from "react-icons/fa";
import TemViw from "../../../assets/template.png"
import { RiDeleteBin6Line } from "react-icons/ri";


export default function Bot() {
  const { botDeletebot,getAlldeletebot, timeAgo} = useContext(AppContext);
   const user = localStorage.getItem('user')
  const admin_id = decrypt(user).id

  useEffect(() => {
    getAlldeletebot(admin_id);
  }, [admin_id]);

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
           Deleted bot
          </Text>
          <Flex gap={2}>
            {/* <Flex gap={3}>
              <Button
                borderRadius="var(--radius)"
                leftIcon={<IoMdAdd fontSize={"20px"} />}
                _hover={{ bgColor: "var(--active-bg)" }}
                bgColor="var(--active-bg)"
                color="#fff"
                h={"35px"}
                fontSize="var(--mini-text)"
                fontWeight="var(--big-font-weight)"
                onClick={onAlgOpen}
              >
                Build Chatbot
              </Button>
            </Flex> */}
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
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  Bot type
                </Th>
               

                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                   Created At 
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {botDeletebot.map((item, i) => {
                return (
                  <Tr key={item.id}>
                    <Td
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {item?.nodes?.[0]?.data?.label || null}

                    </Td>

                    <Td
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {item.sector_name}
                    </Td>
                    <Td
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {item.bot_type}
                    </Td>

                    <Td
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {timeAgo(item.created_at)}
                      
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
