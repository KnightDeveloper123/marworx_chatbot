import { AddIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { VscSend } from "react-icons/vsc";
import { useToast } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const APP_URL = import.meta.env.VITE_BACKEND_URL

const MainPage = () => {
    const [value, setValue] = useState("");
    const [allchats, setAllchats] = useState([]);
    const [loading, setLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const bottomRef = useRef(null);
    

    const { username, logout } = useContext(AppContext);

    const navigate = useNavigate();

    let { id } = useParams();
    const { userid } = useParams();

    const toast = useToast();

    // console.log(allchats);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = { message: value, sender: "user" };
        const updatedChats = [...allchats, message]; 

        let title_id = null;
        setAllchats(updatedChats);

        if (id) {
            sendResponse(value, "user");
        }
        else {
            const data = {
                user_id: userid,
                chats: updatedChats[0],
            };
            const res = await sendNewChat(data);
            title_id=res.title_id
            navigate(`/${userid}/${title_id}`);
        }
        setValue("");
        setLoading(true);

        try {
            const res = await axios.get(`http://216.10.251.154:5000/get_info?query=${value}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
  
            if (res) setLoading(false);
            setAllchats((prevchats) => [
                ...prevchats,
                { message: res.data.response || "No response received", sender: "bot" }
            ]);

            // console.log(allchats, res.data.response, title_id);
            
            if(title_id) {
                await sendResponse(res?.data?.response, "bot", title_id);
                title_id=null 
            } else {
                await sendResponse(res?.data?.response, "bot");
            }
 

        } catch (error) {
            console.error("Error fetching response", error);
            setAllchats((prevchats) => [
                ...prevchats,
                { message: "I am not able to find", sender: "bot" }
            ]);
            if(error.message){
                setLoading(false);
            }
            if (id) {
                // sendResponse(error.message, "bot");
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    position: "top",
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    position: "top",
                    isClosable: true,
                })
            }
        }
    };

   


    const sendResponse = async (message, sender, title_id = null) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }

            await axios.post(`${APP_URL}/chatbot/addChat`, {
                message: message,
                sender: sender,
                title_id: title_id ? title_id : id
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

            const response = await axios.post(`${APP_URL}/chatbot/newChat`, { user_id: userid, chats: allchats }, {
                headers: { Authorization: `${token}` },
            })

            // await navigate(`/${userid}/${response.data.chat_id}`);
            return {title_id: response.data.chat_id};
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
            setAllchats(response.data.data)

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
        
    }, [id]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allchats]);

    // useEffect(() => {
    //     console.log(allchats, "Updated history");
    // }, [allchats]);

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

                </Flex>
            </Flex>



            <Button
                onClick={() => { navigate(`/${userid}`); }}
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

                {allchats.map((chat, index) => (

                    <Box
                    key={index}
                    alignSelf={chat.sender === "user" ? "flex-end" : "flex-start"}
                            bg={chat.sender === "user" ? "#4A90E2" : "#2D3748"}
                            color="white"
                            borderRadius="20px"
                            p="10px"
                            maxW="60%"
                            my="8px"
                            boxShadow="md"
                            
                            >
                            {console.log(chat.message)}
                            {/* <Text>{chat.message}</Text> |||  */}
                            {chat.sender === "bot" && index === allchats.length-1 ? (
                                <Text>{chat.message}</Text>
                                
                            ) : (
                                <Text>{chat.message}</Text>
                            )}


                        </Box>
                    )
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