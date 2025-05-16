import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
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

export default function Bot() {
  const navigate = useNavigate();
  const { bots, fetchBot, sectors, fetchSector } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isAlgOpen, onOpen: onAlgOpen, onClose: onAlgClose } = useDisclosure()
  const user = localStorage.getItem('user')
  const admin_id = decrypt(user).id
  const navigateData = () => {
    navigate("/bot_builder");
    // console.log("sdfhds");
  };

  useEffect(() => {
    fetchBot();
    fetchSector(admin_id);
  }, []);



  const [selectedBotType, setSelectedBotType] = useState(null);
  const [selectedSectorId, setSelectedSectorId] = useState(null);

  const botTypes = [
    { label: "Algorithmic", type: "algorithmic", image: Algorithmic, admin_id: admin_id },
    { label: "Campaign", type: "campaign", image: Campaign, path: "/home/campaign" },
    { label: "Generative", type: "generative", image: Generative, path: "/home/gen_bot" }
  ];

  const options = [
    {
      icon: FaMagic,
      title: 'Build it for me!',
      description: 'Tell what you need and we will create it automatically',

    },
    {
      icon: FaPencilAlt,
      title: 'Start from scratch',
      description: 'Start with a blank builder and let your imagination flow!',
      path: '/bot_builder'
    },
    {
      icon: FaPuzzlePiece,
      title: 'Use a template',
      description: 'Choose a pre-made bot and edit them as you want',
      // path: "/home/gen_bot"
    },
  ];

  const botType = localStorage.getItem("botType");
  const sectorid = localStorage.getItem("sectorId");
  const [sectorId, setSectorId] = useState(sectorid || "");


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
                onClick={onAlgOpen}
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
                          <LuEye size={20} color={"#3550FF"} onClick={() => navigate(`/view/${item.id}`)} />
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
      {/* <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent padding={'20px'}>

          <Box display={'flex'} alignSelf={'center'} w={"90%"} justifyContent={'center'} bg={'#FF5F351A'} borderRadius={"7px"}>
            <Text padding={'10px'} textAlign={'center'} width={'350px'} color={'black'}>Build Chat Bot for Automobile</Text>
          </Box>
          <ModalCloseButton />
          <ModalBody mt={'20px'}>
            <Grid display={'grid'} templateColumns='repeat(3, 1fr)' >
              {botTypes.map((bot) => (
                <GridItem key={bot.type}>

                  <Box
                    _hover={{ bg: "#FF5F35", color: "white", transitionDuration: "0.5s" }}
                    onClick={() => {
                      setSelectedBotType(bot.type)
                      localStorage.setItem("botType", bot.type);
                      localStorage.setItem("sectorId", selectedSectorId);
                      if (bot.type === "algorithmic") {

                        onAlgOpen(); // Open second modal
                        // onBotClose();


                      } else {
                        navigate(bot.path, {
                          state: { type: bot.type, sectorId: selectedSectorId }
                        });
                        onClose();
                      }
                    }}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'90%'}
                    height={'140px'}
                    borderRadius={'7px'}
                    backgroundColor={'#FF5F3526'}
                    color={'black'}
                    cursor={'pointer'}
                  >
                    <Box>
                      <Image src={bot.image} alt={bot.type} />
                    </Box>
                  </Box>
                  <Text textAlign={'center'} mt={'10px'}>
                    {bot.label}
                  </Text>
                </GridItem>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal> */}

      <Modal isOpen={isAlgOpen} onClose={onAlgClose} size={'2xl'} >
        <ModalOverlay />
        <ModalContent>

          <ModalCloseButton />
          <ModalBody mt={'10px'}>



            <Box
              onClick={() => {
                onAlgClose();
                onOpen(); // Reopen first modal if needed
              }}>
              <HiOutlineArrowSmLeft />
            </Box>
            <Box textAlign="center"
              pt={1} pb={5}>

              <Heading mb={4} fontSize="3xl" >
                Start building!
              </Heading>
              <Box my={'20px'} >
                <Text textAlign={'left'}>Select sector</Text>
             
                <Select

                  placeholder="Select sector"
                  value={sectorId}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setSectorId(selectedId);
                    localStorage.setItem("sectorId", selectedId);
                  }}
                >
                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </Select>

              </Box>
              <Box
                display={'flex'}
                gap={6}
                wrap="wrap"
              >
                {options.map((opt, i) => (

                  <Box
                    key={i}
                    // bg={bg}
                    p={6}
                    borderRadius="lg"
                    textAlign="center"
                    boxShadow="md"
                    transition="all 0.2s"
                    bgColor={'#FF5F351A'}
                    role="group"
                    _hover={{ boxShadow: 'lg', transform: 'scale(1.03)', cursor: 'pointer', bg: "#FF5F35", color: "white", transitionDuration: "0.5s" }}
                    onClick={() => {
                      if (opt.title === 'Use a template') {
                        // onTemplateOpen();
                      } else if (opt.path) {
                        onAlgClose();
                        navigate(opt.path)
                        // window.location.href = opt.path;
                      } else {
                        console.log("Other action");
                      }
                    }}
                  >
                    <Icon as={opt.icon} boxSize={8} mb={4} />
                    <Text fontWeight="bold" mb={2}
                    >
                      {opt.title}

                    </Text>
                    <Text fontSize="sm" color="#565555" _groupHover={{ color: "white", transitionDuration: "0.5s" }}>
                      {opt.description}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </ModalBody>


        </ModalContent>
      </Modal>
    </Card>
  );
}
