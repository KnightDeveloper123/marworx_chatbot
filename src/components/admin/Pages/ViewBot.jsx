import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
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
import React, { useCallback, useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";

// Utility for node ID generation
let id = 1;
const getId = () => `${++id}`;

// Node types map
const nodeTypes = {
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
      <div style={{ background: "#fff", borderRadius: 4 }}>
        <Handle type="target" position="top" style={{ background: "#555" }} />
        <Flex justifyContent={"space-between"} alignItems={"center"} p="1px">
          <Text fontSize="10px" fontWeight="var(--big-font-weight)">
            Text
          </Text>
          <button
            onClick={handleDelete}
            style={{
              color: "red",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            <IoTrashOutline fontSize={"10px"} />
          </button>
        </Flex>
        <Divider />
        <Textarea
          fontSize="var( --text-12px)"
          fontWeight="var(--big-font-weight)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text..."
          style={{
            width: "100%",
            minHeight: 20,
            resize: "none",
            border: "none",
          }}
        />
        <Handle
          type="source"
          position="bottom"
          style={{ background: "#555" }}
        />
      </div>
    );
  },

  imageNode: ({ id, data }) => {
    const [image, setImage] = useState(data.image || null);
    const { setNodes } = useReactFlow(); // ✅ FIXED: access setNodes properly
    const [fileName, setFileName] = useState(data.fileName || "");
    const [fileUrl, setFileUrl] = useState(data.fileUrl || "");

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
      <Box
        bg="white"
        border="1px solid #ccc"
        borderRadius="md"
        position="relative"
      >
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: "#555" }}
        />
        <Flex justifyContent={"space-between"} alignItems={"center"} p="1px">
          <Text fontSize="10px" fontWeight="var(--big-font-weight)">
            Image
          </Text>
          <button
            onClick={handleDelete}
            style={{
              color: "red",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            <IoTrashOutline fontSize={"10px"} />
          </button>
        </Flex>
        <Divider />

        <Input
          fontSize="var( --text-12px)"
          fontWeight="var(--big-font-weight)"
          border={"none"}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          size="sm"
        />
        {image && <Image src={image} alt="Uploaded" mt={2} maxH="100px" />}

        <Handle
          type="source"
          position={Position.Bottom}
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
      <Box
        bg="white"
        border="1px solid #ccc"
        borderRadius="md"
        position="relative"
      >
        <Handle
          type="target"
          position="top"
          style={{ background: "#eb2f96" }}
        />
        <Flex justifyContent={"space-between"} alignItems={"center"} p="1px">
          <Text fontSize="10px" fontWeight="var(--big-font-weight)">
            Video
          </Text>
          <button
            onClick={handleDelete}
            style={{
              color: "red",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            <IoTrashOutline fontSize={"10px"} />
          </button>
        </Flex>
        <Divider />

        <input
          fontSize="var( --text-12px)"
          fontWeight="var(--big-font-weight)"
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          style={{ marginTop: 4 }}
        />
        {fileUrl && (
          <video
            src={fileUrl}
            controls
            style={{ width: "100%", marginTop: 10, borderRadius: 4 }}
          />
        )}
        {fileName && (
          <p style={{ fontSize: 12, marginTop: 3, color: "#eb2f96" }}>
            {fileName}
          </p>
        )}
        <Handle
          type="source"
          position="bottom"
          style={{ background: "#eb2f96" }}
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
      <Box
        style={{
          background: "#fff",
          borderRadius: 4,
        }}
      >
        <Handle
          type="target"
          position="top"
          style={{ background: "#1890ff" }}
        />
        <Flex justifyContent={"space-between"} alignItems={"center"} p="1px">
          <Text fontSize="10px" fontWeight="var(--big-font-weight)">
            Google Sheet
          </Text>
          <button
            onClick={handleDelete}
            style={{
              color: "red",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            <IoTrashOutline fontSize={"10px"} />
          </button>
        </Flex>
        <Divider />
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          style={{ marginTop: 8 }}
          fontSize="var( --text-12px)"
          fontWeight="var(--big-font-weight)"
        />
        {file && <p style={{ fontSize: 12, marginTop: 6 }}>📄 {file}</p>}
        <Handle
          type="source"
          position="bottom"
          style={{ background: "#1890ff" }}
        />
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
      label: "Text",
      type: "CustomNode",
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

  const logicBlocks = [
    {
      label: "Condition",
      type: "CustomNode",
      icon: <Icon as={TiArrowShuffle} mr={2} />,
    },
  ];

  const WhatsAppEssential = [
    {
      label: "Reply Buttons",
      type: "CustomNode",
      icon: <Icon as={LuReply} mr={2} />,
    },
    {
      label: "List Buttons",
      type: "CustomNode",
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
          bgColor={"#4fccc2"}
          _hover={{ bgColor: "#4fccc2" }}
          variant="outline"
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
          <Box mt={3}>
            <Text fontSize="15px" fontWeight="bold">
              Logic
            </Text>
            {logicBlocks.map((block) => (
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
  // const token = localStorage.getItem("token");
  // console.log(token)
const {id } = useParams()
// console.log(id)
  // const [nodes, setNodes, onNodesChange] = useNodesState([
  //   {
  //     id: "1",
  //     type: "custom",
  //     data: { label: "Starting point\nWhere your bot begins" },
  //     position: { x: 100, y: 150 },
  //   },
  // ]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const { screenToFlowPosition } = useReactFlow();

  // const onConnect = useCallback( (params) => setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),[setEdges] );

  // const onDrop = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //     const rawData = event.dataTransfer.getData("application/reactflow");
  //     if (!rawData) return;

  //     const block = JSON.parse(rawData);
  //     const position = screenToFlowPosition({
  //       x: event.clientX,
  //       y: event.clientY,
  //     });

  //     const newNode = {
  //       id: getId(),
  //       type: block.type,
  //       position,
  //       data: { label: block.label },
  //     };

  //     setNodes((nds) => nds.concat(newNode));
  //   },
  //   [setNodes, screenToFlowPosition]
  // );

  // const onDragOver = (event) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = "move";
  // };
  // save on database
   const [nodes, setNodes] = useState([]);
   const [edges, setEdges] = useState([]);
  const [bots, setBots] = useState({});

  const fetchBot = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bots/getbyid?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: token,
          },
        }
      );
      const result = await response.json();
    const { nodes, edges } = result.data;

    const parsedNodes = typeof nodes === "string" ? JSON.parse(nodes) : nodes;
    const parsedEdges = typeof edges === "string" ? JSON.parse(edges) : edges;

    setNodes(Array.isArray(parsedNodes) ? parsedNodes : []);
    setEdges(Array.isArray(parsedEdges) ? parsedEdges : []);
    } catch (error) {
      console.log(error);
      // showAlert("Internal server error", "error");
    }
  };

  useEffect(() => {
    fetchBot();
  }, []);


// useEffect(() => {
//   if (bots && bots.nodes && Array.isArray(bots.nodes) && bots.edges && Array.isArray(bots.edges)) {
//     const nodeMap = new Map();

//     // Add nodes to the nodeMap
//     bots.nodes.forEach((botNode) => {
//       nodeMap.set(botNode.id, {
//         id: botNode.id.toString(),
//         type: botNode.type,
//         position: botNode.position,
//         data: { label: botNode.data.label || 'No label provided' },
//         width: botNode.width,
//         height: botNode.height,
//         selected: botNode.selected,
//         dragging: botNode.dragging,
//         positionAbsolute: botNode.positionAbsolute,
//         edges: [], // Initialize edges array for each node
//       });
//     });

//     // Add edges to respective nodes in nodeMap
//     bots.edges.forEach((edge) => {
//       if (nodeMap.has(edge.source) && nodeMap.has(edge.target)) {
//         nodeMap.get(edge.source).edges.push(edge);
//         nodeMap.get(edge.target).edges.push(edge);
//       }
//     });

//     // Convert nodeMap back to an array of nodes
//     const newNodes = Array.from(nodeMap.values());

//     // Update state with new nodes and edges
//     setNodes(newNodes);
//     setEdges((prevEdges) => [...prevEdges, ...bots.edges]); // Add all edges to the edges state
//   }
// }, [bots, setNodes, setEdges]);
 
  
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
            mr={3}
            _hover={{ bgColor: "white" }}
          >
            Back
          </Button>
          {/* <Button
            borderRadius="var(--radius)"
            _hover={{ bgColor: "var(--active-bg)" }}
            bgColor="var(--active-bg)"
            color="#fff"
            h={"35px"}
            fontSize="var(--mini-text)"
            fontWeight="var(--big-font-weight)"
            onClick={() => saveFlow()}
          >
            Save
          </Button> */}
        </Flex>
      </Box>

      <Box
        flex={1}
        // onDrop={onDrop}
        // onDragOver={onDragOver}
        bg="#474d6d"
        fontSize="10px"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          // onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          // nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Box>
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
