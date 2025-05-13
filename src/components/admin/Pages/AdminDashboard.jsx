import {
  Box, Button, Divider, Flex, FormControl, FormLabel, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";
import { IoIosSend, IoMdAdd } from "react-icons/io";
import { DeleteIcon } from "@chakra-ui/icons";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useLocation } from "react-router-dom";
import { MdSocialDistance } from "react-icons/md";
import ApexCharts from 'apexcharts'
import ReactApexChart from "react-apexcharts";
import { decrypt } from "../../utils/security";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";

const AdminDashboard = () => {
  const { showAlert, formatDate } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dashboardData, setDashboardData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const location = useLocation();

  const user = localStorage.getItem('user')

  // console.log(decrypt(user))

  const admin_id = decrypt(user).id
  const user_role = decrypt(user).role
  // console.log(user_role)

   const { type, sectorId } = location.state || {};
  


  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getAllDashboardData`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
          },
        }
      );

      const result = await response.json();
      // console.log(result)
      if (result.success) {
        setDashboardData(result.counts)
      } else {
        showAlert(response.error, 'error')
      }
    } catch (error) {
      console.log(error);
      showAlert("Internal Server Error", "error")
    }
  }, [showAlert])

  const fetchAllDocuments = useCallback(async (admin_id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/documents/getAllDocuments?admin_id=${admin_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        setDocuments(result.data)
      } else {
        showAlert(response.error, 'error')
      }
    } catch (error) {
      console.log(error);
      showAlert("Internal Server Error", "error")
    }
  }, [showAlert])

  useEffect(() => {
    fetchDashboardData();
    fetchAllDocuments(admin_id);
  }, [fetchDashboardData, fetchAllDocuments, admin_id])

  const [file, setFile] = useState({
    fileName: "", file: []
  });
  const fileInputRef = useRef()
  const handleFileChange = (event) => {
    setFile((prev) => ({ ...prev, file: event.target.files[0] }));
  };



  const handleFileSubmit = async () => {
    const formData = new FormData();
    formData.append("admin_id", admin_id);
    formData.append("file", file.file);
    formData.append("fileName", file.fileName);
     formData.append("sector_id",  sectorId);
      formData.append("bot_type", type);  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/documents/uploadDocument?fileName=${file.fileName}`, {
        method: "POST",
        headers: {
          "Authorization": `${localStorage.getItem('token')}`,
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
        fetchAllDocuments(admin_id)
        onClose();
      } else {
        showAlert(result.error, "error");
      }
    } catch (error) {
      console.log(error);
      showAlert("Upload failed", "error");
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/documents/deleteDocument?document_id=${id}`, {
        method: "POST",
        headers: {
          "Authorization": `${localStorage.getItem('token')}`,
        }
      });

      const result = await response.json();
      if (result.success) {
        showAlert(result.success, "success");
        fetchAllDocuments(admin_id)
      } else {
        showAlert(result.error, "error");
      }
    } catch (error) {
      console.log(error);
      showAlert("Upload failed", "error");
    }
  }
  const [state, setState] = React.useState({

    series: [{
      name: 'Campaign',
      data: [71, 65, 78, 85, 92, 109, 100]
    }, {
      name: 'Bot',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      colors: ['#4b63ff', '#ff5f35'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [2, 2],
      },
      markers: {
        size: 4,
        colors: ['#ffffff'],
        strokeColors: ['#4b63ff', '#ff5f35'],
        strokeWidth: 2,
        hover: {
          size: 5
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      tooltip: {
        x: {
          format: 'MMM', // Optional: will match category
        },
      },
    },


  });


  const [activeUser, setActiveUser] = React.useState({
    series: [
      {
        data: [450, 470, 490, 530, 560, 600, 680],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          distributed: true,
          borderRadius: 6,
          borderRadiusApplication: 'end',
        },
      },
      colors: ['#B4BEFF', '#4b63ff'],
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        max: 800,
      },
      legend: {
        show: false,
      },
    },
  });

  return (
    <Flex flexDirection="column" w="100%" h="100%" pt={'20px'}>
      {location.pathname === '/home/dashboard' && (
        <Box>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {user_role === "Admin" && (
              <>
                <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#f8f3ff' borderRadius={'10px'} boxShadow={'lg'}>
                  <Flex flexDir={'column'}>
                    <Text fontSize={'20px'}>{dashboardData.total_employee}</Text>
                    <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Number of Admin</Text>
                  </Flex>
                  <Box p={2} borderRadius={'full'} bg={'#9726fb59'}>
                    <Text fontSize={{ base: '18px', md: '24px' }} color={'#490287'}><RiRobot2Fill /></Text>
                  </Box>
                </GridItem>

                <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#FFFDF2' borderRadius={'10px'} boxShadow={'lg'}>
                  <Flex flexDir={'column'}>
                    <Text fontSize={'20px'}>{dashboardData.total_user}</Text>
                    <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Number of campaigns sent</Text>
                  </Flex>
                  <Box p={2} borderRadius={'full'} bg={'#fbcf2659'}>
                    <Text fontSize={{ base: '18px', md: '24px' }} color={'#db7100'}><IoIosSend /> </Text>
                  </Box>
                </GridItem>
              </>
            )}

            {user_role === "Super-Admin" && (
              <>
                <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#F8F3FF' borderRadius={'10px'} boxShadow={'lg'}>
                  <Flex flexDir={'column'}>
                    <Text fontSize={'20px'}>{dashboardData.total_admin}</Text>
                    <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Number of Admin</Text>
                  </Flex>
                  <Box p={2} borderRadius={'full'} bg={'#E8DAFA'}>
                    <Text fontSize={{ base: '18px', md: '24px' }} color={'#7919FF'}><FaUserCircle  /> </Text>
                  </Box>
                </GridItem>
                <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#FFFDF2' borderRadius={'10px'} boxShadow={'lg'}>
                  <Flex flexDir={'column'}>
                    <Text fontSize={'20px'}>{dashboardData.total_employee}</Text>
                    <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Number of Employee</Text>
                  </Flex>
                  <Box p={2} borderRadius={'full'} bg={'#fbcf2659'}>
                    <Text fontSize={{ base: '18px', md: '24px' }} color={'#BFA300'}><HiMiniUsers /> </Text>
                  </Box>
                </GridItem>
                <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#F2FFF2' borderRadius={'10px'} boxShadow={'lg'}>
                  <Flex flexDir={'column'}>
                    <Text fontSize={'20px'}>{dashboardData.total_user}</Text>
                    <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Number of User</Text>
                  </Flex>
                  <Box p={2} borderRadius={'full'} bg={'#CDFFCE'}>
                    <Text fontSize={{ base: '18px', md: '24px' }} color={'#029D07'}><FaUsers  /> </Text>
                  </Box>
                </GridItem>
              </>
            )}
          </SimpleGrid>

          {/* // charts */}
          <Flex id="chart" mt={10} w={"100%"} gap={4} h={"auto"} flexDir={{ base: 'column', md: 'row' }}>
            <Box w={{ base: '100%', md: '50%' }} boxShadow={'md'} borderRadius={'10px'}>
            <Text p={4}>Top Performing bots and campaigns</Text>
              <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
            </Box>
            <Divider h={"auto"} borderWidth="1px" borderColor="black" orientation='vertical' />
            <Box w={{ base: '100%', md: '50%' }} boxShadow={'md'} borderRadius={'10px'}>
              <Text p={4}>Active Users</Text>
              <ReactApexChart options={activeUser.options} series={activeUser.series} type="bar" height={350} />
            </Box>
          </Flex>
        </Box>
      )}





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
          onClick={() => onOpen()}
        >
          Add Documents
        </Button>
        <SimpleGrid h={'100%'} mt={4} columns={{ base: 1, md: 5 }} gap={2}>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <TableContainer>
              <Table variant='striped' size={'sm'} borderRadius={'10px'}>
                <TableCaption>DATA SETS UPLOADED FOR MODEL TRAINING</TableCaption>
                <Thead>
                  {documents.length === 0 ? <Tr><Th border={'1px solid #b4b4b4'} colSpan={'4'} textAlign={'center'} fontSize={'12px'}>No Documents Uploaded</Th></Tr> : <Tr>
                    {/* <Th>ID</Th> */}
                    <Th>File Name</Th>
                    <Th>Created At</Th>
                    <Th>Action</Th>
                  </Tr>}
                </Thead>
                <Tbody>
                  {documents?.map(item => <Tr fontSize={'14px'} cursor={'pointer'} key={item?.id} onClick={() => setSelectedFile(item)}>
                    {/* <Td>{item?.id}</Td> */}
                    <Td>{item?.name}</Td>
                    <Td>{formatDate(item?.created_at)}</Td>
                    <Td>
                      <Flex onClick={(e) => { e.stopPropagation(); handleDeleteDocument(item.id) }} cursor={'pointer'} _hover={{ color: 'white', bg: 'red' }} color={'red'} justifyContent={'center'} alignItems={'center'} h={'20px'} w={'20px'} border={'1px solid red'} borderRadius={'full'}>
                        <DeleteIcon />
                      </Flex>
                    </Td>
                  </Tr>)}
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>

          <FileViewer selectedFile={selectedFile} />
        </SimpleGrid>
      </Box>



      <Modal size={'sm'} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' isCentered>
        <ModalOverlay />
        <ModalContent>
          <Text fontSize={'18px'} fontWeight={'semibold'} padding={'10px'}>Upload Files</Text>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel fontSize={'13px'} mb={'1px'}>File Name</FormLabel>
              <Input name="fileName" type="text" fontSize={'12px'} borderRadius={'10px'} onChange={(e) => setFile((prev) => ({ ...prev, fileName: e.target.value }))} placeholder="File Name" />
            </FormControl>

            <FormControl mt={2}>
              <Input border={'none'} p={0} type="file" name="file" fontSize={'13px'} ref={fileInputRef} onChange={handleFileChange} />
            </FormControl>
          </ModalBody>

          <Box width={'full'} display={'flex'} gap={'6px'} padding={'20px'}  >
            <Button size={'sm'} width={'50%'} onClick={onClose}>
              Close
            </Button>
            <Button size={'sm'} width={'50%'} onClick={handleFileSubmit} _hover={{ bgColor: "var(--active-bg)" }}
              bgColor="var(--active-bg)"
              color="#fff">Upload</Button>
          </Box>
        </ModalContent>
      </Modal>
    </Flex >
  )
}

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

  return (
    <GridItem colSpan={{ base: 1, md: 3 }} p={4} borderRadius="md" minH="300px" maxH="450px" overflowY="auto">
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
    </GridItem>
  );
};


export default AdminDashboard;