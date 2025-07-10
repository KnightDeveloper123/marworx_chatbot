import React from "react";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    Heading,
    Image,
    SimpleGrid,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../../context/AppContext";
import Card from "../../../Card";
import TemViw from "../../../assets/template.png"

const APP_URL = import.meta.env.VITE_BACKEND_URL;

const SectorProfile = () => {
    const { id } = useParams();
    const [sector, setSector] = useState({});
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const sectorData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const response = await axios.get(`${APP_URL}/sector/sectort_by_id?sector_id=${id}`, {
                headers: { Authorization: `${token}` },
            });
            setSector(response.data.data);
            // console.log(response.data.data);

        } catch (err) {
            console.error("Failed to fetch sector data");
        }
    };

    // const queryData = async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             console.error("No token found");
    //             return;
    //         }
    //         // console.log("Token being sent:");

    //         const response = await axios.get(

    //             `${APP_URL}/support/getAllproductsBysector?sector_id=${id}`,
    //             {
    //                 headers: { Authorization: `${token}` },
    //             }
    //         );
    //         setProducts(response.data.data);
    //         // console.log("product", response.data.data)
    //     } catch (err) {
    //         console.error("Failed to fetch sector data", err);
    //     }
    // };

    const getProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.get(
                `${APP_URL}/sector/get_all_product_sector?sector_id=${id}`,
                {
                    headers: { Authorization: `${token}` },
                }
            );
            // console.log(response.data.data)
            setProducts(response.data.data);
        } catch (err) {
            console.error("Failed to fetch sector data", err);
        }
    };

    // const [linkedBots, setLinkedBots] = useState([])
    // const fetchLinkedBots = async () => {
    //     try {
    //         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/get_linked_bot?sector_id=${id}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: token
    //             }
    //         })

    //         const result = await res.json();
    //         console.log(result.data)
    //         let botsData = result?.data?.bots || [];

    //         console.log("bot type", typeof botsData, botsData.length)

    //         // if (botsData.length === 1 && typeof botsData[0] === "string") {
    //         //     botsData = JSON.parse(botsData[0]);

    //         // }
    //         console.log("bot type after", typeof botsData, botsData.length)

    //         if (Array.isArray(botsData[0])) {
    //             botsData = botsData[0];
    //         }

    //         console.log("Final parsed bots:", botsData);

    //         setLinkedBots(botsData);
    //     } catch (error) {
    //         console.error("Failed to fetch bots:", error);
    //     }
    // };



    const [linkedBots, setLinkedBots] = useState([]);

    const fetchLinkedBots = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/get_linked_bot?sector_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            });

            const result = await res.json();
            console.log("Raw response data:", result.data);

            let botsData = result?.data?.bots || [];


            // ✅ Parse bots if it's a JSON string
            if (typeof botsData === "string") {
                try {
                    botsData = JSON.parse(botsData);
                } catch (err) {
                    console.error("❌ Failed to parse bots JSON string:", err);
                    botsData = [];
                }
            }

            console.log("✅ Parsed bots:", botsData);
            setLinkedBots(botsData); // ✅ Store as array, not string
        } catch (error) {
            console.error("Failed to fetch bots:", error);
        }
    };





    // const fetchLinkedBots = async () => {
    //     try {
    //         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/get_linked_bot?sector_id=${id}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: token
    //             }
    //         });

    //         const result = await res.json();
    //         let botsData = result?.data?.bots || [];
    //         console.log("type of bot", typeof botsData)
    //         // ✅ Only needed if backend is still sending stringified JSON
    //         if (typeof botsData === "string") {
    //             botsData = JSON.parse(botsData);
    //         }
    //         console.log("type of bot after", botsData)

    //         setLinkedBots(Array.isArray(botsData) ? botsData : []);
    //     } catch (error) {
    //         console.error("Failed to fetch bots:", error);
    //     }
    // };




    useEffect(() => {
        fetchLinkedBots();
        // if (id) {
        //     fetchLinkedBots()
        // }

    }, [])


    useEffect(() => {
        sectorData();
        // queryData();
        getProducts();
        // getAllChat();
    }, [id]);

    // console.log(chatTitle)
    return (
        <>
            <Card>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Flex alignItems={"center"} gap={4} ml={5}>
                        <Avatar
                            size="xl"
                            name={sector.name}
                            maxW={{ base: "100%", sm: "200px" }}
                        />
                        <Box p="1">
                            <Text fontSize="var(--mini-15px)">{sector.name}</Text>
                            <Text fontSize="var(--mini-15px)">{sector.category}</Text>
                            <Text fontSize="var(--mini-15px)">{sector.description}</Text>
                        </Box>
                    </Flex>
                    <Flex justifyContent={"lex-start"}>
                        <Button
                            onClick={() => window.history.back()}
                            type="button"
                            size={"sm"}
                            fontSize={"13px"}
                            border={"1px solid #FF5722"}
                            textColor={"#FF5722"}
                            bgColor={"white"}
                            mr={3}
                            _hover={{ bgColor: "white" }} // Optional hover effect
                        >
                            Back
                        </Button>
                    </Flex>
                </Flex>
            </Card>

            <Divider py="2" />
            <Card >
                <Box w="100%" overflow="auto">
                    <Tabs position="relative" variant="unstyled">
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            bg={"#fff"}
                            p={"3px"}
                            borderRadius="10px"
                        >
                            <TabList
                                justifyContent={{ base: "center", md: "start" }}
                                gap="2rem"
                                p={{ base: "0", md: "0.2rem 6rem" }}
                            >
                                <Tab>
                                    {" "}
                                    <Box
                                        // as="button"
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        gap="3px"
                                    >
                                        {/* <ImProfile fontSize="20px" /> */}
                                        <Text textAlign="center" fontSize="13px" fontWeight="500">
                                            Products
                                        </Text>
                                    </Box>
                                </Tab>
                                <Tab>
                                    {" "}
                                    <Box
                                        // as="button"
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        gap="3px"
                                    >
                                        {/* <ImProfile fontSize="20px" /> */}
                                        <Text textAlign="center" fontSize="13px" fontWeight="500">
                                            Bots
                                        </Text>
                                    </Box>
                                </Tab>
                            </TabList>
                        </Box>
                        <TabIndicator
                            mt="-1.5px"
                            height="2px"
                            bg="var(--active-bg)"
                            borderRadius="1px"
                        />
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            bg={"#fff"}
                            p="3px"
                            borderRadius="10px"
                            mt="10px"
                        >
                            <TabPanels>
                                <TabPanel>

                                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' fontSize="var(--mini-text)"
                                        fontWeight="var(--big-font-weight)">
                                        {products.map((product, index) => (
                                            <Card key={index}>
                                                <Image src={`${import.meta.env.VITE_BACKEND_URL}/products/${product.image}`} />
                                                <Text fontWeight="var(--big-font-weight)" textAlign={"center"} mt={2}>{product.product_name}</Text>
                                                <Text textAlign={"center"} mt={2}>{product.product_description}</Text>
                                            </Card>
                                        ))}
                                    </SimpleGrid>
                                </TabPanel>
                                <TabPanel>
                                    {/* <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' _hover={{ cursor: 'pointer' }}>
                                        {linkedBots.map((bot, index) => (
                                            <Card key={index}>
                                                {console.log(bot)}
                                                {console.log(navigate(`/view/${bot.id}`))}
                                                <Image src={TemViw} onClick={() => navigate(`/view/${bot.id}`)} />

                                                <Text textAlign="center" mt={2} >{bot.name}</Text>
                                            </Card>
                                        ))}
                                    </SimpleGrid> */}

                                    <Box>
                                       

                                   
                                            {Array.isArray(linkedBots) && linkedBots.length > 0 ? (
                                                <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
                                                    {linkedBots.map((bot, index) => {
                                                        console.log("bot",bot.id)
                                                        return (
                                                            <Card key={index} p={3} _hover={{ cursor: "pointer" }}>
                                                                <Flex justify="space-between" align="center" gap="15px">
                                                                    <Flex gap={3}>
                                                                        <Box>
                                                                            <Avatar
                                                                                src={TemViw}
                                                                                onClick={() => navigate(`/view/${bot.id}`)}
                                                                                name={bot.name || "Bot"}
                                                                            />
                                                                        </Box>
                                                                        <Box>
                                                                            <Text fontSize="10px" color="gray.500">{bot.name}</Text>
                                                                        </Box>
                                                                    </Flex>
                                                                </Flex>
                                                            </Card>
                                                        );
                                                    })}
                                                </SimpleGrid>
                                            ) : (
                                                <Text textAlign="center" mt={4} color="gray.600">
                                                    No linked bots available.
                                                </Text>
                                            )}
                                


                                    </Box>



                                </TabPanel>
                                <TabPanel>
                                </TabPanel>
                            </TabPanels>
                        </Box>
                    </Tabs>
                </Box>
            </Card>
        </>
    );
};

export default SectorProfile;
