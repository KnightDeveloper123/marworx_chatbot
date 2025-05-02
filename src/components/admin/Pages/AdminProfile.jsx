import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  SimpleGrid,
  Tab,
  TabIndicator,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
  const [sectors, setSectors] = useState([]);
  const fetchSector = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/sector/get_all_sector?admin_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const result = await response.json();

      setSectors(result.formattedData);
    } catch (error) {
      console.log(error);
      showAlert("Internal server error", "error");
    }
  };
  const [productService, setProductService] = useState([]);
  const fetchProductService = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/product_service/get_all_product?admin_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const result = await response.json();

      setProductService(result.product);
    } catch (error) {
      console.log(error);
      showAlert("Internal server error", "error");
    }
  };
  const [campaign, setCampaign] = useState([]);
  const fetchCampaign = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/campaign/getAllCampaign?admin_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const result = await response.json();
      setCampaign(result.data);
    } catch (error) {
      showAlert("Internal server error", "error");
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
    fetchSector();
    fetchProductService();
    fetchCampaign();
  }, [id]);

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
                      Sector
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
                      Campaigns
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
                  <TableContainer mt="20px" borderRadius="5px 5px 0px 0px">
                    <Table size="sm" className="custom-striped-table">
                      <Thead border="0.5px solid #F2F4F8">
                        <Tr h="40px" bgColor="var(--table-header-bg)">
                          <Th
                            fontWeight="var(--big-font-weight)"
                            color="var(--text-black)"
                            borderRadius="5px 0px 0px 0px"
                            fontSize="var(--mini-text)"
                          >
                            ID
                          </Th>
                          <Th
                            fontWeight="var(--big-font-weight)"
                            color="var(--text-black)"
                            borderRadius=""
                            fontSize="var(--mini-text)"
                          >
                            Name
                          </Th>
                          <Th
                            fontWeight="var(--big-font-weight)"
                            color="var(--text-black)"
                            borderRadius=""
                            fontSize="var(--mini-text)"
                          >
                            Category
                          </Th>
                          <Th
                            fontWeight="var(--big-font-weight)"
                            color="var(--text-black)"
                            borderRadius=""
                            fontSize="var(--mini-text)"
                          >
                            Description
                          </Th>

                          <Th
                            fontWeight="var(--big-font-weight)"
                            color="var(--text-black)"
                            borderRadius=""
                            fontSize="var(--mini-text)"
                          >
                            Icon
                          </Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {sectors &&
                          sectors.map((sector, i) => (
                            <Tr key={sector.id}>
                              <Td _hover={{ cursor: "pointer" }}>S-{i + 1}</Td>
                              <Td _hover={{ cursor: "pointer" }}>
                                {sector.name}
                              </Td>
                              <Td _hover={{ cursor: "pointer" }}>
                                {sector.category}
                              </Td>
                              <Td _hover={{ cursor: "pointer" }}>
                                {sector.description}
                              </Td>

                              <Td
                                color={"#404040"}
                                fontSize="var(--mini-text)"
                                fontWeight="var(--big-font-weight)"
                              >
                                <img
                                  src={`${
                                    import.meta.env.VITE_BACKEND_URL
                                  }/sectors/${sector.icon}`}
                                  alt={sector.name}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    objectFit: "cover",
                                  }}
                                />
                              </Td>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>

                <TabPanel>
                  <SimpleGrid
                    spacing={4}
                    templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                    {productService.map((product, index) => (
                      <Card key={index}>
                        <Image
                          src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                            product.image
                          }`}
                        />
                        <Text
                          fontWeight="var(--big-font-weight)"
                          textAlign={"center"}
                          mt={2}
                        >
                          {product.name}
                        </Text>
                        <Text textAlign={"center"} mt={2}>
                          {product.description}
                        </Text>
                      </Card>
                    ))}
                  </SimpleGrid>
                </TabPanel>

                <TabPanel>
                    <TableContainer
                            mt="20px"
                            borderRadius="5px 5px 0px 0px"
                          //  maxH={flag ? "unset" : "600px"}
                          // overflowY={flag ? "unset" : "scroll"}
                          >
                            <Table size="sm" className="custom-striped-table">
                              <Thead border="0.5px solid #F2F4F8">
                                <Tr h="40px" bgColor="var(--table-header-bg)">
                                  <Th
                                    fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    borderRadius="5px 0px 0px 0px"
                                    fontSize="var(--mini-text)"
                                  >
                                    ID
                                  </Th>
                                  <Th
                                    fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    borderRadius=""
                                    fontSize="var(--mini-text)"
                                  >
                                    channel
                                  </Th>
                                  <Th
                                    fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    borderRadius=""
                                    fontSize="var(--mini-text)"
                                  >
                                    Campaign name
                                  </Th>
                                  <Th
                                    fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    borderRadius=""
                                    fontSize="var(--mini-text)"
                                  >
                                    Template name
                                  </Th>
                                  <Th
                                    fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    borderRadius=""
                                    fontSize="var(--mini-text)"
                                  >
                                    Template type
                                  </Th>
                                  <Th
                                    fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    borderRadius=""
                                    fontSize="var(--mini-text)"
                                  >
                                    Start date
                                  </Th>
                                  <Th
                                    fontWeight="var(--big-font-weight)"
                                    color="var(--text-black)"
                                    borderRadius=""
                                    fontSize="var(--mini-text)"
                                  >
                                    Status
                                  </Th>
                                  
                                </Tr>
                              </Thead>
                  
                              <Tbody>
                                {campaign &&
                                  campaign.map((d, index) => (
                                    <Tr
                                      key={index}
                                      border="0.5px solid #F2F4F8"
                                      h="40px"
                                      textAlign="start"
                                    >
                                      <Td
                                        border="0.5px solid #F2F4F8"
                                        color={"#404040"}
                                        fontSize="var(--mini-text)"
                                        fontWeight="var(--big-font-weight)"
                                      >
                                        C-{index+1}
                                      </Td>
                  
                                      <Td
                                        border="0.5px solid #F2F4F8"
                                        color={"#404040"}
                                        fontSize="var(--mini-text)"
                                        fontWeight="var(--big-font-weight)"
                                      >
                                        {d.channel_name}
                                      </Td>
                                      <Td
                                        border="0.5px solid #F2F4F8"
                                        color={"#404040"}
                                        fontSize="var(--mini-text)"
                                        fontWeight="var(--big-font-weight)"
                                      >
                                        {d.campaign_name}
                                      </Td>
                                      <Td
                                        border="0.5px solid #F2F4F8"
                                        color={"#404040"}
                                        fontSize="var(--mini-text)"
                                        fontWeight="var(--big-font-weight)"
                                      >
                                        {d.template_name}
                                      </Td>
                                      <Td
                                        border="0.5px solid #F2F4F8"
                                        color={"#404040"}
                                        fontSize="var(--mini-text)"
                                        fontWeight="var(--big-font-weight)"
                                      >
                                        {d.template_type}
                                      </Td>
                                      <Td
                                        border="0.5px solid #F2F4F8"
                                        color={"#404040"}
                                        fontSize="var(--mini-text)"
                                        fontWeight="var(--big-font-weight)"
                                      >
                                        {formatDate(d.created_at)}
                                      </Td>
                                      <Td
                                        border="0.5px solid #F2F4F8"
                                        color={"#404040"}
                                        fontSize="var(--mini-text)"
                                        fontWeight="var(--big-font-weight)"
                                      >
                                        {d.is_status}
                                      </Td>
                                   
                                    </Tr>
                                  ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
      </Card>
    </>
  );
};

export default UserProfile;
