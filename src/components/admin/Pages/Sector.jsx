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

const Sector = () => {
  const token = localStorage.getItem('token')
  const { showAlert, fetchProductService, productService, sectors, fetchSector } = useContext(AppContext)
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

  const all_productServices = productService.map(product => ({
    value: product.id,
    label: product.name,
    customLabel: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img src={product.iconUrl} alt="" width="20" height="20" />
        <span>{product.name}</span>
      </div>
    )
  }));

  useEffect(() => {
    fetchSector(admin_id);
    fetchProductService(admin_id)
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
 
    const formData = new FormData();
    formData.append("admin_id", admin_id);
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
   
      if (result.success) {
        showAlert("Sector added successfully", 'success')
        fetchSector(admin_id);
        reset();
        onClose();
      }
    } catch (error) {
      showAlert("Failed to add sector ", 'error')
      console.log(error)
    }
  }

  const [sectorUpdate, setSectorUpdate] = useState({});
  const editSector = (data) => {
    onEditOpen();
    setSectorUpdate(data);
    setValue("name", data.name);
    if (data.category) {
      setValue("category", data.category);
    } else {
      setValue("category", null);
    }

    setValue('description', data.description);
    setValue('products', data.product_ids)

  };

  const onEditSubmit = async (data) => {
    const formData = new FormData();
    formData.append('sector_id', sectorUpdate.id)
    formData.append("name", data.name);
    formData.append("category", data.category);
    if (data.icon && data.icon.length > 0) {
      formData.append("icon", data.icon[0]);
    }
    formData.append("description", data.description);
    formData.append("products", JSON.stringify(data.products));
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/update`, {
        method: "POST",
        headers: {

          Authorization: token
        },
        body: formData
      })
      const result = await response.json();

      if (result.success) {

        showAlert("sector updated successfully", 'success')
        fetchSector()
        
        onEditClose();
      }
    } catch (error) {
      showAlert("Failed to update sector", 'error')
      console.log(error)
    }

  }

  const [sectorId, setSectorId] = useState(null)
  const openDeleteModal = (id) => {
    onDeleteOpen()
    setSectorId(id)
  }
  const deleteSector = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/delete`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          sector_id: sectorId
        })
      })
      const result = await response.json();
      if (result.success) {
        showAlert("Sector deleted successfully", 'success')
        fetchSector();

        onDeleteClose();
      }
    } catch (error) {
      console.log(error)
      showAlert("Internal server error", 'error')
    }
  }

  const filteredData = sectors.filter(item =>
    item.name.toLowerCase().includes(filteredSectors.toLowerCase())
  );
  return (
    <Card>
      <Flex
        w="100%"
        justifyContent="space-between"
        flexDirection={"column"}
        p="15px"
      >

        <Box display={'flex'}  alignItems={'center'} gap={'50px'}>
          <Text height={'32px'} textAlign={'center'} borderRadius={'7px'} gap={'5px'} border={'1px'} width={'70px'} color={'#858585'}> Back</Text>
        <Text fontWeight="var(--big-font-weight)" fontSize="var(--semi-big)">
            Sector
          </Text>
        </Box>
        <Flex
          w="100%"
          alignItems={"center"}
          justifyContent="end"
          gap="10px"
        >
          

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
          <Table size="sm" className="custom-striped-table"  >
            <Thead  >
              <Tr h="40px" bgColor="#FFF5F3" >
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
            </Thead >

            <Tbody >
              {
                filteredData && filteredData.map((sector) => (
                  <Tr key={sector.id}>
                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.id}</Td>
                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.name}</Td>
                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.category}</Td>
                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.description}</Td>

                    <Td color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)">
                           
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/sectors/${sector.icon}`}
                        alt={sector.name}
                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                      />
                    </Td>
                    <Td   color={"#404040"} fontSize="var(--mini-text)">
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
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'18px'}>Add Sector</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <Box as='form'  onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'8px'}>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Name</FormLabel>
                <Input type='text' {...register('name', { required: 'Name is required' })}
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.name && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.name.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Category</FormLabel>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Please select a category" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={allCategory}
                        placeholder="Select Category"
                        value={allCategory.find(option => option.value === field.value)}
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
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>description</FormLabel>
                <Input type='text' {...register('description')} height={'100px'}
                  placeholder='Enter description' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.description && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.description.message}</Text>}
              </FormControl>

              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'} >Icon</FormLabel>
                <Input type='file' {...register('icon')} fontSize="var(--text-12px)"  ></Input>

              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'} >Products</FormLabel>
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
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Name</FormLabel>
                <Input type='text' {...register('name', { required: 'Name is required' })}
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.name && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.name.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'} >Category</FormLabel>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Please select a category" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={allCategory}
                        placeholder="Select Role"
                        value={allCategory.find(option => option.value === field.value)}
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
              <FormControl>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'} >Products</FormLabel>
                {/* <Controller
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
                /> */}

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
          <ModalHeader fontSize="16px" textAlign={'center'}> Delete Sector</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={'center'}>
            <Text fontSize='var( --text-12px)' fontWeight="var(--big-font-weight)">Are you sure you want to delete this Sector?</Text>
          </ModalBody>
          <ModalFooter display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'}>
            <Button onClick={() => deleteSector()} fontSize='var(--mini-text)' bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
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
