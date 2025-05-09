import {
  Avatar,
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

  Switch,

  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr, useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Card from "../../../Card";
import { IoMdAdd } from "react-icons/io";
import { RxDotsHorizontal } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

function Employee() {

  const navigate = useNavigate()
  const { showAlert } = useContext(AppContext)

  const { fetchAllEmployee, employee, formatDate } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { register, handleSubmit, setValue, reset, control, formState: { errors } } = useForm();

  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [activeData, setActiveData] = useState([]);
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchAllEmployee();

  }, [activeData]);


  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/add`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          mobile_no: values.mobile_no,
          date_of_birth: values.date_of_birth ? values.date_of_birth.split("T")[0] : "",
          role: "Admin"

        })
      })
      const result = await response.json();
      if (result.success) {
        showAlert("Employee added successfully!", 'success');
        fetchAllEmployee();
        reset();
        onClose();
      } else {
        console.log(result.error)
        showAlert(result.error || "Failed to add employee.", 'error');
      }

    } catch (error) {
      console.log(error)
      showAlert("Failed to add employee.", 'error');
    }
  }
  // console.log(employee, "eef");

  const roleOptions = [
    {
      label: "Super Admin",
      value: "Super-Admin"
    },
    {
      label: "Admin",
      value: "-Admin"
    },
    {
      label: "Technician",
      value: "Technician"
    },
    {
      label: "Help and Support",
      value: "support"
    }
  ];



  const editEmployee = (empData) => {
    setSelectedEmployee(empData);
    onOpenEdit();

    Object.keys(empData).forEach((key) => {
      if (key === "date_of_birth" && empData[key]) {

        setValue(key, empData[key].split("T")[0]);
      } else {
        setValue(key, empData[key]);
      }
    });
  };


  const onSubmitEdit = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/update`, {
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
          role: "Admin"
        }),
      });

      const result = await response.json();
      if (result.success) {
        showAlert("Employee updated successfully", 'success');
        fetchAllEmployee();

        onCloseEdit();
      } else {

        showAlert(result.error || "Failed to update Admin.", 'error');
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      showAlert("Failed to update employee.", 'error');
    }
  };


  const onCloseEditModal = () => {
    onCloseEdit();
    reset();
  };

  const openDeleteModal = (id) => {
    setSelectedEmployeeId(id);
    onOpenDelete();
  };

  const deleteEmployee = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ user_id: selectedEmployeeId }),
      });

      const result = await response.json();

      if (result.success) {
        showAlert("Employee deleted successfully", 'success');
        fetchAllEmployee();
        reset();
        onCloseDelete();
      } else {
        showAlert("Failed to delete employee.", 'error');
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      showAlert(result.error || "Failed to delete employee.", 'error');
    } finally {

      onCloseDelete();

    }
  };
  const updateStatus = async (id, isChecked) => {
    const newStatus = isChecked ? 0 : 1;
    setActiveData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, is_active: newStatus } : item
      )
    );

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/getActiveStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ user_id: id, is_active: newStatus, }),
      })
      const data = await response.json();
      // console.log(data);

    } catch (error) {
      console.log(error)
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
            Admin
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
              fo    ntWeight="var(--big-font-weight)"
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

            {/* <Flex>
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
                Add Admin
              </Button>
            </Flex> */}
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
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Active
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
                      A-{d.id}
                    </Td>

                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"

                      fontWeight="var(--big-font-weight)"
                      onClick={() => navigate(`/home/admin/${d.id}`)}
                      cursor={'pointer'}
                    >
                      <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} flexDirection={'row'} gap={'4px'}>
                        <Avatar size={'xs'} name={d.name}></Avatar>      {d.name}</Box>
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
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      <Switch
                        isChecked={d.is_active === 0}
                        onChange={(e) => updateStatus(d.id, e.target.checked)}
                      />                    </Td>
                    <Td border="0.5px solid #F2F4F8" color={"#404040"} fontSize="var(--mini-text)">
                      <Flex gap={2}>
                        <Box bgColor={"#E7EAFB"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                          <MdOutlineModeEdit size={20} color={"#3550FF"} onClick={() => editEmployee(d)} />
                        </Box>
                        <Box bgColor={"#F7E3E3"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                          <RiDeleteBin6Line size={20} color={"#D50B0B"} onClick={() => openDeleteModal(d.id)} />
                        </Box>
                      </Flex>

                      {/* <Menu >
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
                            onClick={() => editEmployee(d)}
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
          <ModalHeader fontSize={'18px'}>Add Admin</ModalHeader>
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

              {/* <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'} >Select Role</FormLabel>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Please select a role" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={roleOptions}
                        placeholder="Select Role"
                        value={roleOptions.find(option => option.value === field.value)}
                        onChange={selectedOption => field.onChange(selectedOption?.value)}
                        styles={{
                          control: (provided) => ({ ...provided, fontSize: "12px" }),
                          option: (provided) => ({ ...provided, fontSize: "12px" }),
                          singleValue: (provided) => ({ ...provided, fontSize: "12px" }),
                          menu: (provided) => ({ ...provided, fontSize: "12px" }),
                          placeholder: (provided) => ({ ...provided, fontSize: "12px" }),
                        }}
                      />
                      {error && <p style={{ color: "red", fontSize: "12px" }}>{error.message}</p>}
                    </>
                  )}
                />
              </FormControl> */}

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
          <ModalHeader fontSize={"18px"}>Edit Admin</ModalHeader>
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
                <Input
                  type="number"
                  {...register("mobile_no", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/, // Ensures exactly 10 digits
                      message: "Phone number must be exactly 10 digits"
                    }
                  })}
                  fontSize="var(--text-12px)"
                />
                {errors.mobile_no && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.mobile_no.message}</Text>}
              </FormControl>


              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>DOB</FormLabel>
                <Input type="date" {...register("date_of_birth", { required: "DOB is required" })}
                  fontSize="var(--text-12px)" />
              </FormControl>

              {/* <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>Select Role</FormLabel>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Please select a role" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={roleOptions}
                        placeholder="Select Role"
                        value={roleOptions.find(option => option.value === field.value)}
                        onChange={selectedOption => field.onChange(selectedOption?.value)}
                        styles={{
                          control: (provided) => ({ ...provided, fontSize: "12px" }),
                          option: (provided) => ({ ...provided, fontSize: "12px" }),
                          singleValue: (provided) => ({ ...provided, fontSize: "12px" }),
                          menu: (provided) => ({ ...provided, fontSize: "12px" }),
                          placeholder: (provided) => ({ ...provided, fontSize: "12px" }),
                        }}
                      />
                      {error && <p style={{ color: "red", fontSize: "12px" }}>{error.message}</p>}
                    </>
                  )}
                />
              </FormControl> */}

              <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"6px"} mt={"10px"}>
                <Button type="submit" fontSize={"13px"} bgColor={"#FF5722"} textColor={"white"} size={"sm"}>Save</Button>
                <Button onClick={onCloseEditModal} type="button" size={"sm"} fontSize={"13px"} border={"1px solid #FF5722"} textColor={"#FF5722"} bgColor={"white"}>Cancel</Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>




      <Modal isOpen={isOpenDelete} onClose={onCloseDelete} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="16px" textAlign={'center'}> Delete Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={'center'}>
            <Text fontSize='var( --text-12px)' fontWeight="var(--big-font-weight)">Are you sure you want to delete this Admin?</Text>
          </ModalBody>
          <ModalFooter display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'}>
            <Button onClick={deleteEmployee} fontSize='var(--mini-text)' bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
              Delete
            </Button>
            <Button onClick={onCloseDelete} type="button" fontSize='var(--mini-text)' size={'sm'} border={'1px solid #FF5722 '}
              textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Card>
  );
}

export default Employee;
