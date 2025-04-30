import { Avatar, Box, Button, Flex, Tab, TabIndicator, TabList, Tabs, Text } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../../context/AppContext";
import Card from "../../../Card";

const APP_URL = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [queries, setQueries] = useState([]);
  const { formatDate, showAlert } = useContext(AppContext);
  const token = localStorage.getItem("token");
  const fetchAllUser = async () => {
    try {
      const response = await fetch(
        `${APP_URL}/admin/getEmployeeById?employee_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        // console.log(result.data)
        setUser(result.data);
      }
    } catch (error) {
      console.log(error);
      showAlert("Internal Server Error!", "error");
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
        `${APP_URL}/support/getAllQueriesByEmployee?employee_id=${id}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      setQueries(response.data.data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  useEffect(() => {
    fetchAllUser();
    queryData();
  }, [id]);

  console.log(queries);

  return (
    <>
      <Card>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={4} ml={5}>
            <Avatar
              size="xl"
              name={user.name}
              maxW={{ base: "100%", sm: "200px" }}
            />
            <Box p="1">
              <Text fontSize="var(--mini-15px)">{user.name}</Text>
              <Text fontSize="var(--mini-15px)">{user.email}</Text>
              <Text fontSize="var(--mini-15px)">{user.mobile_no}</Text>
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
                            {/* <TabPanels>
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
                            </TabPanels> */}
                        </Box>
                    </Tabs>
                </Box>
            </Card>
    </>
  );
};

export default UserProfile;
