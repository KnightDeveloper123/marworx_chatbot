import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    IconButton,
    FormErrorMessage,
    Image,
} from '@chakra-ui/react'
import { useCallback, useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsImages } from "react-icons/bs";
import { AppContext } from '../../context/AppContext';

export const AddAnswer = ({ data, isOpen, onClose }) => {

    const [file, setFile] = useState(null);
    const { showAlert, APP_URL, user, fetchAllQuestions } = useContext(AppContext)
    const [loading, setLoading] = useState(false)

    const fileRef = useRef();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = useCallback(async (values) => {        
        try {
            setLoading(true)
            const formData = new FormData();

            formData.append('answer', values?.answer)
            formData.append('question_id', data?.id || null)
            formData.append('user_id', user?.id || null)
            if (file) formData.append('file', file)

            const response = await fetch(`${APP_URL}/community/add-answer`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                body: formData
            })

            const json = await response.json();

            if (json.success) {
                showAlert(json.success, 'success');
                onClose();
                fetchAllQuestions();
                reset();
                setFile(null)
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
    }, [file, user, data]);


    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Answer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={'16px'} fontWeight={'600'}>{data?.question}</Text>

                    <FormControl mt={3} isInvalid={errors.answer}>
                        <FormLabel fontSize={'13px'} mb={1}>Your answer</FormLabel>
                        <Textarea
                            placeholder='Enter text here...'
                            {...register('answer', {
                                required: 'Answer is required'
                            })}
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
                            fontSize={'14px'}
                        />
                        {errors.answer && (
                            <FormErrorMessage fontSize="12px">
                                {errors.answer.message}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <Input type='file' display={'none'} ref={fileRef} onChange={(e) => setFile(e.target.files[0])} />
                    <IconButton
                        mt={2}
                        size={'sm'}
                        icon={<BsImages color='#c53030' />}
                        bgColor={'transparent'}
                        border={'1px solid #c53030'}
                        onClick={() => fileRef.current.click()}
                    />
                    {file && <Image src={URL.createObjectURL(file)} h={'auto'} w={'10rem'} />}
                </ModalBody>

                <ModalFooter gap={3}>
                    <Button
                        size={'sm'}
                        bgColor={'#c53030'} color='white'
                        _hover={{
                            bgColor: '#842020ff'
                        }}
                        borderRadius={'full'}
                        onClick={handleSubmit(onSubmit)}
                        isLoading={loading}
                    >
                        Submit
                    </Button>
                    <Button
                        size={'sm'}
                        bgColor={'#cbcbcb'} color='black'
                        _hover={{
                            bgColor: '#878787ff'
                        }}
                        borderRadius={'full'}
                        onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}