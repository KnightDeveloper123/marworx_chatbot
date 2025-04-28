// import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
// import React from 'react'
// import { HiOutlineMailOpen } from "react-icons/hi";
// import { MdOutlineTextsms } from "react-icons/md";
// import { FaWhatsapp } from "react-icons/fa";

// const Campaign = () => {

//   const {isOpen,onOpen,onClose}=useDisclosure();
//   return (
//     <Box>
//       <Box display={'flex'} justifyContent={'end'}>
//       <Button  onClick={()=>onOpen()}>Create Campaign</Button>
//       </Box>
//       <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Create Campaign</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Box>
//         
//             </Box>
//           </ModalBody>


//         </ModalContent>
//       </Modal>
//     </Box>
//   )
// }

// export default Campaign


import { Box, Button, Flex, Grid, Heading, Text, VStack, Image, Badge, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input } from "@chakra-ui/react";

const Campaign = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box p={6}>
    
    <Box onClick={()=>onOpen()}>create campaign</Box>
      {/* <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
        <ModalOverlay />
        <ModalContent>
     
          <ModalBody>
            <Box>

              <Text fontWeight="bold" mb={3}>Standard</Text>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Create a one-off campaign from scratch.
              </Text>
  
  
              <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4} mb={8} paddingLeft={'70px'}  >
               
                <Box borderWidth="1px" borderRadius="md" textAlign="center">
                  <Box bgColor={'lightcyan'}>
                    <Image src="https://img.icons8.com/color/96/000000/secured-letter.png" mx="auto" mb={2} />
                  </Box>
                  <Text>Email</Text>
                </Box>

                
                <Box borderWidth="1px" borderRadius="md"   textAlign="center" position="relative">
                  <Box bgColor={'lightcyan'}>
                    <Image src="https://img.icons8.com/color/96/000000/sms.png" mx="auto" mb={2} />
                  </Box>
                  <Badge position="absolute" top="2" right="2" colorScheme="yellow">Activate</Badge>
                  <Text>SMS</Text>
                </Box>

              
                <Box borderWidth="1px" borderRadius="md" p={4} textAlign="center">
                  <Image src="https://img.icons8.com/color/96/000000/whatsapp--v1.png" mx="auto" mb={2} />
                  <Text>WhatsApp</Text>
                </Box>

              
                <Box borderWidth="1px" borderRadius="md" p={4} textAlign="center" position="relative">
                  <Image src="https://img.icons8.com/color/96/000000/appointment-reminders--v1.png" mx="auto" mb={2} />
                  <Badge position="absolute" top="2" right="2" colorScheme="yellow">Activate</Badge>
                  <Text>Web Push</Text>
                </Box>
              </Grid>
              </Box>
         
          </ModalBody>


        </ModalContent>
      </Modal> */}

  <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
         <ModalOverlay />
         <ModalContent>
          
           <ModalCloseButton />
           <ModalBody>
             <Box width={'500px'} mx={'auto'}>
             <Box fontSize={'xl'} >Create  WhatsApp Campaign</Box>
             <Box fontSize={'md'}>react out to  your customers on whatsapp .Share important news,promote a line of products
              ,announce an upcoming event
             </Box>
             <Box>How will you name your campaign ?</Box>
             <Input placeholder="Type the name of your campaign "></Input>

             <Box display={'flex'} gap={'5px'}>
              <Button>Start</Button>
              <Button>Discard</Button>
             </Box>
             </Box>
            
           </ModalBody>


       </ModalContent>
       </Modal>
    

    </Box>
  );
};

export default Campaign;

