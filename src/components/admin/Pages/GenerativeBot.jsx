import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { decrypt } from '../../utils/security'
import { Box, Button, Flex, FormControl, FormLabel, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { IoMdAdd } from 'react-icons/io'
import { DeleteIcon } from '@chakra-ui/icons'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { AppContext } from '../../context/AppContext'

const GenerativeBot = () => {

    const { showAlert, formatDate } = useContext(AppContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [documents, setDocuments] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const location = useLocation()
    const user = localStorage.getItem('user')
    const sectorId=localStorage.getItem('sectorId')
    // console.log(sectorId);
    const admin_id = decrypt(user).id
    const user_role = decrypt(user).role
   const fetchAllDocuments = useCallback(
      async admin_id => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL
            }/documents/getAllDocuments?admin_id=${admin_id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
              }
            }
          )
  
          const result = await response.json()
          if (result.success) {
            setDocuments(result.data)
          } else {
            showAlert(response.error, 'error')
          }
        } catch (error) {
          console.log(error)
          showAlert('Internal Server Error', 'error')
        }
      },
      [showAlert]
    )
    useEffect(() => {
      fetchAllDocuments(admin_id)
    }, [fetchAllDocuments, admin_id])
  
const [loading, setLoading] = useState(true);
   const [file, setFile] = useState({
      fileName: '',
      file: []
    })
    const fileInputRef = useRef()
    const handleFileChange = event => {
      setFile(prev => ({ ...prev, file: event.target.files[0] }))
    }
  
    const handleFileSubmit = async () => {
      const formData = new FormData()
      formData.append('admin_id', admin_id)
      formData.append('file', file.file)
      formData.append('fileName', file.fileName)
      formData.append('sector_id', sectorId)
      formData.append('bot_type', 'Genarative ai')
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL
          }/documents/uploadDocument?fileName=${file.fileName}`,
          {
            method: 'POST',
            headers: {
              Authorization: `${localStorage.getItem('token')}`
            },
            body: formData
          }
        )
  
        const result = await response.json()
        if (result.success) {
          showAlert(result.success, 'success')
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
          setFile(null)
          fetchAllDocuments(admin_id)
          onClose()
        } else {
          showAlert(result.error, 'error')
        }
      } catch (error) {
        console.log(error)
        showAlert('Upload failed', 'error')
      }
    }
  
    const handleDeleteDocument = async id => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL
          }/documents/deleteDocument?document_id=${id}`,
          {
            method: 'POST',
            headers: {
              Authorization: `${localStorage.getItem('token')}`
            }
          }
        )
  
        const result = await response.json()
        if (result.success) {
          fetchAllDocuments(admin_id)
          showAlert(result.success, 'success')
        } else {
          showAlert(result.error, 'error')
        }
      } catch (error) {
        console.log(error)
        showAlert('Upload failed', 'error')
      }
    }
  
  return (
   <>
   
         <Box p={4} bg={'#fff'} mt={4} borderRadius={'lg'} boxShadow={'md'}>
           <Button
             borderRadius='var(--radius)'
             leftIcon={<IoMdAdd fontSize={'20px'} />}
             _hover={{ bgColor: 'var(--active-bg)' }}
             bgColor='var(--active-bg)'
             color='#fff'
             fontSize='var(--mini-text)'
             fontWeight='var(--big-font-weight)'
             h={'35px'}
             onClick={() => onOpen()}
           >
             Add Documents
           </Button>
           <SimpleGrid h={'100%'} mt={4} columns={{ base: 1, md: 5 }} gap={2}>
             <GridItem colSpan={{ base: 1, md: 2 }}>
               <TableContainer
                 mt='20px'
                 width={'100%'}
                 borderRadius='5px 5px 0px 0px'
               >
                 <Table size='sm' className='custom-striped-table'>
                   <TableCaption>
                     DATA SETS UPLOADED FOR MODEL TRAINING
                   </TableCaption>
                   <Thead border='0.5px solid #FFF5F3'>
                     {documents.length === 0 ? (
                       <Tr h='40px' bgColor='#FFF5F3'>
                         <Th
                           border={'1px solid #b4b4b4'}
                           colSpan={'4'}
                           textAlign={'center'}
                           fontSize={'12px'}
                         >
                           No Documents Uploaded
                         </Th>
                       </Tr>
                     ) : (
                       <Tr h='40px' bgColor='#FFF5F3'>
                         {/* <Th>ID</Th> */}
                         <Th
                           fontWeight='var(--big-font-weight)'
                           color='var(--text-black)'
                           borderRadius='5px 0px 0px 0px'
                           fontSize='var(--mini-text)'
                         >
                           File Name
                         </Th>
                          <Th
                           fontWeight='var(--big-font-weight)'
                           color='var(--text-black)'
                           borderRadius='5px 0px 0px 0px'
                           fontSize='var(--mini-text)'
                         >
                           Sector
                         </Th>
                         <Th
                           fontWeight='var(--big-font-weight)'
                           color='var(--text-black)'
                           borderRadius=''
                           fontSize='var(--mini-text)'
                         >
                           Created At
                         </Th>
                         <Th
                           fontWeight='var(--big-font-weight)'
                           fontSize='var(--mini-text)'
                           color='var(--text-black)'
                           borderRadius='0px 5px 5px 0px'
                         >
                           Action
                         </Th>
                       </Tr>
                     )}
                   </Thead>
                   <Tbody>
                     {documents?.map(item => (
                       <Tr
                         fontSize={'14px'}
                         cursor={'pointer'}
                         key={item?.id}
                         onClick={() => setSelectedFile(item)}
                       >
                         {/* <Td>{item?.id}</Td> */}
                         <Td>{item?.name}</Td>
                         <Td>{item?.sname}</Td>
                         <Td>{formatDate(item?.created_at)}</Td>
                         <Td>
                           <Flex
                             onClick={e => {
                               e.stopPropagation()
                               handleDeleteDocument(item.id)
                             }}
                             cursor={'pointer'}
                             _hover={{ color: 'white', bg: 'red' }}
                             color={'red'}
                             justifyContent={'center'}
                             alignItems={'center'}
                             h={'20px'}
                             w={'20px'}
                             border={'1px solid red'}
                             borderRadius={'full'}
                           >
                             <DeleteIcon />
                           </Flex>
                         </Td>
                       </Tr>
                     ))}
                   </Tbody>
                 </Table>
               </TableContainer>
             </GridItem>
   
             <FileViewer selectedFile={selectedFile} />
           </SimpleGrid>
         </Box>
   
         <Modal
           size={'sm'}
           isOpen={isOpen}
           onClose={onClose}
           motionPreset='slideInBottom'
           isCentered
         >
           <ModalOverlay />
           <ModalContent>
             <Text fontSize={'18px'} fontWeight={'semibold'} padding={'10px'}>
               Upload Files
             </Text>
             <ModalCloseButton />
             <ModalBody>
               <FormControl isRequired>
                 <FormLabel fontSize={'13px'} mb={'1px'}>
                   File Name
                 </FormLabel>
                 <Input
                   name='fileName'
                   type='text'
                   fontSize={'12px'}
                   borderRadius={'10px'}
                   onChange={e =>
                     setFile(prev => ({ ...prev, fileName: e.target.value }))
                   }
                   placeholder='File Name'
                 />
               </FormControl>
   
               <FormControl isRequired mt={5}>
                 <FormLabel fontSize='var(--mini-text)' mb='2px'>
                   Upload File
                 </FormLabel>
                 <Input
                   type='file'
                   ref={fileInputRef}
                   onChange={handleFileChange}
                   fontSize='var(--text-12px)'
                   colorScheme='orange'
                   sx={{
                     '::file-selector-button': {
                       backgroundColor: '#FF5722',
                       color: 'white',
                       border: 'none',
                       padding: '6px 12px',
                       borderRadius: '6px',
                       cursor: 'pointer',
                       fontSize: 'var(--text-12px)'
                     },
                     '::file-selector-button:hover': {
                       backgroundColor: '#e64a19'
                     }
                   }}
                 />
               </FormControl>
             </ModalBody>
   
             <Box width={'full'} display={'flex'} gap={'6px'} padding={'20px'}>
               <Button
                 size={'sm'}
                 width={'50%'}
                 onClick={onClose}
                 bgColor='transparent'
                 _hover='none'
                 color='var(--active-bg)'
                 border='1px solid var(--active-bg)'
               >
                 Close
               </Button>
               <Button
                 size={'sm'}
                 width={'50%'}
                 onClick={handleFileSubmit}
                 _hover={{ bgColor: 'var(--active-bg)' }}
                 bgColor='var(--active-bg)'
                 color='#fff'
               >
                 Upload
               </Button>
             </Box>
           </ModalContent>
         </Modal>
         </>
  )
}
   

const FileViewer = ({ selectedFile }) => {
  const [fileContent, setFileContent] = useState('')
  const [fileUrl, setFileUrl] = useState('')

  useEffect(() => {
    if (!selectedFile) {
      setFileContent('')
      setFileUrl('')
      return
    }

    const filePath = `${import.meta.env.VITE_BACKEND_URL}/documents/${selectedFile.name
      }`

    if (selectedFile.name.endsWith('.pdf')) {
      // Download and show PDF
      fetch(filePath)
        .then(res => res.blob())
        .then(blob => setFileUrl(URL.createObjectURL(blob)))
        .catch(() => setFileUrl(''))
    } else if (
      selectedFile.name.endsWith('.csv') ||
      selectedFile.name.endsWith('.txt')
    ) {
      // Fetch and show text-based files
      fetch(filePath)
        .then(res => (res.ok ? res.text() : Promise.reject('Failed to fetch')))
        .then(setFileContent)
        .catch(() => setFileContent('Error loading file.'))
    }
  }, [selectedFile])

  return (
    <GridItem
      colSpan={{ base: 1, md: 3 }}
      p={4}
      borderRadius='md'
      minH='300px'
      maxH='450px'
      overflowY='auto'
    >
      {selectedFile ? (
        <>
          <Text fontWeight='bold' mb={2}>
            {selectedFile.name}
          </Text>

          {selectedFile.name.endsWith('.pdf') ? (
            fileUrl ? (
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
                <Viewer fileUrl={fileUrl} />
              </Worker>
            ) : (
              <Text>Loading PDF...</Text>
            )
          ) : ['.csv', '.txt'].some(ext => selectedFile.name.endsWith(ext)) ? (
            <Box as='pre' whiteSpace='pre-wrap' wordBreak='break-word'>
              {fileContent || 'Loading file content...'}
            </Box>
          ) : (
            <Text>Preview not available for this file type.</Text>
          )}
        </>
      ) : (
        <Text>Select a file to view its content.</Text>
      )}
    </GridItem>
  )
}


export default GenerativeBot
