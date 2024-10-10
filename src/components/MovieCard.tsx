import { Box, Flex, Stack, StackProps, Text } from "@chakra-ui/react"
import Link from "next/link";
import { SlSpeedometer } from "react-icons/sl"


export interface IMovieCard extends StackProps {
    id: string;
    title: string;
    image: string;
    tag: string;
    runtime?: string;
}


const MovieCard = ({
    title, image, tag, runtime, id,
    ...stackProps
}: IMovieCard) => {

    return (
        <Stack
        w={{xs: "100%", md: "250px"}}
        gap="20px"
        {...stackProps}
        >
            <Box
            w="100%"
            h="350px"
            borderRadius="8px"
            backgroundImage={`url("${image || "/assets/images/2606147_5627.png"}")`}
            backgroundSize="cover"
            backgroundPosition="center center"
            p="20px"
            position="relative"
            cursor='pointer'
            transition='all 0.2s ease-in-out'
            _hover={{filter: 'brightness(97%)'}}
            _active={{transform: 'scale(0.94)'}}
            as={Link}
            href={`/movie/${id}`}
            />

            <Flex 
            alignItems={{xs: "left", md: "center"}}
            justify="space-between"
            flexDir={{xs: "column", md: "row"}}
            flexWrap="wrap"
            >
                <Text fontSize="1.1rem" isTruncated whiteSpace="normal" wordBreak="break-word">
                {title}
                </Text>
                <Flex 
                gap="10px" 
                alignItems="center"
                justifyContent={{xs: "space-between", md: "unset"}}
                >
                    <Text
                    bgColor="red"
                    color="white"
                    p="5px 8px"
                    borderRadius="5px"
                    alignSelf="flex-start"
                    >
                    {tag}
                    </Text>
                    {
                    runtime &&
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
                        <Text>{runtime}</Text>
                    </Flex>
                    }
                </Flex>
            </Flex>
        </Stack>
    )
}


export default MovieCard