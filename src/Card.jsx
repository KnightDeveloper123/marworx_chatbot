import React from 'react'
import { Box } from '@chakra-ui/react'

const Card = ({children, padding, boxShadow, h}) => {
  return (
    <Box zIndex={1} bgColor='#fff' boxShadow={boxShadow || '0 0 4px #ccc'} padding={padding || {base: '5px', md: '10px'}} borderRadius='10px' h={h || 'auto'}>
        {children}
    </Box>
  )
}

export default Card