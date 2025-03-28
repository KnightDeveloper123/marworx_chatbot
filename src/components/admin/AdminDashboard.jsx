import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box, Button, Flex, Grid, GridItem, SimpleGrid, Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlinePeople, MdOutlineQueryBuilder } from "react-icons/md";
import { BsPersonFillGear } from "react-icons/bs";
import { AppContext } from "../context/AppContext";
import { IoMdAdd } from "react-icons/io";

const AdminDashboard = () => {
  const { showAlert } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState({});
  const fileInputRef = useRef(null);


  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure();

  const editCancelRef = useRef();

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/employee/getAllDashboardData`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
  }

  useEffect(() => {
    fetchDashboardData();
  }, [])

  console.log(dashboardData);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the selected file
  };
  console.log(file)
  const handleFileSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("file", file); // File should be in "file" field
    formData.append("fileName", "akwdnaownd"); // Additional data as fileName
  
    try {
      const response = await fetch("http://localhost:5000/documents/uploadDocument", {
        method: "POST",
        headers: {
          "Authorization": `${localStorage.getItem('token')}`,
        },
        body: formData, // body should be here, not in headers
      });
  
      const result = await response.json();
      if (result.success) {
        showAlert(result.success, "success");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setFile(null);
        onEditClose();
      } else {
        showAlert(result.error, "error");
      }
    } catch (error) {
      console.log(error);
      showAlert("Upload failed", "error");
    }
  };
  


  return (
    <Flex flexDirection="column" w="100%" h="100%" pt={'20px'}>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#fff' borderRadius={'10px'} boxShadow={'lg'}>
          <Flex flexDir={'column'}>
            <Text fontSize={'20px'}>{dashboardData.total_employee}</Text>
            <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Total Employees</Text>
          </Flex>

          <Box p={2} borderRadius={'full'} bg={'#9726fb59'}>
            <Text fontSize={{ base: '18px', md: '24px' }} color={'#490287'}><BsPersonFillGear /></Text>
          </Box>
        </GridItem>

        <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#fff' borderRadius={'10px'} boxShadow={'lg'}>
          <Flex flexDir={'column'}>
            <Text fontSize={'20px'}>{dashboardData.total_user}</Text>
            <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Total Users</Text>
          </Flex>

          <Box p={2} borderRadius={'full'} bg={'#fbcf2659'}>
            <Text fontSize={{ base: '18px', md: '24px' }} color={'#db7100'}><BsPersonFillGear /></Text>
          </Box>
        </GridItem>

        <GridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={4} bg='#fff' borderRadius={'10px'} boxShadow={'lg'}>
          <Flex flexDir={'column'}>
            <Text fontSize={'20px'}>{dashboardData.pending_queries}</Text>
            <Text color={'#a4a4a4'} fontSize={{ base: '12px', md: "14px" }}>Pending Queries</Text>
          </Flex>

          <Box p={2} borderRadius={'full'} bg={'#9726fb59'}>
            <Text fontSize={{ base: '18px', md: '24px' }} color={'#490287'}><BsPersonFillGear /></Text>
          </Box>
        </GridItem>
      </SimpleGrid>
      {/* )} */}


      <Box p={4} bg={'#fff'} mt={4} borderRadius={'lg'} boxShadow={'md'}>
        <Button
          borderRadius="var(--radius)"
          leftIcon={<IoMdAdd fontSize={"20px"} />}
          _hover={{ bgColor: "var(--active-bg)" }}
          bgColor="var(--active-bg)"
          color="#fff"
          h={"35px"}
          fontSize="var(--mini-text)"
          fontWeight="var(--big-font-weight)"
          onClick={() => onEditOpen()}
        >
          Add Documents
        </Button>
      </Box>

      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={editCancelRef}
        onClose={onEditClose}
        isOpen={isEditOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent bgColor={"#2D3748"} color={"white"}>
          <AlertDialogHeader>Upload a file</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <input type="file" name="avatar" ref={fileInputRef} onChange={handleFileChange} />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={editCancelRef} onClick={onEditClose}>
              Cancel
            </Button>
            <Button colorScheme='red' ml={3} onClick={handleFileSubmit}>
              Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>





    </Flex>
  )
}

export default AdminDashboard;