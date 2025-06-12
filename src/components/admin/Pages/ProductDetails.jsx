import { Avatar, Box, Flex, Image, SimpleGrid, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Card from "../../../Card";
import TemViw from "../../../assets/template.png";
import { AppContext } from "../../context/AppContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [sectors, setSectors] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [productBots, setProductBots] = useState([]);
    const {timeAgo }=useContext(AppContext);

    const fetchLinkedBots = async () => {
        try {
            const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product_service/get_all_sector_bots?product_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            const result = await data.json();
            setProductBots(result?.product);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchLinkedSectors = async () => {
        try {
            const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product_service/get_all_sector?product_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            const result = await data.json();
            setSectors(result?.product);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLinkedBots();
        fetchLinkedSectors();
    }, [])


    return (

        <Box>
            <Box>
                <Card>
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
                                                Sectors
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
                                        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' _hover={{ cursor: 'pointer' }}>
                                            {sectors.map((sector, index) => (
                                                <Card key={index}>
                                                    <Image onClick={() => navigate('/home/sector')} src={`${import.meta.env.VITE_BACKEND_URL}/sectors/${sector.icon}`} />
                                                    <Text textAlign="center" mt={2} >{sector.s_name}</Text>
                                                    <Text>{sector.description}</Text>
                                                </Card>
                                            ))}
                                        </SimpleGrid>
                                    </TabPanel>

                                    <TabPanel>
                                        <SimpleGrid spacing={4} _hover={{ cursor: "pointer" }}>
                                            {productBots?.map((bot, index) => (
                                                <Card key={index}>
                                                    <Flex
                                                        justify="space-between"
                                                        align="center"
                                                        //   p={4}
                                                        gap="15px"
                                                    >
                                                        <Flex gap={2}>
                                                            <Box spacing="3px">
                                                                <Avatar
                                                                    src={TemViw}
                                                                    onClick={() => navigate(`/view/${bot.id}`)}
                                                                />
                                                            </Box>
                                                            <Box spacing="3px">
                                                                <Text textAlign="start">{bot?.nodes?.[0]?.data?.label || null}</Text>
                                                                <Text textAlign="start" fontSize={"10px"}>
                                                                    {timeAgo(bot.createdAt)}
                                                                </Text>
                                                            </Box>
                                                        </Flex>
                                                    </Flex>
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
            </Box>
        </Box>
    )
}

export default ProductDetails
