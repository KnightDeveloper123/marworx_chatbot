import { Avatar, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import CommunityPost from '../Component/CommunityPost'
import { AppContext } from '../../context/AppContext'
import { AddAnswer, AddQuestion, DeleteQuestion, EditQuestion } from '../Dialogs/Community'
import { useForm } from 'react-hook-form'

const CommunityThermax = () => {
    const { fetchAllQuestions, allQuestions, showAlert, user, APP_URL, isQuestionOpen, onQuestionClose, onQuestionOpen } = useContext(AppContext)

    const { isOpen: isAddAnswerOpen, onClose: onAddAnswerClose, onOpen: onAddAnswerOpen } = useDisclosure();
    const { isOpen: isUpdateQuestionOpen, onClose: onUpdateQuestionClose, onOpen: onUpdateQuestionOpen } = useDisclosure();
    const { isOpen: isDeleteQuestionOpen, onClose: onDeleteQuestionClose, onOpen: onDeleteQuestionOpen } = useDisclosure();

    const [selectQuestion, setSelectQuestion] = useState(null);
    const [editQuestion, setEditQuestion] = useState(null)

    useEffect(() => {
        fetchAllQuestions();

    }, [])

    const handleSelectQuestion = (data) => {
        onAddAnswerOpen();
        setSelectQuestion(data)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleOpenEditQuestion = (data) => {
        setEditQuestion(data);
        onUpdateQuestionOpen();
    }

    const handleOpenDeleteQuestion = (data) => {
        setEditQuestion(data);
        onDeleteQuestionOpen()
    }


    return (
        <Box p={3}>
            <Box border='1px solid #D9D9D9B2' borderRadius={'8px'} p={4}>
                <Text >Post Question</Text>
                <Flex mt={2} alignItems={'center'} gap={4}>
                    <Avatar size="md" name={user?.name} />
                    <FormControl isInvalid={errors.question}>
                        <Input
                            onClick={() => { onQuestionOpen(); console.log("Hello") }}
                            {...register('question', { required: "Field is required" })}
                            borderRadius='full'
                            bgColor={'#D9D9D91A'}
                            border='1.2px solid #ADADAD80'
                            placeholder='Ask about heating systems, boilers, maintenance....'
                            fontSize={'14px'}
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

                            readOnly
                            _hover={{ opacity: 0.8 }}
                            cursor={'pointer'}
                        />
                        {/* {errors.question && (
                            <FormErrorMessage fontSize="12px">
                                {errors.question.message}
                            </FormErrorMessage>
                        )} */}
                    </FormControl>
                    {/* <Button
                        size='md'
                        fontSize={'14px'}
                        bgColor={'#e53e3e'}
                        color='white'
                        _hover={{
                            bgColor: '#842020ff'
                        }}
                        borderRadius='full'
                        onClick={handleSubmit(onSubmit)}
                        isLoading={loading}
                    >
                        Send
                    </Button> */}
                </Flex>
            </Box>

            <Box mt={3}>
                {allQuestions?.length > 0 ? allQuestions?.map((element, index) => <CommunityPost data={element} key={index} handleSelectQuestion={handleSelectQuestion} handleOpenEditQuestion={handleOpenEditQuestion} handleOpenDeleteQuestion={handleOpenDeleteQuestion} />) : (
                    <Text>No Questions/Answer Posted</Text>
                )}
            </Box>
            <AddAnswer
                isOpen={isAddAnswerOpen}
                onClose={onAddAnswerClose}
                data={selectQuestion}
                showAlert={showAlert}
            />

            <AddQuestion
                isOpen={isQuestionOpen}
                onClose={onQuestionClose}
            />

            <EditQuestion
                isOpen={isUpdateQuestionOpen}
                onClose={onUpdateQuestionClose}
                data={editQuestion}
            />

            <DeleteQuestion
                isOpen={isDeleteQuestionOpen}
                onClose={onDeleteQuestionClose}
                data={editQuestion}
            />
        </Box>
    )
}

export default CommunityThermax