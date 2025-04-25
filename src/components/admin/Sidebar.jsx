// Sidebar.jsx
import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { FaTachometerAlt,FaUser ,FaUserPlus } from "react-icons/fa";
import { SiGooglebigquery } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const adminNavbar = [
    { title: "Dashboard", url: "/admin/dashboard" , icon: <Icon as={ FaTachometerAlt } mr={2} />   },
    { title: "Employee", url: "/admin/employee",  icon: <Icon as={ FaCircleUser } mr={2} />  },
    { title: "Users", url: "/admin/user",  icon: <Icon as={ FaUser } mr={2} />  },
    { title: "Queries", url: "/admin/queries",  icon: <Icon as={ SiGooglebigquery } mr={2} />  },
  ];
  return (
    <Box w="240px" bg="gray.800" color="white" p={5} minH="100%">
      <Text fontSize="xl" fontWeight="bold" mb={8}>
        Marworx Chat Bot
      </Text>
      <VStack spacing={4} align="stretch">
        {adminNavbar.map((item, index) => (
          <Link key={index} to={item.url}>
            <Box
              _hover={{ bg: "gray.700" }}
              p={2}
              borderRadius="md"
              display={"flex"}
            >
              {item.icon}
              <Text fontSize="15px" fontWeight="500" cursor="pointer">
                {item.title}
              </Text>
            </Box>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
