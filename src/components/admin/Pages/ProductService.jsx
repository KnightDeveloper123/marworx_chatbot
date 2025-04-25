import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProductService = () => {
     const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box><Text>Product</Text></Box>
                <Box><Text onClick={()=>onOpen()}>Add Product</Text></Box>
            </Box>
            <Modal isOpen={isOpen}
                onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={'18px'}>Add Sector</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input type='text' placeholder='enter product name'></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input type='text' placeholder='enter description'></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Image</FormLabel>
                                <Input type='file'></Input>
                            </FormControl>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'6px'} mt={'10px'}>
                                <Button type='submit' fontSize={'13px'} bgColor={'#FF5722'} _hover={''} textColor={'white'} size={'sm'}>
                                    Save
                                </Button>
                                <Button onClick={onClose} type="button" size={'sm'} fontSize={'13px'} border={'1px solid #FF5722 '}
                                    textColor={'#FF5722'} bgColor={'white'} mr={3} _hover={''}>Cancel</Button>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default ProductService
