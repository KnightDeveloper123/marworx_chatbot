import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../context/AppContext";

const APP_URL = import.meta.env.VITE_BACKEND_URL

const UserProfile = () => {
    const { id } = useParams();
    const [user,setUser]=useState({});
    const [queries,setQueries]=useState([]);

    const { formatDate } = useContext(AppContext);

    const userData=async()=>{
        try {
            const response = await axios.get(`${APP_URL}/user/getUser/${id}`);
            setUser(response.data.data[0]);
        } catch (err) {
            console.error("Failed to fetch user data");
        }
    }

    const queryData=async()=>{
        try {
            const token = localStorage.getItem("token"); 
        if (!token) {
            console.error("No token found");
            return;
        }
        // console.log("Token being sent:", token);

            const response = await axios.get(`${APP_URL}/support/getAllQueriesByUser?user_id=${id}`, {
                headers: { Authorization: `${token}` } 
            });
            setQueries(response.data.data);
        } catch (err) {
            console.error("Failed to fetch user data", err);
        }
    }
    console.log(queries);
    

    useEffect(() => {
        userData();
        queryData();
    }, [id]);
    
    console.log(queries);
    
    return (
        <>
        <Card alignItems="center"
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  {/* <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  /> */}
  <Avatar size='xl' ml={5}
    maxW={{ base: '100%', sm: '200px' }} name={user.name} />

  <Stack>
    <CardBody>
      <Heading size='md'> {user.name}  </Heading>

      <Text py='2'>
        {user.email}
      </Text>
      <Text py='2'>
        {user.mobile_no}
      </Text>
    </CardBody>
  </Stack>
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
      <Heading size="md" mb={3}>{query.query}</Heading>
    </Box>
    <Box>
      <Flex>
        <Text mr={5}>Status: {query.query_status}</Text>
        <Text mr={5}>Created At: {formatDate(query.created_at)}</Text>
        <Text mr={5}>Assignee: {query.assignee_id ? query.assignee_id : "Unassigned"}</Text>
      </Flex>
    </Box>
  </Flex>
))}

</>
    )
}

export default UserProfile;