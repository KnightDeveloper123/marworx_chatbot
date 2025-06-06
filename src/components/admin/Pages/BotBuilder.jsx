import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaImage, FaRegFileVideo } from "react-icons/fa";
import { FcBusinessman, FcPhoneAndroid } from "react-icons/fc";
import { GoQuestion } from "react-icons/go";
import { TfiEmail } from "react-icons/tfi";
import { TiArrowShuffle } from "react-icons/ti";
import { LuReply } from "react-icons/lu";
import { IoIosListBox } from "react-icons/io";
import { SiGooglesheets } from "react-icons/si";
import { LuPlus } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { LiaTrashAlt } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { decrypt } from "../../utils/security";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { IoTrashOutline } from "react-icons/io5";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { normalizePhoneNumber } from '../../../utils/normalizePhoneNumber.js'
// Utility for node ID generation
let id = 1;
const getId = () => `${++id}`;

// Node types map
const nodeTypes = {
  Custom: ({ id, data }) => {
    const [value, setValue] = useState(data.label || null);
    const { setNodes } = useReactFlow();

    useEffect(() => {
      const timer = setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, label: value } }
              : node
          )
        );
      }, 500);

      return () => clearTimeout(timer);
    }, [value, id, setNodes]);
    return (
      <Box bg="white" borderRadius={"15px"}>
        <Handle type="target" position="right" style={{ background: "#555" }} />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text..."
          fontSize="8px"
          border="none"
          resize="none"
          size="xs"
          _focusVisible={{ borderColor: "none", boxShadow: "none" }}
        // px={2}
        // py={1}
        />

        <Handle
          type="source"
          position="bottom"
          style={{ background: "#555" }}
        />
      </Box>
    );
  },

  CustomNode: ({ id, data }) => {
    const [value, setValue] = useState(data.label || null);
    const { setNodes } = useReactFlow();

    useEffect(() => {
      const timer = setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, label: value } }
              : node
          )
        );
      }, 500);

      return () => clearTimeout(timer);
    }, [value, id, setNodes]);

    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };

    return (
      <Box bg="white" borderRadius={"15px"}>
        <Handle type="target" position="left" style={{ background: "#555" }} />
        <Box
          bg="blue.500"
          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px">Question</Text>
            <IconButton
              size="xs"
              variant="ghost"
              colorScheme="white"
              icon={<IoTrashOutline />}
              onClick={handleDelete}
              aria-label="Delete Node"
            />
          </Flex>
        </Box>

        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text..."
          fontSize="8px"
          border="none"
          resize="none"
          size="xs"
          rows="1"
          _focusVisible={{ borderColor: "none", boxShadow: "none" }}
        // px={2}
        // py={1}
        />

        <Handle
          type="source"
          position="bottom"
          style={{ background: "#555" }}
        />
      </Box>
    );
  },

  CustomText: ({ id, data }) => {
    const [value, setValue] = useState(data.label || null);
    const { setNodes } = useReactFlow();

    useEffect(() => {
      const timer = setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, label: value } }
              : node
          )
        );
      }, 500);

      return () => clearTimeout(timer);
    }, [value, id, setNodes]);

    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };

    return (
      <Box bg="white" borderRadius={"15px"}>
        <Handle type="target" position="left" style={{ background: "#555" }} />
        <Box
          bg="blue.500"
          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold">
              Message
            </Text>
            <IconButton
              size="xs"
              variant="ghost"
              colorScheme="white"
              icon={<IoTrashOutline />}
              onClick={handleDelete}
              aria-label="Delete Node"
            />
          </Flex>
        </Box>

        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text..."
          fontSize="8px"
          border="none"
          resize="none"
          size="sm"
          rows="2"
          _focusVisible={{ borderColor: "none", boxShadow: "none" }}
        // px={2}
        // py={1}
        />

        <Handle
          type="source"
          position="bottom"
          style={{ background: "#555" }}
        />
      </Box>
    );
  },

  imageNode: ({ id, data }) => {
    const [image, setImage] = useState(data.image || null);
    const { setNodes } = useReactFlow(); // ✅ FIXED: access setNodes properly
    const [fileName, setFileName] = useState(data.fileName || "");
    const [fileUrl, setFileUrl] = useState(data.fileUrl || "");

    console.log(fileUrl);
    console.log(fileName);

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        setFileName(file.name);
        setFileUrl(URL.createObjectURL(file));
        setImage(URL.createObjectURL(file));
      } else {
        alert("Only JPG and PNG files are allowed");
      }
    };

    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };

    useEffect(() => {
      if (fileUrl) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id
              ? {
                ...node,
                data: {
                  ...node.data,
                  fileName,
                  fileUrl,
                },
              }
              : node
          )
        );
      }
    }, [fileUrl]);

    return (
      <Box bg="white" borderRadius={"15px"}>
        <Handle type="target" position="left" style={{ background: "#555" }} />
        <Box
          bg="blue.500"
          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold">
              Image
            </Text>
            <IconButton
              size="xs"
              variant="ghost"
              colorScheme="white"
              icon={<IoTrashOutline />}
              onClick={handleDelete}
              aria-label="Delete Node"
            />
          </Flex>
        </Box>
        <Divider />
        <Input
          fontSize="8px"
          fontWeight="var(--big-font-weight)"
          border={"none"}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          size="sm"
        />
        <Box position="relative" top="0px">
          {image && (
            <Image src={image} alt="node drawing" width="189px" height="auto" />
          )}
        </Box>
        <Handle
          type="source"
          position="bottom"
          style={{ background: "#555" }}
        />
      </Box>
    );
  },

  VideoNode: ({ id, data }) => {
    const { setNodes } = useReactFlow();
    const [fileName, setFileName] = useState(data.fileName || "");
    const [fileUrl, setFileUrl] = useState(data.fileUrl || "");

    useEffect(() => {
      const timer = setTimeout(() => {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, fileName, fileUrl } }
              : node
          )
        );
      }, 500);

      return () => clearTimeout(timer);
    }, [fileName, fileUrl, id, setNodes]);
    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (file && file.type === "video/mp4") {
        // Step 1: Set local preview
        setFileName(file.name);
        setFileUrl(URL.createObjectURL(file));

        // Step 2: Upload to server (example)
        const formData = new FormData();
        formData.append("video", file);
        const res = await fetch("/upload", { method: "POST", body: formData });
        const data = await res.json();

        // data.url should contain the uploaded video URL
        setFileUrl(data.url);
      } else {
        alert("Please upload a valid .mp4 video file.");
      }
    };

    return (
      <Box bg="white" borderRadius={"15px"}>
        <Handle type="target" position="left" style={{ background: "#555" }} />
        <Box
          bg="blue.500"
          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold">
              Video
            </Text>
            <IconButton
              size="xs"
              variant="ghost"
              colorScheme="white"
              icon={<IoTrashOutline />}
              onClick={handleDelete}
              aria-label="Delete Node"
            />
          </Flex>
        </Box>
        <Divider />
        <Input
          fontSize="8px"
          fontWeight="var(--big-font-weight)"
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          style={{ marginTop: 4 }}
          size={"sm"}
        />
        {fileUrl && (
          <video
            src={fileUrl}
            controls
            style={{ width: "189px", height: "auto" }}
          />
        )}
        {/* {fileName && (
          <p style={{ fontSize: 12, marginTop: 3, color: '#eb2f96' }}>
            {fileName}
          </p>
        )} */}
        <Handle
          type="source"
          position="bottom"
          style={{ background: "#555" }}
        />
      </Box>
    );
  },

  GoogleSheetsNode: ({ id, data }) => {
    const [file, setFile] = useState(data.file || null);
    const { setNodes } = useReactFlow();

    useEffect(() => {
      const timer = setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id ? { ...node, data: { ...node.data, file } } : node
          )
        );
      }, 500);

      return () => clearTimeout(timer);
    }, [file, id, setNodes]);

    const handleFileChange = (e) => {
      const uploadedFile = e.target.files[0];
      if (uploadedFile) {
        setFile(uploadedFile.name);
      }
    };
    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };
    return (
      <Box bg="white" borderRadius={"4px"}>
        <Handle type="target" position="left" style={{ background: "#555" }} />
        <Box
          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold">
              GoogleSheet
            </Text>
            <IconButton
              size="xs"
              variant="ghost"
              colorScheme="white"
              icon={<IoTrashOutline />}
              onClick={handleDelete}
              aria-label="Delete Node"
            />
          </Flex>
        </Box>
        <Divider />
        <Input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          fontSize="var( --text-12px)"
          fontWeight="var(--big-font-weight)"
          size="sm"
        />
        {file && <p>📄 {file}</p>}
        <Handle
          type="source"
          position="bottom"
          style={{ background: "#555" }}
        />
      </Box>
    );
  },

   ListButton : ({ id, data }) => {
  const { setNodes } = useReactFlow();
  const [question, setQuestion] = useState(data.label || "List Button");
  const [targetValues, setTargetValues] = useState(data.targetValues || []);

  // Sync node data with React Flow state
  useEffect(() => {
    const timer = setTimeout(() => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: question,
                  targetValues: targetValues,
                },
              }
            : node
        )
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [question, targetValues, id, setNodes]);

  const handleDelete = () => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const addTargetValue = () => {
    setTargetValues((prev) => [...prev, ""]);
  };

  const updateTargetValue = (index, newValue) => {
    setTargetValues((prev) =>
      prev.map((val, i) => (i === index ? newValue : val))
    );
  };

  return (
    <Box bg="white" borderRadius="md" w="170px" boxShadow="md">
      <Handle type="target" position="left" style={{ background: "#555" }} />

      <Box bg="blue.500" color="white" px={2} py={1} borderTopRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="10px" fontWeight="bold">
            {question}
          </Text>
          <IconButton
            size="xs"
            variant="ghost"
            colorScheme="whiteAlpha"
            icon={<IoTrashOutline />}
            onClick={handleDelete}
            aria-label="Delete Node"
          />
        </Flex>
      </Box>

      <Box px={2} py={1}>
        <Input
          placeholder="List title"
          size="xs"
          fontSize="10px"
          mb={2}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {targetValues.map((val, idx) => (
          <Flex key={idx} alignItems="center" mb={1} position="relative">
            <Input
              value={val}
              onChange={(e) => updateTargetValue(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              size="xs"
              fontSize="10px"
              pr="20px"
            />
            <Handle
              type="source"
              position="right"
              id={`option-${idx}`}
              style={{ background: "#555" }}
            />
          </Flex>
        ))}

        <Button
          onClick={addTargetValue}
          size="xs"
          fontSize="10px"
          width="100%"
          mt={2}
          variant="outline"
          colorScheme="blue"
        >
          + Add Option
        </Button>
      </Box>
    </Box>
  );
},
  // ListButton: ({ id, data }) => {
  //   const { setNodes } = useReactFlow();
  //   const [question, setQuestion] = useState(data.label || "");
  //   const [targetValues, setTargetValues] = useState(data.targetValues || []);

  //   // Sync data back to nodes
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setNodes((nds) =>
  //         nds.map((node) =>
  //           node.id === id
  //             ? {
  //               ...node,
  //               data: {
  //                 ...node.data,
  //                 label: question,
  //                 targetValues: targetValues,
  //               },
  //             }
  //             : node
  //         )
  //       );
  //     }, 300);
  //     return () => clearTimeout(timer);
  //   }, [question, targetValues, id, setNodes]);

  //   const handleDelete = () => {
  //     setNodes((nds) => nds.filter((node) => node.id !== id));
  //   };

  //   const addTargetValue = () => {
  //     setTargetValues((prev) => [...prev, ""]);
  //   };

  //   const updateTargetValue = (index, newValue) => {
  //     setTargetValues((prev) =>
  //       prev.map((val, i) => (i === index ? newValue : val))
  //     );
  //   };

  //   return (
  //     <Box bg="white" borderRadius="5px" w="150px">
  //       <Handle type="target" position="left" style={{ background: "#555" }} />

  //       {/* Header */}
  //       <Box
  //         color="white"
  //         p={0.5}
  //         borderRadius={"5px"}
  //         bgColor="var(--active-bg)"
  //       >
  //         <Flex justifyContent="space-between" alignItems="center">
  //           <Text fontSize="10px" fontWeight="bold">
  //             List Button
  //           </Text>
  //           <IconButton
  //             size="xs"
  //             variant="ghost"
  //             colorScheme="whiteAlpha"
  //             icon={<IoTrashOutline />}
  //             onClick={handleDelete}
  //             aria-label="Delete Node"
  //           />
  //         </Flex>
  //       </Box>
  //       {/* Target values */}

  //       {targetValues.map((val, idx) => (
  //         <Flex
  //           key={idx}
  //           position="relative"
  //           borderRadius="md"
  //           px={2}
  //           py={1}
  //           mb={1}
  //           fontSize="10px"
  //           alignItems="center"
  //         >
  //           <Input
  //             key={idx}
  //             value={val}
  //             onChange={(e) => updateTargetValue(idx, e.target.value)}
  //             placeholder={`Option ${idx + 1}`}
  //             size="xs"
  //             fontSize="10px"
  //             mb={1}
  //           />

  //           <Handle
  //             type="source"
  //             position="right"
  //             id={`option-${idx}`}
  //             style={{ background: "#555" }}
  //           />
  //         </Flex>
  //       ))}




  //       <Button
  //         onClick={addTargetValue}
  //         size="xs"
  //         fontSize="10px"
  //         width="100%"
  //         mt={1}
  //         variant="outline"
  //         colorScheme="blue"
  //       >
  //         + Add Option
  //       </Button>
  //     </Box>
  //   );
  // },
  ReplyButton: ({ id, data }) => {
    const { setNodes } = useReactFlow();
    const [question, setQuestion] = useState(data.label || "");
    const [targetValues, setTargetValues] = useState(data.targetValues || []);

    // Sync data back to nodes
    useEffect(() => {
      const timer = setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id
              ? {
                ...node,
                data: {
                  ...node.data,
                  label: question,
                  targetValues: targetValues,
                },
              }
              : node
          )
        );
      }, 300);
      return () => clearTimeout(timer);
    }, [question, targetValues, id, setNodes]);

    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };

    const addTargetValue = () => {
      setTargetValues((prev) => [...prev, ""]);
    };

    const updateTargetValue = (index, newValue) => {
      setTargetValues((prev) =>
        prev.map((val, i) => (i === index ? newValue : val))
      );
    };

    return (
      <Box bg="white" borderRadius="5px" w="150px">
        <Handle type="target" position="left" style={{ background: "#555" }} />

        {/* Header */}
        <Box
          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold">
              Reply Button
            </Text>
            <IconButton
              size="xs"
              variant="ghost"
              colorScheme="whiteAlpha"
              icon={<IoTrashOutline />}
              onClick={handleDelete}
              aria-label="Delete Node"
            />
          </Flex>
        </Box>
        {/* Target values */}

        {targetValues.map((val, idx) => (
          <Flex
            key={idx}
            position="relative"
            borderRadius="md"
            px={2}
            py={1}
            fontSize="10px"
            alignItems="center"
          >
            <Input
              key={idx}
              value={val}
              onChange={(e) => updateTargetValue(idx, e.target.value)}
              placeholder={`button`}
              size="xs"
              fontSize="10px"
            // mb={1}
            />

            <Handle
              type="source"
              position="right"
              id={`option-${idx}`}
              style={{ background: "#555" }}
            />
          </Flex>
        ))}

        <Button
          onClick={addTargetValue}
          size="xs"
          fontSize="10px"
          width="100%"
          mt={1}
          variant="outline"
          colorScheme="blue"
        >
          + Add Option
        </Button>
      </Box>
    );
  },
};

const blockStyle = {
  padding: "3px 5px",
  margin: "0px 0",
  borderRadius: 6,
  cursor: "grab",
  // background: "#f7f7f7",
  display: "flex",
  alignItems: "center",
};

// Side Panel
const SidePanel = () => {
  const { isOpen: isBoxOpen, onToggle } = useDisclosure();

  const messages = [
    {
      label: "Message",
      type: "CustomText",
      icon: <Icon as={AiOutlineMessage} mr={2} />,
    },
    { label: "Image", type: "imageNode", icon: <Icon as={FaImage} mr={2} /> },
  ];

  const QuestionsBlock = [
    {
      label: "What is your name?",
      type: "CustomNode",
      icon: <Icon as={FcBusinessman} mr={2} />,
    },
    {
      label: "Ask a Question?",
      type: "CustomNode",
      icon: <Icon as={GoQuestion} mr={2} />,
    },
    {
      label: "Ask for an email?",
      type: "CustomNode",
      icon: <Icon as={TfiEmail} mr={2} />,
    },
    {
      label: "Ask for Phone number?",
      type: "CustomNode",
      icon: <Icon as={FcPhoneAndroid} mr={2} />,
    },
  ];

  // const logicBlocks = [
  //   {
  //     label: 'Condition',
  //     type: 'CustomNode',
  //     icon: <Icon as={TiArrowShuffle} mr={2} />
  //   }
  // ]

  const WhatsAppEssential = [
    {
      label: "Reply Buttons",
      type: "ReplyButton",
      icon: <Icon as={LuReply} mr={2} />,
    },
    {
      label: "List Buttons",
      type: "ListButton",
      icon: <Icon as={IoIosListBox} mr={2} />,
    },
  ];

  const integrations = [
    {
      label: "Google Sheets",
      type: "GoogleSheetsNode",
      icon: <Icon as={SiGooglesheets} mr={2} />,
    },
    {
      label: "Video",
      type: "VideoNode",
      icon: <Icon as={FaRegFileVideo} mr={2} />,
    },
  ];

  const handleDragStart = (e, block) => {
    const payload = JSON.stringify({ label: block.label, type: block.type });
    e.dataTransfer.setData("application/reactflow", payload);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<LuPlus fontSize={"27px"} />}
          bgColor="var(--active-bg)"
          _hover={{ bgColor: "var(--active-bg)" }}
          _focus={{ bgColor: "var(--active-bg)" }}
          _active={{ bgColor: "var(--active-bg)" }}
          variant="outline"
          color={"white"}
          borderRadius="40px"
        ></MenuButton>
        <MenuList px={4} py={2}>
          {/* Questions Toggle */}
          <Box
            onClick={onToggle}
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="15px" fontWeight="bold">
              Questions
            </Text>
            {isBoxOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Box>

          <Collapse in={isBoxOpen} animateOpacity>
            <Box mt={2}>
              {QuestionsBlock.map((block) => (
                <Box
                  fontSize="15px"
                  fontWeight="500"
                  key={block.label}
                  style={blockStyle}
                  draggable
                  onDragStart={(e) => handleDragStart(e, block)}
                >
                  {block.icon} {block.label}
                </Box>
              ))}
            </Box>
          </Collapse>

          {/* Messages */}
          <Box mt={3}>
            <Text fontSize="15px" fontWeight="bold">
              Messages
            </Text>
            {messages.map((block) => (
              <Box
                fontSize="15px"
                fontWeight="500"
                key={block.label}
                style={blockStyle}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
              >
                {block.icon} {block.label}
              </Box>
            ))}
          </Box>

          {/* WhatsApp Essentials */}
          <Box mt={3}>
            <Text fontSize="15px" fontWeight="bold">
              WhatsApp Essential
            </Text>
            {WhatsAppEssential.map((block) => (
              <Box
                fontSize="15px"
                fontWeight="500"
                key={block.label}
                style={blockStyle}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
              >
                {block.icon} {block.label}
              </Box>
            ))}
          </Box>

          {/* Logic */}
          {/* <Box mt={3}>
            <Text fontSize='15px' fontWeight='bold'>
              Logic
            </Text>
            {logicBlocks.map(block => (
              <Box
                fontSize='15px'
                fontWeight='500'
                key={block.label}
                style={blockStyle}
                draggable
                onDragStart={e => handleDragStart(e, block)}
              >
                {block.icon} {block.label}
              </Box>
            ))}
          </Box> */}

          {/* Integrations */}
          <Box mt={3}>
            <Text fontSize="15px" fontWeight="bold">
              Integrations
            </Text>
            {integrations.map((block) => (
              <Box
                fontSize="15px"
                fontWeight="500"
                key={block.label}
                style={blockStyle}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
              >
                {block.icon} {block.label}
              </Box>
            ))}
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};

// Flow Canvas
const FlowCanvas = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { phoneNumbers, getAllNumbers } = useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isNumOpen,
    onOpen: onNumOpen,
    onClose: onNumClose,
  } = useDisclosure();
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "Custom",
      data: { label: "Starting point" },
      position: { x: 100, y: 150 },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
    [setEdges]
  );
  // console.log(nodes);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const rawData = event.dataTransfer.getData("application/reactflow");
      if (!rawData) return;

      const block = JSON.parse(rawData);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: block.type,
        position,
        data: { label: block.label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, screenToFlowPosition]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const botType = localStorage.getItem("botType");
  const sectorId = localStorage.getItem("sectorId");
  const user = localStorage.getItem("user");
  const admin_id = decrypt(user).id;
  // console.log(admin_id)

  // const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const deleteNumber = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/delete_number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      })

      const result = await response.json();
      // console.log(result);
      getAllNumbers();
    } catch (error) {
      console.log(error)
    }

  }



  // save on database
  const saveFlow = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bots/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: token
          },
          body: JSON.stringify({
            flowName: "New Bot",
            nodes,
            edges,
            sector_id: sectorId,
            bot_type: botType,
            admin_id,
          }),
        }
      );

      const data = await response.json();
      // console.log('save sucessfully')
      navigate("/home/bot");
    } catch (error) {
      console.log(error);
      // showAlert("Failed to add Campaign", "error");
    }
  };


  const savePhoneNumber = async () => {
    const normalizedNumber = normalizePhoneNumber(newNumber);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/save_number`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: normalizedNumber
        })
      })
      const data = await response.json();
      console.log("numbers", data)
      setNewNumber('')
      onNumClose();
      getAllNumbers();
    } catch (error) {
      console.log(error)
    }
  }



  const saveFlowNumber = async () => {
    
    if (selectedNumbers.length === 0) {
      alert("Please select at least one number to send test.");
      return;
    }
    console.log("number",selectedNumbers)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bots/addwithwhatsup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            flowName: "New Bot",
            nodes,
            edges,
            sector_id: sectorId,
            bot_type: botType,
            admin_id,
            to: selectedNumbers,
          
          }),
        }
      );

      const data = await response.json();
      // console.log("data",data.flowId)

      if (response.ok && data.flowId ) {
     
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/bots/track-user-bot`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              botId:data.flowId,
              admin_id
            })
          })
        const result = await res.json();
        console.log("result", result)
      }


      navigate("/home/bot");

    } catch (error) {
      console.log(" Error:", error);
    }
  };


  useEffect(() => {
    getAllNumbers();
  }, [])


  return (
    <Box flex={1} height="100vh" display="flex" flexDirection="column" p="5px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="10px"
        px={4}
      >
        <SidePanel />
        <Flex justifyContent={"flex-end"} gap="10px">
          <Button
            onClick={() => window.history.back()}
            type="button"
            size={"sm"}
            fontSize={"13px"}
            border={"1px solid #FF5722 "}
            textColor={"#FF5722"}
            bgColor={"white"}
            _hover={{ bgColor: "white" }}
          >
            Back
          </Button>
          <Button
            borderRadius="var(--radius)"
            border={"1px solid orange "}
            color={"var(--active-bg)"}
            size={"sm"}
            bgColor={"white"}
            fontSize="var(--mini-text)"
            fontWeight="var(--big-font-weight)"
            onClick={onOpen}
            _hover={{ bgColor: "white" }}
          >
            Test this bot
          </Button>
          <Button
            borderRadius="var(--radius)"
            _hover={{ bgColor: "var(--active-bg)" }}
            bgColor="var(--active-bg)"
            color="#fff"
            size={"sm"}
            fontSize="var(--mini-text)"
            fontWeight="var(--big-font-weight)"
            onClick={() => saveFlow()}
          >
            Save
          </Button>
        </Flex>
      </Box>

      <Box
        flex={1}
        onDrop={onDrop}
        onDragOver={onDragOver}
        bg="#474d6d"
        fontSize="10px"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display={"flex"}
              gap={"16px"}
              alignItems={"center"}
              mb={"16px"}
            >
              <Text>
                <FaWhatsapp color="#25D366" size="36px" />
              </Text>
              <Heading> Test this bot on WhatsApp</Heading>
            </Box>
            <Divider />
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
              my={"20px"}
            >
              <Text>
                Choose one or more numbers to use for the test. You can test
                with a maximum of 10 numbers.
              </Text>
              <Box
                display={"flex"}
                gap={"4px"}
                flexDirection={"column"}
                maxHeight={"150px"}
                overflow={"auto"}
              >
                {phoneNumbers.map((num, index) => (
                  <Box key={index}>
                    <Box
                      border={"1px solid lightgray"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      padding={"10px"}
                      borderRadius={"7px"}
                    >
                      <Checkbox
                        isChecked={selectedNumbers.includes(num.phone_number)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          if (isChecked) {
                            setSelectedNumbers((prev) => [...prev, num.phone_number]);
                          } else {
                            setSelectedNumbers((prev) =>
                              prev.filter((n) => n !== num.phone_number)
                            );
                          }
                        }}
                      >
                        {num.phone_number}
                      </Checkbox>

                      <Text onClick={() => deleteNumber(num.id)}>
                        <LiaTrashAlt />
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onNumOpen}
              type="button"
              size={"sm"}
              fontSize={"13px"}
              border={"1px solid #FF5722 "}
              textColor={"#FF5722"}
              bgColor={"white"}
              mr={3}
              _hover={{ bgColor: "white" }}
            >
              Add number
            </Button>
            <Button
              borderRadius="var(--radius)"
              _hover={{ bgColor: "var(--active-bg)" }}
              bgColor="var(--active-bg)"
              color="#fff"
              size={"sm"}
              // h={"35px"}
              fontSize="var(--mini-text)"
              fontWeight="var(--big-font-weight)"
              onClick={() => saveFlowNumber()}
            >
              {" "}
              Send Test{" "}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isNumOpen} onClose={onNumClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading mb={"10px"}>Test this bot on WhatsApp</Heading>
            <Divider />
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
              my={"20px"}
            >
              <Text>
                If you want to test this bot yourself, add your phone number.
                You can also send a test to your clients or colleagues by adding
                their number.
              </Text>
              <Input
                type="number"
                placeholder="Type a Phone number"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
              />
            </Box>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button
              type="button"
              size={"sm"}
              fontSize={"13px"}
              border={"1px solid #FF5722 "}
              textColor={"#FF5722"}
              bgColor={"white"}
              mr={3}
              _hover={{ bgColor: "white" }}
              onClick={onNumClose}
            >
              back
            </Button>
            <Button
              borderRadius="var(--radius)"
              _hover={{ bgColor: "var(--active-bg)" }}
              bgColor="var(--active-bg)"
              color="#fff"
              size={"sm"}
              // h={"35px"}
              fontSize="var(--mini-text)"
              fontWeight="var(--big-font-weight)"
              onClick={() => savePhoneNumber()}
            //   onClick={() => {
            //     if (newNumber && !phoneNumbers.includes(newNumber)) {
            //       setPhoneNumbers((prev) => [...prev, newNumber]);
            //       setNewNumber(""); // reset input
            //     }
            //     onNumClose(); // close number modal
            //   }}
            // 
            >


              Save number
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



    </Box>
  );
};

// Main Component
export default function BotBuilder() {
  return (
    <Card>
      <ReactFlowProvider>
        <Flex w="100%" height="100vh" flexDirection="column">
          <FlowCanvas />
        </Flex>
      </ReactFlowProvider>
    </Card>
  );
}
