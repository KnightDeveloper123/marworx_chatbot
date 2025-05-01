import { DeleteIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Divider, Flex, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import Select from "react-select"
import { MdOutlineModeEdit } from 'react-icons/md'
import { RxDotsHorizontal } from 'react-icons/rx'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { decrypt } from '../../utils/security'

const Employee = () => {
  const token = localStorage.getItem('token')
  const { showAlert , employees, fetchAllEmployees } = useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const [filteredSectors, setFilteredSectors] = useState("");
    const user=localStorage.getItem('user')
          const admin_id=decrypt(user).id
  const {
    register,
    handleSubmit, reset, setValue,
    formState: { errors }, control
  } = useForm({
    defaultValues: {
      products: []
    }
  });
  const navigate = useNavigate();
console.log(employees);


  useEffect(() => {
    fetchAllEmployees();
  }, [])

  const allCategory = [{
    value: "energy",
    label: "Energy"
  },
  {
    value: "industrial",
    label: "Industrial"
  },
  {
    value: "manufacturing",
    label: "Manufacturing"
  },
  {
    value: "chemicals",
    label: "Chemicals"
  },
  ]


  const onSubmit = async (data) => {
    const payload = {
        name: data.name,
        email: data.email,
        mobile_no: data.mobile_no,
        date_of_birth: data.date_of_birth,
      };
    try { 
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/add?admin_id=${admin_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json();
   
      if (result.success) {
        showAlert("Employee added successfully", 'success')
        fetchAllEmployees();
        reset();
        onClose();
      }
    } catch (error) {
      showAlert("Failed to Add Employee ", 'error')
      console.log(error)
    }
  }

  const [employeeUpdate, setEmployeeUpdate] = useState({});
  const editEmployee = (data) => {
    onEditOpen();
    setEmployeeUpdate(data);
    setValue("name", data.name);
    setValue("email", data.email);
    setValue("mobile_no", data.mobile_no);
    setValue("date_of_birth", data.date_of_birth);

  };

  const onEditSubmit = async (data) => {
    const payload = {
        employee_id: employeeUpdate.id,
        name: data.name,
        email: data.email,
        mobile_no: data.mobile_no,
        date_of_birth: data.date_of_birth,
      };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json();

      if (result.success) {

        showAlert("employee updated successfully", 'success')
        fetchAllEmployees();
        
        onEditClose();
      }
    } catch (error) {
      showAlert("Failed to update employee", 'error')
      console.log(error)
    }

  }

  const [employeeId, setEmployeeId] = useState(null)
  const openDeleteModal = (id) => {
    onDeleteOpen()
    setEmployeeId(id)
  }
  const deleteEmployee = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/delete`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
            user_id: employeeId
        })
      })
      const result = await response.json();
      if (result.success) {
        showAlert("Employee deleted successfully", 'success')
        fetchAllEmployees();

        onDeleteClose();
      }
    } catch (error) {
      console.log(error)
      showAlert("Internal server error", 'error')
    }
  }

  const filteredData = employees.filter(item =>
    item.name.toLowerCase().includes(filteredSectors.toLowerCase())
  );
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
            Employees
          </Text>
          <Flex gap={2}>

            <Flex gap={3}
            // display={location.pathname === "/admin/dashboard" ? "none" : "Flex"}
            >
              {/* {userDetails.type === "admin" || userDetails.active === 1 ? ( */}
              <Input h={"35px"} htmlSize={20} width='auto'  fontSize="var(--mini-text)"
                fontWeight="var(--big-font-weight)"
              placeholder="Search Name"
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
                onClick={() => onOpen()}
              >
                Add Employee
              </Button>

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
                  Name
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Email
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Mobile Number
                </Th>

                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Date of Birth
                </Th>

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
              {
                filteredData && filteredData.map((employee) => (
                  <Tr key={employee.id}>
                    <Td _hover={{ cursor: "pointer" }}>{employee.id}</Td>
                    <Td _hover={{ cursor: "pointer" }}>{employee.name}</Td>
                    <Td _hover={{ cursor: "pointer" }}>{employee.email}</Td>
                    <Td _hover={{ cursor: "pointer" }}>{employee.mobile_no}</Td>
                    <Td _hover={{ cursor: "pointer" }}>{(employee.date_of_birth)}</Td>
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

                            onClick={() => editEmployee(employee)}
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
                            onClick={() => openDeleteModal(employee.id)}

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
                ))
              }

            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      {/* Add Employee*/}
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
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.name && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.name.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Email</FormLabel>
                <Input type='text' {...register('email', { required: 'email is required' })}
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.email && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.email.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Mobile Number</FormLabel>
                <Input type='number' {...register('mobile_no', { required: 'Mobile Number is required' })}
                  placeholder='Enter Mobile Number' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.mobile_no && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.mobile_no.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Date of Birth</FormLabel>
                <Input type='date' {...register('date_of_birth', { required: 'Date of Birth is required' })}
                   fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.date_of_birth && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.date_of_birth.message}</Text>}
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


      <Modal isOpen={isEditOpen}
        onClose={onEditClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'18px'}>Update Sector</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <Box as='form' onSubmit={handleSubmit(onEditSubmit)} display={'flex'} flexDirection={'column'} gap={'8px'}>
              {/* <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Name</FormLabel>
                <Input type='text' {...register('name', { required: 'Name is required' })}
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.name && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.name.message}</Text>}
              </FormControl> */}
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Name</FormLabel>
                <Input type='text' {...register('name', { required: 'Name is required' })}
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.name && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.name.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Email</FormLabel>
                <Input type='text' {...register('email', { required: 'email is required' })}
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.email && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.email.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Mobile Number</FormLabel>
                <Input type='number' {...register('mobile_no', { required: 'Mobile Number is required' })}
                  placeholder='Enter Mobile Number' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.mobile_no && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.mobile_no.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Date of Birth</FormLabel>
                <Input type='date' {...register('date_of_birth', { required: 'Date of Birth is required' })}
                   fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.date_of_birth && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.date_of_birth.message}</Text>}
              </FormControl>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'} mt={'10px'}>
                <Button type='submit' fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
                  Save
                </Button>
                <Button onClick={onEditClose} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                  textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>Cancel</Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>

      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="16px" textAlign={'center'}> Delete Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={'center'}>
            <Text fontSize='var( --text-12px)' fontWeight="var(--big-font-weight)">Are you sure you want to delete this Employee?</Text>
          </ModalBody>
          <ModalFooter display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'}>
            <Button onClick={() => deleteEmployee()} fontSize='var(--mini-text)' bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
              Delete
            </Button>
            <Button onClick={() => onDeleteClose()} type="button" fontSize='var(--mini-text)' size={'sm'} border={'1px solid #FF5722 '}
              textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  )
}

export default Employee;
