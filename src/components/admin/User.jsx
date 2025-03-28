import { Avatar, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Card from "../../Card";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

function User({flag}) {

  const navigate = useNavigate();
  const { users, formatDate,fetchAllUser } = useContext(AppContext);
  
  useEffect(() => {
    fetchAllUser();
  }, []);
  

  return (
    <Card>
      <Flex
        w="100%"
        justifyContent="space-between"
       flexDirection={'column'}
        p="5px"
      >
         <Flex w="100%" alignItems={'center'} justifyContent="space-between" gap="10px">
          <Text fontWeight="var(--big-font-weight)" fontSize="var(--semi-big)">
            User
          </Text>
          <Flex gap={2}>
            {/* <InputGroup alignItems="center">
            <InputLeftElement pointerEvents="none" top='auto'>
              <SearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Name, Lead status, Source..."
              fontSize="var(--mini-text)"
              fontWeight="var(--big-font-weight)"
              // height={{ base: "28px", md: "30px", lg: "40px", xl: "40px" }}
              size='sm'
              name="currency"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bgColor={"#F2F4F800"}
              border='1px solid #858585'
              borderRadius="var(--radius)"
            />
            <InputRightElement top='auto'>
              <TbFilterCancel onClick={clearFilter} color="green.500" />
            </InputRightElement>
          </InputGroup> */}

            <Flex
            // display={location.pathname === "/admin/dashboard" ? "none" : "Flex"}
            >
              {/* <Button
                borderRadius="var(--radius)"
                // leftIcon={<IoMdAdd fontSize={"20px"} />}
                _hover={{ bgColor: "var(--active-bg)" }}
                bgColor="var(--active-bg)"
                color="#fff"
                h={"35px"}
                fontSize="var(--mini-text)"
                fontWeight="var(--big-font-weight)"
                // onClick={addNavigateFun}
              >
                Add User
              </Button> */}
            </Flex>
          </Flex>
          
        </Flex>
        <TableContainer
        mt="20px"
        borderRadius="5px 5px 0px 0px"
        //  maxH={flag ? "unset" : "600px"}
        // overflowY={flag ? "unset" : "scroll"}
      >
        <Table size="sm" className='custom-striped-table'>
          <Thead border="0.5px solid #F2F4F8">
            <Tr h="40px" bgColor="var(--table-header-bg)">
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius="5px 0px 0px 0px"
                fontSize="var(--mini-text)"
              >
                ID
              </Th>
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                Name
              </Th>
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                Email
              </Th>
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                Phone no
              </Th>
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                Last Login
              </Th>
              
              {/* {userDetails.type === "admin" || userDetails.active === 1 ? ( */}
                <Th
                  fontWeight="var(--big-font-weight)"
                  color='var(--text-black)'
                  borderRadius="0px 5px 0px 0px"
                  fontSize="var(--mini-text)"
                >Actions</Th>
              {/* ) : (
                ""
              )} */}
            </Tr>
          </Thead>

          <Tbody>
            {users &&
              users.map((user, index) => (
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
                    1
                    {user.id}
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                    // onClick={() => editleads(d.id)} _hover={{ cursor: "pointer", color: "navy" }}
                  >
                    <Flex display={"flex"} alignItems={"center"} gap={"5px"} onClick={() => navigate(`/admin/user/${user.id}`)}>
                      <Avatar size={"xs"} name={user.name} />
                      {user.name}
                    </Flex>
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                    {user.email}
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                    {user.mobile_no}
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                    // onClick={() => fetchNextUrl(d.assigen_to)} _hover={{ cursor: "pointer", color: "navy" }}
                  >
                    {formatDate(user.last_login)}
                  </Td>

                 
                
                </Tr>
              ))} 
          </Tbody>
        </Table>
      </TableContainer>

      </Flex>
    </Card>
  );
}

export default User;
