import MovieCardTrending from "@/components/MovieCardTrending"
import { Button, Flex, Grid, Stack, Text, useColorMode } from "@chakra-ui/react"
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
                ml="auto"
                >
                    View all
                </Button>
            </Flex>
            <Grid
                templateColumns={{
                xl: "repeat(3, 1fr)",
                md: "repeat(2, 1fr)",
                xs: "repeat(1, 1fr)",
                }}
                gap={4}
                width="100%"
            >
                {
                Array.from({length: 3}).map( (_, k) => (
                    <MovieCardTrending
                    key={k}
                    w={"100%"}
                    />
                ) )
                }
            </Grid>
            <Flex
            flexWrap="wrap"
            gap="30px"
            >
                
            </Flex>
        </Stack>
    )
}


export default Trending