import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { RiRobot2Fill } from 'react-icons/ri'
import { AppContext } from '../../context/AppContext'
import { IoIosSend } from 'react-icons/io'
import { DeleteIcon } from '@chakra-ui/icons'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { useLocation } from 'react-router-dom'
import { decrypt } from '../../utils/security'
import { FaUserCircle, FaUsers } from 'react-icons/fa'
import { HiMiniUsers } from 'react-icons/hi2'


import { PieSectorWiseBots, BarChartTopBotAndCampaigan, PieSectorWisesectorGenAi, EngagementBarChart, MonthlyActiveUser } from '../../admin/Chart'

const AdminDashboard = () => {
  const { showAlert, formatDate, fetchSectorBots, sectorBots, sectorGenAi, fetchMetrics, metrics, months, botData, campaignData, fetchMonthlyMetrics, getbotcampaigns, botcampaigns, getActiveUser, activeUser } = useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dashboardData, setDashboardData] = useState({})
  const [documents, setDocuments] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const location = useLocation()
  const user = localStorage.getItem('user')
  const admin_id = decrypt(user).id
  const user_role = decrypt(user).role
  const token = localStorage.getItem('token');

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getAllDashboardData`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
          }
        }
      )

      const result = await response.json()

      if (result.success) {
        setDashboardData(result.counts)
      } else {
        showAlert(response.error, 'error')
      }
    } catch (error) {
      console.log(error)
      showAlert('Internal Server Error', 'error')
    }
  }, [showAlert])

  const fetchAllDocuments = useCallback(
    async admin_id => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL
          }/documents/getAllDocuments?admin_id=${admin_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token')
            }
          }
        )

        const result = await response.json()
        if (result.success) {
          setDocuments(result.data)
        } else {
          showAlert(response.error, 'error')
        }
      } catch (error) {
        console.log(error)
        showAlert('Internal Server Error', 'error')
      }
    },
    [showAlert]
  )

  useEffect(() => {
    fetchDashboardData()
    fetchAllDocuments(admin_id)
    fetchSectorBots(admin_id);
    fetchMetrics(admin_id);
    fetchMonthlyMetrics();
    getbotcampaigns();
    getActiveUser();
  }, [fetchDashboardData, fetchAllDocuments, fetchMetrics, admin_id])

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState({
    fileName: '',
    file: []
  })
  const fileInputRef = useRef()
  const handleFileChange = event => {
    setFile(prev => ({ ...prev, file: event.target.files[0] }))
  }

  const handleFileSubmit = async () => {
    const formData = new FormData()
    formData.append('admin_id', admin_id)
    formData.append('file', file.file)
    formData.append('fileName', file.fileName)
    formData.append('sector_id', 1)
    formData.append('bot_type', 'Genarative ai')
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL
        }/documents/uploadDocument?fileName=${file.fileName}`,
        {
          method: 'POST',
          headers: {
            Authorization: `${localStorage.getItem('token')}`
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
        fetchAllDocuments(admin_id)
        onClose()
      } else {
        showAlert(result.error, 'error')
      }
    } catch (error) {
      console.log(error)
      showAlert('Upload failed', 'error')
    }
  }

  const handleDeleteDocument = async id => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL
        }/documents/deleteDocument?document_id=${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        }
      )

      const result = await response.json()
      if (result.success) {
        showAlert(result.success, 'success')
        fetchAllDocuments(admin_id)
      } else {
        showAlert(result.error, 'error')
      }
    } catch (error) {
      console.log(error)
      showAlert('Upload failed', 'error')
    }
  }

  //sector wise bots





  // const [data,setData]=useState([]);

  //   const fetchEngagementData = async () => {
  //     try {
  //       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/botcampaigns-by-clicks`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: token,
  //         },
  //       });

  //       const response = await res.json();
  //       console.log("response", response)
  //       if (response.success && response.data) {
  //         setData(response.data.map((item, index) => ({
  //           name: `Bot ${index + 1}`,
  //           clickThroughRate: item.click_through_rate,
  //           completionRate: item.completion_rate,
  //         })));
  //       }
  //     } catch (err) {
  //       console.error('Error fetching chart data:', err);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchEngagementData();
  //   }, [])

  // const [topBots, setTopBots] = useState([]);
  // const fetchTopPerformer = async () => {
  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/top-performing-bots`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': token
  //       }
  //     })
  //     const response = await res.json();
  //     setTopBots(response.data);
  //     // setTopCampaigns(topRes.data.topCampaigns);
  //     // setEngagement(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchTopPerformer()
  // }, [])
  // const Botdata = {
  //   labels: topBots.map((bot) => bot?.bot_name || 'N/A'), // replace `name` with the correct bot name field
  //   datasets: [
  //     {
  //       label: 'Bot Performance',
  //       data: topBots.map((bot) => bot?.total_users || 0), // replace `score` with your performance metric
  //       backgroundColor: 'rgba(75,192,192,1)',
  //       borderColor: 'rgba(75,192,192,0.2)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const botoptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: { position: 'top' },
  //     title: { display: true, text: 'Top Performing Bots' },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };


  // const [topCampaigns, setTopCampaigns] = useState([]);
  // const fetchTopCampaigns = async () => {
  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/top-performing-campaigns`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': token
  //       }
  //     })
  //     const response = await res.json();
  //     console.log(response.data)
  //     setTopCampaigns(response.data);
  //     // setTopCampaigns(topRes.data.topCampaigns);
  //     // setEngagement(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchTopCampaigns();
  // }, [])

  // const Campaigndata = {
  //   labels: topCampaigns.map((camp) => camp?.name || 'N/A'),
  //   datasets: [
  //     {
  //       label: 'Campaign Performance',
  //       data: topCampaigns.map((camp) => camp?.total_users || 0), // replace `score` with your performance metric
  //       backgroundColor: 'rgba(75,192,192,1)',
  //       borderColor: 'rgba(75,192,192,0.2)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const campaignoptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: { position: 'top' },
  //     title: { display: true, text: 'Top Performing Camapigns' },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  // console.log(activeUser)


  return (
    <Flex flexDirection='column' w='100%' h='100%' pt={'20px'} >

      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        {user_role === 'Admin' && (
          <>
            <GridItem
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              p={4}
              bg='#f8f3ff'
              borderRadius={'10px'}
              boxShadow={'lg'}
            >
              <Flex flexDir={'column'}>
                <Text fontSize={'20px'}>
                  {metrics.activeBots}
                </Text>
                <Text
                  color={'#a4a4a4'}
                  fontSize={{ base: '12px', md: '14px' }}
                >
                  Number of Active Bots
                </Text>
              </Flex>
              <Box p={2} borderRadius={'full'} bg={'#9726fb59'}>
                <Text
                  fontSize={{ base: '18px', md: '24px' }}
                  color={'#490287'}
                >
                  <RiRobot2Fill />
                </Text>
              </Box>
            </GridItem>

            <GridItem
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              p={4}
              bg='#FFFDF2'
              borderRadius={'10px'}
              boxShadow={'lg'}
            >
              <Flex flexDir={'column'}>
                <Text fontSize={'20px'}>{metrics.campaignsSent}</Text>
                <Text
                  color={'#a4a4a4'}
                  fontSize={{ base: '12px', md: '14px' }}
                >
                  Number of campaigns sent
                </Text>
              </Flex>


              <Box p={2} borderRadius={'full'} bg={'#fbcf2659'}>
                <Text
                  fontSize={{ base: '18px', md: '24px' }}
                  color={'#db7100'}
                >
                  <IoIosSend />{' '}
                </Text>
              </Box>
            </GridItem>
          </>
        )}

        {user_role === 'Super-Admin' && (
          <>
            <GridItem
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              p={4}
              bg='#F8F3FF'
              borderRadius={'10px'}
              boxShadow={'lg'}
            >
              <Flex flexDir={'column'}>
                <Text fontSize={'20px'}>{dashboardData.total_admin}</Text>
                <Text
                  color={'#a4a4a4'}
                  fontSize={{ base: '12px', md: '14px' }}
                >
                  Number of Admin
                </Text>
              </Flex>
              <Box p={2} borderRadius={'full'} bg={'#E8DAFA'}>
                <Text
                  fontSize={{ base: '18px', md: '24px' }}
                  color={'#7919FF'}
                >
                  <FaUserCircle />{' '}
                </Text>
              </Box>
            </GridItem>
            {/* <GridItem
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  p={4}
                  bg='#FFFDF2'
                  borderRadius={'10px'}
                  boxShadow={'lg'}
                >
                  <Flex flexDir={'column'}>
                    <Text fontSize={'20px'}>
                      {dashboardData.total_employee}
                    </Text>
                    <Text
                      color={'#a4a4a4'}
                      fontSize={{ base: '12px', md: '14px' }}
                    >
                      Number of Employee
                    </Text>
                  </Flex>
                  <Box p={2} borderRadius={'full'} bg={'#fbcf2659'}>
                    <Text
                      fontSize={{ base: '18px', md: '24px' }}
                      color={'#BFA300'}
                    >
                      <HiMiniUsers />{' '}
                    </Text>
                  </Box>
                </GridItem> */}
            <GridItem
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              p={4}
              bg='#F2FFF2'
              borderRadius={'10px'}
              boxShadow={'lg'}
            >
              <Flex flexDir={'column'}>
                <Text fontSize={'20px'}>{dashboardData.total_user}</Text>
                <Text
                  color={'#a4a4a4'}
                  fontSize={{ base: '12px', md: '14px' }}
                >
                  Number of User
                </Text>
              </Flex>
              <Box p={2} borderRadius={'full'} bg={'#CDFFCE'}>
                <Text
                  fontSize={{ base: '18px', md: '24px' }}
                  color={'#029D07'}
                >
                  <FaUsers />{' '}
                </Text>
              </Box>
            </GridItem>
          </>
        )}
      </SimpleGrid>
      {user_role === 'Admin' && (<>
        {/* <Box display={'flex'} gap={4} mt={5} width={'100%'}>
          <Box  w={'100%'} py={2} px={'40px'} border={'1px solid #f3ebeb'} borderRadius={'15px'}>
            <Text fontSize="var(--text-12px)" textAlign={'center'} mb={2}>Number Of Chatbot Sector Wise</Text>
            <PieSectorWiseBots data={sectorBots} />
          </Box>
          <Box  w={'100%'} py={2} px={'40px'} border={'1px solid #f3ebeb'} borderRadius={'15px'}>
            <Text textAlign={'center'} mb={2}>Monthly metrics (bots and campaigns)</Text>
            <BarChartTopBotAndCampaigan months={months}
              botData={botData}
              campaignData={campaignData} />
          </Box>
        </Box> */}
        <Box
          display={{ base: "block", md: "flex" }}
          gap={4}
          mt={5}
          width="100%"
        >
          {/* Pie Chart Section */}
          <Box
            w={{ base: "100%", md: "50%" }}
            py={2}
            px={{ base: "20px", md: "40px" }}
            border="1px solid #f3ebeb"
            borderRadius="15px"
            mb={{ base: 4, md: 0 }} // adds spacing between stacked items on small screens
          >
            <Text fontSize="sm" textAlign="center" mb={2}>
              Number Of Chatbot Sector Wise
            </Text>
            <PieSectorWiseBots data={sectorBots} />
          </Box>

          {/* Bar Chart Section */}
          <Box
            w={{ base: "100%", md: "50%" }}
            py={2}
            px={{ base: "20px", md: "40px" }}
            border="1px solid #f3ebeb"
            borderRadius="15px"
          >
            <Text textAlign="center" mb={2}>
              Monthly metrics (bots and campaigns)
            </Text>
            <BarChartTopBotAndCampaigan
              months={months}
              botData={botData}
              campaignData={campaignData}
            />
          </Box>
        </Box>


        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mt={5}>
          <GridItem colSpan={2} w={'100%'} py={2} px={'40px'} border={'1px solid #f3ebeb'} borderRadius={'15px'}>
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
                        border={'1px solid #b4b4b4'}
                        colSpan={'4'}
                        textAlign={'center'}
                        fontSize={'12px'}
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
                        File Name
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius='5px 0px 0px 0px'
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
                        Created At
                      </Th>
                      <Th
                        fontWeight='var(--big-font-weight)'
                        color='var(--text-black)'
                        borderRadius='0px 5px 5px 0px'
                        fontSize='var(--mini-text)'
                      >
                        Action
                      </Th>
                    </Tr>
                  )}
                </Thead>
                <Tbody>
                  {documents?.map(item => (
                    <Tr
                      fontSize={'14px'}
                      cursor={'pointer'}
                      key={item?.id}
                      onClick={() => setSelectedFile(item)}
                    >

                      <Td>{item?.name}</Td>
                      <Td>{item?.sname}</Td>
                      <Td>{formatDate(item?.created_at)}</Td>
                      <Td>
                        <Flex
                          onClick={e => {
                            e.stopPropagation()
                            handleDeleteDocument(item.id)
                          }}
                          cursor={'pointer'}
                          _hover={{ color: 'white', bg: 'red' }}
                          color={'red'}
                          justifyContent={'center'}
                          alignItems={'center'}
                          h={'20px'}
                          w={'20px'}
                          border={'1px solid red'}
                          borderRadius={'full'}
                        >
                          <DeleteIcon />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
          <GridItem w={'100%'} py={2} px={'40px'} border={'1px solid #f3ebeb'} borderRadius={'15px'}>
            <Text textAlign={'center'} mb={2}>Number Of generative chat bot Sector </Text>
            <PieSectorWisesectorGenAi data={sectorGenAi} />
          </GridItem>
        </SimpleGrid>
      </>)}
      {user_role === 'Super-Admin' && (<>
        <SimpleGrid columns={1} gap={4} mt={5}>
          <GridItem w={'100%'} py={2} px={'40px'} border={'1px solid #f3ebeb'} borderRadius={'15px'}>
            <Text fontSize="var(--text-12px)" textAlign={'center'} mb={2}>User engagement metrics</Text>
            <EngagementBarChart adminMetrics={botcampaigns} />
          </GridItem>
          <GridItem colSpan={2} w={'100%'} py={2} px={'40px'} border={'1px solid #f3ebeb'} borderRadius={'15px'}>
            <Text textAlign={'center'} mb={2}>Monthly metrics (bots and campaigns)</Text>
            <BarChartTopBotAndCampaigan months={months}
              botData={botData}
              campaignData={campaignData} />
          </GridItem>
          <GridItem colSpan={2} w={'100%'} py={2} px={'40px'} border={'1px solid #f3ebeb'} borderRadius={'15px'}>
            <Text textAlign={'center'} mb={2}>Monthly Active Users</Text>
            <MonthlyActiveUser data={activeUser} formatDate={formatDate} />
          </GridItem>
        </SimpleGrid>
      </>)}


      {user_role === 'Admin' && (<>
        <Box p={4} bg={'#fff'} mt={4} borderRadius={'lg'} boxShadow={'md'}>

          <SimpleGrid h={'100%'} mt={4} columns={1} gap={2}>
            <GridItem colSpan={{ base: 1, md: 2 }}>

              <FileViewer selectedFile={selectedFile} />
            </GridItem>

          </SimpleGrid>
        </Box>
      </>)}
      <Modal
        size={'sm'}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='slideInBottom'
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <Text fontSize={'18px'} fontWeight={'semibold'} padding={'10px'}>
            Upload Files
          </Text>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel fontSize={'13px'} mb={'1px'}>
                File Name
              </FormLabel>
              <Input
                name='fileName'
                type='text'
                fontSize={'12px'}
                borderRadius={'10px'}
                onChange={e =>
                  setFile(prev => ({ ...prev, fileName: e.target.value }))
                }
                placeholder='File Name'
              />
            </FormControl>

            {/* <FormControl mt={2}>
              <Input border={'none'} p={0} type="file" name="file" fontSize={'13px'} ref={fileInputRef} onChange={handleFileChange} />
            </FormControl> */}

            {/* <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb="2px" mt={5}>
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

          <Box width={'full'} display={'flex'} gap={'6px'} padding={'20px'}>
            <Button
              size={'sm'}
              width={'50%'}
              onClick={onClose}
              bgColor='transparent'
              _hover='none'
              color='var(--active-bg)'
              border='1px solid var(--active-bg)'
            >
              Close
            </Button>
            <Button
              size={'sm'}
              width={'50%'}
              onClick={handleFileSubmit}
              _hover={{ bgColor: 'var(--active-bg)' }}
              bgColor='var(--active-bg)'
              color='#fff'
            >
              Upload
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </Flex>
  )
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
        .then(res => (res.ok ? res.text() : Promise.reject('Failed to fetch')))
        .then(setFileContent)
        .catch(() => setFileContent('Error loading file.'))
    }
  }, [selectedFile])

  return (
    <GridItem
      colSpan={{ base: 1, md: 3 }}
      p={4}
      borderRadius='md'
      minH='300px'
      maxH='450px'
      overflowY='auto'
    >
      {selectedFile ? (
        <>
          <Text fontWeight='bold' mb={2}>
            {selectedFile.name}
          </Text>

          {selectedFile.name.endsWith('.pdf') ? (
            fileUrl ? (
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
                <Viewer fileUrl={fileUrl} />
              </Worker>
            ) : (
              <Text>Loading PDF...</Text>
            )
          ) : ['.csv', '.txt'].some(ext => selectedFile.name.endsWith(ext)) ? (
            <Box as='pre' whiteSpace='pre-wrap' wordBreak='break-word'>
              {fileContent || 'Loading file content...'}
            </Box>
          ) : (
            <Text>Preview not available for this file type.</Text>
          )}
        </>
      ) : (
        <Text>Select a file to view its content.</Text>
      )}
    </GridItem>
  )
}

export default AdminDashboard
