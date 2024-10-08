import { Box, Flex, Stack, StackProps, Text } from "@chakra-ui/react"



export interface ISeriesCard extends StackProps {
    
}


const SeriesCard = ({

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
            backgroundImage={`url("/assets/images/dummy/Rectangle 13.png")`}
            backgroundSize="cover"
            p="20px"
            position="relative"
            cursor='pointer'
            transition='all 0.2s ease-in-out'
            _hover={{filter: 'brightness(97%)'}}
            _active={{transform: 'scale(0.94)'}}
            >
                <Text
                bgColor="red"
                color="white"
                p="5px 8px"
                borderRadius="5px"
                alignSelf="flex-start"
                w="fit-content"
                fontSize=".9rem"
                >
                47 EPs
                </Text>
            </Box>

            <Flex alignItems="center" justify="space-between">
                <Text fontSize="1.1rem" isTruncated>
                The Night Agent
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
                    flexShrink={0}
                    >
                        <Text fontSize=".9rem">{"2 Seasons"}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Stack>
    )
}


export default SeriesCard