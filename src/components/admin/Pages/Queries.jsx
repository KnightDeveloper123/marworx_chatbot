import React, { useEffect } from "react";
import Card from "../../../Card";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";
import { decrypt } from "../../utils/security";
import { RiDeleteBin6Line } from "react-icons/ri";

function Queries() {

  const user=localStorage.getItem('user')
  const admin_id=decrypt(user).id
  useEffect(() => {
    fetchAllQueries();
    fetchAllEmployeeQuery(admin_id);
  }, []);
  const {
    fetchAllQueries,
    fetchAllEmployeeQuery,
    all_employees,
    queries,
    formatDate, APP_URL, showAlert, loading
  } = useContext(AppContext);



  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isdeleteOpen,
    onOpen: ondeleteOpen,
    onClose: ondeleteClose,
  } = useDisclosure();
  const [selectedQuery, setSelectedQuery] = useState({})
  const token = localStorage.getItem('token');
  const editleads = (data) => {
    onOpen(); // Open the modal
    setSelectedQuery({
      query: data.query,
      query_status: data.query_status,
      assignee_id: data.assignee_id,
      id: data.id,
      user_id: data.user_id // Store ID if needed during update
    });
  };

  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      query: "",
      query_status: "",
      assignee_id: "",
      user_id: "" // Add if required
    },
    // resolver: yupResolver(add_querySchema),
  });
  useEffect(() => {
    if (selectedQuery) {
      // Delay to ensure modal is open before resetting values
      setTimeout(() => {
        reset({
          query: selectedQuery.query || "",
          query_status: selectedQuery.query_status || "",
          assignee_id: selectedQuery.assignee_id || "",
          query_id: selectedQuery.id,
          user_id: selectedQuery.user_id
        });
      }, 100);
    }
  }, [selectedQuery, reset]);
  useEffect(() => {
    if (isOpen) {
      reset({
        query: "",
        query_status: "",
        assignee_id: "",
        query_id: "",
      });
    }
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    const fetchData = {
      query: data.query,
      query_status: data.query_status,
      assignee_id: data.assignee_id,
      query_id: data.query_id,
      user_id: data.user_id
    }
    try {
      const response = await fetch(`${APP_URL}/support/updateQuery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(fetchData)
      });

      if (response.ok) {
        showAlert('Query updated successfully!', 'success');
        onClose(); // Close modal after update
        fetchAllQueries();
      } else {
        showAlert('Error updating Query!', 'error');
      }
    } catch (error) {
      console.error('API error:', error);
      showAlert('Failed to update Query!', 'error');
    }
  };

  const [selectLeads, setSelectLead] = useState({});
  const [deleteId, setdeleteId] = useState({});
  const deteleuery = (id) => {
    setdeleteId(id);
    ondeleteOpen();
  };

  const deleteleads = async (e) => {
    e.preventDefault();
    try {
      //   setloading(true); // Show loader while request is in progress

      const response = await fetch(`${APP_URL}/support/deleteQuery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Ensure correct token format
        },
        body: JSON.stringify({ query_id: deleteId }),
      });


      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        showAlert("Query deleted successfully!", "success");
        fetchAllQueries(); // Refresh the list after deletion
      } else {
        showAlert(data.error || "Error deleting query!", "error");
      }
    } catch (error) {
      console.error("API Error:", error);
      showAlert("Failed to delete query!", "error");
    } finally {
      //   setloading(false); // Hide loader after request
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
            Queries
          </Text>
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
                  query
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  query status
                </Th>

                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Assignee
                </Th>

                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  created at
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
              {queries &&
                queries.map((d, index) => (
                  <Tr
                    key={index + 1}
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
                      Q-{d.id}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    // onClick={() => editleads(d.id)} _hover={{ cursor: "pointer", color: "navy" }}
                    >
                      {d.query}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {d.query_status}
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    // onClick={() => fetchNextUrl(d.assigen_to)} _hover={{ cursor: "pointer", color: "navy" }}
                    >
                      <Flex display={"flex"} alignItems={"center"} gap={"5px"}>
                        <Avatar size={"xs"} name={d.assignee_name} />
                        {d.assignee_name}
                      </Flex>
                    </Td>
                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)"
                    >
                      {formatDate(d.created_at)}
                    </Td>

                    <Td
                      border="0.5px solid #F2F4F8"
                      color={"#404040"}
                      fontSize="var(--mini-text)"
                    >
                      <Flex gap={2}>
                        <Box bgColor={"#E7EAFB"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                          <MdOutlineModeEdit size={20} color={"#3550FF"} onClick={() => editleads(d)} />
                        </Box>
                        <Box bgColor={"#F7E3E3"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                          <RiDeleteBin6Line size={20} color={"#D50B0B"}  onClick={() => {setSelectLead(d);deteleuery(d.id);}} />
                        </Box>
                      </Flex>
                      {/* <Menu>
                        <MenuButton
                          bgColor="transparent"
                          _hover={{
                            bgColor: "transparent",
                            color: "var(--active-bg)",
                          }}
                          _active={{
                            bgColor: "transparent",
                            color: "var(--active-bg)",
                          }}
                          as={Button}
                        >
                          <RxDotsHorizontal />
                        </MenuButton>
                        <MenuList gap={2}>
                          <MenuItem
                            w="100%"
                            minW="100px"
                            onClick={() => editleads(d)}
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                          >
                            <MdOutlineModeEdit color="green" />
                            <Text
                              fontSize="var(--mini-text)"
                              fontWeight="var(--big-font-weight)"
                            >
                              Edit
                            </Text>
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            w="100%"
                            minW="100px"
                            cursor="pointer"
                            onClick={() => {
                              setSelectLead(d);
                              deteleuery(d.id);
                            }}
                          >
                            <Flex gap={2} alignItems="center">
                              <DeleteIcon color={"red"} />
                              <Text>Delete</Text>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form"
          display={"flex"}
          flexDirection={"column"}
          gap={"8px"}
          onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontSize={"18px"}>Add Queries</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
                display={"flex"} flexDir={"column"} gap={"8px"}
            >
              <FormControl isRequired isInvalid={errors.query}>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>
                  Query
                </FormLabel>
                <Input
                  type="text"
                  {...register("query")}
                  placeholder="Enter your query"
                  fontSize="var(--text-12px)"

                />
                <FormErrorMessage fontSize="var(--text-12px)" mt={0}>
                  {errors.query?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.query_status}>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>
                  Query Status
                </FormLabel>
                <Input
                  type="text"
                  {...register("query_status")}
                  placeholder="Enter query status"
                  fontSize="var(--text-12px)"

                />

                <FormErrorMessage mt={0}>
                  {errors.query_status?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.assignee_id}>
                <FormLabel fontSize="var(--mini-text)" mb={"2px"}>
                  Assignee
                </FormLabel>
                <Controller
                  name="assignee_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={all_employees}
                      placeholder="Select Assignee"
                      value={all_employees.find((item) => item.value === field.value)}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption?.value)
                      }
                      styles={{
                        control: (provided) => ({
                          ...provided, fontSize: '14px',
                        }),
                        option: (provided) => ({
                          ...provided, fontSize: '14px',
                        }),
                        singleValue: (provided) => ({
                          ...provided, fontSize: '14px',
                        }),
                        menu: (provided) => ({
                          ...provided, fontSize: '14px',
                        }),
                        placeholder: (provided) => ({
                          ...provided, fontSize: '14px',
                        }),
                      }}
                    />
                  )}
                />

                <FormErrorMessage fontSize="var(--text-12px)" mt={0}>
                  {errors.assignee_id?.message}
                </FormErrorMessage>
              </FormControl>

            </Box>
          </ModalBody>

          <ModalFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"6px"}
            w={"100%"}
          >
            <Button
              onClick={onClose}
              type="button"
              size={"sm"}
              fontSize={"13px"}
              border={"1px solid #FF5722 "}
              textColor={"#FF5722"}
              bgColor={"white"}
              mr={3}
              _hover={""}
              w={"100%"}
            >
              Cancel
            </Button>
              <Button
              type="submit"
              fontSize={"13px"}
              bgColor={"#FF5722"}
              _hover={""}
              textColor={"white"}
              size={"sm"}
              w={"100%"}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isCentered isOpen={isdeleteOpen} onClose={ondeleteClose}>
        <ModalOverlay />
        <ModalContent borderRadius="var(--radius)">
          <ModalHeader textAlign={"center"} fontSize={"16px"}>
            Delete Query
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Flex
              gap="1rem"
              onSubmit={deleteleads}
              flexDirection="column"
              as="form"
            >

              <Text
                fontSize="var(--mini-text)"
                fontWeight="var(--big-font-weight)"
              >
                Are you sure you want to Query?
              </Text>
              <Flex gap="10px" w="100%" justifyContent={"center"}>
                <Button
                  borderRadius="var(--radius)"
                  w="max-content"
                  size={'sm'} _hover={{ bgColor: 'var(--active-bg)' }} bgColor='var(--active-bg)' color='var(--text-white)'
                  fontSize="var(--mini-text)"
                  fontWeight="var(--big-font-weight)"
                  type="submit"
                //   isLoading={loading}
                >
                  Delete
                </Button>

                <Button
                  borderRadius="var(--radius)"
                  fontSize="var(--mini-text)"
                  size={'sm'} bgColor={"var(--text-white)"} color={'var(--active-bg)'} _hover={{ bgColor: 'var(--text-white)' }} border={'1px solid var(--active-bg)'}
                  onClick={ondeleteClose}

                >
                  Close
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export default Queries;
