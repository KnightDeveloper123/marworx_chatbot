import { Avatar, Box, Button, Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from 'react-icons/fa';
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete, MdModeEdit, MdOutlineEdit, MdVerified } from 'react-icons/md';
import { GoVerified } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';

const CommunityPost = ({
  data,
  handleSelectQuestion,
  handleOpenEditQuestion,
  handleOpenDeleteQuestion
}) => {
  const [loading, setLoading] = useState(false)

  const { APP_URL, formatDate, user, showAlert, fetchAllQuestions } = useContext(AppContext)

  const onSubmit = useCallback(async (data) => {

    try {
      setLoading(true)

      const response = await fetch(`${APP_URL}/community/verify-answer`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem('token'),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ answer_id: data?.id, question: data?.question, answer: data?.answer })
      })

      const json = await response.json();

      if (json.success) {
        showAlert(json.success, 'success');
        fetchAllQuestions();
        setLoading(false)
      } else {
        console.log(json);

      }
    } catch (error) {
      console.log(error);
      setLoading(false)
      showAlert("Internal error", 'error')
    } finally {
      setLoading(false)
    }
  }, []);

  return (
    <Box border='1px solid #D9D9D9B2' borderRadius={'8px'} p={4} mt={3}>
      <Flex gap={3} alignItems={'flex-start'}>
        <Avatar size="md" name={data?.name} />
        <Box w={'100%'}>
          <Text color={'#515151'} fontSize={'13px'}>Question Asked by {data?.user_id === user?.id ? 'You' : data?.name}</Text>
          <Flex justifyContent={'space-between'} gap={2} w={'100%'}>
            <Text color={'#323232'} fontSize={'14px'} fontWeight={'700'}>{data?.question}</Text>
            {user?.id === data?.user_id && <Menu isLazy>
              <MenuButton
                size={'sm'}
                border={0}
                as={IconButton}
                aria-label='Options'
                icon={<BsThreeDots />}
                variant='outline'
              />
              <MenuList>
                <MenuItem icon={<MdModeEdit fontSize={'15px'} />} fontSize={'13px'} onClick={() => handleOpenEditQuestion({ question: data?.question, question_id: data?.id })}>
                  Edit
                </MenuItem>
                <MenuItem icon={<MdDelete fontSize={'15px'} />} fontSize={'13px'} onClick={() => handleOpenDeleteQuestion({ question_id: data?.id })}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>}
          </Flex>
          <Button
            leftIcon={<MdOutlineEdit />}
            size={'xs'}
            bgColor={'transparent'} color='#e53e3e'
            _hover={{
              bgColor: '#fcbebeff'
            }}
            onClick={() => handleSelectQuestion({ question: data?.question, id: data?.id })}
          >
            Add answer
          </Button>
        </Box>
      </Flex>
      {data?.answers?.length > 0 && data?.answers?.map((elem, ind) => <Box key={ind} mt={5} w={'94%'} mx='auto'>
        <Flex gap={3} alignItems={'flex-start'}>
          <Avatar size="sm" name={elem?.name} />
          <Box>
            <Flex gap={3}>
              <Text color={'#323232'} fontSize={'14px'} fontWeight={'700'}>{elem?.name} {elem?.user_id === user?.id && '(You)'}</Text>
              {elem?.is_verified === 1 ? (
                <Tooltip label='Verified Answer' bgColor={'white'} color={'#1f8207ff'} boxShadow={'0 0 4px #cbcbcb'} borderRadius={'8px'} fontSize={'12px'}>
                  <Box>
                    <MdVerified color='#1f8207ff' />
                  </Box>
                </Tooltip>
              ) : (
                <Button
                  leftIcon={<GoVerified />}
                  size={'xs'}
                  bgColor={'transparent'} color='#1f8207ff'
                  _hover={{
                    bgColor: '#b8f5beff'
                  }}
                  isDisabled={loading}
                  onClick={() => onSubmit({ ...elem, question: data?.question })}
                >
                  Mark as verified
                </Button>
              )}
            </Flex>
            <Text color={'#515151'} fontSize={'12px'}>Thermal Engineer at Thermax</Text>
            <Text my={4} color={'#565656'} fontWeight={'400'} fontSize={'14px'}>{elem?.answer}</Text>
            {elem?.file && <Image h={'auto'} w={'100%'} src={`${APP_URL}/uploads/community/${elem?.file}`} borderRadius={'5px'} />}
            <Flex gap={5}>
              <Text color={'#797979'} fontSize={'12px'}>{formatDate(elem?.created_at, true)}</Text>
              <Flex fontSize='12px'>
                <BiSolidLike fontSize={'16px'} color='#797979' />
                <Text fontSize={'12px'} color='#797979'>{16}</Text>
              </Flex>
              <Flex fontSize='12px'>
                <FaComment fontSize={'16px'} color='#797979' />
                <Text fontSize={'12px'} color='#797979'>{16}</Text>
              </Flex>
              <Flex fontSize='12px'>
                <IoMdShareAlt fontSize={'18px'} color='#797979' />
                <Text fontSize={'12px'} color='#797979'>Share</Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box >)}
    </Box >
  )
}

export default CommunityPost