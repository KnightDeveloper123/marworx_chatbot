import { Box, Button, Flex, Heading, Icon, Image, Menu, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { VscSend } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { RiUserAddFill } from "react-icons/ri";
import logo from "../../assets/logo.webp";
import { motion } from "framer-motion";
const BOT_URL = import.meta.env.VITE_BOT_API_URL


const Guest = () => {
    const [value, setValue] = useState("");
    const [allchats, setAllchats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showHeading, setShowHeading] = useState(true);

        const MotionBox = motion(Box);

    const bottomRef = useRef(null);

    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = { message: value, sender: "user" };
        const updatedChats = [...allchats, message];

        setAllchats(updatedChats);

        setValue("");
        setLoading(true);

        try {
            const res = await axios.get(`${BOT_URL}/get_info?query=${value}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res) setLoading(false);
            setAllchats((prevchats) => [
                ...prevchats,
                { message: res?.data?.answer || "No response received", sender: "bot" }
            ]);

        } catch (error) {
            console.error("Error fetching response", error);
            setAllchats((prevchats) => [
                ...prevchats,
                { message: "I am not able to find", sender: "bot" }
            ]);
            if (error.message) {
                setLoading(false);
            }
        }
    };


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allchats]);


    useEffect(() => {

        const countChats = allchats.length;
        localStorage.setItem("countChats", countChats);


        if (countChats >= 7) {
            onOpen();
            localStorage.setItem("chatLimitReached", "true");
        }
        if (countChats > 0) {
            setShowHeading(false);
        }
        const limitReached = localStorage.getItem("chatLimitReached");
        if (limitReached === "true") {
            onOpen(); 
        }
    }, [allchats, onOpen]);




    return (



        <Flex zIndex={1} h="100vh" bgColor="#1A202C" flexDir="column" justifyContent="space-between" alignItems={'center'} gap={4} >
            <Flex bg={'#171923'} h={'90px'} w={'100%'} >
                <Flex justifyContent={'center'} alignItems={'center'} ml={{ md: '20px', base: '0px' }}>
                    <Image src={logo} h={{ md: '30px', base: '20px' }} />
                </Flex>
                <Flex bg={'#171923'} w={'100%'} justifyContent={'flex-end'} alignItems={'center'}>
                    <Menu >
                        <FaUser color="white" /> <Text color={'white'} ml={{ md: '10px', base: '5px' }} mr={{ md: '30px', base: '10px' }}> Guest </Text>
                        <IoLogOut color="white" size={19} />  <Text cursor={'pointer'} onClick={() => navigate('/login')} color={'white'} ml={{ md: '10px', base: '5px' }} mr={{ md: '30px', base: '10px' }}>Log In</Text>
                        <RiUserAddFill color="white" size={19} /> <Text color={'white'} ml={{ md: '10px', base: '5px' }} mr={{ md: '30px', base: '10px' }} cursor={'pointer'} onClick={() => navigate('/signup')}> Sign Up </Text>
                    </Menu>

                </Flex>
            </Flex>

            <Modal isOpen={isOpen} isCentered closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent bgColor={'#1A202C'} color={'white'}>
                    <ModalHeader>Chat Limit Exceeded </ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody>
                        Your chat session limit has been reached. Kindly log in to unlock unlimited access.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => { navigate('/login'); onClose(); }} colorScheme="blue" mr={3}>Log in</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Flex
                bg={"#1A202C"}
                h={"100%"}
                flexDir={"column"}
                overflowY={"auto"}

                w={{ md: "70%", base: "100%" }}
                p={4}
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#2D3748",
                        borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#4A5568",
                        borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#718096",
                    },
                }}
            >


                {showHeading && (
                    <Flex justifyContent={'center'} alignItems={'center'} h={"full"}>
                        <Heading
                            size="lg"
                            fontSize={{ base: "30px", md: "50px" }}
                            color="white"
                            textAlign="center"
                            fontWeight="bold"
                            bgGradient="linear(to-r, teal.300, blue.500)"
                            bgClip="text"
                            mb={4}
                            w={"50%"}
                        >
                            Hey there! How can I assist you today?
                        </Heading>
                    </Flex>
                )}

                {allchats.map((chat, index) => (

                    <Box
                        key={index}
                        alignSelf={chat.sender === "user" ? "flex-end" : "flex-start"}
                        bg={chat.sender === "user" ? "#4A90E2" : "#171923"}
                        color="white"
                        borderRadius="20px"
                        p="10px"
                        maxW="60%"
                        my="8px"

                        boxShadow="md"

                    >


                        {/* {chat.sender === "bot" && index === allchats.length - 1 ? (
                            <TypeAnimation
                                sequence={[chat.message, 1000]}
                                speed={70} // Increase this number for faster typing (default is 40)
                                cursor={false}
                            />
                        ) : (
                            <Box>
                                {chat.message
                                    // Split by numbered points (e.g. "1. ", "2. ", etc.) keeping the number
                                    .split(/(?=\n\s*\d+\.\s+)/)
                                    .map((part, idx) => (
                                        <Text key={idx} mt={idx !== 0 ? 2 : 0}>
                                            {part.trim()}
                                        </Text>
                                    ))}
                            </Box>
                        )} */}

                        {chat.sender === "bot" && index === allchats.length - 1 ? (
                            <Box>
                                {chat.message
                                    .split('\n\n')
                                    .filter(line => line.trim() !== '')
                                    .map((line, idx) => {
                                        const withIndent = line.replace(/\t/g, '\u00A0\u00A0\u00A0\u00A0');

                                        const parsedLine = withIndent
                                            .split(/(\*\*.*?\*\*|\*.*?\*)/)
                                            .map((part, i) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return (
                                                        <Text as="span" fontWeight="bold" key={i}>
                                                            {part.slice(2, -2)}
                                                        </Text>
                                                    );
                                                } else if (part.startsWith('*') && part.endsWith('*')) {
                                                    return (
                                                        <Text as="span" fontStyle="italic" key={i}>
                                                            {part.slice(1, -1)}
                                                        </Text>
                                                    );
                                                } else {
                                                    return <Text as="span" key={i}>{part}</Text>;
                                                }
                                            });

                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 1.4 }}
                                            >
                                                <Text mt={idx !== 0 ? 3 : 0}>{parsedLine}</Text>
                                            </motion.div>
                                        );
                                    })}
                            </Box>
                        ) : (
                            <Box>
                                {chat.message
                                    .split('\n\n')
                                    .filter(line => line.trim() !== '')
                                    .map((line, idx) => {
                                        const withIndent = line.replace(/\t/g, '\u00A0\u00A0\u00A0\u00A0'); // 4 non-breaking spaces

                                        const parsedLine = withIndent
                                            .split(/(\*\*.*?\*\*|\*.*?\*)/)
                                            .map((part, i) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return (
                                                        <Text as="span" fontWeight="bold" key={i}>
                                                            {part.slice(2, -2)}
                                                        </Text>
                                                    );
                                                } else if (part.startsWith('*') && part.endsWith('*')) {
                                                    return (
                                                        <Text as="span" fontStyle="italic" key={i}>
                                                            {part.slice(1, -1)}
                                                        </Text>
                                                    );
                                                } else {
                                                    return <Text as="span" key={i}>{part}</Text>;
                                                }
                                            });

                                        return (
                                            <Text key={idx} mt={idx !== 0 ? 3 : 0}>
                                                {parsedLine}
                                            </Text>
                                        );
                                    })}
                            </Box>
                        )}



                    </Box>
                )
                )}

                {loading && (
                    <Box
                        alignSelf="flex-start"
                        bg="#171923"
                        color="white"
                        borderRadius="20px"
                        p="10px"
                        maxW="60%"
                        my="8px"
                        boxShadow="md"

                    >
                        <Box className="loader"></Box>
                    </Box>
                )}

                <div ref={bottomRef}></div>
            </Flex>



            <Flex bg={'#2D3748'} color={'white'} h={'150px'} w={{ md: '70%', base: '90%' }} borderRadius="20px" mb="15px" zIndex="20" flexDirection="column-reverse" >
                <Flex justifyContent="flex-end">
                    {value.length > 0 ? <Button w="40px" h="40px" color={"white"} bg="#171923" borderRadius="100%" m="5px"
                        _hover={{ bg: "#4A90E2" }}
                        onClick={handleSubmit}>

                        <Icon as={VscSend} boxSize={4} />

                    </Button> : " "}

                </Flex>
                <Textarea
                    placeholder="Ask Anything"
                    size="sm"
                    border={"none"}
                    resize="vertical"
                    borderRadius="20px"
                    _focus={{ outline: "none", boxShadow: "none", borderColor: "transparent" }}
                    overflowY="auto"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            if (value.trim() !== "") {
                                handleSubmit(event);
                            }
                        }
                    }}
                    sx={{
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        "-ms-overflow-style": "nsetValueone",
                        "scrollbar-width": "none",
                    }}
                />
            </Flex>
        </Flex>

    );
};

export default Guest;