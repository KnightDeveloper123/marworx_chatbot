import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import NavbarTharmax from '../Tharmax/NavbarTharmax'
import ChatList from './ChatList'
import { Outlet, useParams } from 'react-router-dom'
import chatImg from '../../../assets/7495.jpg'

const ChatLayout = () => {

    const { id } = useParams();

    return (
        <Box height="100vh" display="flex" flexDirection="column" overflow="hidden" bgColor={'#fff'}>
            {/* Navbar */}
            <Box zIndex={100} position="relative">
                <NavbarTharmax />
            </Box>

            <Flex w={'100%'} p={5} h='calc(100vh - 70px)' overflowY={'auto'} gap={4}>
                <Box boxShadow='0px 0px 3px 0px #00000040' borderRadius={'8px'} w={'300px'}>
                    <ChatList />
                </Box>
                <Flex flex={1} border={'1px solid #D9D9D9B2'} borderRadius={'8px'} p={3}>
                    {id ? <Outlet /> : (
                        <Box mt={'10%'} justifySelf={'center'} mx={'auto'}>
                            <Image src={chatImg} h={'auto'} w={'13rem'} />
                            <Text textAlign={'center'}>Start your chat now!</Text>
                        </Box>
                    )}
                </Flex>
            </Flex>
        </Box>
    )
}

export default ChatLayout