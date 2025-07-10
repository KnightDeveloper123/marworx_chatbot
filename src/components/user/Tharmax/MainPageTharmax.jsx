import { AddIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, FormLabel, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Switch, Text, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { VscSend } from "react-icons/vsc";
import { useToast } from "@chakra-ui/react";
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { GoReport } from "react-icons/go";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const APP_URL = import.meta.env.VITE_BACKEND_URL
const BOT_URL = import.meta.env.VITE_BOT_API_URL

const MainPageTharmax = () => {
    const [value, setValue] = useState("");
    const [allchats, setAllchats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState("");
    const [withDocumentation, setWithDocumentation] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const bottomRef = useRef(null);
    const initRef = React.useRef();
    const { username, logout, startNewChat } = useContext(AppContext);

    const navigate = useNavigate();
    const MotionBox = motion(Box);

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
            title_id = res.title_id
            navigate(`/${userid}/${title_id}`);
        }
        setValue("");
        setLoading(true);
        // console.log(value)
        // console.log('ENV TEST:', process.env.REACT_APP_API_URL);
        try {
            const res = await axios.get(`${BOT_URL}/get_info?query=${value}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // console.log("res", res);

            // if(withDocumentation){
            // const res="With Documentation";
            // console.log(res);
            // }
            // else{
            //     const res="Without Documentation";
            //     console.log(res);
            // }
            //     const url = withDocumentation
            // ? `http://216.10.251.154:5000/get_info?query=${value}`
            // : `http://216.10.251.154:5000/get_info_no_doc?query=${value}`;


            // const res = {
            //     data: {
            //         answer: "**bold** : bold\n*italic* : italic\n\\n\\n : enter,enter\n\\t : tab\n\nLorem Ipsum is simply dummy text of the **printing and typesetting industry**. *Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.* It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\n\n  \t It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            //     }
            // };
            // console.log(res?.data?.answer);


            if (res) setLoading(false);
            setAllchats((prevchats) => [
                ...prevchats,
                { message: res?.data?.answer || "No response received", sender: "bot" }
            ]);

            // console.log(allchats, res.data.response, title_id);

            if (title_id) {
                await sendResponse(res?.data?.answer, "bot", title_id);
                title_id = null
            } else {
                await sendResponse(res?.data?.answer, "bot");
            }


        } catch (error) {
            console.error("Error fetching response", error);
            setAllchats((prevchats) => [
                ...prevchats,
                { message: "I am not able to find", sender: "bot" }
            ]);
            if (error.message) {
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
                setLoading(false);
            }
        }
    };


    // console.log(allchats);


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
            return { title_id: response.data.chat_id };
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
            console.log(response.data.data);


        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    const handleReport = (data) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            axios.post(`${APP_URL}/support/addQuery`, { query: data, user_id: userid }, {
                headers: { Authorization: `${token}` },
            }).then((res) => {
                toast({
                    title: "Success",
                    description: res.data.success,
                    status: "success",
                    duration: 5000,
                    position: "top",
                    isClosable: true,
                })
                setReportData("");
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.error("Error saving message:", error);
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

    const handleLogout = () => {
        logout();
        navigate("/");
    };



    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allchats]);

    const [feedbackMap, setFeedbackMap] = useState({});

    const handleLike = async (chatId) => {
        const newStatus = feedbackMap[chatId] === 0 ? null : 0;
        setFeedbackMap(prev => ({ ...prev, [chatId]: newStatus }));
        await sendFeedback(chatId, newStatus);
    };

    const handleDislike = async (chatId) => {
        const newStatus = feedbackMap[chatId] === 1 ? null : 1;
        setFeedbackMap(prev => ({ ...prev, [chatId]: newStatus }));
        await sendFeedback(chatId, newStatus);
    };
    // console.log(feedbackMap);


    const sendFeedback = async (chatId, feedback) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }
        try {
            const response = await axios.post(`${APP_URL}/chatbot/likeChat`, {
                chat_id: chatId,
                user_id: userid,
                feedback: feedback
            },
                { headers: { Authorization: `${token}` } });
            console.log(response.data);

        } catch (error) {
            console.error("Error submitting feedback:", error.response?.data || error.message);
        }
    };
    //  console.log(allchats);
    useEffect(() => {

        getsidebardata(id);

    }, [id]);

    const handleFeedback = (id, type) => {
        setFeedbackMap((prev) => ({
            ...prev,
            [id]: prev[id] === type ? null : type, // Toggle if already selected
        }));
    };

    return (

        <Flex
            h="100%"
            w="100%"
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
            bg="#fff"
            px={4}
            pb={4}
        >
            {/* <Button
                zIndex={1}
                onClick={() => { navigate(`/${userid}`); }}
                alignSelf={'flex-start'} colorScheme='#1A202C'><AddIcon mr={'7px'} /> New Chat
            </Button> */}

            <Flex
                bg={"#fff"}
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
                        background: "#BABABA",
                        borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#BABABA",
                        borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#BABABA",
                    },
                }}
            >

                {allchats.map((chat, index) => (
                    <>
                        <Box
                            key={index}
                            alignSelf={chat.sender === "user" ? "flex-end" : "flex-start"}
                            bg={chat.sender === "user" ? "#FFEFF0" : "#F5F5F5"}
                            color="black"
                            borderRadius="20px"
                            p="10px"
                            maxW="60%"
                            my="8px"

                        >

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

                                    {/* <HStack spacing={4}>
                                               <IconButton
                                                   icon={<FaThumbsUp />}
                                                   colorScheme={liked ? 'blue' : 'gray'}
                                                   variant={liked ? 'solid' : 'outline'}
                                                   aria-label="Like"
                                                   onClick={handleLike}
                                               />
                                               <Text>{liked ? 'Liked' : ''}</Text>
           
                                               <IconButton
                                                   icon={<FaThumbsDown />}
                                                   colorScheme={disliked ? 'red' : 'gray'}
                                                   variant={disliked ? 'solid' : 'outline'}
                                                   aria-label="Dislike"
                                                   onClick={handleDislike}
                                               />
                                               <Text>{disliked ? 'Disliked' : ''}</Text>
                                           </HStack> */}

                                </Box>
                            )}



                        </Box>

                        {chat.sender === "bot" && (
                            //imp                     // <HStack spacing={1}>
                            //     <IconButton
                            //         size="sm"
                            //         bg="transparent"
                            //         icon={
                            //             feedbackMap[chat.id] === 0 ? (
                            //                 <FaThumbsUp color="#3182CE" />
                            //             ) : (
                            //                 <FaRegThumbsUp color="gray" />
                            //             )
                            //         }
                            //         variant="ghost"
                            //         aria-label="Like"
                            //         _hover={{ bg: "transparent" }}
                            //         _active={{ bg: "transparent" }}
                            //         onClick={() => handleLike(chat.id)}
                            //     />
                            //     <IconButton
                            //         size="sm"
                            //         bg="transparent"
                            //         icon={
                            //             feedbackMap[chat.id] === 1 ? (
                            //                 <FaThumbsDown color="#E53E3E" />
                            //             ) : (
                            //                 <FaRegThumbsDown color="gray" />
                            //             )
                            //         }
                            //         variant="ghost"
                            //         aria-label="Dislike"
                            //         _hover={{ bg: "transparent" }}
                            //         _active={{ bg: "transparent" }}
                            //         onClick={() => handleDislike(chat.id)}
                            //     />
                            // </HStack>

                            <HStack spacing={1}>
                                {/* Like Button */}
                                <IconButton
                                    size="sm"
                                    bg="transparent"
                                    icon={
                                        feedbackMap[chat.id] === 0 ? (
                                            <FaThumbsUp color="#3182CE" />
                                        ) : (
                                            <FaRegThumbsUp color="gray" />
                                        )
                                    }
                                    variant="ghost"
                                    aria-label="Like"
                                    _hover={{ bg: "transparent" }}
                                    _active={{ bg: "transparent" }}
                                    onClick={() => handleFeedback(chat.id, 0)}
                                />

                                {/* Dislike Button */}
                                <IconButton
                                    size="sm"
                                    bg="transparent"
                                    icon={
                                        feedbackMap[chat.id] === 1 ? (
                                            <FaThumbsDown color="#E53E3E" />
                                        ) : (
                                            <FaRegThumbsDown color="gray" />
                                        )
                                    }
                                    variant="ghost"
                                    aria-label="Dislike"
                                    _hover={{ bg: "transparent" }}
                                    _active={{ bg: "transparent" }}
                                    onClick={() => handleFeedback(chat.id, 1)}
                                />
                            </HStack>
                        )
                        }
                    </>
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



            <Flex bg={'#fff'} color={'black'} h={'150px'} w={{ md: '70%', base: '90%' }} border={"1px solid #BABABA"} borderRadius="20px" mb="15px" zIndex="20" flexDirection="column-reverse" >
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
            <Tooltip label="Report an issue" aria-label='A tooltip'>
                <Box position={"absolute"} display={"flex"} bottom={{ md: "100px", base: "140px" }} right={{ md: "50px", base: "10px" }} >
                    <Popover closeOnBlur={false} placement={"top"} initialFocusRef={initRef} >
                        {({ isOpen, onClose }) => (
                            <>
                                <PopoverTrigger>

                                    <Box bgColor="#ED3438" w="60px" h="60px"
                                        boxShadow='dark-lg'
                                        cursor={"pointer"}
                                        _hover={{ boxShadow: "inner" }}
                                        borderRadius="100%"
                                        onClick={() => isOpen ? 'close' : 'open'}
                                        display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <GoReport color="white" size={30} />
                                    </Box>
                                </PopoverTrigger>
                                <Portal >
                                    <PopoverContent border={"none"} color="white" >
                                        <PopoverHeader color={"black"}
                                            bgColor="#F5F5F5" border={"none"}
                                        >Report an issue</PopoverHeader>
                                        <PopoverCloseButton />
                                        <PopoverBody bgColor="#F5F5F5">
                                            <Box>
                                                <Textarea placeholder='Describe the issue'
                                                    value={reportData} onChange={(e) => setReportData(e.target.value)}
                                                    onKeyDown={(event) => {
                                                        if (event.key === "Enter" && !event.shiftKey) {
                                                            event.preventDefault();
                                                            if (reportData.trim() !== "") {
                                                                handleReport(reportData);
                                                                onClose();
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Box>
                                            <Box display={"flex"} justifyContent={"flex-end"}>
                                                <Button
                                                    mt={4}
                                                    colorScheme='blue'
                                                    onClick={() => { handleReport(reportData), onClose() }}
                                                    ref={initRef}
                                                >
                                                    Send
                                                </Button>
                                            </Box>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </>
                        )}
                    </Popover>

                </Box>
            </Tooltip>
        </Flex>

    );
};

export default MainPageTharmax;