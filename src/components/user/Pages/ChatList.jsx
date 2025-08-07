import { Avatar, Box, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'

const ChatList = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    

    const chatList = [
        {
            name: "Tejas Chavan",
            photo: 'https://i.pravatar.cc/90?img=1',
            last_message: "Great quiz performance today!",
            time: '1h',
            id: '1'
        },
        {
            name: "Sneha Patil",
            photo: 'https://i.pravatar.cc/90?img=2',
            last_message: "Are we meeting tomorrow?",
            time: '5m',
            id: '2'
        },
        {
            name: "Raj Malhotra",
            photo: 'https://i.pravatar.cc/90?img=3',
            last_message: "I'll send the documents soon.",
            time: '30m',
            id: '3'
        },
        {
            name: "Aarav Shah",
            photo: 'https://i.pravatar.cc/90?img=4',
            last_message: "Happy Birthday! 🎉",
            time: '2d',
            id: '4'
        },
        {
            name: "Neha Reddy",
            photo: 'https://i.pravatar.cc/90?img=5',
            last_message: "Call me when you’re free.",
            time: '10m',
            id: '5'
        },
        {
            name: "Vikram Joshi",
            photo: 'https://i.pravatar.cc/90?img=6',
            last_message: "Let's catch up this weekend.",
            time: '4h',
            id: '6'
        },
        {
            name: "Meera Nair",
            photo: 'https://i.pravatar.cc/90?img=7',
            last_message: "Your parcel has arrived.",
            time: '1d',
            id: '7'
        },
        {
            name: "Karan Kapoor",
            photo: 'https://i.pravatar.cc/90?img=8',
            last_message: "Got the tickets booked.",
            time: '15m',
            id: '8'
        },
        {
            name: "Riya Mehta",
            photo: 'https://i.pravatar.cc/90?img=9',
            last_message: "Can you share the notes?",
            time: '3h',
            id: '9'
        },
        {
            name: "Arjun Desai",
            photo: 'https://i.pravatar.cc/90?img=10',
            last_message: "Zoom meeting starts in 10 mins.",
            time: '20m',
            id: '10'
        }
    ];


    return (
        <Flex h={'100%'} flexDir={'column'}>
            <Text p={3}>Messages</Text>
            <Box px={3}>
                <InputGroup w={'100%'} size={'sm'} borderRadius={8} mb={2}>
                    <InputLeftElement pointerEvents='none'>
                        <IoSearch color='#6E6E6E' />
                    </InputLeftElement>
                    <Input
                        placeholder='Search here'
                        borderRadius={8}
                        _placeholder={{ color: '#6E6E6E' }}
                        fontSize={'13px'}
                        _active={{
                            zIndex: 1,
                            borderColor: '#c53030',
                            boxShadow: '0 0 0 1px #c53030'
                        }}
                        _focusVisible={{
                            zIndex: 1,
                            borderColor: '#c5303085',
                            boxShadow: '0 0 0 1px #c5303085'
                        }}
                    />
                </InputGroup>
            </Box>
            <Flex overflowY={'scroll'} flexDir={'column'} flex={1}>
                {chatList?.map((elem, ind) => <Flex key={ind} py={2} px={3} alignItems={'center'} gap={2} position={'relative'} cursor={'pointer'} _hover={{ bgColor: '#cbcbcb67' }} bgColor={id === elem.id ? '#ED343812' : 'transparent'} onClick={() => navigate(`/chat/${elem.id}`)}>
                    <Avatar size={'md'} src={elem.photo} />
                    <Box>
                        <Text fontSize={'14px'}>{elem.name}</Text>
                        <Text fontSize={'13px'} color={'#484848'}>{elem.last_message}</Text>
                    </Box>
                    <Text position={'absolute'} top={1} right={3} fontSize={'12px'}>{elem.time}</Text>
                </Flex>)}
            </Flex>
        </Flex>
    )
}

export default ChatList