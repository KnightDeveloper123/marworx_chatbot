import { AddIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, FormLabel, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Switch, Text, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { VscSend } from "react-icons/vsc";
import { useToast } from "@chakra-ui/react";
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { motion } from "framer-motion";
import { decrypt } from "../../utils/security";

const APP_URL = import.meta.env.VITE_BACKEND_URL
const BOT_URL = import.meta.env.VITE_BOT_API_URL

const Web = () => {
    const [value, setValue] = useState("");
    const [allchats, setAllchats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState("");
    const [withDocumentation, setWithDocumentation] = useState(false);
    const user = localStorage.getItem('user')
    const admin_id = decrypt(user).id

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const bottomRef = useRef(null);
    const initRef = React.useRef();
    const {username, fetchTemplate, template} = useContext(AppContext);
    useEffect(()=>{
    fetchTemplate(admin_id)
    },[])

    const navigate = useNavigate();
    const MotionBox = motion(Box);

    let { id } = useParams();
    const { userid } = useParams();

    const toast = useToast();

    // console.log(allchats);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const message = { message: value, sender: "user" };
    //     const updatedChats = [...allchats, message];

    //     let title_id = null;
       
    // };


    // console.log(allchats);


    // const sendResponse = async (message, sender, title_id = null) => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             console.error("No token found");
    //             return;
    //         }

    //         await axios.post(`${APP_URL}/chatbot/addChat`, {
    //             message: message,
    //             sender: sender,
    //             title_id: title_id ? title_id : id
    //         }, {
    //             headers: { Authorization: `${token}` },
    //         })
    //     } catch (error) {
    //         console.error("Error saving message:", error);
    //     }
    // }

    // const sendNewChat = async (allchats) => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         console.error("No token found");
    //         return;
    //     }
    //     try {

    //         const response = await axios.post(`${APP_URL}/chatbot/newChat`, { user_id: userid, chats: allchats }, {
    //             headers: { Authorization: `${token}` },
    //         })

    //         // await navigate(`/${userid}/${response.data.chat_id}`);
    //         return { title_id: response.data.chat_id };
    //     } catch (error) {
    //         console.error("Error saving message:", error);
    //     }
    // }

    // const getsidebardata = async (id) => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             console.error("No token found");
    //             return;
    //         }
    //         const response = await axios.get(`${APP_URL}/chatbot/getAllChats?title_id=${id}`, {
    //             headers: { Authorization: `${token}` },
    //         });
    //         setAllchats(response.data.data)
    //         console.log(response.data.data);
            

    //     } catch (error) {
    //         console.error("Error fetching data", error);
    //     }
    // }

    // const handleReport = (data) => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             console.error("No token found");
    //             return;
    //         }
    //         axios.post(`${APP_URL}/support/addQuery`, { query: data, user_id: userid }, {
    //             headers: { Authorization: `${token}` },
    //         }).then((res) => {
    //             toast({
    //                 title: "Success",
    //                 description: res.data.success,
    //                 status: "success",
    //                 duration: 5000,
    //                 position: "top",
    //                 isClosable: true,
    //             })
    //             setReportData("");
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     } catch (error) {
    //         console.error("Error saving message:", error);
    //         toast({
    //             title: "Error",
    //             description: error.message,
    //             status: "error",
    //             duration: 5000,
    //             position: "top",
    //             isClosable: true,
    //         })
    //     }
    // }

    // const handleLogout = () => {
    //     logout();
    //     navigate("/");
    // };

   

//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [allchats]);

//     const [feedbackMap, setFeedbackMap] = useState({});

//     const handleLike = async (chatId) => {
//         const newStatus = feedbackMap[chatId] === 0 ? null : 0;
//         setFeedbackMap(prev => ({ ...prev, [chatId]: newStatus }));
//         await sendFeedback(chatId, newStatus);
//     };

//     const handleDislike = async (chatId) => {
//         const newStatus = feedbackMap[chatId] === 1 ? null : 1;
//         setFeedbackMap(prev => ({ ...prev, [chatId]: newStatus }));
//         await sendFeedback(chatId, newStatus);
//     };
//     // console.log(feedbackMap);


//     const sendFeedback = async (chatId, feedback) => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             console.error("No token found");
//             return;
//         }
//         try {
//             const response = await axios.post(`${APP_URL}/chatbot/likeChat`, {
//                 chat_id: chatId,
//                 user_id: userid,
//                 feedback: feedback
//             },
//                 { headers: { Authorization: `${token}` } });
//             console.log(response.data);

//         } catch (error) {
//             console.error("Error submitting feedback:", error.response?.data || error.message);
//         }
//     };
// //  console.log(allchats);
//   useEffect(() => {

//         getsidebardata(id);

//     }, [id]);
console.log(template)
    return (

        <Flex zIndex={1} h="100vh" bgColor="white" flexDir="column" justifyContent="space-between" alignItems={'center'} gap={4} >
            {/* <Flex bg={'#171923'} h={'90px'} w={'100%'} >
                <Flex bg={'#171923'} w={'100%'} justifyContent={'flex-end'} alignItems={'center'}>
                    <Menu >
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<FaUser />}
                            variant='outline'
                            mr={'10px'}
                            bgColor={"white"}
                            color="white"
                            border={'none'}
                            _hover={"none"}

                        />
                        <Text color={'white'} mr={'20px'}> {username}</Text>
                        <MenuList bgColor={"#171923"} border={'none'}>
                            <Box px={4} py={2} _hover={{ bg: "#2D3748" }} cursor="pointer">
                                <FormControl display='flex' alignItems='center' color={'white'}>
                                    <FormLabel htmlFor='email-alerts' mb='0'>
                                        {withDocumentation ? "With Documentation" : "Without Documentation"}
                                    </FormLabel>
                                    <Switch
                                        id='email-alerts'
                                        isChecked={withDocumentation}
                                        onChange={(e) => {
                                            e.stopPropagation(); // stop menu from closing
                                            setWithDocumentation(e.target.checked);
                                        }}
                                    />
                                </FormControl>
                            </Box>
                          
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
            </Flex> */}



            {/* <Button
                zIndex={1}
                onClick={() => { navigate(`/${userid}`); }}
                alignSelf={'flex-start'} colorScheme='white'><AddIcon mr={'7px'} /> New Chat
            </Button> */}

            <Flex
                bg={"white"}
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

                {template.map((chat, index) => (
                    <>
                   
                    <Box
                            key={index}
                            // alignSelf={chat.sender === "user" ? "flex-end" : "flex-start"}
                            // bg={chat.sender === "user" ? "#4A90E2" : "#171923"}
                            color="white"
                            borderRadius="20px"
                            p="10px"
                            maxW="60%"
                            my="8px"
                            boxShadow="md">
                                 {console.log(chat.industry)}
{chat.industry}
                            {/* { index === template.length - 1 ? (
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
                                </Box>
                            )} */}



                        </Box>

                        {/* {chat.sender === "bot" && (
                            <HStack spacing={1}>
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
                                    onClick={() => handleLike(chat.id)}
                                />
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
                                    onClick={() => handleDislike(chat.id)}
                                />
                            </HStack>
                        )
                        } */}
                    </>
                )
                )}



{/* 
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
                )} */}

                <div ref={bottomRef}></div>
            </Flex>



            <Flex bg={'#2D3748'} color={'white'} h={'150px'} w={{ md: '70%', base: '90%' }} borderRadius="20px" mb="15px" zIndex="20" flexDirection="column-reverse" >
                {/* <Flex justifyContent="flex-end">
                    {value.length > 0 ? <Button w="40px" h="40px" color={"white"} bg="#171923" borderRadius="100%" m="5px"
                        _hover={{ bg: "#4A90E2" }}
                        onClick={handleSubmit}>

                        <Icon as={VscSend} boxSize={4} />

                    </Button> : " "}

                </Flex> */}
                <Textarea
                    placeholder="Ask Anything"
                    size="sm"
                    border={"none"}
                    resize="vertical"
                    borderRadius="20px"
                    _focus={{ outline: "none", boxShadow: "none", borderColor: "transparent" }}
                    overflowY="auto"
                    // onChange={(e) => setValue(e.target.value)}
                    // value={value}
                    // onKeyDown={(event) => {
                    //     if (event.key === "Enter" && !event.shiftKey) {
                    //         event.preventDefault();
                    //         if (value.trim() !== "") {
                    //             handleSubmit(event);
                    //         }
                    //     }
                    // }}
                    sx={{
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        "-ms-overflow-style": "nsetValueone",
                        "scrollbar-width": "none",
                    }}
                />
            </Flex>
            {/* <Tooltip label="Report an issue" aria-label='A tooltip'>
                <Box position={"absolute"} display={"flex"} bottom={{ md: "100px", base: "140px" }} right={{ md: "50px", base: "10px" }} >
                    <Popover closeOnBlur={false} placement={"top"} initialFocusRef={initRef} >
                        {({ isOpen, onClose }) => (
                            <>
                                <PopoverTrigger>

                                    <Box bgColor="#171923" w="60px" h="60px"
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
                                        <PopoverHeader
                                            bgColor="#2D3748" border={"none"}
                                        >Report an issue</PopoverHeader>
                                        <PopoverCloseButton />
                                        <PopoverBody bgColor="#2D3748">
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
            </Tooltip> */}
        </Flex>

    );
};

export default Web;