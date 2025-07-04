import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons'
import React, { useRef } from 'react'
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
  Checkbox
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Card from '../../../Card'
import { IoMdAdd } from 'react-icons/io'
import { AppContext } from '../../context/AppContext'
import { MdOutlineModeEdit, MdOutlineSendToMobile } from 'react-icons/md'
import { TbFileExport } from 'react-icons/tb'
import { FcBiohazard } from 'react-icons/fc'
import { CiVideoOn } from 'react-icons/ci'
import { IoCallOutline } from 'react-icons/io5'
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import { useLocation, useParams } from 'react-router-dom'
import { decrypt } from '../../utils/security'
import { Link } from '@chakra-ui/react'

const Campaign = () => {

  const token = localStorage.getItem('token')
  const { showAlert, fetchCampaign, campaign, formatDate, sectors, fetchSector, } = useContext(AppContext)
  const [filteredSectors, setFilteredSectors] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure()
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose
  } = useDisclosure()
  const {
    isOpen: isModalSendCmp,
    onOpen: onModalOpenSendCmp,
    onClose: onModalCloseSendCmp
  } = useDisclosure()

  const user = localStorage.getItem('user')
  const admin_id = decrypt(user).id
  const sectorid = localStorage.getItem("sectorId");
  //  console.log("sector",sectorid)
  // console.log(campaign)
  const steps = [
    {
      title: 'Select Channel',
      description: 'Choose your communication method'
    },
    { title: 'Campaign Details', description: 'Enter campaign name' },
    { title: 'Configure Message', description: 'Setup your message content' },
    { title: ' Message content', description: 'Setup your message content' }
  ]
  const [isStepOpen, setIsStepOpen] = useState(true)
  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length
  })

  const onStepClose = () => {
    setIsStepOpen(false)
    setActiveStep(0)
  }

  const closemessage = () => {
    goToNext()
    onModalClose()
    onDrawerClose()
  }

  useEffect(() => {
    fetchCampaign(admin_id)
    fetchSector(admin_id)
  }, [])

  const filteredData = campaign?.filter(item =>
    item.template_type.toLowerCase().includes(filteredSectors.toLowerCase())
  )

  const [campaignId, setcampaign] = useState(null)
  const openDeleteModal = id => {
    onDeleteOpen()
    setcampaign(id)
  }
  const deleteCampaign = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/campaign/delete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({
            user_id: campaignId
          })
        }
      )
      const result = await response.json()
      if (result.success) {
        showAlert('Campaign deleted successfully', 'success')
        fetchCampaign(admin_id)
        onDeleteClose()
      }
    } catch (error) {
      console.log(error)
      showAlert('Internal server error', 'error')
    }
  }

  const [campaignData, setCampaignData] = useState({

    channel_name: 'WhatsApp',
    campaign_name: "",
    template_name: "",
    template_type: "",
    template_lang: "",
    header: "",
    body: "",
    admin_id: "",
    sector_id: "",
    to: '',
    banner:"",
    cta_label: "",
    cta_link: ""

    // bot_type:'campaign'
  })
 
  const handleChange = e => {
    setCampaignData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

const saveCampaign = async () => {
  try {
    const formData = new FormData();

    formData.append('channel_name', 'Whatsapp');
    formData.append('campaign_name', campaignData.campaign_name || '');
    formData.append('template_name', campaignData.template_name || '');
    formData.append('template_type', campaignData.template_type || '');
    formData.append('template_lang', campaignData.template_lang || '');
    formData.append('header', campaignData.header || '');
    formData.append('body', campaignData.body || '');
    formData.append('admin_id', admin_id);
    formData.append('sector_id', campaignData.sector_id || '');
    formData.append('to', campaignData.to || '');
    formData.append('fileName', campaignData.fileName || 'banner_img'); // used in backend filename
    formData.append('cta_label', campaignData.cta_label || '');
    formData.append('cta_link', campaignData.cta_link || '');

    // append file
    if (campaignData.bannerFile) {
      formData.append('file', campaignData.bannerFile);
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/campaign/add`,
      {
        method: 'POST',
        headers: {
          Authorization: token, // ❗Do NOT set Content-Type manually
        },
        body: formData,
      }
    );

    const result = await response.json();
    if (result.success) {
      showAlert('Campaign added successfully', 'success');
      setCampaignData({});
      fetchCampaign(admin_id);
      onStepClose();
    }

    if (response.ok && result.flowId) {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign/track-user-campaign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_id: result.flowId,
          user_id: admin_id,
        }),
      });
    }
  } catch (error) {
    console.error(error);
    showAlert('Failed to add Campaign', 'error');
  }
};

  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const editCampaign = data => {
    // console.log(data)
    setSelectedCampaign(data)
    setCampaignData({
      channel_name: data.channel_name || 'WhatsApp',
      campaign_name: data.campaign_name || '',
      // message_content: data.message_content || '',
      sector_id: data.sector_id || '',
      template_name: data.template_name || '',
      template_type: data.template_type || '',
      template_lang: data.template_lang || '',
      header: data.header || '',
      body: data.body || '',
      banner:data.banner,
      cta_label: data.cta_label,
      cta_link: data.cta_link
    })
    setActiveStep(1)
    setIsStepOpen(true)
    onOpen()
  }

  const updateCampaign = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/campaign/update`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({
            campaign_id: selectedCampaign.id,
            ...campaignData
          })
        }
      )
      const result = await response.json()

      if (result.success) {
        showAlert('Campaign updated successfully', 'success')
        fetchCampaign(admin_id)
        onStepClose()
      }
    } catch (error) {
      console.log(error)
      showAlert('failed to update campaign', 'error')
    }
  }

  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(false)
  const [bannerPreview, setBannerPreview] = useState(null)
  const [isCTAEnabled, setIsCTAEnabled] = useState(false)
 const handleBannerUpload = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result);
      setCampaignData((prev) => ({
        ...prev,
        banner: reader.result, // preview
        bannerFile: file,       // actual file
        fileName: file.name.split('.')[0], // or custom value
      }));
    };
    reader.readAsDataURL(file);
  }
};

  const handleToggleCTA = () => {
    setIsCTAEnabled(!isCTAEnabled)
    if (!isCTAEnabled) {
      setCampaignData(prev => ({
        ...prev,
        cta_label: '',
        cta_link: ''
      }))
    }
  }


  const [showData, setShowData] = useState(false);
  const onclickApply = () => {
    setShowData(true);
  }

  const {
    isOpen: isFileOpen,
    onOpen: onFileOpen,
    onClose: onFileClose
  } = useDisclosure()
  const [documents, setDocuments] = useState([])
  const [file, setFile] = useState({
    fileName: '',
    file: []
  })

  const fileInputRef = useRef()
  const handleFileChange = event => {
    setFile(prev => ({ ...prev, file: event.target.files[0] }))
  }

  const FileViewer = ({ selectedFile }) => {
    const [fileContent, setFileContent] = useState('')
    const [fileUrl, setFileUrl] = useState('')

    useEffect(() => {
      if (!selectedFile) {
        setFileContent('')
        setFileUrl('')
        return
      }

      const filePath = `${import.meta.env.VITE_BACKEND_URL}/documents/${selectedFile.name
        }`

      if (selectedFile.name.endsWith('.pdf')) {
        // Download and show PDF
        fetch(filePath)
          .then(res => res.blob())
          .then(blob => setFileUrl(URL.createObjectURL(blob)))
          .catch(() => setFileUrl(''))
      } else if (
        selectedFile.name.endsWith('.csv') ||
        selectedFile.name.endsWith('.txt')
      ) {
        // Fetch and show text-based files
        fetch(filePath)
          .then(res =>
            res.ok ? res.text() : Promise.reject('Failed to fetch')
          )
          .then(setFileContent)
          .catch(() => setFileContent('Error loading file.'))
      }
    }, [selectedFile])
  }

  // /getAllcontacts

  const handleFileSubmit = async () => {
    const formData = new FormData()
    formData.append('admin_id', admin_id)
    formData.append('fileName', file.fileName)
    formData.append('file', file.file)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contact/upload?fileName=${file.fileName
        }`,
        {
          method: 'POST',
          headers: {
            Authorization: token
          },
          body: formData
        }
      )

      const result = await response.json()
      if (result.success) {
        showAlert(result.success, 'success')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        setFile(null)
        // fetchAllDocuments()
        onFileClose()
      } else {
        showAlert(result.error, 'error')
      }
    } catch (error) {
      console.log(error)
      showAlert('Upload failed', 'error')
    }
  }

  const getContacts = async admin_id => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL
        }/contact/getAllcontacts?admin_id=${admin_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: token
          }
        }
      )
      const result = await response.json()
      // console.log("result", result)
      setDocuments(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getContacts(admin_id)
  }, [])

  // const[contactId,setContactId]=useState(null)

  const deleteContacts = async contact_id => {
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

  const statusColors = {
    Sent: '#001ABF',
    View: '#268901',
    Draft: '#686278',
    Pending: '#BFA300'
  }

  const statusBgColors = {
    Sent: '#CCD1F2',
    View: '#CCD1F2',
    Draft: '#CCD1F2',
    Pending: '#EFEAD2'
  }

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const handleCheckboxChange = (id) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
  const handleRowSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((val) => val !== id) : [...prev, id]
    );
  };
  const handleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((d) => d.id));
    }
  };
  const handleSendCampaign = async () => {
    const payload = {
      campaign_ids: selectedIds,
      contact_ids: selectedRowIds,
    };
    // console.log(payload)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign/send-campaign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        fetchCampaign(admin_id)
        onModalCloseSendCmp();
      } else {
        console.log("error")
      }
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <Card>
      <Flex
        w='100%'
        justifyContent='space-between'
        flexDirection={'column'}
        p='5px'
      >
        <Tabs>
          <TabList>
            <Tab color={'#FF5F35'}>
              <Text textColor={'#000'}>Campaign</Text>
            </Tab>
            <Tab color={'#FF5F35'}>
              <Text textColor={'#000'}>Contact List</Text>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex
                w='100%'
                alignItems={'center'}
                justifyContent='space-between'
                gap='10px'
              >
                <Text
                  fontWeight='var(--big-font-weight)'
                  fontSize='var(--semi-big)'
                >
                  Campaign
                </Text>
                <Flex gap={2}>
                  <Flex gap='5px' alignItems={'center'}>
                    <Input
                      h={'35px'}
                      htmlSize={20}
                      width='auto'
                      fontSize='var(--mini-text)'
                      fontWeight='var(--big-font-weight)'
                      placeholder='Search type'
                      value={filteredSectors}
                      onChange={e => setFilteredSectors(e.target.value)}
                    />
                    <Button
                      borderRadius='var(--radius)'
                      leftIcon={<IoMdAdd fontSize={'20px'} />}
                      _hover={{ bgColor: 'var(--active-bg)' }}
                      bgColor='var(--active-bg)'
                      color='#fff'
                      h={'35px'}
                      fontSize='var(--mini-text)'
                      fontWeight='var(--big-font-weight)'
                      onClick={onOpen}
                    >
                      Create Campaign
                    </Button>
                    <Button
                      borderRadius='var(--radius)'
                      leftIcon={<MdOutlineSendToMobile fontSize={'20px'} />}
                      _hover={{ bgColor: 'var(--active-bg)' }}
                      bgColor='var(--active-bg)'
                      color='#fff'
                      h={'35px'}
                      fontSize='var(--mini-text)'
                      fontWeight='var(--big-font-weight)'
                      onClick={onModalOpenSendCmp}
                    >
                      Send Campaign
                    </Button>
                  </Flex>

                </Flex>
              </Flex>

              <TableContainer
                mt='20px'
                width={'100%'}
                borderRadius='5px 5px 0px 0px'
              //  maxH={flag ? "unset" : "600px"}
              // overflowY={flag ? "unset" : "scroll"}
              >
                <Table size='sm' className='custom-striped-table'>
                  <Thead border='0.5px solid #FFF5F3'>
                    <Tr h='40px' bgColor='#FFF5F3'>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius='5px 0px 0px 0px'
                        fontSize='var(--mini-text)'
                      >
                        ID
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius=''
                        fontSize='var(--mini-text)'
                      >
                        channel
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius=''
                        fontSize='var(--mini-text)'
                      >
                        Campaign name
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius=''
                        fontSize='var(--mini-text)'
                      >
                        Template name
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius=''
                        fontSize='var(--mini-text)'
                      >
                        Template type
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius=''
                        fontSize='var(--mini-text)'
                      >
                        Sector
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius=''
                        fontSize='var(--mini-text)'
                      >
                        Start date
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius=''
                        fontSize='var(--mini-text)'
                      >
                        Status
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius='0px 5px 0px 0px'
                        fontSize='var(--mini-text)'
                      >
                        Actions
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {filteredData &&
                      filteredData.map((d, index) => {
                        const isPending = !d.ml_status || d.ml_status === null;
                        const statusLabel = isPending ? 'Pending' : d.ml_status;
                        return (
                          <Tr
                            key={index}
                            border='0.5px solid #F2F4F8'
                            h='40px'
                            textAlign='start'
                          >
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              C-{d.id}
                            </Td>

                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {d.channel_name}
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {d.campaign_name}
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {d.template_name}
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {d.template_type}
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {d.sname}
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {formatDate(d.created_at)}
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              <Box
                                bgColor={statusBgColors[statusLabel]}
                                p={1}
                                borderRadius='5px'
                                textAlign='center'
                              >
                                <Text color={statusColors[statusLabel]}>
                                  {statusLabel}
                                </Text>
                              </Box>
                            </Td>

                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                            >
                              <Flex gap={2}>
                                <Box
                                  bgColor={'#E7EAFB'}
                                  p={1}
                                  borderRadius={'5px'}
                                  cursor={'pointer'}
                                >
                                  <MdOutlineModeEdit
                                    size={20}
                                    color={'#3550FF'}
                                    onClick={() => editCampaign(d)}
                                  />
                                </Box>
                                <Box
                                  bgColor={'#F7E3E3'}
                                  p={1}
                                  borderRadius={'5px'}
                                  cursor={'pointer'}
                                >
                                  <RiDeleteBin6Line
                                    size={20}
                                    color={'#D50B0B'}
                                    onClick={() => openDeleteModal(d.id)}
                                  />
                                </Box>
                                <Box>
                                  <Link
                                    href={`http://localhost:2500/campaign/export/campaigns/csv/${d.id}`}
                                    isExternal
                                  >
                                    {/* <Button colorScheme="blue">Export Campaign</Button> */}
                                    <TbFileExport fontSize={'25px'} />
                                  </Link>
                                </Box>


                              </Flex>

                              {/* <Menu>
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
                            </Menu> */}
                            </Td>
                          </Tr>
                        )
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <Box
                p={4}
                bg={'#fff'}
                mt={4}
                borderRadius={'lg'}
                boxShadow={'md'}
              >
                <Button
                  borderRadius='var(--radius)'
                  leftIcon={<IoMdAdd fontSize={'20px'} />}
                  _hover={{ bgColor: 'var(--active-bg)' }}
                  bgColor='var(--active-bg)'
                  color='#fff'
                  fontSize='var(--mini-text)'
                  fontWeight='var(--big-font-weight)'
                  h={'35px'}
                  onClick={() => onFileOpen()}
                >
                  Add Documents
                </Button>
                {/* <SimpleGrid h={'100%'} mt={4} columns={{ base: 1, md: 5 }} gap={2}>
                  <GridItem colSpan={{ base: 1, md: 2 }}> */}
                <TableContainer
                  mt='20px'
                  width={'100%'}
                  borderRadius='5px 5px 0px 0px'
                >
                  <Table size='sm' className='custom-striped-table'>
                    <TableCaption>
                      DATA SETS UPLOADED FOR MODEL TRAINING
                    </TableCaption>
                    <Thead border='0.5px solid #FFF5F3'>
                      {documents.length === 0 ? (
                        <Tr h='40px' bgColor='#FFF5F3'>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius='5px 0px 0px 0px'
                            fontSize='var(--mini-text)'
                            border={'1px solid #b4b4b4'}
                            colSpan={'4'}
                            textAlign={'center'}
                          >
                            No Documents Uploaded
                          </Th>
                        </Tr>
                      ) : (
                        <Tr h='40px' bgColor='#FFF5F3'>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius='5px 0px 0px 0px'
                            fontSize='var(--mini-text)'
                          >
                            ID
                          </Th>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius=''
                            fontSize='var(--mini-text)'
                          >
                            File Name
                          </Th>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius=''
                            fontSize='var(--mini-text)'
                          >
                            name
                          </Th>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius=''
                            fontSize='var(--mini-text)'
                          >
                            phone
                          </Th>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius=''
                            fontSize='var(--mini-text)'
                          >
                            email
                          </Th>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius='0px 5px 5px 0px'
                            fontSize='var(--mini-text)'
                          >
                            Created At
                          </Th>
                          {/* <Th>Action</Th> */}
                        </Tr>
                      )}
                    </Thead>
                    <Tbody>
                      {documents?.map(item => (
                        <Tr fontSize={'14px'} cursor={'pointer'} key={item?.id}>
                          <Td>{item?.id}</Td>
                          <Td>{item?.name}</Td>
                          <Td>{item?.contact_name}</Td>
                          <Td>{item?.phone}</Td>
                          <Td>{item?.email}</Td>
                          <Td>{formatDate(item?.created_at)}</Td>
                          {/* <Td>
                              <Flex onClick={(e) => { e.stopPropagation(); deleteContacts(item.id) }} cursor={'pointer'} _hover={{ color: 'white', bg: 'red' }} color={'red'} justifyContent={'center'} alignItems={'center'} h={'20px'} w={'20px'} border={'1px solid red'} borderRadius={'full'}>
                                <DeleteIcon />
                              </Flex>
                            </Td> */}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                {/* </GridItem> */}

                {/* <FileViewer selectedFile={selectedFile} /> */}
                {/* </SimpleGrid> */}
              </Box>

              <Modal
                isOpen={isFileOpen}
                onClose={onFileClose}
                motionPreset='slideInBottom'
                isCentered
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Upload Files</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel>File Name</FormLabel>
                      <Input
                        name='fileName'
                        type='text'
                        onChange={e =>
                          setFile(prev => ({
                            ...prev,
                            fileName: e.target.value
                          }))
                        }
                        placeholder='File Name'
                      />
                    </FormControl>

                    {/* <FormControl mt={2}>
                      <Input
                        border={'none'}
                        p={0}
                        type='file'
                        name='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </FormControl> */}

                    {/* <FormControl isRequired mt={5}>
                      <FormLabel fontSize="var(--mini-text)" mb="2px">
                        Upload File
                      </FormLabel>
                      <Input
                        type="file"
                        id="icon-upload"
                        display="none"
                        ref={fileInputRef} onChange={handleFileChange}
                      />
                      <FormLabel
                        htmlFor="icon-upload"
                        cursor="pointer"
                        bg="#FF5722"
                        color="white"
                        px={4}
                        py={2}
                        borderRadius="md"
                        display="inline-flex"
                        alignItems="center"
                        gap={2}
                        fontSize="var(--text-12px)"
                        _hover={{ bg: '#FF5722' }}
                      >
                        <LuCloudUpload />
                        Upload File
                      </FormLabel>
                    </FormControl> */}

                    <FormControl isRequired mt={5}>
                      <FormLabel fontSize='var(--mini-text)' mb='2px'>
                        Upload File
                      </FormLabel>
                      <Input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        fontSize='var(--text-12px)'
                        colorScheme='orange'
                        sx={{
                          '::file-selector-button': {
                            backgroundColor: '#FF5722',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: 'var(--text-12px)'
                          },
                          '::file-selector-button:hover': {
                            backgroundColor: '#e64a19'
                          }
                        }}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      bg={'transparent'}
                      border='1px solid var(--active-bg)'
                      color='var(--active-bg)'
                      _hover='none '
                      w='100%'
                      size={'sm'}
                      mr={3}
                      onClick={onFileClose}
                    >
                      Close
                    </Button>
                    <Button
                      w='100%'
                      size={'sm'}
                      onClick={handleFileSubmit}
                      _hover={{ bgColor: 'var(--active-bg)' }}
                      bgColor='var(--active-bg)'
                      color='#fff'
                    >
                      Upload
                    </Button>
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
          <Modal isOpen={isStepOpen} onClose={onClose} size={'4xl'}>
            <ModalOverlay />
            <ModalContent pt={'2'}>
              <ModalCloseButton onClick={() => onClose()} />

              {activeStep === 0 && (
                <>
                  <Text
                    paddingLeft={'20px'}
                    fontSize={'22px'}
                    fontWeight={'semibold'}
                  >
                    Create a Campaign
                  </Text>
                  <Divider
                    my={3}
                    borderColor='gray.300'
                    borderWidth='1px'
                  ></Divider>
                </>
              )}
              <Text fontSize={'18px'}></Text>
              <Stepper
                px='5%'
                index={activeStep}
                mb={6}
                mt={5}
                size='sm'
                colorScheme='orange'
              >
                {steps.map((step, index) => (
                  <Step key={index} gap={0}>
                    <Flex flexDirection='column' alignItems='center'>
                      <StepIndicator
                        sx={{
                          bg: activeStep === index ? '#FF5722' : undefined,
                          borderColor: '#FF5722',
                          color: 'white'
                        }}
                      >
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>
                      <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        {/* <StepDescription>{step.description}</StepDescription> */}
                      </Box>
                    </Flex>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>

              <ModalBody>
                {activeStep === 0 && (
                  <Box>
                    <Text fontWeight='bold' mb={3}>
                      Standard
                    </Text>
                    <Text fontSize='sm' color='gray.600' mb={4}>
                      Create a one-off campaign from scratch.
                    </Text>

                    <Grid
                      templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
                      gap={4}
                      mb={8}
                    >
                      <Box
                        borderWidth='1px'
                        borderRadius='md'
                        textAlign='center'
                        cursor='pointer'
                      >
                        <Box bgColor={'lightcyan'}>
                          <Image
                            src='https://img.icons8.com/color/96/000000/secured-letter.png'
                            mx='auto'
                            mb={2}
                          />
                        </Box>
                        <Text padding={'4'}>Email</Text>
                      </Box>

                      <Box
                        borderWidth='1px'
                        borderRadius='md'
                        textAlign='center'
                        position='relative'
                        cursor='pointer'
                        onClick={() => {
                          setCampaignData(prev => ({
                            ...prev,
                            channel_name: 'WhatsApp'
                          }))
                          goToNext() // move to next step after setting value
                        }}
                      >
                        <Box bgColor={'lightcyan'}>
                          <Image
                            src='https://img.icons8.com/color/96/000000/whatsapp--v1.png'
                            mx='auto'
                            mb={2}
                          />
                        </Box>

                        <Text padding={'4'}>WhatsApp</Text>
                      </Box>

                      <Box
                        borderWidth='1px'
                        borderRadius='md'
                        textAlign='center'
                        cursor='pointer'
                      >
                        <Box bgColor={'lightcyan'}>
                          <Image
                            src='https://img.icons8.com/color/96/000000/sms.png'
                            mx='auto'
                            mb={2}
                          />
                        </Box>
                        <Text padding={'4'}>SMS</Text>
                      </Box>

                      <Box
                        borderWidth='1px'
                        borderRadius='md'
                        textAlign='center'
                        position='relative'
                        cursor='pointer'
                      >
                        <Box bgColor={'lightcyan'}>
                          <Image
                            src='https://img.icons8.com/color/96/000000/appointment-reminders--v1.png'
                            mx='auto'
                            mb={2}
                          />
                        </Box>

                        <Text padding={'4'}>Web Push</Text>
                      </Box>
                    </Grid>
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box width='100%' maxW='600px' mx='auto' textAlign='left'>
                    <Box fontSize='24px' fontWeight='bold' mb='3'>
                      Create a WhatsApp campaign
                    </Box>
                    <Box fontSize='14px' color='gray.600' mb='8'>
                      Reach out to your customers on WhatsApp. Share important
                      news, promote products, announce an event.
                    </Box>
                    <Box
                      textAlign='left'
                      fontWeight='semibold'
                      mb='2'
                      fontSize='14px'
                    >
                      How will you name your campaign?{' '}
                      <span style={{ fontWeight: 'normal' }}>
                        (only you can see it)
                      </span>
                    </Box>
                    <Input
                      placeholder='Type the name of your campaign'
                      fontSize='14px'
                      mb='6'
                      borderColor='gray.300'
                      name='campaign_name'
                      value={campaignData.campaign_name}
                      onChange={handleChange}
                    // borderRadius={'5px'}
                    />
                    <Flex justifyContent='center' gap='4'>
                      <Button
                        onClick={goToPrevious}
                        type='button'
                        size={'sm'}
                        fontSize={'13px'}
                        border={'1px solid #FF5722 '}
                        textColor={'#FF5722'}
                        bgColor={'white'}
                        mr={3}
                        _hover={''}
                        w='100%'
                      >
                        Discard
                      </Button>
                      <Button
                        w='100%'
                        fontSize={'13px'}
                        bgColor={'#FF5722'}
                        _hover={''}
                        textColor={'white'}
                        size={'sm'}
                        onClick={goToNext}
                      >
                        {selectedCampaign ? 'Update' : 'Start'}
                      </Button>
                    </Flex>
                  </Box>
                )}

                {activeStep === 2 && (
                  <Box
                    width='100%'
                    maxW='600px'
                    mx='auto'
                    position={'relative'}
                    zIndex={10}
                  >
                    <Flex
                      justifyContent='space-between'
                      alignItems='center'
                      mb='6'
                    >
                      <Flex alignItems='center' gap='2'>
                        <Text onClick={goToPrevious}>
                          <HiOutlineArrowSmLeft />
                        </Text>

                        <Text fontSize='20px' fontWeight='bold'>
                          marworx
                        </Text>
                        <Badge
                          colorScheme='purple'
                          variant='subtle'
                          fontSize='12px'
                        >
                          Draft
                        </Badge>
                      </Flex>
                      <Button
                        fontSize={'13px'}
                        bgColor={'#FF5722'}
                        _hover={''}
                        textColor={'white'}
                        size={'sm'}
                        // borderRadius={'full'}
                        onClick={onStepClose}
                      >
                        Schedule
                      </Button>
                    </Flex>

                    <Box
                      border='1px solid #E2E8F0'
                      borderRadius='10px'
                      overflow='hidden'
                    >
                      <Flex
                        p='4'
                        justifyContent='space-between'
                        borderBottom='1px solid #E2E8F0'
                      >
                        <Box>
                          <Text fontWeight='bold'>From</Text>
                          <Text fontSize='sm' color='gray.500'>
                            Choose WhatsApp Business account.
                          </Text>
                        </Box>
                        <Button
                          variant='outline'
                          size='sm'
                        //  borderRadius='full'
                        >
                          Edit
                        </Button>
                      </Flex>

                      <Flex
                        p='4'
                        justifyContent='space-between'
                        borderBottom='1px solid #E2E8F0'
                      >
                        <Box>
                          <Text fontWeight='bold'>To</Text>
                          <Select
                            name='to'
                            value={campaignData.to}
                            onChange={handleChange}
                            placeholder='select contact'
                            cursor={'not-allowed'}
                          >
                            {/* {documents.map((d, index) => (
                              <option key={index} value={d.contact_name}>
                                {d.contact_name}
                              </option>
                            ))} */}
                          </Select>
                          {/* <Text fontSize="sm" color="gray.500">Select a list of recipients</Text> */}
                        </Box>
                        <Button
                          variant='outline'
                          size='sm'
                        // borderRadius='full'
                        >
                          Edit
                        </Button>
                      </Flex>

                      <Flex p='4' justifyContent='space-between'>
                        <Box>
                          <Text fontWeight='bold'>Message Content</Text>
                          <Text fontSize='sm' color='gray.500'>
                            Start a new design or select existing
                          </Text>
                        </Box>
                        <Button
                          colorScheme='gray'
                          // borderRadius='full'
                          onClick={onDrawerOpen}
                          type='button'
                          size={'sm'}
                          fontSize={'13px'}
                          border={'1px solid #FF5722 '}
                          textColor={'#FF5722'}
                          bgColor={'white'}
                          mr={3}
                          _hover={''}
                        >
                          Start Creating
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                )}
                <Drawer
                  isOpen={isDrawerOpen}
                  placement='right'
                  onClose={onDrawerClose}
                  size={'sm'}
                  position={'absolute'}
                  zIndex={100}
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader> Message Content</DrawerHeader>

                    <DrawerBody>
                      <Box>
                        <Tabs isFitted variant='enclosed'>
                          <TabList
                            bg='gray.200'
                            p='2px'
                            borderRadius='md'
                            width='100%'
                            mx='auto'
                          >
                            <Tab
                              _selected={{
                                bg: 'white',
                                fontWeight: 'bold',
                                borderRadius: 'md'
                              }}
                              fontSize='14px'
                            >
                              Use Template
                            </Tab>
                            <Tab
                              _selected={{
                                bg: 'white',
                                fontWeight: 'bold',
                                borderRadius: 'md'
                              }}
                              fontSize='14px'
                            >
                              Start from Scratch
                            </Tab>
                          </TabList>

                          <TabPanels>
                            {/* Tab 1 Panel */}
                            <TabPanel>
                              <Flex direction='column' gap={3}>
                                <Text fontSize='sm'>
                                  Choose the template that you want to reuse.
                                  Note that the templates that were already
                                  approved cannot be edited.
                                </Text>
                                <FormControl>
                                  <Select
                                    placeholder='Select a template'
                                  // borderRadius='full'
                                  >
                                    <option value='template'>abc</option>
                                  </Select>
                                </FormControl>
                              </Flex>
                            </TabPanel>

                            {/* Tab 2 Panel */}
                            <TabPanel>
                              <Flex
                                direction='column'
                                justify='space-between'
                                height='370px'
                              >
                                <Text fontSize='14px'>
                                  Meta will review new messages before you can
                                  send them.
                                </Text>
                                <Flex justify='flex-end'>
                                  <Button
                                    onClick={onModalOpen}
                                    fontSize='13px'
                                    bgColor='#FF5722'
                                    _hover={{ bgColor: '#e64a19' }}
                                    textColor='white'
                                    size='sm'
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

                <Modal isOpen={isModalOpen} onClose={onModalClose} size={'2xl'}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box
                        width='100%'
                        maxW='500px'
                        mx='auto'
                        textAlign='left'
                        mb={'14px'}
                      >
                        <Heading fontSize='20px' mb={4}>
                          Create a WhatsApp template
                        </Heading>
                        <Text color={'gray.600'} fontSize={'15px'}>
                          Design a WhatsApp message template that can be used
                          for your WhatsApp campaigns or Transactional sendings.
                          A template needs to be submitted for approval to Meta
                          before it can be sent.
                        </Text>
                        {/* {console.log(sectors)} */}
                        <Box display={'flex'} flexDirection={'column'}>
                          <FormControl mt={7} isRequired>
                            <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Sector</FormLabel>
                            <Select fontSize="var(--text-12px)" name="sector_id" placeholder="Select sector" value={campaignData.sector_id} onChange={handleChange}>
                              {sectors.map((sector) => (
                                <option value={sector.id} key={sector.id}>{sector.name}</option>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl mt={5} isRequired>
                            <FormLabel fontSize='var(--mini-text)' mb={'2px'}>
                              Template Name
                            </FormLabel>
                            <Input
                              name='template_name'
                              value={campaignData.template_name}
                              onChange={handleChange}
                              placeholder='Type the name of your template'
                              fontSize='var(--text-12px)'
                            />
                          </FormControl>
                          <FormControl mt={5} isRequired>
                            <FormLabel fontSize='var(--mini-text)' mb={'2px'}>
                              Template type
                            </FormLabel>
                            <Select
                              fontSize='var(--text-12px)'
                              name='template_type'
                              value={campaignData.template_type}
                              onChange={handleChange}
                            >
                              <option value='Campaign_boost_tips	'>Campaign boost tips	</option>
                              <option value='marketing '>Marketting</option>
                              <option value='Schedule_meeting_followup	'>Schedule meeting_followup	 </option>
                              <option value='Thank_you_interest	'>Thank you interest	 </option>
                              <option value='Lead_generation_help	'>Lead generation help	 </option>
                              <option value='Schedule_meeting_followup	'>Schedule meeting followup	 </option>
                            </Select>
                            <FormHelperText>
                              Choose Marketing for promotional communication and
                              Utility for informational messages.
                            </FormHelperText>
                          </FormControl>
                          <FormControl mt={5} isRequired>
                            <FormLabel fontSize='var(--mini-text)' mb={'2px'}>
                              Template language
                            </FormLabel>
                            <Select
                              name='template_lang'
                              value={campaignData.template_lang}
                              onChange={handleChange}
                              placeholder='Choose a language'
                              fontSize='var(--text-12px)'
                            >
                              <option value='english'>English</option>
                              <option value='hindi'>Hindi</option>
                              <option value='marathi'>Marathi</option>
                            </Select>
                          </FormControl>
                          <Flex justifyContent='center' gap='4' mt={'12px'}>
                            <Button
                              w='100%'
                              onClick={() => {
                                setCampaignData({
                                  sector_id: '',
                                  template_name: '',
                                  template_type: '',
                                  template_lang: ''
                                }),
                                  onModalClose()
                              }}
                              type='button'
                              size={'sm'}
                              fontSize={'13px'}
                              border={'1px solid #FF5722 '}
                              textColor={'#FF5722'}
                              bgColor={'white'}
                              mr={3}
                              _hover={''}
                            >
                              Discard
                            </Button>
                            <Button
                              w='100%'
                              fontSize={'13px'}
                              bgColor={'#FF5722'}
                              _hover={''}
                              textColor={'white'}
                              size={'sm'}
                              onClick={closemessage}
                            >
                              Start
                            </Button>
                          </Flex>
                        </Box>
                      </Box>
                    </ModalBody>
                  </ModalContent>
                </Modal>

                {activeStep === 3 && (
                  <Box ml={'-28px'}>
                    <Box width='100%' p={'5px'} mx='auto'>
                      <Flex
                        w={'100%'}
                        justifyContent='space-between'
                        alignItems='start'
                        mb='1'
                        mt={'24px'}
                      >
                        <Flex alignItems='center' gap='2'>
                          <FcBiohazard size={30} />
                          Sales
                        </Flex>
                        <Flex mb='2' maxW='73%' w='100%'>
                          {/* <Button color={"#805ad5"} variant='ghost' gap={1}>Settings</Button> */}
                          <Button
                            w='100%'
                            type='button'
                            onClick={goToPrevious}
                            fontSize='var(--mini-text)'
                            size={'sm'}
                            border={'1px solid #FF5722 '}
                            textColor={'#FF5722'}
                            bgColor={'white'}
                            mr={3}
                            _hover={''}
                          >
                            Discard
                          </Button>

                          <Button
                            w='100%'
                            onClick={
                              selectedCampaign ? updateCampaign : saveCampaign
                            }
                            fontSize='var(--mini-text)'
                            bgColor={'#FF5722'}
                            _hover={''}
                            textColor={'white'}
                            size={'sm'}
                          >
                            {' '}
                            {selectedCampaign ? 'Update' : 'Save'}
                          </Button>
                        </Flex>
                      </Flex>

                      <Divider borderColor={'black'} />
                      <Flex w={'100%'}>
                        <Flex
                          flexDirection={'column'}
                          borderRight={'1px solid black'}
                        >
                          <Flex mt={5} mb={5} direction={'column'}>
                            {/* Banner Section */}
                            <Box display={'flex'} px={'5px'} mb={3}>
                              <Box w={'full'}>
                                <Heading fontSize={'20px'}>Banner</Heading>
                              </Box>
                              <Box>
                                <Switch
                                  id='banner-toggle'
                                  isChecked={isBannerVisible}
                                  onChange={() => setIsBannerVisible(!isBannerVisible)}
                                />
                              </Box>
                            </Box>

                            {isBannerVisible && (
                              <Box px={5} mb={4}>
                                <Input
                                  type='file'
                                  accept='image/*'
                                  onChange={handleBannerUpload}
                                  mb={3}
                                />
                                {bannerPreview ? (
                                  <Image
                                    src={bannerPreview}
                                    alt='Banner Preview'
                                    maxH='200px'
                                    objectFit='cover'
                                    borderRadius='md'
                                    border='1px solid #ccc'
                                  />
                                ) : (
                                  <Text fontSize='sm' color='gray.500'>
                                    No banner uploaded yet.
                                  </Text>
                                )}
                              </Box>
                            )}
                            <Divider />

                            {/* Header Section */}
                            <Box display={'flex'} px={'5px'}>
                              <Box w={'full'}>
                                <Heading fontSize={'20px'}>Header</Heading>
                              </Box>
                              <Box>
                                <Switch
                                  id='header-toggle'
                                  isChecked={isHeaderVisible}
                                  onChange={() => setIsHeaderVisible(!isHeaderVisible)}
                                />
                              </Box>
                            </Box>

                            {isHeaderVisible && (
                              <Box px={5} mb={4}>
                                <Input
                                  type='text'
                                  name='header'
                                  value={campaignData.header}
                                  onChange={handleChange}
                                  // mx={6}
                                  mt={3}
                                />
                              </Box>
                            )}
                          </Flex>
                          <Divider borderColor={'black'} />
                          <Flex
                            alignItems={'center'}
                            mt={5}
                            mb={5}
                            px={5}
                            flexDirection={'column'}
                          >
                            <Heading alignSelf={'flex-start'} fontSize={'20px'}>
                              Body
                            </Heading>
                            <Textarea
                              name='body'
                              value={campaignData.body}
                              onChange={handleChange}
                              mt={5}
                              placeholder='Enter body text here'
                            ></Textarea>
                          </Flex>
                          <Divider borderColor={'black'} />
                          <Flex justifyContent='space-between' px='5px' alignItems='center' mt={5} mb={3}>
                            <Heading fontSize='20px'> Button</Heading>
                            <Switch id='cta-toggle' isChecked={isCTAEnabled} onChange={handleToggleCTA} />
                          </Flex>

                          {isCTAEnabled && (
                            <Box px={5} mb={4}>
                              <Text fontWeight='semibold' mb={1}> Label</Text>
                              <Input
                                placeholder="Enter button name"
                                name="cta_label"
                                value={campaignData.cta_label || ''}
                                onChange={handleChange}
                                mb={3}
                              />
                              <Text fontWeight='semibold' mb={1}> Link</Text>
                              <Input
                                placeholder="Enter button link"
                                name="cta_link"
                                value={campaignData.cta_link || ''}
                                onChange={handleChange}
                              />
                            </Box>
                          )}
                          <Flex justifyContent={'space-between'} mt={10}
                            px={'5px'}
                            alignItems={'center'}>
                            <Button
                              size={'sm'}
                              width={'50%'}
                              onClick={onclickApply}
                              _hover={{ bgColor: 'var(--active-bg)' }}
                              bgColor='var(--active-bg)'
                              color='#fff'
                            >
                              Apply
                            </Button>
                          </Flex>
                        </Flex>

                        <Flex
                          w={'70%'}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >
                          <Flex
                            w={'250px'}
                            h={'400px'}
                            mt={10}
                            border={'1px solid #ccc'}
                            borderRadius={'10px'}
                            flexDir={'column'}
                          >
                            <Flex
                              p={1}
                              gap={2}
                              w={'100%'}
                              height={'15%'}
                              bg={'gray.200'}
                              borderTopRadius={'10px'}
                              alignItems={'flex-start'}
                            >
                              <Flex
                                w={'100%'}
                                alignItems={'center'}
                                justifyContent={'space-between'}
                              >
                                <Avatar
                                  name='Segun Adebayo'
                                  src='https://bit.ly/broken-link'
                                />
                                <Flex flexDir={'column'}>
                                  <Text> Segun Adebayo</Text>
                                  <Text fontSize={'12px'}>online</Text>
                                </Flex>
                                <CiVideoOn size={20} />
                                <IoCallOutline size={20} />
                              </Flex>
                            </Flex>
                            <Flex position="relative" w="100%" h="auto">
                              <Image
                                w="100%"
                                h="72%"
                                objectFit="cover"
                                src='https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'
                              />
                             

                              {showData && (
                                <Box
                                  position="absolute"
                                  top={isBannerVisible ? '37%' : '10%'}
                                  left="50%"
                                  transform="translate(-50%, -50%)"
                                  textAlign='justify'
                                  w="80%"
                                >
                                 {showData && isBannerVisible && bannerPreview && (
                                <Image
                                  w="100%"
                                  h="200px"
                                  objectFit="cover"
                                  src={bannerPreview}
                                  alt="Banner Preview"
                                  borderRadius="md"
                                />
                              )}
                                  {/* Show header if enabled */}
                                  {isHeaderVisible && campaignData.header && (
                                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                                      {campaignData.header}
                                    </Text>
                                  )}

                                  {/* Body Text */}
                                  {campaignData.body && (
                                    <Text fontSize="sm" color="gray.700" mb={3}>
                                      {campaignData.body}
                                    </Text>
                                  )}

                                  {/* CTA Button if enabled */}
                                  {isCTAEnabled && campaignData.cta_label && (
                                    <Button
                                      size="sm"
                                      colorScheme="blue"
                                      as="a"
                                      href={campaignData.cta_link}
                                      target="_blank"
                                    >
                                      {campaignData.cta_label}
                                    </Button>
                                  )}
                                </Box>
                              )}
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
            <ModalHeader fontSize='16px' textAlign={'center'}>
              {' '}
              Delete Campaign
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign={'center'}>
              <Text
                fontSize='var( --text-12px)'
                fontWeight='var(--big-font-weight)'
              >
                Are you sure you want to delete this Campaign?
              </Text>
            </ModalBody>
            <ModalFooter
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={'6px'}
            >
              <Button
                onClick={() => deleteCampaign()}
                fontSize='var(--mini-text)'
                bgColor={'#FF5722'}
                _hover={''}
                textColor={'white'}
                size={'sm'}
              >
                Delete
              </Button>
              <Button
                onClick={() => onDeleteClose()}
                type='button'
                fontSize='var(--mini-text)'
                size={'sm'}
                border={'1px solid #FF5722 '}
                textColor={'#FF5722'}
                bgColor={'white'}
                mr={3}
                _hover={''}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Modal isOpen={isModalSendCmp} onClose={onModalCloseSendCmp} size='2xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <Tabs>
            <TabList>
              <Tab>Contact List</Tab>
              <Tab>Campaign</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableContainer
                  mt='20px'
                  width={'100%'}
                  borderRadius='5px 5px 0px 0px'
                >
                  <Table size='sm' className='custom-striped-table'>
                    <TableCaption>
                      DATA SETS UPLOADED FOR MODEL TRAINING
                    </TableCaption>
                    <Thead border='0.5px solid #FFF5F3'>
                      {documents.length === 0 ? (
                        <Tr h='40px' bgColor='#FFF5F3'>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius='5px 0px 0px 0px'
                            fontSize='var(--mini-text)'
                            border={'1px solid #b4b4b4'}
                            colSpan={'4'}
                            textAlign={'center'}
                          >
                            No Documents Uploaded
                          </Th>
                        </Tr>
                      ) : (
                        <Tr h='40px' bgColor='#FFF5F3' >
                          <Th>
                            <Checkbox
                              isChecked={selectedRowIds.length === documents.length}
                              isIndeterminate={
                                selectedRowIds.length > 0 &&
                                selectedRowIds.length < documents.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRowIds(documents.map((doc) => doc.id));
                                } else {
                                  setSelectedRowIds([]);
                                }
                              }}
                            />
                          </Th>

                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius='5px 0px 0px 0px'
                            fontSize='var(--mini-text)'
                          >
                            ID
                          </Th>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius=''
                            fontSize='var(--mini-text)'
                          >
                            name
                          </Th>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius=''
                            fontSize='var(--mini-text)'
                          >
                            phone
                          </Th>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius=''
                            fontSize='var(--mini-text)'
                          >
                            email
                          </Th>
                          <Th
                            fontWeight='var(--big-font-weight)'
                            color='var(--text-black)'
                            borderRadius='0px 5px 5px 0px'
                            fontSize='var(--mini-text)'
                          >
                            Created At
                          </Th>
                          {/* <Th>Action</Th> */}
                        </Tr>
                      )}
                    </Thead>
                    <Tbody>
                      {documents?.map(item => (
                        <Tr fontSize={'14px'}
                          cursor={'pointer'}
                          key={item?.id}
                        >
                          <Td>
                            <Checkbox
                              isChecked={selectedRowIds.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                            /></Td>
                          <Td>{item?.id}</Td>
                          <Td>{item?.contact_name}</Td>
                          <Td>{item?.phone}</Td>
                          <Td>{item?.email}</Td>
                          <Td>{formatDate(item?.created_at)}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer
                  mt='20px'
                  width={'100%'}
                  borderRadius='5px 5px 0px 0px' >
                  <Table size='sm' className='custom-striped-table'>
                    <Thead border='0.5px solid #FFF5F3'>
                      <Tr h='40px' bgColor='#FFF5F3'>
                        <Th>
                          <Checkbox
                            isChecked={selectedIds.length === filteredData.length}
                            isIndeterminate={
                              selectedIds.length > 0 && selectedIds.length < filteredData.length
                            }
                            onChange={handleSelectAll}
                          />
                        </Th>
                        <Th
                          fontWeight='var(--big-font-weight)'
                          color='var(--text-black)'
                          borderRadius='5px 0px 0px 0px'
                          fontSize='var(--mini-text)'
                        >
                          ID
                        </Th>
                        <Th
                          fontWeight='var(--big-font-weight)'
                          color='var(--text-black)'
                          borderRadius=''
                          fontSize='var(--mini-text)'
                        >
                          channel
                        </Th>
                        <Th
                          fontWeight='var(--big-font-weight)'
                          color='var(--text-black)'
                          borderRadius=''
                          fontSize='var(--mini-text)'
                        >
                          Campaign name
                        </Th>
                        <Th
                          fontWeight='var(--big-font-weight)'
                          color='var(--text-black)'
                          borderRadius=''
                          fontSize='var(--mini-text)'
                        >
                          Template name
                        </Th>
                        <Th
                          fontWeight='var(--big-font-weight)'
                          color='var(--text-black)'
                          borderRadius=''
                          fontSize='var(--mini-text)'
                        >
                          Template type
                        </Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {filteredData &&
                        filteredData.map((d, index) => (
                          <Tr
                            key={index}
                            border='0.5px solid #F2F4F8'
                            h='40px'
                            textAlign='start'
                          >
                            <Td>
                              <Checkbox
                                isChecked={selectedIds.includes(d.id)}
                                onChange={() => handleRowSelect(d.id)}
                              />
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              C-{d.id}
                            </Td>

                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {d.channel_name}
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {d.campaign_name}
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {d.template_name}
                            </Td>
                            <Td
                              border='0.5px solid #F2F4F8'
                              color={'#404040'}
                              fontSize='var(--mini-text)'
                              fontWeight='var(--big-font-weight)'
                            >
                              {d.template_type}
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex flexDirection={'column'} justifyContent={'space-between'} >
            {selectedRowIds.length > 0 && (
              <Box mt={4}>
                <Heading fontSize="md" mb={2}>Selected Contact:</Heading>
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th>Phone</Th>
                      <Th>Email</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {documents
                      .filter((doc) => selectedRowIds.includes(doc.id))
                      .map((row) => (
                        <Tr key={row.id}>
                          <Td>{row.id}</Td>
                          <Td>{row.contact_name}</Td>
                          <Td>{row.phone}</Td>
                          <Td>{row.email}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Box>
            )}
            {selectedIds.length > 0 && (
              <Box mt={4}>
                <Text fontWeight="bold" mb={2}>
                  Selected Campaign:
                </Text>
                <TableContainer>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Channel</Th>
                        <Th>Campaign</Th>
                        <Th>Template</Th>
                        <Th>Type</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredData
                        .filter((d) => selectedIds.includes(d.id))
                        .map((item) => (
                          <Tr key={item.id}>
                            <Td>C-{item.id}</Td>
                            <Td>{item.channel_name}</Td>
                            <Td>{item.campaign_name}</Td>
                            <Td>{item.template_name}</Td>
                            <Td>{item.template_type}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            )}

          </Flex>
          <Box textAlign={'center'} p={1}>
            {selectedIds.length > 0 && selectedRowIds.length > 0 && (
              <Button
                mt={4}
                _hover={{ bgColor: 'var(--active-bg)' }}
                bgColor='var(--active-bg)'
                color='#fff'
                onClick={handleSendCampaign}
              >
                Send Campaign
              </Button>
            )}
          </Box>
        </ModalContent>
      </Modal>

    </Card>
  )
}

export default Campaign
