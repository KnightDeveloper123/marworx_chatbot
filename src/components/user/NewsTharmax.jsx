import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react"
import React from "react"

const NewsTharmax = () => {

    return (
        <>
            <VStack spacing={4} align="stretch">
                {/* Trending News Card */}
                <Box
                    border="1px solid #E2E8F0"
                    borderRadius="md"
                    p={4}
                    bg="white"
                    boxShadow="sm"
                >
                    <Heading fontSize="md" mb={3}>
                        Trending News
                    </Heading>
                    <VStack align="start" spacing={3}>
                        <Box>
                            <Text fontWeight="semibold">
                                New Energy Efficiency Standards Released
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                Industrial heating regulations updated
                            </Text>
                            <Text fontSize="xs" color="gray.400" mt={1}>
                                2 hours ago
                            </Text>
                        </Box>

                        <Divider />

                        <Box>
                            <Text fontWeight="semibold">
                                Thermax Launches Smart Boiler Series
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                AI-powered heating solutions
                            </Text>
                            <Text fontSize="xs" color="gray.400" mt={1}>
                                5 hours ago
                            </Text>
                        </Box>

                        <Divider />

                        <Box>
                            <Text fontWeight="semibold">
                                Heat Recovery technology Breakthrough
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                95% efficiency achieved in latest tests
                            </Text>
                            <Text fontSize="xs" color="gray.400" mt={1}>
                                1 day ago
                            </Text>
                        </Box>
                    </VStack>
                </Box>

                {/* Related Questions Card */}
                <Box
                    border="1px solid #E2E8F0"
                    borderRadius="md"
                    p={4}
                    bg="white"
                    boxShadow="sm"
                >
                    <Heading fontSize="md" mb={3}>
                        Related Questions
                    </Heading>
                    <VStack align="start" spacing={2} fontSize="sm" color="gray.700">
                        <Text>What is the ROI of upgrading to high efficiency boilers?</Text>
                        <Text>How to calculate steam system losses</Text>
                        <Text>Best practices for thermal insulations?</Text>
                        <Text>Thermax vs traditional heating systems comparison?</Text>
                        <Text>How to reduce carbon emissions in heating?</Text>
                    </VStack>
                </Box>
            </VStack>
        </>
    )
}

export default NewsTharmax;