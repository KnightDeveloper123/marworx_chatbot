import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Card, Flex, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useColorModeValue, Heading, Icon, Image, Tooltip, Textarea } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import Select from "react-select"
import { MdOutlineModeEdit } from 'react-icons/md'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { decrypt } from '../../utils/security'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMagic, FaPencilAlt, FaPuzzlePiece } from 'react-icons/fa';
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import TemViw from "../../../assets/template.png"
import Algorithmic from "../../../assets/Algorithmic.png"
import Campaign from "../../../assets/Campaign.png"
import Generative from "../../../assets/Generative.png"

const Sector = () => {
  const token = localStorage.getItem('token')
  const { showAlert, sectors, fetchSector, template, fetchTemplate, fetchAllEmployees, employees } = useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isBotOpen, onOpen: onBotOpen, onClose: onBotClose } = useDisclosure()
  const { isOpen: isAlgOpen, onOpen: onAlgOpen, onClose: onAlgClose } = useDisclosure()
  const { isOpen: isCategoryOpen, onOpen: onCategoryOpen, onClose: onCategoryClose } = useDisclosure()
  const { isOpen: isTemplateOpen, onOpen: onTemplateOpen, onClose: onTemplateClose } = useDisclosure()
  const [filteredSectors, setFilteredSectors] = useState("");
  const user = localStorage.getItem('user')
  const admin_id = decrypt(user).id

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


  useEffect(() => {
    fetchSector(admin_id);
    fetchTemplate(admin_id);
    fetchAllEmployees(admin_id)

  }, [admin_id])

  // const allCategory = [{
  //   value: "energy",
  //   label: "Energy"
  // },
  // {
  //   value: "industrial",
  //   label: "Industrial"
  // },
  // {
  //   value: "manufacturing",
  //   label: "Manufacturing"
  // },
  // {
  //   value: "chemicals",
  //   label: "Chemicals"
  // },
  // ]

  const allEmployee = employees.map(emp => ({
    value: emp.id,
    label: emp.name,
    customLabel: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>{emp.name}</span>
      </div>
    )
  }));

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("admin_id", admin_id);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("icon", data.icon[0]);
    formData.append("description", data.description);
    formData.append("employee_id", data.employee_id);
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
    setValue('employee_id', data.employee_id);

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
    formData.append("employee_id", data.employee_id);
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
        fetchSector(admin_id);

        onEditClose();
      }
    } catch (error) {
      showAlert("Failed to update sector", 'error')
      console.log(error)
    }

  }


  const [category, setCategory] = useState([])

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/get_all_category`, {
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
          // Authorization: token
        },

      })
      const data = await response.json();
      console.log("result", data)
      const formatted = data.result.map(cat => ({
        value: cat.name,  // 👈 category name will be sent
        label: cat.name
      }));

      setCategory(formatted);
      // setCategory(data.result)

    } catch (error) {
      console.log(error)
      showAlert('Internal server error', 'error')
    }
  }

  useEffect(() => {
    fetchCategory();
  }, [])

  const onCategorySubmit = async (data) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // Authorization: token
        },
        body: JSON.stringify({
          name: data.name
        })
      })
      const result = await response.json();

      if (result.success) {
        showAlert("Category added successfully", 'success')
        fetchCategory();
        reset();
        onCategoryClose();
      }
    } catch (error) {
      showAlert("Failed to add category ", 'error')
      console.log(error)
    }
  }


  const [sectorid, setSectorid] = useState(null)
  const openDeleteModal = (id) => {
    onDeleteOpen()
    setSectorid(id)
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
          sector_id: sectorid
        })
      })
      const result = await response.json();
      if (result.success) {
        showAlert("Sector deleted successfully", 'success')
        fetchSector(admin_id);

        onDeleteClose();
      }
    } catch (error) {
      console.log(error)
      showAlert("Internal server error", 'error')
    }
  }

  const filteredData = sectors?.filter(item =>
    item.name.toLowerCase().includes(filteredSectors.toLowerCase())
  );

  const options = [
    {
      icon: FaMagic,
      title: 'Build it for me!',
      description: 'Tell what you need and we will create it automatically',

    },
    {
      icon: FaPencilAlt,
      title: 'Start from scratch',
      description: 'Start with a blank builder and let your imagination flow!',
      path: '/bot_builder'
    },
    {
      icon: FaPuzzlePiece,
      title: 'Use a template',
      description: 'Choose a pre-made bot and edit them as you want',
      // path: "/home/gen_bot"
    },
  ];

  const bg = useColorModeValue('gray.50');
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [selectedBotType, setSelectedBotType] = useState(null)
  const botCreate = (id) => {
    setSelectedSectorId(id);  // Save the sector ID
    onBotOpen();              // Open the modal
  };

  const botTypes = [
    { label: "Algorithmic", type: "algorithmic", image: Algorithmic, admin_id: admin_id },
    { label: "Campaign", type: "campaign", image: Campaign, path: "/home/campaign" },
    { label: "Generative", type: "generative", image: Generative, path: "/home/gen_bot" }
  ];



  const [showAll, setShowAll] = useState(false)
  return (
    <Card>
      <Flex
        w="100%"
        justifyContent="space-between"
        flexDirection={"column"}
        p="15px"
      >

        <Box display={'flex'} alignItems={'center'} gap={'50px'}>
          {/* <Text height={'32px'} textAlign={'center'} borderRadius={'7px'} gap={'5px'} border={'1px'} width={'70px'} color={'#858585'}> Back</Text> */}
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


          <Flex gap={2} >

            <Flex gap={3}
            // display={location.pathname === "/admin/dashboard" ? "none" : "Flex"}
            >
              {/* {userDetails.type === "admin" || userDetails.active === 1 ? ( */}
              <Input h={"35px"} htmlSize={20} width='auto' fontSize="var(--mini-text)"
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

              <Button
                borderRadius="var(--radius)"
                leftIcon={<IoMdAdd fontSize={"20px"} />}
                _hover={{ bgColor: "var(--active-bg)" }}
                bgColor="var(--active-bg)"
                color="#fff"

                h={"35px"}
                fontSize="var(--mini-text)"
                fontWeight="var(--big-font-weight)"
                onClick={() => onCategoryOpen()}
              >
                Add Category
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
            <Thead>
              <Tr h="40px" bgColor="#FFF5F3"  >
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
                  Assignee Name
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
                  Bot count
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

              </Tr>
            </Thead >

            <Tbody >
              {
                filteredData && filteredData.map((sector) => (
                  <Tr key={sector.id}>
                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.id}</Td>
                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.name}</Td>
                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.category}</Td>
                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.emp_name}</Td>
                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.description}</Td>

                    <Td onClick={() => navigate(`/home/sector/${sector.id}`)} _hover={{ cursor: "pointer" }} >{sector.bot_count}</Td>
                    <Td color={"#404040"}
                      fontSize="var(--mini-text)"
                      fontWeight="var(--big-font-weight)">

                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/sectors/${sector.icon}`}
                        alt={sector.name}
                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                      />
                    </Td>

                    <Td color={"#404040"} fontSize="var(--mini-text)">
                      <Flex gap={2}>
                        <Box bgColor={"#E7EAFB"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                          <MdOutlineModeEdit size={20} color={"#3550FF"} onClick={() => editSector(sector)} />
                        </Box>
                        <Box bgColor={"#F7E3E3"} p={1} borderRadius={"5px"} cursor={"pointer"}>
                          <RiDeleteBin6Line size={20} color={"#D50B0B"} onClick={() => openDeleteModal(sector.id)} />
                        </Box>

                        {/* <Box bgColor={"#046E201A"} p={1} borderRadius={"5px"} cursor={"pointer"} onClick={() => botCreate(sector.id)}>
                          <FaRobot size={20} color={'green'} />
                        </Box> */}
                      </Flex>

                      {/* // sector */}


                      <Modal isOpen={isBotOpen} onClose={onBotClose} size={'xl'}>
                        <ModalOverlay />
                        <ModalContent padding={'20px'}>

                          <Box display={'flex'} alignSelf={'center'} w={"90%"} justifyContent={'center'} bg={'#FF5F351A'} borderRadius={"7px"}>
                            <Text padding={'10px'} textAlign={'center'} width={'350px'} color={'black'}>Build Chat Bot for Automobile</Text>
                          </Box>
                          <ModalCloseButton />
                          <ModalBody mt={'20px'}>
                            <Grid display={'grid'} templateColumns='repeat(3, 1fr)' >
                              {botTypes.map((bot) => (
                                <GridItem key={bot.type}>

                                  <Box
                                    _hover={{ bg: "#FF5F35", color: "white", transitionDuration: "0.5s" }}
                                    onClick={() => {
                                      setSelectedBotType(bot.type)
                                      localStorage.setItem("botType", bot.type);
                                      localStorage.setItem("sectorId", selectedSectorId);
                                      if (bot.type === "algorithmic") {

                                        onAlgOpen(); // Open second modal
                                        // onBotClose();


                                      } else {
                                        navigate(bot.path, {
                                          state: { type: bot.type, sectorId: selectedSectorId }
                                        });
                                        onBotClose();
                                      }
                                    }}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    width={'90%'}
                                    height={'140px'}
                                    borderRadius={'7px'}
                                    backgroundColor={'#FF5F3526'}
                                    color={'black'}
                                    cursor={'pointer'}
                                  >
                                    <Box>
                                      <Image src={bot.image} alt={bot.type} />
                                    </Box>
                                  </Box>
                                  <Text textAlign={'center'} mt={'10px'}>
                                    {bot.label}
                                  </Text>
                                </GridItem>
                              ))}
                            </Grid>
                          </ModalBody>
                        </ModalContent>
                      </Modal>

                      <Modal isOpen={isAlgOpen} onClose={onAlgClose} size={'2xl'} >
                        <ModalOverlay />
                        <ModalContent>

                          <ModalCloseButton />
                          <ModalBody mt={'10px'}>
                            <Box
                              onClick={() => {
                                onAlgClose();
                                onBotOpen(); // Reopen first modal if needed
                              }}>
                              <HiOutlineArrowSmLeft />
                            </Box>
                            <Box textAlign="center"
                              py={10} >
                              <Heading mb={5} fontSize="3xl" >
                                Start building!
                              </Heading>

                              <Box
                                display={'flex'}
                                gap={6}
                                wrap="wrap"
                              >
                                {options.map((opt, i) => (

                                  <Box
                                    key={i}
                                    bg={bg}
                                    p={6}
                                    borderRadius="lg"
                                    textAlign="center"
                                    boxShadow="md"
                                    transition="all 0.2s"
                                    bgColor={'#FF5F351A'}
                                    role="group"
                                    _hover={{ boxShadow: 'lg', transform: 'scale(1.03)', cursor: 'pointer', bg: "#FF5F35", color: "white", transitionDuration: "0.5s" }}
                                    onClick={() => {
                                      if (opt.title === 'Use a template') {
                                        onTemplateOpen();
                                      } else if (opt.path) {
                                        onAlgClose();
                                        navigate(opt.path)
                                        // window.location.href = opt.path;
                                      } else {
                                        console.log("Other action");
                                      }
                                    }}
                                  >
                                    <Icon as={opt.icon} boxSize={8} mb={4} />
                                    <Text fontWeight="bold" mb={2}
                                    >
                                      {opt.title}

                                    </Text>
                                    <Text fontSize="sm" color="#565555" _groupHover={{ color: "white", transitionDuration: "0.5s" }}>
                                      {opt.description}
                                    </Text>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </ModalBody>


                        </ModalContent>
                      </Modal>

                      <Modal isOpen={isTemplateOpen} onClose={onTemplateClose} size="4xl">
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader fontSize="18px">Select Template</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6}>
                            <Box maxHeight="380px" overflowY={showAll ? "auto" : "hidden"}>
                              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                                {(showAll ? template : template.slice(0, 3)).map((temp, index) => (
                                  <GridItem
                                    key={index}
                                    boxShadow="lg"
                                    borderRadius="8px"
                                    border="1px solid lightgray"
                                    overflow="hidden"
                                    bg="white"
                                  >
                                    <Image
                                      src={TemViw}
                                      height="188px"
                                      width="100%"
                                      objectFit="cover"
                                    />
                                    <Box p="10px">
                                      <Text fontWeight="600" fontSize="18px" color="#FF5F35">
                                        {temp.category}
                                      </Text>
                                      <Text fontSize="14px" mb={4} >
                                        <Tooltip label={temp.description || 'No description'} hasArrow>
                                          <Text as='span'>
                                            {temp.description && temp.description.length > 50
                                              ? `${temp.description.slice(0, 50)}...`
                                              : temp.description || 'No description'}
                                          </Text>
                                        </Tooltip>

                                      </Text>
                                      <Button
                                        width="full"
                                        textAlign="center"
                                        size="sm"
                                        fontSize="15px"
                                        bgColor="#FF5F35"
                                        color="white"
                                        _hover={{ bg: "#e14a1d" }}
                                        onClick={() => navigate(`/view_template/${temp.id}`)}
                                      >
                                        Use
                                      </Button>
                                    </Box>
                                  </GridItem>
                                ))}
                              </Grid>
                              {!showAll && template.length > 3 && (
                                <Box textAlign="center" mt={4}>
                                  <Button
                                    variant="outline"
                                    color="#FF5F35"
                                    borderColor="#FF5F35"
                                    size="sm"
                                    onClick={() => setShowAll(true)}
                                  >
                                    More options
                                  </Button>
                                </Box>
                              )}
                            </Box>
                          </ModalBody>
                        </ModalContent>
                      </Modal>
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

            <Box as='form' onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'8px'}>
              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb={'0px'}>Name</FormLabel>
                <Input type='text' {...register('name', { required: 'Name is required' })}
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.name && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.name.message}</Text>}
              </FormControl>
              {/* <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb={'0px'}>Category</FormLabel>
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
              </FormControl> */}
              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb={'0px'}>Category</FormLabel>

                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Please select a category" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={category} // 🔁 category = [{ value: 'Health', label: 'Health' }, ...]
                        placeholder="Select Category"
                        value={category.find(option => option.value === field.value) || null}
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


              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb={'0px'}>Assignee</FormLabel>
                <Controller
                  name="employee_id"
                  control={control}
                  rules={{ required: "Please select a Assignee" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={allEmployee}
                        placeholder="Select Assignee"
                        value={allEmployee.find(option => option.value === field.value)}
                        onChange={selectedOption => field.onChange(selectedOption?.value)}
                        styles={{
                          control: (provided) => ({ ...provided, fontSize: "12px" }),
                          option: (provided) => ({ ...provided, fontSize: "12px" }),
                          singleValue: (provided) => ({ ...provided, fontSize: "12px" }),
                          menu: (provided) => ({ ...provided, fontSize: "12px" }),
                          placeholder: (provided) => ({ ...provided, fontSize: "12px" }),
                        }}
                      />
                      {error && <p style={{ color: "red", fontSize: "12px" }}>{error.employee_id}</p>}
                    </>
                  )}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb={'0px'}>Description</FormLabel>
                <Textarea type='text' {...register('description')}
                  placeholder='Enter description' fontSize="var(--text-12px)" autoComplete='off' />
                {errors.description && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.description.message}</Text>}
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb="0px">
                  Upload Icon
                </FormLabel>
                <Input
                  type="file"
                  {...register('icon')}
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

                <Button w={'100%'} onClick={onClose} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                  textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>Cancel</Button>
                <Button w={'100%'} type='submit' fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
                  Save
                </Button>
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
              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb={'0px'}>Name</FormLabel>
                <Input type='text' {...register('name', { required: 'Name is required' })}
                  fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.name && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.name.message}</Text>}
              </FormControl>
              {/* <FormControl isRequired>
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
              </FormControl> */}
              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Category</FormLabel>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Please select a category" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={category} // ✅ using category here
                        placeholder="Select Category"
                        value={category.find(option => option.value === field.value) || null}
                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
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

              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb={'0px'}>Assignee</FormLabel>
                <Controller
                  name="employee_id"
                  control={control}
                  rules={{ required: "Please select a Assignee" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={allEmployee}
                        placeholder="Select Assignee"
                        value={allEmployee.find(option => option.value === field.value)}
                        onChange={selectedOption => field.onChange(selectedOption?.value)}
                        styles={{
                          control: (provided) => ({ ...provided, fontSize: "12px" }),
                          option: (provided) => ({ ...provided, fontSize: "12px" }),
                          singleValue: (provided) => ({ ...provided, fontSize: "12px" }),
                          menu: (provided) => ({ ...provided, fontSize: "12px" }),
                          placeholder: (provided) => ({ ...provided, fontSize: "12px" }),
                        }}
                      />
                      {error && <p style={{ color: "red", fontSize: "12px" }}>{error.employee_id}</p>}
                    </>
                  )}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb={'0px'}>description</FormLabel>
                <Input type='text' {...register('description')}
                  placeholder='Enter description' fontSize="var(--text-12px)" autoComplete='off'></Input>
                {errors.description && <Text fontSize='var(--text-12px)' textColor={'#FF3D3D'}>{errors.description.message}</Text>}
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="var(--mini-text)" mb="2px">
                  Upload Icon
                </FormLabel>
                <Input
                  type="file"
                  {...register('icon')}
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

              <Box w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'} mt={'10px'}>
                <Button w={'100%'} onClick={onEditClose} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                  textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>Cancel</Button>
                <Button w={'100%'} type='submit' fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
                  Save
                </Button>
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
          <ModalFooter w='100%' display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'}>
            <Button w='100%' onClick={() => deleteSector()} fontSize='var(--mini-text)' bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
              Delete
            </Button>
            <Button w='100%' onClick={() => onDeleteClose()} type="button" fontSize='var(--mini-text)' size={'sm'} border={'1px solid #FF5722 '}
              textColor={'#FF5722'} bgColor={'white'} _hover={''}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isCategoryOpen} onClose={onCategoryClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box as='form' onSubmit={handleSubmit(onCategorySubmit)} display={'flex'} flexDirection={'column'} gap={'8px'}>
                <FormControl>
                  <FormLabel fontSize="var(--mini-text)" mb={'0px'}>Category</FormLabel>
                  <Input type='text' {...register('name', { required: 'Name is required' })}
                    fontSize="var(--text-12px)" autoComplete='off'></Input>
                </FormControl>


                <Box w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'} mt={'10px'}>
                  <Button w={'100%'} onClick={onCategoryClose} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                    textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>Cancel</Button>
                  <Button w={'100%'} type='submit' fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  )
}

export default Sector
