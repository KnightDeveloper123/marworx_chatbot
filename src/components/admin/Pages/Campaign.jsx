import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  Image,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  IconButton,
  Stepper,
  useSteps,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Td,
  ModalFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  Select,
  FormLabel,
  FormHelperText,
  Switch,
  Textarea,
  Avatar,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Card from "../../../Card";
import { IoMdAdd } from "react-icons/io";
import { AppContext } from "../../context/AppContext";
import { RxDotsHorizontal } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import { FcBiohazard } from "react-icons/fc";
import { CiVideoOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

const Campaign = () => {

  const token = localStorage.getItem('token')
  const { showAlert, fetchCampaign, campaign, formatDate } = useContext(AppContext)
  const [filteredSectors, setFilteredSectors] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const steps = [
    {
      title: "Select Channel",
      description: "Choose your communication method",
    },
    { title: "Campaign Details", description: "Enter campaign name" },
    { title: "Configure Message", description: "Setup your message content" },
    { title: " Message content", description: "Setup your message content" },
  ];
  const [isStepOpen, setIsStepOpen] = useState(true);
  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  const onStepClose = () => {
    setIsStepOpen(false);
    setActiveStep(0);
  };

  const closemessage = () => {
    goToNext();
    onModalClose()
    onDrawerClose();
  }

  useEffect(() => {
    fetchCampaign();
  }, [])

  const filteredData = campaign.filter(item =>
    item.template_type.toLowerCase().includes(filteredSectors.toLowerCase())
  );

  const [campaignId, setcampaign] = useState(null)
  const openDeleteModal = (id) => {
    onDeleteOpen()
    setcampaign(id)
  }
  const deleteCampaign = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign/delete`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          user_id: campaignId
        })
      })
      const result = await response.json();
      if (result.success) {
        showAlert("Campaign deleted successfully", 'success')
        fetchCampaign();
        onDeleteClose();
      }
    } catch (error) {
      console.log(error)
      showAlert("Internal server error", 'error')
    }
  }

  const [campaignData, setCampaignData] = useState({
    channel_name: 'WhatsApp',
    campaign_name: "marworx",
    message_content: "",
    sector: 1,
    template_name: "",
    template_type: "",
    template_lang: "",
    header: "",
    body: ""
  })

  const handleChange = (e) => {
    setCampaignData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const saveCampaign = async () => {
    console.log("hello")
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign/add`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          channel_name: campaignData.channel_name,
          campaign_name: campaignData.campaign_name,
          message_content: campaignData.message_content,
          sector: campaignData.sector,
          template_name: campaignData.template_name,
          template_type: campaignData.template_type,
          template_lang: campaignData.template_lang,
          header: campaignData.header,
          body: campaignData.body
        })

      })
      const result = await response.json();
      console.log(result)
      if (result.success) {
        showAlert("Campaign added successfully", 'success')
        fetchCampaign();
        onDeleteClose();
      }
    } catch (error) {
      console.log(error)
      showAlert("Failed to add Campaign", 'error')
    }
  }



  return (
    <Card>
      <Flex
        w="100%"
        justifyContent="space-between"
        flexDirection={"column"}
        p="5px"
      >
        <Flex
          w="100%"
          alignItems={"center"}
          justifyContent="space-between"
          gap="10px"
        >
          <Text fontWeight="var(--big-font-weight)" fontSize="var(--semi-big)">
            Campaign
          </Text>
          <Flex gap={2}>

            <Flex gap='5px' alignItems={'center'}>
              <Input h={"35px"} htmlSize={20} width='auto' fontSize="var(--mini-text)"
                fontWeight="var(--big-font-weight)"
                placeholder="Search type"
                value={filteredSectors} onChange={(e) => setFilteredSectors(e.target.value)} />
              <Button
                borderRadius="var(--radius)"
                leftIcon={<IoMdAdd fontSize={"20px"} />}
                _hover={{ bgColor: "var(--active-bg)" }}
                bgColor="var(--active-bg)"
                color="#fff"
                h={"35px"}
                fontSize="var(--mini-text)"
                fontWeight="var(--big-font-weight)"
                onClick={onOpen}
              >
                Create Campaign
              </Button>
              {/* <Box textAlign={'center'} onClick={() => window.open(`${import.meta.env.VITE_BACKEND_URL}/campaign/export`, '_blank')}>
              <TbFileExport fontSize={'25px'}  />
              </Box> */}
            </Flex>
          </Flex>
        </Flex>
        <TableContainer
          mt="20px"
          borderRadius="5px 5px 0px 0px"
        //  maxH={flag ? "unset" : "600px"}
        // overflowY={flag ? "unset" : "scroll"}
        >
          <Table size="sm" className="custom-striped-table">
            <Thead border="0.5px solid #F2F4F8">
              <Tr h="40px" bgColor="var(--table-header-bg)">
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius="5px 0px 0px 0px"
                  fontSize="var(--mini-text)"
                >
                  ID
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  channel
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Campaign name
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Template name
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Template type
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Start date
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Status
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius="0px 5px 0px 0px"
                  fontSize="var(--mini-text)"
                >
                  Actions
                </Th>

              </Tr>
            </Thead>

            <Tbody>
              {filteredData &&
                filteredData.map((d, index) => (
                  <Tr
                    key={index}
                    border="0.5px solid #F2F4F8"
                    h="40px"
                    textAlign="start"
                  >
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      C-{d.id}
                    </Td>

                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {d.channel_name}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {d.campaign_name}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {d.template_name}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {d.template_type}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {formatDate(d.created_at)}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {d.is_status}
                    </Td>

                    <Td border="0.5px solid #F2F4F8" color={"#404040"} fontSize="var(--mini-text)">
                      <Menu>
                        <MenuButton
                          bgColor="transparent"
                          _hover={{ bgColor: "transparent", color: "var(--active-bg)" }}
                          _active={{ bgColor: "transparent", color: "var(--active-bg)" }}
                          as={Button}
                        >
                          <RxDotsHorizontal />
                        </MenuButton>
                        <MenuList gap={2} >
                          <MenuItem
                            w="100%"
                            minW="100px"
                            // onClick={() => editEmployee(d)}
                            display={'flex'} alignItems={'center'} gap={2}
                          >
                            <MdOutlineModeEdit color="green" />
                            <Text fontSize="var(--mini-text)" fontWeight="var(--big-font-weight)" >
                              Edit
                            </Text>
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            w="100%"
                            minW="100px"
                            cursor="pointer"
                            onClick={() => openDeleteModal(d.id)}

                          >
                            <Flex gap={2} alignItems="center">
                              <DeleteIcon color={"red"} />
                              <Text >Delete</Text>
                            </Flex>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Box>
        {isOpen && (
          <Modal isOpen={isStepOpen} onClose={onStepClose} size="6xl">
            <ModalOverlay />
            <ModalContent p={6}>
              <ModalCloseButton onClick={() => onStepClose()} />

              {/* Chakra Stepper */}
              {/* <Stepper index={activeStep} mb={6} size="sm" colorScheme="purple">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper> */}


              <Text fontSize={'18px'}></Text>
              {/* Step Content */}
              <ModalBody>
                {activeStep === 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={3}>Standard</Text>
                    <Text fontSize="sm" color="gray.600" mb={4}>
                      Create a one-off campaign from scratch.
                    </Text>

                    <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4} mb={8} paddingLeft={"70px"}>
                      <Box borderWidth="1px" borderRadius="md" textAlign="center" cursor="pointer">
                        <Box bgColor={'lightcyan'}>
                          <Image src="https://img.icons8.com/color/96/000000/secured-letter.png" mx="auto" mb={2} />
                        </Box>
                        <Text padding={'4'}>Email</Text>
                      </Box>

                      <Box
                        borderWidth="1px"
                        borderRadius="md"
                        textAlign="center"

                        position="relative"
                        cursor="pointer"
                        onClick={goToNext}
                      // name='channel_name'
                      // value={campaignData.channel_name}
                      >
                        <Box bgColor={'lightcyan'}>
                          <Image src="https://img.icons8.com/color/96/000000/whatsapp--v1.png" mx="auto" mb={2} />
                        </Box>

                        <Text padding={'4'} >WhatsApp</Text>
                      </Box>

                      <Box borderWidth="1px" borderRadius="md" textAlign="center" cursor="pointer">
                        <Box bgColor={'lightcyan'} >
                          <Image src="https://img.icons8.com/color/96/000000/sms.png" mx="auto" mb={2} />
                        </Box>
                        <Text padding={'4'}>SMS</Text>
                      </Box>

                      <Box borderWidth="1px" borderRadius="md" textAlign="center" position="relative" cursor="pointer">
                        <Box bgColor={'lightcyan'}>
                          <Image src="https://img.icons8.com/color/96/000000/appointment-reminders--v1.png" mx="auto" mb={2} />
                        </Box>

                        <Text padding={'4'}>Web Push</Text>
                      </Box>
                    </Grid>
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box width="100%" maxW="500px" mx="auto" textAlign="left">
                    <Box fontSize="24px" fontWeight="bold" mb="3">
                      Create a WhatsApp campaign
                    </Box>
                    <Box fontSize="14px" color="gray.600" mb="8">
                      Reach out to your customers on WhatsApp. Share important news,
                      promote products, announce an event.
                    </Box>
                    <Box textAlign="left" fontWeight="semibold" mb="2" fontSize="14px">
                      How will you name your campaign?{" "}
                      <span style={{ fontWeight: "normal" }}>(only you can see it)</span>
                    </Box>
                    <Input
                      placeholder="Type the name of your campaign"
                      fontSize="14px"
                      mb="6"
                      borderColor="gray.300"
                      name="campaign_name"
                      value={campaignData.campaign_name}
                      onChange={handleChange}
                    />
                    <Flex justifyContent="end" gap="4">
                      <Button onClick={goToPrevious} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                        textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''} >
                        Discard
                      </Button>
                      <Button
                        fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}
                        onClick={goToNext}
                      >
                        Start
                      </Button>
                    </Flex>
                  </Box>
                )}



                {activeStep === 2 && (

                  <Box width="100%" maxW="600px" mx="auto" position={'relative'} zIndex={10}>
                    <Flex justifyContent="space-between" alignItems="center" mb="6">
                      <Flex alignItems="center" gap="2">
                        <Text fontSize="20px" fontWeight="bold">
                          marworx
                        </Text>
                        <Badge colorScheme="purple" variant="subtle" fontSize="12px">
                          Draft
                        </Badge>
                      </Flex>
                      <Button

                        fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'} borderRadius={'full'}
                        onClick={onStepClose}
                      >
                        Schedule
                      </Button>
                    </Flex>

                    <Box border="1px solid #E2E8F0" borderRadius="10px" overflow="hidden">
                      <Flex p="4" justifyContent="space-between" borderBottom="1px solid #E2E8F0">
                        <Box>
                          <Text fontWeight="bold">From</Text>
                          <Text fontSize="sm" color="gray.500">Choose WhatsApp Business account.</Text>
                        </Box>
                        <Button variant="outline" size="sm" borderRadius="full">Edit</Button>
                      </Flex>

                      <Flex p="4" justifyContent="space-between" borderBottom="1px solid #E2E8F0">
                        <Box>
                          <Text fontWeight="bold">To</Text>
                          <Text fontSize="sm" color="gray.500">Select a list of recipients</Text>
                        </Box>
                        <Button variant="outline" size="sm" borderRadius="full">Edit</Button>
                      </Flex>

                      <Flex p="4" justifyContent="space-between">
                        <Box>
                          <Text fontWeight="bold">Message Content</Text>
                          <Text fontSize="sm" color="gray.500">Start a new design or select existing</Text>
                        </Box>
                        <Button colorScheme="gray" borderRadius="full" onClick={onDrawerOpen} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                          textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''} >Start Creating</Button>
                      </Flex>


                    </Box>

                    <Flex justifyContent="start" gap="4" mt={'8px'}>
                      <Button onClick={goToPrevious} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                        textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''} >
                        Back
                      </Button>

                    </Flex>

                  </Box>
                )
                }
                <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose} size={'sm'} position={'absolute'} zIndex={100}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader> Message Content</DrawerHeader>

                    <DrawerBody>
                      <Box>
                        <Tabs>
                          <TabList bg="gray.200" p="2px" borderRadius="md" width={'70%'}>

                            <Tab _selected={{ bg: "white", fontWeight: "bold", borderRadius: "md" }} fontSize={'14px'}> Use Template</Tab>
                            <Tab _selected={{ bg: "white", fontWeight: "bold", borderRadius: "md" }} fontSize={'14px'}>Start from Scratch</Tab>

                          </TabList>

                          <TabPanels>
                            <TabPanel display={'flex'} flexDirection={'column'} gap={'10px'}>
                              <Text fontSize="sm" color="gray.600">
                                Choose the template that you want  to reuse .Note that the templates that were already approved can not be edited
                              </Text>
                              <FormControl>
                                <Select placeholder="Select a template" borderRadius={'full'}>
                                  <option value='template'>abc</option>
                                </Select>
                              </FormControl>
                            </TabPanel>
                            <TabPanel>
                              <Flex direction="column" height="400px" justify="space-between">
                                <Text>
                                  Meta will review new messages before you can send them
                                </Text>

                                <Flex justify="flex-end">
                                  <Button

                                    onClick={onModalOpen}
                                    fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}
                                  >
                                    Start Creating
                                  </Button>
                                </Flex>
                              </Flex>

                            </TabPanel>

                          </TabPanels>
                        </Tabs>

                      </Box>
                    </DrawerBody>


                  </DrawerContent>
                </Drawer>

                <Modal isOpen={isModalOpen} onClose={onModalClose} size={'4xl'}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box width="100%" maxW="500px" mx="auto" textAlign="left">
                        <Heading fontSize="20px" mb={4}>Create a WhatsApp template</Heading>
                        <Text color={"gray.600"} fontSize={'15px'}>Design a WhatsApp message template that can be used for your WhatsApp campaigns or Transactional sendings. A template needs to be submitted for approval to Meta before it can be sent.</Text>
                        <Box display={'flex'} flexDirection={'column'}>
                          <FormControl mt={7} isRequired>
                            <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Sector</FormLabel>
                            <Select fontSize="var(--text-12px)" name="sector" value={campaignData.sector} onChange={handleChange}>
                              <option value='1'>Utility</option>
                              <option value='2'>Option 2</option>
                              <option value='3'>Option 3</option>
                            </Select>
                          </FormControl>
                          <FormControl mt={5} isRequired>
                            <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Template Name</FormLabel>
                            <Input name="template_name" value={campaignData.template_name} onChange={handleChange} placeholder="Type the name of your template" fontSize="var(--text-12px)" />
                          </FormControl>
                          <FormControl mt={5} isRequired>
                            <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Template type</FormLabel>
                            <Select fontSize="var(--text-12px)" name="template_type" value={campaignData.template_type} onChange={handleChange} >
                              <option value='utility'>Utility</option>
                              <option value='marketting'>Marketting</option>
                              <option value='option3'>Option 3</option>
                            </Select>
                            <FormHelperText>Choose Marketing for promotional communication and Utility for informational messages.</FormHelperText>
                          </FormControl>
                          <FormControl mt={5} isRequired>
                            <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Template language</FormLabel>
                            <Select name="template_lang" value={campaignData.template_lang} onChange={handleChange} placeholder="Choose a language" fontSize="var(--text-12px)" >
                              <option value='english'>English</option>
                              <option value='hindi'>Hindi</option>
                              <option value='marathi'>Marathi</option>
                            </Select>
                          </FormControl>
                          <Flex justifyContent="end" gap="4" mt={'10px'}>
                            <Button onClick={goToPrevious} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                              textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>
                              Discard
                            </Button>
                            <Button
                              fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}
                              onClick={closemessage}>
                              Start
                            </Button>
                          </Flex>
                        </Box>
                      </Box>
                    </ModalBody>

                  </ModalContent>
                </Modal>




                {activeStep === 3 && (
                  <Box width="100%" textAlign="left">
                    <Box width="100%" mx="auto">
                      <Flex w={"100%"} justifyContent="space-between" alignItems="center" mb="1" >
                        <Flex alignItems="center" gap="2">
                          <FcBiohazard size={30} />
                          Sales
                        </Flex>
                        <Flex>
                          {/* <Button color={"#805ad5"} variant='ghost' gap={1}>Settings</Button> */}
                          <Button type="button" color={"#805ad5"} variant='ghost'>Discard</Button>
                          <Button onClick={saveCampaign} bgColor={"#805ad5"} color={"white"} _hover={{ bgColor: "gray.500" }} variant='solid'> Save</Button>
                        </Flex>
                      </Flex>
                      <Divider borderColor={"black"} />
                      <Flex w={"100%"}>
                        <Flex flexDirection={"column"} w={"30%"}>
                          <Flex justifyContent={"space-between"} alignItems={"center"} mt={5} mb={5}>
                            <Heading fontSize={"20px"}>Header</Heading>
                            <Input type="text" name="header" value={campaignData.header} onChange={handleChange}></Input>
                            <Switch id='email-alerts' />
                          </Flex>
                          <Divider borderColor={"black"} />
                          <Flex alignItems={"center"} mt={5} mb={5} flexDirection={"column"}>
                            <Heading alignSelf={"flex-start"} fontSize={"20px"}>Body</Heading>
                            <Textarea name="body" value={campaignData.body} onChange={handleChange} mt={5} placeholder='Enter body text here'></Textarea>
                          </Flex>
                          <Divider borderColor={"black"} />
                          <Flex justifyContent={"space-between"} alignItems={"center"} mt={5} mb={5}>
                            <Heading fontSize={"20px"}>Buttons</Heading>
                            <Switch id='email-alerts' />
                          </Flex>
                        </Flex>

                        <Flex w={"70%"} justifyContent={"center"} alignItems={"center"}>
                          <Flex w={"250px"} h={"400px"} mt={10} border={"1px solid #ccc"} borderRadius={"10px"} flexDir={"column"}>
                            <Flex p={1} gap={2} w={"100%"} height={"15%"} bg={"gray.200"} borderTopRadius={"10px"} alignItems={"flex-start"}>
                              <Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                                <Avatar name="Segun Adebayo" src='https://bit.ly/broken-link' />
                                <Flex flexDir={"column"}>
                                  <Text> Segun Adebayo</Text>
                                  <Text fontSize={"12px"}>online</Text>
                                </Flex>
                                <CiVideoOn size={20} />
                                <IoCallOutline size={20} />
                              </Flex>
                            </Flex>
                            <Flex >
                              <Image h={"65%"} w={"100%"} src="https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"></Image>
                            </Flex>

                          </Flex>
                        </Flex>
                      </Flex>
                    </Box>
                  </Box>
                )}

              </ModalBody>
            </ModalContent>
          </Modal>
        )}




        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="16px" textAlign={'center'}> Delete Campaign</ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign={'center'}>
              <Text fontSize='var( --text-12px)' fontWeight="var(--big-font-weight)">Are you sure you want to delete this Campaign?</Text>
            </ModalBody>
            <ModalFooter display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'}>
              <Button onClick={() => deleteCampaign()} fontSize='var(--mini-text)' bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
                Delete
              </Button>
              <Button onClick={() => onDeleteClose()} type="button" fontSize='var(--mini-text)' size={'sm'} border={'1px solid #FF5722 '}
                textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Card>
  );
};

export default Campaign;
