import { Box, Flex, Stack, StackProps, Text } from "@chakra-ui/react"
import Link from "next/link";
import { IoMdPlayCircle, IoMdStar } from "react-icons/io"
import { SlSpeedometer } from "react-icons/sl"



export interface IMovieCardTrending extends StackProps {
    id: string;
    title: string;
    rating: string;
    runtime: string;
    movie_tags: string[];
    image: string;
}


const MovieCardTrending = ({
    title, rating, runtime, movie_tags, image, id,
    ...stackProps
}: IMovieCardTrending) => {
    

    const metadata = [
        {
            Icon: SlSpeedometer,
            value: runtime
        },
        {
            Icon: IoMdStar,
            value: rating
        },
    ]

    return (
        <Stack
        w={{xs: "100%", md: "350px"}}
        gap="20px"
        {...stackProps}
        >
            <Box
            w="100%"
            h="290px"
            borderRadius="8px"
            backgroundImage={`url("${image}")`}
            backgroundSize="cover"
            p="20px"
            position="relative"
            cursor='pointer'
            transition='all 0.2s ease-in-out'
            _hover={{filter: 'brightness(97%)'}}
            _active={{transform: 'scale(0.94)'}}
            as={Link}
            href={`/movie/${id}`}
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

            <Flex
            gap="10px"
            alignItems="center" 
            justify="space-between"
            flexWrap="wrap"
            >
                <Text variant="h6" isTruncated whiteSpace="normal" wordBreak="break-word">
                {title}
                </Text>
                <Flex gap="10px" flexWrap="wrap">
                {
                movie_tags.map( (tag, k) => (
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


export default MovieCardTrending