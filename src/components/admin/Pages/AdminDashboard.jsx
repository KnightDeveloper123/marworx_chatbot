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

const AdminDashboard = () => {
  const { showAlert, formatDate } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dashboardData, setDashboardData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const location = useLocation();
  const user=localStorage.getItem('user')
  const admin_id=decrypt(user).id


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
  const [state, setState] = useState({

    series: [
      {
        name: "Bots",
        data: [28, 29, 33, 36, 32, 32, 33]
      },
      {
        name: "Campaigns",
        data: [12, 11, 14, 18, 17, 13, 13]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.5
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Top performing bots and campaigns',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        }
      },
      yaxis: {
        title: {
          text: ''
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },
  });
  const [activeUser, setActiveUser] = useState({

    series: [{
      data: [400, 430, 448, 470, 540, 580, 690]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      annotations: {
        xaxis: [{
          x: 500,
          borderColor: '#00E396',
        }],
        yaxis: [{
          y: 'July',
          y2: 'September'
        }]
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      yaxis: {
        reversed: true,
        axisTicks: {
          show: true
        }
      }
    },

  });

  return (
    <Flex flexDirection="column" w="100%" h="100%" pt={'20px'}>
      {location.pathname === '/home/dashboard' &&
      <Box>
        
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#fff' borderRadius={'10px'} boxShadow={'lg'}>
            <Flex flexDir={'column'}>
              <Text fontSize={'20px'}>{dashboardData.total_employee}</Text>
              <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Number of Admin</Text>
            </Flex>
            <Box p={2} borderRadius={'full'} bg={'#9726fb59'}>
              <Text fontSize={{ base: '18px', md: '24px' }} color={'#490287'}><RiRobot2Fill /></Text>
            </Box>
          </GridItem>

          <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#fff' borderRadius={'10px'} boxShadow={'lg'}>
            <Flex flexDir={'column'}>
              <Text fontSize={'20px'}>{dashboardData.total_user}</Text>
              <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Number of campaigns sent</Text>
            </Flex>
            <Box p={2} borderRadius={'full'} bg={'#fbcf2659'}>
              <Text fontSize={{ base: '18px', md: '24px' }} color={'#db7100'}><IoIosSend /> </Text>
            </Box>
          </GridItem>
        </SimpleGrid>

        {/* // charts */}
        <Flex id="chart" mt={10} w={"100%"} gap={4} h={"auto"} flexDir={{ base: 'column', md: 'row' }}>
          <Box w={{ base: '100%', md: '50%'}}>
            <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
          </Box>
          <Divider h={"auto"} borderWidth="1px" borderColor="black" orientation='vertical' />
          <Box w={{ base: '100%', md: '50%'}}>
            <Text>Active Users</Text>
            <ReactApexChart options={activeUser.options} series={activeUser.series} type="bar" height={350} />
          </Box>
        </Flex>
        </Box>
      }




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


      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' isCentered>
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
            <Button size={'sm'} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button size={'sm'} variant='ghost' onClick={handleFileSubmit} _hover={{ bgColor: "var(--active-bg)" }}
              bgColor="var(--active-bg)"
              color="#fff">Upload</Button>
          </ModalFooter>
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