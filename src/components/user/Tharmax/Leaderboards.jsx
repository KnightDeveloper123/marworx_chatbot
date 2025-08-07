import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Center, Flex, GridItem, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { BsTrophyFill } from 'react-icons/bs'
import { IoSearch } from 'react-icons/io5'

const Leaderboards = () => {

    const leaderboardArray = [
        {
            name: 'Robert Taylor',
            designation: 'Boiler Technician',
            count: 4,
            pts: '1,420 pts',
            accuracy: '92% accuracy',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: 'Robert Taylor',
            designation: 'Boiler Technician',
            count: 4,
            pts: '1,420 pts',
            accuracy: '92% accuracy',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: 'Robert Taylor',
            designation: 'Boiler Technician',
            count: 4,
            pts: '1,420 pts',
            accuracy: '92% accuracy',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: 'Robert Taylor',
            designation: 'Boiler Technician',
            count: 4,
            pts: '1,420 pts',
            accuracy: '92% accuracy',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: 'Robert Taylor',
            designation: 'Boiler Technician',
            count: 4,
            pts: '1,420 pts',
            accuracy: '92% accuracy',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: 'Robert Taylor',
            designation: 'Boiler Technician',
            count: 4,
            pts: '1,420 pts',
            accuracy: '92% accuracy',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: 'Robert Taylor',
            designation: 'Boiler Technician',
            count: 4,
            pts: '1,420 pts',
            accuracy: '92% accuracy',
            photo:'https://i.pravatar.cc/'
        }
    ]

    const memberArray = [
        {
            name: "Robert Taylor",
            designation: 'Boiler Technician',
            status: 'Active',
            pts: '1,420 pts',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: "Robert Taylor",
            designation: 'Boiler Technician',
            status: 'Away',
            pts: '1,420 pts',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: "Robert Taylor",
            designation: 'Boiler Technician',
            status: 'Active',
            pts: '1,420 pts',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: "Robert Taylor",
            designation: 'Boiler Technician',
            status: 'Active',
            pts: '1,420 pts',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: "Robert Taylor",
            designation: 'Boiler Technician',
            status: 'Away',
            pts: '1,420 pts',
            photo:'https://i.pravatar.cc/'
        },
        {
            name: "Robert Taylor",
            designation: 'Boiler Technician',
            status: 'Active',
            pts: '1,420 pts',
            photo:'https://i.pravatar.cc/'
        },

    ]

    return (
        <Box bg={'#fff'} w={'100%'} px={6} py={4}>
            <Flex flexWrap={{ xl: 'nowrap', lg: 'nowrap', md: 'nowrap', sm: 'wrap', base: 'wrap' }} p={4} justifyContent={'space-between'} gap={2} alignItems={'center'} borderRadius={'8px'} border='1px solid #D9D9D9B2'>
                <Box>
                    <Text>Leaderboard</Text>
                    <Text fontSize={'13px'} color={'#515151'}>Top performers in TermoAI quizzes</Text>
                </Box>
                <Flex gap={4}>
                    <Menu>
                        <MenuButton
                            as={Button}
                            size={{ xl: 'sm', lg: 'sm', md: 'sm', sm: 'xs', base: 'xs' }}
                            rightIcon={<ChevronDownIcon fontSize={'20px'} />}
                            bgColor={'transparent'}
                            border={'1px solid #505050'}
                        >
                            This month
                        </MenuButton>
                        <MenuList fontSize={'14px'}>
                            <MenuItem>Download</MenuItem>
                            <MenuItem>Create a Copy</MenuItem>
                            <MenuItem>Mark as Draft</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Attend a Workshop</MenuItem>
                        </MenuList>
                    </Menu>
                    <Button
                        leftIcon={<BsTrophyFill />}
                        color={'white'}
                        size={{ xl: 'sm', lg: 'sm', md: 'sm', sm: 'xs', base: 'xs' }}
                        background='linear-gradient(90deg, #FF2D32 32.21%, #C4080C 100%)'
                        _hover={{
                            bg: 'linear-gradient(90deg, #e0272bff 32.21%, #9e0609ff 100%)'
                        }}
                    >
                        Take Quiz
                    </Button>
                </Flex>
            </Flex>

            <Box mt={3} p={4} borderRadius={'8px'} border='1px solid #D9D9D9B2'>
                <Text fontWeight={600}>Top 10 Quiz Champoins</Text>
                <Flex mt={3} gap={3} flexWrap={{ xl: 'nowrap', lg: 'nowrap', md: 'nowrap', sm: 'wrap', base: 'wrap' }}>
                    <Flex flexDir={'column'} gap={2} border='1.2px solid #E8DB39' borderRadius={'5px'} p={3} background='linear-gradient(180deg, #FFFDE5 0%, #FEFAC7 100%)' alignItems={'center'} w={'100%'} minW={'200px'}>
                        <Avatar size={'lg'} border={'3px solid #E8DB39'} src='https://i.pravatar.cc/' />
                        <Flex flexDir={'column'} alignItems={'center'}>
                            <Text>Alex Chain</Text>
                            <Text color={'#696969'} fontSize={'12px'}>2,450 points</Text>
                            <Text color={'#A29600'} fontSize={'12px'}>98% accuracy</Text>
                        </Flex>
                    </Flex>
                    <Flex flexDir={'column'} gap={2} border='1.2px solid #C1CADD' borderRadius={'5px'} p={3} background='linear-gradient(180deg, #FCFCFC 0%, #F3F4F6 100%)' alignItems={'center'} w={'100%'} minW={'200px'}>
                        <Avatar size={'lg'} border={'3px solid #C1CADD'} src='https://i.pravatar.cc/' />
                        <Flex flexDir={'column'} alignItems={'center'}>
                            <Text>Alex Chain</Text>
                            <Text color={'#696969'} fontSize={'12px'}>2,450 points</Text>
                            <Text color={'#6B7997'} fontSize={'12px'}>98% accuracy</Text>
                        </Flex>
                    </Flex>
                    <Flex flexDir={'column'} gap={2} border='1.2px solid #E8A648' borderRadius={'5px'} p={3} background='linear-gradient(180deg, #FFF5E8 0%, #FFEED6 100%)' alignItems={'center'} w={'100%'} minW={'200px'}>
                        <Avatar size={'lg'} border={'3px solid #E8A648'} src='https://i.pravatar.cc/' />
                        <Flex flexDir={'column'} alignItems={'center'}>
                            <Text>Alex Chain</Text>
                            <Text color={'#696969'} fontSize={'12px'}>2,450 points</Text>
                            <Text color={'#E28F19'} fontSize={'12px'}>98% accuracy</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <SimpleGrid mt={3} gap={3} columns={3}>
                    {leaderboardArray?.map((elem, ind) => <GridItem key={ind}>
                        <Box border='1px solid #D9D9D9CC' p={3} borderRadius={'5px'} w={'100%'}>
                            <Flex justifyContent={'space-between'}>
                                <Flex gap={3} alignItems={'center'}>
                                    <Avatar size={'sm'} src={elem.photo} />
                                    <Box>
                                        <Text fontSize={'14px'}>{elem?.name}</Text>
                                        <Text fontSize={'14px'} color={'#484848'} fontWeight={400}>{elem.designation}</Text>
                                    </Box>
                                </Flex>
                                <Text h={'max-content'} py={0} px={2} borderRadius={'4px'} bgColor={'#E454201A'} color={'#AE2E00'} fontSize={'12px'}>{elem.count}</Text>
                            </Flex>
                            <Flex justifyContent={'space-between'} mt={3}>
                                <Text fontSize={'12px'}>{elem.pts}</Text>
                                <Text color={'#484848'} fontSize={'12px'}>{elem.accuracy}</Text>
                            </Flex>
                        </Box>
                    </GridItem>)}
                </SimpleGrid>
            </Box>
            <Box mt={3} p={4} borderRadius={'8px'} border='1px solid #D9D9D9B2'>
                <Flex justifyContent={'space-between'} gap={2} w={'100%'} alignItems={'center'}>
                    <Text fontWeight={600}>All Members</Text>
                    <Flex gap={2}>
                        <InputGroup w={'max-content'} size={'sm'} borderRadius={8}>
                            <InputLeftElement pointerEvents='none'>
                                <IoSearch color='#6E6E6E' />
                            </InputLeftElement>
                            <Input placeholder='Search here' borderRadius={8} _placeholder={{ color: '#6E6E6E' }} fontSize={'13px'} w={'200px'} />
                        </InputGroup>
                        <Menu>
                            <MenuButton
                                as={Button}
                                size={{ xl: 'sm', lg: 'sm', md: 'sm', sm: 'xs', base: 'xs' }}
                                rightIcon={<ChevronDownIcon fontSize={'20px'} />}
                                bgColor={'transparent'}
                                border={'1px solid #505050'}
                                fontSize={'12px'}
                            >
                                All levels
                            </MenuButton>
                            <MenuList fontSize={'14px'}>
                                <MenuItem>Download</MenuItem>
                                <MenuItem>Create a Copy</MenuItem>
                                <MenuItem>Mark as Draft</MenuItem>
                                <MenuItem>Delete</MenuItem>
                                <MenuItem>Attend a Workshop</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
                <SimpleGrid mt={3} gap={3} columns={3}>
                    {memberArray?.map((elem, ind) => <GridItem key={ind}>
                        <Box border='1px solid #D9D9D9CC' p={3} borderRadius={'5px'} w={'100%'}>
                            <Flex justifyContent={'space-between'}>
                                <Flex gap={3} alignItems={'center'}>
                                    <Avatar size={'sm'} src={elem.photo} />
                                    <Box>
                                        <Text fontSize={'14px'}>{elem?.name}</Text>
                                        <Text fontSize={'14px'} color={'#484848'} fontWeight={400}>{elem.designation}</Text>
                                    </Box>
                                </Flex>
                                <Text h={'max-content'} py={0} px={2} borderRadius={'4px'} bgColor={elem.status === 'Active' ? '#369A001A':'#D284001A'} color={elem.status === 'Active' ? '#369A00':'#D28400'} fontSize={'12px'}>{elem.status}</Text>
                            </Flex>
                            <Flex justifyContent={'space-between'} mt={3}>
                                <Text fontSize={'12px'}>{elem.pts}</Text>
                            </Flex>
                        </Box>
                    </GridItem>)}
                </SimpleGrid>
                <Center mt={3}>
                    <Button color={'#ed3438'} border={'2px solid #ed3438'} bgColor={'transparent'}  size={'sm'}>
                        More Member
                    </Button>
                </Center>
            </Box>
        </Box>
    )
}

export default Leaderboards