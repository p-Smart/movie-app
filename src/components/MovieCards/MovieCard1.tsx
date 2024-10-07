import { Box, Flex, Stack, Text } from "@chakra-ui/react"
import { IoMdPlayCircle, IoMdStar } from "react-icons/io"
import { SlSpeedometer } from "react-icons/sl"



const MovieCard1 = () => {
    

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
        w="350px" 
        gap="20px"
        >
            <Box
            w="100%"
            h="290px"
            borderRadius="8px"
            backgroundImage={`url("/assets/images/dummy/Rectangle 3.png")`}
            backgroundSize="cover"
            p="20px"
            position="relative"
            cursor='pointer'
            transition='all 0.2s ease-in-out'
            _hover={{filter: 'brightness(97%)'}}
            _active={{transform: 'scale(0.94)'}}
            >
                <Flex justifyContent="space-between" w="100%">
                    {
                    metadata.map( (data, k) => (
                        <Flex gap="5px" alignItems="center" key={k} alignSelf="flex-start">
                            <Box color="white" as={data.Icon} size={18} />
                            <Text color="white">{data.value}</Text>
                        </Flex>
                    ) )
                    }
                </Flex>
                <Box 
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                as={IoMdPlayCircle} 
                color="white" 
                size={64}
                />
            </Box>

            <Flex alignItems="center" justify="space-between">
                <Text variant="h6">
                Medellin
                </Text>
                <Flex gap="10px">
                {
                tags.map( (tag, k) => (
                    <Text
                    key={k}
                    bgColor="red"
                    color="white"
                    p="5px 8px"
                    borderRadius="8px"
                    alignSelf="flex-start"
                    >
                    {tag}
                    </Text>
                ) )
                }
                </Flex>
            </Flex>
        </Stack>
    )
}


export default MovieCard1