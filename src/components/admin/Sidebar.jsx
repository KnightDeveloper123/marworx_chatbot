// Sidebar.jsx
import { Box, VStack, Text, Icon } from '@chakra-ui/react';
import { FaTachometerAlt, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <Box w="240px" bg="gray.800" color="white" p={5} minH="100%">
    <Text fontSize="xl" fontWeight="bold" mb={8}>
      Open Admin
    </Text>
    <VStack spacing={4} align="stretch">
      <Link to="/">
        <Box _hover={{ bg: 'gray.700' }} p={2} borderRadius="md">
          <Icon as={FaTachometerAlt} mr={2} /> Dashboard
        </Box>
      </Link>
      <Link to="/pages">
        <Box _hover={{ bg: 'gray.700' }} p={2} borderRadius="md">
          <Icon as={FaFileAlt} mr={2} /> Pages
        </Box>
      </Link>
    </VStack>
  </Box>
);

export default Sidebar;
