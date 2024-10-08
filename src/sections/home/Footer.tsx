import { Flex, Text, useColorMode } from "@chakra-ui/react"



const Footer = () => {
    const {colorMode} = useColorMode()

    return (
        <Flex
        bgColor={colorMode==="light" ? "black" : "whiteAlpha.800"}
        color={colorMode==="light" ? "white" : "black"}
        w="100%"
        height="80px"
        borderTop="2px solid"
        borderColor="red"
        >
            <Text m="auto">
            &copy; 2024. Developed by pSmart
            </Text>
        </Flex>
    )
}


export default Footer