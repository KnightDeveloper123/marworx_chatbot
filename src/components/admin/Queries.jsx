import React, { useEffect } from 'react'
import Card from '../../Card'
import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react';

function Queries() {

    const { fetchAllQueries,queries,showAlert,loading } = useContext(AppContext);

    useEffect(()=>{
        fetchAllQueries();
    },[])
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
           Queries
          </Text>
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
                Lead
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
                Assigned employee
              </Th>
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                Source
              </Th>
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                category
              </Th>

              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                Next Followup
              </Th>
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                Status
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
            {queries &&
              queries.map((d, index) => (
                <Tr
                //   key={index}
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
                    {/* {d.id} */}
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                    // onClick={() => editleads(d.id)} _hover={{ cursor: "pointer", color: "navy" }}
                  >
                    <Flex display={"flex"} alignItems={"center"} gap={"5px"}>
                        user
                      {/* <Avatar size={"xs"} name={d.name} />
                      {d.name} */}
                    </Flex>
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                    {/* {d.email} */}
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                    {/* {d.phone_no} */}
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                    // onClick={() => fetchNextUrl(d.assigen_to)} _hover={{ cursor: "pointer", color: "navy" }}
                  >
                    <Flex display={"flex"} alignItems={"center"} gap={"5px"} >
                      {/* <Avatar size={"xs"} name={d.emp_name} />
                      {d.emp_name} */}
                    </Flex>
                  </Td>

                 
                
                </Tr>
            ))} 
          </Tbody>
        </Table>
      </TableContainer>

      </Flex>
    </Card>
  )
}

export default Queries