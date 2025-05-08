



import {
  Box,
  Button,
  Card,
  Collapse,
  Flex,
  Icon,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Text,
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
import "reactflow/dist/style.css";

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
      <div style={{ background: "#fff", borderRadius: 8 }}>
        <Handle type="target" position="top" style={{ background: "#555" }} />
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text..."
          style={{
            width: "100%",
            minHeight: 40,
            textAlign: 'center',
            padding: 2,
            // border: "1px solid #ccc",
            borderRadius: 4,
            resize: "none",
          }}
        />
 <Flex justifyContent="space-between" align={'flex-end'}>
          <button
            onClick={handleDelete}
            style={{
              color: "red",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "20px"
            }}
          >
            🗑
          </button>
        </Flex>

        <Handle type="source" position="bottom" style={{ background: "#555" }} />
      </div>
    );
  },

  //   imageNode : ({ data }) => {
  //   const [image, setImage] = useState(data.image || null);

  //   const handleImageUpload = (e) => {
  //     const file = e.target.files[0];
  //     if (file && file.type.startsWith("image/")) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setImage(reader.result);
  //         data.image = reader.result; // persist in data
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };
  //   const handleDelete = () => {
  //     setNodes((nds) => nds.filter((node) => node.id !== id));
  //   };

  //   return (
  //     <Box bg="white" p={2} border="1px solid #ccc" borderRadius="md" position="relative">
  //       {/* Target Handle (input) */}
  //       <Handle type="target" position={Position.Top} style={{ background: "#555" }} />

  //       <Text mb={2}>{data.label}</Text>
  //       <Flex justifyContent="space-between" align={'flex-end'}  fontSize="var(--mini-text)"
  //                     fontWeight="var(--big-font-weight)">
  //       {/* <strong>Text Node</strong> */}
  //       <button onClick={handleDelete} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }} >
  //        +
  //       </button>
  //     </Flex>
  //       <Input type="file" accept="image/*" onChange={handleImageUpload} size="sm" />
  //       {image && <Image src={image} alt="Uploaded" mt={2} maxH="100px" />}


  //       {/* Source Handle (output) */}
  //       <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
  //     </Box>
  //   );
  // },

  imageNode: ({ id, data }) => {
    const [image, setImage] = useState(data.image || null);
    const { setNodes } = useReactFlow(); // ✅ FIXED: access setNodes properly

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          data.image = reader.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };

    return (
      <Box bg="white" p={2} border="1px solid #ccc" borderRadius="md" position="relative">
        <Handle type="target" position={Position.Top} style={{ background: "#555" }} />

        <Text mb={2}>{data.label}</Text>

        <Flex justifyContent="space-between" align={'flex-end'}>
          <button
            onClick={handleDelete}
            style={{
              color: "red",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "20px"
            }}
          >
            🗑
          </button>
        </Flex>

        <Input type="file" accept="image/*" onChange={handleImageUpload} size="sm" />
        {image && <Image src={image} alt="Uploaded" mt={2} maxH="100px" />}

        <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
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
      <div
        style={{
          padding: 12,
          background: "#fff0f6",
          border: "1px solid #eb2f96",
          borderRadius: 8,
        }}
      >
        <Handle type="target" position="top" style={{ background: "#eb2f96" }} />
      <Box display={'flex'} justifyContent={'space-between'}>  
        <strong>Video Upload</strong>
        <Box >
          <button
            onClick={handleDelete}
            style={{
              color: "red",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "20px"
            }}
          >
            <MdOutlineDeleteOutline />
          </button>
        </Box></Box>

        <input
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          style={{ marginTop: 8 }}
        />
        {fileUrl && (
          <video
            src={fileUrl}
            controls
            style={{ width: "100%", marginTop: 10, borderRadius: 4 }}
          />
        )}
        {fileName && (
          <p style={{ fontSize: 12, marginTop: 6, color: "#eb2f96" }}>
            🎬 {fileName}
          </p>
        )}
        <Handle
          type="source"
          position="bottom"
          style={{ background: "#eb2f96" }}
        />
      </div>
    );
  },

  
 GoogleSheetsNode : ({ id, data }) => {
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
    <div
      style={{
        padding: 12,
        background: "#e6f7ff",
        border: "1px solid #1890ff",
        borderRadius: 8,
      }}
    >
      <Handle type="target" position="top" style={{ background: "#1890ff" }} />
      <strong>Google Sheets</strong>
      <Flex justifyContent="space-between" align={'flex-end'}>
          <button
            onClick={handleDelete}
            style={{
              color: "red",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "20px"
            }}
          >
            🗑
          </button>
        </Flex>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileChange}
        style={{ marginTop: 8 }}
      />
      {file && <p style={{ fontSize: 12, marginTop: 6 }}>📄 {file}</p>}
      <Handle
        type="source"
        position="bottom"
        style={{ background: "#1890ff" }}
      />
    </div>
  );
}
}

const blockStyle = {
  padding: "8px 10px",
  margin: "6px 0",
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
    { label: "Text", type: "CustomNode", icon: <Icon as={AiOutlineMessage} mr={2} /> },
    { label: "Image", type: "imageNode", icon: <Icon as={FaImage} mr={2} /> },
  ];

  const QuestionsBlock = [
    { label: "What is your name?", type: "CustomNode", icon: <Icon as={FcBusinessman} mr={2} /> },
    { label: "Ask a Question?", type: "CustomNode", icon: <Icon as={GoQuestion} mr={2} /> },
    { label: "Ask for an email?", type: "CustomNode", icon: <Icon as={TfiEmail} mr={2} /> },
    { label: "Ask for Phone number?", type: "CustomNode", icon: <Icon as={FcPhoneAndroid} mr={2} /> },
  ];

  const logicBlocks = [
    { label: "Condition", type: "CustomNode", icon: <Icon as={TiArrowShuffle} mr={2} /> },
  ];

  const WhatsAppEssential = [
    { label: "Reply Buttons", type: "CustomNode", icon: <Icon as={LuReply} mr={2} /> },
    { label: "List Buttons", type: "CustomNode", icon: <Icon as={IoIosListBox} mr={2} /> },
  ];

  const integrations = [
    { label: "Google Sheets", type: "GoogleSheetsNode", icon: <Icon as={SiGooglesheets} mr={2} /> },
    { label: "Video", type: "VideoNode", icon: <Icon as={FaRegFileVideo} mr={2} /> },
  ];

  const handleDragStart = (e, block) => {
    const payload = JSON.stringify({ label: block.label, type: block.type });
    e.dataTransfer.setData("application/reactflow", payload); // FIXED MIME TYPE
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} borderRadius={'50%'} textColor={'white'} bgColor={'blue.800'} size={'sm'} textAlign={'center'}><LuPlus /></MenuButton>
        <MenuList px={4} py={2}>
          {/* Questions Toggle */}
          <Box
            onClick={onToggle}
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontWeight="bold">Questions</Text>
            {isBoxOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Box>

          <Collapse in={isBoxOpen} animateOpacity>
            <Box mt={2}>
              {QuestionsBlock.map((block) => (
                <Box><Text
                  key={block.label}
                  style={blockStyle}
                  draggable
                  onDragStart={(e) => handleDragStart(e, block)}
                >
                  {block.icon} {block.label}
                </Text>
              
                </Box>
              ))}
            </Box>
          </Collapse>

          {/* Messages */}
          <Box mt={3}>
            <Text fontWeight="bold">Messages</Text>
            {messages.map((block) => (
              <Box
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
            <Text fontWeight="bold">WhatsApp Essential</Text>
            {WhatsAppEssential.map((block) => (
              <Box
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
            <Text fontWeight="bold">Logic</Text>
            {logicBlocks.map((block) => (
              <Box
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
            <Text fontWeight="bold">Integrations</Text>
            {integrations.map((block) => (
              <Box
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
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "custom",
      data: { label: "Starting point\nWhere your bot begins" },
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

  return (
    <Box flex={1} height="100vh" display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="space-between"
        borderBottom="1px solid #ddd"
        alignItems="center"
        mt="10px"
        px={4}
      >
        <SidePanel />
        <Button size="sm" colorScheme="blue">
          Save Flow
        </Button>
      </Box>

      <Box flex={1} onDrop={onDrop} onDragOver={onDragOver} bg="#3D4362">
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
