import { DeleteIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Divider, Flex, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import Select from "react-select"
import { MdOutlineModeEdit } from 'react-icons/md'
import { RxDotsHorizontal } from 'react-icons/rx'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Sector = () => {
  const token = localStorage.getItem('token')
  const { showAlert, fetchProductService, productService, sectors, fetchSector } = useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors }, control
  } = useForm({
    defaultValues: {
      products: []
    }
  });
  const navigate = useNavigate();

  const all_productServices = productService.map(product => ({
    value: product.id,
    label: product.name,
    customLabel: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img src={product.iconUrl} alt="" width="20" height="20" /> {/* if product has icon */}
        <span>{product.name}</span>
      </div>
    )
  }));
  useEffect(() => {
    fetchSector();
  }, [])

  useEffect(() => {
    fetchProductService()
  }, [])



  const onSubmit = async (data) => {
    console.log(data)
    const formData = new FormData();


    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("icon", data.icon[0]);
    formData.append("description", data.description);
    formData.append("products", JSON.stringify(data.products));
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/add`, {
        method: "POST",
        headers: {

          Authorization: token
        },
        body: formData
      })
      const result = await response.json();
      console.log(result)
      if (result.success) {
        showAlert("Product Service added successfully", 'success')
        fetchProductService()
        reset();
        onClose();
      }
    } catch (error) {
      showAlert("Failed to add product service", 'error')
      console.log(error)
    }
  }

  const editSector = () => {
    onEditOpen();
  }

  const openDeleteModal = () => {
    onDeleteOpen()
  }

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
            Sector
          </Text>
          <Flex gap={2}>

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
                Add Sector
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
                  Category
                </Th>
                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Description
                </Th>

                <Th
                  fontWeight="var(--big-font-weight)"
                  color="var(--text-black)"
                  borderRadius=""
                  fontSize="var(--mini-text)"
                >
                  Icon
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
                sectors.map((sector) => (
                  <Tr key={sector.id}>
                    <Td onClick={() => navigate(`/admin/sector/${sector.id}`)} _hover={{ cursor: "pointer" }}>{sector.id}</Td>
                    <Td onClick={() => navigate(`/admin/sector/${sector.id}`)} _hover={{ cursor: "pointer" }}>{sector.name}</Td>
                    <Td onClick={() => navigate(`/admin/sector/${sector.id}`)} _hover={{ cursor: "pointer" }}>{sector.category}</Td>
                    <Td onClick={() => navigate(`/admin/sector/${sector.id}`)} _hover={{ cursor: "pointer" }}>{sector.description}</Td>

                    <Td color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/sector/${sector.image}`}
                        alt={sector.name}
                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                      />
                    </Td>
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

                            onClick={() => editSector(sector)}
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
                          onClick={() => openDeleteModal(sector.id)}

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

      {/* add Sector*/}
      <Modal isOpen={isOpen}
        onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'18px'}>Add Sector</ModalHeader>
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
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Category</FormLabel>
                <Input type='text' {...register('category', { required: 'category is required' })}
                  placeholder='Enter category' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.category && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.category.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>description</FormLabel>
                <Input type='text' {...register('description')}
                  placeholder='Enter description' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.description && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.description.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'} >Icon</FormLabel>
                <Input type='file' {...register('icon')} fontSize="var(--text-12px)"  ></Input>

              </FormControl>


              <Controller
                name="products"
                control={control}
                rules={{ required: "Please select at least one product" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      isMulti
                      options={all_productServices}
                      placeholder="Select Products"
                      value={all_productServices.filter(option => field.value?.includes(option.value))}
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(option => option.value);
                        field.onChange(selectedValues);
                      }}
                      getOptionLabel={(e) => e.customLabel || e.label}
                      getOptionValue={(e) => e.value}
                    />
                    {error && <p style={{ color: "red", fontSize: "12px" }}>{error.message}</p>}
                  </>
                )}
              />



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

            <Box as='form' onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'8px'}>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Name</FormLabel>
                <Input type='text' {...register('name', { required: 'Name is required' })}
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.name && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.name.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Category</FormLabel>
                <Input type='text' {...register('category', { required: 'category is required' })}
                  placeholder='Enter category' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.category && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.category.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>description</FormLabel>
                <Input type='text' {...register('description')}
                  placeholder='Enter description' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.description && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.description.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'} >Icon</FormLabel>
                <Input type='file' fontSize="var(--text-12px)"  ></Input>

              </FormControl>

              <Controller
                name="products"
                control={control}
                rules={{ required: "Please select at least one product" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      isMulti
                      options={all_productServices}
                      placeholder="Select Products"
                      value={all_productServices.filter(option => field.value?.includes(option.value))}
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(option => option.value);
                        field.onChange(selectedValues);
                      }}
                      getOptionLabel={(e) => e.customLabel || e.label}
                      getOptionValue={(e) => e.value}
                    />
                    {error && <p style={{ color: "red", fontSize: "12px" }}>{error.message}</p>}
                  </>
                )}
              />

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




      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="16px" textAlign={'center'}> Delete Sector</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={'center'}>
            <Text fontSize='var( --text-12px)' fontWeight="var(--big-font-weight)">Are you sure you want to delete this Sector?</Text>
          </ModalBody>
          <ModalFooter display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'}>
            <Button  fontSize='var(--mini-text)' bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
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

export default Sector
