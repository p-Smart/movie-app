import { Box, Flex, Stack, Text } from "@chakra-ui/react"
import { IoMdPlayCircle, IoMdStar } from "react-icons/io"
import { SlSpeedometer } from "react-icons/sl"



const MovieCard2 = () => {
    

    const metadata = [
        {
            Icon: SlSpeedometer,
            value: "3:12:00"
        },
        {
            Icon: IoMdStar,
            value: "8.5"
        },
    ]
    const tags = ["Action", "Comedy"]

    return (
        <Stack
        w="250px" 
        gap="20px"
        >
            <Box
            w="100%"
            h="350px"
            borderRadius="8px"
            backgroundImage={`url("/assets/images/dummy/Rectangle 6.png")`}
            backgroundSize="cover"
            p="20px"
            position="relative"
            cursor='pointer'
            transition='all 0.2s ease-in-out'
            _hover={{filter: 'brightness(97%)'}}
            _active={{transform: 'scale(0.94)'}}
            />

            <Flex alignItems="center" justify="space-between">
                <Text fontSize="1.1rem">
                Ghosted
                </Text>
                <Flex gap="10px" alignItems="center">
                    <Text
                    bgColor="red"
                    color="white"
                    p="5px 8px"
                    borderRadius="5px"
                    alignSelf="flex-start"
                    >
                    HD
                    </Text>
                    <Flex 
                    border="1px solid"
                    borderColor="red"
                    p="4px"
                    borderRadius="3px"
                    gap="5px" 
                    alignItems="center" 
                    alignSelf="flex-start"
                    >
                        <Box as={SlSpeedometer} size={18} />
                        <Text>{"3:12:00"}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Stack>
    )
}


export default MovieCard2