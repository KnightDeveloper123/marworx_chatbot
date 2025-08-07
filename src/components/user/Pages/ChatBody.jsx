import { Avatar, Box, Divider, Flex, IconButton, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React, { useContext, useMemo } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { IoAttach } from 'react-icons/io5'
import { AppContext } from '../../context/AppContext'

const ChatBody = () => {

  const { formatDate } = useContext(AppContext)
  const currentUserId = 'user1'
  const chats = [
    {
      id: "1",
      senderId: "user1",
      message: "Hey! I saw your answer about thermal efficiency calculations. really helpful! Hey! I saw your answer about thermal efficiency calculations. really helpful!",
      timestamp: "2025-08-05T08:45:00Z", // oldest
    },
    {
      id: "2",
      senderId: "user2",
      message: "Hey! I saw your answer about thermal efficiency calculations. really helpful! Hey! I saw your answer about thermal efficiency calculations. really helpful!",
      timestamp: "2025-08-05T09:10:00Z",
    },
    {
      id: "3",
      senderId: "user1",
      message: "Nice. Let me know if you need anything.",
      timestamp: "2025-08-06T13:15:00Z",
    },
    {
      id: "4",
      senderId: "user2",
      message: "Sure! Also, can you share the layout doc?",
      timestamp: "2025-08-06T14:20:00Z",
    },
    {
      id: "5",
      senderId: "user1",
      message: "Sharing it now. Check your mail.",
      timestamp: "2025-08-07T07:55:00Z",
    },
    {
      id: "6",
      senderId: "user2",
      message: "Got it. Thanks!",
      timestamp: "2025-08-07T08:05:00Z", // latest
    },
  ];


  function getGroupLabel(dateStr) {
    const inputDate = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Strip time from dates
    const stripTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const input = stripTime(inputDate);
    const t = stripTime(today);
    const y = stripTime(yesterday);

    if (input.getTime() === t.getTime()) return "Today";
    if (input.getTime() === y.getTime()) return "Yesterday";

    return input.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }); // e.g. "05 Aug 2025"
  }

  const groupChatsByDate = (chats) => {
    const groups = {};
    chats.forEach((chat) => {
      const group = getGroupLabel(chat.timestamp);
      if (!groups[group]) groups[group] = [];
      groups[group].push(chat);
    });
    return groups;
  };

  const groupedChats = useMemo(() => groupChatsByDate(chats));

  return (
    <Flex w={'100%'} p={1} flexDir={'column'}>
      <Flex alignItems={'center'} gap={3}>
        <Avatar size={'md'} src='https://i.pravatar.cc/90?img=10' />
        <Text fontSize={'15px'}>Robert Taylor</Text>
      </Flex>
      <Divider border={'1.2px solid #D9D9D9E5'} my={4} />
      <Box flex={1} overflowY="auto" pr={2}>
        {Object.entries(groupedChats).map(([label, messages]) => (
          <Box key={label} mb={4}>
            <Text
              textAlign={"center"}
              color={"#3A3A3A"}
              fontSize={"12px"}
              my={3}
            >
              {label}
            </Text>
            {messages.map((msg) => {
              const isSender = msg.senderId === currentUserId;
              return (
                <Flex
                  key={msg.id}
                  gap={3}
                  mt={4}
                  flexDir={isSender ? "row-reverse" : "row"}
                >
                  <Avatar
                    size={"xs"}
                    src={`https://i.pravatar.cc/90?img=${isSender ? "10" : "20"}`}
                  />
                  <Box
                    maxW={"600px"}
                    ml={isSender ? 20 : 0}
                    mr={!isSender ? 20 : 0}
                    p={3}
                    bgColor={isSender ? "#ED343814" : "#D9D9D940"}
                    borderRadius={
                      isSender
                        ? "15px 0 15px 15px"
                        : "0 15px 15px 15px"
                    }
                  >
                    <Text fontSize={"14px"}>{msg.message}</Text>
                    <Text
                      textAlign={"right"}
                      fontSize={"11px"}
                      color={"#484848"}
                    >
                      {formatDate(msg.timestamp, "HH:mm")}
                    </Text>
                  </Box>
                </Flex>
              );
            })}
          </Box>
        ))}
      </Box>
      <Flex gap={3} mt={1}>
        <InputGroup>
          <InputLeftElement>
            <IconButton size={'xs'} icon={<IoAttach fontSize={'20px'} />} borderRadius={'full'} />
          </InputLeftElement>
          <Input
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
            borderRadius={'full'}
            placeholder='Type a message...'
            fontSize={'14px'}
          />
        </InputGroup>

        <IconButton
          color={'white'}
          icon={<AiOutlineSend fontSize={'20px'} />}
          background='linear-gradient(180deg, #FF2D32 0%, #C4080C 100%)'
          borderRadius={'full'}
          _hover={{
            bg: 'linear-gradient(180deg, #e0272bff 32.21%, #9e0609ff 100%)'
          }}
        />
      </Flex>
    </Flex>
  )
}

export default ChatBody