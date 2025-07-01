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
  Stack,
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
  VStack,
  Select,
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
import { useParams } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { LiaTrashAlt } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import { MdExpandMore, MdOutlineLibraryAdd } from "react-icons/md";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { decrypt } from "../../utils/security";


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
    const { setNodes, deleteElements } = useReactFlow();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleAsk = async () => {
      if (!question.trim()) return;

      try {
        const response = await axios.get(`http://216.10.251.154:5000/get_info?query=${encodeURIComponent(question)}`);
        const answerText = response.data.answer || response.data;
        setAnswer(answerText);

        // Optional: Update node data with last Q&A
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id
              ? {
                ...node,
                data: {
                  ...node.data,
                  lastQuestion: question,
                  lastAnswer: answerText,
                },
              }
              : node
          )
        );
      } catch (error) {
        console.error('Error fetching from Python API:', error);
        setAnswer('❌ Failed to get response from Python API.');
      }
    };

    const handleDelete = () => {
      deleteElements({ nodes: [{ id }] });
    };

    return (
      <Box bgColor={'white'} borderRadius={'2px'}>
        {/* Handles for connecting nodes */}
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />

        {/* Node Title */}
        <Box bgColor="var(--active-bg)" color="white" borderRadius={'2px'}
          display={'flex'} justifyContent={'space-between'} padding={'4px'}>
          <Text fontSize={'10px'}>{data.label}</Text>
          <IoTrashOutline onClick={handleDelete}></IoTrashOutline>
        </Box>

        {/* Question Input */}
        <Input
          type="text"
          backgroundColor={'white'}
          placeholder="ask a question"
          value={question}
          fontSize="8px"
          onChange={(e) => setQuestion(e.target.value)}
        />




        {/* Show Answer */}
        {answer && (
          <div className="mt-3 text-sm bg-gray-100 p-2 rounded">
            <span className="font-semibold text-gray-700">Answer:</span> {answer}
          </div>
        )}
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

          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold" pl={'8px'}>
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
    const [image, setImage] = useState(data.fileUrl || null);
    const [fileName, setFileName] = useState(data.fileName || "");
    const [fileUrl, setFileUrl] = useState(data.fileUrl || "");
    const { setNodes } = useReactFlow();

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];

      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        // const serverFileName = `${Date.now()}-${file.name}`;

        const cleanName = file.name.replace(/\s+/g, "_");  // ✅ replaces spaces
        const serverFileName = `${Date.now()}-${cleanName}`;

        const formData = new FormData();
        formData.append("file", file);

        try {
          // Upload to backend
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/upload-image?fileName=${serverFileName}`, {
            method: "POST",
            body: formData,
          });

          const result = await res.json();
          const publicUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/${result.fileName}`;

          setImage(publicUrl);
          setFileName(result.fileName);
          setFileUrl(publicUrl);
        } catch (err) {
          console.error("Upload failed", err);
          alert("Upload failed");
        }
      } else {
        alert("Only JPG and PNG files are allowed");
      }
    };

    const handleDelete = () => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    };

    useEffect(() => {
      if (fileUrl && fileName) {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? {
                ...node,
                data: {
                  ...node.data,
                  fileName,
                  fileUrl,
                  caption: data.caption || "", // include caption if needed
                },
              }
              : node
          )
        );
      }
    }, [fileUrl, fileName]);

    return (
      <Box bg="white" borderRadius="15px" boxShadow="md" w="200px">
        <Handle type="target" position="left" style={{ background: "#555" }} />

        <Box bgColor="var(--active-bg)" color="white" borderRadius="md">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold" pl={'8px'}>Image</Text>
            <IconButton
              size="xs"
              variant="ghost"
              icon={<IoTrashOutline />}
              onClick={handleDelete}
              aria-label="Delete Node"
              color="white"
            />
          </Flex>
        </Box>

        <Divider my={2} />

        <Input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageUpload}
          fontSize="10px"
          size="xs"
          border="none"
        />

        {image && (
          <Box mt={2}>
            <Image
              src={image}
              alt="Uploaded"
              width="100%"
              borderRadius="md"
              objectFit="contain"
            />
          </Box>
        )}

        <Handle type="source" position="bottom" style={{ background: "#555" }} />
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

      if (!file || file.type !== "video/mp4") {
        alert("Please upload a valid .mp4 video file.");
        return;
      }

      const baseName = file.name.split(".")[0];
      const formData = new FormData();
      formData.append("video", file); // ✅ Field name matches multer.single('video')

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/upload-video?fileName=${baseName}`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Video upload failed");
        }

        setFileName(data.fileName);
        setFileUrl(`${import.meta.env.VITE_BACKEND_URL}/videoFiles/${data.fileName}`);
      } catch (error) {
        console.error("❌ Video upload failed:", error.message);
        alert("Upload failed: " + error.message);
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
          bgColor="var(--active-bg)" // Or use a fallback if CSS var isn't defined
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold" pl={'8px'}>Video</Text>
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
          size="sm"
        />

        {fileUrl && (
          <video
            src={fileUrl}
            controls
            style={{ width: "189px", height: "auto" }}
          />
        )}

        <Handle type="source" position="bottom" style={{ background: "#555" }} />
      </Box>
    );
  }
  ,

  GoogleSheetsNode: ({ id, data }) => {
    const [file, setFile] = useState(data.file || null);
    const [caption, setCaption] = useState(data.caption || '');
    const { setNodes } = useReactFlow();

    useEffect(() => {
      const timer = setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id ? { ...node, data: { ...node.data, file, caption } } : node
          )
        );
      }, 500);

      return () => clearTimeout(timer);
    }, [file, caption, id, setNodes]);

    const handleFileChange = (e) => {
      const uploadedFile = e.target.files[0];
      if (uploadedFile) {
        const baseName = uploadedFile.name.split('.')[0]; // get name without extension
        const formData = new FormData();
        formData.append("file", uploadedFile);

        fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/upload-sheet?fileName=${baseName}`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            setFile(data.fileName); // Store the uploaded file name
            setNodes((nds) =>
              nds.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, file: data.fileName } } : node
              )
            );
          })
          .catch(console.error);
      }
    };


    const handleCaptionChange = (e) => {
      setCaption(e.target.value);
    };

    const handleDeleteFile = () => {
      setFile(null);
      setCaption(''); // Clear caption when file is deleted
      // Optionally: call backend to delete uploaded file
    };
    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };

    return (
      <Box bg="white" borderRadius={"4px"} width={'250px'} >
        <Handle type="target" position="left" style={{ background: "#555" }} />
        <Box color="white" p={0.5} borderRadius={"5px"} bgColor="var(--active-bg)">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold" pl={'8px'}>Google Sheet</Text>
            <IconButton size="xs" variant="ghost" colorScheme="white" icon={<IoTrashOutline />} onClick={handleDelete} aria-label="Delete Node" />
          </Flex>
        </Box>
        <Divider />

        <Box display={'flex'} flexDirection={'column'} padding={'5px'} gap={'3px'}>
          <Input
            placeholder="Enter the name"
            value={caption}
            onChange={handleCaptionChange}
            fontSize="10px"
            // fontWeight="var(--big-font-weight)"
            size="xs"
          // Add some padding
          />
          <Input
            type="file"
            accept=".xlsx,.xls,.csv.pdf,.txt"
            onChange={handleFileChange}
            fontSize="10px"
            // fontWeight="var(--big-font-weight)"
            size="xs"
          />



          {/* {file &&

          <p>📄 {file}</p>} */}

          {file && (
            <Box mt={2} fontSize="xs" color="gray.700" > {/* Added padding here */}

              <Flex justifyContent="space-between" alignItems="center">
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}/uploadFiles/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "#3182ce" }}
                >
                  📄 {file}
                </a>
                <IconButton
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  icon={<IoTrashOutline />}
                  onClick={handleDeleteFile}
                  aria-label="Delete File"
                />
              </Flex>
            </Box>
          )}


          <Handle type="source" position="bottom" style={{ background: "#555" }} />
        </Box>
      </Box>
    );
  },


  ListButton: ({ id, data }) => {
    const navigate = useNavigate();                //*** */
    const { setNodes, getEdges, setEdges } = useReactFlow();
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

    // const updateTargetValue = (index, newValue) => {
    //   setTargetValues((prev) =>
    //     prev.map((val, i) => (i === index ? newValue : val))
    //   );
    // };

    const user = localStorage.getItem("user");
    const admin_id = decrypt(user).id;
    const [bots, setBots] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const currentIdxRef = useRef(null);
    const updateTargetValue = async (index, option) => {
      currentIdxRef.current = index;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL
          }/bots/getAll?admin_id=${admin_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const result = await response.json();
        setBots(result?.data || []);
        onOpen();
      } catch (error) {
        console.error("Error fetching Date & Time bot:", error);
      }
    };
    const { id: bot_id } = useParams();


    const handleBotSelect = (bot) => {

      if (!bot?.nodes || !bot?.edges) return;

      const parsedNodes =
        typeof bot.nodes === "string" ? JSON.parse(bot.nodes) : bot.nodes;
      const parsedEdges =
        typeof bot.edges === "string" ? JSON.parse(bot.edges) : bot.edges;
      const filteredNodes = parsedNodes.filter(
        (node) =>
          node &&
          node.id &&
          node.type &&
          node.data &&
          typeof node.data === "object" &&
          node.type !== "Custom"
      );
      const uniqueId = () => Math.random().toString(36).substr(2, 9);
      const nodeIdMap = {};

      const newNodes = filteredNodes.map((node) => {
        const newId = uniqueId();
        nodeIdMap[node.id] = newId;

        return {
          ...node,
          id: newId,
          position: {
            x: (node.position?.x || 0) + 150, // avoid overlap
            y: (node.position?.y || 0) + 150,
          },
        };
      });

      const newEdges = parsedEdges
        .filter(
          (edge) =>
            edge &&
            edge.source &&
            edge.target &&
            nodeIdMap[edge.source] &&
            nodeIdMap[edge.target]
        )
        .map((edge) => ({
          ...edge,
          id: uniqueId(),
          source: nodeIdMap[edge.source],
          target: nodeIdMap[edge.target],
        }));
      const entryNode = newNodes[0];
      if (entryNode) {
        newEdges.push({
          id: uniqueId(),
          source: id, // this is the ListButton node ID
          sourceHandle: `option_${currentIdxRef.current}`,
          target: entryNode.id,
          type: "smoothstep",
          expanded: true
        });
      }

      if (newNodes.length > 0) {
        setNodes((nds) => [...nds, ...newNodes]);
        setEdges((eds) => [...eds, ...newEdges]);
      } else {
        console.warn("No valid nodes to import from selected bot");
      }
      onClose(); // close modal
    };

    const gatherDescendants = (startIds, allEdges) => {
      const queue = [...startIds];
      const result = new Set(startIds);

      while (queue.length) {
        const parentId = queue.shift();
        // find edges whose source is parentId
        allEdges
          .filter((e) => e.source === parentId)
          .forEach((e) => {
            if (!result.has(e.target)) {
              result.add(e.target);
              queue.push(e.target);
            }
          });
      }

      return Array.from(result);
    };

    const handleExpandOne = () => {
      const allEdges = getEdges();
      const immediateChildren = allEdges
        .filter((e) => e.source === id)
        .map((e) => e.target);

      // If you want to toggle *all* descendants:
      const allDescendants = gatherDescendants(immediateChildren, allEdges);

      setNodes((prev) =>
        prev.map((node) => {
          if (allDescendants.includes(node.id)) {
            return { ...node, hidden: !node.hidden };
          }
          return node;
        })
      );
      setEdges((prev) =>
        prev.map((edge) => {
          if (
            allDescendants.includes(edge.source) ||
            allDescendants.includes(edge.target)
          ) {
            return { ...edge, hidden: !edge.hidden };
          }
          return edge;
        })
      );
    };

    useEffect(() => {
      handleExpand();
    }, [targetValues]);

    const handleExpand = (idx) => {
      const allEdges = getEdges();

      // Find the edge for this specific option
      const matchingEdge = allEdges.find(
        (e) => e.source === id && e.sourceHandle === `option_${idx}`
      );

      if (!matchingEdge) {
        console.log("No matching edge found for option", idx);
        return;
      }

      const targetId = matchingEdge.target;
      const allDescendants = gatherDescendants([targetId], allEdges);

      // Toggle visibility of nodes (including the direct target)
      setNodes((prev) =>
        prev.map((node) => {
          if (node.id === targetId || allDescendants.includes(node.id)) {
            return { ...node, hidden: !node.hidden };
          }
          return node;
        })
      );

      // Toggle visibility of edges (including the direct edge)
      setEdges((prev) =>
        prev.map((edge) => {
          if (
            edge.id === matchingEdge.id ||
            allDescendants.includes(edge.source) ||
            allDescendants.includes(edge.target)
          ) {
            return { ...edge, hidden: !edge.hidden };
          }
          return edge;
        })
      );
    };

    return (
      <Box bg="white" borderRadius="md" w="170px" boxShadow="md">
        <Handle type="target" position="left" style={{ background: "#555" }} />



        <Box
          bg="blue.500"
          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
        >


          <Flex justifyContent="space-between" alignItems="center"    >
            <Text fontSize="10px" fontWeight="bold" pl={'8px'}>
              List Button
            </Text>
            <Flex alignItems={'flex-end'}>
              <IconButton
                size="xs"

                colorScheme="white"
                icon={<IoTrashOutline />}
                onClick={handleDelete}
                aria-label="Delete Node"
              />

              <IconButton
                size="xs"
                aria-label="Expand"
                icon={<MdExpandMore fontSize={'20px'} />} // import from react-icons/md
                onClick={handleExpandOne}
                background={'none'}
              />
            </Flex>
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
            <Flex
              key={idx}
              position="relative"
              borderRadius="md"
              px={2}
              py={1}
              mb={1}
              fontSize="10px"
              alignItems="center"
            >
              <Input
                size="xs"
                fontSize="10px"
                value={val}
                onChange={(e) => {
                  const updated = [...targetValues];
                  updated[idx] = e.target.value;
                  setTargetValues(updated);
                }}
              // onChange={(e) => updateTargetValue(idx, e.target.value)}
              // placeholder={`Option ${idx + 1}`}
              // value={val}
              // onChange={(e) => {
              //   const updated = [...targetValues];
              //   updated[idx] = e.target.value;
              //   setTargetValues(updated);
              // }}
              />

              <IconButton
                size="10px"
                aria-label="Open Bot Options"
                icon={<MdExpandMore />}
                onClick={() => handleExpand(idx)}
                ml={1}
              />

              <IconButton
                size="10px"
                aria-label="Select Bot"
                icon={<MdOutlineLibraryAdd />}
                onClick={(e) => {
                  currentIdxRef.current = idx;
                  updateTargetValue(idx, val);
                }}
                ml={1}
              />

              <Handle
                type="source"
                position="right"
                id={`option_${idx}`}
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select a Bot</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={2}>
                {bots.map((bot) => (
                  <Button
                    key={bot.id}
                    size="sm"
                    // onClick={()=>navigate(`/view/${bot.id}`)}
                    onClick={() => handleBotSelect(bot)}
                  >

                    {/* {console.log(bot.id)} */}
                    {/* {`/view/${bot.id}`} */}
                    {bot?.nodes?.[0]?.data?.label || null}
                  </Button>
                ))}
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    );
  },


  LinkNode: ({ id, data }) => {
    const { setNodes } = useReactFlow();


    const [linkText, setLinkText] = useState(data.linkText || '');
    const [linkUrl, setLinkUrl] = useState(data.linkUrl || '');

    useEffect(() => {
      const timer = setTimeout(() => {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? {
                ...node,
                data: { ...node.data, linkText, linkUrl },
              }
              : node
          )
        );
      }, 500);

      return () => clearTimeout(timer);
    }, [linkText, linkUrl]);


    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };
    return (

      <Box bgColor={'white'} width={'200px'}  >
        <Handle type="target" position="left" style={{ background: "#555" }} />
        <Box

          color="white"
          p={0.5}
          borderRadius={"5px"}
          bgColor="var(--active-bg)"
          padding={'4px'}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold">
              Link Node
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
        <Box paddingX={'6px'}>
          <Text fontSize={'9px'} paddingTop={'5px'} >Link Text</Text>
          <Input
            size="xs"
            fontSize="8px"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            placeholder="e.g. View Report"
            mb={1}

          />

          <Text fontSize={'9px'}>Link URL</Text>
          <Input
            size="xs"
            fontSize="8px"

            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="e.g. https://example.com"
            mb={1}
          />
        </Box>

        <Handle
          type="source"
          position="bottom"
          style={{ background: "#555" }}
        />
      </Box>
    );
  },

  ReplyButton: ({ id, data }) => {
    const { setNodes, getEdges, setEdges } = useReactFlow();
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

    const handleDelete = () => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    };

    const gatherDescendants = (startIds, allEdges) => {
      const queue = [...startIds];
      const result = new Set(startIds);

      while (queue.length) {
        const parentId = queue.shift();
        allEdges
          .filter((e) => e.source === parentId)
          .forEach((e) => {
            if (!result.has(e.target)) {
              result.add(e.target);
              queue.push(e.target);
            }
          });
      }

      return Array.from(result);
    };

    const handleExpand = () => {
      const allEdges = getEdges();
      const immediateChildren = allEdges
        .filter((e) => e.source === id)
        .map((e) => e.target);

      const allDescendants = gatherDescendants(immediateChildren, allEdges);

      setNodes((prev) =>
        prev.map((node) => {
          if (allDescendants.includes(node.id)) {
            return { ...node, hidden: !node.hidden };
          }
          return node;
        })
      );
      setEdges((prev) =>
        prev.map((edge) => {
          if (
            allDescendants.includes(edge.source) ||
            allDescendants.includes(edge.target)
          ) {
            return { ...edge, hidden: !edge.hidden };
          }
          return edge;
        })
      );
    };

    return (
      <Box bg="white" borderRadius="md" w="200px" boxShadow="md" fontSize="xs" position="relative">
        <Handle type="target" position={Position.Left} style={{ background: '#555' }} />

        <Box bgColor="var(--active-bg)" color="white" px={2} py={1} borderTopRadius="md">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="10px" fontWeight="bold">
            Reply Button
            </Text>
            <Flex gap={1}>
              <IconButton
                size="xs"
                variant="ghost"
                colorScheme="white"
                icon={<MdExpandMore />}
                aria-label="Expand"
                onClick={handleExpand}
              />
              <IconButton
                size="xs"
                variant="ghost"
                colorScheme="white"
                icon={<IoTrashOutline />}
                onClick={handleDelete}
                aria-label="Delete Node"
              />
            </Flex>
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

          {/* {targetValues.map((val, idx) => (
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
                id={`option_${idx}`}
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
          ))} */}

          {targetValues.map((val, idx) => (
            <Flex key={idx} alignItems="center" mb={1} position="relative">
              {/* Handle on the left border */}
              <Handle
                type="source"
                position={Position.Right}
                id={`option_${idx}`}
                style={{
                  background: '#555',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  position: 'absolute',
                  right: -10, // Moves the dot to the left of the box
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              {/* Input box */}
              <Input
                value={val}
                onChange={(e) => updateTargetValue(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                size="xs"
                fontSize="10px"
                pl="20px" // Padding left to avoid overlap with Handle
              />
            </Flex>
          ))}

        </Box>
      </Box>
    );
  }



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
    {
      label: "Link",
      type: "LinkNode",
      icon: <Icon as={FcPhoneAndroid} mr={2} />,
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
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const template_id = useParams();
  const user = localStorage.getItem('user')
  const admin_id = decrypt(user).id

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
  // save on database
  const saveFlow = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/template/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization : token
          },
          body: JSON.stringify({
            node: nodes,
            edges,
            template_id: template_id.id,
            admin_id:admin_id
          }),
        }
      );
      const data = await response.json();
      // console.log(data)
      navigate('/home/template')
    } catch (error) {
      console.log(error);
      //   showAlert("Failed to add Campaign", "error");
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
            mr={3}
            _hover={{ bgColor: "white" }}
          >
            Back
          </Button>
          <Button
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
    </Box>
  );
};

// Main Component
export default function CreateTemplate() {
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
