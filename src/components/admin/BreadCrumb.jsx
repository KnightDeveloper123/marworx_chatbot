


import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt } from 'react-icons/fa';

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const isAdminRoute = pathnames[0] === "admin";
  const segments = isAdminRoute ? pathnames.slice(1) : pathnames;

  return (
    <Box px={'1'} py="4">
      <Breadcrumb fontSize="sm" separator="/" spacing="1"> 
        <BreadcrumbItem>
          <Icon as={FaTachometerAlt} mr={2} />  
          <BreadcrumbLink as={Link} to="/admin/dashboard">Admin</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((seg, idx) => {
          const path = `/admin/${segments.slice(0, idx + 1).join("/")}`;
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
