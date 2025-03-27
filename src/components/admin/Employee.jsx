import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Employee() {

  const [employee, setEmployee] = useState([]);

  const token = localStorage.getItem("token");


  const navigate=useNavigate();

  const getEmployee = async () => {
    try {

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/getAllEmployee`, {
        headers: {
          Authorization: token
        }
      });
      const result = await response.json();

      setEmployee(result.data)
      console.log(result)
    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    getEmployee();
  }, [])

  return (
    <Box width={'100%'} p={'10px'}>

      <Box display={'flex'} justifyContent={'end'} >
        <Button bgColor='var(--active-bg)' textColor={'white'} _hover={''} _active={''}>Add Employee</Button>
      </Box>

      <Box>
        <TableContainer >
          <Table border={'1px solid black'} size={'sm'} width={'100%'} margin={'auto'} mt={'20px'} p={'10px'}>
            <Thead>
              <Tr>
                <Th border={'1px solid black'}>Name</Th>
                <Th border={'1px solid black'} >Email</Th>
                <Th border={'1px solid black'}>Phone No</Th>
                <Th border={'1px solid black'}>DOB </Th>
                <Th border={'1px solid black'}>role</Th>
                <Th border={'1px solid black'}>Last login</Th>

                <Th border={'1px solid black'}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>

              {
                employee && employee.map((emp) => (

                  <Tr key={emp.id}>
                    <Td border={'1px solid black'}>{emp.name}</Td>
                    <Td border={'1px solid black'}>{emp.email}</Td>
                    <Td border={'1px solid black'}>{emp.mobile_no}</Td>
                    <Td border={'1px solid black'}>{emp.date_of_birth}</Td>
                    <Td border={'1px solid black'}>{emp.role}</Td>
                    <Td border={'1px solid black'}>{emp.last_login ? new Date(emp.last_login).toISOString().split('T')[0] : ''}</Td>
                    <Td border={'1px solid black'}>edit/delete</Td>
                  </Tr>
                ))
              }

            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Employee