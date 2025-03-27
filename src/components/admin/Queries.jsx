import React, { useEffect } from 'react'
import Card from '../../Card'
import { Avatar, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react';

function Queries() {

    const { fetchAllQueries,queries,formatDate } = useContext(AppContext);

    useEffect(()=>{
        fetchAllQueries();
    },[])
    console.log(queries)
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
                query
              </Th>
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                query status
              </Th>
             
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >
                Assignee
              </Th>
             
              <Th
                fontWeight="var(--big-font-weight)"
                color='var(--text-black)'
                borderRadius=""
                fontSize="var(--mini-text)"
              >               
              created at

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
                    {d.id}
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                    // onClick={() => editleads(d.id)} _hover={{ cursor: "pointer", color: "navy" }}
                  >
                   
                      {d.query}
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                    {d.query_status}
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                    // onClick={() => fetchNextUrl(d.assigen_to)} _hover={{ cursor: "pointer", color: "navy" }}
                  >
                    <Flex display={"flex"} alignItems={"center"} gap={"5px"} >
                      <Avatar size={"xs"} name={'animesh'} />
                      {d.assignee_id}
                    </Flex>
                  </Td>
                  <Td
                    border="0.5px solid #F2F4F8"
                    color={"#404040"}
                    fontSize="var(--mini-text)"
                    fontWeight="var(--big-font-weight)"
                  >
                    {formatDate(d.created_at)}
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