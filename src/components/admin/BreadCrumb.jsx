


import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt } from 'react-icons/fa';
import { decrypt } from "../utils/security";

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const isAdminRoute = pathnames[0] === "home";
  const segments = isAdminRoute ? pathnames.slice(1) : pathnames;

  const encryptedUser = localStorage.getItem('user');
  const user = encryptedUser ? decrypt(encryptedUser) : null;

  return (
    <Box px={'1'} py="4">
      <Breadcrumb fontSize="sm" separator="/" spacing="1"> 
        <BreadcrumbItem>
          <Icon as={FaTachometerAlt} mr={2} />  
          <BreadcrumbLink as={Link} to="/home/dashboard">{user.role}</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((seg, idx) => {
          const path = `/home/${segments.slice(0, idx + 1).join("/")}`;
          const label = seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

          return (
            <BreadcrumbItem key={path} isCurrentPage={idx === segments.length - 1}>
              <BreadcrumbLink as={Link} to={path}>{label}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Box>
  );
};

export default BreadCrumb;
