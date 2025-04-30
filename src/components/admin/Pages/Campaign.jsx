import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useRef } from "react";
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
  SimpleGrid,
  GridItem,
  TableCaption,
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
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";

const Campaign = () => {

  const token = localStorage.getItem('token')
  const { showAlert, fetchCampaign, campaign, formatDate, admin_id } = useContext(AppContext)
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
    campaign_name: "",
    to:"",
    message_content: "",
    sector: '',
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
          channel_name: 'Whatsapp',
          campaign_name: campaignData.campaign_name,
          message_content: campaignData.message_content,
          sector: campaignData.sector,
          template_name: campaignData.template_name,
          template_type: campaignData.template_type,
          template_lang: campaignData.template_lang,
          header: campaignData.header,
          body: campaignData.body,
          admin_id: admin_id,
          to:campaignData.to
        })

      })
      const result = await response.json();
        console.log("rer",result)
      if (result.success) {
        showAlert("Campaign added successfully", 'success')
        fetchCampaign();
        onStepClose();
      }
    } catch (error) {
      console.log(error)
      showAlert("Failed to add Campaign", 'error')
    }
  }

  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // console.log(selectedCampaign.id)


  const editCampaign = (data) => {

    setSelectedCampaign(data);

    setCampaignData({
      channel_name: data.channel_name || 'WhatsApp',
      campaign_name: data.campaign_name || "",
      message_content: data.message_content || "",
      sector: data.sector || '',
      template_name: data.template_name || "",
      template_type: data.template_type || "",
      template_lang: data.template_lang || "",
      header: data.header || "",
      body: data.body || ""
    });
    setIsStepOpen(true);
    onOpen();

  }

  const updateCampaign = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign/update`, {
        method: "POST",
        headers: {
          "Content-type": 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          campaign_id: selectedCampaign.id,
          ...campaignData
        })
      })
      const result = await response.json();

      if (result.success) {
        showAlert("Campaign updated successfully", 'success')
        fetchCampaign();
        onStepClose();

      }

    } catch (error) {
      console.log(error)
      showAlert('failed to update campaign', 'error')
    }
  }


  const sectors = [{
    name: 'Education',
    value: 1
  },

  {
    name: "Healthcare",
    value: 2
  },
  {
    name: "Retail",
    value: 3
  }]
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const handleSwitchChange = (e) => {
    setIsSwitchOn(e.target.checked);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen: isFileOpen, onOpen: onFileOpen, onClose: onFileClose } = useDisclosure()
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState({
    fileName: "", file: []
  });
  const fileInputRef = useRef()
  const handleFileChange = (event) => {
    setFile((prev) => ({ ...prev, file: event.target.files[0] }));
  };


  const FileViewer = ({ selectedFile }) => {
    const [fileContent, setFileContent] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
      if (!selectedFile) {
        setFileContent("");
        setFileUrl("");
        return;
      }

      const filePath = `${import.meta.env.VITE_BACKEND_URL}/documents/${selectedFile.name}`;

      if (selectedFile.name.endsWith(".pdf")) {
        // Download and show PDF
        fetch(filePath)
          .then(res => res.blob())
          .then(blob => setFileUrl(URL.createObjectURL(blob)))
          .catch(() => setFileUrl(""));
      } else if (selectedFile.name.endsWith(".csv") || selectedFile.name.endsWith(".txt")) {
        // Fetch and show text-based files
        fetch(filePath)
          .then(res => res.ok ? res.text() : Promise.reject("Failed to fetch"))
          .then(setFileContent)
          .catch(() => setFileContent("Error loading file."));
      }
    }, [selectedFile]);
  }

  // /getAllcontacts

  const handleFileSubmit = async () => {
    const formData = new FormData();
    formData.append("admin_id", admin_id);
    formData.append("fileName", file.fileName);
    formData.append("file", file.file)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact/upload?fileName=${file.fileName}`, {
        method: "POST",
        headers: {
          "Authorization": token,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        showAlert(result.success, "success");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setFile(null);
        // fetchAllDocuments()
        onFileClose();
      } else {
        showAlert(result.error, "error");
      }
    } catch (error) {
      console.log(error);
      showAlert("Upload failed", "error");
    }
  };

  const getContacts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact/getAllcontacts?admin_id=${admin_id}`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      })
      const result = await response.json()
      console.log("result", result)
      setDocuments(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getContacts()
  }, [])

  // const[contactId,setContactId]=useState(null)

  const deleteContacts = async (contact_id) => {

    // try {
    //   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact/delete?contact_id=${contact_id}`, {
    //     method: "POST",
    //     headers: {
    //       Authorization: token,
    //       "Content-Type": 'application/json'
    //     }

    //   })
    //   const result = await response.json()
    //   console.log("result", result)
    //   setDocuments(result.data)
    // } catch (error) {
    //   console.log(error)
    // }
  }



  return (
    <Card>
      <Flex
        w="100%"
        justifyContent="space-between"
        flexDirection={"column"}
        p="5px"
      >



        <Tabs>
          <TabList>
            <Tab>Campaign</Tab>
            <Tab>Contact List</Tab>

          </TabList>

          <TabPanels>
            <TabPanel>
             


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
                                  onClick={() => editCampaign(d)}
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


            </TabPanel>
            <TabPanel>
              <Box p={4} bg={'#fff'} mt={4} borderRadius={'lg'} boxShadow={'md'}>
                <Button
                  borderRadius="var(--radius)"
                  leftIcon={<IoMdAdd fontSize={"20px"} />}
                  _hover={{ bgColor: "var(--active-bg)" }}
                  bgColor="var(--active-bg)"
                  color="#fff"
                  fontSize="var(--mini-text)"
                  fontWeight="var(--big-font-weight)"
                  h={"35px"}
                  onClick={() => onFileOpen()}
                >
                  Add Documents
                </Button>
                {/* <SimpleGrid h={'100%'} mt={4} columns={{ base: 1, md: 5 }} gap={2}>
                  <GridItem colSpan={{ base: 1, md: 2 }}> */}
                    <TableContainer>
                      <Table variant='striped' size={'sm'} borderRadius={'10px'}>
                        <TableCaption>DATA SETS UPLOADED FOR MODEL TRAINING</TableCaption>
                        <Thead>
                          {documents.length === 0 ? <Tr><Th border={'1px solid #b4b4b4'} colSpan={'4'} textAlign={'center'} fontSize={'12px'}>No Documents Uploaded</Th></Tr> : <Tr>
                            <Th>ID</Th>
                            <Th>File Name</Th>
                            <Th>name</Th>
                            <Th>phone</Th>
                            <Th>email</Th>
                            <Th>Created At</Th>
                            {/* <Th>Action</Th> */}
                          </Tr>}
                        </Thead>
                        <Tbody>
                          {documents?.map(item => <Tr fontSize={'14px'} cursor={'pointer'} key={item?.id} >
                            <Td>{item?.id}</Td>
                            <Td>{item?.name}</Td>
                            <Td>{item?.contact_name}</Td>
                            <Td>{item?.email}</Td>
                            <Td>{item?.phone}</Td>
                            <Td>{formatDate(item?.created_at)}</Td>
                            {/* <Td>
                              <Flex onClick={(e) => { e.stopPropagation(); deleteContacts(item.id) }} cursor={'pointer'} _hover={{ color: 'white', bg: 'red' }} color={'red'} justifyContent={'center'} alignItems={'center'} h={'20px'} w={'20px'} border={'1px solid red'} borderRadius={'full'}>
                                <DeleteIcon />
                              </Flex>
                            </Td> */}
                          </Tr>)}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  {/* </GridItem> */}

                  {/* <FileViewer selectedFile={selectedFile} /> */}
                {/* </SimpleGrid> */}
              </Box>


              <Modal isOpen={isFileOpen} onClose={onFileClose} motionPreset='slideInBottom' isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Upload Files</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel>File Name</FormLabel>
                      <Input name="fileName" type="text" onChange={(e) => setFile((prev) => ({ ...prev, fileName: e.target.value }))} placeholder="File Name" />
                    </FormControl>

                    <FormControl mt={2}>
                      <Input border={'none'} p={0} type="file" name="file" ref={fileInputRef} onChange={handleFileChange} />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button size={'sm'} mr={3} onClick={onFileClose}>
                      Close
                    </Button>
                    <Button size={'sm'} variant='ghost' onClick={handleFileSubmit} _hover={{ bgColor: "var(--active-bg)" }}
                      bgColor="var(--active-bg)"
                      color="#fff">Upload</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* <GridItem colSpan={{ base: 1, md: 3 }} p={4} borderRadius="md" minH="300px" maxH="450px" overflowY="auto">
                {selectedFile ? (
                  <>
                    <Text fontWeight="bold" mb={2}>{selectedFile.name}</Text>

                    {selectedFile.name.endsWith(".pdf") ? (
                      fileUrl ? (
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                          <Viewer fileUrl={fileUrl} />
                        </Worker>
                      ) : (
                        <Text>Loading PDF...</Text>
                      )
                    ) : [".csv", ".txt"].some(ext => selectedFile.name.endsWith(ext)) ? (
                      <Box as="pre" whiteSpace="pre-wrap" wordBreak="break-word">
                        {fileContent || "Loading file content..."}
                      </Box>
                    ) : (
                      <Text>Preview not available for this file type.</Text>
                    )}
                  </>
                ) : (
                  <Text>Select a file to view its content.</Text>
                )}
              </GridItem> */}



            </TabPanel>

          </TabPanels>
        </Tabs>
      </Flex>


      <Box>
        {isOpen && (
          <Modal isOpen={isStepOpen} onClose={{ onClose, onStepClose }} size={"3xl"} >
            <ModalOverlay />
            <ModalContent pt={'2'}>
              <ModalCloseButton onClick={() => onClose()} />


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

              {activeStep === 0 && (
                <>
                  <Text paddingLeft={'20px'} fontSize={'22px'} fontWeight={'semibold'}>Create a Campaign</Text>
                  <Divider my={3} borderColor="gray.300" borderWidth="1px"></Divider>
                </>
              )}
              <Text fontSize={'18px'}></Text>

              <ModalBody>
                {activeStep === 0 && (

                  <Box>

                    <Text fontWeight="bold" mb={3}>Standard</Text>
                    <Text fontSize="sm" color="gray.600" mb={4}>
                      Create a one-off campaign from scratch.
                    </Text>

                    <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4} mb={8} >

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

                        onClick={() => {
                          setCampaignData(prev => ({ ...prev, channel_name: 'WhatsApp' }));
                          goToNext(); // move to next step after setting value
                        }}

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
                  <Box width="100%" maxW="600px" mx="auto" textAlign="left">
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
                      borderRadius={'16px'}
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
                        {selectedCampaign ? "Update" : "Start"}


                      </Button>
                    </Flex>
                  </Box>
                )}



                {activeStep === 2 && (

                  <Box width="100%" maxW="600px" mx="auto" position={'relative'} zIndex={10}>
                    <Flex justifyContent="space-between" alignItems="center" mb="6">
                      <Flex alignItems="center" gap="2">
                        <Text onClick={goToPrevious}>
                          <HiOutlineArrowSmLeft />
                        </Text>

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
                          <Select name="to"  value={campaignData.to} onChange={handleChange} placeholder="select contact" >
                            {
                             documents.map((d)=>(
                        <option value={d.contact_name}>{d.contact_name}</option>
                             ))
                            }
                          </Select>
                          {/* <Text fontSize="sm" color="gray.500">Select a list of recipients</Text> */}
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
                        <Tabs isFitted variant="enclosed">
                          <TabList bg="gray.200" p="2px" borderRadius="md" width="100%" mx="auto">
                            <Tab
                              _selected={{ bg: "white", fontWeight: "bold", borderRadius: "md" }}
                              fontSize="14px"
                            >
                              Use Template
                            </Tab>
                            <Tab
                              _selected={{ bg: "white", fontWeight: "bold", borderRadius: "md" }}
                              fontSize="14px"
                            >
                              Start from Scratch
                            </Tab>
                          </TabList>

                          <TabPanels>
                            {/* Tab 1 Panel */}
                            <TabPanel>
                              <Flex direction="column" gap={3}>
                                <Text fontSize="sm" >
                                  Choose the template that you want to reuse. Note that the templates
                                  that were already approved cannot be edited.
                                </Text>
                                <FormControl>
                                  <Select placeholder="Select a template" borderRadius="full">
                                    <option value="template">abc</option>
                                  </Select>
                                </FormControl>
                              </Flex>
                            </TabPanel>

                            {/* Tab 2 Panel */}
                            <TabPanel>
                              <Flex direction="column" justify="space-between" height="370px">
                                <Text fontSize="14px">
                                  Meta will review new messages before you can send them.
                                </Text>
                                <Flex justify="flex-end">
                                  <Button
                                    onClick={onModalOpen}
                                    fontSize="13px"
                                    bgColor="#FF5722"
                                    _hover={{ bgColor: "#e64a19" }}
                                    textColor="white"
                                    size="sm"
                                  >
                                    Start Creating
                                  </Button>
                                </Flex>
                              </Flex>
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      </Box>
                      {/* <Box>
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
                                <Text fontSize={'14px'}>
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

                      </Box> */}
                    </DrawerBody>


                  </DrawerContent>
                </Drawer>

                <Modal isOpen={isModalOpen} onClose={onModalClose} size={'2xl'}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box width="100%" maxW="500px" mx="auto" textAlign="left" mb={'14px'}>
                        <Heading fontSize="20px" mb={4}>Create a WhatsApp template</Heading>
                        <Text color={"gray.600"} fontSize={'15px'}>Design a WhatsApp message template that can be used for your WhatsApp campaigns or Transactional sendings. A template needs to be submitted for approval to Meta before it can be sent.</Text>
                        <Box display={'flex'} flexDirection={'column'} >
                          <FormControl mt={7} isRequired>
                            <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Sector</FormLabel>
                            <Select fontSize="var(--text-12px)" name="sector" placeholder="Select sector" value={campaignData.sector} onChange={handleChange}>
                              {sectors.map((sector) => (
                                <option value={sector.value} key={sector.value}>{sector.name}</option>
                              ))}
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
                              <option value='marketing '>Marketting</option>
                              <option value='option3'>alert </option>
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
                          <Flex justifyContent="end" gap="4" mt={'12px'}>
                            <Button onClick={() => {
                              setCampaignData({
                                sector: "",
                                template_name: '',
                                template_type: '',
                                template_lang: '',
                              }),
                                onModalClose();
                            }} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
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
                  <Box ml={'-28px'} >
                    <Box width="100%" p={'5px'} mx="auto">
                      <Flex w={"100%"} justifyContent="space-between" alignItems="start" mb="1" mt={'24px'}>
                        <Flex alignItems="center" gap="2">
                          <FcBiohazard size={30} />
                          Sales
                        </Flex>
                        <Flex mb='2'>
                          {/* <Button color={"#805ad5"} variant='ghost' gap={1}>Settings</Button> */}
                          <Button type="button" onClick={goToPrevious} fontSize='var(--mini-text)' size={'sm'} border={'1px solid #FF5722 '}
                            textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''} >Discard</Button>

                          <Button onClick={selectedCampaign ? updateCampaign : saveCampaign} fontSize='var(--mini-text)' bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'} >   {selectedCampaign ? "Update" : "Save"}</Button>
                        </Flex>
                      </Flex>

                      <Divider borderColor={"black"} />
                      <Flex w={"100%"} >
                        <Flex flexDirection={"column"} borderRight={'1px solid black'}>
                          <Flex mt={5} mb={5} direction={'column'} >
                            <Box display={'flex'} px={'5px'}>
                              <Box alignItems={'center'} justifyContent={'space-evenly'} w={'full'}>
                                <Heading fontSize={"20px"}>Header</Heading>

                              </Box>
                              <Box>
                                <Switch id="email-alerts" isChecked={isSwitchOn} onChange={handleSwitchChange} />
                              </Box>
                            </Box>
                            <Flex>
                              {isSwitchOn && (
                                <Input
                                  type="text"
                                  name="header"
                                  value={campaignData.header}
                                  onChange={handleChange}
                                  mx={'6px'}
                                  mt={'3'}
                                />
                              )}
                            </Flex>
                          </Flex>

                          <Divider borderColor={"black"} />
                          <Flex alignItems={"center"} mt={5} mb={5} px={'5px'} flexDirection={"column"}>
                            <Heading alignSelf={"flex-start"} fontSize={"20px"}>Body</Heading>
                            <Textarea name="body" value={campaignData.body} onChange={handleChange} mt={5} placeholder='Enter body text here'></Textarea>
                          </Flex>
                          <Divider borderColor={"black"} />
                          <Flex justifyContent={"space-between"} px={'5px'} alignItems={"center"} mt={5} mb={5}>
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
