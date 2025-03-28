import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import Card from "../../Card";

const APP_URL = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [queries, setQueries] = useState([]);
  const { formatDate,showAlert } = useContext(AppContext);
  const token = localStorage.getItem('token')
  const fetchAllUser = async () => {
    try {
       
        const response = await fetch(`${APP_URL}/employee/getEmployeeById?employee_id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        })
        const result = await response.json();
        if (result.success) {
            // console.log(result.data)
            setUser(result.data)
        }
    } catch (error) {
        console.log(error);
        showAlert("Internal Server Error!", "error")
    }
}



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
    <Box p='1'> 
    <Text fontSize='var(--mini-15px)'>{user.name}</Text>
    <Text fontSize='var(--mini-15px)'>{user.email}</Text>
    <Text fontSize='var(--mini-15px)'>{user.mobile_no}</Text>
    </Box>
  
  </Flex>
  <Flex justifyContent={"lex-start"}>
    <Button
    onClick={()=>window.history.back()}
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

      {queries.map((query, index) => (
        <Flex
          key={index}
          direction="column"
          mt={1}
          boxShadow="2xl"
          p={4}
          rounded="md"
          bg="white"
        >
          <Box p={0}>
            <Text fontWeight='var(--big-font-weight)' fontSize='var(--heading)' mb={2}>
              {query.query}
            </Text>
          </Box>
          <Box display={'flex'} gap='5'>
             <Flex> <Text fontWeight='var(--big-font-weight)' fontSize='var(--mini-text)' mr={1}>Status: </Text> <Text fontSize='var(--mini-text)'> {query.query_status}</Text></Flex>
             <Flex> <Text fontWeight='var(--big-font-weight)' fontSize='var(--mini-text)' mr={1}>Created At: </Text> <Text fontSize='var(--mini-text)'> {formatDate(query.created_at)}</Text></Flex>
             {/* <Flex> <Text fontWeight='var(--big-font-weight)' mr={1}>Assignee: </Text> <Text fontSize='var(--mini-15px)'> {query.assignee_id ? query.assignee_name : "Unassigned"}</Text></Flex> */}
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default UserProfile;
