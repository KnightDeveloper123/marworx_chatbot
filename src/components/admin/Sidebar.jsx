// Sidebar.jsx
import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { FaTachometerAlt, FaUser, FaUserPlus } from "react-icons/fa";
import { SiGooglebigquery } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiTelegram2Line } from "react-icons/ri";
import { MdProductionQuantityLimits } from "react-icons/md";
import { LuBot  } from "react-icons/lu";
import { RiAiGenerate2 } from "react-icons/ri";
import { LuSection } from "react-icons/lu";

const Sidebar = () => {
  const adminNavbar = [
    { title: "Dashboard", url: "/home/dashboard", icon: <Icon as={FaTachometerAlt} mr={2} /> },
    { title: "Admin", url: "/home/admin", icon: <Icon as={FaCircleUser} mr={2} /> },
    { title: "Sector", url: "/home/sector", icon: <Icon as={LuSection} mr={2} /> },
    // { title: "Users", url: "/home/user", icon: <Icon as={FaUser} mr={2} /> },
    { title: "Product Services ", url: "/home/product", icon: <Icon as={MdProductionQuantityLimits } mr={2} /> },
    { title: "Bot Builder", url: "/home/bot_builder", icon: <Icon as={LuBot} mr={2} /> },
    { title: "Campaign", url: "/home/campaign", icon: <Icon as={RiTelegram2Line} mr={2} /> },
    { title: "Genarative Bot", url: "/home/gen_bot", icon: <Icon as={RiAiGenerate2} mr={2} /> },
    // { title: "Queries", url: "/home/queries", icon: <Icon as={SiGooglebigquery} mr={2} /> },
  ];
  return (
    <Box w="240px" bg="gray.800" color="white" p={5} minH="100%">
      <Text fontSize="xl" fontWeight="bold" mb={8}>
        Marworx Chat Bot
      </Text>
      <VStack spacing={1} align="stretch">
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
