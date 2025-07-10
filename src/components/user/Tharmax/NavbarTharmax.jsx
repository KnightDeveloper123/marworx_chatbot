import { Avatar, Button, Flex, IconButton, Image, Input, InputGroup, InputLeftElement, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Logo from "../../../assets/TharmaxLogo.png"
import { AiFillBell } from "react-icons/ai";
import { FiMessageSquare, FiBell, FiMenu } from "react-icons/fi";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { CiSearch } from "react-icons/ci";

const NavbarTharmax = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex bg={'#fff'} h={'50px'} w={'100%'} >
                <Flex flex={1} gap={10} alignItems={"center"} display={{ base: "none", sm: "none", md: "flex" }}>
                    <Image ml={"50px"} boxSize={"40px"} src={Logo} />
                    <Text>Home</Text>
                    <Text>Community</Text>
                    <Text>Leaderboard</Text>


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


                    <Avatar size="sm" name="User" src="https://i.pravatar.cc/40" />


                    <Button
                        bg="red.500"
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
