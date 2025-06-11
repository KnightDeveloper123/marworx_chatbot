import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../../context/AppContext";
import Card from "../../../Card";
import { decrypt } from "../../utils/security";
import { VscSend } from "react-icons/vsc";
import { FaMagic, FaPencilAlt, FaPuzzlePiece } from "react-icons/fa";
import TemViw from "../../../assets/template.png";
import Algorithmic from "../../../assets/Algorithmic.png";
import Campaign from "../../../assets/Campaign.png";
import Generative from "../../../assets/Generative.png";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { useForm } from "react-hook-form";

const SectorProfile = () => {
  const { getProducts, products, sectorData, sector, bots, fetchBot, template, fetchTemplate, timeAgo } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const admin_id = decrypt(user).id;
  const token = localStorage.getItem('token')
      
  useEffect(() => {
    sectorData(id);
    getProducts(id);
    fetchBot(admin_id);
    fetchTemplate();
  }, [id]);

  // sector

  const { isOpen: isBotOpen, onOpen: onBotOpen, onClose: onBotClose } = useDisclosure()
  const { isOpen: isAlgOpen, onOpen: onAlgOpen, onClose: onAlgClose } = useDisclosure()
  const { isOpen: isTemplateOpen, onOpen: onTemplateOpen, onClose: onTemplateClose } = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bot, SetbotId] = useState();
  const options = [
    {
      icon: FaMagic,
      title: "Build it for me!",
      description: "Tell what you need and we will create it automatically",
    },
    {
      icon: FaPencilAlt,
      title: "Start from scratch",
      description: "Start with a blank builder and let your imagination flow!",
      path: `/view/${bot}`,
    },
    {
      icon: FaPuzzlePiece,
      title: "Use a template",
      description: "Choose a pre-made bot and edit them as you want",
      // path: "/home/gen_bot"
    },
  ];

  const bg = useColorModeValue("gray.50");
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [selectedBotType, setSelectedBotType] = useState(null);
  const botCreate = (id) => {
    setSelectedSectorId(id); // Save the sector ID
    onBotOpen(); // Open the modal
  };

  const botTypes = [
    {
      label: "Algorithmic",
      type: "algorithmic",
      image: Algorithmic,
      admin_id: admin_id,
    },
    {
      label: "Campaign",
      type: "campaign",
      image: Campaign,
      path: "/home/campaign",
    },
    {
      label: "Generative",
      type: "generative",
      image: Generative,
      path: "/home/gen_bot",
    },
  ];

  const [showAll, setShowAll] = useState(false);
   const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
 
  const onSubmit = async (data) => {
    const formData = new FormData();
    // formData.append("admin_id", admin_id);
    // formData.append("name", data.name);
    // formData.append("description", data.description);
    // formData.append("image", data.image[0]);
    // try {
    //   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product_service/add`, {
    //     method: "POST",
    //     headers: {

    //       Authorization: token
    //     },
    //     body: formData
    //   })
    //   const result = await response.json();
    //   if (result.success) {
    //     showAlert("Product Service added successfully", 'success')
    //     getProducts(id);
    //     reset();
    //     onClose();
    //   }
    // } catch (error) {
    //   showAlert("Failed to add product service", 'error')
    //   console.log(error)
    // }
  }

  return (
    <>
      <Card>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={4} ml={5}>
            <Avatar
              size="xl"
              name={sector?.name}
              maxW={{ base: "100%", sm: "200px" }}
            />
            <Box p="1">
              <Text fontSize="var(--mini-15px)">{sector?.name}</Text>
              <Text fontSize="var(--mini-15px)">{sector?.category}</Text>
              <Text fontSize="var(--mini-15px)">{sector?.description}</Text>
            </Box>
          </Flex>
          <Flex justifyContent={"lex-start"}>
            <Button
              onClick={() => window.history.back()}
              type="button"
              size={"sm"}
              fontSize={"13px"}
              border={"1px solid #FF5722"}
              textColor={"#FF5722"}
              bgColor={"white"}
              mr={3}
              _hover={{ bgColor: "white" }} // Optional hover effect
            >
              Back
            </Button>
          </Flex>
        </Flex>
      </Card>

      <Divider py="2" />
      <Card>
        <Box w="100%" overflow="auto">
          <Tabs position="relative" variant="unstyled">
            <Box
              display={"flex"}
              flexDirection={"column"}
              bg={"#fff"}
              p={"3px"}
              borderRadius="10px"
            >
              <TabList
                justifyContent={{ base: "center", md: "start" }}
                gap="2rem"
                p={{ base: "0", md: "0.2rem 6rem" }}
              >
                <Tab>
                  {" "}
                  <Box
                    // as="button"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="3px"
                  >
                    {/* <ImProfile fontSize="20px" /> */}
                    <Text textAlign="center" fontSize="13px" fontWeight="500">
                      Products
                    </Text>
                  </Box>
                </Tab>
                <Tab>
                  {" "}
                  <Box
                    // as="button"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="3px"
                  >
                    {/* <ImProfile fontSize="20px" /> */}
                    <Text textAlign="center" fontSize="13px" fontWeight="500">
                      Bots
                    </Text>
                  </Box>
                </Tab>
              </TabList>
            </Box>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="var(--active-bg)"
              borderRadius="1px"
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              bg={"#fff"}
              p="3px"
              borderRadius="10px"
              mt="10px"
            >
              <TabPanels>
                <TabPanel>
                  <Flex justifyContent={'flex-end'}>
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
                  <SimpleGrid
                    spacing={4}
                    templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)" mt='4px'
                  >
                    {products?.map((product, index) => (
                      <Card key={index}>
                        <Image
                          src={`${import.meta.env.VITE_BACKEND_URL}/products/${product.image
                            }`}
                        />
                        <Text
                          fontWeight="var(--big-font-weight)"
                          textAlign={"center"}
                          mt={2}
                        >
                          {product.product_name}
                        </Text>
                        <Text textAlign={"center"} mt={2}>
                          {product.product_description}
                        </Text>
                      </Card>
                    ))}
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <SimpleGrid spacing={4} _hover={{ cursor: "pointer" }}>
                    {bots?.map((bot, index) => (
                      <Card key={index}>
                        <Flex
                          justify="space-between"
                          align="center"
                          //   p={4}
                          gap="15px"
                        >
                          <Flex gap={2}>
                            <Box spacing="3px">
                              <Avatar
                                src={TemViw}
                                onClick={() => navigate(`/view/${bot.id}`)}
                              />
                            </Box>
                            <Box spacing="3px">
                              <Text textAlign="start">{bot?.nodes?.[0]?.data?.label || null}</Text>
                              <Text textAlign="start" fontSize={"10px"}>
                                {/* {timeAgo(bot.created_at)} */}
                              </Text>
                            </Box>
                          </Flex>

                          <Flex gap={2}>
                            <Box
                              bgColor={"#046E201A"}
                              p={1}
                              borderRadius={"5px"}
                              cursor={"pointer"}
                              onClick={() => { botCreate(id); SetbotId(bot.id) }}
                            >
                              <VscSend size={20} color={"green"} />
                            </Box>
                          </Flex>
                        </Flex>
                      </Card>
                    ))}
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
       <Modal isOpen={isOpen}
          onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={'18px'}>Add Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} >
              <Box as="form" onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'8px'}>
                <FormControl isRequired isInvalid={errors.name}>
                  <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Name</FormLabel>
                  <Input type='text' {...register("name", { required: "Product name is required" })} placeholder='enter product name' fontSize="var(--text-12px)" autoComplete='off'></Input>
                  {errors.name && (
                    <FormErrorMessage fontSize="var(--mini-text)">{errors.name.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={errors.description}>
                  <FormLabel fontSize="var(--mini-text)" mb={'2px'}>Description</FormLabel>
                  <Input type='text' {...register("description", { required: "description is required" })} placeholder='enter description' fontSize="var(--text-12px)" autoComplete='off'></Input>
                  {errors.description && (
                    <FormErrorMessage fontSize="var(--mini-text)">{errors.description.message}</FormErrorMessage>
                  )}
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

        <Modal isOpen={isBotOpen} onClose={onBotClose} size={"xl"}>
          <ModalOverlay />
          <ModalContent padding={"20px"}>
            <Box
              display={"flex"}
              alignSelf={"center"}
              w={"90%"}
              justifyContent={"center"}
              bg={"#FF5F351A"}
              borderRadius={"7px"}
            >
              <Text
                padding={"10px"}
                textAlign={"center"}
                width={"350px"}
                color={"black"}
              >
                Build Chat Bot for Automobile
              </Text>
            </Box>
            <ModalCloseButton />
            <ModalBody mt={"20px"}>
              <Grid display={"grid"} templateColumns="repeat(3, 1fr)">
                {botTypes.map((bot) => (
                  <GridItem key={bot.type}>
                    <Box
                      _hover={{
                        bg: "#FF5F35",
                        color: "white",
                        transitionDuration: "0.5s",
                      }}
                      onClick={() => {
                        setSelectedBotType(bot.type);
                        localStorage.setItem("botType", bot.type);
                        localStorage.setItem("sectorId", selectedSectorId);
                        if (bot.type === "algorithmic") {
                          onAlgOpen(); // Open second modal
                          // onBotClose();
                        } else {
                          navigate(bot.path, {
                            state: {
                              type: bot.type,
                              sectorId: selectedSectorId,
                            },
                          });
                          onBotClose();
                        }
                      }}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      width={"90%"}
                      height={"140px"}
                      borderRadius={"7px"}
                      backgroundColor={"#FF5F3526"}
                      color={"black"}
                      cursor={"pointer"}
                    >
                      <Box>
                        <Image src={bot.image} alt={bot.type} />
                      </Box>
                    </Box>
                    <Text textAlign={"center"} mt={"10px"}>
                      {bot.label}
                    </Text>
                  </GridItem>
                ))}
              </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isAlgOpen} onClose={onAlgClose} size={"2xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody mt={"10px"}>
              <Box
                onClick={() => {
                  onAlgClose();
                  onBotOpen(); // Reopen first modal if needed
                }}
              >
                <HiOutlineArrowSmLeft />
              </Box>
              <Box textAlign="center" py={10}>
                <Heading mb={5} fontSize="3xl">
                  Start building!
                </Heading>

                <Box display={"flex"} gap={6} wrap="wrap">
                  {options.map((opt, i) => (
                    <Box
                      key={i}
                      bg={bg}
                      p={6}
                      borderRadius="lg"
                      textAlign="center"
                      boxShadow="md"
                      transition="all 0.2s"
                      bgColor={"#FF5F351A"}
                      role="group"
                      _hover={{
                        boxShadow: "lg",
                        transform: "scale(1.03)",
                        cursor: "pointer",
                        bg: "#FF5F35",
                        color: "white",
                        transitionDuration: "0.5s",
                      }}
                      onClick={() => {
                        if (opt.title === "Use a template") {
                          onTemplateOpen();
                        } else if (opt.path) {
                          onAlgClose();
                          navigate(opt.path);
                          // window.location.href = opt.path;
                        } else {
                          console.log("Other action");
                        }
                      }}
                    >
                      <Icon as={opt.icon} boxSize={8} mb={4} />
                      <Text fontWeight="bold" mb={2}>
                        {opt.title}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="#565555"
                        _groupHover={{
                          color: "white",
                          transitionDuration: "0.5s",
                        }}
                      >
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
                  {(showAll ? template : template.slice(0, 3)).map(
                    (temp, index) => (
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
                          <Text
                            fontWeight="600"
                            fontSize="18px"
                            color="#FF5F35"
                          >
                            {temp.category}
                          </Text>
                          <Text fontSize="14px" mb={4}>
                            <Tooltip
                              label={temp.description || "No description"}
                              hasArrow
                            >
                              <Text as="span">
                                {temp.description &&
                                  temp.description.length > 50
                                  ? `${temp.description.slice(0, 50)}...`
                                  : temp.description || "No description"}
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
                            onClick={() =>
                              navigate(`/view_template/${temp.id}`)
                            }
                          >
                            Use
                          </Button>
                        </Box>
                      </GridItem>
                    )
                  )}
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
      </Card>
    </>
  );
};

export default SectorProfile;
