import {
  Box,
  Button,
  Code,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Switch,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Template = () => {
  const [nodes, setNodes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [withDocumentation, setWithDocumentation] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { username, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/template/getbyid?id=${id}`);
      const result = await res.json();
      const nodeList = typeof result.data.node === "string" ? JSON.parse(result.data.node) : result.data.node;
      setNodes(nodeList);
      setCurrentIndex(0);
      setMessages([]);
      setUserInput("");
    };
    fetchData();
  }, [id]);

  const handleAnswer = (optionKey, label) => {
    const currentNode = nodes[currentIndex];
    const question = currentNode?.data?.label || "";
    setMessages((prev) => [
      ...prev,
      { type: "question", text: question },
      { type: "answer", text: label }
    ]);


    fetch(`${import.meta.env.VITE_BACKEND_URL}/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: "frontend", message: optionKey, flow_id: id })
    });

    setUserInput("");
    setCurrentIndex((prev) => prev + 1);
  };

  const renderNode = () => {
    if (!nodes.length || currentIndex >= nodes.length) {
      return (
        <Box>
          {/* <Heading size="md">✅ Chat Complete</Heading> */}
          {/* <Code mt={2} whiteSpace="pre-wrap">{JSON.stringify(messages, null, 2)}</Code> */}
        </Box>
      );
    }

    const node = nodes[currentIndex];
    const { type, data } = node;
    // console.log(node);

    return (
      <Box
        p={4}
        w="100%"
        maxW={{ base: "100%", md: "90%" }}
        mx="auto"
        maxH={type === "ReplyButton" || type === "ListButton" ? "150px" : "auto"}
        overflowY={type === "ReplyButton" || type === "ListButton" ? "auto" : "visible"}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg="gray.50"
      >
        <Text fontWeight="bold" mb={4}>🤖 {data.label}</Text>

        {(type === "ReplyButton" || type === "ListButton") && data.targetValues?.length ? (
          <VStack align="stretch" spacing={3}>
            {data.targetValues.map((label, index) => (
              <Button
                key={index}
                colorScheme="teal"
                variant="outline"
                onClick={() => handleAnswer(label, label)}
              >
                {label}
              </Button>
            ))}
          </VStack>
        ) : (
         

          <Stack direction={{ base: "column", sm: "row" }} spacing={4} mt={4}>
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && userInput.trim()) {
                  handleAnswer(userInput, userInput);
                }
              }}
              placeholder="Type your answer..."
              bg="white"
            />
            <Button
              colorScheme="teal"
              onClick={() => handleAnswer(userInput, userInput)}
              isDisabled={!userInput}
            >
              Submit
            </Button>
          </Stack>

        )}
      </Box>
    );

    // return (

    //   <Box
    //     p={4}
    //     w="100%"
    //     maxW={{ base: "100%", md: "90%" }}
    //     mx={'auto'}

    //     maxH="100px"
    //     overflowY="auto"
    //     borderWidth="1px"
    //     borderRadius="md"
    //     boxShadow="md"
    //     bg="gray.50"
    //   >

    //     <Text fontWeight="bold" mb={4}>🤖 {data.label}</Text>
    //     {(type === "ReplyButton" || type === "ListButton") && data.targetValues?.length ? (
    //       <VStack align="stretch" spacing={3}>
    //         {data.targetValues.map((label, index) => (
    //           <Button
    //             key={index}
    //             colorScheme="teal"
    //             variant="outline"
    //             onClick={() => handleAnswer(label, label)}
    //           >
    //             {label}
    //           </Button>
    //         ))}
    //       </VStack>
    //     ) : (
    //       <Stack direction={{ base: "column", sm: "row" }} spacing={4} mt={4} >
    //         <Input

    //           value={userInput}
    //           onChange={(e) => setUserInput(e.target.value)}
    //           placeholder="Type your answer..."
    //           bg="white"
    //         />
    //         <Button
    //           colorScheme="teal"
    //           onClick={() => handleAnswer(userInput, userInput)}
    //           isDisabled={!userInput}
    //         >
    //           Submit
    //         </Button>
    //       </Stack>
    //     )}
    //   </Box>
    // );
  };

  const renderChatHistory = () => (
    <VStack
      spacing={3}
      align="stretch"
      height="100%"
      maxHeight="calc(100vh - 244px)"
      overflowY="scroll"
      w="100%"
      maxW={{ base: "100%", md: "90%" }}
      mx="auto"
      sx={{
        /* Hide scrollbar but allow scroll */
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {messages.map((msg, index) => (
        <Box
          key={index}
          alignSelf={msg.type === "answer" ? "flex-end" : "flex-start"}
          bg={msg.type === "answer" ? "teal.100" : "gray.200"}
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
    <Box
      minHeight="100vh"
      overflowY="auto"
      bgColor=" #1A202C"
      display="flex"
      flexDirection={'column'}
      justifyContent={'space-between'}
    >
      {/* Header */}
      <Box
        bg="#171923"
        height="90px"
        width="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Menu>
          <HStack spacing={3} pr="10px">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FaUser />}
              variant="outline"
              bgColor="#1A202C"
              color="white"
              border="none"
            />
            <Text color="white" mr="10px">
              {username}
            </Text>
          </HStack>

          <MenuList bgColor="#171923" border="none">
            <Box px={4} py={2} _hover={{ bg: "#2D3748" }} cursor="pointer">
              <FormControl display="flex" alignItems="center" color="white">
                <FormLabel mb="0">
                  {withDocumentation ? "With Documentation" : "Without Documentation"}
                </FormLabel>
                <Switch
                  isChecked={withDocumentation}
                  onChange={(e) => setWithDocumentation(e.target.checked)}
                />
              </FormControl>
            </Box>
            <MenuItem
              icon={<IoLogOut size={19} />}
              onClick={() => {
                logout();
                navigate("/");
              }}
              bgColor="#171923"
              color="white"
            >
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Box px={{ base: 4, md: 6 }} py={4} >
        <VStack spacing={4} align="stretch" >
          {renderChatHistory()}
          {renderNode()}
        </VStack>
      </Box>

    </Box>
  )
};

export default Template;
