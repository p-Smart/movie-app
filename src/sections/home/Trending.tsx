import MovieCard from "@/components/MovieCards/MovieCard1"
import { Button, Flex, Stack, Text, useColorMode } from "@chakra-ui/react"
import { IoIosArrowRoundForward } from "react-icons/io"



const Trending = () => {
    const {colorMode} = useColorMode()


    return (
        <Stack
        gap="20px"
        >
            <Flex justifyContent="space-between">
                <Text variant="h5">
                    Trending
                </Text>
                <Button
                rightIcon={<IoIosArrowRoundForward />}
                color={colorMode==="dark" ? "whiteAlpha.700" : "blackAlpha.700"}
                >
                    View all
                </Button>
            </Flex>
            <Flex
            flexWrap="wrap"
            gap="30px"
            >
                <MovieCard />
                <MovieCard />
                <MovieCard />
            </Flex>
        </Stack>
    )
}


export default Trending