import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { RxCross2 } from "react-icons/rx";
import Card from "../../../Card";

let id = 3;
const getId = () => `${id++}`;

// ✅ Custom text/logic node
const CustomNode = ({ id, data }) => {
  const [value, setValue] = useState(data.label || "");
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
    <div style={{ background: "#fff", borderRadius: 8 }}>
      <Handle type="target" position="top" style={{ background: "#555" }} />
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text..."
        style={{
          width: "100%",
          minHeight: 60,
          padding: 4,
          border: "1px solid #ccc",
          borderRadius: 4,
          resize: "none",
        }}
      />
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};

// ✅ Google Sheets Integration Node
const GoogleSheetsNode = ({ id, data }) => {
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
};

const ImageNode = ({ id, data }) => {
  const { setNodes } = useReactFlow();
  const [fileName, setFileName] = useState(data.fileName || "");
  const [fileUrl, setFileUrl] = useState(data.fileUrl || "");

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
    } else {
      alert("Only JPG and PNG files are allowed");
    }
  };

  return (
    <div
      style={{
        background: "#e6f7ff",
        padding: 10,
        border: "1px solid #1890ff",
        borderRadius: 8,
      }}
    >
      <Handle type="target" position="top" style={{ background: "#1890ff" }} />
      <strong>Image</strong>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        style={{ width: "100%", marginTop: 8 }}
      />
      {fileUrl && (
        <img
          src={fileUrl}
          alt="Preview"
          style={{ width: "100%", marginTop: 8, borderRadius: 4 }}
        />
      )}
      <Handle
        type="source"
        position="bottom"
        style={{ background: "#1890ff" }}
      />
    </div>
  );
};

// ✅ Video Node Component
const VideoNode = ({ id, data }) => {
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
      <strong>Video Upload</strong>
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
};

// 🧩 Node types
const nodeTypes = {
  custom: CustomNode,
  googleSheets: GoogleSheetsNode,
  imageNode: ImageNode,
  videoNode: VideoNode,
};

// 🎛️ Side Panel
const SidePanel = () => {
  const logicBlocks = [
    { label: "Text", type: "custom" },
    { label: "image", type: "imageNode" },
    { label: "Condition", type: "custom" },
    { label: "Button", type: "custom" },
  ];

  const integrations = [
    { label: "Google Sheets", type: "googleSheets" },
    { label: "Video", type: "videoNode" },
  ];

  const handleDragStart = (e, block) => {
    e.dataTransfer.setData("application/reactflow", JSON.stringify(block));
    e.dataTransfer.effectAllowed = "move";
  };

  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box
      style={{
        width: 220,
        height: "100vh",
        padding: 10,
        borderRight: "1px solid #ddd",
      }}
    >
      <Box width={"full"} display={"flex"} justifyContent={"space-between"}>
        <Text>Building Blocks </Text>
        <Text onClick={() => setIsOpen(!isOpen)}>
          <RxCross2 />
        </Text>
      </Box>
      <Box mt={"5px"}>
        {isOpen && (
          <>
            <strong>Logic</strong>

            {logicBlocks.map((block) => (
              <Box
                key={block.label}
                style={blockStyle}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
              >
                {block.label}
              </Box>
            ))}

            <hr />
            <strong>Integrations</strong>
            {integrations.map((block) => (
              <Box
                key={block.label}
                style={blockStyle}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
              >
                {block.label}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

const blockStyle = {
  padding: "8px 10px",
  margin: "6px 0",
  // background: '#fff',
  // border: '1px solid #ccc',
  borderRadius: 6,
  cursor: "grab",
};

// 🧩 Main Flow Canvas
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
        data: { label: block.label, type: block.type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, screenToFlowPosition]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // const saveFlow = async () => {
  //   console.log(nodes);
  //   console.log(edges);
  //   const response = await fetch("http://localhost:5000/bot/save-flow", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       flowName: "Welcome Journey",
  //       nodes,
  //       edges,
  //     }),
  //   });

  //   const data = await response.json();
  //   console.log(data);
  // };

  // const getFlow = async () => {
  //   const response = await fetch("http://localhost:5000/bot/flows", {
  //     method: "GET",
  //   });

  //   const data = await response.json();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getFlow();
  // }, []);

  return (
    <Box flex={1} height="100vh" display="flex" flexDirection="column">
      <Box
        p={3}
        display="flex"
        justifyContent="flex-end"
        borderBottom="1px solid #ddd"
      >
        <Button
          size={"sm"}
          onClick={() => saveFlow()}
          style={{
            padding: "6px 14px",
            backgroundColor: "#2b6cb0",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Flow
        </Button>
      </Box>

      <Box
        flex={1}
        onDrop={onDrop}
        onDragOver={onDragOver}
        bgColor={"red-800"}
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
    </Box>
  );
};

// ✅ Main Exported Component
export default function BotBuilder() {
  return (
    <Card>
      <ReactFlowProvider>
      <Flex
        w="100%"
        justifyContent="space-between"
        flexDirection={"column"}
        p="15px"
      >
        <Flex>
        <SidePanel />
        <FlowCanvas />
      </Flex> 
      </Flex>
        </ReactFlowProvider>
    </Card>
  );
}
