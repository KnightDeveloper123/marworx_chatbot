import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Card from "../../Card";

function User() {
  return (
    <Card>
      <Flex
        w="100%"
        justifyContent="space-between"
        direction={{ xl: "row", lg: "row", md: "row", sm: "row", base: "row" }}
        p="5px"
      >
        <Flex
          w="100%"
          alignItems={"center"}
          justifyContent="space-between"
          gap="10px"
        >
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
              <Button
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
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

export default User;
