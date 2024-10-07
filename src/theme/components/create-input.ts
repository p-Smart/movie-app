import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)


const createInput = () => {


    return  defineMultiStyleConfig({
        baseStyle: definePartsStyle({
            // field: {
            //     width: '100px',
            //     height: '300px',
            //     background: 'red'
            // },
            // element: {
            //     width: '100px',
            //     height: '300px',
            //     background: 'red'
            // }
        }),
        defaultProps: {
            variant: 'unstyled'
        }
    })
}


export default createInput