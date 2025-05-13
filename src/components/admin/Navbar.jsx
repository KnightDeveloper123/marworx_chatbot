import React, { use, useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Button,
  IconButton,
  useDisclosure,
  VStack,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaTachometerAlt, FaUser, FaUserPlus } from "react-icons/fa";
import { SiGooglebigquery } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSettingsSharp, IoNotifications } from "react-icons/io5";
import { decrypt } from "../utils/security";
import { useForm } from "react-hook-form";
import { AppContext } from "../context/AppContext";
import { PiBagSimpleFill } from "react-icons/pi";
import { LuBot, LuSection } from "react-icons/lu";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiAiGenerate2, RiTelegram2Line } from "react-icons/ri";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const { showAlert } = useContext(AppContext)
 
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure()
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure()
  const { isOpen: isPasswordOpen, onOpen: onPasswordOpen, onClose: onPasswordClose } = useDisclosure()

  const encryptedUser = localStorage.getItem('user');
  const user = encryptedUser ? decrypt(encryptedUser) : null;  

  const adminNavbar = [
    { title: "Dashboard", url: "/home/dashboard", icon: <Icon as={FaTachometerAlt} mr={2} /> },
    { title: "Employee", url: "/home/employee", icon: <Icon as={PiBagSimpleFill} mr={2} /> },
    { title: "Sector", url: "/home/sector", icon: <Icon as={LuSection} mr={2} /> },
    { title: "Product Services ", url: "/home/product", icon: <Icon as={MdProductionQuantityLimits } mr={2} /> },
    { title: "Bot Builder", url: "/home/bot_builder", icon: <Icon as={LuBot } mr={2} /> },
    { title: "Campaign", url: "/home/campaign", icon: <Icon as={RiTelegram2Line} mr={2} /> },
    { title: "Genarative Bot", url: "/home/gen_bot", icon: <Icon as={RiAiGenerate2} mr={2} /> },
  ]; // admin

   const superAdminNavbar = [
      { title: "Dashboard", url: "/home/dashboard", icon: <Icon as={FaTachometerAlt} mr={2} /> },
      { title: "Admin", url: "/home/admin", icon: <Icon as={FaCircleUser} mr={2} /> },
      { title: "Employee", url: "/home/employee", icon: <Icon as={PiBagSimpleFill} mr={2} /> },
      { title: "Users", url: "/home/user", icon: <Icon as={FaUser} mr={2} /> },
      { title: "Genarative Bot", url: "/home/gen_bot", icon: <Icon as={RiAiGenerate2} mr={2} /> },
      { title: "Queries", url: "/home/queries", icon: <Icon as={SiGooglebigquery} mr={2} /> },
    ]; // super_admin

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { register : registerPass, handleSubmit : handleSubmitPass } = useForm({
    defaultValues:{
    email:user.email
    }
  });

  const [empData, setEmpData] = useState(null);
  const getEmpById = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/getEmployeeId?user_id=${user.id}`, {
        method: "GET",
        headers: {
          Authorization: token
        },
      })
      const data = await response.json();
      setEmpData(data.data);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getEmpById();
  }, [onProfileOpen, ]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('mobile_no', data.mobile_no);
    formData.append('employee_id', user.id);

    if (data.profile && data.profile[0]) {
      formData.append('profile', data.profile[0]);
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/update`, {
        method: "POST",
        headers: {
          Authorization: token
        },
        body: formData
      })
      const result = await response.json();
      // console.log(register);

      if (result.success) {
        showAlert("Sector added successfully", 'success')
        onProfileClose();
        getEmpById();
      }
    } catch (error) {
      showAlert("Failed to add sector ", 'error')
      console.log(error)
    }
  }

  const onPasswordSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      })
      const result = await response.json();
      onPasswordClose();
      // console.log(result)

    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/home')
  }


  return (
    <HStack
      p={{
        xl: "0px 20px",
        lg: "0px 20px",
        md: "0px 20px",
        sm: "0px 5px",
        base: "0px",
      }}
      justifyContent="space-between"
      alignItems={"center"}
      w="100%"
      height="60px"
      bg="#fff !important"
      zIndex={111}
      boxShadow='base'
    >
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        mx={3}
        gap={2}
      >
        <Flex
          w="100%"
          h="100%"
          justifyContent="space-between"
          alignItems="center"
          gap={{ xl: 3, lg: 3, md: 2, sm: 5, base: 2 }}
        >
          <Flex mr="0px" gap={2} alignItems={'center'}>
            <IconButton
              display={{
                xl: "none",
                lg: "none",
                md: "block",
                sm: "block",
                base: "block",
              }}
              onClick={onDrawerOpen}
              aria-label="Search database"
              icon={<HamburgerIcon fontSize="20px" />}
              size="sm"
              bg="transparent"
              _hover={{
                bgColor: "#007bff29",
                // boxShadow:'0 0 5px #007bff59',
                color: "#007bff",
              }}
              sx={{
                "&:hover p": {
                  color: "#007bff",
                },
              }}
              transition="0.25s"
            />
          </Flex>
          <Flex
            justifyContent="space-evenly"
            gap={4}
            alignItems="center"
            display={{ xl: "flex", lg: "flex", md: "none", sm: "none", base: "none" }}
        
          >

            <Box _hover={{ cursor: "pointer" }}>
              <IoNotifications onClick={onNotificationOpen} />
              <Drawer placement={"right"} onClose={onNotificationClose} isOpen={isNotificationOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader borderBottomWidth='1px'>Notification</DrawerHeader>
                  <DrawerBody>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>

            <Box >
              <Menu>
                <MenuButton as={Button} backgroundColor={'white'} _focus={{ bg: "transparent" }} _active={{ bg: "transparent" }}>
                  <IoSettingsSharp />
                </MenuButton>
                <MenuList padding={'2'}>
                  <MenuItem>
                    <Box display={'flex'} flexDirection={'row'} gap={'10px'}>
                      <Avatar src={`${import.meta.env.VITE_BACKEND_URL}/profile/${empData?.profile}`} />
                      <Box display={'flex'} flexDirection={'column'}>
                        <Text fontSize="var( --mini-14px)">{empData?.name}</Text>
                        <Text fontSize="var( --mini-14px)">{empData?.email}</Text>
                      </Box>
                    </Box>

                  </MenuItem>
                  <MenuDivider />
                  <MenuItem fontSize="var(--mini-14px)" onClick={onProfileOpen}>Profile</MenuItem>
                  <MenuItem fontSize="var(--mini-14px)" onClick={onPasswordOpen}> Password</MenuItem>
                  <MenuDivider />
                  <MenuItem fontSize="var(--mini-14px)" onClick={() => logout()}>Log Out</MenuItem>
                </MenuList>

              </Menu>
            </Box>
            <Box>
            <Avatar size='sm' name={user?.name} src='https://bit.ly/tioluwani-kolawole' />
            </Box>



            <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
              <ModalOverlay />
              <ModalContent>
                <Box padding={'5px 10px'}>Update Profile</Box>
                <ModalCloseButton />
                <ModalBody>
                  <Box as="form" id="updateProfileForm" onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="name" fontSize="var(--mini-text)" mb={'2px'}>Name</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        {...register('name', { required: "Name is required" })}
                        defaultValue={empData?.name} fontSize="var(--text-12px)"
                      />
                      {errors.name && <Text color="red.500">{errors.name.message}</Text>}
                    </FormControl>

                    <FormControl isRequired mt={4}>
                      <FormLabel htmlFor="mobile_no" fontSize="var(--mini-text)" mb={'2px'}>Mobile No:</FormLabel>
                      <Input
                        id="mobile_no"
                        type="mobile_no"
                        {...register('mobile_no', { required: "Mobile No. is required" })}
                        defaultValue={empData?.mobile_no} fontSize="var(--text-12px)"
                      />
                      {errors.mobile_no && <Text color="red.500">{errors.mobile_no.message}</Text>}
                    </FormControl>

                    {/* <FormControl isRequired mt={4}>
                      <FormLabel htmlFor="profile" fontSize="var(--mini-text)" mb={'2px'}>Profile Picture</FormLabel>
                      <Input
                        id="profile"
                        type="file"
                        {...register('profile')} fontSize="var(--text-12px)"
                      />
                    </FormControl> */}

                    <FormControl isRequired mt={4}>
                                    <FormLabel fontSize="var(--mini-text)" mb="2px">
                                      Profile Picture
                                    </FormLabel>
                                    <Input
                                      type="file"
                                      {...register('profile')}
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
                  </Box>
                </ModalBody>

                <ModalFooter justifyContent={'center'} gap={'5px'} w={"100%"}>
                  
                   <Button w='100%' size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                      textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''} onClick={onProfileClose}>
                    Close
                  </Button>
                  <Button w='100%' type="submit" form="updateProfileForm" fontSize={'13px'} bgColor={'#FF5722'} _hover={''} 
                  textColor={'white'} size={'sm'} >Update</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </Flex>
        
        </Flex>
      </Flex>

      <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose} size={'xs'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor="#fafbff">Menu</DrawerHeader>
          <DrawerBody p="0px 20px" bgColor="#fafbff">
            {user.role==='Admin' ? 
            <Flex
              justifyContent="space-evenly"
              gap={1}
              alignItems="center"
              flexDir={'column'}
              mx={'10px'}
            >
              {adminNavbar.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.url}
                  style={({ isActive }) => ({
                    width: '100%',
                    textAlign: 'left',
                    color: isActive ? "#FF5722" : "#000000",
                    backgroundColor: isActive ? "#FF572215" : "transparent",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    transition: "0.25s",
                    textDecoration: "none",
                  })}
                >
                  <Text fontSize="15px" fontWeight="500" cursor="pointer">
                    {item.icon}{item.title}
                  </Text>
                </NavLink>
              ))}
            </Flex> :  <Flex
              justifyContent="space-evenly"
              gap={1}
              alignItems="center"
              flexDir={'column'}
              mx={'10px'}
            >
              {superAdminNavbar.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.url}
                  style={({ isActive }) => ({
                    width: '100%',
                    textAlign: 'left',
                    color: isActive ? "#FF5722" : "#000000",
                    backgroundColor: isActive ? "#FF572215" : "transparent",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    transition: "0.25s",
                    textDecoration: "none",
                  })}
                >
                  <Text fontSize="15px" fontWeight="500" cursor="pointer">
                    {item.icon}{item.title}
                  </Text>
                </NavLink>
              ))}
            </Flex>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isPasswordOpen} onClose={onPasswordClose}>
            <ModalOverlay />
            <ModalContent>
              <Box padding={'5px 10px'}>Change Password</Box>
              <ModalCloseButton />
              <ModalBody>
                <Box as="form" onSubmit={handleSubmitPass(onPasswordSubmit)} display={'flex'} flexDirection={'column'} gap={'5px'}>
                  <FormControl isRequired>
                    <FormLabel fontSize="var(--mini-text)" mb={'2px'} >Email</FormLabel>
                    <Input type="email"  {...registerPass('email')} fontSize="var(--text-12px)" autoComplete='off'></Input>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize="var(--mini-text)" mb={'2px'}>New Password</FormLabel>
                    <Input type="password"   {...registerPass('password')} fontSize="var(--text-12px)"  ></Input>
                  </FormControl >
                  <Box w={'100%'} mt={'6px'} display={'flex'} gap={'5px'} justifyContent={'center'}>
                    <Button w={'100%'} onClick={onPasswordClose} size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                      textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>
                      Close
                    </Button>
                      <Button w={'100%'} type="submit" fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'} >Save</Button>
                  </Box>
                </Box>
              </ModalBody>
            </ModalContent>
       </Modal>

    </HStack>
  );
}

export default Navbar;
