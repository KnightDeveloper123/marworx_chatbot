import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Collapse,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
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
  Select,
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
import { IoNotifications, IoTrashOutline } from "react-icons/io5";
import "reactflow/dist/style.css";
import { useParams, useNavigate } from "react-router-dom";
import { decrypt } from "../../utils/security";
import { LiaTrashAlt } from "react-icons/lia";
import { AppContext } from "../../context/AppContext";
import { RiAiGenerate2 } from "react-icons/ri";
// Utility for node ID generation
let id = 1;
// const getId = () => `${++id}`;
const getId = () => crypto.randomUUID();
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
    // return (
    //   <Box width={'200px'} bgColor={'white'}>
    //     {/* Handles for connecting nodes */}
    //     <Handle type="target" position={Position.Top} />
    //     <Handle type="source" position={Position.Bottom} />

    //     {/* Node Title */}
    //     <Box>
    //       {data.label || 'Ask a Question'}
    //     </Box>

    //     <Box display={'flex'} flexDirection={'column'} padding={"10px"} gap={'3px'}>
    //       {/* Question Input */}
    //       <Input
    //         type="text"

    //         placeholder="Type your question"
    //         value={question}
    //         onChange={(e) => setQuestion(e.target.value)}
    //       />

    //       {/* Ask Button */}
    //       <Button size={"xs"}
    //         onClick={handleAsk}
    //       >
    //         Ask
    //       </Button>

    //       {/* Delete Button */}
    //       <Button 
    //       size={"xs"}
    //         onClick={handleDelete}
    //       >
    //         Delete
    //       </Button>
    //     </Box>

    //     {/* Show Answer */}
    //     {answer && (
    //       <div className="mt-3 text-sm bg-gray-100 p-2 rounded">
    //         <span className="font-semibold text-gray-700">Answer:</span> {answer}
    //       </div>
    //     )}
    //   </Box>
    // );
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
            <Text fontSize="10px" fontWeight="bold" pl={'8px'}>
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
            <Text fontSize="10px" fontWeight="bold" pl={'8px'}>
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
  },



  // GoogleSheetsNode: ({ id, data }) => {
  //   const [file, setFile] = useState(data.file || null);
  //   const { setNodes } = useReactFlow();

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setNodes((nds) =>
  //         nds.map((node) =>
  //           node.id === id ? { ...node, data: { ...node.data, file } } : node
  //         )
  //       );
  //     }, 500);

  //     return () => clearTimeout(timer);
  //   }, [file, id, setNodes]);

  //   const handleFileChange = (e) => {
  //     const uploadedFile = e.target.files[0];
  //     if (uploadedFile) {
  //       const baseName = uploadedFile.name.split('.')[0]; // get name without extension
  //       const formData = new FormData();
  //       formData.append("file", uploadedFile);

  //       fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/upload-sheet?fileName=${baseName}`, {
  //         method: "POST",
  //         body: formData,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setFile(data.fileName); // Store the uploaded file name
  //           setNodes((nds) =>
  //             nds.map((node) =>
  //               node.id === id ? { ...node, data: { ...node.data, file: data.fileName } } : node
  //             )
  //           );
  //         })
  //         .catch(console.error);
  //     }
  //   };


  //   const handleDeleteFile = () => {
  //     setFile(null);
  //     // Optionally: call backend to delete uploaded file using fetch()
  //   };

  //   const handleDeleteNode = () => {
  //     setNodes((nds) => nds.filter((node) => node.id !== id));
  //   };

  //   return (
  //     <Box bg="white" borderRadius="4px">
  //       <Handle type="target" position="left" style={{ background: "#555" }} />
  //       <Box color="white" p={0.5} borderRadius="5px" bgColor="var(--active-bg)">
  //         <Flex justifyContent="space-between" alignItems="center">
  //           <Text fontSize="10px" fontWeight="bold" pl={'8px'}>Google Sheet</Text>
  //           <IconButton
  //             size="xs"
  //             variant="ghost"
  //             colorScheme="white"
  //             icon={<IoTrashOutline />}
  //             onClick={handleDeleteNode}
  //             aria-label="Delete Node"
  //           />
  //         </Flex>
  //       </Box>
  //       <Divider />

  //       <Input
  //         type="file"
  //         accept=".xlsx,.xls,.csv"
  //         onChange={handleFileChange}
  //         fontSize="var(--text-12px)"
  //         fontWeight="var(--big-font-weight)"
  //         size="sm"
  //       />

  //       {file && (
  //         <Box mt={2} fontSize="xs" color="gray.700">
  //           <Flex justifyContent="space-between" alignItems="center">
  //             <a
  //               href={`${import.meta.env.VITE_BACKEND_URL}/uploadFiles/${file}`}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               style={{ textDecoration: "underline", color: "#3182ce" }}
  //             >
  //               📄 {file}
  //             </a>
  //             <IconButton
  //               size="xs"
  //               variant="ghost"
  //               colorScheme="red"
  //               icon={<IoTrashOutline />}
  //               onClick={handleDeleteFile}
  //               aria-label="Delete File"
  //             />
  //           </Flex>
  //         </Box>
  //       )}

  //       <Handle type="source" position="bottom" style={{ background: "#555" }} />
  //     </Box>
  //   );
  // },

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
            accept=".xlsx,.xls,.csv,.pdf,.txt"
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
    const { id: bot_id } = useParams();
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
      // handleExpand(idx);
    }, [targetValues]);

    const handleExpand = (idx) => {
      if (typeof idx !== "number") {
        console.log("handleExpand: Invalid index", idx);
        return;
      }
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
            <Text fontSize="10px" fontWeight="bold" pl={'8px'} >
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

              />

              <IconButton
                size="xs"
                aria-label="Open Bot Options"
                icon={<MdExpandMore />}
                onClick={() => handleExpand(idx)}
                ml={1}
              />

              <IconButton
                size="xs"
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
                {bots.map((bot) => {
                  let label = null;
                  try {
                    const parsedNodes =
                      typeof bot.nodes === "string" ? JSON.parse(bot.nodes) : bot.nodes;
                    label = parsedNodes?.[0]?.data?.label || null;
                  } catch (error) {
                    console.error("Invalid bot.nodes JSON", error);
                  }
                  return (
                    <Button
                      key={bot.id}
                      size="sm"
                      onClick={() => handleBotSelect(bot)} >
                      {label}
                    </Button>
                  )
                })}
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
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
          ))}
        </Box>
      </Box>
    );
  },

MultiContentNode: ({ id, data }) => {
    const { setNodes } = useReactFlow();
    const [sections, setSections] = useState(data.sections || []);
    const [newType, setNewType] = useState("");

    // Update node data on change
    useEffect(() => {
      const timer = setTimeout(() => {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id ? { ...node, data: { ...node.data, sections } } : node
          )
        );
      }, 300);
      return () => clearTimeout(timer);
    }, [sections]);

    const addSection = () => {
      if (!newType) return;
      const emptyValue =
        newType === "link"
          ? { text: "", url: "" }
          : newType === "price"
            ? "₹0"
            : "";
      setSections([...sections, { type: newType, value: emptyValue }]);
      setNewType("");
    };

    const updateSection = (index, newValue) => {
      const updated = [...sections];
      updated[index].value = newValue;
      setSections(updated);
    };

    const removeSection = (index) => {
      const updated = [...sections];
      updated.splice(index, 1);
      setSections(updated);
    };

    const handleDelete = () => {
      setNodes((nodes) => nodes.filter((n) => n.id !== id));
    };

    return (
      <Box bg="white" borderRadius="md" p={2} w="250px" boxShadow="md">
        <Handle type="target" position="top" style={{ background: "#555" }} />

        <Box bgColor="var(--active-bg)" color="white" borderRadius="md" p={1}>
          <Flex justifyContent="space-between">
            <Text fontSize="sm" fontWeight="bold">Multi-Content Node</Text>
            <IconButton
              icon={<IoTrashOutline />}
              size="xs"
              variant="ghost"
              colorScheme="white"
              onClick={handleDelete}
              aria-label="Delete Node"
            />
          </Flex>
        </Box>

        {/* Section Renderer */}
        <VStack align="start" spacing={3} mt={2}>
          {sections.map((section, idx) => (
            <Box key={idx} width="100%">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="xs" fontWeight="bold">{section.type.toUpperCase()}</Text>
                <IconButton
                  icon={<IoTrashOutline />}
                  size="xs"
                  onClick={() => removeSection(idx)}
                  aria-label="Delete Section"
                />
              </Flex>

              {section.type === "text" && (
                <Textarea
                  value={section.value}
                  onChange={(e) => updateSection(idx, e.target.value)}
                  placeholder="Enter description"
                  size="xs"
                  fontSize="10px"
                />
              )}

              {section.type === "image" && (
                <>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    size="xs"
                    fontSize="10px"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file || !file.type.startsWith("image/")) {
                        alert("Only JPG/PNG images are allowed");
                        return;
                      }

                      const formData = new FormData();
                      const fileName = Date.now();

                      try {
                        const res = await fetch(
                          `${import.meta.env.VITE_BACKEND_URL}/bots/upload-image?fileName=${fileName}`,
                          {
                            method: "POST",
                            body: (() => {
                              formData.append("file", file);
                              return formData;
                            })()
                          }
                        );

                        const result = await res.json();
                        const uploadedUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/${result.fileName}`;
                        updateSection(idx, uploadedUrl);
                      } catch (err) {
                        alert("❌ Image upload failed");
                        console.error(err);
                      }
                    }}
                  />
                  {section.value && (
                    <Image src={section.value} alt="Uploaded" w="100%" borderRadius="md" />
                  )}
                </>
              )}


              {section.type === "video" && (
                <>
                  <Input
                    type="file"
                    accept="video/mp4"
                    size="xs"
                    fontSize="10px"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file || file.type !== "video/mp4") {
                        alert("Only MP4 videos are allowed");
                        return;
                      }

                      const formData = new FormData();
                      const fileName = Date.now(); // Unique filename

                      // Note: Use fileName as query param (your backend expects it)
                      try {
                        const res = await fetch(
                          `${import.meta.env.VITE_BACKEND_URL}/bots/upload-video?fileName=${fileName}`,
                          {
                            method: "POST",
                            body: (() => {
                              formData.append("video", file);
                              return formData;
                            })()
                          }
                        );

                        const result = await res.json();
                        const uploadedUrl = `${import.meta.env.VITE_BACKEND_URL}/videoFiles/${result.fileName}`;
                        updateSection(idx, uploadedUrl);
                      } catch (err) {
                        alert("❌ Video upload failed");
                        console.error(err);
                      }
                    }}
                  />

                  {section.value && (
                    <video src={section.value} controls width="100%" />
                  )}
                </>
              )}


              {section.type === "file" && (
                <>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                    size="xs"
                    fontSize="10px"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      const formData = new FormData();
                      const fileName = Date.now();

                      try {
                        const res = await fetch(
                          `${import.meta.env.VITE_BACKEND_URL}/bots/upload-sheet?fileName=${fileName}`,
                          {
                            method: "POST",
                            body: (() => {
                              formData.append("file", file);
                              return formData;
                            })()
                          }
                        );

                        const result = await res.json();
                        const uploadedUrl = `${import.meta.env.VITE_BACKEND_URL}/uploadFiles/${result.fileName}`;
                        updateSection(idx, uploadedUrl);
                      } catch (err) {
                        alert("❌ File upload failed");
                        console.error(err);
                      }
                    }}
                  />
                  {section.value && (
                    <a
                      href={section.value}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: "10px", color: "blue" }}
                    >
                      📎 Download File
                    </a>
                  )}
                </>
              )}

              {section.type === "price" && (
                <Input
                  size="xs"
                  fontSize="10px"
                  placeholder="Price"
                  value={section.value}
                  onChange={(e) => updateSection(idx, e.target.value)}
                />
              )}

              {section.type === "link" && (
                <>
                  <Input
                    size="xs"
                    fontSize="10px"
                    placeholder="Link Text"
                    value={section.value.text}
                    onChange={(e) =>
                      updateSection(idx, { ...section.value, text: e.target.value })
                    }
                    mb={1}
                  />
                  <Input
                    size="xs"
                    fontSize="10px"
                    placeholder="Link URL"
                    value={section.value.url}
                    onChange={(e) =>
                      updateSection(idx, { ...section.value, url: e.target.value })
                    }
                  />
                  {section.value.url && (
                    <a
                      href={section.value.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: "10px", color: "#3182ce", textDecoration: "underline" }}
                    >
                      🔗 {section.value.text || "Visit Link"}
                    </a>
                  )}
                </>
              )}
            </Box>
          ))}
        </VStack>

        {/* Add New Content Section */}
        <Divider my={3} />
        <Flex gap={2}>
          <Select
            size="xs"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="Add content"
            fontSize="10px"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="link">Link</option>
            <option value="file">File</option>
            <option value="price">Price</option>
          </Select>
          <Button size="xs" fontSize="10px" onClick={addSection}>
            Add
          </Button>
        </Flex>

        <Handle type="source" position="bottom" style={{ background: "#555" }} />
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
    {
      label: "Link",
      type: "LinkNode",
      icon: <Icon as={FaRegFileVideo} mr={2} />,
    },
    {
      label: "dynamic",
      type: "MultiContentNode",
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
  // console.log("id",id)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isNumOpen,
    onOpen: onNumOpen,
    onClose: onNumClose,
  } = useDisclosure();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  const { screenToFlowPosition } = useReactFlow();
  const { phoneNumbers, getAllNumbers, deleteProduct, getAllDeleteProduct, setDeleteProduct } = useContext(AppContext);

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
        navigate("/home/bot");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBot();
    getAllNumbers();
    getAllDeleteProduct();
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
  const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure()
  // const [Notificati,setNotification]=useState(false)
  const onNotification = () => {
    onNotificationOpen(true)

    const updatedProducts = deleteProduct.map((item) => ({
      ...item,
      seen: true,
    }));
    setDeleteProduct(updatedProducts);
  };




  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isbotOpen, onOpen: onbotOpen, onClose: onbotClose } = useDisclosure()
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessageToBot = async () => {
    if (!input.trim()) return;

    // Add user message to local chat first
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: input }]);

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        object: 'whatsapp_business_account',
        entry: [{
          changes: [{
            value: {
              messages: [{
                from: "user123",
                type: "text",
                text: { body: input }
              }]
            }
          }]
        }]
      }),
    });

    const data = await response.json();

    // Add bot responses to chat
    const botMessages = data?.messages || [];
    setMessages(prev => [
      ...prev,
      ...botMessages.map((msg, index) => ({
        id: Date.now() + index + 1,
        sender: 'bot',
        text:
          msg.type === 'text'
            ? msg.content
            : msg.type === 'list'
              ? `${msg.label}\n${msg.options.join('\n')}`
              : msg.type === 'buttons'
                ? `${msg.label}\n${msg.options.join(' | ')}`
                : msg.type === 'link'
                  ? `${msg.label}: ${msg.url}`
                  : msg.type === 'image' || msg.type === 'video' || msg.type === 'document'
                    ? `${msg.caption || 'Media'}: ${msg.url}`
                    : '...'
      }))
    ]);

    setInput('');
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

          {/* <Button
            borderRadius="var(--radius)"
            _hover={{ bgColor: "var(--active-bg)" }}
            bgColor="var(--active-bg)"
            color="#fff"
            h={"35px"}
            fontSize="var(--mini-text)"
            fontWeight="var(--big-font-weight)"
            onClick={onbotOpen}
          >
            Test bot
          </Button> */}
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
          <Box _hover={{ cursor: "pointer" }}>
            <Button
              borderRadius="var(--radius)"
              _hover={{ bgColor: "var(--active-bg)" }}
              bgColor="var(--active-bg)"
              color="#fff"
              h={"35px"}
              fontSize="var(--mini-text)"
              fontWeight="var(--big-font-weight)"
              paddingInlineEnd={'6px'}
              leftIcon={<IoNotifications color="#fff" />}
              onClick={onNotification}
            ></Button>
            {deleteProduct?.some(item => !item.seen) && (
              <Badge
                position="absolute"
                top="3px"
                right="15px"
                borderRadius="full"
                bg="red.500"
                color="white"
                fontSize="0.7rem"
                h="18px"
                minW="18px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
              >
                {deleteProduct?.filter(item => !item.seen).length}

              </Badge>
            )}
            <Drawer placement={"right"} onClose={onNotificationClose} isOpen={isNotificationOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Delete Product</DrawerHeader>
                <DrawerBody p='-0.5'>
                  {deleteProduct.map((item, i) => {
                    return (
                      <Box>
                        <Flex justifyContent='start' alignItems={'center'} gap={'1px'}>
                          <Box p='5px'>
                            <Avatar src={`${import.meta.env.VITE_BACKEND_URL}/products/${item.image}`} />
                          </Box>
                          <Box p={2}>
                            <Text fontSize="var(--mini-text)"
                              fontWeight="var(--big-font-weight)">{item.name}</Text>
                            <Text fontSize="var(--mini-text)">{item.description}</Text>
                          </Box>
                        </Flex>
                        <Divider />
                      </Box>
                    )
                  })}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
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




      {/* <Modal isOpen={isbotOpen} onClose={onbotClose} size="full" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chat Assistant1</ModalHeader>
          <ModalCloseButton />

          <ModalBody p={0}>
            <Flex h="80vh">
     
              <Box w="250px" bg="gray.100" p={4} borderRight="1px solid #ccc">
                <VStack align="stretch" spacing={4}>
                  <Text fontWeight="bold">Sectors</Text>
                  <Button variant="ghost">Healthcare</Button>
                  <Button variant="ghost">Education</Button>
                  <Button variant="ghost">Retail</Button>
              
                </VStack>
              </Box>

             
              <Flex flex="1" direction="column" p={4}>
                <VStack spacing={3} align="stretch" flex="1" overflowY="auto">
                  {messages.map((msg) => (
                    <Flex key={msg.id} justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
                      <Box
                        bg={msg.sender === 'user' ? 'blue.500' : 'gray.200'}
                        color={msg.sender === 'user' ? 'white' : 'black'}
                        px={4}
                        py={2}
                        borderRadius="xl"
                        maxW="70%"
                      >
                        <Text fontSize="sm">{msg.text}</Text>
                      </Box>
                    </Flex>
                  ))}
                </VStack>

                <HStack mt={4}>
                  <Input
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessageToBot()}
                  />
                  <Button colorScheme="blue" onClick={sendMessageToBot}>
                    Send
                  </Button>
                </HStack>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal> */}

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
