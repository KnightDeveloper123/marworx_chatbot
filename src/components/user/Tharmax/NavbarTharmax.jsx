import { Avatar, Box, Button, Divider, Flex, IconButton, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Portal, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";
import Logo from "../../../assets/TharmaxLogo.png"
import { AiFillBell } from "react-icons/ai";
import { FiMessageSquare, FiBell, FiMenu } from "react-icons/fi";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const NavbarTharmax = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, onQuestionOpen } = useContext(AppContext)
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.clear();
        navigate('/')
    }

    return (
        <>
            <Flex bg={'#fff'} h={'70px'} w={'100%'} px={6} boxShadow='0px 0px 10px 0px #00000040'>
                <Flex flex={1} gap={10} alignItems={"center"} display={{ base: "none", sm: "none", md: "flex" }}>
                    <Image boxSize={"40px"} src={Logo} />
                    <Link>
                        <Text>Home</Text>
                    </Link>
                    <Link to={'/community'}>
                        <Text>Community</Text>
                    </Link>
                    <Link>
                        <Text>Leaderboard</Text>
                    </Link>


                    <IconButton
                        display={{ base: "flex", md: "none" }}
                        aria-label="Menu"
                        icon={<FiMenu />}
                        variant="ghost"
                        onClick={onOpen}
                    />

                </Flex>
                <Flex align="center" gap={4}>
                    {/* Search Input */}
                    <InputGroup
                        maxW="220px"
                        bg="gray.100"
                        borderRadius="full"
                        boxShadow="sm"
                    >
                        <InputLeftElement
                            pointerEvents="none"
                            children={<CiSearch color="gray.400" />}
                        />
                        <Input
                            type="text" git ag
                            placeholder="Search"
                            border="none"
                            _focus={{ boxShadow: "none" }}
                            borderRadius="full"
                            fontSize="sm"
                        />
                    </InputGroup>

                    {/* Chat Icon */}
                    <IconButton
                        aria-label="Chat"
                        icon={<FiMessageSquare />}
                        variant="ghost"
                        color="gray.600"
                        fontSize="20px"
                    />

                    {/* Notification Icon */}
                    <IconButton
                        aria-label="Notifications"
                        icon={<FiBell />}
                        variant="ghost"
                        color="gray.600"
                        fontSize="20px"
                    />



                    {/* <Popover>
                        <PopoverTrigger>
                            <IconButton bgColor={'transparent'} _hover={{ bgColor: 'transparent' }}>
                                <Avatar size="sm" name={user?.name} />
                            </IconButton>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverBody>
                                    <Flex flexDir={'column'} alignItems={'center'}>
                                        <Flex flexDir={'column'} gap={2} alignItems={'center'}>
                                            <Avatar size="md" name={user?.name} />
                                            <Text>{user?.name}</Text>
                                        </Flex>
                                        <Divider my={2} />

                                    </Flex>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover> */}

                    <Menu>
                        <MenuButton bgColor={'transparent'} _hover={{ bgColor: 'transparent' }}>
                            <Avatar size="sm" name={user?.name} />
                        </MenuButton>
                        <MenuList w={'100%'}>
                            {/* <MenuItem w={'100%'} isDisabled> */}
                                <Flex flexDir={'column'} alignItems={'center'}>
                                    <Flex flexDir={'column'} gap={2} alignItems={'center'}>
                                        <Avatar size="md" name={user?.name} />
                                        <Text>{user?.name}</Text>
                                    </Flex>
                                    <Divider my={3} />
                                </Flex>
                            {/* </MenuItem> */}
                            <MenuItem onClick={handleLogout}>
                                <Text fontSize={'14px'}>Logout</Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>


                    <Button
                        bg="red.500"
                        onClick={onQuestionOpen}
                        color="white"
                        _hover={{ bg: "red.600" }}
                        borderRadius="full"
                        fontSize="sm"
                        px={4}
                        py={2}
                        leftIcon={<span style={{ fontWeight: "bold", fontSize: "20px" }}>+</span>}
                    >
                        Add question
                    </Button>
                </Flex>
            </Flex>
        </>
    )
}

export default NavbarTharmax;
