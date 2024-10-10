import { Box, Flex, Stack, StackProps, Text } from "@chakra-ui/react"
import Link from "next/link";



export interface ISeriesCard extends StackProps {
    id: string;
    title: string;
    eps?: string | number;
    seasons?: string | number;
    image: string;
    tag: string;
}


const SeriesCard = ({
    title, eps, seasons, image, tag, id,
    ...stackProps
}: ISeriesCard) => {

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
            p="20px"
            position="relative"
            cursor='pointer'
            transition='all 0.2s ease-in-out'
            _hover={{filter: 'brightness(97%)'}}
            _active={{transform: 'scale(0.94)'}}
            as={Link}
            href={`/series/${id}`}
            >
                {
                eps &&
                <Text
                bgColor="red"
                color="white"
                p="5px 8px"
                borderRadius="5px"
                alignSelf="flex-start"
                w="fit-content"
                fontSize=".9rem"
                >
                {`${eps} EPs`}
                </Text>
                }
            </Box>

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
                    seasons &&
                    <Flex 
                    border="1px solid"
                    borderColor="red"
                    p="4px"
                    borderRadius="3px"
                    gap="5px" 
                    alignItems="center" 
                    alignSelf="flex-start"
                    flexShrink={0}
                    >
                        <Text fontSize=".9rem">{`${seasons} Seasons`}</Text>
                    </Flex>
                    }
                </Flex>
            </Flex>
        </Stack>
    )
}


export default SeriesCard