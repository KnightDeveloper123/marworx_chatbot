import {
  Box, Button, Flex, FormControl, FormLabel, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { BsPersonFillGear } from "react-icons/bs";
import { AppContext } from "../context/AppContext";
import { IoMdAdd } from "react-icons/io";

const AdminDashboard = () => {
  const { showAlert } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure()

  const fetchDashboardData = useCallback(async () => {
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
  }, [showAlert])

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData])

  const [file, setFile] = useState({
    fileName: "", file: []
  });
  const fileInputRef = useRef()
  const handleFileChange = (event) => {
    setFile((prev) => ({ ...prev, file: event.target.files[0] }));
  };

  console.log(file)

  const handleFileSubmit = async () => {
    const formData = new FormData();
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
        onClose();
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
          fontSize="var(--mini-text)"
          fontWeight="var(--big-font-weight)"
          h={"35px"}
          onClick={() => onOpen()}
        >
          Add Documents
        </Button>
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
    </Flex>
  )
}

export default AdminDashboard;