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
import { useParams } from "react-router";
import { AppContext } from "../../context/AppContext";
import Card from "../../../Card";

const APP_URL = import.meta.env.VITE_BACKEND_URL;

const SectorProfile = () => {
    const { id } = useParams();
    const [sector, setSector] = useState({});
    const [products, setProducts] = useState([]);

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

    const queryData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            // console.log("Token being sent:", token);

            const response = await axios.get(
                `${APP_URL}/support/getAllproductsBysector?sector_id=${id}`,
                {
                    headers: { Authorization: `${token}` },
                }
            );
            setProducts(response.data.data);
        } catch (err) {
            console.error("Failed to fetch sector data", err);
        }
    };
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
            // console.log(response.data.data, "products")
            setProducts(response.data.data);
        } catch (err) {
            console.error("Failed to fetch sector data", err);
        }
    };

 

    useEffect(() => {
        sectorData();
        queryData();
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
