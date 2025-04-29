


import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box, Button, Flex, Grid, Heading, Text, VStack, Image, Badge,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, IconButton, Stepper,
  useSteps,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from "@chakra-ui/react";
import { useState } from "react";

const Campaign = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isDrawerOpen, onOpen:onDrawerOpen, onClose:onDrawerClose } = useDisclosure();


  const steps = [
    { title: "Select Channel", description: "Choose your communication method" },
    { title: "Campaign Details", description: "Enter campaign name" },
    { title: "Configure Message", description: "Setup your message content" },
    { title: " Message content", description: "Setup your message content" },
  ];
  const [isStepOpen, setIsStepOpen] = useState(true);
  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  const onStepClose = () => {
    setIsStepOpen(false);
    setActiveStep(0);
  };


  return (
    <Box p={6}>

      <Box onClick={() => onOpen()}>create campaign</Box>

      {isOpen && (
        <Modal isOpen={isStepOpen} onClose={onStepClose} size="6xl">
          <ModalOverlay />
          <ModalContent p={6}>
            <ModalCloseButton />

            {/* Chakra Stepper */}
            <Stepper index={activeStep} mb={6} size="sm" colorScheme="purple">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>

            {/* Step Content */}
            <ModalBody>
              {activeStep === 0 && (
                <Box>
                  <Text fontWeight="bold" mb={3}>Standard</Text>
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    Create a one-off campaign from scratch.
                  </Text>

                  <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4} mb={8} paddingLeft={"70px"}>
                    <Box borderWidth="1px" borderRadius="md" textAlign="center" cursor="pointer">
                      <Box bgColor={'lightcyan'}>
                        <Image src="https://img.icons8.com/color/96/000000/secured-letter.png" mx="auto" mb={2} />
                      </Box>
                      <Text padding={'4'}>Email</Text>
                    </Box>

                    <Box
                      borderWidth="1px"
                      borderRadius="md"
                      textAlign="center"

                      position="relative"
                      cursor="pointer"
                      onClick={goToNext}
                    >
                      <Box bgColor={'lightcyan'}>
                        <Image src="https://img.icons8.com/color/96/000000/whatsapp--v1.png" mx="auto" mb={2} />
                      </Box>

                      <Text padding={'4'}>WhatsApp</Text>
                    </Box>

                    <Box borderWidth="1px" borderRadius="md" textAlign="center" cursor="pointer">
                      <Box bgColor={'lightcyan'}>
                        <Image src="https://img.icons8.com/color/96/000000/sms.png" mx="auto" mb={2} />
                      </Box>
                      <Text padding={'4'}>SMS</Text>
                    </Box>

                    <Box borderWidth="1px" borderRadius="md" textAlign="center" position="relative" cursor="pointer">
                      <Box bgColor={'lightcyan'}>
                        <Image src="https://img.icons8.com/color/96/000000/appointment-reminders--v1.png" mx="auto" mb={2} />
                      </Box>

                      <Text padding={'4'}>Web Push</Text>
                    </Box>
                  </Grid>
                </Box>
              )}

              {activeStep === 1 && (
                <Box width="100%" maxW="500px" mx="auto" textAlign="left">
                  <Box fontSize="24px" fontWeight="bold" mb="3">
                    Create a WhatsApp campaign
                  </Box>
                  <Box fontSize="14px" color="gray.600" mb="8">
                    Reach out to your customers on WhatsApp. Share important news,
                    promote products, announce an event.
                  </Box>
                  <Box textAlign="left" fontWeight="semibold" mb="2" fontSize="14px">
                    How will you name your campaign?{" "}
                    <span style={{ fontWeight: "normal" }}>(only you can see it)</span>
                  </Box>
                  <Input
                    placeholder="Type the name of your campaign"
                    fontSize="14px"
                    mb="6"
                    borderColor="gray.300"
                  />
                  <Flex justifyContent="space-between" gap="4">
                    <Button variant="ghost" onClick={goToPrevious} color="purple.500" fontWeight="bold">
                      Back
                    </Button>
                    <Button
                      bg="gray.400"
                      color="white"
                      fontWeight="bold"
                      _hover={{ bg: "gray.500" }}
                      onClick={goToNext}
                    >
                      Start
                    </Button>
                  </Flex>
                </Box>
              )}

              {activeStep === 2 && (
                <Box width="100%" maxW="600px" mx="auto">
                  <Flex justifyContent="space-between" alignItems="center" mb="6">
                    <Flex alignItems="center" gap="2">
                      <Text fontSize="20px" fontWeight="bold">
                        marworx
                      </Text>
                      <Badge colorScheme="purple" variant="subtle" fontSize="12px">
                        Draft
                      </Badge>
                    </Flex>
                    <Button
                      bg="gray.400"
                      color="white"
                      fontWeight="bold"
                      size="sm"
                      _hover={{ bg: "gray.500" }}
                      borderRadius="full"
                      onClick={onStepClose}
                    >
                      Schedule
                    </Button>
                  </Flex>

                  <Box border="1px solid #E2E8F0" borderRadius="10px" overflow="hidden">
                    <Flex p="4" justifyContent="space-between" borderBottom="1px solid #E2E8F0">
                      <Box>
                        <Text fontWeight="bold">From</Text>
                        <Text fontSize="sm" color="gray.500">Choose WhatsApp Business account.</Text>
                      </Box>
                      <Button variant="outline" size="sm" borderRadius="full">Edit</Button>
                    </Flex>

                    <Flex p="4" justifyContent="space-between" borderBottom="1px solid #E2E8F0">
                      <Box>
                        <Text fontWeight="bold">To</Text>
                        <Text fontSize="sm" color="gray.500">Select a list of recipients</Text>
                      </Box>
                      <Button variant="outline" size="sm" borderRadius="full">Edit</Button>
                    </Flex>

                    <Flex p="4" justifyContent="space-between">
                      <Box>
                        <Text fontWeight="bold">Message Content</Text>
                        <Text fontSize="sm" color="gray.500">Start a new design or select existing</Text>
                      </Box>
                      <Button colorScheme="gray" size="sm" borderRadius="full">Start Creating</Button>
                    </Flex>
                  </Box>


                  <Flex justifyContent="space-between" gap="4">
                    <Button variant="ghost" onClick={goToPrevious} color="purple.500" fontWeight="bold">
                      Back
                    </Button>
                    <Button
                      bg="gray.400"
                      color="white"
                      fontWeight="bold"
                      _hover={{ bg: "gray.500" }}
                      onClick={goToNext}
                    >
                      Start
                    </Button>
                  </Flex>
                </Box>
              )}

              {
                activeStep === 3 && (

                  <Box width="100%" maxW="600px" mx="auto" position={'relative'} zIndex={10}>
                    <Flex justifyContent="space-between" alignItems="center" mb="6">
                      <Flex alignItems="center" gap="2">
                        <Text fontSize="20px" fontWeight="bold">
                          marworx
                        </Text>
                        <Badge colorScheme="purple" variant="subtle" fontSize="12px">
                          Draft
                        </Badge>
                      </Flex>
                      <Button
                        bg="gray.400"
                        color="white"
                        fontWeight="bold"
                        size="sm"
                        _hover={{ bg: "gray.500" }}
                        borderRadius="full"
                        onClick={onStepClose}
                      >
                        Schedule
                      </Button>
                    </Flex>

                    <Box border="1px solid #E2E8F0" borderRadius="10px" overflow="hidden">
                      <Flex p="4" justifyContent="space-between" borderBottom="1px solid #E2E8F0">
                        <Box>
                          <Text fontWeight="bold">From</Text>
                          <Text fontSize="sm" color="gray.500">Choose WhatsApp Business account.</Text>
                        </Box>
                        <Button variant="outline" size="sm" borderRadius="full">Edit</Button>
                      </Flex>

                      <Flex p="4" justifyContent="space-between" borderBottom="1px solid #E2E8F0">
                        <Box>
                          <Text fontWeight="bold">To</Text>
                          <Text fontSize="sm" color="gray.500">Select a list of recipients</Text>
                        </Box>
                        <Button variant="outline" size="sm" borderRadius="full">Edit</Button>
                      </Flex>

                      <Flex p="4" justifyContent="space-between">
                        <Box>
                          <Text fontWeight="bold">Message Content</Text>
                          <Text fontSize="sm" color="gray.500">Start a new design or select existing</Text>
                        </Box>
                        <Button colorScheme="gray" size="sm" borderRadius="full" onClick={onDrawerOpen}>Start Creating</Button>
                      </Flex>
                    </Box>

                    <Flex justifyContent="space-between" gap="4">
                      <Button variant="ghost" onClick={goToPrevious} color="purple.500" fontWeight="bold">
                        Back
                      </Button>
                      <Button
                        bg="gray.400"
                        color="white"
                        fontWeight="bold"
                        _hover={{ bg: "gray.500" }}
                        onClick={goToNext}
                      >
                        Start
                      </Button>
                    </Flex>
                  </Box>
                )
              }
              <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose} size="md" position={'absolute'} zIndex={100}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Create Message</DrawerHeader>

                  <DrawerBody>
                    {/* Add your message creation form or design UI here */}
                    <Text fontSize="sm" color="gray.600">
                      This is where you can design your message content...
                    </Text>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="purple">Save</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      

    </Box>
  );
};

export default Campaign;

