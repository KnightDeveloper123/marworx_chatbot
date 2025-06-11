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
  List,
  ListItem,
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
  Stack,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaImage, FaRegFileVideo, FaWhatsapp } from "react-icons/fa";
import { FcBusinessman, FcPhoneAndroid } from "react-icons/fc";
import { GoQuestion } from "react-icons/go";
import { TfiEmail } from "react-icons/tfi";
import { TiArrowShuffle } from "react-icons/ti";
import { LuReply } from "react-icons/lu";
import { IoIosListBox } from "react-icons/io";
import { SiGooglesheets } from "react-icons/si";
import { LuPlus } from "react-icons/lu";
import { MdExpandMore, MdOutlineDeleteOutline, MdOutlineLibraryAdd } from "react-icons/md";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import { decrypt } from "../../utils/security";
import { LiaTrashAlt } from "react-icons/lia";
import { AppContext } from "../../context/AppContext";
import { RiAiGenerate2 } from "react-icons/ri";
// Utility for node ID generation
let id = 1;
const getId = () => `${++id}`;
let selectedBotToLoad = null;

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
        <Handle type="target" position="top" style={{ background: "#555" }} />
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
        <Handle type="target" position="top" style={{ background: "#555" }} />
        <Box
          bg="blue.500"
          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold">
              Type
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
          size="xs"
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
  CustomQuestion: ({ id, data }) => {
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
      <Box bg="white" borderRadius={"5px"}>
        <Handle type="target" position="top" style={{ background: "#555" }} />
        <Box
          bg="blue.500"
          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold">
              Question
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
        <Flex
          fontSize="10px"
          alignItems="center"
        >
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Question?..."
            fontSize="8px"
            border="none"
            resize="none"
            size="xs"
            rows="2"
            _focusVisible={{ borderColor: "none", boxShadow: "none" }}
          // px={2}
          // py={1}
          />

          <IconButton
            size="xs"
            variant="ghost"
            colorScheme="white"
            icon={<RiAiGenerate2 />}
            // onClick={handleDelete}
            aria-label="Ai Node"
          />
        </Flex>
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
        <Handle type="target" position="top" style={{ background: "#555" }} />
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
        <Handle type="target" position="top" style={{ background: "#555" }} />
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
        <Handle type="target" position="top" style={{ background: "#555" }} />
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


    const handleFileChange = async (e) => {

      const uploadedFile = e.target.files[0];
      if (uploadedFile) {
        const nameWithoutExtension = uploadedFile.name.split('.').slice(0, -1).join('.');
        const formData = new FormData();
        formData.append('file', uploadedFile);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/uploadFiles/upload-sheet?fileName=${nameWithoutExtension}`, {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        if (result.success) {
          setFile(result.fileName); // Save actual filename
        } else {
          alert('Upload failed');
        }
      }
    };



    // const handleFileChange = (e) => {
    //   const uploadedFile = e.target.files[0];
    //   if (uploadedFile) {
    //     setFile(uploadedFile.name);
    //   }
    // };
    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };
    return (
      <Box bg="white" borderRadius={"4px"}>
        <Handle type="target" position="top" style={{ background: "#555" }} />
        <Box
          bg="blue.500"
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

  //   const navigate = useNavigate();
  //   const { setNodes, setEdges, getEdges } = useReactFlow();
  //   const [question, setQuestion] = useState(data.label || "");
  //   const [targetValues, setTargetValues] = useState(data.targetValues || []);

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

  //   const user = localStorage.getItem("user");
  //   const admin_id = decrypt(user).id;
  //   const [bots, setBots] = useState([]);
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  //   const currentIdxRef = useRef(null);
  //   const updateTargetValue = async (index, option) => {
  //     currentIdxRef.current = index;
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_BACKEND_URL
  //         }/bots/getAll?admin_id=${admin_id}`,
  //         {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );
  //       const result = await response.json();
  //       setBots(result?.data || []);
  //       onOpen();
  //     } catch (error) {
  //       console.error("Error fetching Date & Time bot:", error);
  //     }
  //   };
  //   const { id: bot_id } = useParams();


  //   const handleBotSelect = (bot) => {

  //     if (!bot?.nodes || !bot?.edges) return;

  //     const parsedNodes =
  //       typeof bot.nodes === "string" ? JSON.parse(bot.nodes) : bot.nodes;
  //     const parsedEdges =
  //       typeof bot.edges === "string" ? JSON.parse(bot.edges) : bot.edges;
  //     const filteredNodes = parsedNodes.filter(
  //       (node) =>
  //         node &&
  //         node.id &&
  //         node.type &&
  //         node.data &&
  //         typeof node.data === "object" &&
  //         node.type !== "Custom"
  //     );
  //     const uniqueId = () => Math.random().toString(36).substr(2, 9);
  //     const nodeIdMap = {};

  //     const newNodes = filteredNodes.map((node) => {
  //       const newId = uniqueId();
  //       nodeIdMap[node.id] = newId;

  //       return {
  //         ...node,
  //         id: newId,
  //         position: {
  //           x: (node.position?.x || 0) + 150, // avoid overlap
  //           y: (node.position?.y || 0) + 150,
  //         },
  //       };
  //     });

  //     const newEdges = parsedEdges
  //       .filter(
  //         (edge) =>
  //           edge &&
  //           edge.source &&
  //           edge.target &&
  //           nodeIdMap[edge.source] &&
  //           nodeIdMap[edge.target]
  //       )
  //       .map((edge) => ({
  //         ...edge,
  //         id: uniqueId(),
  //         source: nodeIdMap[edge.source],
  //         target: nodeIdMap[edge.target],
  //       }));
  //     const entryNode = newNodes[0];
  //     if (entryNode) {
  //       newEdges.push({
  //         id: uniqueId(),
  //         source: id, // this is the ListButton node ID
  //         sourceHandle: `option-${currentIdxRef.current}`,
  //         target: entryNode.id,
  //         type: "smoothstep",
  //         expanded: true
  //       });
  //     }

  //     if (newNodes.length > 0) {
  //       setNodes((nds) => [...nds, ...newNodes]);
  //       setEdges((eds) => [...eds, ...newEdges]);
  //     } else {
  //       console.warn("No valid nodes to import from selected bot");
  //     }
  //     onClose(); // close modal
  //   };

  //   const gatherDescendants = (startIds, allEdges) => {
  //     const queue = [...startIds];
  //     const result = new Set(startIds);

  //     while (queue.length) {
  //       const parentId = queue.shift();
  //       // find edges whose source is parentId
  //       allEdges
  //         .filter((e) => e.source === parentId)
  //         .forEach((e) => {
  //           if (!result.has(e.target)) {
  //             result.add(e.target);
  //             queue.push(e.target);
  //           }
  //         });
  //     }

  //     return Array.from(result);
  //   };

  //   const handleExpandOne = () => {
  //     const allEdges = getEdges();
  //     const immediateChildren = allEdges
  //       .filter((e) => e.source === id)
  //       .map((e) => e.target);

  //     // If you want to toggle *all* descendants:
  //     const allDescendants = gatherDescendants(immediateChildren, allEdges);

  //     setNodes((prev) =>
  //       prev.map((node) => {
  //         if (allDescendants.includes(node.id)) {
  //           return { ...node, hidden: !node.hidden };
  //         }
  //         return node;
  //       })
  //     );
  //     setEdges((prev) =>
  //       prev.map((edge) => {
  //         if (
  //           allDescendants.includes(edge.source) ||
  //           allDescendants.includes(edge.target)
  //         ) {
  //           return { ...edge, hidden: !edge.hidden };
  //         }
  //         return edge;
  //       })
  //     );
  //   };


  //   // const handleExpand = () => {
  //   //   const currentNodeId = id;
  //   //   const allEdges = getEdges();

  //   //   // 1) Find all edges where this ListButton is the source → those are "childEdges"
  //   //   const childEdges = allEdges.filter((edge) => edge.source === currentNodeId);

  //   //   // 2) Pull out the child node IDs (targets)
  //   //   const childNodeIds = childEdges.map((edge) => edge.target);

  //   //   if (childNodeIds.length === 0) {
  //   //     // no children to toggle
  //   //     console.log("No child nodes found for expansion.");
  //   //     return;
  //   //   }

  //   //   // 3) Toggle hidden on each of those child nodes
  //   //   setNodes((prevNodes) =>
  //   //     prevNodes.map((node) => {
  //   //       if (childNodeIds.includes(node.id)) {
  //   //         // If this is a child, flip its hidden flag
  //   //         return {
  //   //           ...node,
  //   //           hidden: !node.hidden,        // toggle hidden
  //   //           data: {
  //   //             ...node.data,
  //   //             // if you still need a separate "expanded" flag in data, you can keep it.
  //   //             // But React Flow cares about node.hidden. 
  //   //             expanded: !node.data?.expanded,
  //   //           },
  //   //         };
  //   //       }
  //   //       return node;
  //   //     })
  //   //   );

  //   //   // 4) Toggle hidden on any edge that connects to those child node IDs
  //   //   setEdges((prevEdges) =>
  //   //     prevEdges.map((edge) => {
  //   //       // If this edge’s source or target is one of the child IDs, flip hidden
  //   //       if (
  //   //         childNodeIds.includes(edge.source) ||
  //   //         childNodeIds.includes(edge.target)
  //   //       ) {
  //   //         return {
  //   //           ...edge,
  //   //           hidden: !edge.hidden,
  //   //         };
  //   //       }
  //   //       return edge;
  //   //     })
  //   //   );
  //   // };


  //   // useEffect(() => {
  //   //   handleExpand();
  //   // }, [targetValues]);

  //   const handleExpand = (idx) => {
  //     const allEdges = getEdges();

  //     // Find the edge for this specific option
  //     const matchingEdge = allEdges.find(
  //       (e) => e.source === id && e.sourceHandle === `option-${idx}`
  //     );

  //     if (!matchingEdge) {
  //       console.log("No matching edge found for option", idx);
  //       return;
  //     }

  //     const targetId = matchingEdge.target;
  //     const allDescendants = gatherDescendants([targetId], allEdges);

  //     // Toggle visibility of nodes (including the direct target)
  //     setNodes((prev) =>
  //       prev.map((node) => {
  //         if (node.id === targetId || allDescendants.includes(node.id)) {
  //           return { ...node, hidden: !node.hidden };
  //         }
  //         return node;
  //       })
  //     );

  //     // Toggle visibility of edges (including the direct edge)
  //     setEdges((prev) =>
  //       prev.map((edge) => {
  //         if (
  //           edge.id === matchingEdge.id ||
  //           allDescendants.includes(edge.source) ||
  //           allDescendants.includes(edge.target)
  //         ) {
  //           return { ...edge, hidden: !edge.hidden };
  //         }
  //         return edge;
  //       })
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
  //           <Flex alignItems={'flex-end'}>
  //             <IconButton
  //               size="xs"
  //               variant="ghost"
  //               colorScheme="whiteAlpha"
  //               icon={<IoTrashOutline />}
  //               onClick={handleDelete}
  //               aria-label="Delete Node"
  //             />

  //             <IconButton
  //               size="xs"
  //               aria-label="Expand"
  //               icon={<MdExpandMore fontSize={'20px'} />} // import from react-icons/md
  //               onClick={handleExpandOne}
  //               background={'none'}
  //             />
  //           </Flex>
  //         </Flex>
  //       </Box>
  //       {/* Target values */}

  //       {/* {targetValues.map((val, idx) => (
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
  //           <Button
  //             size="xs"
  //             width="100%"
  //             fontSize="10px"
  //             value={val}
  //             onClick={(e) => {
  //               currentIdxRef.current = idx; // ← Track index
  //               updateTargetValue(idx, e.target.value);
  //             }}
  //           >
  //             {val}
  //           </Button>

  //           <IconButton
  //             size="xs"
  //             aria-label="Expand"
  //             icon={<MdExpandMore />} // import from react-icons/md
  //             // onClick={handleExpand}
  //             onClick={() => handleExpand(idx)}
  //             ml={1}
  //           />

  //           <Handle
  //             type="source"
  //             position="right"
  //             id={`option-${idx}`}
  //             style={{ background: "#555" }}
  //           />
  //         </Flex>
  //       ))} */}

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
  //             size="xs"
  //             fontSize="10px"
  //             value={val}
  //             onChange={(e) => {
  //               const updated = [...targetValues];
  //               updated[idx] = e.target.value;
  //               setTargetValues(updated);
  //             }}
  //           />

  //           <IconButton
  //             size="xs"
  //             aria-label="Open Bot Options"
  //             icon={<MdExpandMore />}
  //             onClick={() => handleExpand(idx)}
  //             ml={1}
  //           />

  //           <IconButton
  //             size="xs"
  //             aria-label="Select Bot"
  //             icon={<MdOutlineLibraryAdd />}
  //             onClick={(e) => {
  //               currentIdxRef.current = idx;
  //               updateTargetValue(idx, val);
  //             }}
  //             ml={1}
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
  //       <Modal isOpen={isOpen} onClose={onClose}>
  //         <ModalOverlay />
  //         <ModalContent>
  //           <ModalHeader>Select a Bot</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody>
  //             <Stack spacing={2}>
  //               {bots.map((bot) => (
  //                 <Button
  //                   key={bot.id}
  //                   size="sm"
  //                   // onClick={()=>navigate(`/view/${bot.id}`)}
  //                   onClick={() => handleBotSelect(bot)}
  //                 >

  //                   {/* {console.log(bot.id)} */}
  //                   {/* {`/view/${bot.id}`} */}
  //                   {bot?.nodes?.[0]?.data?.label || null}
  //                 </Button>
  //               ))}
  //             </Stack>
  //           </ModalBody>
  //         </ModalContent>
  //       </Modal>
  //     </Box>
  //   );
  // },


   ReplyButton : ({ id, data }) => {
  const { setNodes } = useReactFlow();
  const [question, setQuestion] = useState(data.label || "Reply with Yes or No");
  const [targetValues, setTargetValues] = useState(data.targetValues || ["Yes", "No"]);

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
                  targetValues,
                },
              }
            : node
        )
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [question, targetValues, id, setNodes]);

  const updateTargetValue = (index, newValue) => {
    const updated = [...targetValues];
    updated[index] = newValue;
    setTargetValues(updated);
  };

  return (
    <Box bg="white" borderRadius="md" w="200px" boxShadow="md" fontSize="xs" position="relative">
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />

      <Box bg="blue.500" color="white" px={2} py={1} borderTopRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="10px" fontWeight="bold">
            {question || 'Reply Button'}
          </Text>
        </Flex>
      </Box>

      <Box px={2} py={2}>
        <Input
          placeholder="Enter question"
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
              position={Position.Right}
              id={`option_${idx}`} // ✅ Use underscore to match WhatsApp reply id
              style={{
                background: '#555',
                width: 8,
                height: 8,
                borderRadius: '50%',
                position: 'absolute',
                right: 4,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

    // ReplyButton: ({ id, data }) => {
    //   const { setNodes } = useReactFlow();
    //   const [question, setQuestion] = useState(data.label || "Reply with Yes or No");
    //   const [targetValues, setTargetValues] = useState(data.targetValues || ["Yes", "No"]);
  
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
    //                 targetValues,
    //               },
    //             }
    //             : node
    //         )
    //       );
    //     }, 300);
  
    //     return () => clearTimeout(timer);
    //   }, [question, targetValues, id, setNodes]);
  

  
    //   return (
    //     <Box bg="white" borderRadius="md" w="200px" boxShadow="md" fontSize="xs" position="relative">
    //       {/* Incoming connection handle for the node */}
    //       <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
  
    //       {/* Header */}
    //       <Box bg="blue.500" color="white" px={2} py={1} borderTopRadius="md">
    //         <Flex justifyContent="space-between" alignItems="center">
    //           <Text fontSize="10px" fontWeight="bold">
    //             {question || 'Reply Button'}
    //           </Text>
    //         </Flex>
    //       </Box>
  
        
    //       <Box px={2} py={2}>
    //         {/* Question input */}
    //         <Input
    //           placeholder="Enter question"
    //           size="xs"
    //           fontSize="10px"
    //           mb={2}
    //           value={question}
    //           onChange={(e) => setQuestion(e.target.value)}
    //         />
  
    //         {/* Options with handles on the RIGHT side on the input */}
    //         {targetValues.map((val, idx) => (
    //           <Flex key={idx} alignItems="center" mb={1} position="relative">
    //             <Input
    //               value={val}
    //               onChange={(e) => updateTargetValue(idx, e.target.value)}
    //               placeholder={`Option ${idx + 1}`}
    //               size="xs"
    //               fontSize="10px"
    //               pr="20px" // Space for the handle on the right
    //             />
    //             {/* Handle on the right over input */}
    //             <Handle
    //               type="source"
    //               position={Position.Right}
    //               id={`option-${idx}`}
    //               style={{
    //                 background: '#555',
    //                 width: 8,
    //                 height: 8,
    //                 borderRadius: '50%',
    //                 position: 'absolute',
    //                 right: 4, // slightly inset from the edge of input
    //                 top: '50%',
    //                 transform: 'translateY(-50%)',
    //               }}
    //             />
    //           </Flex>
    //         ))}
    //       </Box>
  
    //     </Box>
    //   );
  
  
  
    // }


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
      type: "CustomQuestion",
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

  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isNumOpen,
    onOpen: onNumOpen,
    onClose: onNumClose,
  } = useDisclosure();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  const { screenToFlowPosition } = useReactFlow();
  const { phoneNumbers, getAllNumbers } = useContext(AppContext);

  const botType = localStorage.getItem("botType");
  const sectorId = localStorage.getItem("sectorId");
  const user = localStorage.getItem("user");
  const admin_id = decrypt(user).id;

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

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
    [setEdges]
  );


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
      // console.log(result.data)
      const { nodes, edges } = result.data;
      // console.log(result.data)

      const parsedNodes = typeof nodes === "string" ? JSON.parse(nodes) : nodes;
      const parsedEdges = typeof edges === "string" ? JSON.parse(edges) : edges;

      setNodes(Array.isArray(parsedNodes) ? parsedNodes : []);
      setEdges(Array.isArray(parsedEdges) ? parsedEdges : []);
    } catch (error) {
      console.log(error);
      // showAlert("Internal server error", "error");
    }
  };

  const updateTemplate = async () => {
    const payload = {
      id,
      nodes: JSON.stringify(nodes),
      edges: JSON.stringify(edges),
    };

    // console.log(payload)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bots/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (result.success) {
        navigate("/home/sector");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBot();
    getAllNumbers();

  }, []);


  const deleteNumber = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bots/delete_number`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      const result = await response.json();
      // console.log(result);
      getAllNumbers();
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const saveFlowNumber = async () => {
    // console.log()
    if (selectedNumbers.length === 0) {
      alert("Please select at least one number to send test.");
      return;
    }
    console.log(nodes)
    console.log(edges)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/addwithwhatsup`,
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
            flow_id: id
          }),
        }
      );

      const data = await response.json();
      // console.log("viewData",data)
      if (response.ok && data.flowId) {

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/bots/track-user-bot`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              botId: data.flowId,
              admin_id
            })
          })
        const result = await res.json();
        // console.log("result", result)
      }
      // navigate("/home/bot");
    } catch (error) {
      console.log(" Error:", error);
    }
  };
  const [newNumber, setNewNumber] = useState("");
  const savePhoneNumber = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bots/save_number`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: newNumber,
          }),
        }
      );
      const data = await response.json();
      // console.log("numbers", data)
      setNewNumber("");
      onNumClose();
      getAllNumbers();
    } catch (error) {
      console.log(error);
    }
  };

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
            _hover={{ bgColor: "white" }}
            fontSize="var(--mini-text)"
            fontWeight="var(--big-font-weight)"
            onClick={onOpen}
          >
            Test this bot
          </Button>
          <Button
            borderRadius="var(--radius)"
            _hover={{ bgColor: "var(--active-bg)" }}
            bgColor="var(--active-bg)"
            color="#fff"
            h={"35px"}
            fontSize="var(--mini-text)"
            fontWeight="var(--big-font-weight)"
            onClick={() => updateTemplate()}
          >
            Update
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
          onDrop={onDrop}
          onDragOver={onDragOver}
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
                            setSelectedNumbers((prev) => [
                              ...prev,
                              num.phone_number,
                            ]);
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
            >
              {" "}
              Save number
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Main Component
export default function ViewBot() {

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
