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
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
  const navigate = useNavigate();
  const { bots, fetchBot, sectors, fetchSector, template, fetchTemplate ,showAlert, timeAgo} = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isAlgOpen, onOpen: onAlgOpen, onClose: onAlgClose } = useDisclosure()
  const { isOpen: isTemplateOpen, onOpen: onTemplateOpen, onClose: onTemplateClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const user = localStorage.getItem('user')
  const admin_id = decrypt(user).id
  // console.log(admin_id)
  const navigateData = () => {
    navigate("/bot_builder");
    // console.log("sdfhds");
  };

  useEffect(() => {
    fetchBot(admin_id);
    fetchSector(admin_id);
    fetchTemplate(admin_id)
  }, []);

  const botTypes = [
    { label: "Algorithmic", type: "algorithmic", image: Algorithmic, admin_id: admin_id },
    { label: "Campaign", type: "campaign", image: Campaign, path: "/home/campaign" },
    { label: "Generative", type: "generative", image: Generative, path: "/home/gen_bot" }
  ];

  const options = [
    // {
    //   icon: FaMagic,
    //   title: 'Build it for me!',
    //   description: 'Tell what you need and we will create it automatically',

    // },
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

  const [showAll, setShowAll] = useState(false)
  const [botid, setBotid] = useState(null)
  const openDeleteModal = (id) => {
    onDeleteOpen()
    setBotid(id)
  }
  const deleteBot = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/delete_bot`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          id: botid
        })
      })
      const result = await response.json();
      // console.log(result)
      if (result.success) {
        showAlert("Bot deleted successfully", 'success')
        fetchBot(admin_id);
        onDeleteClose();
      }
    } catch (error) {
      console.log(error)
      showAlert("Internal server error", 'error')
    }
  }

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
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  Bot Type
                </Th>
                   <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  Created At
                </Th>

                <Th
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

                    <Td
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      <Flex gap={2}>
                        <Box bgColor={"#E7EAFB"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                          <LuEye size={20} color={"#3550FF"} onClick={() => navigate(`/view/${item.id}`)} />
                        </Box>
                        <Box bgColor={"#F7E3E3"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                          <RiDeleteBin6Line size={20} color={"#D50B0B"} onClick={() => openDeleteModal(item.id)} />
                        </Box>
                      </Flex>

                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="16px" textAlign={'center'}> Delete Bot</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={'center'}>
            <Text fontSize='var( --text-12px)' fontWeight="var(--big-font-weight)">Are you sure you want to delete this Bot?</Text>
          </ModalBody>
          <ModalFooter w='100%' display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'}>
            <Button w='100%' onClick={() => deleteBot()} fontSize='var(--mini-text)' bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
              Delete
            </Button>
            <Button w='100%' onClick={() => onDeleteClose()} type="button" fontSize='var(--mini-text)' size={'sm'} border={'1px solid #FF5722 '}
              textColor={'#FF5722'} bgColor={'white'} _hover={''}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


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
                        onTemplateOpen();
                        console.log("hello")
                      } else if (opt.path) {
                        onAlgClose();
                        navigate(opt.path)
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

      <Modal isOpen={isTemplateOpen} onClose={onTemplateClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="18px">Select Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box maxHeight="380px" overflowY={showAll ? "auto" : "hidden"}>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {(showAll ? template : template.slice(0, 3)).map((temp, index) => (
                  <GridItem
                    key={index}
                    boxShadow="lg"
                    borderRadius="8px"
                    border="1px solid lightgray"
                    overflow="hidden"
                    bg="white"
                  >
                    <Image
                      src={TemViw}
                      height="188px"
                      width="100%"
                      objectFit="cover"
                    />
                    <Box p="10px">
                      <Text fontWeight="600" fontSize="18px" color="#FF5F35">
                        {temp.category}
                      </Text>
                      <Text fontSize="14px" mb={4} >
                        <Tooltip label={temp.description || 'No description'} hasArrow>
                          <Text as='span'>
                            {temp.description && temp.description.length > 50
                              ? `${temp.description.slice(0, 50)}...`
                              : temp.description || 'No description'}
                          </Text>
                        </Tooltip>

                      </Text>
                      <Button
                        width="full"
                        textAlign="center"
                        size="sm"
                        fontSize="15px"
                        bgColor="#FF5F35"
                        color="white"
                        _hover={{ bg: "#e14a1d" }}
                        onClick={() => navigate(`/view_template/${temp.id}`)}
                      >
                        Use
                      </Button>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
              {!showAll && template.length > 3 && (
                <Box textAlign="center" mt={4}>
                  <Button
                    variant="outline"
                    color="#FF5F35"
                    borderColor="#FF5F35"
                    size="sm"
                    onClick={() => setShowAll(true)}
                  >
                    More options
                  </Button>
                </Box>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}
