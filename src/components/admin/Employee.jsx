import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr, useDisclosure
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState, } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../../Card";
import { IoMdAdd } from "react-icons/io";
import { RxDotsHorizontal } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


function Employee() {
  const { fetchAllEmployee, employee, formatDate } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isOpenEditEmp, setIsOpenEditEmp] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchAllEmployee();
  }, []);

const navigate=useNavigate();
  const onSubmit = async (values) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/addEmployee`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          Authorization: token
        },
        body: JSON.stringify(values)
      })

      const result = await response.json();

      console.log('result', result)

    } catch (error) {
      console.log(error)

    }

  }

  const editEmployee = (empData) => {

    setSelectedEmployee(empData);
    setIsOpenEditEmp(true);
   
    onOpenEdit();

    Object.keys(empData).forEach((key) => {
      setValue(key, empData[key]); // Pre-fill form fields
    });




  }




  const onSubmitEdit = async (values) => {


    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/updateEmployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          employee_id: selectedEmployee.id,
          name: values.name,
          email: values.email,
          mobile_no: values.mobile_no,
          date_of_birth: new Date(values.date_of_birth).toISOString().split("T")[0],
          role: values.role
        }), // Sending ID and updated data
      });

      const result = await response.json();
      console.log("Update result:", result);

      // if (response.ok) {
      // alert("Employee updated successfully!");
      // fetchEmployees(); // Refresh the employee list
      // onCloseEdit(); // Close modal
      // } else {
      //   alert("Failed to update employee.");
      // }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Function to close the edit modal
  const onCloseEditModal = () => {
    isOpenEditEmp(false);
    reset(); // Reset form after closing
  };


  const openDeleteModal = (id) => {
    setSelectedEmployeeId(id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmployeeId(null);
  };

  // Function to delete an employee
  const deleteEmployee = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/deleteEmployee`, {
        method: "POST",  // Using POST instead of DELETE
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ user_id: selectedEmployeeId }),
      });

      const result = await response.json();
      console.log("Delete result:", result);
      fetchAllEmployee()

    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      closeDeleteModal();
    }
  };


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
            Employee
          </Text>
          <Flex gap={2}>
            {/* <InputGroup alignItems="center">
            <InputLeftElement pointerEvents="none" top='auto'>
              <SearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Name, Lead status, Source..."
              fontSize="var(--mini-text)"
              fontWeight="var(--big-font-weight)"
              // height={{ base: "28px", md: "30px", lg: "40px", xl: "40px" }}
              size='sm'
              name="currency"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bgColor={"#F2F4F800"}
              border='1px solid #858585'
              borderRadius="var(--radius)"
            />
            <InputRightElement top='auto'>
              <TbFilterCancel onClick={clearFilter} color="green.500" />
            </InputRightElement>
          </InputGroup> */}

            <Flex
            // display={location.pathname === "/admin/dashboard" ? "none" : "Flex"}
            >
              {/* {userDetails.type === "admin" || userDetails.active === 1 ? ( */}
              <Button
                borderRadius="var(--radius)"
                leftIcon={<IoMdAdd fontSize={"20px"} />}
                _hover={{ bgColor: "var(--active-bg)" }}
                bgColor="var(--active-bg)"
                color="#fff"
                h={"35px"}
                fontSize="var(--mini-text)"
                fontWeight="var(--big-font-weight)"
                onClick={() => onOpen()}
              >
                Add Employee
              </Button>
              {/* 
            ) : (
              ""
            )} */}
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
                  name
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  email
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Phone No
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  DOB
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  role
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Last login
                </Th>
                {/* {userDetails.type === "admin" || userDetails.active === 1 ? ( */}
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius="0px 5px 0px 0px"
                  fontSize="var(--mini-text)"
                >
                  Actions
                </Th>
                {/* ) : (
              ""
            )} */}
              </Tr>
            </Thead>

            <Tbody>
              {employee &&
                employee.map((d, index) => (
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
                      E-{d.id}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                      onClick={() => navigate(`/admin/employee/${d.id}`)} 
                      cursor={'pointer'}
                    >
                      {d.name}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {d.email}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {d.mobile_no}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {formatDate(d.date_of_birth)}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {d.role}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {formatDate(d.last_login)}
                    </Td>
                    <Td border="0.5px solid #F2F4F8" color={"#404040"} fontSize="var(--mini-text)">
                      <Menu >
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
                            // onClick={() => editleads(d.id)}
                            display={'flex'} alignItems={'center'} gap={2}
                          >
                            <MdOutlineModeEdit color="green" />
                            <Text onClick={() => editEmployee(d)} fontSize="var(--mini-text)" fontWeight="var(--big-font-weight)" >
                              Edit
                            </Text>
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            w="100%"
                            minW="100px"
                            cursor="pointer"
                          // onClick={() => {
                          //   setSelectLead(d);
                          //   dellead(d.id);
                          // }}
                          >
                            <Flex gap={2} alignItems="center">
                              <DeleteIcon color={"red"} />
                              <Text onClick={() => openDeleteModal(d.id)}>Delete</Text>
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

      {/* add employee */}
      <Modal isOpen={isOpen}
        onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'18px'}>Add Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <Box as='form' onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'8px'}>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Name</FormLabel>
                <Input type='text' {...register('name', { required: 'Name is required' })}
                  placeholder='Enter your name' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.name && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.name.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Email</FormLabel>
                <Input type='email' {...register('email', { required: 'Email is required' })}
                  placeholder='Enter email' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.email && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.email.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Phone No</FormLabel>
                <Input type='number' {...register('mobile_no', { required: 'Phone no is required' })}
                  placeholder='Enter Phone no' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.mobile_no && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.mobile_no.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'} >DOB</FormLabel>
                <Input type='date' {...register('date_of_birth', { required: "DOB is required" })} fontSize="var(--text-12px)"  ></Input>
                {errors.date_of_birth && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.date_of_birth.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'} >Select Role</FormLabel>
                <Select {...register("role", { required: "Please select a role" })} fontSize='var(--text-12px)'>
                  <option value='technician'>Technician</option>
                  <option value='support'>  Help and Suport</option>
                </Select>
                {errors.role && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.role.message}</Text>}
              </FormControl>

              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'} mt={'10px'}>
                <Button type='submit' fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
                  Save
                </Button>
                <Button onClick={onClose} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                  textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>Cancel</Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>

      </Modal>


      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"18px"}>Edit Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box as="form" onSubmit={handleSubmit(onSubmitEdit)} display={"flex"} flexDirection={"column"} gap={"8px"}>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>Name</FormLabel>
                <Input type="text" {...register("name", { required: "Name is required" })} fontSize="var(--text-12px)" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>Email</FormLabel>
                <Input type="email" {...register("email", { required: "Email is required" })}
                  fontSize="var(--text-12px)" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>Phone No</FormLabel>
                <Input type="number" {...register("mobile_no", { required: "Phone no is required" })}
                  fontSize="var(--text-12px)" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>DOB</FormLabel>
                <Input type="date" {...register("date_of_birth", { required: "DOB is required" })}
                  fontSize="var(--text-12px)" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>Select Role</FormLabel>
                <Select {...register("role", { required: "Please select a role" })} fontSize="var(--text-12px)">
                  <option value="technician">Technician</option>
                  <option value="support">Help and Support</option>
                </Select>
              </FormControl>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"6px"} mt={"10px"}>
                <Button type="submit" fontSize={"13px"} bgColor={"#FF5722"} textColor={"white"} size={"sm"}>Save</Button>
                <Button onClick={onCloseEditModal} type="button" size={"sm"} fontSize={"13px"} border={"1px solid #FF5722"} textColor={"#FF5722"} bgColor={"white"}>Cancel</Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>


      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="18px">Confirm Delete</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to delete this employee?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteEmployee}>
              Yes, Delete
            </Button>
            <Button variant="ghost" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Card>
  );
}

export default Employee;
