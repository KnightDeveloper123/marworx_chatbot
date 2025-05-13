import {
  Box,
  Button,
  Card,
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import { IoMdAdd } from "react-icons/io";
import { DeleteIcon } from "@chakra-ui/icons";
import { decrypt } from "../../utils/security";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";

const Template = () => {
  const { showAlert, fetchTemplate,template } = useContext(
    AppContext
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();
  const {  isOpen: isDeleteOpen,   onOpen: onDeleteOpen,  onClose: onDeleteClose } = useDisclosure();
  const {  register,handleSubmit,reset,setValue, formState: { errors },} = useForm();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate=useNavigate();

  useEffect(() => {
    fetchTemplate();
  }, []);
 
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/template/add`,
        {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            industry: data.industry,
            category: data.category
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        const flowid=result.flowId;
        navigate(`/create_template/${flowid}`)
        reset();
        onClose();
      }
    } catch (error) {
      showAlert("Failed to add product service", "error");
      console.log(error);
    }
  };

  const [editProductData, setEditProductData] = useState({});

  const editProduct = (productData) => {
    onEditOpen();
    setEditProductData(productData);
    setValue("name", productData.name);
    setValue("description", productData.description);
  };

  const onEditSubmit = async (data) => {
    const formData = new FormData();
    formData.append("product_id", editProductData.id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product_service/update`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        showAlert("Product updated successfully", "success");
        fetchProductService(admin_id);
        onEditClose();
      }
    } catch (error) {
      console.log(error);
      showAlert("Internal server error", "error");
    }
  };

  const [deleteProductId, setDeleteProductId] = useState(null);
  const openDeleteModal = (id) => {
    setDeleteProductId(id);
    onDeleteOpen();
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product_service/delete_product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            product_id: deleteProductId,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        showAlert("Product deleted successfully", "success");
        fetchProductService(admin_id);
        onDeleteClose();
      }
    } catch (error) {
      console.log(error);
      showAlert("Internal server error", "error");
    }
  };
  return (
    <Card>
      <Flex
        w="100%"
        justifyContent="space-between"
        flexDirection={"column"}
        p="15px"
      >
        <Flex
          w="100%"
          alignItems={"center"}
          justifyContent="space-between"
          gap="10px"
        >
          <Text fontWeight="var(--big-font-weight)" fontSize="var(--semi-big)">
            Template
          </Text>
          <Flex gap={2}>
            <Flex>
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
                Add Template
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <TableContainer mt="20px" borderRadius="5px 5px 0px 0px">
          <Table size="sm" className="custom-striped-table">
            <Thead border="0.5px solid #FFF5F3">
              <Tr h="40px" bgColor="#FFF5F3">
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  ID
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  Industry Name
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  Category
                </Th>

                <Th
                  h
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  fontSize="var(--mini-text)"
                >
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {template && template.map((item, i) => (
                <Tr key={i+1}>
                  <Td
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                    {item.id}
                  </Td>
                   <Td
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                    {item.industry}
                  </Td>

                  <Td
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                   {item.category}
                  </Td>

                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                  >
                    <Flex gap={2}>
                      <Box
                        bgColor={"#E7EAFB"}
                        p={1}
                        borderRadius={"5px"}
                        cursor={"pointer"}
                      >
                        <LuEye
                          size={20}
                          color={"#3550FF"}
                          onClick={() => navigate(`/view_template/${item.id}`)}
                        />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={"18px"}>Add Industry</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box as="form" onSubmit={handleSubmit(onSubmit)} display={"flex"} flexDirection={"column"} gap={"10px"}>
                <FormControl isRequired isInvalid={errors.industry}>
                  <FormLabel fontSize="var(--mini-text)" mb={"2px"}>
                    Industry
                  </FormLabel>
                  <Input
                    type="text"
                    {...register("industry", {
                      required: "Industry is required",
                    })}
                    placeholder="enter Industry name"
                    fontSize="var(--text-12px)"
                    autoComplete="off"
                  ></Input>
                  {errors.industry && (
                    <FormErrorMessage fontSize="var(--mini-text)">
                      {errors.industry.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={errors.category}>
                  <FormLabel fontSize="var(--mini-text)" mb={"2px"}>
                    Category
                  </FormLabel>
                  <Input
                    type="text"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    placeholder="enter category"
                    fontSize="var(--text-12px)"
                    autoComplete="off"
                  ></Input>
                  {errors.category && (
                    <FormErrorMessage fontSize="var(--mini-text)">
                      {errors.category.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"6px"}
                  mt={"10px"}
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
                    w={"100%"}
                    _hover={""}
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
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={"18px"}>Edit Sector</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box as="form" onSubmit={handleSubmit(onEditSubmit)}>
                <FormControl>
                  <FormLabel fontSize="var(--mini-text)" mb={"2px"}>
                    Name
                  </FormLabel>
                  <Input
                    type="text"
                    {...register("name", {
                      required: "Product name is required",
                    })}
                    placeholder="enter product name"
                    fontSize="var(--text-12px)"
                    autoComplete="off"
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="var(--mini-text)" mb={"2px"}>
                    Description
                  </FormLabel>
                  <Input
                    type="text"
                    {...register("description", {
                      required: "description is required",
                    })}
                    placeholder="enter description"
                    fontSize="var(--text-12px)"
                    autoComplete="off"
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="var(--mini-text)" mb={"2px"}>
                    Image
                  </FormLabel>
                  <Input
                    type="file"
                    {...register("image")}
                    fontSize="var(--text-12px)"
                    autoComplete="off"
                  ></Input>
                </FormControl>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"6px"}
                  mt={"10px"}
                >
                  <Button
                    type="submit"
                    fontSize={"13px"}
                    bgColor={"#FF5722"}
                    _hover={""}
                    textColor={"white"}
                    size={"sm"}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={onEditClose}
                    type="button"
                    size={"sm"}
                    fontSize={"13px"}
                    border={"1px solid #FF5722 "}
                    textColor={"#FF5722"}
                    bgColor={"white"}
                    mr={3}
                    _hover={""}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="16px" textAlign={"center"}>
              {" "}
              Delete Product
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign={"center"}>
              <Text
                fontSize="var( --text-12px)"
                fontWeight="var(--big-font-weight)"
              >
                Are you sure you want to delete this product?
              </Text>
            </ModalBody>
            <ModalFooter
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"6px"}
            >
              <Button
                onClick={deleteProduct}
                fontSize="var(--mini-text)"
                bgColor={"#FF5722"}
                _hover={""}
                textColor={"white"}
                size={"sm"}
              >
                Delete
              </Button>
              <Button
                onClick={onDeleteClose}
                type="button"
                fontSize="var(--mini-text)"
                size={"sm"}
                border={"1px solid #FF5722 "}
                textColor={"#FF5722"}
                bgColor={"white"}
                mr={3}
                _hover={""}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
      </Flex>
    </Card>
  );
};

export default Template;
