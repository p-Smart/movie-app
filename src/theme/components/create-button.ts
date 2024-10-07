import { defineStyleConfig } from "@chakra-ui/react"



const createButton = () => {



    return defineStyleConfig({
        baseStyle: {
            transition: 'all 0.2s ease-in-out',
            _hover: {
                filter: 'brightness(85%)',
            },
            _active: {
                transform: 'scale(0.94)',
            },
            // _disabled: {
            //     display: 'none',
            // }
        },
        variants: {
            solid: {
                bgColor: 'primary.main',
                color: 'white',
                padding: '16px 20px',
                _hover: {
                 bgColor: 'primary.main',
                },
                _active: {
                    bgColor: 'primary.light',
                }
            },
            outline: {
                padding: '20px 30px',
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: '600',
                _hover: {
                    bgColor: 'whiteAlpha.300',
                },
                _active: {
                    bgColor: 'whiteAlpha.300',
                }
            },
            link: {
                color: 'black',
                fontWeight: '400',
                _hover: {
                    textDecoration: 'unset'
                }
            },
        }
    })
}


export default createButton