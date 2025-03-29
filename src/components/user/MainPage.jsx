import { AddIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Box, Button, Card, CardHeader, Center, Flex, Grid, GridItem, Heading, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Radio, RadioGroup, Stack, Text, Textarea, Toast, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import { AppContext } from "../context/AppContext";
import { VscSend } from "react-icons/vsc";
import { useToast } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const APP_URL = import.meta.env.VITE_BACKEND_URL

const MainPage = () => {
    const [value, setValue] = useState("");
    const [allchats, setAllchats] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [guest,setGuest] = useState([]);
    // const [file, setFile] = useState(null);
    const bottomRef = useRef(null);
    const fileInputRef = useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onClose: onEditClose
    } = useDisclosure();

    const editCancelRef = useRef();

    const { clearChat, setClearChat, username, setUsername, logout } = useContext(AppContext);

    const navigate = useNavigate();

    let { id } = useParams();
    const { userid } = useParams();

    console.log("userId", userid);
    console.log("titleId", id);


    const toast = useToast();

    // const handleFileChange = (event) => {
    //     setFile(event.target.files[0]); // Store the selected file
    // };

    // const handleFileSubmit = async (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append("avatar", file);



    //     try {
    //         const response = await axios.post("http://localhost:5000/upload", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });
    //         // console.log(response);


    //         if (response) {
    //             toast({
    //                 title: "File uploaded successfully",
    //                 description: "File uploaded",
    //                 status: "success",
    //                 duration: 5000,
    //                 position: "top",
    //                 isClosable: true,
    //             });
    //             if (fileInputRef.current) {
    //                 fileInputRef.current.value = "";
    //             }
    //             setFile(null);
    //             onEditClose();
    //         }
    //     } catch (error) {
    //         console.error("Upload error:", error);
    //         toast({
    //             title: "File upload failed",
    //             description: "failed",
    //             status: "error",
    //             duration: 5000,
    //             position: "top",
    //             isClosable: true,
    //         });
    //     }
    // };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const userMessage = { data: value, sender: "user" };
        // const loadingMessage = { data: <div className="loader"></div>, sender: "chatbot" };

        setAllchats((prevchats) => [...prevchats, userMessage]);
        // setGuest((prevchats) => [...prevchats, userMessage, loadingMessage]);

        // console.log(allchats);


        if (id) {
            sendResponse(value, "user");
        }
        setValue("");
        setLoading(true);

        try {
            const res = await axios.get(`http://216.10.251.154:5000/get_info?query=${value}`);

            if (res) setLoading(false);
            // console.log(res.data.response,"value");
            setAllchats((prevchats) => [
                ...prevchats,
                { data: res.data.response || "No response received", sender: "bot" }
            ]);



            if (id) {
                console.log("from id is present");

                sendResponse(res?.data?.response, "bot");
            } else {
                console.log("from id is Absent");
                const data = {
                    userMessage: userMessage,
                    response: { data: res.data.response || "No response received", sender: "bot" }
                }
                sendNewChat(data)
            }

        } catch (error) {
            console.error("Error fetching response", error);
            setAllchats((prevchats) => [
                ...prevchats,
                { data: "I am not able to find", sender: "bot" }
            ]);
            if (id) {
                sendResponse(error.message, "bot");
            } else {
                const data = {
                    userMessage: userMessage,
                    response: { data: error.message, sender: "bot" }
                }
                sendNewChat(data)
            }
        }
    };




    const sendResponse = async (message, sender) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            console.log(message, sender);

            await axios.post(`${APP_URL}/chatbot/addChat`, {
                message: message,
                sender: sender,
                title_id: id
            }, {
                headers: { Authorization: `${token}` },
            })
        } catch (error) {
            console.error("Error saving message:", error);
        }
    }

    const sendNewChat = async (allchats) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }
        try {
            // console.log(allchats,"allchats");

            const response = await axios.post(`${APP_URL}/chatbot/newChat`, { user_id: userid, chats: allchats }, {
                headers: { Authorization: `${token}` },
            })
            // console.log(response.data.chat_id,"chat_id");

            navigate(`/${userid}/${response.data.chat_id}`);

        } catch (error) {
            console.error("Error saving message:", error);
        }
    }

    const getsidebardata = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const response = await axios.get(`${APP_URL}/chatbot/getAllChats?title_id=${id}`, {
                headers: { Authorization: `${token}` },
            });
            // console.log(response.data.data,"setChatHistory");
            setChatHistory(response.data.data)
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    useEffect(() => {

        getsidebardata(id);
        if (clearChat === true) {
            setAllchats([]);
            // setClearChat(false);
        }
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }

    }, [id]);

    return (

        <Flex h="100vh" bgColor="#1A202C" flexDir="column" justifyContent="space-between" alignItems={'center'} gap={4} >
            <Flex bg={'#171923'} h={'90px'} w={'100%'} >
                <Flex bg={'#171923'} w={'100%'} justifyContent={'flex-end'} alignItems={'center'}>
                    <Menu >
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<FaUser />}
                            variant='outline'
                            mr={'10px'}
                            bgColor={"#1A202C"}
                            color="white"
                            border={'none'}
                            _hover={"none"}

                        />
                        <Text color={'white'} mr={'20px'}> {username}</Text>
                        <MenuList bgColor={"#171923"} border={'none'}>
                            <MenuItem icon={<AddIcon />} onClick={onEditOpen} bgColor={"#171923"} color={"white"}>
                                Add File
                            </MenuItem>
                            <MenuItem icon={<IoLogOut size={19} />} onClick={onOpen} bgColor={"#171923"} color={"white"}>
                                Log Out
                            </MenuItem>
                        </MenuList>
                    </Menu>

                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}

                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent bgColor={"#2D3748"} color={"white"}>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Log out
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={() => { onClose(); handleLogout(); }} ml={3}>
                                        Log Out
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>


                    {/* <AlertDialog
                        motionPreset='slideInBottom'
                        leastDestructiveRef={editCancelRef}
                        onClose={onEditClose}
                        isOpen={isEditOpen}
                        isCentered
                    >
                        <AlertDialogOverlay />

                        <AlertDialogContent bgColor={"#2D3748"} color={"white"}>
                            <AlertDialogHeader>Upload a file</AlertDialogHeader>
                            <AlertDialogCloseButton />
                            <AlertDialogBody>
                                <input type="file" name="avatar" ref={fileInputRef} onChange={handleFileChange} />
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={editCancelRef} onClick={onEditClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red'  ml={3} onClick={handleFileSubmit}>
                                    Submit
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog> */}


                </Flex>
            </Flex>



            <Button
                onClick={() => { navigate(`/${userid}`); setAllchats([]) }}
                alignSelf={'flex-start'} colorScheme='#1A202C'><AddIcon mr={'7px'} /> New Chat
            </Button>

            <Flex
                bg={"#1A202C"}
                h={"100%"}
                flexDir={"column"}
                overflowY={"auto"}

                w={"70%"}
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

                {id && (

                    chatHistory.map((chat, index) => (

                        <Box
                            key={index}
                            alignSelf={chat.sender === "bot" ? "flex-start" : "flex-end"}
                            bg={chat.sender === "bot" ? "#2D3748" : "#4A90E2"}
                            color="white"
                            borderRadius="20px"
                            p="10px"
                            maxW="60%"
                            my="8px"
                            boxShadow="md"

                        >
                            {chat.sender === "bot" && index === chatHistory.length - 1 ? (
                                <TypeAnimation
                                    sequence={[chat.message]}
                                    wrapper="span"
                                    speed={70}
                                    cursor={false}
                                    style={{ display: "inline-block" }}
                                />
                            ) : (
                                <Text>{chat.message}</Text>
                            )}


                        </Box>
                    ))
                )}

                {loading && (
                    <Box
                        alignSelf="flex-start"
                        bg="#2D3748"
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

            <Flex bg={'#2D3748'} color={'white'} h={'150px'} w={'70%'} borderRadius="20px" mb="15px" zIndex="20" flexDirection="column-reverse" >
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

export default MainPage;