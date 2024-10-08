import MovieCard from "@/components/MovieCard"
import { Button, Flex, Stack, Text, useColorMode } from "@chakra-ui/react"
import { IoIosArrowRoundForward } from "react-icons/io"



const NewReleaseM = () => {
    const {colorMode} = useColorMode()


    return (
        <Stack
        gap="20px"
        >
            <Flex justifyContent="space-between">
                <Text variant="h5">
                    New Release - Movies
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
                {
                Array.from({length: 3}).map( (_, k) => (
                    <MovieCard
                    key={k}
                    />
                ) )
                }
            </Flex>
        </Stack>
    )
}


export default NewReleaseM