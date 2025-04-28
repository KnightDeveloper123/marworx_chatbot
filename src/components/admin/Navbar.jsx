import React from "react";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaTachometerAlt, FaUser, FaUserPlus } from "react-icons/fa";
import { SiGooglebigquery } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { IoSettingsSharp, IoNotifications } from "react-icons/io5";
import { decrypt } from "../utils/security";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure()
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure()


  const adminNavbar = [
    { title: "Dashboard", url: "/admin/dashboard", icon: <Icon as={FaTachometerAlt} mr={2} /> },
    { title: "Employee", url: "/admin/employee", icon: <Icon as={FaCircleUser} mr={2} /> },
    { title: "Sector", url: "/admin/sector", icon: <Icon as={FaCircleUser} mr={2} /> },
    { title: "Users", url: "/admin/user", icon: <Icon as={FaUser} mr={2} /> },
    { title: "Product Services ", url: "/admin/product_service", icon: <Icon as={FaCircleUser} mr={2} /> },
    { title: "Bot Builder", url: "/admin/bot_builder", icon: <Icon as={FaCircleUser} mr={2} /> },
    { title: "Campaign", url: "/admin/campaign", icon: <Icon as={FaUser} mr={2} /> },
    { title: "Genarative Bot", url: "/admin/gen_bot", icon: <Icon as={FaUser} mr={2} /> },
    { title: "Queries", url: "/admin/queries", icon: <Icon as={SiGooglebigquery} mr={2} /> },
  ];
  const encryptedUser = localStorage.getItem('user');
  const user = encryptedUser ? decrypt(encryptedUser) : null;

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

            <Box>
              <Menu>
                <MenuButton as={Button} backgroundColor={'white'} _focus={{ bg: "transparent" }} _active={{ bg: "transparent" }}>
                  <IoSettingsSharp />
                </MenuButton>
                <MenuList padding={'2'}>
                  <MenuItem>
                    <Box display={'flex'} flexDirection={'row'} gap={'10px'}>
                      <Avatar name={user?.name} bgColor={"#FF5722"} color={"white"} />
                      <Box display={'flex'} flexDirection={'column'}>
                        <Text fontSize="var( --mini-14px)">{user?.name}</Text>
                        <Text fontSize="var( --mini-14px)">{user?.email}</Text>
                      </Box>
                    </Box>

                  </MenuItem>
                  <MenuDivider />
                  <MenuItem fontSize="var(--mini-14px)" onClick={onProfileOpen}>Profile</MenuItem>
                  <MenuItem fontSize="var(--mini-14px)"> Password</MenuItem>
                  <MenuDivider />
                  <MenuItem fontSize="var(--mini-14px)">Log Out</MenuItem>
                </MenuList>
                
              </Menu>
            </Box>
            <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={onProfileClose}>
                        Close
                      </Button>
                      <Button variant='ghost'>Secondary Action</Button>
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
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}

export default Navbar;
