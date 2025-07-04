import { Box, Button, Card, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tooltip, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { AppContext } from '../../context/AppContext';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';
import { decrypt } from '../../utils/security';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import Select from "react-select"

const ProductService = () => {
    const { showAlert, fetchProductService, productService, sectors, fetchSector, } = useContext(AppContext)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { register, handleSubmit, reset, setValue, formState: { errors }, control } = useForm();
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const admin_id = decrypt(user).id
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductService(admin_id)
        fetchSector(admin_id)
    }, [admin_id])

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("admin_id", admin_id);

        formData.append("name", data.name);
        formData.append("display_name", data.display_name)
        formData.append("description", data.description);

        formData.append("image", data.image[0]);
        formData.append("price", data.price);
        formData.append("cta", data.cta);
        formData.append("sector_id", data.sector_id);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product_service/add`, {
                method: "POST",
                headers: {

                    Authorization: token
                },
                body: formData
            })
            const result = await response.json();
            if (result.success) {
                showAlert("Product Service added successfully", 'success')
                fetchProductService(admin_id)
                reset();
                onClose();
            }
        } catch (error) {
            showAlert(result.error, 'error')
            console.log(error)
        }
    }

    const [editProductData, setEditProductData] = useState({});

    const editProduct = (productData) => {
        onEditOpen();
        setEditProductData(productData);
        setValue("name", productData.name);
        setValue("display_name", productData.display_name);
        setValue("description", productData.description);
        setValue("sector_name", productData.sector_name);
        setValue("sector_id", productData.sector_id);
        setValue("price", productData.price);
        setValue("cta", productData.cta);
    }

    const onEditSubmit = async (data) => {
        const formData = new FormData();
        formData.append("product_id", editProductData.id);
        formData.append("name", data.name);
        formData.append("display_name", data.display_name);
        formData.append("description", data.description);
        formData.append("sector_id", data.sector_id);
        formData.append("price", data.price);
        formData.append("cta", data.cta);
        if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product_service/update`, {
                method: "POST",
                headers: {
                    Authorization: token
                },
                body: formData
            })
            const result = await response.json();
            if (result.success) {
                showAlert("Product updated successfully", 'success')
                fetchProductService(admin_id);
                onEditClose();
            }

        } catch (error) {
            console.log(error)
            showAlert("Internal server error", 'error')
        }
    }
    const [deleteProductId, setDeleteProductId] = useState(null)
    const openDeleteModal = (id) => {
        setDeleteProductId(id)
        onDeleteOpen();
    }

    const deleteProduct = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product_service/delete_product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({
                    product_id: deleteProductId
                })
            })
            const result = await response.json();
            console.log(result)
            if (result.success) {
                showAlert("Product deleted successfully", 'success')
                fetchProductService(admin_id);
                onDeleteClose();
            }
        } catch (error) {
            console.log(error)
            showAlert("Internal server error", 'error')
        }
    }

    const allSector = sectors.map(sector => ({
        value: sector.id,
        label: sector.name,
        customLabel: (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{sector.name}</span>
            </div>
        )
    }));

    const [showPrice, setShowPrice] = useState(true);
    const [showCTA, setShowCTA] = useState(true);
    const [showImage, setShowImage] = useState(true);
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
                        Product
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
                                Add Product
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <TableContainer
                    mt="20px"
                    borderRadius="5px 5px 0px 0px"
                >
                    <Table size="sm" className="custom-striped-table">
                        <Thead border="0.5px solid #FFF5F3">
                            <Tr h="40px" bgColor="#FFF5F3">

                                <Th fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    fontSize="var(--mini-text)">
                                    Product Name
                                </Th>
                                <Th fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    fontSize="var(--mini-text)">
                                    Display Name
                                </Th>
                                <Th fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    fontSize="var(--mini-text)">
                                    Description
                                </Th>
                                <Th fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    fontSize="var(--mini-text)">
                                    Price
                                </Th>
                                <Th fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    fontSize="var(--mini-text)">
                                    CTA
                                </Th>
                                <Th fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    fontSize="var(--mini-text)">
                                    Sector
                                </Th>
                                <Th h fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    fontSize="var(--mini-text)">
                                    Image
                                </Th>
                                <Th h fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    fontSize="var(--mini-text)">
                                    Actions
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                productService.map((product) => (
                                    <Tr key={product.id}>
                                        <Td color={"#404040"}
                                            fontSize="var(--mini-text)"
                                            fontWeight="var(--big-font-weight)"
                                        // onClick={() => navigate(`/home/product/${product.id}`)}
                                        >{product.name}</Td>

                                        <Td color={"#404040"}
                                            fontSize="var(--mini-text)"
                                            fontWeight="var(--big-font-weight)">{product.display_name}</Td>
                                        <Td color={"#404040"}
                                            fontSize="var(--mini-text)"
                                            fontWeight="var(--big-font-weight)">
                                            <Box width="450px" overflow="hidden">
                                                <Tooltip label={product.description} hasArrow placement="top">
                                                    <Text
                                                        fontSize="14px"
                                                        sx={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'normal'
                                                        }}
                                                    >
                                                        {product.description}
                                                    </Text>
                                                </Tooltip>
                                            </Box>
                                        </Td>
                                        <Td color={"#404040"}
                                            fontSize="var(--mini-text)"
                                            fontWeight="var(--big-font-weight)">{product.price
                                            }</Td>
                                        <Td color={"#404040"}
                                            fontSize="var(--mini-text)"
                                            fontWeight="var(--big-font-weight)">{product.cta}
                                        </Td>
                                        <Td color={"#404040"}
                                            fontSize="var(--mini-text)"
                                            fontWeight="var(--big-font-weight)">{product.sector_name}</Td>

                                        <Td color={"#404040"}
                                            fontSize="var(--mini-text)"
                                            fontWeight="var(--big-font-weight)">
                                            <img
                                                src={`${import.meta.env.VITE_BACKEND_URL}/products/${product.image}`}
                                                alt={product.name}
                                                style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                            />
                                        </Td>

                                        <Td border="0.5px solid #F2F4F8" color={"#404040"} fontSize="var(--mini-text)">
                                            <Flex gap={2}>
                                                <Box bgColor={"#E7EAFB"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                                                    <MdOutlineModeEdit size={20} color={"#3550FF"} onClick={() => editProduct(product)} />
                                                </Box>
                                                <Box bgColor={"#F7E3E3"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                                                    <RiDeleteBin6Line size={20} color={"#D50B0B"} onClick={() => openDeleteModal(product.id)} />
                                                </Box>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>



                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontSize={'18px'}>Add Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Box as="form" onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'8px'}>
                                {/* Name */}
                                <FormControl isRequired isInvalid={errors.name}>
                                    <FormLabel fontSize="var(--mini-text)" mb="2px">Name</FormLabel>
                                    <Input type="text" {...register("name", { required: "Product name is required" })} placeholder="Enter product name" fontSize="var(--text-12px)" />
                                    {errors.name && <FormErrorMessage fontSize="var(--mini-text)">{errors.name.message}</FormErrorMessage>}
                                </FormControl>

                                {/* Display Name */}
                                <FormControl>
                                    <FormLabel fontSize="var(--mini-text)" mb="2px">Display Name</FormLabel>
                                    <Input type="text" {...register("display_name")} placeholder="Enter product display name" fontSize="var(--text-12px)" />
                                </FormControl>

                                {/* Description */}
                                <FormControl isRequired isInvalid={errors.description}>
                                    <FormLabel fontSize="var(--mini-text)" mb="2px">Description</FormLabel>
                                    <Input type="text" {...register("description", { required: "Description is required" })} placeholder="Enter description" fontSize="var(--text-12px)" />
                                    {errors.description && <FormErrorMessage fontSize="var(--mini-text)">{errors.description.message}</FormErrorMessage>}
                                </FormControl>

                                {/* Sector */}
                                <FormControl isRequired>
                                    <FormLabel fontSize="var(--mini-text)" mb="2px">Sector</FormLabel>
                                    <Controller
                                        name="sector_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                options={allSector}
                                                placeholder="Select sector"
                                                value={allSector.find(option => option.value === field.value)}
                                                onChange={(selectedOption) => field.onChange(selectedOption?.value || null)}
                                                getOptionLabel={(e) => e.customLabel || e.label}
                                                getOptionValue={(e) => e.value}
                                                styles={{
                                                    control: (base) => ({ ...base, fontSize: '12px' }),
                                                    option: (base) => ({ ...base, fontSize: '12px' }),
                                                    singleValue: (base) => ({ ...base, fontSize: '12px' }),
                                                    placeholder: (base) => ({ ...base, fontSize: '12px' }),
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>

                                <Box display={'flex'} gap={'6px'} alignItems={'center'} justifyContent={'center'}>
                                    <Box width={'full'}>
                                        <FormControl>
                                            <FormLabel fontSize="var(--mini-text)" mb="2px">Price</FormLabel>
                                            <Input type="text" {...register("price")} placeholder="Enter product price" fontSize="var(--text-12px)" />
                                        </FormControl>
                                        {/* {showPrice && (
                                            <FormControl>
                                                <FormLabel fontSize="var(--mini-text)" mb="2px">Price</FormLabel>
                                                <Input type="text" {...register("price")} placeholder="Enter product price" fontSize="var(--text-12px)" />
                                            </FormControl>
                                        )} */}
                                    </Box>
                                    <Checkbox
                                        isChecked={showPrice}
                                        onChange={(e) => setShowPrice(e.target.checked)}

                                        size={'md'}
                                    >
                                        Price
                                    </Checkbox>
                                </Box>
                                <Box display={'flex'} gap={'6px'} alignItems={'center'} justifyContent={'center'}>
                                    <Box width={'full'}>
                                        <FormControl>
                                            <FormLabel fontSize="var(--mini-text)" mb="2px">CTA</FormLabel>
                                            <Textarea
                                                {...register("cta")}
                                                placeholder="Enter CTA text or link"
                                                fontSize="var(--text-12px)"
                                                autoComplete="off"
                                                rows={3}
                                            />
                                        </FormControl>
                                        {/* {showCTA && (
                                            <FormControl>
                                                <FormLabel fontSize="var(--mini-text)" mb="2px">CTA</FormLabel>
                                                <Textarea
                                                    {...register("cta")}
                                                    placeholder="Enter CTA text or link"
                                                    fontSize="var(--text-12px)"
                                                    autoComplete="off"
                                                    rows={3}
                                                />
                                            </FormControl>

                                        )} */}
                                    </Box>
                                    <Checkbox
                                        isChecked={showCTA}
                                        onChange={(e) => setShowCTA(e.target.checked)}

                                        size={'md'}
                                    >
                                        CTA
                                    </Checkbox>
                                </Box>

                                <Box>
                                    <Box display={'flex'} gap={'6px'} alignItems={'center'} justifyContent={'center'}>
                                        <Box width={'full'}>
                                            <FormControl >
                                                <FormLabel fontSize="var(--mini-text)" mb="2px">Upload Image</FormLabel>
                                                <Input
                                                    type="file"
                                                    {...register('image')}
                                                    fontSize="var(--text-12px)"
                                                    sx={{
                                                        "::file-selector-button": {
                                                            backgroundColor: "#FF5722",
                                                            color: "white",
                                                            border: "none",
                                                            padding: "6px 12px",
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            fontSize: "var(--text-12px)",
                                                        },
                                                        "::file-selector-button:hover": {
                                                            backgroundColor: "#e64a19",
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            {/* {showImage && (
                                                <FormControl >
                                                    <FormLabel fontSize="var(--mini-text)" mb="2px">Upload Image</FormLabel>
                                                    <Input
                                                        type="file"
                                                        {...register('image')}
                                                        fontSize="var(--text-12px)"
                                                        sx={{
                                                            "::file-selector-button": {
                                                                backgroundColor: "#FF5722",
                                                                color: "white",
                                                                border: "none",
                                                                padding: "6px 12px",
                                                                borderRadius: "6px",
                                                                cursor: "pointer",
                                                                fontSize: "var(--text-12px)",
                                                            },
                                                            "::file-selector-button:hover": {
                                                                backgroundColor: "#e64a19",
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                            )} */}
                                        </Box>

                                        <Checkbox
                                            isChecked={showImage}
                                            onChange={(e) => setShowImage(e.target.checked)}

                                            size={'md'}
                                        >
                                            img
                                        </Checkbox>
                                    </Box>
                                </Box>
                                {/* Buttons */}
                                <Box display="flex" alignItems="center" justifyContent="center" mt="10px" gap="10px">
                                    <Button type="button" size="sm" fontSize="13px" border="1px solid #FF5722" textColor="#FF5722" bg="white" onClick={onClose}>Cancel</Button>
                                    <Button type="submit" fontSize="13px" bg="#FF5722" textColor="white" size="sm">Save</Button>
                                </Box>
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Modal isOpen={isEditOpen}
                    onClose={onEditClose} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontSize={'18px'}>Edit Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Box as="form" onSubmit={handleSubmit(onEditSubmit)} display={'flex'} flexDirection={'column'} gap={'8px'}>
                                <FormControl isRequired>
                                    <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Name</FormLabel>
                                    <Input type='text' {...register("name", { required: "Product name is required" })} placeholder='enter product name' fontSize="var(--text-12px)" autoComplete='off'></Input>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Description</FormLabel>
                                    <Input type='text' {...register("description", { required: "description is required" })} placeholder='enter description' fontSize="var(--text-12px)" autoComplete='off'></Input>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontSize="var(--mini-text)" mb="2px">
                                        Sector
                                    </FormLabel>
                                    <Controller
                                        name="sector_id"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <>
                                                <Select
                                                    options={allSector}
                                                    placeholder="Select sector"
                                                    value={allSector.find(option => option.value === field.value)}
                                                    onChange={(selectedOption) => {
                                                        field.onChange(selectedOption?.value || null);
                                                    }}
                                                    getOptionLabel={(e) => e.customLabel || e.label}
                                                    getOptionValue={(e) => e.value}
                                                    styles={{
                                                        control: (provided) => ({ ...provided, fontSize: "12px" }),
                                                        option: (provided) => ({ ...provided, fontSize: "12px" }),
                                                        singleValue: (provided) => ({ ...provided, fontSize: "12px" }),
                                                        menu: (provided) => ({ ...provided, fontSize: "12px" }),
                                                        placeholder: (provided) => ({ ...provided, fontSize: "12px" }),
                                                    }}
                                                />
                                                {/* Uncomment below to show validation error */}
                                                {/* {error && <p style={{ color: "red", fontSize: "12px" }}>{error.message}</p>} */}
                                            </>
                                        )}
                                    />
                                </FormControl>
                                <FormControl  >
                                    <FormLabel fontSize="var(--mini-text)" mb={'2px'}> Display Name</FormLabel>
                                    <Input type='text' {...register("display_name")} placeholder='enter product display name' fontSize="var(--text-12px)" autoComplete='off'></Input>

                                </FormControl>
                                <FormControl  >
                                    <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Price</FormLabel>
                                    <Input type='text' {...register("price")} placeholder='enter product price' fontSize="var(--text-12px)" autoComplete='off'></Input>

                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize="var(--mini-text)" mb="2px">CTA</FormLabel>
                                    <Textarea
                                        {...register("cta")}
                                        placeholder="Enter CTA text or link"
                                        fontSize="var(--text-12px)"
                                        autoComplete="off"
                                        rows={3}
                                    />
                                </FormControl>


                                <FormControl isRequired>
                                    <FormLabel fontSize="var(--mini-text)" mb="2px">
                                        Upload Image
                                    </FormLabel>
                                    <Input
                                        type="file"
                                        {...register('image')}
                                        fontSize="var(--text-12px)"
                                        colorScheme="orange"
                                        sx={{
                                            "::file-selector-button": {
                                                backgroundColor: "#FF5722",
                                                color: "white",
                                                border: "none",
                                                padding: "6px 12px",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "var(--text-12px)",
                                            },
                                            "::file-selector-button:hover": {
                                                backgroundColor: "#e64a19",
                                            }
                                        }}
                                    />
                                </FormControl>

                                <Box w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} mt={'10px'}>

                                    <Button w={'100%'} onClick={onEditClose} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                                        textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>Cancel</Button>
                                    <Button w={'100%'} type='submit' fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
                                        Update
                                    </Button>
                                </Box>
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontSize="16px" textAlign={'center'}> Delete Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody textAlign={'center'}>
                            <Text fontSize='var( --text-12px)' fontWeight="var(--big-font-weight)">Are you sure you want to delete this product?</Text>
                        </ModalBody>
                        <ModalFooter w='100%' display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'}>
                            <Button w='100%' onClick={deleteProduct} fontSize='var(--mini-text)' bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
                                Delete
                            </Button>
                            <Button w='100%' onClick={onDeleteClose} type="button" fontSize='var(--mini-text)' size={'sm'} border={'1px solid #FF5722 '}
                                textColor={'#FF5722'} bgColor={'white'} _hover={''}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </Card>
    )
}

export default ProductService
