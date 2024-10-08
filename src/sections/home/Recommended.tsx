import MovieCard from "@/components/MovieCard"
import SeriesCard from "@/components/SeriesCard"
import { Button, Flex, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { IoIosArrowRoundForward } from "react-icons/io"



const Recommended = () => {
    const {colorMode} = useColorMode()
    const [currTab, setCurrTab] = useState("Movies")

    const tabs = [
        "Movies",
        "Series"
    ]

    return (
        <Stack
        gap="20px"
        >
            <Flex justifyContent="space-between"  alignItems="center" flexWrap="wrap">
                <Flex gap="10px" alignItems="center" flexWrap="wrap">
                    <Text variant="h5">
                        Recommended
                    </Text>
                    <Flex>
                    {
                    tabs.map( (tab, k) => {
                        const color = tab===currTab ? "white" : colorMode==="light" ? "black" : "white"

                        return (
                            <Text
                            key={k}
                            as={Button}
                            variant="unstyled"
                            _hover={{bgColor: "red"}}
                            bgColor={tab===currTab ? "red" : "transparent"}
                            color={ color}
                            colorScheme=""
                            p="5px 8px"
                            borderRadius="15px"
                            alignSelf="flex-start"
                            w="fit-content"
                            onClick={() => setCurrTab(tab)}
                            >
                            {tab}
                            </Text>
                        )
                    } )
                    }
                    </Flex>
                </Flex>
                <Button
                rightIcon={<IoIosArrowRoundForward />}
                color={colorMode==="dark" ? "whiteAlpha.700" : "blackAlpha.700"}
                ml="auto"
                >
                    View all
                </Button>
            </Flex>
            <Flex
            flexWrap="wrap"
            gap="30px"
            >
                {
                currTab==="Movies" ?
                <>
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                </> :
                <>
                <SeriesCard />
                <SeriesCard />
                <SeriesCard />
                <SeriesCard />
                </>
                }
            </Flex>
        </Stack>
    )
}


export default Recommended