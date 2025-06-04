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
  ModalFooter,
  ModalHeader,
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
import { IoIosSend, IoMdAdd } from 'react-icons/io'
import { DeleteIcon } from '@chakra-ui/icons'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { useLocation } from 'react-router-dom'
import { MdSocialDistance } from 'react-icons/md'
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { decrypt } from '../../utils/security'
import { FaUserCircle, FaUsers } from 'react-icons/fa'
import { HiMiniUsers } from 'react-icons/hi2'
import { LuCloudUpload } from 'react-icons/lu'
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const { showAlert, formatDate } = useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dashboardData, setDashboardData] = useState({})
  const [documents, setDocuments] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const location = useLocation()
  const user = localStorage.getItem('user')
  const admin_id = decrypt(user).id
  const user_role = decrypt(user).role
  // const { type, sectorId } = location.state || {}

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
  }, [fetchDashboardData, fetchAllDocuments, admin_id])


  const [activeBots, setActiveBots] = useState(null)
  const [campaignSent, setCampaignSent] = useState(null)
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ activeBots: 0, campaignsSent: 0 });

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/getAdminCount`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          }
        );
        const result = await res.json();
        console.log("res", result.data)
        if (result.success) {
          const { activeBots, campaignsSent } = result.data;
          setMetrics({ activeBots, campaignsSent });


        } else {
          console.error('API error:', result.error);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);


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

  // month wise display bot and campaign
  const [months, setMonths] = useState([]);
  const [botData, setBotData] = useState([]);
  const [campaignData, setCampaignData] = useState([]);

  useEffect(() => {
    async function fetchMonthlyMetrics() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/getMonthlyMetrics`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });

        const result = await res.json();
        if (result.success) {
          const { botsByMonth, campaignsByMonth } = result.data;

          const allMonths = [...new Set([
            ...botsByMonth.map(item => item.month),
            ...campaignsByMonth.map(item => item.month)
          ])];

          const botMap = Object.fromEntries(botsByMonth.map(item => [item.month, item.count]));
          const campaignMap = Object.fromEntries(campaignsByMonth.map(item => [item.month, item.count]));

          const botSeries = allMonths.map(m => botMap[m] || 0);
          const campaignSeries = allMonths.map(m => campaignMap[m] || 0);

          setMonths(allMonths);
          setBotData(botSeries);
          setCampaignData(campaignSeries);
        } else {
          console.error('API error:', result.error);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMonthlyMetrics();
  }, []);

  const chartOptions = {
    chart: { id: 'bots_campaigns' },
    xaxis: { categories: months },
    title: { text: 'Monthly Active Bots & Campaigns Sent', align: 'left' },
    stroke: { curve: 'smooth' }
  };

  const chartSeries = [
    { name: 'Active Bots', data: botData },
    { name: 'Campaigns Sent', data: campaignData }
  ];

  //sector wise bots
  const [sectorPerformance, setSectorPerformance] = useState([]);
  const token = localStorage.getItem('token')
  const fetchMonthlyMetrics = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/sector-performance`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      const response = await res.json();
      setSectorPerformance(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchMonthlyMetrics();
  }, [])

  const data = {
    labels: sectorPerformance.map((item) => item?.sector || 'N/A'),
    datasets: [
      {
        label: 'Performance',
        data: sectorPerformance.map((item) => item?.total_bots || 0),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Sector-wise Performance (Line Chart)' },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  // const [engagement, setEngagement] = useState({ clickThroughRate: 0, completionRate: 0 });
  // const fetchUserEnagement = async () => {
  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/user-engagement`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': token
  //       }
  //     })
  //     const response = await res.json();
  //     console.log("res", response.data)
  //     setEngagement(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchUserEnagement();
  // }, [])

  const [topBots, setTopBots] = useState([]);
  const fetchTopPerformer = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/top-performing-bots`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      const response = await res.json();
      setTopBots(response.data);
      // setTopCampaigns(topRes.data.topCampaigns);
      // setEngagement(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTopPerformer()
  }, [])
  const Botdata = {
    labels: topBots.map((bot) => bot?.bot_name || 'N/A'), // replace `name` with the correct bot name field
    datasets: [
      {
        label: 'Bot Performance',
        data: topBots.map((bot) => bot?.total_users || 0), // replace `score` with your performance metric
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,0.2)',
        borderWidth: 1,
      },
    ],
  };

  const botoptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Top Performing Bots' },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  const [topCampaigns, setTopCampaigns] = useState([]);
  const fetchTopCampaigns = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/top-performing-campaigns`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      const response = await res.json();
      console.log(response.data)
      setTopCampaigns(response.data);
      // setTopCampaigns(topRes.data.topCampaigns);
      // setEngagement(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTopCampaigns();
  }, [])

  const Campaigndata = {
    labels: topCampaigns.map((camp) => camp?.name || 'N/A'),
    datasets: [
      {
        label: 'Campaign Performance',
        data: topCampaigns.map((camp) => camp?.total_users || 0), // replace `score` with your performance metric
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,0.2)',
        borderWidth: 1,
      },
    ],
  };

  const campaignoptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Top Performing Camapigns' },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <Flex flexDirection='column' w='100%' h='100%' pt={'20px'} >
      {location.pathname === '/home/dashboard' && (
        <Box >
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
                </GridItem>
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

          <Box w="100%" display={'flex'} flexDirection={'column'} gap={'40px'}>


            {/* month wise display bot and campaign */}
            {/* <Box boxShadow='md' p={4} borderRadius='md'>
            <Text mb={4} fontWeight='bold'>Bots & Campaigns by Month</Text>
            {loading ? <Spinner /> : (
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type='area'
                height={350}
              />
            )}
          </Box> */}

            {/* sector wise bots */}
            <Box boxShadow='md' p={4} borderRadius='md'>
              <Line data={data} options={options} />
            </Box>
            <Box boxShadow='md' p={4} borderRadius='md'>
              <Bar data={Botdata} options={botoptions} />
            </Box>

            <Box boxShadow='md' p={4} borderRadius='md'>
              <Bar data={Campaigndata} options={campaignoptions} />
            </Box>
          </Box>
        </Box>
      )}


      <Box p={4} bg={'#fff'} mt={4} borderRadius={'lg'} boxShadow={'md'}>
        <Button
          borderRadius='var(--radius)'
          leftIcon={<IoMdAdd fontSize={'20px'} />}
          _hover={{ bgColor: 'var(--active-bg)' }}
          bgColor='var(--active-bg)'
          color='#fff'
          fontSize='var(--mini-text)'
          fontWeight='var(--big-font-weight)'
          h={'35px'}
          onClick={() => onOpen()}
        >
          Add Documents
        </Button>
        <SimpleGrid h={'100%'} mt={4} columns={{ base: 1, md: 5 }} gap={2}>
          <GridItem colSpan={{ base: 1, md: 2 }}>
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
                      {/* <Th>ID</Th> */}
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
                      {/* <Td>{item?.id}</Td> */}
                      <Td>{item?.name}</Td>
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

          <FileViewer selectedFile={selectedFile} />
        </SimpleGrid>
      </Box>

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
