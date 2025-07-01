import { AddIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Code, Flex, FormControl, FormLabel, Heading, HStack, Icon, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Stack, Switch, Text, Textarea, Tooltip, useDisclosure, VStack } from "@chakra-ui/react";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { VscSend } from "react-icons/vsc";
import { useToast } from "@chakra-ui/react";
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { GoReport } from "react-icons/go";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const APP_URL = import.meta.env.VITE_BACKEND_URL
const BOT_URL = import.meta.env.VITE_BOT_API_URL

const Template = () => {
    const [value, setValue] = useState("");
    const [allchats, setAllchats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState("");
    const [withDocumentation, setWithDocumentation] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const bottomRef = useRef(null);
    const initRef = React.useRef();
    const { username, logout, } = useContext(AppContext);

    const navigate = useNavigate();
    const MotionBox = motion(Box);

    let { id } = useParams();
    const { userid } = useParams();

    const toast = useToast();

  const [nodes, setNodes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showInput, setShowInput] = useState(true);
    const [messages, setMessages] = useState([]); 


    const handleAnswer = (answer) => {
  const currentNode = nodes[currentIndex];
  const question = currentNode?.data?.label || '';

  setMessages((prev) => [
    ...prev,
    { type: 'question', text: question },
    { type: 'answer', text: answer }
  ]);

  setUserInput('');
  setCurrentIndex((prev) => prev + 1);
};

    const handleLogout = () => {
        logout();
        navigate("/");
    };

   

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allchats]);


     useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/template/getbyid?id=${id}`
      );
      const result = await response.json();
      const nodeList = typeof result.data.node === "string"
        ? JSON.parse(result.data.node)
        : result.data.node;
      setNodes(nodeList);
      setTimeout(() => setShowInput(true), 500); // show input after showing question
    };
    fetchData();
  }, [id]);
    
const renderNode = () => {
  if (!nodes.length || currentIndex >= nodes.length) {
    return (
      <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
        <Heading size="md" mb={2}>✅ Chat Complete</Heading>
        <Code p={2} whiteSpace="pre-wrap" display="block">
          {JSON.stringify(answers, null, 2)}
        </Code>
      </Box>
    );
  }

  const node = nodes[currentIndex];
  const { type, data } = node;

  if (!data?.label) return <Text>Skipping...</Text>;

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg="gray.50"
      mb={4}
    >
      <Text fontWeight="bold" mb={4}>🤖 {data.label}</Text>

      {showInput &&
        (type === "ReplyButton" || type === "ListButton") &&
        data.targetValues?.length ? (
          <VStack align="stretch" spacing={3}>
            {data.targetValues.map((option, index) => (
              <Button
                key={index}
                colorScheme="teal"
                variant="outline"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </VStack>
        ) : showInput ? (
          <Stack direction={{ base: "column", sm: "row" }} spacing={4} mt={4}>
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer..."
              bg="white"
            />
            <Button
              colorScheme="teal"
              onClick={() => handleAnswer(userInput)}
              isDisabled={!userInput}
            >
              Submit
            </Button>
          </Stack>
        ) : null}
    </Box>
  );
};

const renderChatHistory = () => (
  <VStack spacing={3} align="stretch">
    {messages.map((msg, index) => (
      <Box
        key={index}
        alignSelf={msg.type === 'answer' ? 'flex-end' : 'flex-start'}
        bg={msg.type === 'answer' ? 'teal.100' : 'gray.200'}
        px={4}
        py={2}
        borderRadius="lg"
        maxW="80%"
      >
        <Text>{msg.text}</Text>
      </Box>
    ))}
  </VStack>
);
    return (

        <Flex zIndex={1} h="100vh" bgColor="#1A202C" flexDir="column" justifyContent="space-between" alignItems={'center'} gap={4} >
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
            <Box  p={4} maxW="600px" mx="auto">

    {renderChatHistory()}
  {currentIndex < nodes.length ? renderNode() : (
    <Text mt={4} fontWeight="bold" color="green.600">✅ Chat Complete</Text>
  )}
  </Box>
        </Flex>

    );
};

export default Template;