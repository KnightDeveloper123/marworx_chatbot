import { Avatar, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import CommunityPost from '../Component/CommunityPost'
import { AppContext } from '../../context/AppContext'
import { AddAnswer } from '../Dialogs/Community'
import { useForm } from 'react-hook-form'

const CommunityThermax = () => {
    const { fetchAllQuestions, allQuestions, showAlert, user, APP_URL } = useContext(AppContext)

    const { isOpen: isAddAnswerOpen, onClose: onAddAnswerClose, onOpen: onAddAnswerOpen } = useDisclosure();
    const [loading, setLoading] = useState(false)

    const [selectQuestion, setSelectQuestion] = useState(null);
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

    const onSubmit = useCallback(async (values) => {

        try {
            setLoading(true)

            const response = await fetch(`${APP_URL}/community/add-question`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: values?.question, user_id: user?.id })
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
    }, [user]);


    return (
        <Box p={3}>
            <Box border='1px solid #D9D9D9B2' borderRadius={'8px'} p={4}>
                <Text >Post Question</Text>
                <Flex mt={2} alignItems={'center'} gap={4}>
                    <Avatar size="md" name={user?.name} />
                    <FormControl isInvalid={errors.question}>
                        <Input
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
                        />
                        {/* {errors.question && (
                            <FormErrorMessage fontSize="12px">
                                {errors.question.message}
                            </FormErrorMessage>
                        )} */}
                    </FormControl>
                    <Button
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
                    </Button>
                </Flex>
            </Box>

            <Box mt={3}>
                {allQuestions?.length > 0 ? allQuestions?.map((element, index) => <CommunityPost data={element} key={index} handleSelectQuestion={handleSelectQuestion} />) : (
                    <Text>No Questions/Answer Posted</Text>
                )}
            </Box>
            <AddAnswer
                isOpen={isAddAnswerOpen}
                onClose={onAddAnswerClose}
                data={selectQuestion}
                showAlert={showAlert}
            />
        </Box>
    )
}

export default CommunityThermax